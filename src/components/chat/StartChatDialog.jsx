import React, { useState } from 'react';
import { Dialog } from '../overlay/Dialog.jsx';
import { Input } from '../forms/Input.jsx';
import { Button } from '../core/Button.jsx';
import { YesNoToggle } from '../common/YesNoToggle.jsx';
import { api } from '../../lib/api.js';

const EMPTY = { fio: '', gkkUnk: '', topic: '', essence: '' };

export function StartChatDialog({ open, onClose, onStarted, onNeedsTicket }) {
  const [form, setForm] = useState(EMPTY);
  const [transferCorrect, setTransferCorrect] = useState(true);
  const [malfunction, setMalfunction] = useState(false);
  const [requiresTicket, setRequiresTicket] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const reset = () => {
    setForm(EMPTY);
    setTransferCorrect(true);
    setMalfunction(false);
    setRequiresTicket(false);
    setError(null);
  };

  const close = () => { reset(); onClose(); };

  const submit = async () => {
    if (!form.fio.trim()) return;
    setSubmitting(true);
    try {
      const chat = await api.startChat({
        ...form,
        transferCorrect,
        malfunction,
        requiresTicket,
      });
      reset();
      if (requiresTicket) {
        onNeedsTicket({
          chatId: chat.id,
          fio: form.fio.trim(),
          topic: form.topic,
          essence: form.essence,
        });
      } else {
        onStarted(chat.id);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} title="Начать чат" onClose={close} style={{ width: 480 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {error && <div style={{ color: 'var(--danger)', font: 'var(--text-body-sm)' }}>{error}</div>}
        <Input label="ФИО клиента" placeholder="Иванов Иван Иванович" value={form.fio} onChange={e => setForm({ ...form, fio: e.target.value })} />
        <Input label="ГКК (УНК)" placeholder="Например: УНК-4521" value={form.gkkUnk} onChange={e => setForm({ ...form, gkkUnk: e.target.value })} />
        <Input label="Тематика вопроса" placeholder="Например: Возврат средств" value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-secondary)', fontWeight: 600 }}>Суть вопроса</span>
          <textarea placeholder="Опишите суть вопроса клиента..." value={form.essence} onChange={e => setForm({ ...form, essence: e.target.value })} style={{ width: '100%', minHeight: 80, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 10, color: 'var(--text-primary)', font: 'var(--text-body-sm)', resize: 'vertical' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 14 }}>
          <YesNoToggle label="Перевод корректный?" value={transferCorrect} onChange={setTransferCorrect} badSide="no" />
          <YesNoToggle label="Сбой?" value={malfunction} onChange={setMalfunction} badSide="yes" />
          <YesNoToggle label="Требуется обращение?" value={requiresTicket} onChange={setRequiresTicket} />
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
          <Button variant="ghost" onClick={close}>Отмена</Button>
          <Button variant="primary" onClick={submit} disabled={submitting || !form.fio.trim()}>
            {submitting ? 'Создание…' : requiresTicket ? 'Далее — создать обращение' : 'Начать чат'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
