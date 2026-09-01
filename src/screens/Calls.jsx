import React, { useEffect, useState, useCallback } from 'react';
import { Icon } from '../components/core/Icon.jsx';
import { Avatar, AvatarStack } from '../components/core/Avatar.jsx';
import { Badge } from '../components/core/Badge.jsx';
import { Tabs } from '../components/navigation/Tabs.jsx';
import { IconButton } from '../components/core/IconButton.jsx';
import { Button } from '../components/core/Button.jsx';
import { CallLivePage } from '../components/call/CallLivePage.jsx';
import { NewTicketDialog } from '../components/ticket/NewTicketDialog.jsx';
import { api } from '../lib/api.js';

export function Calls() {
  const [view, setView] = useState('Текущие');
  const [current, setCurrent] = useState({ ongoing: [], starting: [], onBreak: [] });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liveCallId, setLiveCallId] = useState(null);
  const [ticketPrefill, setTicketPrefill] = useState(null);
  const [starting, setStarting] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    const req = view === 'Текущие' ? api.getCalls('ongoing') : api.getCalls('history');
    req.then(data => {
      if (view === 'Текущие') setCurrent(data); else setHistory(data);
      setError(null);
    }).catch(err => setError(err.message)).finally(() => setLoading(false));
  }, [view]);

  useEffect(() => { if (!liveCallId) load(); }, [load, liveCallId]);

  const startCall = async () => {
    setStarting(true);
    try {
      const call = await api.startCall();
      setLiveCallId(call.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setStarting(false);
    }
  };

  const onCallFinished = (needsTicket) => {
    setLiveCallId(null);
    load();
    if (needsTicket) setTicketPrefill(needsTicket);
  };

  if (liveCallId != null) {
    return <CallLivePage callId={liveCallId} onExit={() => { setLiveCallId(null); load(); }} onFinished={onCallFinished} />;
  }

  return (
    <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '2.4fr 1fr', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ font: 'var(--text-display)', fontWeight: 800, color: 'var(--text-primary)' }}>Звонки</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Tabs items={['Текущие', 'История']} active={view} onChange={setView} />
            <Button variant="primary" onClick={startCall} disabled={starting}>{starting ? 'Начинаем…' : '+ Начать звонок'}</Button>
          </div>
        </div>
        {error && <div style={{ color: 'var(--danger)', font: 'var(--text-body-sm)' }}>{error}</div>}
        {loading && <div style={{ color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>Загрузка…</div>}
        {!loading && view === 'Текущие' ? (
          <React.Fragment>
            <div style={{ font: 'var(--text-h3)', fontWeight: 700, color: 'var(--text-primary)' }}>Текущие звонки</div>
            {current.ongoing.length === 0 && <div style={{ color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>Нет активных звонков</div>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              {current.ongoing.map(c => (
                <div key={c.id} className="lift" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 16, display: 'flex', flexDirection: 'column', gap: 10, boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={c.name || '?'} status="busy" />
                    <div><div style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', fontWeight: 600 }}>{c.name || 'Без номера'}</div><div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{c.duration}</div></div>
                  </div>
                  <div style={{ display: 'flex', gap: 14, font: 'var(--text-caption)', color: 'var(--text-secondary)', alignItems: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="phone" size={12} />{c.incoming}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="clock" size={12} />{c.pending}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <AvatarStack names={c.team} size={22} />
                    <span style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>ID {c.id}</span>
                  </div>
                  {c.isMine ? (
                    <Button variant="secondary" size="sm" onClick={() => setLiveCallId(c.id)}>Продолжить звонок</Button>
                  ) : (
                    <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', textAlign: 'center', padding: '6px 0' }}>Звонок другого оператора</div>
                  )}
                </div>
              ))}
            </div>
          </React.Fragment>
        ) : !loading && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1.4fr 1.2fr 90px 1fr 90px', gap: 12, padding: '12px 20px', font: 'var(--text-caption)', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-subtle)' }}>
              <span>Запись</span><span>Клиент</span><span>Дата</span><span>Длит.</span><span>Тематика</span><span>Тикет</span>
            </div>
            {history.length === 0 && <div style={{ padding: 20, color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>История пуста</div>}
            {history.map(h => (
              <div key={h.id} className="row-hover" style={{ display: 'grid', gridTemplateColumns: '90px 1.4fr 1.2fr 90px 1fr 90px', gap: 12, padding: '14px 20px', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', font: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: h.rec ? 'var(--accent-hover)' : 'var(--text-tertiary)' }}><Icon name="video" size={14} />{h.rec ? 'есть' : 'нет'}</span>
                <div>
                  <div>{h.name || 'Без номера'}</div>
                  {(h.malfunction || h.transferCorrect === false) && (
                    <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                      {h.malfunction && <Badge tone="danger">Сбой</Badge>}
                      {h.transferCorrect === false && <Badge tone="danger">Некорр. перевод</Badge>}
                    </div>
                  )}
                </div>
                <span style={{ color: 'var(--text-tertiary)' }}>{h.date}</span>
                <span style={{ color: 'var(--text-tertiary)' }}>{h.duration}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{h.topic || '—'}</span>
                {h.ticket ? <Badge tone="accent">№{h.ticket}</Badge> : <span style={{ color: 'var(--text-tertiary)' }}>—</span>}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ font: 'var(--text-h3)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Начинаются звонки</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {current.starting.length === 0 && <div style={{ color: 'var(--text-tertiary)', font: 'var(--text-caption)' }}>Нет ожидающих звонков</div>}
            {current.starting.map(n => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 10 }}>
                <Avatar name={n} size={30} /><span style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', flex: 1 }}>{n}</span><IconButton icon={<Icon name="phone" />} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ font: 'var(--text-h3)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>На перерыве</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {current.onBreak.length === 0 && <div style={{ color: 'var(--text-tertiary)', font: 'var(--text-caption)' }}>Никого нет на перерыве</div>}
            {current.onBreak.map(([n, t]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 10 }}>
                <Avatar name={n} size={30} status="offline" /><span style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', flex: 1 }}>{n}</span><Badge tone="warning">{t}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NewTicketDialog
        open={!!ticketPrefill}
        initial={ticketPrefill}
        source={ticketPrefill ? { callId: ticketPrefill.callId } : undefined}
        onClose={() => setTicketPrefill(null)}
        onCreated={() => { setTicketPrefill(null); load(); }}
      />
    </div>
  );
}
