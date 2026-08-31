import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Input({ icon, placeholder = '', value, onChange, type = 'text', style, ...rest }) {
  return React.createElement('div', {
    style: {
      display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-surface-2)',
      border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-pill)', padding: '9px 14px', ...style,
    },
  },
    icon && React.createElement(Icon, { name: icon, size: 16, color: 'var(--text-tertiary)' }),
    React.createElement('input', {
      type, placeholder, value, onChange, ...rest,
      style: { flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', font: 'var(--text-body)' },
    }));
}
