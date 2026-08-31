/* @ds-bundle: {"format":4,"namespace":"CRMDesignSystem_14b93b","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"AvatarStack","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Checkbox","sourcePath":"components/core/Checkbox.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Radio","sourcePath":"components/core/Radio.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"NavItem","sourcePath":"components/navigation/NavItem.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Dialog","sourcePath":"components/overlay/Dialog.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"418dca39c0d1","components/core/Badge.jsx":"a42e6e8c9f4b","components/core/Button.jsx":"413a84c6c89d","components/core/Card.jsx":"8e4e58ab3034","components/core/Checkbox.jsx":"e04a4fca0237","components/core/Icon.jsx":"22767bdb2b56","components/core/IconButton.jsx":"5e793488fa52","components/core/Radio.jsx":"5e7a21547a8d","components/data/ProgressBar.jsx":"a4c93994f19c","components/data/StatCard.jsx":"b78d7fec08a8","components/feedback/Tag.jsx":"f577dbc41f1d","components/feedback/Toast.jsx":"261cf77288f6","components/feedback/Tooltip.jsx":"7aae71e98b12","components/forms/Input.jsx":"571f9e95e4cd","components/forms/Select.jsx":"7bae0965669d","components/forms/Switch.jsx":"ffad6b59eac3","components/navigation/NavItem.jsx":"6d5d97459b70","components/navigation/Tabs.jsx":"1778bbb49e32","components/overlay/Dialog.jsx":"11f74a9440da","ui_kits/crm/App.jsx":"167c3b9f62d8","ui_kits/crm/Calls.jsx":"9ada4aeb4550","ui_kits/crm/Chats.jsx":"610f9159344c","ui_kits/crm/History.jsx":"7bec23559c50","ui_kits/crm/Home.jsx":"6e8d316fd910","ui_kits/crm/Sidebar.jsx":"5659019f3040","ui_kits/crm/Tickets.jsx":"d8a63ee798c8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CRMDesignSystem_14b93b = window.CRMDesignSystem_14b93b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
const COLORS = ['var(--avatar-1)', 'var(--avatar-2)', 'var(--avatar-3)', 'var(--avatar-4)', 'var(--avatar-5)'];
function hue(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h + name.charCodeAt(i)) % COLORS.length;
  return COLORS[h];
}
function Avatar({
  name = '',
  src,
  size = 36,
  status,
  ring = false
}) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(s => s[0]).join('').toUpperCase();
  return React.createElement('span', {
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: size,
      height: size,
      flexShrink: 0
    }
  }, React.createElement(src ? 'img' : 'span', {
    src,
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      objectFit: 'cover',
      background: src ? undefined : hue(name),
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: 'var(--text-caption)',
      fontWeight: 700,
      boxShadow: ring ? '0 0 0 2px var(--bg-canvas), 0 0 0 3.5px var(--accent)' : 'none'
    }
  }, !src && initials), status && React.createElement('span', {
    style: {
      position: 'absolute',
      bottom: -1,
      right: -1,
      width: size * 0.3,
      height: size * 0.3,
      borderRadius: '50%',
      background: status === 'online' ? 'var(--success)' : status === 'busy' ? 'var(--danger)' : 'var(--warning)',
      border: '2px solid var(--bg-surface)'
    }
  }));
}
function AvatarStack({
  names = [],
  max = 4,
  size = 32
}) {
  const shown = names.slice(0, max);
  const rest = names.length - shown.length;
  return React.createElement('span', {
    style: {
      display: 'inline-flex'
    }
  }, shown.map((n, i) => React.createElement('span', {
    key: i,
    style: {
      marginLeft: i ? -size * 0.28 : 0,
      zIndex: shown.length - i
    }
  }, React.createElement(Avatar, {
    name: n,
    size,
    ring: false
  }))), rest > 0 && React.createElement('span', {
    style: {
      marginLeft: -size * 0.28,
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'var(--bg-surface-3)',
      color: 'var(--text-secondary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: 'var(--text-caption)',
      fontWeight: 700
    }
  }, '+' + rest));
}
Object.assign(__ds_scope, { Avatar, AvatarStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const TONES = {
  neutral: {
    bg: 'var(--bg-surface-3)',
    fg: 'var(--text-secondary)'
  },
  success: {
    bg: 'var(--success-soft)',
    fg: 'var(--success)'
  },
  warning: {
    bg: 'var(--warning-soft)',
    fg: 'var(--warning)'
  },
  danger: {
    bg: 'var(--danger-soft)',
    fg: 'var(--danger)'
  },
  accent: {
    bg: 'var(--accent-soft)',
    fg: 'var(--accent-hover)'
  }
};
function Badge({
  tone = 'neutral',
  dot = false,
  children
}) {
  const t = TONES[tone] || TONES.neutral;
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 10px',
      borderRadius: 'var(--radius-pill)',
      font: 'var(--text-caption)',
      fontWeight: 600,
      background: t.bg,
      color: t.fg,
      whiteSpace: 'nowrap'
    }
  }, dot && React.createElement('span', {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: t.fg,
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const VARIANTS = {
  primary: {
    background: 'var(--accent)',
    color: '#fff',
    border: '1px solid transparent'
  },
  secondary: {
    background: 'var(--bg-surface-3)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-subtle)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid transparent'
  },
  danger: {
    background: 'var(--danger-soft)',
    color: 'var(--danger)',
    border: '1px solid transparent'
  }
};
const SIZES = {
  sm: {
    padding: '6px 12px',
    font: 'var(--text-body-sm)',
    gap: 6
  },
  md: {
    padding: '9px 16px',
    font: 'var(--text-body)',
    gap: 8
  },
  lg: {
    padding: '12px 20px',
    font: 'var(--text-h3)',
    gap: 8
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  disabled,
  children,
  style,
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  return React.createElement('button', {
    disabled,
    ...rest,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      padding: s.padding,
      font: s.font,
      fontWeight: 600,
      borderRadius: 'var(--radius-pill)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast)',
      ...v,
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(.97)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  padding = 20,
  highlight = false,
  style,
  children
}) {
  return React.createElement('div', {
    style: {
      background: highlight ? 'var(--grad-accent)' : 'var(--bg-surface)',
      border: highlight ? 'none' : '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding,
      boxShadow: 'var(--shadow-card)',
      color: highlight ? '#fff' : 'var(--text-primary)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  style
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      ...style
    }
  }, React.createElement('span', {
    onClick: () => !disabled && onChange?.(!checked),
    style: {
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-sm)',
      background: checked ? 'var(--accent)' : 'var(--bg-surface-2)',
      border: checked ? 'none' : '1px solid var(--border-strong)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 11,
      transition: 'background var(--dur-fast) var(--ease-standard)'
    }
  }, checked ? '✓' : ''), label && React.createElement('span', {
    style: {
      font: 'var(--text-body)',
      color: 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
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
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10'
};
function Icon({
  name = 'phone',
  size = 18,
  color = 'currentColor',
  strokeWidth = 1.75,
  ...rest
}) {
  const d = PATHS[name] || PATHS.phone;
  return React.createElement('svg', {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    ...rest
  }, React.createElement('path', {
    d,
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  active,
  size = 36,
  disabled,
  style,
  ...rest
}) {
  return React.createElement('button', {
    disabled,
    ...rest,
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-md)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: active ? 'var(--accent-soft)' : 'var(--bg-surface-2)',
      color: active ? 'var(--accent-hover)' : 'var(--text-secondary)',
      border: active ? '1px solid transparent' : '1px solid var(--border-subtle)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      transition: 'background var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Radio.jsx
try { (() => {
function Radio({
  label,
  checked,
  onChange,
  style
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: 'pointer',
      ...style
    }
  }, React.createElement('span', {
    onClick: () => onChange?.(),
    style: {
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-circle)',
      border: `2px solid ${checked ? 'var(--accent)' : 'var(--border-strong)'}`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, checked && React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: 'var(--radius-circle)',
      background: 'var(--accent)'
    }
  })), label && React.createElement('span', {
    style: {
      font: 'var(--text-body)',
      color: 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Radio.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function ProgressBar({
  value = 0,
  max = 100,
  color = 'var(--accent)',
  style
}) {
  const pct = Math.min(100, value / max * 100);
  return React.createElement('div', {
    style: {
      width: '100%',
      height: 6,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--bg-surface-3)',
      overflow: 'hidden',
      ...style
    }
  }, React.createElement('div', {
    style: {
      width: pct + '%',
      height: '100%',
      background: color,
      borderRadius: 'var(--radius-pill)',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function StatCard({
  label,
  value,
  delta,
  deltaDirection = 'up',
  accent,
  trend,
  style
}) {
  return React.createElement('div', {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: 20,
      boxShadow: 'var(--shadow-card)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 170,
      ...style
    }
  }, React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(120% 100% at 100% 0%, rgba(139,92,246,.10), transparent 55%)',
      pointerEvents: 'none'
    }
  }), React.createElement('span', {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-secondary)',
      fontWeight: 'var(--weight-medium)'
    }
  }, label), React.createElement('span', {
    style: {
      font: 'var(--text-display)',
      fontWeight: 'var(--weight-extrabold)',
      color: accent || 'var(--text-primary)',
      letterSpacing: '-.02em'
    }
  }, value), delta && React.createElement('span', {
    style: {
      font: 'var(--text-caption)',
      color: deltaDirection === 'up' ? 'var(--success)' : 'var(--danger)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, (deltaDirection === 'up' ? '↑ ' : '↓ ') + delta), trend && React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 3,
      height: 24,
      marginTop: 4
    }
  }, trend.map((v, i) => React.createElement('span', {
    key: i,
    style: {
      flex: 1,
      height: v / Math.max(...trend) * 100 + '%',
      minHeight: 2,
      borderRadius: 2,
      background: i === trend.length - 1 ? accent || 'var(--accent)' : 'var(--bg-surface-3)'
    }
  }))));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
function Tag({
  children,
  onRemove,
  style
}) {
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 8px 5px 12px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--bg-surface-2)',
      border: '1px solid var(--border-subtle)',
      font: 'var(--text-body-sm)',
      color: 'var(--text-primary)',
      ...style
    }
  }, children, onRemove && React.createElement('span', {
    onClick: onRemove,
    style: {
      cursor: 'pointer',
      color: 'var(--text-tertiary)',
      fontSize: 11,
      padding: '0 2px'
    }
  }, '✕'));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  variant = 'info',
  title,
  description,
  onClose,
  style
}) {
  const colors = {
    success: 'var(--success)',
    danger: 'var(--danger)',
    warning: 'var(--warning)',
    info: 'var(--accent)'
  };
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      background: 'var(--bg-surface-2)',
      border: '1px solid var(--border-subtle)',
      borderLeft: `3px solid ${colors[variant]}`,
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
      boxShadow: 'var(--shadow-pop)',
      minWidth: 280,
      ...style
    }
  }, React.createElement('div', {
    style: {
      flex: 1
    }
  }, React.createElement('div', {
    style: {
      font: 'var(--text-body)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-primary)'
    }
  }, title), description && React.createElement('div', {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, description)), onClose && React.createElement('span', {
    onClick: onClose,
    style: {
      cursor: 'pointer',
      color: 'var(--text-tertiary)'
    }
  }, '✕'));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
const {
  useState
} = React;
function Tooltip({
  label,
  children
}) {
  const [show, setShow] = useState(false);
  return React.createElement('span', {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && React.createElement('span', {
    style: {
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--bg-surface-3)',
      color: 'var(--text-primary)',
      font: 'var(--text-caption)',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-pop)',
      zIndex: 10
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  icon,
  placeholder = '',
  value,
  onChange,
  type = 'text',
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--bg-surface-2)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-pill)',
      padding: '9px 14px',
      ...style
    }
  }, icon && React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    color: 'var(--text-tertiary)'
  }), React.createElement('input', {
    type,
    placeholder,
    value,
    onChange,
    ...rest,
    style: {
      flex: 1,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'var(--text-primary)',
      font: 'var(--text-body)'
    }
  }));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const {
  useState
} = React;
function Select({
  options = [],
  value,
  onChange,
  style
}) {
  const [open, setOpen] = useState(false);
  const label = options.find(o => o.value === value)?.label ?? options[0]?.label ?? '';
  return React.createElement('div', {
    style: {
      position: 'relative',
      ...style
    }
  }, React.createElement('button', {
    onClick: () => setOpen(o => !o),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--bg-surface-2)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-pill)',
      padding: '8px 14px',
      color: 'var(--text-primary)',
      font: 'var(--text-body-sm)',
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, label, React.createElement(__ds_scope.Icon, {
    name: 'chevronDown',
    size: 14,
    color: 'var(--text-tertiary)'
  })), open && React.createElement('div', {
    style: {
      position: 'absolute',
      top: '110%',
      left: 0,
      minWidth: '100%',
      background: 'var(--bg-surface-3)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-pop)',
      padding: 6,
      zIndex: 20
    }
  }, options.map(o => React.createElement('div', {
    key: o.value,
    onClick: () => {
      onChange?.(o.value);
      setOpen(false);
    },
    style: {
      padding: '7px 10px',
      borderRadius: 'var(--radius-sm)',
      font: 'var(--text-body-sm)',
      cursor: 'pointer',
      color: o.value === value ? 'var(--accent-hover)' : 'var(--text-primary)'
    }
  }, o.label))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked = false,
  onChange,
  disabled
}) {
  return React.createElement('button', {
    role: 'switch',
    'aria-checked': checked,
    disabled,
    onClick: () => onChange?.(!checked),
    style: {
      width: 40,
      height: 24,
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      padding: 3,
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: checked ? 'var(--accent)' : 'var(--bg-surface-3)',
      transition: 'background var(--dur-fast) var(--ease-standard)',
      opacity: disabled ? .5 : 1
    }
  }, React.createElement('span', {
    style: {
      display: 'block',
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: '#fff',
      transform: checked ? 'translateX(16px)' : 'translateX(0)',
      transition: 'transform var(--dur-fast) var(--ease-standard)'
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavItem.jsx
try { (() => {
function NavItem({
  icon,
  label,
  active,
  badge,
  onClick,
  style
}) {
  return React.createElement('div', {
    onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 14px',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      color: active ? 'var(--text-on-accent)' : 'var(--text-secondary)',
      background: active ? 'var(--grad-accent)' : 'transparent',
      boxShadow: active ? 'var(--shadow-glow-accent)' : 'none',
      font: 'var(--text-body)',
      fontWeight: 'var(--weight-medium)',
      position: 'relative',
      transition: 'all var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, React.createElement('span', {
    style: {
      fontSize: 17,
      width: 20,
      display: 'inline-flex',
      justifyContent: 'center'
    }
  }, icon), label && React.createElement('span', {
    style: {
      flex: 1
    }
  }, label), badge && React.createElement('span', {
    style: {
      position: 'absolute',
      top: 6,
      right: label ? 14 : 6,
      width: 8,
      height: 8,
      borderRadius: 'var(--radius-circle)',
      background: 'var(--danger)'
    }
  }));
}
Object.assign(__ds_scope, { NavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavItem.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  active,
  onChange,
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'inline-flex',
      gap: 4,
      background: 'var(--bg-surface-2)',
      padding: 4,
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }, items.map((it, i) => React.createElement('span', {
    key: i,
    onClick: () => onChange?.(it),
    style: {
      padding: '7px 16px',
      borderRadius: 'var(--radius-pill)',
      font: 'var(--text-body-sm)',
      fontWeight: 'var(--weight-medium)',
      cursor: 'pointer',
      color: active === it ? 'var(--text-on-accent)' : 'var(--text-secondary)',
      background: active === it ? 'var(--accent)' : 'transparent',
      transition: 'all var(--dur-fast) var(--ease-standard)'
    }
  }, it)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  onClose,
  style
}) {
  if (!open) return null;
  return React.createElement('div', {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(5,5,10,.6)',
      backdropFilter: 'var(--blur-glass)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    },
    onClick: onClose
  }, React.createElement('div', {
    onClick: e => e.stopPropagation(),
    style: {
      background: 'var(--bg-surface-2)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: 24,
      width: 420,
      boxShadow: 'var(--shadow-pop)',
      ...style
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16
    }
  }, React.createElement('span', {
    style: {
      font: 'var(--text-h2)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-primary)'
    }
  }, title), React.createElement('span', {
    onClick: onClose,
    style: {
      cursor: 'pointer',
      color: 'var(--text-tertiary)'
    }
  }, '✕')), children));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Dialog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm/App.jsx
try { (() => {
function App() {
  const [tab, setTab] = React.useState('home');
  const screens = {
    home: window.Home,
    tickets: window.Tickets,
    calls: window.Calls,
    chats: window.Chats,
    history: window.History
  };
  const Screen = screens[tab];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh',
      background: 'var(--bg-canvas)',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(window.Sidebar, {
    active: tab,
    onNav: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Screen, null)));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm/Calls.jsx
try { (() => {
function Calls() {
  const {
    Icon,
    Avatar,
    AvatarStack,
    Badge,
    Tabs,
    IconButton,
    Button,
    Dialog,
    Select,
    Input
  } = window.CRMDesignSystem_14b93b;
  const [range, setRange] = React.useState('Дни');
  const [view, setView] = React.useState('Текущие');
  const [wrapup, setWrapup] = React.useState(null);
  const ongoing = [{
    name: 'Софья Хайес',
    duration: '04:38',
    incoming: 24,
    pending: 0,
    team: ['Иван Петров', 'Артём Ким'],
    id: '35374'
  }, {
    name: 'Оуэн Дарнелл',
    duration: '3ч 10м',
    incoming: 10,
    pending: 4,
    team: ['Мария Соколова'],
    id: '98745'
  }, {
    name: 'Эмма Ларкин',
    duration: '6ч 29м',
    incoming: 29,
    pending: 8,
    team: ['Ольга Новак', 'Дарья Лис'],
    id: '85427'
  }];
  const starting = ['Лиам Грейсон', 'Мия Дженнингс'];
  const history = [{
    id: '35001',
    name: 'Пётр Абрамов',
    agent: 'Иван Петров',
    date: '31.08.2026 09:14',
    duration: '06:22',
    result: 'Решено',
    rec: true,
    ticket: '85374'
  }, {
    id: '34988',
    name: 'ООО «Вектор»',
    agent: 'Мария Соколова',
    date: '30.08.2026 17:02',
    duration: '02:10',
    result: 'Перенос',
    rec: true,
    ticket: null
  }, {
    id: '34970',
    name: 'Кузнецов Д.И.',
    agent: 'Артём Ким',
    date: '30.08.2026 11:40',
    duration: '11:05',
    result: 'Не решено',
    rec: false,
    ticket: '85198'
  }, {
    id: '34955',
    name: 'ИП Соколова',
    agent: 'Ольга Новак',
    date: '29.08.2026 15:22',
    duration: '03:48',
    result: 'Решено',
    rec: true,
    ticket: null
  }];
  const resultTone = {
    'Решено': 'success',
    'Не решено': 'danger',
    'Перенос': 'warning'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      display: 'grid',
      gridTemplateColumns: '2.4fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-display)',
      fontWeight: 800,
      color: 'var(--text-primary)'
    }
  }, "\u0417\u0432\u043E\u043D\u043A\u0438"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: ['Текущие', 'История'],
    active: view,
    onChange: setView
  }), view === 'Текущие' && /*#__PURE__*/React.createElement(Tabs, {
    items: ['Дни', 'Недели', 'Месяцы'],
    active: range,
    onChange: setRange
  }))), view === 'Текущие' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: 20,
      height: 180,
      display: 'flex',
      alignItems: 'flex-end',
      gap: 6,
      boxShadow: 'var(--shadow-card)'
    }
  }, [40, 55, 30, 70, 90, 60, 45, 75, 50, 65, 80, 35].map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: h + '%',
      background: 'var(--grad-accent)',
      borderRadius: 6,
      opacity: h > 75 ? 1 : .55,
      boxShadow: h > 75 ? 'var(--shadow-glow-accent)' : 'none',
      transition: 'opacity .2s'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, "\u0422\u0435\u043A\u0443\u0449\u0438\u0435 \u0437\u0432\u043E\u043D\u043A\u0438"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 14
    }
  }, ongoing.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    className: "lift",
    style: {
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      boxShadow: 'var(--shadow-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: c.name,
    status: "busy"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-primary)',
      fontWeight: 600
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--text-tertiary)'
    }
  }, c.duration))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      font: 'var(--text-caption)',
      color: 'var(--text-secondary)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 12
  }), c.incoming), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 12
  }), c.pending)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(AvatarStack, {
    names: c.team,
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--text-tertiary)'
    }
  }, "ID ", c.id)), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => setWrapup(c)
  }, "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0437\u0432\u043E\u043D\u043E\u043A"))))) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '90px 1.4fr 1fr 1.2fr 90px 110px 90px',
      gap: 12,
      padding: '12px 20px',
      font: 'var(--text-caption)',
      color: 'var(--text-tertiary)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u0417\u0430\u043F\u0438\u0441\u044C"), /*#__PURE__*/React.createElement("span", null, "\u041A\u043B\u0438\u0435\u043D\u0442"), /*#__PURE__*/React.createElement("span", null, "\u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440"), /*#__PURE__*/React.createElement("span", null, "\u0414\u0430\u0442\u0430"), /*#__PURE__*/React.createElement("span", null, "\u0414\u043B\u0438\u0442."), /*#__PURE__*/React.createElement("span", null, "\u0418\u0442\u043E\u0433"), /*#__PURE__*/React.createElement("span", null, "\u0422\u0438\u043A\u0435\u0442")), history.map(h => /*#__PURE__*/React.createElement("div", {
    key: h.id,
    className: "row-hover",
    style: {
      display: 'grid',
      gridTemplateColumns: '90px 1.4fr 1fr 1.2fr 90px 110px 90px',
      gap: 12,
      padding: '14px 20px',
      alignItems: 'center',
      borderBottom: '1px solid var(--border-subtle)',
      font: 'var(--text-body-sm)',
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      color: h.rec ? 'var(--accent-hover)' : 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "video",
    size: 14
  }), h.rec ? 'есть' : 'нет'), /*#__PURE__*/React.createElement("span", null, h.name), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, h.agent), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)'
    }
  }, h.date), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)'
    }
  }, h.duration), /*#__PURE__*/React.createElement(Badge, {
    tone: resultTone[h.result],
    dot: true
  }, h.result), h.ticket ? /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, "\u2116", h.ticket) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)'
    }
  }, "\u2014"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      marginBottom: 12
    }
  }, "\u041D\u0430\u0447\u0438\u043D\u0430\u044E\u0442\u0441\u044F \u0437\u0432\u043E\u043D\u043A\u0438"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, starting.map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: n,
    size: 30
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-primary)',
      flex: 1
    }
  }, n), /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "phone"
    })
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      marginBottom: 12
    }
  }, "\u041D\u0430 \u043F\u0435\u0440\u0435\u0440\u044B\u0432\u0435"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [['Джек Линтон', '00:17'], ['Самуэль Уотерс', '06:09'], ['Генри Мерсер', '10:40']].map(([n, t]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: n,
    size: 30,
    status: "offline"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-primary)',
      flex: 1
    }
  }, n), /*#__PURE__*/React.createElement(Badge, {
    tone: "warning"
  }, t)))))), /*#__PURE__*/React.createElement(Dialog, {
    open: !!wrapup,
    title: wrapup ? 'Завершение звонка — ' + wrapup.name : '',
    onClose: () => setWrapup(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Select, {
    options: [{
      value: 'ok',
      label: 'Решено'
    }, {
      value: 'no',
      label: 'Не решено'
    }, {
      value: 'later',
      label: 'Перенос'
    }],
    value: "ok"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043F\u043E \u0437\u0432\u043E\u043D\u043A\u0443"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      justifyContent: 'space-between',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435 \u0438\u0437 \u0437\u0432\u043E\u043D\u043A\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setWrapup(null)
  }, "\u041E\u0442\u043C\u0435\u043D\u0430"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setWrapup(null)
  }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))))));
}
window.Calls = Calls;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm/Calls.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm/Chats.jsx
try { (() => {
function Chats() {
  const {
    Avatar,
    Input,
    Icon,
    IconButton,
    Badge,
    Tag,
    Tabs,
    Button
  } = window.CRMDesignSystem_14b93b;
  const chats = [{
    name: 'Мария Соколова',
    last: 'Отправила документы по заказу',
    time: '10:42',
    unread: 2,
    status: 'Активные',
    ticket: '85374'
  }, {
    name: 'ООО «Вектор»',
    last: 'Спасибо, ожидаю обновление',
    time: '09:58',
    unread: 0,
    status: 'Активные',
    ticket: null
  }, {
    name: 'Артём Ким',
    last: 'Клиент подтвердил возврат',
    time: 'Вчера',
    unread: 1,
    status: 'Активные',
    ticket: '85198'
  }, {
    name: 'Техподдержка L2',
    last: 'Передал тикет №85212 дальше',
    time: 'Вчера',
    unread: 0,
    status: 'Закрытые',
    ticket: '85212'
  }, {
    name: 'Кузнецов Д.И.',
    last: 'Спор закрыт, спасибо за помощь',
    time: '28.08',
    unread: 0,
    status: 'Закрытые',
    ticket: '85033'
  }];
  const [filter, setFilter] = React.useState('Активные');
  const visible = chats.filter(c => c.status === filter);
  const [active, setActive] = React.useState(0);
  const [notesOpen, setNotesOpen] = React.useState(true);
  const [tags, setTags] = React.useState(['Приоритетный клиент', 'Возврат']);
  const cur = visible[Math.min(active, visible.length - 1)] || chats[0];
  const messages = [{
    me: false,
    text: 'Добрый день! Уточните, пожалуйста, статус по заказу №2291.',
    time: '10:30'
  }, {
    me: true,
    text: 'Добрый день! Проверяю, минуту.',
    time: '10:31'
  }, {
    me: true,
    text: 'Возврат оформлен, средства поступят в течение 3 рабочих дней.',
    time: '10:41'
  }, {
    me: false,
    text: 'Отправила документы по заказу',
    time: '10:42'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: notesOpen ? '320px 1fr 260px' : '320px 1fr',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    placeholder: "\u041F\u043E\u0438\u0441\u043A \u0447\u0430\u0442\u043E\u0432"
  }), /*#__PURE__*/React.createElement(Tabs, {
    items: ['Активные', 'Закрытые'],
    active: filter,
    onChange: v => {
      setFilter(v);
      setActive(0);
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto'
    }
  }, visible.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c.name,
    onClick: () => setActive(i),
    className: "row-hover",
    style: {
      display: 'flex',
      gap: 12,
      padding: '12px 20px',
      cursor: 'pointer',
      background: active === i ? 'var(--bg-surface-2)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: c.name,
    status: filter === 'Активные' && i === 0 ? 'online' : undefined
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-primary)',
      fontWeight: 600
    }
  }, c.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--text-tertiary)'
    }
  }, c.time)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, c.last), c.unread > 0 && /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, c.unread))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 24px',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: cur.name,
    status: "online",
    ring: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, cur.name), cur.ticket && /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    dot: true
  }, "\u041E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435 \u2116", cur.ticket)), /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "filter"
    }),
    active: notesOpen,
    onClick: () => setNotesOpen(o => !o)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      overflowY: 'auto'
    }
  }, messages.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      alignSelf: m.me ? 'flex-end' : 'flex-start',
      maxWidth: '60%',
      background: m.me ? 'var(--accent)' : 'var(--bg-surface-2)',
      color: m.me ? '#fff' : 'var(--text-primary)',
      borderRadius: 'var(--radius-lg)',
      padding: '10px 14px',
      font: 'var(--text-body-sm)'
    }
  }, m.text, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      opacity: .7,
      marginTop: 4,
      textAlign: 'right'
    }
  }, m.time)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: filter === 'Закрытые' ? 'Чат закрыт' : 'Написать сообщение...',
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrowUpRight"
    }),
    active: true,
    disabled: filter === 'Закрытые'
  }))), notesOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '1px solid var(--border-subtle)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--text-tertiary)',
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: '.04em'
    }
  }, "\u041F\u0440\u0438\u0432\u044F\u0437\u043A\u0430"), cur.ticket ? /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    dot: true
  }, "\u041E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435 \u2116", cur.ticket) : /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043A \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044E")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--text-tertiary)',
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: '.04em'
    }
  }, "\u0422\u0435\u0433\u0438 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    onRemove: () => setTags(tags.filter(x => x !== t))
  }, t)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--text-tertiary)',
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: '.04em'
    }
  }, "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u0437\u0430\u043C\u0435\u0442\u043A\u0430"), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "\u0412\u0438\u0434\u043D\u0430 \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430\u043C...",
    style: {
      width: '100%',
      minHeight: 100,
      background: 'var(--bg-surface-2)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: 10,
      color: 'var(--text-primary)',
      font: 'var(--text-body-sm)',
      resize: 'vertical'
    }
  }))));
}
window.Chats = Chats;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm/Chats.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm/History.jsx
try { (() => {
function History() {
  const {
    Select,
    Badge,
    Avatar
  } = window.CRMDesignSystem_14b93b;
  const rows = [{
    id: '85212',
    subject: 'Ошибка авторизации в кабинете',
    client: 'ООО «Технополис»',
    owner: 'Ольга Новак',
    closed: '29.08.2026',
    duration: '2ч 10м',
    rating: 5
  }, {
    id: '85033',
    subject: 'Некорректная сумма в счёте',
    client: 'Кузнецов Д.И.',
    owner: 'Иван Петров',
    closed: '26.08.2026',
    duration: '45м',
    rating: 4
  }, {
    id: '84980',
    subject: 'Задержка доставки на 3 дня',
    client: 'ИП Соколова',
    owner: 'Мария Соколова',
    closed: '24.08.2026',
    duration: '1д 2ч',
    rating: 3
  }, {
    id: '84902',
    subject: 'Вопрос по тарифам обслуживания',
    client: 'ООО «Вектор»',
    owner: 'Артём Ким',
    closed: '20.08.2026',
    duration: '20м',
    rating: 5
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-display)',
      fontWeight: 800,
      color: 'var(--text-primary)'
    }
  }, "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439"), /*#__PURE__*/React.createElement(Select, {
    options: [{
      value: '30',
      label: 'За 30 дней'
    }, {
      value: '90',
      label: 'За 90 дней'
    }, {
      value: 'all',
      label: 'За всё время'
    }],
    value: "30"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '80px 2fr 1.2fr 1fr 110px 90px 90px',
      gap: 12,
      padding: '12px 20px',
      font: 'var(--text-caption)',
      color: 'var(--text-tertiary)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u2116"), /*#__PURE__*/React.createElement("span", null, "\u0422\u0435\u043C\u0430"), /*#__PURE__*/React.createElement("span", null, "\u041A\u043B\u0438\u0435\u043D\u0442"), /*#__PURE__*/React.createElement("span", null, "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439"), /*#__PURE__*/React.createElement("span", null, "\u0417\u0430\u043A\u0440\u044B\u0442\u043E"), /*#__PURE__*/React.createElement("span", null, "\u0412\u0440\u0435\u043C\u044F"), /*#__PURE__*/React.createElement("span", null, "\u041E\u0446\u0435\u043D\u043A\u0430")), rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    className: "row-hover",
    style: {
      display: 'grid',
      gridTemplateColumns: '80px 2fr 1.2fr 1fr 110px 90px 90px',
      gap: 12,
      padding: '14px 20px',
      alignItems: 'center',
      borderBottom: '1px solid var(--border-subtle)',
      font: 'var(--text-body-sm)',
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)'
    }
  }, r.id), /*#__PURE__*/React.createElement("span", null, r.subject), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, r.client), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: r.owner,
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)'
    }
  }, r.owner)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)'
    }
  }, r.closed), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)'
    }
  }, r.duration), /*#__PURE__*/React.createElement(Badge, {
    tone: "success"
  }, '★'.repeat(r.rating))))));
}
window.History = History;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm/History.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm/Home.jsx
try { (() => {
function Home() {
  const {
    StatCard,
    Tabs,
    Badge,
    Avatar,
    ProgressBar
  } = window.CRMDesignSystem_14b93b;
  const [range, setRange] = React.useState('День');
  const upcoming = [{
    time: '10:30',
    title: 'Звонок с клиентом ООО «Вектор»',
    type: 'Звонок',
    person: 'Мария Соколова'
  }, {
    time: '11:00',
    title: 'Обращение №85374 — согласовать возврат',
    type: 'Обращение',
    person: 'Артём Ким'
  }, {
    time: '13:15',
    title: 'Групповой чат — интеграция API',
    type: 'Чат',
    person: 'Ольга Новак'
  }, {
    time: '15:00',
    title: 'Обращение №85401 — уточнить детали заказа',
    type: 'Обращение',
    person: 'Иван Петров'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-display)',
      fontWeight: 800,
      color: 'var(--text-primary)'
    }
  }, "\u0414\u043E\u0431\u0440\u043E\u0435 \u0443\u0442\u0440\u043E, \u0418\u0432\u0430\u043D"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--text-secondary)',
      marginTop: 4
    }
  }, "31 \u0430\u0432\u0433\u0443\u0441\u0442\u0430 2026 \xB7 12 \u0438\u0437 15 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432 \u043D\u0430 \u043C\u0435\u0441\u0442\u0435")), /*#__PURE__*/React.createElement(Tabs, {
    items: ['День', 'Неделя', 'Месяц'],
    active: range,
    onChange: setRange
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lift",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439",
    value: "128",
    delta: "12% \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E",
    deltaDirection: "up",
    trend: [40, 52, 48, 60, 55, 70, 66, 80]
  })), /*#__PURE__*/React.createElement("div", {
    className: "lift",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "\u0417\u0432\u043E\u043D\u043A\u043E\u0432 \u0441\u0435\u0433\u043E\u0434\u043D\u044F",
    value: "342",
    delta: "5% \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E",
    deltaDirection: "up",
    trend: [60, 55, 62, 58, 70, 65, 74, 78]
  })), /*#__PURE__*/React.createElement("div", {
    className: "lift",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0445 \u0447\u0430\u0442\u043E\u0432",
    value: "47",
    delta: "2% \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E",
    deltaDirection: "down",
    trend: [70, 65, 68, 60, 58, 55, 50, 48]
  })), /*#__PURE__*/React.createElement("div", {
    className: "lift",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "\u0421\u0440\u0435\u0434\u043D\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u043E\u0442\u0432\u0435\u0442\u0430",
    value: "4.8\u043C",
    delta: "8% \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E",
    deltaDirection: "down",
    accent: "var(--danger)",
    trend: [30, 35, 40, 38, 45, 50, 55, 60]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lift",
    style: {
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: 20,
      boxShadow: 'var(--shadow-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      color: 'var(--text-primary)',
      fontWeight: 700,
      marginBottom: 16
    }
  }, "\u041D\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043F\u043E \u043E\u0442\u0434\u0435\u043B\u0430\u043C"), [['Продажи', 82, 'var(--accent)'], ['Поддержка', 56, 'var(--success)'], ['Техотдел', 34, 'var(--warning)']].map(([n, v, c]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      font: 'var(--text-body-sm)',
      color: 'var(--text-secondary)',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, n), /*#__PURE__*/React.createElement("span", null, v, "%")), /*#__PURE__*/React.createElement(ProgressBar, {
    value: v,
    color: c
  })))), /*#__PURE__*/React.createElement("div", {
    className: "lift",
    style: {
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: 20,
      boxShadow: 'var(--shadow-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h3)',
      color: 'var(--text-primary)',
      fontWeight: 700,
      marginBottom: 16
    }
  }, "\u041C\u043E\u0438 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0438\u0435"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, upcoming.map((u, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-tertiary)',
      width: 44
    }
  }, u.time), /*#__PURE__*/React.createElement(Avatar, {
    name: u.person,
    size: 28
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-primary)'
    }
  }, u.title), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    style: {
      marginTop: 4
    }
  }, u.type))))))));
}
window.Home = Home;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm/Sidebar.jsx
try { (() => {
function Sidebar({
  active,
  onNav
}) {
  const {
    NavItem,
    Icon,
    Avatar
  } = window.CRMDesignSystem_14b93b;
  const items = [{
    key: 'home',
    icon: 'home',
    label: 'Главная'
  }, {
    key: 'tickets',
    icon: 'inbox',
    label: 'Обращения'
  }, {
    key: 'calls',
    icon: 'phone',
    label: 'Звонки'
  }, {
    key: 'chats',
    icon: 'message',
    label: 'Чаты'
  }, {
    key: 'history',
    icon: 'clock',
    label: 'История'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240,
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 14px',
      gap: 4,
      height: '100%',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 10px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      background: 'var(--grad-accent)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h3)',
      fontWeight: 800,
      color: 'var(--text-primary)'
    }
  }, "\u0415\u0420\u0421")), items.map(it => /*#__PURE__*/React.createElement(NavItem, {
    key: it.key,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: it.icon
    }),
    label: it.label,
    active: active === it.key,
    onClick: () => onNav(it.key)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "settings"
    }),
    label: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 10px 0',
      borderTop: '1px solid var(--border-subtle)',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "\u0418\u0432\u0430\u043D \u041F\u0435\u0442\u0440\u043E\u0432",
    status: "online",
    size: 32,
    ring: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-primary)',
      fontWeight: 600
    }
  }, "\u0418\u0432\u0430\u043D \u041F\u0435\u0442\u0440\u043E\u0432"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--text-tertiary)'
    }
  }, "\u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440"))));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm/Tickets.jsx
try { (() => {
function Tickets() {
  const {
    Tabs,
    Input,
    Select,
    Button,
    Badge,
    Avatar,
    Dialog
  } = window.CRMDesignSystem_14b93b;
  const [filter, setFilter] = React.useState('Все');
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    fio: '',
    agreement: '',
    topic: '',
    essence: '',
    sd: ''
  });
  const topics = ['Возврат средств', 'Доставка', 'Технический сбой', 'Изменение условий договора', 'Претензия по качеству'];
  const rows = [{
    id: '85374',
    fio: 'Соколова Мария Игоревна',
    agreement: 'СГ-2291/24',
    topic: 'Возврат средств',
    sd: 'SD-771204',
    status: 'В работе',
    owner: 'Мария Соколова',
    date: '31.08.2026'
  }, {
    id: '85401',
    fio: 'Иванов Артём Сергеевич',
    agreement: 'СГ-0187/25',
    topic: 'Доставка',
    sd: 'Запрос в ПП',
    status: 'Новое',
    owner: 'Артём Ким',
    date: '31.08.2026'
  }, {
    id: '85212',
    fio: 'ООО «Технополис» (Волков Н.П.)',
    agreement: 'СГ-4402/23',
    topic: 'Технический сбой',
    sd: 'SD-770988',
    status: 'Закрыто',
    owner: 'Ольга Новак',
    date: '29.08.2026'
  }, {
    id: '85198',
    fio: 'Петрова Елена Викторовна',
    agreement: 'СГ-3310/24',
    topic: 'Претензия по качеству',
    sd: 'Запрос в ПП',
    status: 'В работе',
    owner: 'Иван Петров',
    date: '28.08.2026'
  }];
  const toneMap = {
    'Новое': 'accent',
    'В работе': 'warning',
    'Закрыто': 'success'
  };
  const submit = () => {
    setOpen(false);
    setForm({
      fio: '',
      agreement: '',
      topic: '',
      essence: '',
      sd: ''
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-display)',
      fontWeight: 800,
      color: 'var(--text-primary)'
    }
  }, "\u041E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setOpen(true)
  }, "+ \u041D\u043E\u0432\u043E\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: ['Все', 'Новые', 'В работе', 'Закрытые'],
    active: filter,
    onChange: setFilter
  }), /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    placeholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0424\u0418\u041E \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440\u0443 \u0441\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u044F",
    style: {
      width: 300
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '80px 1.6fr 1fr 1.2fr 1fr 110px 90px',
      gap: 12,
      padding: '12px 20px',
      font: 'var(--text-caption)',
      color: 'var(--text-tertiary)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u2116"), /*#__PURE__*/React.createElement("span", null, "\u0424\u0418\u041E \u043A\u043B\u0438\u0435\u043D\u0442\u0430"), /*#__PURE__*/React.createElement("span", null, "\u2116 \u0441\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("span", null, "\u0422\u0435\u043C\u0430\u0442\u0438\u043A\u0430"), /*#__PURE__*/React.createElement("span", null, "\u2116 SD"), /*#__PURE__*/React.createElement("span", null, "\u0421\u0442\u0430\u0442\u0443\u0441"), /*#__PURE__*/React.createElement("span", null, "\u0414\u0430\u0442\u0430")), rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    className: "row-hover",
    style: {
      display: 'grid',
      gridTemplateColumns: '80px 1.6fr 1fr 1.2fr 1fr 110px 90px',
      gap: 12,
      padding: '14px 20px',
      alignItems: 'center',
      borderBottom: '1px solid var(--border-subtle)',
      font: 'var(--text-body-sm)',
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)'
    }
  }, r.id), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: r.owner,
    size: 22
  }), /*#__PURE__*/React.createElement("span", null, r.fio)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, r.agreement), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, r.topic), /*#__PURE__*/React.createElement("span", {
    style: {
      color: r.sd === 'Запрос в ПП' ? 'var(--text-tertiary)' : 'var(--text-primary)'
    }
  }, r.sd), /*#__PURE__*/React.createElement(Badge, {
    tone: toneMap[r.status],
    dot: true
  }, r.status), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)'
    }
  }, r.date)))), /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    title: "\u041D\u043E\u0432\u043E\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435",
    onClose: () => setOpen(false),
    style: {
      width: 480
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u0424\u0418\u041E \u043A\u043B\u0438\u0435\u043D\u0442\u0430",
    placeholder: "\u0418\u0432\u0430\u043D\u043E\u0432 \u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432\u0438\u0447",
    value: form.fio,
    onChange: e => setForm({
      ...form,
      fio: e.target.value
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u041D\u043E\u043C\u0435\u0440 \u0441\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u044F",
    placeholder: "\u0421\u0413-0000/00",
    value: form.agreement,
    onChange: e => setForm({
      ...form,
      agreement: e.target.value
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-secondary)',
      fontWeight: 600
    }
  }, "\u0422\u0435\u043C\u0430\u0442\u0438\u043A\u0430 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement(Select, {
    options: topics.map(t => ({
      value: t,
      label: t
    })),
    value: form.topic || topics[0],
    onChange: v => setForm({
      ...form,
      topic: v
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-secondary)',
      fontWeight: 600
    }
  }, "\u0421\u0443\u0442\u044C \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0441\u0443\u0442\u044C \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430...",
    value: form.essence,
    onChange: e => setForm({
      ...form,
      essence: e.target.value
    }),
    style: {
      width: '100%',
      minHeight: 90,
      background: 'var(--bg-surface-2)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: 10,
      color: 'var(--text-primary)',
      font: 'var(--text-body-sm)',
      resize: 'vertical'
    }
  })), /*#__PURE__*/React.createElement(Input, {
    label: "\u041D\u043E\u043C\u0435\u0440 SD",
    placeholder: "\u0415\u0441\u043B\u0438 \u043D\u0435\u0442 \u2014 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043F\u0443\u0441\u0442\u044B\u043C",
    value: form.sd,
    onChange: e => setForm({
      ...form,
      sd: e.target.value
    })
  }), !form.sd && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--text-tertiary)'
    }
  }, "\u0411\u0435\u0437 \u043D\u043E\u043C\u0435\u0440\u0430 SD \u0431\u0443\u0434\u0435\u0442 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043F\u043E\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043E: \xAB\u0417\u0430\u043F\u0440\u043E\u0441 \u0432 \u041F\u041F\xBB"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      justifyContent: 'flex-end',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setOpen(false)
  }, "\u041E\u0442\u043C\u0435\u043D\u0430"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: submit
  }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C")))));
}
window.Tickets = Tickets;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm/Tickets.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarStack = __ds_scope.AvatarStack;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.NavItem = __ds_scope.NavItem;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Dialog = __ds_scope.Dialog;

})();
