"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAgriMithraStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Sprout, Mail, Phone, ArrowRight, RefreshCw, CheckCircle2, AlertCircle, User } from "lucide-react";

type Step = "input" | "otp" | "success";
type Mode = "phone" | "email";

export default function LoginPage() {
  const { language, setLanguage, updateProfile } = useAgriMithraStore();
  const t = translations[language];
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("phone");
  const [step, setStep] = useState<Step>("input");

  // Input values
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // ─── Helpers ────────────────────────────────────────────────────────────────

  const reset = () => {
    setStep("input");
    setOtp("");
    setError("");
    setCountdown(0);
  };

  const fallbackLogin = (name: string, ph?: string, em?: string) => {
    updateProfile({ name, phone: ph || "", email: em || "", isLoggedIn: true });
    router.push("/dashboard");
  };

  // ─── Send OTP ────────────────────────────────────────────────────────────────

  const handleSend = async () => {
    setError("");

    if (mode === "phone") {
      const clean = phone.replace(/\D/g, "");
      if (clean.length !== 10) {
        setError(language === "kn" ? "ದಯವಿಟ್ಟು ಸರಿಯಾದ ೧೦ ಅಂಕಿಯ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ" : "Please enter a valid 10-digit phone number.");
        return;
      }

      setLoading(true);
      try {
        if (!isSupabaseConfigured) throw new Error("Supabase not configured — demo mode.");

        const { error: sbErr } = await supabase.auth.signInWithOtp({
          phone: `+91${clean}`,
        });

        if (sbErr) throw sbErr;

        setStep("otp");
        setCountdown(30);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to send OTP";
        // If Supabase isn't configured yet, fall into demo mode
        if (!isSupabaseConfigured || msg.includes("demo")) {
          setStep("otp");
          setCountdown(30);
          setError(language === "kn" ? "ಡೆಮೊ ಮೋಡ್: ಒಟಿಪಿ 123456 ಬಳಸಿ" : "Demo mode: use OTP 123456");
        } else {
          setError(msg);
        }
      } finally {
        setLoading(false);
      }
    } else {
      // Email OTP
      if (!email.includes("@")) {
        setError(language === "kn" ? "ದಯವಿಟ್ಟು ಸರಿಯಾದ ಇಮೇಲ್ ನಮೂದಿಸಿ" : "Please enter a valid email address.");
        return;
      }

      setLoading(true);
      try {
        if (!isSupabaseConfigured) throw new Error("demo");

        const { error: sbErr } = await supabase.auth.signInWithOtp({
          email,
          options: { shouldCreateUser: true },
        });

        if (sbErr) throw sbErr;

        setStep("otp");
        setCountdown(60);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "";
        if (!isSupabaseConfigured || msg === "demo") {
          setStep("otp");
          setCountdown(60);
          setError(language === "kn" ? "ಡೆಮೊ ಮೋಡ್: ಒಟಿಪಿ 123456 ಬಳಸಿ" : "Demo mode: use OTP 123456");
        } else {
          setError(msg || "Failed to send OTP. Check your email address.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // ─── Verify OTP ─────────────────────────────────────────────────────────────

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError(language === "kn" ? "6 ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ" : "Enter the 6-digit code.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      if (!isSupabaseConfigured) {
        // Demo bypass
        if (otp === "123456") {
          setStep("success");
          setTimeout(() => fallbackLogin(
            name || (mode === "phone" ? `Farmer +91${phone}` : email.split("@")[0]),
            mode === "phone" ? phone : "",
            mode === "email" ? email : "",
          ), 800);
        } else {
          setError(language === "kn" ? "ತಪ್ಪು ಕೋಡ್. ಡೆಮೊ ಮೋಡ್‌ನಲ್ಲಿ 123456 ಬಳಸಿ." : "Wrong code. In demo mode use 123456.");
        }
        setLoading(false);
        return;
      }

      let sbErr;
      if (mode === "phone") {
        ({ error: sbErr } = await supabase.auth.verifyOtp({
          phone: `+91${phone.replace(/\D/g, "")}`,
          token: otp,
          type: "sms",
        }));
      } else {
        ({ error: sbErr } = await supabase.auth.verifyOtp({
          email,
          token: otp,
          type: "email",
        }));
      }

      if (sbErr) throw sbErr;

      // Get user profile from Supabase session
      const { data: { user } } = await supabase.auth.getUser();

      setStep("success");
      setTimeout(() => {
        updateProfile({
          name: name || user?.user_metadata?.name || (mode === "phone" ? `Farmer ${phone}` : email.split("@")[0]),
          phone: mode === "phone" ? phone : (user?.phone || ""),
          email: mode === "email" ? email : (user?.email || ""),
          isLoggedIn: true,
        });
        router.push("/dashboard");
      }, 800);

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Verification failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex flex-col">

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-sm">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">{t.appName}</span>
        </div>
        {/* Language toggle */}
        <button
          onClick={() => setLanguage(language === "en" ? "kn" : "en")}
          className="flex items-center gap-1.5 bg-white border border-slate-200 hover:border-emerald-400 px-3 py-1.5 rounded-xl text-xs font-extrabold shadow-sm transition-all"
        >
          <span className={language === "en" ? "text-emerald-600" : "text-slate-400"}>EN</span>
          <span className="text-slate-300">|</span>
          <span className={language === "kn" ? "text-emerald-600" : "text-slate-400"}>ಕನ್ನಡ</span>
        </button>
      </header>

      {/* Main Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">

          {/* Success screen */}
          {step === "success" && (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800">{language === "kn" ? "ಸ್ವಾಗತ!" : "Welcome!"}</h2>
              <p className="text-slate-500 text-sm">{language === "kn" ? "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಕರೆದೊಯ್ಯಲಾಗುತ್ತಿದೆ..." : "Redirecting to your dashboard..."}</p>
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          )}

          {/* Input / OTP screens */}
          {step !== "success" && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

              {/* Card header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 pt-8 pb-10 text-white relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />
                <div className="relative">
                  <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-1">
                    {step === "otp"
                      ? (language === "kn" ? "ಕೋಡ್ ದೃಢೀಕರಿಸಿ" : "Verify Code")
                      : (language === "kn" ? "ಲಾಗಿನ್ ಮಾಡಿ" : "Sign In")}
                  </p>
                  <h1 className="text-2xl font-extrabold tracking-tight">
                    {step === "otp"
                      ? (mode === "phone"
                        ? `+91 ${phone}`
                        : email)
                      : (language === "kn" ? "ಅಗ್ರಿ ಮಿತ್ರಕ್ಕೆ ಸ್ವಾಗತ" : "Welcome to AgriMithra")}
                  </h1>
                  {step === "otp" && (
                    <p className="text-emerald-100 text-xs mt-1">
                      {language === "kn" ? "ಕಳುಹಿಸಿದ 6 ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ" : `Enter the 6-digit code sent to your ${mode}`}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-8 pb-8 pt-6 space-y-5">

                {/* Mode tabs — only shown on input step */}
                {step === "input" && (
                  <div className="bg-slate-100 p-1 rounded-2xl flex border border-slate-200">
                    {(["phone", "email"] as Mode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => { setMode(m); setError(""); }}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                          mode === m ? "bg-white text-emerald-700 shadow-sm" : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {m === "phone" ? <Phone className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                        {m === "phone"
                          ? (language === "kn" ? "ಮೊಬೈಲ್ OTP" : "Phone OTP")
                          : (language === "kn" ? "ಇಮೇಲ್ OTP" : "Email OTP")}
                      </button>
                    ))}
                  </div>
                )}

                {/* Error box */}
                {error && (
                  <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold text-red-600">{error}</p>
                  </div>
                )}

                {/* ── STEP: input ── */}
                {step === "input" && (
                  <div className="space-y-4">
                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        {language === "kn" ? "ನಿಮ್ಮ ಹೆಸರು" : "Your Name"}
                      </label>
                      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                        <span className="px-4 py-3.5 bg-slate-50 text-sm font-extrabold text-slate-600 border-r border-slate-200">
                          <User className="w-4 h-4 text-slate-400" />
                        </span>
                        <input
                          type="text"
                          placeholder={language === "kn" ? "ಹೆಸರು ನಮೂದಿಸಿ" : "Enter your full name"}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSend()}
                          className="flex-1 px-4 py-3.5 text-sm font-bold text-slate-800 outline-none bg-white"
                          autoFocus
                        />
                      </div>
                    </div>
                    {mode === "phone" ? (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                          {language === "kn" ? "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ" : "Mobile Number"}
                        </label>
                        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                          <span className="px-4 py-3.5 bg-slate-50 text-sm font-extrabold text-slate-600 border-r border-slate-200">+91</span>
                          <input
                            type="tel"
                            maxLength={10}
                            placeholder="9876543210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            className="flex-1 px-4 py-3.5 text-sm font-bold text-slate-800 outline-none bg-white"
                            autoFocus={false}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                          {language === "kn" ? "ಇಮೇಲ್ ವಿಳಾಸ" : "Email Address"}
                        </label>
                        <input
                          type="email"
                          placeholder="farmer@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSend()}
                          className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                          autoFocus={false}
                        />
                      </div>
                    )}

                    <button
                      onClick={handleSend}
                      disabled={loading || (mode === "phone" ? phone.length < 10 : !email.includes("@")) || name.trim() === ""}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                    >
                      {loading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          {language === "kn" ? "OTP ಕಳುಹಿಸಿ" : "Send OTP"}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* ── STEP: otp ── */}
                {step === "otp" && (
                  <div className="space-y-4">
                    {/* 6-box OTP input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        {language === "kn" ? "ದೃಢೀಕರಣ ಕೋಡ್" : "Verification Code"}
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="• • • • • •"
                        value={otp}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                          setOtp(v);
                          if (v.length === 6) setError("");
                        }}
                        onKeyDown={(e) => e.key === "Enter" && otp.length === 6 && handleVerify()}
                        className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl text-2xl font-extrabold text-slate-800 text-center tracking-[0.5em] outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                        autoFocus
                      />
                    </div>

                    <button
                      onClick={handleVerify}
                      disabled={loading || otp.length !== 6}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                    >
                      {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : (
                        <>{language === "kn" ? "ದೃಢೀಕರಿಸಿ" : "Verify & Login"} <CheckCircle2 className="w-4 h-4" /></>
                      )}
                    </button>

                    {/* Resend / Back */}
                    <div className="flex items-center justify-between text-xs font-bold">
                      <button onClick={reset} className="text-slate-400 hover:text-slate-600 transition-colors">
                        ← {language === "kn" ? "ಹಿಂತಿರುಗಿ" : "Go back"}
                      </button>
                      <button
                        onClick={handleSend}
                        disabled={countdown > 0 || loading}
                        className="text-emerald-600 hover:text-emerald-700 disabled:text-slate-300 transition-colors"
                      >
                        {countdown > 0
                          ? `${language === "kn" ? "ಮರಳಿ ಕಳುಹಿಸಿ" : "Resend"} (${countdown}s)`
                          : (language === "kn" ? "OTP ಮರಳಿ ಕಳುಹಿಸಿ" : "Resend OTP")}
                      </button>
                    </div>
                  </div>
                )}

                {/* Supabase status indicator */}
                <div className={`flex items-center gap-2 pt-2 border-t border-slate-100`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isSupabaseConfigured ? "bg-emerald-500 animate-pulse" : "bg-amber-400"}`} />
                  <p className="text-[10px] font-semibold text-slate-400">
                    {isSupabaseConfigured
                      ? (language === "kn" ? "ನೇರ ಪ್ರಮಾಣೀಕರಣ ಸಕ್ರಿಯ" : "Live authentication active")
                      : (language === "kn" ? "ಡೆಮೊ ಮೋಡ್ — Supabase URL ಅಗತ್ಯ" : "Demo mode — Supabase URL required")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-5 text-xs text-slate-400 font-medium">
        {language === "kn" ? "ರೈತರಿಗಾಗಿ ಮಾಡಿದ ಆಪ್ — ಅಗ್ರಿ ಮಿತ್ರ" : "Built for farmers — AgriMithra"} 🌿
      </footer>
    </div>
  );
}
