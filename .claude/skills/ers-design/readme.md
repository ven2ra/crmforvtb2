# ЕРС — Единая рабочая система: Design System

CRM for logging and handling customer tickets, calls, and chats. This design system covers the employee-facing workspace: home/dashboard, tickets (обращения), calls (звонки), chats (чаты), a "my upcoming" widget, and ticket history.

## Sources
- **Uploaded references** (`uploads/`): three screenshots setting the visual tone — a dark call-center dashboard ("nixhr"), a violet LMS dashboard ("Sapphire UI"), and a dark analytics dashboard. None are the CRM itself; they establish the dark, violet-accented, glassy-card aesthetic this system follows.
- **GitHub repo requested for this project, `ven2ra/crmforvtb2`, has no commits** (empty repository) — it could not be read. Per the user's choice, this system was built from the brief + reference screenshots only, not from that repo's code. If code is pushed there later, re-run against it to ground components/screens in the real implementation instead of these recreations.
- No Figma file or logo was provided.

## Content fundamentals
- **Language & voice:** Russian, informal-professional (ты/вы avoided — copy stays impersonal/task-first: "Создать обращение", "Новое обращение" rather than commands directed at "you"). Ticket/client copy reads like real support tickets, not marketing copy.
- **Casing:** Sentence case throughout (no ALL CAPS headers, no Title Case). Labels are short nouns or noun phrases ("Активных обращений", "Средн. время ответа").
- **Numbers:** Tabular, prominent — large stat numbers are a core motif (see Sapphire/nixhr references), always paired with a small delta ("↑ 12% за неделю").
- **No emoji** anywhere in product copy — status is carried by color + Badge dot, not glyphs.
- **Tone:** operational and calm, not celebratory — this is a workplace tool for handling queues of people, not a consumer app.

## Visual foundations
- **Palette:** near-black ink surfaces (`--ink-950` canvas → `--ink-700` raised surfaces) with a single violet accent (`--violet-500` / `--accent`). A violet→light-purple gradient (`--grad-accent`) marks primary CTAs and highlighted cards; a warm orange→pink gradient (`--grad-highlight`) is reserved for hero/promo blocks, used sparingly.
- **Semantic color:** success = green, warning = amber, danger = red, info = the same violet as accent (this product has one hue of "important," not a separate blue). Each semantic color has a `-soft` (14–16% alpha) background pairing for badges/toasts.
- **Type:** Manrope (see Fonts note below) for everything, including numerals — one typeface, weight does the differentiating (400–800). A `text-*` scale runs display (32px) → caption (12px), each token bundling size/line-height/family as a single CSS shorthand value.
- **Backgrounds:** flat dark surfaces, no photography, no illustration, no visible texture/grain. The only "image-like" elements are gradient fills on accent cards.
- **Shadows:** soft and dark — `--shadow-card` for resting surfaces, `--shadow-pop` for modals/dropdowns (bigger, darker), `--shadow-glow-accent` (violet-tinted glow) reserved for the accent gradient surfaces only.
- **Corners:** generous — `--radius-xl` (20px) on cards, `--radius-pill` on every button/input/tag/badge/tab. Nothing uses sharp corners.
- **Borders:** 1px hairlines in `--border-subtle` (barely-there) separating surfaces from canvas; `--border-strong` only for stronger emphasis (dropdown panels, focus).
- **Motion:** fast and understated — 120ms for hover/press feedback, 200–320ms for panel/width transitions, `cubic-bezier(.4,0,.2,1)` easing. Buttons scale to .97 on press; no bounce, no springy overshoot.
- **Hover/press states:** hover lightens (surface → next surface step, e.g. `--bg-surface-2` → `--bg-surface-3`) or tints with `--accent-soft`; press scales down slightly. No darkening-on-hover — this is a dark UI, so hover always moves toward lighter.
- **Transparency/blur:** used once, intentionally — the modal scrim (`--blur-glass`, 20px blur) behind `Dialog`. Not used elsewhere.
- **Avatars:** initials-only (no photography), color assigned deterministically from name via a 5-hue `--avatar-1..5` palette.

## Iconography
No icon font or SVG sprite came with the source material. `components/core/Icon.jsx` is an **intentional addition**: a small (~20-glyph) inline-SVG set, 24px viewBox, 1.75px `currentColor` stroke, geometric/rounded-joint style — chosen to match the rounded, friendly-but-technical feel of the reference screenshots. Cover: navigation (home, inbox, phone, message, bell, settings, search, users, calendar, clock), actions (plus, check, x, filter, more, chevronDown, arrowUpRight), and a few content glyphs (mail, star, video). No emoji, no unicode-glyph icons, no PNG icons. If a real icon set exists in the eventual codebase, swap `Icon.jsx`'s path map for it directly — every consumer references icons only via `<Icon name="...">`.

## Fonts
**Substitution flag:** no font files were provided. Typography tokens specify **Manrope** (geometric grotesque, closely matching the rounded-but-technical sans in the reference screenshots) loaded from Google Fonts via `tokens/typography.css`, plus **JetBrains Mono** for the `--text-mono` token (IDs, durations, timestamps). Please supply the brand's real font files if this substitution is wrong — swapping is a one-line change in `tokens/typography.css`.

## Intentional additions (components with no source-defined counterpart)
Since no code/Figma defined a component inventory, a standard set was authored, sized to what the CRM screens need:
`IconButton`, `Checkbox`, `Radio`, `Tag`, `Tooltip`, `Toast`, `Tabs`, `NavItem`, `ProgressBar`, `StatCard`, `Dialog`, `Icon` — alongside the original core set `Avatar`/`AvatarStack`, `Badge`, `Button`, `Card`, `Input`, `Select`, `Switch`.

## Components (`components/`)
- `core/` — **Button**, **IconButton**, **Checkbox**, **Radio**, **Avatar**, **AvatarStack**, **Badge**, **Card**, **Icon**
- `forms/` — **Input**, **Select**, **Switch**
- `feedback/` — **Tag**, **Tooltip**, **Toast**
- `navigation/` — **Tabs**, **NavItem**
- `data/` — **ProgressBar**, **StatCard**
- `overlay/` — **Dialog**

Each has a sibling `.d.ts` (props contract) and `.prompt.md` (usage). Cards live alongside each directory (e.g. `components/core/buttons.card.html`) and render in the Design System tab under "Components".

## Foundations (`guidelines/`, `tokens/`)
Specimen cards for the Colors, Type, and Spacing groups; token source files: `tokens/colors.css`, `typography.css`, `spacing.css`, `effects.css`, all imported by root `styles.css`.

## UI kit (`ui_kits/crm/`)
One interactive kit, `index.html`, tab-switching between: **Главная** (home/dashboard + "Мои ближайшие"), **Обращения** (tickets), **Звонки** (calls — modeled closely on the uploaded call-center reference), **Чаты** (chats), **История обращений** (ticket history). See `ui_kits/crm/README.md`.

## Index
- `styles.css` — root stylesheet (imports only)
- `tokens/` — colors, typography, spacing, effects
- `components/` — see above
- `guidelines/` — foundation specimen cards
- `ui_kits/crm/` — the CRM screens
- `thumbnail.html` — project tile
- `SKILL.md` — Claude Code–portable skill version of this system

## Caveats & ask
- Built without codebase/Figma access — `ven2ra/crmforvtb2` is empty. **If you can push real code to that repo (or share a working link), tell me and I'll rebuild the component inventory and screens against the real implementation** — that will be far more accurate than these recreations.
- Manrope/JetBrains Mono are substitutes, not the brand's real fonts — send font files if there's a house typeface.
- No logo was supplied; the wordmark "ЕРС" stands in for a mark on the sidebar and thumbnail.
- Screen content (names, ticket text, chat messages) is placeholder — swap for real copy once available.
