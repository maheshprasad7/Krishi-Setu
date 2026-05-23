"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAgriMithraStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  Sprout,
  LayoutDashboard,
  ScanLine,
  Mic,
  CloudSun,
  IndianRupee,
  Settings,
  LogOut,
  User,
  Lightbulb,
  Tractor,
  ShieldCheck,
  Box,
  Recycle,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language, setLanguage, profile, updateProfile } = useAgriMithraStore();
  const t = translations[language];
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Sync Supabase session → Zustand store on mount
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user && !profile.isLoggedIn) {
          updateProfile({
            name: session.user.user_metadata?.name ||
                  session.user.email?.split("@")[0] ||
                  `Farmer ${session.user.phone?.slice(-4) || ""}`,
            email: session.user.email || "",
            phone: session.user.phone || "",
            isLoggedIn: true,
          });
        } else if (!session && !profile.isLoggedIn) {
          router.replace("/");
        }
      });

      // Keep Zustand in sync with auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "SIGNED_OUT" || !session) {
            updateProfile({ isLoggedIn: false });
            router.replace("/");
          }
        }
      );
      return () => subscription.unsubscribe();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    updateProfile({ isLoggedIn: false });
    router.push("/");
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "kn" : "en");
  };

  const navItems = [
    {
      href: "/dashboard",
      label: language === "kn" ? "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್" : "Dashboard",
      icon: LayoutDashboard
    },
    {
      href: "/dashboard/scanner",
      label: language === "kn" ? "ಬೆಳೆ ರೋಗ ತಪಾಸಣೆ" : "Disease Scanner",
      icon: ScanLine
    },
    {
      href: "/dashboard/voice",
      label: language === "kn" ? "ಧ್ವನಿ ಸಹಾಯ" : "Voice AI Assistant",
      icon: Mic
    },
    {
      href: "/dashboard/weather",
      label: language === "kn" ? "ಹವಾಮಾನ ಮಾಹಿತಿ" : "Weather Info",
      icon: CloudSun
    },
    {
      href: "/dashboard/market",
      label: language === "kn" ? "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ" : "Market Prices",
      icon: IndianRupee
    },
    {
      href: "/dashboard/learning",
      label: t.navLearning,
      icon: Lightbulb
    },
    {
      href: "/dashboard/equipment",
      label: t.navEquipment,
      icon: Tractor
    },
    {
      href: "/dashboard/schemes",
      label: t.navSchemes,
      icon: ShieldCheck
    },
    {
      href: "/dashboard/digital-twin",
      label: t.navDigitalTwin,
      icon: Box
    },
    {
      href: "/dashboard/recycler",
      label: t.navRecycler,
      icon: Recycle
    },
    {
      href: "/dashboard/settings",
      label: language === "kn" ? "ಸೆಟ್ಟಿಂಗ್ಸ್" : "Settings",
      icon: Settings
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row pb-24 md:pb-0">
      
      {/* 1. SIDEBAR NAVIGATION - DESKTOP ONLY */}
      <aside className="w-80 bg-white border-r border-emerald-100 hidden md:flex flex-col shrink-0 sticky top-0 h-screen p-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group px-2 mb-6 shrink-0">
          <div className="bg-primary p-2 rounded-xl text-white shadow-sm flex items-center justify-center">
            <Sprout className="w-6 h-6" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-poppins font-bold text-xl text-primary-dark tracking-tight">
              {t.appName}
            </span>
            <span className="text-[10px] text-text-light font-medium uppercase tracking-wider">
              {language === "kn" ? "ರೈತ ಮಿತ್ರ" : "Farmer Companion"}
            </span>
          </div>
        </Link>

        {/* Profile card */}
        <div className="bg-[#F0FDF4] border border-[#DCFCE7] p-4 rounded-2xl flex items-center gap-3 mb-4 shrink-0">
          <div className="bg-primary/20 p-2.5 rounded-full text-primary-dark">
            <User className="w-5 h-5" />
          </div>
          <div className="text-left overflow-hidden">
            <p className="text-xs text-text-light font-bold leading-none">{t.roleDescription}</p>
            <p className="text-sm font-extrabold text-text truncate mt-1">{profile.name || "Farmer Friend"}</p>
            <span className="inline-block bg-primary/20 text-primary-dark font-extrabold text-[9px] px-2 py-0.5 rounded-full mt-1.5 uppercase">
              {profile.district || "Mandya"}
            </span>
          </div>
        </div>

        {/* Nav items — scrollable middle section */}
        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-emerald-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-emerald-100"
                    : "text-text-light hover:text-text hover:bg-slate-50"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ── FOOTER — always pinned at bottom ── */}
        <div className="shrink-0 pt-4 mt-3 border-t border-slate-100 space-y-2">
          {/* Language switcher */}
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {language === "kn" ? "ಭಾಷೆ" : "Language"}
            </span>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 rounded-xl px-3 py-1.5 transition-all duration-200 group"
            >
              <span className={`text-[11px] font-extrabold ${language === 'en' ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-500'}`}>EN</span>
              <span className="text-slate-300 text-xs">|</span>
              <span className={`text-[11px] font-extrabold ${language === 'kn' ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-500'}`}>ಕನ್ನಡ</span>
            </button>
          </div>

          {/* Sign Out */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {t.logout || "Sign Out"}
          </button>
        </div>
      </aside>

      {/* 2. TOP NAVBAR - MOBILE ONLY */}
      <header className="md:hidden bg-white border-b border-emerald-100 px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg text-white">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="font-poppins font-extrabold text-base text-primary-dark tracking-tight">{t.appName}</span>
        </div>
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 bg-slate-100 border border-slate-200 hover:border-emerald-400 rounded-xl px-2.5 py-1.5 transition-all"
        >
          <span className={`text-[11px] font-extrabold ${language === 'en' ? 'text-emerald-600' : 'text-slate-400'}`}>EN</span>
          <span className="text-slate-300 text-xs">|</span>
          <span className={`text-[11px] font-extrabold ${language === 'kn' ? 'text-emerald-600' : 'text-slate-400'}`}>ಕನ್ನಡ</span>
        </button>
      </header>

      {/* 3. MAIN DASHBOARD CONTENT AREA */}
      <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>

      {/* 4. BOTTOM NAVIGATION TAB BAR - MOBILE ONLY */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-emerald-100 py-2.5 px-3 flex justify-between items-center z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 flex-1 py-1 px-1 rounded-xl transition-all ${
                isActive ? "text-primary scale-105" : "text-text-light"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-[9px] font-extrabold uppercase tracking-wide truncate max-w-[64px]">
                {item.label.split(" ")[0]}
              </span>
            </Link>
          );
        })}
      </nav>

    </div>
  );
}
