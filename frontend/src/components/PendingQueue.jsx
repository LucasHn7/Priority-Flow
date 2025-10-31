import PendingTickets from './PendingTickets';

function PendingQueue({ tickets }) {
    return (
        <div id="pending-queue">
            <h5 className="card-title mb-4 fw-bold">Fila Pendente</h5>
            {tickets.length > 0 ? (
                tickets.map(ticket => (
                    <PendingTickets key={ticket.id} ticket={ticket} />
                ))
            ) : (
                <p>Nenhum ticket pendente</p>
            )}
        </div>
    )
}

export default PendingQueue;
