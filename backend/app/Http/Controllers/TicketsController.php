<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TicketsController extends Controller
{
    public function index()
    {
        $tickets = Ticket::all();
        return response()->json($tickets);
    }

    public function show(Ticket $ticket)
    {
        return response()->json($ticket);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'client_type' => 'required|in:'.Ticket::CLIENT_TYPE_FREE.','.Ticket::CLIENT_TYPE_BASIC.','.Ticket::CLIENT_TYPE_PREMIUM,
        ]);

        $ticket = Ticket::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'client_type' => $validated['client_type'],
            'status' => Ticket::STATUS_PENDING,
            'urgency' => null,
        ]);
        return response()->json($ticket, 201);
    }

    public function processPendingQueue(): JsonResponse
    {
        $pendingTickets = Ticket::where('status', Ticket::STATUS_PENDING)->get();
        
        foreach ($pendingTickets as $ticket) {
            $urgency = $this->calculateUrgency($ticket);
            $ticket->update([
                'urgency' => $urgency,
                'status' => Ticket::STATUS_CLASSIFIED,
            ]);
        }
        return response()->json(['message' => 'Pending queue processed successfully']);
    }

    public function calculateUrgency(Ticket $ticket): string
    {
        $clientType = $ticket->client_type;
        $description = mb_strtolower($ticket->description);

        $keywords = [
            Ticket::URGENCY_CRITICAL => ['parado', 'offline', 'não funciona', 'down', 'fora do ar'],
            Ticket::URGENCY_HIGH => ['erro', 'bug', 'lento', 'lentidão', 'falha de acesso'],
            Ticket::URGENCY_MEDIUM => ['dúvida', 'como fazer', 'ajuda', 'orientação'],
        ];

        $calculatedUrgency = null;

        foreach ($keywords as $urgency => $words) {
            foreach ($words as $word) {
                if(str_contains($description, $word)) {
                    $calculatedUrgency = $urgency;
                    break 2;
                }
            }
        }

        if($clientType === Ticket::CLIENT_TYPE_PREMIUM) {
            return $calculatedUrgency ?? Ticket::URGENCY_MEDIUM;
        }

        if($clientType === Ticket::CLIENT_TYPE_BASIC) {
            if($calculatedUrgency === Ticket::URGENCY_CRITICAL) {
                return Ticket::URGENCY_HIGH;
            }
            if($calculatedUrgency === Ticket::URGENCY_HIGH) {
                return Ticket::URGENCY_MEDIUM;
            }
            return Ticket::URGENCY_LOW;
        }

        if($clientType === Ticket::CLIENT_TYPE_FREE) {
            if($calculatedUrgency === Ticket::URGENCY_CRITICAL) {
                return Ticket::URGENCY_MEDIUM;
            }
        }

        return Ticket::URGENCY_LOW;
    }
}
