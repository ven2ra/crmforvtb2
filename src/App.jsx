import React, { useState } from 'react';
import { Sidebar } from './Sidebar.jsx';
import { Home } from './screens/Home.jsx';
import { Tickets } from './screens/Tickets.jsx';
import { Calls } from './screens/Calls.jsx';
import { Chats } from './screens/Chats.jsx';
import { History } from './screens/History.jsx';

const SCREENS = { home: Home, tickets: Tickets, calls: Calls, chats: Chats, history: History };

export function App() {
  const [tab, setTab] = useState('home');
  const [openTicketId, setOpenTicketId] = useState(null);
  const Screen = SCREENS[tab];

  const openTicket = (id) => { setTab('tickets'); setOpenTicketId(id); };

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-canvas)', fontFamily: 'var(--font-sans)', overflow: 'hidden' }}>
      <Sidebar active={tab} onNav={setTab} />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Screen openTicketId={openTicketId} onOpenTicketIdChange={setOpenTicketId} onOpenTicket={openTicket} />
      </div>
    </div>
  );
}
