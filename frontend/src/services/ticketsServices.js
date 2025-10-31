import api from './api';

export const ticketsServices = {
    getAll: () => api.get('/tickets'),
    getById: (id) => api.get(`/tickets/${id}`),
    create: (data) => api.post('/tickets', data),
    processPendingQueue: () => api.post('/tickets/process'),
}