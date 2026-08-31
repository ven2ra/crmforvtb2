import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';
export function Select({ options = [], value, onChange, style }) {
  const [open, setOpen] = useState(false);
  const label = options.find(o => o.value === value)?.label ?? options[0]?.label ?? '';
  return React.createElement('div', { style: { position: 'relative', ...style } },
    React.createElement('button', {
      onClick: () => setOpen(o => !o),
      style: {
        display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-pill)', padding: '8px 14px', color: 'var(--text-primary)', font: 'var(--text-body-sm)', fontWeight: 600, cursor: 'pointer',
      },
    }, label, React.createElement(Icon, { name: 'chevronDown', size: 14, color: 'var(--text-tertiary)' })),
    open && React.createElement('div', {
      style: {
        position: 'absolute', top: '110%', left: 0, minWidth: '100%', background: 'var(--bg-surface-3)', border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-pop)', padding: 6, zIndex: 20,
      },
    }, options.map(o => React.createElement('div', {
      key: o.value, onClick: () => { onChange?.(o.value); setOpen(false); },
      style: { padding: '7px 10px', borderRadius: 'var(--radius-sm)', font: 'var(--text-body-sm)', cursor: 'pointer', color: o.value === value ? 'var(--accent-hover)' : 'var(--text-primary)' },
    }, o.label))));
}
