<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Ticket;
use App\Http\Controllers\TicketsController;

class CalculateUrgencyTest extends TestCase
{

    public TicketsController $controller;

    public function setUp(): void
    {
        parent::setUp();
        $this->controller = new TicketsController;

    }

    public function createTicket(string $description, string $clientType)
    {
        return new Ticket([
            'id' => rand(300, 999),
            'title' => 'Teste',
            'description' => $description,
            'client_type' => $clientType,
        ]);
    }

    public function test_calculate_urgency_critical_with_premium_client()
    {
        
        $ticket = $this->createTicket(
            'Meu sistema está completamente parado e não consigo trabalhar.',
            Ticket::CLIENT_TYPE_PREMIUM
        );  
        
        $result = $this->controller->calculateUrgency($ticket);
        
        $this->assertEquals(Ticket::URGENCY_CRITICAL, $result);
    }

    public function test_calculate_urgency_high_with_premium_client()
    {
        $ticket = $this->createTicket(
            'O relatório de vendas está muito lento hoje.', 
            Ticket::CLIENT_TYPE_PREMIUM
        );   
        
        $result = $this->controller->calculateUrgency($ticket);
        
        $this->assertEquals(Ticket::URGENCY_HIGH, $result);
    }

    public function test_calculate_urgency_medium_with_premium_client()
    {
        $ticket = $this->createTicket(
            'Tenho uma dúvida sobre como fazer a integração.', 
            Ticket::CLIENT_TYPE_PREMIUM
        );   
        
        $result = $this->controller->calculateUrgency($ticket);
        
        $this->assertEquals(Ticket::URGENCY_MEDIUM, $result);
    }

    public function test_calculate_urgency_with_premium_client_without_keyword()
    {    
        $ticket = $this->createTicket(
            'O último chamado foi resolvido, obrigado.', 
            Ticket::CLIENT_TYPE_PREMIUM
        );  
        
        $result = $this->controller->calculateUrgency($ticket);
        
        $this->assertEquals(Ticket::URGENCY_MEDIUM, $result);
    }

    public function test_calculate_urgency_critical_with_basic_client()
    {
        $ticket = $this->createTicket(
            'Meu aplicativo está fora do ar.', 
            Ticket::CLIENT_TYPE_BASIC
        );  
        
        $result = $this->controller->calculateUrgency($ticket);
        
        $this->assertEquals(Ticket::URGENCY_HIGH, $result);
    }

    public function test_calculate_urgency_high_with_basic_client()
    {
        $ticket = $this->createTicket(
            'Recebendo um erro 500 ao tentar salvar o formulário.', 
            Ticket::CLIENT_TYPE_BASIC
        );
        
        $result = $this->controller->calculateUrgency($ticket);
        
        $this->assertEquals(Ticket::URGENCY_MEDIUM, $result);
    }

    public function test_calculate_urgency_with_basic_client_without_keyword()
    {
        $ticket = $this->createTicket(
            'Gostaria de sugerir uma nova cor para o botão.', 
            Ticket::CLIENT_TYPE_BASIC
        );
        
        $result = $this->controller->calculateUrgency($ticket);
        
        $this->assertEquals(Ticket::URGENCY_LOW, $result);
    }

    public function test_calculate_urgency_critical_with_free_client()
    {
        $ticket = $this->createTicket(
            'O sistema está parado, não faz login.', 
            Ticket::CLIENT_TYPE_FREE
        );
        
        $result = $this->controller->calculateUrgency($ticket);
        
        $this->assertEquals(Ticket::URGENCY_MEDIUM, $result);
    }

    public function test_calculate_urgency_high_with_free_client()
    {
        $ticket = $this->createTicket(
            'Encontrei um bug na tela de login, o texto está cortado.', 
            Ticket::CLIENT_TYPE_FREE
        );

        $result = $this->controller->calculateUrgency($ticket);
        
        $this->assertEquals(Ticket::URGENCY_LOW, $result);
    }

    public function test_calculate_urgency_medium_with_free_client()
    {
        $ticket = $this->createTicket(
            'Preciso de ajuda para encontrar a documentação.', 
            Ticket::CLIENT_TYPE_FREE
        );
        
        $result = $this->controller->calculateUrgency($ticket);
        
        $this->assertEquals(Ticket::URGENCY_LOW, $result);
    }

    public function test_priority_rule_with_medium_and_critical_keyword()
    {
        $ticket = $this->createTicket(
            'Tenho uma dúvida sobre porque o sistema está parado.', 
            Ticket::CLIENT_TYPE_PREMIUM
        );
        
        $result = $this->controller->calculateUrgency($ticket);
        
        $this->assertEquals(Ticket::URGENCY_CRITICAL, $result);
    }

    public function test_case_insensitive_keyword()
    {
        $ticket = $this->createTicket(
            'O sistema está LENTO demais.', 
            Ticket::CLIENT_TYPE_PREMIUM
        );
        
        $result = $this->controller->calculateUrgency($ticket);
        
        $this->assertEquals(Ticket::URGENCY_HIGH, $result);
    }
}
