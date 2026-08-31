import React, { useEffect, useState, useCallback } from 'react';
import { Avatar } from '../components/core/Avatar.jsx';
import { Input } from '../components/forms/Input.jsx';
import { Icon } from '../components/core/Icon.jsx';
import { IconButton } from '../components/core/IconButton.jsx';
import { Badge } from '../components/core/Badge.jsx';
import { Tag } from '../components/feedback/Tag.jsx';
import { Tabs } from '../components/navigation/Tabs.jsx';
import { Button } from '../components/core/Button.jsx';
import { api } from '../lib/api.js';

export function Chats() {
  const [filter, setFilter] = useState('Активные');
  const [chats, setChats] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [chat, setChat] = useState(null);
  const [notesOpen, setNotesOpen] = useState(true);
  const [draft, setDraft] = useState('');
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState(null);

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

  const send = async () => {
    if (!draft.trim() || !chat) return;
    const text = draft.trim();
    setDraft('');
    try {
      await api.sendChatMessage(chat.id, text);
      const fresh = await api.getChat(chat.id);
      setChat(fresh);
      loadChats();
    } catch (err) {
      setError(err.message);
    }
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

  return (
    <div style={{ display: 'grid', gridTemplateColumns: notesOpen ? '320px 1fr 260px' : '320px 1fr', height: '100%' }}>
      <div style={{ borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 20px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ font: 'var(--text-caption)', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.last}</span>{c.unread > 0 && <Badge tone="accent">{c.unread}</Badge>}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {!chat ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>Выберите чат</div>
        ) : (
          <React.Fragment>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name={chat.name} status="online" ring />
              <div style={{ flex: 1 }}>
                <div style={{ font: 'var(--text-h3)', fontWeight: 700, color: 'var(--text-primary)' }}>{chat.name}</div>
                {chat.ticket && <Badge tone="accent" dot>Обращение №{chat.ticket}</Badge>}
              </div>
              <IconButton icon={<Icon name="filter" />} active={notesOpen} onClick={() => setNotesOpen(o => !o)} />
            </div>
            <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
              {chat.messages.map(m => (
                <div key={m.id} style={{ alignSelf: m.me ? 'flex-end' : 'flex-start', maxWidth: '60%', background: m.me ? 'var(--accent)' : 'var(--bg-surface-2)', color: m.me ? '#fff' : 'var(--text-primary)', borderRadius: 'var(--radius-lg)', padding: '10px 14px', font: 'var(--text-body-sm)' }}>
                  {m.text}
                  <div style={{ font: 'var(--text-caption)', opacity: .7, marginTop: 4, textAlign: 'right' }}>{m.time}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 10, alignItems: 'center' }}>
              <Input
                placeholder={filter === 'Закрытые' ? 'Чат закрыт' : 'Написать сообщение...'}
                style={{ flex: 1 }}
                value={draft}
                disabled={filter === 'Закрытые'}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') send(); }}
              />
              <IconButton icon={<Icon name="arrowUpRight" />} active disabled={filter === 'Закрытые'} onClick={send} />
            </div>
          </React.Fragment>
        )}
      </div>
      {notesOpen && chat && (
        <div style={{ borderLeft: '1px solid var(--border-subtle)', padding: 20, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
          <div>
            <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>Привязка</div>
            {chat.ticket ? <Badge tone="accent" dot>Обращение №{chat.ticket}</Badge> : <Button variant="secondary" size="sm">Привязать к обращению</Button>}
          </div>
          <div>
            <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>Теги оператора</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
              {chat.tags.map(t => (<Tag key={t.id} onRemove={() => removeTag(t.id)}>{t.tag}</Tag>))}
            </div>
            <Input placeholder="Добавить тег…" value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addTag(); }} />
          </div>
          <div>
            <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>Внутренняя заметка</div>
            <textarea
              placeholder="Видна только операторам..."
              defaultValue={chat.note}
              key={chat.id}
              onBlur={e => api.saveChatNote(chat.id, e.target.value).catch(err => setError(err.message))}
              style={{ width: '100%', minHeight: 100, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 10, color: 'var(--text-primary)', font: 'var(--text-body-sm)', resize: 'vertical' }}
            />
          </div>
        </div>
      )}
      {error && <div style={{ position: 'fixed', bottom: 16, right: 16, background: 'var(--danger-soft)', color: 'var(--danger)', padding: '10px 16px', borderRadius: 'var(--radius-md)', font: 'var(--text-body-sm)' }} onClick={() => setError(null)}>{error}</div>}
    </div>
  );
}
