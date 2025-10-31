export const SELECTORS = {
    FORM_TITLE: '#form-title',
    FORM_DESCRIPTION: '#form-description',
    FORM_CLIENT_TYPE: '#form-client-type',
    BTN_CREATE_TICKET: '#btn-create-ticket',

    BTN_PROCESS_QUEUE: '#btn-process-tickets',

    PENDING_QUEUE: '#pending-queue',
    CLASSIFIED_QUEUE: '#classified-queue',

    PENDING_TICKET: (id) => `#pending-ticket-${id}`,
    CLASSIFIED_TICKET: (id) => `#classified-ticket-${id}`,

    URGENCY_BADGE: {
        BADGE: 'span.badge',
        CRITICAL: 'bg-danger',
        HIGH: 'bg-warning',
        MEDIUM: 'bg-info',
        LOW: 'bg-success'
    }
}