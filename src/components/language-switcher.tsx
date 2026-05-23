"use client";

import { useAgriMithraStore } from "@/lib/store";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useAgriMithraStore();

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-5 h-5 text-primary-dark hidden sm:inline" />
      <div className="bg-primary-light/50 p-1 rounded-full flex border border-primary-light">
        <button
          onClick={() => setLanguage("kn")}
          className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            language === "kn"
              ? "bg-primary text-white shadow-md"
              : "text-primary-dark hover:bg-primary-light"
          }`}
          aria-label="ಕನ್ನಡ ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ"
        >
          ಕನ್ನಡ
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            language === "en"
              ? "bg-primary text-white shadow-md"
              : "text-primary-dark hover:bg-primary-light"
          }`}
          aria-label="Select English Language"
        >
          English
        </button>
      </div>
    </div>
  );
}
