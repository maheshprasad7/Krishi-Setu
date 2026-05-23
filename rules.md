# Rules — Krishi-Setu

## UI / UX Rules

### General
- **Mobile-first design** — All pages must work perfectly on small screens (360px+)
- **Responsive layout** — Sidebar on desktop (`md:flex`), bottom tab bar on mobile (`md:hidden`)
- **Sticky navigation** — Sidebar is sticky on desktop (`sticky top-0 h-screen`); bottom nav is `fixed`
- **Loading states** — Every async AI action must show a visible loader/spinner
- **Minimum AI delay** — AI analysis must take at least **2 seconds** to feel natural (even on fast connections)

### Colors & Theme
- **Primary**: Emerald green (Tailwind `emerald-600` / CSS class `bg-primary`)
- **Background**: `#F8FAFC` (light slate — never plain white)
- **Cards**: `bg-white` with `border border-emerald-100` or `border-slate-100`
- **Danger/Error**: Red (`text-red-600`, `bg-red-50`)
- **Success/Healthy**: Green tones
- **Diseased/Warning**: Amber/orange or red tones
- Do NOT use generic plain red, blue, or green directly — use Tailwind shade variants

### Typography
- **Headings font**: Poppins (`font-poppins` class)
- **Body**: System UI / Tailwind default
- **Font weights**: Use `font-bold` and `font-extrabold` liberally for emphasis
- **Text hierarchy**: h1 → page title, h2 → section, p → body

### Spacing & Borders
- Use `rounded-2xl` for cards and containers
- Use `rounded-xl` for buttons and smaller elements
- Padding: `p-4` (mobile), `p-6`–`p-8` (desktop)
- Gaps: `gap-3` to `gap-6` for flex/grid layouts

### Animations
- Use Framer Motion for page entry animations
- Use Tailwind `transition-all duration-200` for hover effects
- Active nav items: `scale-105` on mobile bottom bar
- Buttons: subtle `hover:bg-*` state changes

---

## Coding Conventions

### Next.js / React
- All client-interactive components must have `"use client"` directive at top
- **SSR Hydration Rule**: Any component that reads from `localStorage` or Zustand must use:
  ```tsx
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  ```
- Use `next/link` for all internal navigation (never `<a>` tags)
- Use `next/image` for all images (with `images.remotePatterns` configured)
- Route structure follows Next.js App Router conventions (`page.tsx`, `layout.tsx`)

### TypeScript
- All data shapes must be fully typed (interfaces in `store.ts`)
- Avoid `any` — use proper types or `unknown`
- Zustand store types defined as interfaces before the `create()` call

### State Management (Zustand)
- Single store: `useAgriMithraStore` in `src/lib/store.ts`
- Persistence via `localStorage` using custom `getLocalStorage` / `setLocalStorage` helpers
- localStorage keys: `am_language`, `am_profile`, `am_reports`, `am_voice_queries`

### API Calls
- All Gemini calls go through `src/lib/gemini.ts` — never call Gemini API directly from components
- Every API call must have a try/catch with silent offline fallback
- Never show raw API error messages to users — always show friendly fallback content
- **Voice Synthesis**: Use the central Audio singleton pattern instead of raw SpeechSynthesis immediately, enabling native high-quality Kannada voices.

### Translations
- All user-facing strings must exist in BOTH `"en"` and `"kn"` inside `src/lib/translations.ts`
- Use `const t = translations[language]` pattern in components
- Bilingual data objects (disease names, advice) use `{ en: string; kn: string }` shape

### File Naming
- Pages: `page.tsx` (Next.js convention)
- Layouts: `layout.tsx`
- Components: kebab-case (`language-switcher.tsx`)
- Lib files: camelCase (`gemini.ts`, `store.ts`)

---

## Design Consistency Rules

1. Every page must have a **page title** (`<h1>`) visible at the top
2. Scanner results must clearly distinguish **healthy** (green) vs **diseased** (red/amber) and display a **severity badge** (Low/Medium/High).
3. Language switcher must be visible on every page (sidebar footer + mobile header)
4. Profile district badge must always be visible in sidebar profile card
5. All dashboard cards must use consistent `rounded-2xl bg-white border` styling
6. Never commit API keys to source — use `.env.local` for secrets
7. **Chemical Costing**: Whenever chemicals are recommended, they MUST be in their own styled section below organic remedies and include local Mandya Town costs.

---

## Project Constraints

- **No server-side API routes** — All API calls are client-side (`NEXT_PUBLIC_` vars)
- **No user account system yet** — Auth is mocked via localStorage profile
- **Karnataka-focused** — Content, APMC prices, and crop types are Karnataka-specific
- **Offline must work** — App must never show a blank/broken state even with no internet
- **Kannada default** — Language must default to `"kn"` for rural accessibility

---

*Last updated: 2026-05-23*
