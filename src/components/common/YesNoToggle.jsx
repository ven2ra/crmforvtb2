import React from 'react';

// badSide: 'yes' | 'no' | null — какой ответ подсвечивать как проблемный (красным)
export function YesNoToggle({ label, value, onChange, badSide }) {
  const yesActive = value === true;
  const noActive = value === false;
  const yesDanger = badSide === 'yes' && yesActive;
  const noDanger = badSide === 'no' && noActive;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
      <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>{label}</span>
      <div style={{ display: 'inline-flex', gap: 4, background: 'var(--bg-surface-2)', padding: 4, borderRadius: 'var(--radius-pill)' }}>
        <span
          onClick={() => onChange(true)}
          style={{
            padding: '6px 14px', borderRadius: 'var(--radius-pill)', font: 'var(--text-caption)', fontWeight: 600, cursor: 'pointer',
            color: yesActive ? '#fff' : 'var(--text-secondary)',
            background: yesActive ? (yesDanger ? 'var(--danger)' : 'var(--accent)') : 'transparent',
            transition: 'all var(--dur-fast) var(--ease-standard)',
          }}
        >Да</span>
        <span
          onClick={() => onChange(false)}
          style={{
            padding: '6px 14px', borderRadius: 'var(--radius-pill)', font: 'var(--text-caption)', fontWeight: 600, cursor: 'pointer',
            color: noActive ? '#fff' : 'var(--text-secondary)',
            background: noActive ? (noDanger ? 'var(--danger)' : 'var(--bg-surface-3)') : 'transparent',
            transition: 'all var(--dur-fast) var(--ease-standard)',
          }}
        >Нет</span>
      </div>
    </div>
  );
}
