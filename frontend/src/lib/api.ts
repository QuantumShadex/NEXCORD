import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('nexcord_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getMe: () => api.get('/users/@me'),
};

export const spacesApi = {
  list: () => api.get('/spaces'),
  create: (data: { name: string; description?: string; is_private?: boolean; theme_color?: string }) =>
    api.post('/spaces', data),
  get: (id: string) => api.get(`/spaces/${id}`),
  join: (id: string) => api.post(`/spaces/${id}/join`),
  getMembers: (id: string) => api.get(`/spaces/${id}/members`),
};

export const streamsApi = {
  list: (spaceId: string) => api.get(`/spaces/${spaceId}/streams`),
  create: (spaceId: string, data: { name: string; type?: string; topic?: string }) =>
    api.post(`/spaces/${spaceId}/streams`, data),
};

export const messagesApi = {
  list: (streamId: string, before?: string) =>
    api.get(`/streams/${streamId}/messages${before ? `?before=${before}` : ''}`),
  send: (streamId: string, data: { content: string; reply_to?: string }) =>
    api.post(`/streams/${streamId}/messages`, data),
  delete: (streamId: string, messageId: string) =>
    api.delete(`/streams/${streamId}/messages/${messageId}`),
};
