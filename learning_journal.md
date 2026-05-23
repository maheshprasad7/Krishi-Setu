# Learning Journal — Krishi-Setu

## Project Overview
Krishi-Setu is an AI-powered AgriTech platform for Karnataka farmers. It features crop disease detection via Gemini Vision API, a bilingual (Kannada + English) voice assistant, APMC market prices, weather forecasts, and government scheme info. Built with Next.js 16, Tailwind CSS, Zustand, and Framer Motion.

---

## Development Log

| Date | Time (IST) | Action | Notes |
|------|-----------|--------|-------|
| 2026-05-22 | 12:49 | Project initialized | Created Next.js app with Tailwind, TypeScript, Zustand |
| 2026-05-22 | 14:25 | Hydration Fix + Drag & Drop | Fixed SSR language state mismatch in `DashboardLayout`; added `onDragOver`/`onDrop` to Crop Scanner upload zone |
| 2026-05-22 | 14:38 | Hydration Fix on Login | Applied `mounted` state check to `src/app/page.tsx` — SSR rendered `t.appName` before client-side Zustand was ready |
| 2026-05-22 | 14:43 | Missing Import Fix | Added missing `Link` import from `next/link` in `src/app/dashboard/scanner/page.tsx` |
| 2026-05-22 | 15:07 | Scanner AI Overhaul | Rewrote `analyzeCropDisease` in `gemini.ts`: strict JSON-only prompt, `status` field (healthy/diseased), image compression via canvas before API call. UI updated to show distinct healthy (green) vs diseased (red) result cards. |
| 2026-05-22 | 15:43 | Dashboard Field Name Fix | Dashboard was reading `report.treatment` but store shape uses `report.remedy` — fixed field name + added legacy `treatment` fallback in localStorage reads |
| 2026-05-22 | 15:54 | App Renamed | Globally replaced "Agri-Mithra" → "Krishi-Setu" across all files (translations, layouts, package.json, metadata) |
| 2026-05-22 | 18:17 | Dev server started | `npm run dev` confirmed running at `http://localhost:3000` (Next.js 16.2.6, Turbopack) |
| 2026-05-22 | 20:42 | Memory System Created | Set up 5 project memory markdown files: `projectbrief.md`, `techContext.md`, `activeContext.md`, `rules.md`, `learningjournal.md` |

---

## Bugs & Fixes

### 1. SSR Hydration Mismatch (Critical Pattern)
**Problem**: Components that read from Zustand (backed by `localStorage`) cause React hydration errors because server renders with default values but client hydrates with localStorage values.

**Fix**: Use `mounted` guard pattern in every client component that reads Zustand state:
```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => { setMounted(true); }, []);
if (!mounted) return null;
```
**Affected files**: `src/app/page.tsx`, `src/app/dashboard/layout.tsx`

---

### 2. Field Name Mismatch (`treatment` vs `remedy`)
**Problem**: Scanner AI returned data with field `remedy` but the dashboard was reading `report.treatment` — showing undefined.

**Fix**: Updated dashboard to read `report.remedy`. Added fallback: `report.remedy || report.treatment` for legacy localStorage data.

---

### 3. Missing `Link` Import
**Problem**: `src/app/dashboard/scanner/page.tsx` used `<Link>` without importing it.

**Fix**: Added `import Link from "next/link"` at top of file.

---

### 4. Gemini API Returns Non-JSON
**Problem**: Gemini API sometimes wraps JSON in markdown code blocks (` ```json ... ``` `).

**Fix**: Strip code block markers before parsing:
```ts
const cleanTxt = txt.replace(/```json/gi, "").replace(/```/g, "").trim();
```

---

## Lessons Learned

- **Always use `mounted` pattern** when reading from localStorage/Zustand in Next.js App Router
- **Gemini API responses are not always clean JSON** — always strip markdown artifacts before `JSON.parse()`
- **Offline fallback is critical** for rural India apps — never rely solely on API availability
- **Keep AI response field names consistent** between the prompt schema and the TypeScript interface
- **Image compression** before sending to Gemini reduces payload and improves speed significantly
- **Default to Kannada** (`"kn"`) not English — the target users are rural Kannada speakers
- **Turbopack** (used via Next.js 16 dev mode) is significantly faster than Webpack for HMR

---

## Decisions & Open Questions

| Type | Item | Status |
|------|------|--------|
| Decision | Use Tailwind CSS with Autoprefixer | ✅ Resolved |
| Decision | Delay rendering layout until `mounted` to avoid hydration errors | ✅ Resolved |
| Decision | Offline fallback knowledge base built into `gemini.ts` | ✅ Resolved |
| Decision | All API keys are `NEXT_PUBLIC_` (client-side only) | ✅ Intentional (no backend) |
| Open | Migrate `images.domains` → `images.remotePatterns` in `next.config.ts` | ⏳ Pending |
| Open | Wire Supabase auth (currently mock localStorage profile) | ⏳ Pending |
| Open | Real-time APMC market price data source | ⏳ Pending |

---

*This file is auto-maintained as the project evolves. Always append new entries; never delete old ones.*
