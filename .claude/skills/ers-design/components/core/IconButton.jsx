import React from 'react';
export function IconButton({ icon, active, size = 36, disabled, style, ...rest }) {
  return React.createElement('button', {
    disabled, ...rest,
    style: {
      width: size, height: size, borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: active ? 'var(--accent-soft)' : 'var(--bg-surface-2)', color: active ? 'var(--accent-hover)' : 'var(--text-secondary)',
      border: active ? '1px solid transparent' : '1px solid var(--border-subtle)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .5 : 1,
      transition: 'background var(--dur-fast) var(--ease-standard)', ...style,
    },
  }, icon);
}