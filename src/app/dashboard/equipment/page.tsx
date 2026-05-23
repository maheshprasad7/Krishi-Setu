"use client";

import { useEffect, useState } from "react";
import { useAgriMithraStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { getEquipmentSuggestions, EquipmentSuggestion } from "@/lib/recommendations";
import { Tractor, PhoneCall, Sparkles } from "lucide-react";

export default function EquipmentPage() {
  const { language, profile } = useAgriMithraStore();
  const t = translations[language];
  const [equipment, setEquipment] = useState<EquipmentSuggestion[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setEquipment(getEquipmentSuggestions(profile));
    setMounted(true);
  }, [profile]);

  if (!mounted) return null;

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto pb-10">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-[2rem] p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 translate-x-8 -translate-y-8">
          <Tractor className="w-64 h-64" />
        </div>
        <div className="relative z-10">
          <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl">
            {language === "kn" ? "ಯಂತ್ರೋಪಕರಣಗಳ ತ್ವರಿತ ಬುಕಿಂಗ್" : "Instant Equipment Booking"}
          </h1>
          <p className="text-amber-50 mt-2 font-medium max-w-xl">
            {language === "kn" 
              ? "ಒಂದು ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಯಂತ್ರಗಳನ್ನು ಬುಕ್ ಮಾಡಿ. ಯಾವುದೇ ವೆಬ್‌ಸೈಟ್‌ಗಳಿಗೆ ಹೋಗಬೇಕಾಗಿಲ್ಲ, ನೇರವಾಗಿ ಮಾಲೀಕರಿಗೆ ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಹೋಗುತ್ತದೆ."
              : "Book machinery with one click. No need to navigate complex websites, book instantly via direct WhatsApp."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:border-amber-300 transition-colors flex flex-col group">
            <div className="h-48 overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={item.imageUrl} 
                alt={item.type}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-text font-extrabold text-[10px] px-2 py-1 rounded-full uppercase tracking-wider">
                {item.type}
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-poppins font-extrabold text-lg text-text leading-tight">
                  {language === "kn" ? item.name.kn : item.name.en}
                </h3>
                <p className="text-xl font-extrabold text-amber-600">
                  {item.estimatedPrice}
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-2.5 rounded-xl flex gap-2 items-start">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] font-bold text-amber-800 leading-snug">
                  {language === "kn" ? item.matchReason.kn : item.matchReason.en}
                </p>
              </div>

              <a 
                href={item.providerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-all shadow-md shadow-emerald-200"
              >
                <PhoneCall className="w-4 h-4" />
                {language === "kn" ? "ಈಗಲೇ ಬುಕ್ ಮಾಡಿ (Book Now)" : "Book Now"}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
