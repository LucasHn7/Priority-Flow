function PendingTickets({ ticket }) {
    return (
        <div className="card mb-3" id={`pending-ticket-${ticket.id}`}>
            <div className="card-body">
                <h6 className="card-title fw-bold">{ticket.title}</h6>
                <h6 className="card-text text-muted">
                    <span>Cliente:</span>
                    <span className="fw-bold"> {ticket.client_type}</span>
                </h6>
            </div>
        </div>
    )
}

export default PendingTickets;