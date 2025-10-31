<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketsController;

Route::get('/tickets', [TicketsController::class, 'index']);
Route::get('/tickets/{ticket}', [TicketsController::class, 'show']);
Route::post('/tickets', [TicketsController::class, 'store']);
Route::post('/tickets/process', [TicketsController::class, 'processPendingQueue']);