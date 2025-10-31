import { useState } from 'react';
import { ticketsServices } from '../services/ticketsServices.js';

function TicketForm({ onCreateSuccess }) {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        client_type: 'GRATUITO',
    });

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            client_type: 'GRATUITO',
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const createTicket = async (e) => {
        e.preventDefault();
        try {
            await ticketsServices.create(formData);
            alert('Ticket criado com sucesso.');
            resetForm();
            if (onCreateSuccess) {
                onCreateSuccess();
            }
        } catch (error) {
            alert('Erro ao criar ticket.');
            console.error('Erro ao criar ticket:', error);
        }
    }
    
    return (
        <div className="d-flex flex-column">
            <div>
                <h6 className="mb-1 fw-bold">Priority Flow</h6>
                <h6 className="text-muted small">Ticket Triage System</h6>
            </div>
            
            <hr className="form-separator" />

            <div>
                <h4 className="mb-4 fw-bold">Novo Ticket</h4>
                <form onSubmit={createTicket}>
                    <div className="mb-3">
                        <h6 className="form-label small">Título</h6>
                        <input
                            id="form-title"
                            className="form-control" 
                            type="text" name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            placeholder="Resumo do problema"
                            required/>
                    </div>

                    <div className="mb-3">
                        <h6 className="form-label small">Descrição</h6>
                        <textarea 
                            id="form-description"
                            className="form-control" 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            rows="5" 
                            placeholder="Descreva o problema em detalhes..."
                            required/>
                    </div>

                    <div className="mb-3">
                        <h6 className="form-label small">Tipo de Cliente</h6>
                        <select id="form-client-type" className="form-select" name="client_type" value={formData.client_type} onChange={handleChange} required>
                            <option value="GRATUITO">Gratuito</option>
                            <option value="BASICO">Básico</option>
                            <option value="PREMIUM">Premium</option>
                        </select>
                    </div>

                    <button id="btn-create-ticket" type="submit" className="btn btn-primary w-100">Criar Ticket</button>
                </form>
            </div>
        </div>
    )
}

export default TicketForm;