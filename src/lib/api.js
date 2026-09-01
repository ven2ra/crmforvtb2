const BASE = '/api';

async function request(path, options) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Ошибка запроса: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getStats: () => request('/stats'),
  getTickets: (status) => request(`/tickets${status && status !== 'Все' ? `?status=${encodeURIComponent(status)}` : ''}`),
  getTicket: (id) => request(`/tickets/${id}`),
  getTicketHistory: () => request('/tickets/history'),
  createTicket: (data) => request('/tickets', { method: 'POST', body: JSON.stringify(data) }),
  updateTicket: (id, data) => request(`/tickets/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  getEmployees: () => request('/employees'),
  getCalls: (view) => request(`/calls?view=${view}`),
  getCall: (id) => request(`/calls/${id}`),
  startCall: () => request('/calls', { method: 'POST' }),
  updateCall: (id, data) => request(`/calls/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  finishCall: (id) => request(`/calls/${id}/finish`, { method: 'POST' }),
  getChats: () => request('/chats'),
  getChat: (id) => request(`/chats/${id}`),
  startChat: () => request('/chats', { method: 'POST' }),
  updateChat: (id, data) => request(`/chats/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  addChatTag: (id, tag) => request(`/chats/${id}/tags`, { method: 'POST', body: JSON.stringify({ tag }) }),
  removeChatTag: (id, tagId) => request(`/chats/${id}/tags/${tagId}`, { method: 'DELETE' }),
  saveChatNote: (id, note) => request(`/chats/${id}/note`, { method: 'PATCH', body: JSON.stringify({ note }) }),
};
