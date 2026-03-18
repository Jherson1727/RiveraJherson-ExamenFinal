import axios from 'axios';

// Usamos rutas relativas para que el proxy de Vite las capture
const api = axios.create({
  baseURL: '/api'
});

export const getPlayers = () => api.get('/Players');
export const createPlayer = (player) => api.post('/Players', player);
export const deletePlayer = (id) => api.delete(`/Players/${id}`);

export const getTeams = () => api.get('/Teams');

export const getStaff = () => api.get('/Staff');
export const createStaff = (staff) => api.post('/Staff', staff);
export const deleteStaff = (id) => api.delete(`/Staff/${id}`);
