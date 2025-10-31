import ClassifiedTickets from './ClassifiedTickets';

function ClassifiedQueue({ tickets }) {
    return (
        <div id="classified-queue">
            <h5 className="card-title mb-4 fw-bold">Fila Classificada</h5>
            {tickets.length > 0 ? (
                tickets.map(ticket => (
                    <ClassifiedTickets key={ticket.id} ticket={ticket} />
                ))
            ) : (
                <p>Nenhum ticket classificado</p>
            )}
        </div>
    )
}

export default ClassifiedQueue;