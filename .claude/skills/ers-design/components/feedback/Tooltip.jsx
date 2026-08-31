import React, { useState } from 'react';
export function Tooltip({ label, children }) {
  const [show, setShow] = useState(false);
  return React.createElement('span', { style: { position: 'relative', display: 'inline-flex' }, onMouseEnter: () => setShow(true), onMouseLeave: () => setShow(false) },
    children,
    show && React.createElement('span', { style: { position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-surface-3)', color: 'var(--text-primary)', font: 'var(--text-caption)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', whiteSpace: 'nowrap', boxShadow: 'var(--shadow-pop)', zIndex: 10 } }, label));
}