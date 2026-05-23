# Tech Context — Krishi-Setu

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | ^16.2.6 |
| Language | TypeScript | ^5.4.5 |
| Styling | Tailwind CSS | ^3.4.4 |
| State Management | Zustand | ^4.5.2 |
| AI / ML | Google Gemini API (`gemini-1.5-flash`) | @google/generative-ai ^0.21.0 |
| Database / Auth | Supabase | @supabase/supabase-js ^2.43.4 |
| Animation | Framer Motion | ^11.2.10 |
| Charts | Recharts | ^2.12.7 |
| Icons | Lucide React | ^0.395.0 |
| CSS Utilities | clsx, tailwind-merge, class-variance-authority | latest |
| Confetti | canvas-confetti | ^1.9.3 |
| Build Tool | Turbopack (via Next.js) | built-in |

---

## APIs Used

### 1. Google Gemini API
- **Model**: `gemini-1.5-flash`
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`
- **Usage**: Crop disease image analysis (`analyzeCropDisease`) and farming Q&A (`getFarmingAdvice`)
- **Auth**: API key via `NEXT_PUBLIC_GEMINI_API_KEY`
- **Key Location**: localStorage key `AM_GEMINI_KEY` OR env var
- **Fallback**: Offline disease/voice knowledge base in `src/lib/gemini.ts`

### 2. Supabase
- **Usage**: User authentication and data storage (planned/partial)
- **Auth**: URL + Anon Key
- **Client**: `src/lib/supabase.ts`

### 3. OpenWeatherMap API
- **Usage**: Weather forecasts for the weather dashboard page
- **Auth**: `NEXT_PUBLIC_OPENWEATHER_API_KEY`

---

## Environment Variables (`.env` / `.env.local`)

```env
NEXT_PUBLIC_GEMINI_API_KEY=       # Google AI Studio key
NEXT_PUBLIC_SUPABASE_URL=         # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # Supabase anon/public key
NEXT_PUBLIC_OPENWEATHER_API_KEY=  # OpenWeatherMap key
```

> ⚠️ All keys are `NEXT_PUBLIC_` — exposed to browser. This is intentional for a client-side Next.js app.

---

## Folder Structure

```
Agri-Mithra/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (metadata, global styles)
│   │   ├── page.tsx                # Login / Landing page
│   │   └── dashboard/
│   │       ├── layout.tsx          # Dashboard shell (sidebar + mobile nav)
│   │       ├── page.tsx            # Main dashboard overview
│   │       ├── scanner/page.tsx    # Crop Disease Scanner
│   │       ├── voice/page.tsx      # Voice AI Assistant
│   │       ├── weather/page.tsx    # Weather Info
│   │       ├── market/page.tsx     # APMC Market Prices
│   │       ├── recycler/page.tsx   # Recycler Marketplace (Waste to Wealth)
│   │       └── settings/page.tsx   # Settings / Profile
│   ├── components/
│   │   └── language-switcher.tsx   # EN/KN toggle component
│   ├── lib/
│   │   ├── gemini.ts               # Gemini AI functions + offline fallback
│   │   ├── store.ts                # Zustand global store
│   │   ├── supabase.ts             # Supabase client
│   │   └── translations.ts         # EN/KN translation strings
│   └── styles/
│       └── globals.css             # Global Tailwind + custom CSS
├── public/
│   └── manifest.json               # PWA manifest
├── supabase/
│   └── schema.sql                  # Database schema
├── next.config.ts                  # Next.js config
├── tailwind.config.ts              # Tailwind config
├── .env                            # Env template
├── .env.local                      # Local secrets (gitignored)
└── run.bat / run.ps1               # Local launch scripts
```

---

## Key Architecture Decisions

- **SSR Hydration Fix**: All components reading Zustand (localStorage) use a `mounted` state pattern — return `null` until `useEffect` sets `mounted = true`. This prevents SSR/client mismatch errors.
- **Offline-First AI**: Both `analyzeCropDisease` and `getFarmingAdvice` have offline fallback knowledge bases. App always returns a result even without API access.
- **Bilingual by Default**: Language defaults to Kannada (`"kn"`) stored in `localStorage` under key `am_language`.
- **Image Compression**: Scanner compresses images via canvas before sending base64 to Gemini API to reduce payload size.
- **Strict JSON Prompt**: Gemini scanner prompt enforces JSON-only response with exact field structure to prevent parsing errors.
- **Voice TTS System**: The Voice AI Assistant defaults to standard web speech API, but uses a robust, non-blocking Audio singleton for seamless native browser pronunciation.
- **Organic First Prompting**: The AI model is strictly tuned to prioritize natural/organic remedies before suggesting separated localized chemical prices.

---

## Commands

```powershell
npm run dev      # Start local dev server (Turbopack) → http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Known Deprecation
- `images.domains` in `next.config.ts` should be migrated to `images.remotePatterns` (non-breaking warning)

---

*Last updated: 2026-05-23*
