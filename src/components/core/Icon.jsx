import React from 'react';
const PATHS = {
  phone: 'M4 4c0-1.1.9-2 2-2h2.3c.5 0 1 .3 1.2.8l1.3 3c.2.5.1 1-.2 1.4L9 9c1 2.4 3 4.4 5.4 5.4l1.8-1.6c.4-.3.9-.4 1.4-.2l3 1.3c.5.2.8.7.8 1.2V18c0 1.1-.9 2-2 2h-1C9.6 20 4 14.4 4 7V4z',
  message: 'M3 12c0-4.4 4-8 9-8s9 3.6 9 8-4 8-9 8c-1.1 0-2.2-.2-3.2-.5L4 21l1.3-4.2C4.1 15.4 3 13.8 3 12z',
  inbox: 'M4 4h16l-2 9H6L4 4zM2 13h5l1.5 3h7L17 13h5M2 13v6a2 2 0 002 2h16a2 2 0 002-2v-6',
  users: 'M9 11a4 4 0 100-8 4 4 0 000 8zM3 21v-1a6 6 0 016-6h0a6 6 0 016 6v1M16 3.2a4 4 0 010 7.6M21 21v-1a6 6 0 00-4-5.7',
  clock: 'M12 8v4l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
  bell: 'M6 8a6 6 0 1112 0c0 3 1 5 2 6H4c1-1 2-3 2-6zM10 20a2 2 0 004 0',
  settings: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.6 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9c.2.6.7 1 1.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z',
  chevronDown: 'M6 9l6 6 6-6',
  check: 'M20 6L9 17l-5-5',
  x: 'M18 6L6 18M6 6l12 12',
  plus: 'M12 5v14M5 12h14',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  arrowUpRight: 'M7 17L17 7M8 7h9v9',
  calendar: 'M8 2v4M16 2v4M3 9h18M4 4h16a1 1 0 011 1v15a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z',
  filter: 'M4 5h16l-6 8v6l-4 2v-8L4 5z',
  video: 'M15 10l5-3v10l-5-3M3 6h11a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7a1 1 0 011-1z',
  mail: 'M3 6h18v12H3V6zM3 6l9 7 9-7',
  star: 'M12 2l3 6.5 7 .9-5 5 1.3 7-6.3-3.5L5.7 21.4 7 14.4l-5-5 7-.9L12 2z',
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
};
export function Icon({ name = 'phone', size = 18, color = 'currentColor', strokeWidth = 1.75, ...rest }) {
  const d = PATHS[name] || PATHS.phone;
  return React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', ...rest },
    React.createElement('path', { d, stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' }));
}
