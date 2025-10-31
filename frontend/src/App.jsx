import { useState, useEffect } from 'react'
import './App.css'
import { ticketsServices } from './services/ticketsServices.js';
import TicketForm from './components/TicketForm';
import Dashboard from './components/Dashboard';

function App() {

    const [tickets, setTickets] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const response = await ticketsServices.getAll();
            setTickets(response.data);
        } catch (error) {
            alert('Erro ao carregar tickets. Tente novamente.');
            console.error('Erro ao carregar tickets:', error);
        }
    }

    const processQueue = async () => {
        try {
            setIsProcessing(true);
            await ticketsServices.processPendingQueue();
            await loadTickets();
        } catch (error) {
            alert('Erro ao processar fila. Tente novamente.');
            console.error('Erro ao processar fila:', error);
        } finally {
            setIsProcessing(false);
        }
    }

    const pendingTickets = tickets.filter(ticket => ticket.status === 'PENDENTE');
    const classifiedTickets = tickets.filter(ticket => ticket.status === 'CLASSIFICADO');

    return(
        <div className="container-fluid p-0 pt-2">
            <div className="row g-0 pb-0">
                <div className="col-md-4 col-lg-3 p-4">
                    <TicketForm onCreateSuccess={loadTickets}/>
                </div>
                <div id="dashboard-container" className="col-md-8 col-lg-9 p-4 dashboard-container">
                    <Dashboard pendingTickets={pendingTickets} classifiedTickets={classifiedTickets} processTickets={processQueue} isProcessing={isProcessing}/>
                </div>
            </div>
        </div>
    )
}

export default App
