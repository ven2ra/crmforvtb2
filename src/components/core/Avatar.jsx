import React from 'react';
const COLORS = ['var(--avatar-1)','var(--avatar-2)','var(--avatar-3)','var(--avatar-4)','var(--avatar-5)'];
function hue(name=''){ let h=0; for(let i=0;i<name.length;i++) h=(h+name.charCodeAt(i))%COLORS.length; return COLORS[h]; }
export function Avatar({ name = '', src, size = 36, status, ring = false }) {
  const initials = name.split(' ').filter(Boolean).slice(0,2).map(s=>s[0]).join('').toUpperCase();
  return React.createElement('span', { style: { position: 'relative', display: 'inline-flex', width: size, height: size, flexShrink: 0 } },
    React.createElement(src ? 'img' : 'span', {
      src, style: {
        width: size, height: size, borderRadius: '50%', objectFit: 'cover',
        background: src ? undefined : hue(name), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        font: 'var(--text-caption)', fontWeight: 700, boxShadow: ring ? '0 0 0 2px var(--bg-canvas), 0 0 0 3.5px var(--accent)' : 'none',
      },
    }, !src && initials),
    status && React.createElement('span', {
      style: {
        position: 'absolute', bottom: -1, right: -1, width: size*0.3, height: size*0.3, borderRadius: '50%',
        background: status === 'online' ? 'var(--success)' : status === 'busy' ? 'var(--danger)' : 'var(--warning)',
        border: '2px solid var(--bg-surface)',
      },
    }));
}
export function AvatarStack({ names = [], max = 4, size = 32 }) {
  const shown = names.slice(0, max);
  const rest = names.length - shown.length;
  return React.createElement('span', { style: { display: 'inline-flex' } },
    shown.map((n, i) => React.createElement('span', { key: i, style: { marginLeft: i ? -size*0.28 : 0, zIndex: shown.length - i } },
      React.createElement(Avatar, { name: n, size, ring: false }))),
    rest > 0 && React.createElement('span', {
      style: {
        marginLeft: -size*0.28, width: size, height: size, borderRadius: '50%', background: 'var(--bg-surface-3)',
        color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: 'var(--text-caption)', fontWeight: 700,
      },
    }, '+' + rest));
}
