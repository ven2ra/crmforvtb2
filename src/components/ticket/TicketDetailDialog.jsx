import React, { useEffect, useState, useCallback } from 'react';
import { Dialog } from '../overlay/Dialog.jsx';
import { Badge } from '../core/Badge.jsx';
import { Avatar } from '../core/Avatar.jsx';
import { Select } from '../forms/Select.jsx';
import { Button } from '../core/Button.jsx';
import { api } from '../../lib/api.js';

const STATUS_TONE = { Новое: 'accent', 'В работе': 'warning', Закрыто: 'success' };
const STATUS_OPTIONS = [{ value: 'Новое', label: 'Новое' }, { value: 'В работе', label: 'В работе' }, { value: 'Закрыто', label: 'Закрыто' }];

export function TicketDetailDialog({ ticketId, onClose, onChanged }) {
  const [ticket, setTicket] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [reassigning, setReassigning] = useState(false);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    if (ticketId == null) return;
    api.getTicket(ticketId).then(setTicket).catch(err => setError(err.message));
  }, [ticketId]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { api.getEmployees().then(setEmployees).catch(() => {}); }, []);

  const changeStatus = async (status) => {
    setBusy(true);
    try {
      const updated = await api.updateTicket(ticketId, { status });
      setTicket(updated);
      onChanged?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const reassign = async (ownerId) => {
    setBusy(true);
    try {
      const updated = await api.updateTicket(ticketId, { ownerId: Number(ownerId) });
      setTicket(updated);
      setReassigning(false);
      onChanged?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={ticketId != null} title={ticket ? `Обращение №${ticket.number}` : 'Обращение'} onClose={onClose} style={{ width: 520 }}>
      {!ticket ? (
        <div style={{ color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>{error || 'Загрузка…'}</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {error && <div style={{ color: 'var(--danger)', font: 'var(--text-body-sm)' }}>{error}</div>}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ font: 'var(--text-body)', fontWeight: 700, color: 'var(--text-primary)' }}>{ticket.fio}</div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginTop: 2 }}>{ticket.agreement || 'Без номера соглашения'}</div>
            </div>
            <Select
              options={STATUS_OPTIONS}
              value={ticket.status}
              onChange={changeStatus}
              style={{ width: 150 }}
            />
          </div>

          <div>
            <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Тематика</div>
            <div style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>{ticket.topic}</div>
          </div>

          {ticket.essence && (
            <div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Суть обращения</div>
              <div style={{ font: 'var(--text-body-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{ticket.essence}</div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>№ SD</div>
              <div style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>{ticket.sd}</div>
            </div>
            <div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Создано</div>
              <div style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>{ticket.createdAt}</div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 4 }}>Срок ответа ({ticket.deadlineDays} раб. дня — {ticket.sd === 'Запрос в ПП' ? 'Запрос в ПП' : 'SD оформлен'})</div>
              <div style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', fontWeight: 600 }}>до {ticket.deadlineDate}</div>
            </div>
            {ticket.status === 'Закрыто' ? (
              <Badge tone={ticket.closedOnTime ? 'success' : 'danger'} dot>{ticket.closedOnTime ? 'Закрыто вовремя' : 'Закрыто с опозданием'}</Badge>
            ) : ticket.overdue ? (
              <Badge tone="danger" dot>Просрочено</Badge>
            ) : (
              <Badge tone="neutral" dot>В сроке</Badge>
            )}
          </div>

          <div>
            <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>Ответственный</div>
            {!reassigning ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={ticket.owner || '?'} size={30} />
                <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', flex: 1 }}>{ticket.owner || 'Не назначен'}</span>
                <Button variant="ghost" size="sm" onClick={() => setReassigning(true)} disabled={busy}>Переназначить</Button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Select
                  options={employees.map(e => ({ value: String(e.id), label: `${e.name} · ${e.department}${e.status === 'offline' ? ' (не на месте)' : ''}` }))}
                  value={String(ticket.ownerId || '')}
                  onChange={reassign}
                  style={{ flex: 1 }}
                />
                <Button variant="ghost" size="sm" onClick={() => setReassigning(false)}>Отмена</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Dialog>
  );
}
