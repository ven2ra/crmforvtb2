import React from 'react';
export function Switch({ checked = false, onChange, disabled }) {
  return React.createElement('button', {
    role: 'switch', 'aria-checked': checked, disabled, onClick: () => onChange?.(!checked),
    style: {
      width: 40, height: 24, borderRadius: 'var(--radius-pill)', border: 'none', padding: 3, cursor: disabled ? 'not-allowed' : 'pointer',
      background: checked ? 'var(--accent)' : 'var(--bg-surface-3)', transition: 'background var(--dur-fast) var(--ease-standard)', opacity: disabled ? .5 : 1,
    },
  }, React.createElement('span', {
    style: {
      display: 'block', width: 18, height: 18, borderRadius: '50%', background: '#fff',
      transform: checked ? 'translateX(16px)' : 'translateX(0)', transition: 'transform var(--dur-fast) var(--ease-standard)',
    },
  }));
}
