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
  getTicketTopics: () => request('/tickets/topics'),
  getTicketHistory: () => request('/tickets/history'),
  createTicket: (data) => request('/tickets', { method: 'POST', body: JSON.stringify(data) }),
  getCalls: (view) => request(`/calls?view=${view}`),
  wrapupCall: (id, data) => request(`/calls/${id}/wrapup`, { method: 'POST', body: JSON.stringify(data) }),
  getChats: () => request('/chats'),
  getChat: (id) => request(`/chats/${id}`),
  sendChatMessage: (id, text) => request(`/chats/${id}/messages`, { method: 'POST', body: JSON.stringify({ text }) }),
  addChatTag: (id, tag) => request(`/chats/${id}/tags`, { method: 'POST', body: JSON.stringify({ tag }) }),
  removeChatTag: (id, tagId) => request(`/chats/${id}/tags/${tagId}`, { method: 'DELETE' }),
  saveChatNote: (id, note) => request(`/chats/${id}/note`, { method: 'PATCH', body: JSON.stringify({ note }) }),
};
