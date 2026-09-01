import React, { useEffect, useState, useCallback } from 'react';
import { Avatar } from '../components/core/Avatar.jsx';
import { Input } from '../components/forms/Input.jsx';
import { Badge } from '../components/core/Badge.jsx';
import { Tag } from '../components/feedback/Tag.jsx';
import { Tabs } from '../components/navigation/Tabs.jsx';
import { Button } from '../components/core/Button.jsx';
import { YesNoToggle } from '../components/common/YesNoToggle.jsx';
import { NewTicketDialog } from '../components/ticket/NewTicketDialog.jsx';
import { api } from '../lib/api.js';

export function Chats() {
  const [filter, setFilter] = useState('Активные');
  const [chats, setChats] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [chat, setChat] = useState(null);
  const [fio, setFio] = useState('');
  const [gkkUnk, setGkkUnk] = useState('');
  const [topic, setTopic] = useState('');
  const [essence, setEssence] = useState('');
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState(null);
  const [ticketPrefill, setTicketPrefill] = useState(null);
  const [closing, setClosing] = useState(false);
  const [starting, setStarting] = useState(false);

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
    api.getChat(activeId).then(c => {
      setChat(c);
      setFio(c.name);
      setGkkUnk(c.gkkUnk);
      setTopic(c.topic);
      setEssence(c.essence);
    }).catch(err => setError(err.message));
  }, [activeId]);

  const startChat = async () => {
    setStarting(true);
    try {
      const c = await api.startChat();
      setFilter('Активные');
      loadChats();
      setActiveId(c.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setStarting(false);
    }
  };

  const patch = (data) => {
    api.updateChat(chat.id, data).then(c => { setChat(c); loadChats(); }).catch(err => setError(err.message));
  };

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
          <Button variant="primary" onClick={startChat} disabled={starting} style={{ width: '100%' }}>{starting ? 'Начинаем…' : '+ Начать чат'}</Button>
          <Input icon="search" placeholder="Поиск чатов" />
          <Tabs items={['Активные', 'Закрытые']} active={filter} onChange={setFilter} />
        </div>
        <div style={{ overflowY: 'auto' }}>
          {visible.length === 0 && <div style={{ padding: '12px 20px', color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>Нет чатов</div>}
          {visible.map(c => (
            <div key={c.id} onClick={() => setActiveId(c.id)} className="row-hover" style={{ display: 'flex', gap: 12, padding: '12px 20px', cursor: 'pointer', background: activeId === c.id ? 'var(--bg-surface-2)' : 'transparent' }}>
              <Avatar name={c.name || '?'} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', fontWeight: 600 }}>{c.name || 'Новый чат'}</span><span style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>{c.time}</span></div>
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
          <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar name={fio || '?'} size={44} />
              <div style={{ flex: 1 }}>
                <Input
                  placeholder="ФИО клиента"
                  value={fio}
                  onChange={e => setFio(e.target.value)}
                  onBlur={() => patch({ fio })}
                  style={{ font: 'var(--text-h3)', fontWeight: 700 }}
                />
                <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginTop: 4 }}>{chat.date} · {chat.time}</div>
              </div>
              <Badge tone={chat.status === 'Активные' ? 'accent' : 'success'} dot>{chat.status === 'Активные' ? 'Активен' : 'Закрыт'}</Badge>
            </div>

            {error && <div style={{ color: 'var(--danger)', font: 'var(--text-body-sm)' }}>{error}</div>}

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 20, boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Input label="ГКК (УНК)" placeholder="Например: УНК-4521" value={gkkUnk} onChange={e => setGkkUnk(e.target.value)} onBlur={() => patch({ gkkUnk })} />
                <Input label="Тематика" placeholder="Например: Возврат средств" value={topic} onChange={e => setTopic(e.target.value)} onBlur={() => patch({ topic })} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-secondary)', fontWeight: 600 }}>Суть вопроса</span>
                <textarea
                  placeholder="Опишите суть вопроса клиента..."
                  value={essence}
                  onChange={e => setEssence(e.target.value)}
                  onBlur={() => patch({ essence })}
                  style={{ width: '100%', minHeight: 80, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 10, color: 'var(--text-primary)', font: 'var(--text-body-sm)', resize: 'vertical' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 14 }}>
              <YesNoToggle label="Перевод корректный?" value={chat.transferCorrect} onChange={v => patch({ transferCorrect: v })} badSide="no" />
              <YesNoToggle label="Сбой?" value={chat.malfunction} onChange={v => patch({ malfunction: v })} badSide="yes" />
              <YesNoToggle label="Требуется обращение?" value={chat.requiresTicket} onChange={v => patch({ requiresTicket: v })} />
            </div>

            <div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>Привязка</div>
              {chat.ticket ? (
                <Badge tone="accent" dot>Обращение №{chat.ticket}</Badge>
              ) : chat.requiresTicket ? (
                <Button variant="secondary" size="sm" onClick={() => setTicketPrefill({ chatId: chat.id, fio, topic, essence })}>Создать обращение</Button>
              ) : (
                <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-tertiary)' }}>Не привязан к обращению</span>
              )}
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
      <NewTicketDialog
        open={!!ticketPrefill}
        initial={ticketPrefill}
        source={ticketPrefill ? { chatId: ticketPrefill.chatId } : undefined}
        onClose={() => setTicketPrefill(null)}
        onCreated={() => { setTicketPrefill(null); loadChats(); if (activeId) api.getChat(activeId).then(setChat); }}
      />
    </div>
  );
}
