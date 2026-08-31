import React, { useEffect, useState } from 'react';
import { Dialog } from '../overlay/Dialog.jsx';
import { Input } from '../forms/Input.jsx';
import { Button } from '../core/Button.jsx';
import { api } from '../../lib/api.js';

const EMPTY_FORM = { fio: '', agreement: '', topic: '', essence: '', sd: '' };

// Универсальный диалог создания обращения. Можно открыть "с нуля" (Tickets)
// или предзаполненным из карточки звонка/чата (тогда прокидывается source —
// { callId } или { chatId } — чтобы бэкенд связал обращение с источником).
export function NewTicketDialog({ open, initial, source, onClose, onCreated }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      setForm({ ...EMPTY_FORM, ...initial });
      setError(null);
    }
  }, [open, initial]);

  const submit = async () => {
    if (!form.fio.trim() || !form.topic.trim()) return;
    setSubmitting(true);
    try {
      const created = await api.createTicket({ ...form, ...source });
      onCreated?.(created);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} title="Новое обращение" onClose={onClose} style={{ width: 480 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {error && <div style={{ color: 'var(--danger)', font: 'var(--text-body-sm)' }}>{error}</div>}
        <Input label="ФИО клиента" placeholder="Иванов Иван Иванович" value={form.fio} onChange={e => setForm({ ...form, fio: e.target.value })} />
        <Input label="Номер соглашения" placeholder="СГ-0000/00" value={form.agreement} onChange={e => setForm({ ...form, agreement: e.target.value })} />
        <Input label="Тематика обращения" placeholder="Например: Возврат средств" value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-secondary)', fontWeight: 600 }}>Суть обращения</span>
          <textarea placeholder="Опишите суть обращения клиента..." value={form.essence} onChange={e => setForm({ ...form, essence: e.target.value })} style={{ width: '100%', minHeight: 90, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 10, color: 'var(--text-primary)', font: 'var(--text-body-sm)', resize: 'vertical' }} />
        </div>
        <Input placeholder="Номер SD — если нет, оставьте пустым" value={form.sd} onChange={e => setForm({ ...form, sd: e.target.value })} />
        {!form.sd && <span style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>Без номера SD будет автоматически подставлено: «Запрос в ПП» (срок ответа — 4 раб. дня вместо 5)</span>}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
          <Button variant="ghost" onClick={onClose}>Отмена</Button>
          <Button variant="primary" onClick={submit} disabled={submitting || !form.fio.trim() || !form.topic.trim()}>{submitting ? 'Создание…' : 'Создать'}</Button>
        </div>
      </div>
    </Dialog>
  );
}
