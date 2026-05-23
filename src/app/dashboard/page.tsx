"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAgriMithraStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { getFarmingTips, FarmingTip } from "@/lib/recommendations";
import { 
  ScanLine, 
  Mic, 
  CloudSun, 
  IndianRupee, 
  History, 
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  Award,
  Lightbulb,
  Tractor,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Trash2
} from "lucide-react";

export default function DashboardPage() {
  const { language, profile, profileCompletion, reports, deleteReport } = useAgriMithraStore();
  const t = translations[language];
  const [tips, setTips] = useState<FarmingTip[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTips(getFarmingTips(profile));
    setMounted(true);
  }, [profile]);

  // Simulated regional crop prices for quick snapshot
  const featuredPrices = [
    { name_en: "Ragi (Finger Millet)", name_kn: "ರಾಗಿ", price: "₹3,540", trend: "up" },
    { name_en: "Paddy (Grade A Rice)", name_kn: "ಭತ್ತ", price: "₹2,380", trend: "up" },
    { name_en: "Tomato (Fresh Crate)", name_kn: "ಟೊಮೆಟೊ", price: "₹1,850", trend: "down" },
  ];

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      
      {/* 1. WELCOME BANNER PANEL */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-emerald-500 rounded-[2rem] p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12">
          <ScanLine className="w-80 h-80" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-white/20 text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-accent-yellow" />
              {language === "kn" ? "ಅಧಿಕೃತ ರೈತ ಮಿತ್ರ" : "Verified Agri Partner"}
            </span>
            <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl">
              {language === "kn" 
                ? `ನಮಸ್ಕಾರ, ${profile.name || "ಕೃಷಿ ಬಂಧು"}!` 
                : `Namaskara, ${profile.name || "Farming Friend"}!`}
            </h1>
            <p className="text-emerald-50 font-medium text-sm sm:text-base max-w-lg leading-relaxed">
              {t.welcomeMessage}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4.5 py-3 rounded-2xl border border-white/20 flex items-center gap-3 shrink-0">
            <MapPin className="w-5 h-5 text-accent-yellow" />
            <div className="text-left">
              <p className="text-[10px] text-emerald-100 font-bold uppercase">{language === "kn" ? "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಜಿಲ್ಲೆ" : "Selected District"}</p>
              <p className="text-sm font-extrabold uppercase tracking-wide">{profile.district || "Mandya"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PROFILE COMPLETION WIDGET */}
        <Link href="/dashboard/settings" className="bg-white rounded-[1.5rem] p-5 border border-slate-200 shadow-sm flex items-center gap-4 hover:border-emerald-300 transition-colors group">
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 36 36">
              <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className={`${profileCompletion === 100 ? 'text-emerald-500' : 'text-amber-500'} transition-all duration-1000 ease-out`} strokeWidth="3" strokeDasharray={`${profileCompletion}, 100`} stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold">
              {profileCompletion}%
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-text group-hover:text-primary transition-colors">
              {t.profileCompletion}
            </h3>
            <p className="text-xs text-text-light font-medium mt-0.5">
              {language === "kn" ? "ಉತ್ತಮ ಸಲಹೆಗಳಿಗಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿ." : "Complete for better AI tips."}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary" />
        </Link>

        {/* SMART TIPS SCROLLER */}
        <div className="lg:col-span-2 bg-amber-50 border border-amber-200 p-5 rounded-[1.5rem] shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              {language === "kn" ? "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಲಹೆಗಳು" : "Smart Farming Tips"}
            </h3>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-2">
            {tips.map(tip => (
              <div key={tip.id} className="min-w-[280px] sm:min-w-[320px] bg-white p-3 rounded-xl border border-amber-100 snap-center shrink-0">
                <p className="text-sm font-bold text-text">{language === "kn" ? tip.title.kn : tip.title.en}</p>
                <p className="text-xs text-text-light mt-1">{language === "kn" ? tip.content.kn : tip.content.en}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEW ECOSYSTEM QUICK LINKS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/dashboard/learning" className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-5 flex items-center justify-between transition-colors shadow-sm">
          <div className="space-y-1">
            <h3 className="font-bold">{t.navLearning}</h3>
            <p className="text-xs text-blue-100">{language === "kn" ? "ವೀಡಿಯೊ ಮೂಲಕ ಕಲಿಯಿರಿ" : "Learn from videos"}</p>
          </div>
          <Lightbulb className="w-8 h-8 opacity-50" />
        </Link>
        <Link href="/dashboard/schemes" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl p-5 flex items-center justify-between transition-colors shadow-sm">
          <div className="space-y-1">
            <h3 className="font-bold">{t.navSchemes}</h3>
            <p className="text-xs text-emerald-100">{language === "kn" ? "ಸಬ್ಸಿಡಿ ಪರಿಶೀಲಿಸಿ" : "Check subsidies"}</p>
          </div>
          <ShieldCheck className="w-8 h-8 opacity-50" />
        </Link>
        <Link href="/dashboard/equipment" className="bg-amber-600 hover:bg-amber-700 text-white rounded-2xl p-5 flex items-center justify-between transition-colors shadow-sm">
          <div className="space-y-1">
            <h3 className="font-bold">{t.navEquipment}</h3>
            <p className="text-xs text-amber-100">{language === "kn" ? "ಬಾಡಿಗೆಗೆ ಪಡೆಯಿರಿ" : "Rent machinery"}</p>
          </div>
          <Tractor className="w-8 h-8 opacity-50" />
        </Link>
      </div>

      {/* CORE ACTION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard/scanner" className="agri-card p-6 flex flex-col justify-between space-y-6 bg-white hover:border-emerald-300">
          <div className="bg-primary/10 p-3.5 rounded-2xl w-fit text-primary-dark">
            <ScanLine className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 text-left">
            <h3 className="font-poppins font-extrabold text-lg text-text">{t.diseaseScanner}</h3>
            <p className="text-xs text-text-light font-medium leading-relaxed">{t.diseaseScannerDesc}</p>
          </div>
          <span className="text-primary font-bold text-xs flex items-center gap-1">
            {language === "kn" ? "ಪರೀಕ್ಷೆ ಮಾಡಿ" : "Start Scan"} <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link href="/dashboard/voice" className="agri-card p-6 flex flex-col justify-between space-y-6 bg-white hover:border-amber-300">
          <div className="bg-amber-100 p-3.5 rounded-2xl w-fit text-amber-600">
            <Mic className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 text-left">
            <h3 className="font-poppins font-extrabold text-lg text-text">{language === "kn" ? "ಧ್ವನಿ ಸಹಾಯ" : "Voice Assistant"}</h3>
            <p className="text-xs text-text-light font-medium leading-relaxed">{t.voiceAssistantDesc}</p>
          </div>
          <span className="text-amber-600 font-bold text-xs flex items-center gap-1">
            {language === "kn" ? "ಮಾತನಾಡಿ ಕೇಳಿ" : "Open Voice Chat"} <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link href="/dashboard/weather" className="agri-card p-6 flex flex-col justify-between space-y-6 bg-white hover:border-blue-300">
          <div className="bg-blue-100 p-3.5 rounded-2xl w-fit text-blue-600">
            <CloudSun className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 text-left">
            <h3 className="font-poppins font-extrabold text-lg text-text">{t.weatherForecast}</h3>
            <p className="text-xs text-text-light font-medium leading-relaxed">{t.weatherForecastDesc}</p>
          </div>
          <span className="text-blue-600 font-bold text-xs flex items-center gap-1">
            {language === "kn" ? "ಮಾಹಿತಿ ನೋಡಿ" : "View Forecast"} <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link href="/dashboard/market" className="agri-card p-6 flex flex-col justify-between space-y-6 bg-white hover:border-yellow-400">
          <div className="bg-yellow-100 p-3.5 rounded-2xl w-fit text-yellow-600">
            <IndianRupee className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 text-left">
            <h3 className="font-poppins font-extrabold text-lg text-text">{t.marketPrices}</h3>
            <p className="text-xs text-text-light font-medium leading-relaxed">{t.marketPricesDesc}</p>
          </div>
          <span className="text-yellow-600 font-bold text-xs flex items-center gap-1">
            {language === "kn" ? "ದರ ಪರಿಶೀಲಿಸಿ" : "Check Mandi Rate"} <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>

      {/* DOUBLE ROW: WEATHER AND MANDI PREVIEWS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Mandi market list preview */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-poppins font-extrabold text-lg text-text">
                {language === "kn" ? "ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿ" : "Today's Mandi Trends"}
              </h3>
            </div>
            <Link href="/dashboard/market" className="text-xs font-bold text-primary hover:underline">
              {language === "kn" ? "ಎಲ್ಲಾ ಬೆಲೆಗಳು →" : "View All →"}
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {featuredPrices.map((crop, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between">
                <div className="text-left space-y-0.5">
                  <p className="font-bold text-sm text-text">{language === "kn" ? crop.name_kn : crop.name_en}</p>
                  <p className="text-[10px] text-text-light font-medium">{language === "kn" ? "ಮಂಡ್ಯ ಎಪಿಎಂಸಿ" : "Mandya APMC Market"}</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-sm text-text">{crop.price}</p>
                  <span className={`inline-flex items-center gap-0.5 text-[10px] font-extrabold uppercase ${
                    crop.trend === 'up' ? 'text-primary' : 'text-red-500'
                  }`}>
                    {crop.trend === 'up' ? "▲ "+(language === "kn" ? "ಹೆಚ್ಚಳ" : "Up") : "▼ "+(language === "kn" ? "ಇಳಿಕೆ" : "Down")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Small weather widget */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 translate-x-4 -translate-y-4">
            <CloudSun className="w-48 h-48" />
          </div>
          
          <div className="flex justify-between items-start">
            <div className="text-left space-y-1">
              <span className="text-[10px] font-extrabold uppercase bg-white/20 px-2 py-0.5 rounded-full">{profile.district || "Mandya"}</span>
              <h4 className="font-bold text-sm text-blue-100">{t.weatherForecast}</h4>
            </div>
            <span className="text-4xl font-extrabold font-poppins">29°C</span>
          </div>

          <div className="space-y-2 border-t border-white/20 pt-4 text-left">
            <div className="flex justify-between text-xs font-semibold text-blue-100">
              <span>{t.rainPrediction}</span>
              <span className="text-white font-extrabold">65%</span>
            </div>
            <div className="flex justify-between text-xs font-semibold text-blue-100">
              <span>{t.humidity}</span>
              <span className="text-white font-extrabold">78%</span>
            </div>
            <div className="flex justify-between text-xs font-semibold text-blue-100">
              <span>{t.windSpeed}</span>
              <span className="text-white font-extrabold">12 km/h</span>
            </div>
          </div>
        </div>

      </div>

      {/* CROP SCANNER RECENT REPORT HISTORY */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            <h3 className="font-poppins font-extrabold text-lg text-text">
              {t.recentScans}
            </h3>
          </div>
          <span className="text-xs text-text-light font-bold">
            {reports.length} {language === "kn" ? "ಪರೀಕ್ಷೆಗಳು" : "Scans Found"}
          </span>
        </div>

        {reports.length === 0 ? (
          <div className="py-8 text-center text-text-light text-sm font-semibold flex flex-col items-center gap-3">
            <ScanLine className="w-12 h-12 text-slate-300" />
            {language === "kn" ? "ಇನ್ನೂ ಯಾವುದೇ ಬೆಳೆ ರೋಗ ವರದಿ ಲಭ್ಯವಿಲ್ಲ!" : "No crop disease scan history records found yet!"}
            <Link 
              href="/dashboard/scanner"
              className="bg-primary-light border border-primary text-primary-dark text-xs font-bold px-4 py-2 rounded-xl mt-2 hover:bg-primary hover:text-white transition-all"
            >
              {t.scanNewCrop}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report) => (
              <div 
                key={report.id}
                className="bg-slate-50/50 rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-4 hover:border-emerald-200 transition-colors"
              >
                {/* Image block preview */}
                <div className="relative w-full sm:w-24 h-24 bg-slate-200 rounded-xl overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={report.imageUrl} 
                    alt={report.imageName}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-2 left-2 bg-primary text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded">
                    {report.confidence}%
                  </div>
                </div>

                {/* Details report */}
                <div className="flex-1 flex flex-col justify-between text-left space-y-2">
                  <div className="space-y-0.5 relative pr-8">
                    <h4 className="font-bold text-sm text-text leading-tight">
                      {language === "kn" ? report.diseaseName.kn : report.diseaseName.en}
                    </h4>
                    <button 
                      onClick={() => deleteReport(report.id)}
                      className="absolute top-0 right-0 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <p className="text-[10px] text-text-light font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary" />
                      {t.scannedOn}: {report.date}
                    </p>
                  </div>
                  
                  <p className="text-[11px] text-text-light line-clamp-2 leading-relaxed">
                    {language === "kn" 
                      ? (report.remedy?.kn || (report as any).treatment?.kn || "")
                      : (report.remedy?.en || (report as any).treatment?.en || "")}
                  </p>

                  <div className="pt-1">
                    <Link 
                      href={`/dashboard/scanner?reviewId=${report.id}`}
                      className="text-primary hover:text-primary-dark font-extrabold text-[10px] tracking-wider uppercase inline-flex items-center gap-0.5"
                    >
                      {language === "kn" ? "ಪೂರ್ಣ ವಿವರ ನೋಡಿ →" : "View Full Report →"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
