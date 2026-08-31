# CRM UI Kit — ЕРС (Единая рабочая система)

Interactive click-through recreation of the employee CRM workspace: a dark, violet-accented operations tool for handling tickets, calls, and chats.

## Screens (index.html, tab-switched)
- **Главная** (`Home.jsx`) — employee dashboard: greeting, department-load bars, stat tiles, "Мои ближайшие" (my upcoming) list of calls/tickets/chats.
- **Обращения** (`Tickets.jsx`) — ticket list with status/priority filters, search, table, and a "new ticket" Dialog.
- **Звонки** (`Calls.jsx`) — call-center view modeled on the uploaded reference screenshot: activity chart, ongoing-call cards, starting-calls and on-break side lists.
- **Чаты** (`Chats.jsx`) — two-pane chat: conversation list with unread badges + active thread with bubbles and composer.
- **История обращений** (`History.jsx`) — read-only archive table of closed tickets with resolution time and rating.

All screens compose primitives from `components/` (Button, Input, Select, Badge, Tag, Avatar/AvatarStack, StatCard, ProgressBar, Tabs, NavItem, Dialog, Icon) — none re-implement a primitive locally.

Content (names, ticket subjects, chat text) is illustrative filler standing in for real data.
