# Krishi-Setu

**AI-powered, bilingual (English + Kannada) agricultural platform for rural farmers in Karnataka.**

Built with Next.js 15, TypeScript, Tailwind CSS, Google Gemini AI, and Supabase.

---

## Features

| Module | Description |
|---|---|
| **AI Crop Scanner** | Upload or capture a leaf photo — Gemini Vision diagnoses the disease, severity, and recommends organic remedies. |
| **Voice Assistant** | Speak farming questions in Kannada or English and receive audio answers powered by Gemini Flash. |
| **Weather Advisories** | District-level weather alerts with crop-specific warnings for Karnataka regions. |
| **Mandi Prices** | Real-time APMC commodity rates for Paddy, Ragi, Tomato, Onion, and more. |
| **Digital Twin** | Virtual farm simulation based on the farmer's profile, soil, and crop data. |
| **Recycler Marketplace** | List and trade farm by-products like cow dung, rice husk, and coconut shells. |
| **Government Schemes** | Curated list of central and state agricultural schemes with eligibility info. |
| **Bilingual UI** | Full English ↔ Kannada toggle across every screen. |

---

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Zustand, Lucide Icons
- **AI:** Google Gemini 1.5 Flash (text) & Gemini Vision (image analysis)
- **Auth & Database:** Supabase (OTP login, PostgreSQL, Row Level Security)
- **Speech:** Web Speech API (recognition + synthesis)
- **Automation:** n8n workflows for data sync

---

## Demo Mode

If Supabase is not configured, the app runs in **Demo Mode** automatically:

- Use any phone number or email to log in
- Enter OTP **`123456`** to access the dashboard
- All AI features fall back to built-in sample data

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Login (OTP auth)
│   ├── api/gemini/                 # Secure server-side AI routes
│   ├── auth/callback/              # Email magic link handler
│   └── dashboard/
│       ├── page.tsx                # Home dashboard
│       ├── scanner/                # AI crop disease scanner
│       ├── voice/                  # Voice assistant
│       ├── weather/                # Weather advisories
│       ├── market/                 # Mandi APMC prices
│       ├── digital-twin/           # Virtual farm simulation
│       ├── recycler/               # Farm waste marketplace
│       ├── schemes/                # Government schemes
│       ├── settings/               # Profile & preferences
│       └── layout.tsx              # Sidebar navigation
├── lib/
│   ├── gemini.ts                   # AI service layer
│   ├── store.ts                    # Zustand state management
│   ├── supabase.ts                 # Database client
│   ├── translations.ts            # Bilingual dictionary
│   └── voice.ts                    # Speech utilities
└── styles/
    └── globals.css                 # Design system
```

---

## Deployment

Deploy to [Vercel](https://vercel.com/) in one click:

1. Push to GitHub
2. Import the repo on Vercel
3. Add environment variables in Vercel project settings
4. Deploy

---

## License

This project is for educational and hackathon purposes.