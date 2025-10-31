function ClassifiedTickets({ ticket }) {
    const urgencyBadge = (urgency) => {
        const colors = {
            'CRITICA': 'danger',
            'ALTA': 'warning',
            'MEDIA': 'info',
            'BAIXA': 'success'
        }

        return colors[urgency]
    }

    const urgencyText = (urgency) => {
        const texts = {
            'CRITICA': 'CRÍTICA',
            'ALTA': 'ALTA',
            'MEDIA': 'MÉDIA',
            'BAIXA': 'BAIXA'
        }

        return texts[urgency]
    }
    return (
        <div id={`classified-ticket-${ticket.id}`} className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="card-title mb-0 fw-bold">{ticket.title}</h6>
                    <span className={`badge bg-${urgencyBadge(ticket.urgency)}`}>
                        {urgencyText(ticket.urgency)}
                    </span>
                </div>
                <h6 className="card-text text-muted small mb-0">
                    Cliente:
                    <span className="fw-bold">{ticket.client_type}</span>
                </h6>
            </div>
        </div>
    )
}

export default ClassifiedTickets;