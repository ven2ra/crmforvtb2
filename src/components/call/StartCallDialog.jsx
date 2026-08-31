import React, { useState } from 'react';
import { Dialog } from '../overlay/Dialog.jsx';
import { Input } from '../forms/Input.jsx';
import { Button } from '../core/Button.jsx';
import { YesNoToggle } from '../common/YesNoToggle.jsx';
import { api } from '../../lib/api.js';

const EMPTY = { phone: '', agreement: '', topic: '', essence: '' };

export function StartCallDialog({ open, onClose, onLogged, onNeedsTicket }) {
  const [form, setForm] = useState(EMPTY);
  const [isClient, setIsClient] = useState(true);
  const [transferCorrect, setTransferCorrect] = useState(true);
  const [malfunction, setMalfunction] = useState(false);
  const [requiresTicket, setRequiresTicket] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const reset = () => {
    setForm(EMPTY);
    setIsClient(true);
    setTransferCorrect(true);
    setMalfunction(false);
    setRequiresTicket(false);
    setError(null);
  };

  const close = () => { reset(); onClose(); };

  const submit = async () => {
    if (!form.phone.trim()) return;
    setSubmitting(true);
    try {
      const call = await api.startCall({
        ...form,
        isClient,
        transferCorrect,
        malfunction,
        requiresTicket,
      });
      reset();
      if (requiresTicket) {
        onNeedsTicket({
          callId: call.id,
          fio: form.phone.trim(),
          agreement: form.agreement,
          topic: form.topic,
          essence: form.essence,
        });
      } else {
        onLogged();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} title="Начать звонок" onClose={close} style={{ width: 480 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {error && <div style={{ color: 'var(--danger)', font: 'var(--text-body-sm)' }}>{error}</div>}
        <Input label="Номер телефона звонящего" placeholder="+7 900 123-45-67" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <Input
          label="Номер соглашения"
          placeholder="11MD3A"
          value={form.agreement}
          maxLength={6}
          onChange={e => setForm({ ...form, agreement: e.target.value.toUpperCase() })}
        />
        <Input label="Тематика обращения" placeholder="Например: Возврат средств" value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-secondary)', fontWeight: 600 }}>Суть вопроса</span>
          <textarea placeholder="Опишите суть вопроса клиента..." value={form.essence} onChange={e => setForm({ ...form, essence: e.target.value })} style={{ width: '100%', minHeight: 80, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 10, color: 'var(--text-primary)', font: 'var(--text-body-sm)', resize: 'vertical' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 14 }}>
          <YesNoToggle label="Это клиент?" value={isClient} onChange={setIsClient} />
          <YesNoToggle label="Перевод корректный?" value={transferCorrect} onChange={setTransferCorrect} badSide="no" />
          <YesNoToggle label="Сбой?" value={malfunction} onChange={setMalfunction} badSide="yes" />
          <YesNoToggle label="Требуется обращение?" value={requiresTicket} onChange={setRequiresTicket} />
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
          <Button variant="ghost" onClick={close}>Отмена</Button>
          <Button variant="primary" onClick={submit} disabled={submitting || !form.phone.trim()}>
            {submitting ? 'Сохранение…' : requiresTicket ? 'Далее — создать обращение' : 'Сохранить звонок'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
