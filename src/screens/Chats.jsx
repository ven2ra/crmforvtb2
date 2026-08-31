import React, { useEffect, useState, useCallback } from 'react';
import { Avatar } from '../components/core/Avatar.jsx';
import { Input } from '../components/forms/Input.jsx';
import { Badge } from '../components/core/Badge.jsx';
import { Tag } from '../components/feedback/Tag.jsx';
import { Tabs } from '../components/navigation/Tabs.jsx';
import { Button } from '../components/core/Button.jsx';
import { StartChatDialog } from '../components/chat/StartChatDialog.jsx';
import { NewTicketDialog } from '../components/ticket/NewTicketDialog.jsx';
import { api } from '../lib/api.js';

export function Chats() {
  const [filter, setFilter] = useState('Активные');
  const [chats, setChats] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [chat, setChat] = useState(null);
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState(null);
  const [startOpen, setStartOpen] = useState(false);
  const [ticketPrefill, setTicketPrefill] = useState(null);
  const [closing, setClosing] = useState(false);

  const visible = chats.filter(c => c.status === filter);

  const loadChats = useCallback(() => {
    api.getChats().then(list => {
      setChats(list);
      const stillVisible = list.find(c => c.id === activeId && c.status === filter);
      if (!stillVisible) {
        const first = list.find(c => c.status === filter);
        setActiveId(first ? first.id : null);
      }
    }).catch(err => setError(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => { loadChats(); }, [loadChats]);

  useEffect(() => {
    if (activeId == null) { setChat(null); return; }
    api.getChat(activeId).then(setChat).catch(err => setError(err.message));
  }, [activeId]);

  const addTag = async () => {
    if (!newTag.trim() || !chat) return;
    const tag = newTag.trim();
    setNewTag('');
    try {
      await api.addChatTag(chat.id, tag);
      setChat(await api.getChat(chat.id));
    } catch (err) {
      setError(err.message);
    }
  };

  const removeTag = async (tagId) => {
    try {
      await api.removeChatTag(chat.id, tagId);
      setChat(await api.getChat(chat.id));
    } catch (err) {
      setError(err.message);
    }
  };

  const closeChat = async () => {
    setClosing(true);
    try {
      await api.updateChat(chat.id, { status: 'Закрытые' });
      loadChats();
      setChat(await api.getChat(chat.id));
    } catch (err) {
      setError(err.message);
    } finally {
      setClosing(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', height: '100%' }}>
      <div style={{ borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 20px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="primary" onClick={() => setStartOpen(true)} style={{ width: '100%' }}>+ Начать чат</Button>
          <Input icon="search" placeholder="Поиск чатов" />
          <Tabs items={['Активные', 'Закрытые']} active={filter} onChange={setFilter} />
        </div>
        <div style={{ overflowY: 'auto' }}>
          {visible.length === 0 && <div style={{ padding: '12px 20px', color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>Нет чатов</div>}
          {visible.map(c => (
            <div key={c.id} onClick={() => setActiveId(c.id)} className="row-hover" style={{ display: 'flex', gap: 12, padding: '12px 20px', cursor: 'pointer', background: activeId === c.id ? 'var(--bg-surface-2)' : 'transparent' }}>
              <Avatar name={c.name} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', fontWeight: 600 }}>{c.name}</span><span style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>{c.time}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ font: 'var(--text-caption)', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.topic || '—'}</span>
                  {c.ticket && <Badge tone="accent">№{c.ticket}</Badge>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: 32, overflowY: 'auto' }}>
        {!chat ? (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>Выберите чат</div>
        ) : (
          <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar name={chat.name} size={44} />
              <div style={{ flex: 1 }}>
                <div style={{ font: 'var(--text-h2)', fontWeight: 700, color: 'var(--text-primary)' }}>{chat.name}</div>
                <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginTop: 2 }}>{chat.date} · {chat.time}</div>
              </div>
              <Badge tone={chat.status === 'Активные' ? 'accent' : 'success'} dot>{chat.status === 'Активные' ? 'Активен' : 'Закрыт'}</Badge>
            </div>

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 20, boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>ГКК (УНК)</div>
                  <div style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>{chat.gkkUnk || '—'}</div>
                </div>
                <div>
                  <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Тематика</div>
                  <div style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>{chat.topic || '—'}</div>
                </div>
              </div>
              {chat.essence && (
                <div>
                  <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Суть вопроса</div>
                  <div style={{ font: 'var(--text-body-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{chat.essence}</div>
                </div>
              )}
              {(chat.malfunction || chat.transferCorrect === false) && (
                <div style={{ display: 'flex', gap: 6 }}>
                  {chat.malfunction && <Badge tone="danger">Сбой</Badge>}
                  {chat.transferCorrect === false && <Badge tone="danger">Некорр. перевод</Badge>}
                </div>
              )}
            </div>

            <div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>Привязка</div>
              {chat.ticket ? <Badge tone="accent" dot>Обращение №{chat.ticket}</Badge> : <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-tertiary)' }}>Не привязан к обращению</span>}
            </div>

            <div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>Теги оператора</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                {chat.tags.map(t => (<Tag key={t.id} onRemove={() => removeTag(t.id)}>{t.tag}</Tag>))}
              </div>
              <Input placeholder="Добавить тег…" value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addTag(); }} style={{ maxWidth: 300 }} />
            </div>

            <div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>Внутренняя заметка</div>
              <textarea
                placeholder="Видна только операторам..."
                defaultValue={chat.note}
                key={chat.id}
                onBlur={e => api.saveChatNote(chat.id, e.target.value).catch(err => setError(err.message))}
                style={{ width: '100%', minHeight: 90, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 10, color: 'var(--text-primary)', font: 'var(--text-body-sm)', resize: 'vertical' }}
              />
            </div>

            {chat.status === 'Активные' && (
              <div>
                <Button variant="secondary" onClick={closeChat} disabled={closing}>{closing ? 'Закрытие…' : 'Завершить чат'}</Button>
              </div>
            )}
          </div>
        )}
      </div>
      {error && <div style={{ position: 'fixed', bottom: 16, right: 16, background: 'var(--danger-soft)', color: 'var(--danger)', padding: '10px 16px', borderRadius: 'var(--radius-md)', font: 'var(--text-body-sm)' }} onClick={() => setError(null)}>{error}</div>}
      <StartChatDialog
        open={startOpen}
        onClose={() => setStartOpen(false)}
        onStarted={(chatId) => { setStartOpen(false); setFilter('Активные'); loadChats(); setActiveId(chatId); }}
        onNeedsTicket={(prefill) => { setStartOpen(false); setTicketPrefill(prefill); }}
      />
      <NewTicketDialog
        open={!!ticketPrefill}
        initial={ticketPrefill}
        source={ticketPrefill ? { chatId: ticketPrefill.chatId } : undefined}
        onClose={() => setTicketPrefill(null)}
        onCreated={() => { setTicketPrefill(null); setFilter('Активные'); loadChats(); if (ticketPrefill) setActiveId(ticketPrefill.chatId); }}
      />
    </div>
  );
}
