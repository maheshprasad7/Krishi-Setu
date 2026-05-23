"use client";

import { useEffect, useState } from "react";
import { useAgriMithraStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { getEligibleSchemes, GovtScheme } from "@/lib/recommendations";
import { Award, CheckCircle, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SchemesPage() {
  const { language, profile, savedSchemes, toggleSavedScheme } = useAgriMithraStore();
  const t = translations[language];
  const [schemes, setSchemes] = useState<GovtScheme[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSchemes(getEligibleSchemes(profile));
    setMounted(true);
  }, [profile]);

  if (!mounted) return null;

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto pb-10">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-[2rem] p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 translate-x-8 -translate-y-8">
          <ShieldCheck className="w-64 h-64" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl">
              {t.eligibleSchemes}
            </h1>
            <p className="text-emerald-50 mt-2 font-medium max-w-xl">
              {language === "kn" 
                ? "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಕೃಷಿ ವಿವರಗಳ ಆಧಾರದ ಮೇಲೆ ನಿಮಗಾಗಿ ವಿಶೇಷವಾಗಿ ಆಯ್ಕೆ ಮಾಡಲಾದ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು."
                : "Government schemes and subsidies tailored specifically for you based on your farming profile."}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shrink-0 text-center">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-100">{language === "kn" ? "ಒಟ್ಟು ಯೋಜನೆಗಳು" : "Total Matches"}</p>
            <p className="text-3xl font-extrabold">{schemes.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((scheme) => {
          const isSaved = savedSchemes.includes(scheme.id);
          return (
            <div key={scheme.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:border-emerald-300 transition-colors flex flex-col justify-between space-y-4 relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-poppins font-extrabold text-lg text-text">
                    {language === "kn" ? scheme.title.kn : scheme.title.en}
                  </h3>
                  <button 
                    onClick={() => toggleSavedScheme(scheme.id)}
                    className={`shrink-0 p-2 rounded-full border transition-all ${isSaved ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-emerald-600'}`}
                  >
                    <CheckCircle className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <p className="text-sm font-medium text-text-light leading-relaxed">
                  {language === "kn" ? scheme.description.kn : scheme.description.en}
                </p>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-2xl flex gap-2.5 items-start">
                <Award className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-xs font-bold text-emerald-800 leading-snug">
                  {language === "kn" ? scheme.matchReason.kn : scheme.matchReason.en}
                </p>
              </div>

              <div className="pt-2">
                <a 
                  href={scheme.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
                >
                  {language === "kn" ? "ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ" : "Apply Now"}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
