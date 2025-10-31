import PendingQueue from './PendingQueue';
import ClassifiedQueue from './ClassifiedQueue';

function Dashboard({ pendingTickets, classifiedTickets, processTickets, isProcessing }) {
    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="fw-bold">Dashboard de Triagem</h1>
                    <p className="text-muted mb-0">Crie e processe tickets para priorização automática</p>
                </div>
                <button
                    id="btn-process-tickets"
                    className="btn btn-light-gray"
                    onClick={processTickets} 
                    disabled={isProcessing || pendingTickets.length === 0}
                >
                    {isProcessing ? 
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            <span className="text-black fw-bold">Processando tickets...</span>
                        </>
                    : 
                        <>
                            <span className="text-black fw-bold"> Processar Fila Pendente</span>
                        </>
                    }
                </button>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <PendingQueue tickets={pendingTickets} />
                </div>
                <div className="col-md-6">
                    <ClassifiedQueue tickets={classifiedTickets} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;