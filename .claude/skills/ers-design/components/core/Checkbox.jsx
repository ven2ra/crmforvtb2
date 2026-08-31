import React from 'react';
export function Checkbox({ label, checked, onChange, disabled, style }) {
  return React.createElement('label', { style: { display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .5 : 1, ...style } },
    React.createElement('span', {
      onClick: () => !disabled && onChange?.(!checked),
      style: { width: 18, height: 18, borderRadius: 'var(--radius-sm)', background: checked ? 'var(--accent)' : 'var(--bg-surface-2)', border: checked ? 'none' : '1px solid var(--border-strong)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, transition: 'background var(--dur-fast) var(--ease-standard)' },
    }, checked ? '✓' : ''),
    label && React.createElement('span', { style: { font: 'var(--text-body)', color: 'var(--text-primary)' } }, label));
}