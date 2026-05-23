"use client";

import { useState, useEffect } from "react";
import { useAgriMithraStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { 
  CloudSun, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  Thermometer, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  Calendar,
  ChevronLeft,
  MapPin
} from "lucide-react";
import Link from "next/link";

interface DistrictWeather {
  district_en: string;
  district_kn: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  rainProb: number;
  condition_en: string;
  condition_kn: string;
  cropZone_en: string;
  cropZone_kn: string;
  advice_en: string;
  advice_kn: string;
  forecast: Array<{ day: string; temp: number; prob: number }>;
}

const karnatakaWeatherEngine: Record<string, DistrictWeather> = {
  Mandya: {
    district_en: "Mandya",
    district_kn: "ಮಂಡ್ಯ",
    temp: 29,
    humidity: 78,
    windSpeed: 12,
    rainProb: 65,
    condition_en: "Mostly Cloudy with Rain Showers",
    condition_kn: "ಮೋಡ ಕವಿದ ವಾತಾವರಣ, ಮಳೆ ಸಾಧ್ಯತೆ",
    cropZone_en: "Sugarcane & Paddy Zone",
    cropZone_kn: "ಕಬ್ಬು ಮತ್ತು ಭತ್ತ ಬೆಳೆಯುವ ವಲಯ",
    advice_en: "High rain probability. Please avoid applying chemical fertilizers or nitrogen today as they will wash off. Clean drain channels in sugarcane fields to avoid waterlogging.",
    advice_kn: "ಹೆಚ್ಚು ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆ ಇದೆ. ರಾಸಾಯನಿಕ ಗೊಬ್ಬರ ಅಥವಾ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಬೇಡಿ (ನೀರಿನಲ್ಲಿ ಕೊಚ್ಚಿ ಹೋಗುತ್ತದೆ). ಕಬ್ಬಿನ ಗದ್ದೆಯಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಚರಂಡಿ ಸ್ವಚ್ಛಗೊಳಿಸಿ.",
    forecast: [
      { day: "Sat", temp: 28, prob: 70 },
      { day: "Sun", temp: 29, prob: 40 },
      { day: "Mon", temp: 31, prob: 20 },
      { day: "Tue", temp: 30, prob: 10 }
    ]
  },
  Kolar: {
    district_en: "Kolar",
    district_kn: "ಕೋಲಾರ",
    temp: 32,
    humidity: 45,
    windSpeed: 18,
    rainProb: 15,
    condition_en: "Dry & Warm Wind",
    condition_kn: "ಒಣ ಮತ್ತು ಬಿಸಿ ಹವಾಮಾನ",
    cropZone_en: "Vegetable & Tomato Zone",
    cropZone_kn: "ತರಕಾರಿ ಮತ್ತು ಟೊಮೆಟೊ ವಲಯ",
    advice_en: "Dry climate may favor whitefly or red spider mites in tomato crops. Set up yellow sticky traps. Provide light drip irrigation in the morning.",
    advice_kn: "ಒಣ ಹವಾಮಾನದಿಂದ ಟೊಮೆಟೊ ಬೆಳೆಗೆ ಬಿಳಿ ನೊಣ ಅಥವಾ ಕೆಂಪು ಜೇಡ ನುಸಿ ಬಾಧೆ ಬರಬಹುದು. ಹಳದಿ ಜಿಗುಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ. ಬೆಳಗ್ಗೆ ಹಗುರವಾದ ಹನಿ ನೀರಾವರಿ ನೀಡಿ.",
    forecast: [
      { day: "Sat", temp: 33, prob: 10 },
      { day: "Sun", temp: 32, prob: 10 },
      { day: "Mon", temp: 31, prob: 25 },
      { day: "Tue", temp: 31, prob: 30 }
    ]
  },
  Belagavi: {
    district_en: "Belagavi",
    district_kn: "ಬೆಳಗಾವಿ",
    temp: 27,
    humidity: 85,
    windSpeed: 22,
    rainProb: 80,
    condition_en: "Heavy Monsoonal Rain",
    condition_kn: "ಭಾರಿ ಮುಂಗಾರು ಮಳೆ",
    cropZone_en: "Tobacco, Maize & Soyabean",
    cropZone_kn: "ತಂಬಾಕು, ಜೋಳ ಮತ್ತು ಸೋಯಾಬೀನ್ ವಲಯ",
    advice_en: "Heavy continuous rains expected. Postpone harvesting of maize. Ensure absolute drain flow out of soyabean fields to prevent root rot.",
    advice_kn: "ನಿರಂತರ ಭಾರಿ ಮಳೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ. ಜೋಳದ ಕೊಯ್ಲು ಮುಂದೂಡಿ. ಸೋಯಾಬೀನ್ ಗದ್ದೆಯಲ್ಲಿ ಬೇರು ಕೊಳೆತ ರೋಗ ತಡೆಯಲು ನೀರು ಸರಾಗವಾಗಿ ಹರಿದು ಹೋಗುವಂತೆ ವ್ಯವಸ್ಥೆ ಮಾಡಿ.",
    forecast: [
      { day: "Sat", temp: 26, prob: 90 },
      { day: "Sun", temp: 26, prob: 80 },
      { day: "Mon", temp: 27, prob: 70 },
      { day: "Tue", temp: 28, prob: 60 }
    ]
  },
  Davanagere: {
    district_en: "Davanagere",
    district_kn: "ದಾವಣಗೆರೆ",
    temp: 31,
    humidity: 55,
    windSpeed: 14,
    rainProb: 30,
    condition_en: "Partly Sunny",
    condition_kn: "ಭಾಗಶಃ ಬಿಸಿಲು",
    cropZone_en: "Cotton & Maize Zone",
    cropZone_kn: "ಹತ್ತಿ ಮತ್ತು ಜೋಳದ ವಲಯ",
    advice_en: "Good weather for micro-nutrient spraying on maize leaves. Inspect cotton crops for pink bollworm and spray organic neem seed kernel extract if needed.",
    advice_kn: "ಜೋಳದ ಎಲೆಗಳಿಗೆ ಲಘು ಪೋಷಕಾಂಶ ಸಿಂಪಡಿಸಲು ಉತ್ತಮ ಹವಾಮಾನ. ಹತ್ತಿ ಬೆಳೆಯಲ್ಲಿ ಗುಲಾಬಿ ಕಾಯಿಕೊರಕ ಹುಳು ಪರೀಕ್ಷಿಸಿ ಮತ್ತು ಅಗತ್ಯವಿದ್ದರೆ ಬೇವಿನ ಬೀಜದ ಕಷಾಯ ಸಿಂಪಡಿಸಿ.",
    forecast: [
      { day: "Sat", temp: 31, prob: 30 },
      { day: "Sun", temp: 32, prob: 20 },
      { day: "Mon", temp: 32, prob: 10 },
      { day: "Tue", temp: 30, prob: 40 }
    ]
  },
  Chikkamagaluru: {
    district_en: "Chikkamagaluru",
    district_kn: "ಚಿಕ್ಕಮಗಳೂರು",
    temp: 24,
    humidity: 90,
    windSpeed: 15,
    rainProb: 85,
    condition_en: "Cool Mist and Drizzle",
    condition_kn: "ತಂಪಾದ ಹವಾಮಾನ, ಜಿಟಿಜಿಟಿ ಮಳೆ",
    cropZone_en: "Coffee & Arecanut Hills",
    cropZone_kn: "ಕಾಫಿ ಮತ್ತು ಅಡಿಕೆ ತೋಟಗಳ ವಲಯ",
    advice_en: "High humidity and continuous fog may lead to black rot in coffee berries. Spray Bordeaux mixture (1%) to defend coffee plants.",
    advice_kn: "ಹೆಚ್ಚಿನ ತೇವಾಂಶ ಮತ್ತು ನಿರಂತರ ಮಂಜಿನಿಂದ ಕಾಫಿ ಕಾಯಿಗಳಿಗೆ ಕಪ್ಪು ಕೊಳೆತು ರೋಗ ಬರುವ ಸಂಭವವಿದೆ. ರಕ್ಷಣೆಗಾಗಿ ಶೇ. ೧ ರ ಬೋರ್ಡೋ ಮಿಶ್ರಣವನ್ನು ಸಿಂಪಡಿಸಿ.",
    forecast: [
      { day: "Sat", temp: 23, prob: 90 },
      { day: "Sun", temp: 24, prob: 80 },
      { day: "Mon", temp: 24, prob: 85 },
      { day: "Tue", temp: 25, prob: 60 }
    ]
  }
};

export default function WeatherPage() {
  const { language, profile, updateProfile } = useAgriMithraStore();
  const t = translations[language];

  const [activeDistrict, setActiveDistrict] = useState<string>("Mandya");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentWeather, setCurrentWeather] = useState<DistrictWeather>(karnatakaWeatherEngine.Mandya);

  // Sync with store district or active district
  useEffect(() => {
    if (profile.district && karnatakaWeatherEngine[profile.district]) {
      setActiveDistrict(profile.district);
      setCurrentWeather(karnatakaWeatherEngine[profile.district]);
    }
  }, [profile.district]);

  const handleSelectDistrict = (dist: string) => {
    setActiveDistrict(dist);
    setCurrentWeather(karnatakaWeatherEngine[dist]);
    updateProfile({ district: dist });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryNorm = searchQuery.trim().toLowerCase();
    
    // Simple search match inside district keys
    const match = Object.keys(karnatakaWeatherEngine).find(
      k => k.toLowerCase() === queryNorm || karnatakaWeatherEngine[k].district_kn === searchQuery.trim()
    );

    if (match) {
      handleSelectDistrict(match);
      setSearchQuery("");
    } else {
      alert(language === "kn" 
        ? "ಕ್ಷಮಿಸಿ! ಈ ಜಿಲ್ಲೆಯ ಮಾಹಿತಿ ಸದ್ಯಕ್ಕೆ ಇಲ್ಲ. ಕೋಲಾರ, ಬೆಳಗಾವಿ, ದಾವಣಗೆರೆ ಅಥವಾ ಚಿಕ್ಕಮಗಳೂರು ಪರೀಕ್ಷಿಸಿ." 
        : "Sorry! We only have detailed forecasts for Mandya, Kolar, Belagavi, Davanagere, Chikkamagaluru.");
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      
      {/* HEADER TITLE BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="text-left space-y-1">
          <div className="flex items-center gap-2">
            <Link 
              href="/dashboard"
              className="md:hidden bg-slate-100 hover:bg-slate-200 p-2 rounded-xl text-text"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-poppins font-extrabold text-2xl sm:text-3xl text-text">
              {t.weatherForecast}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-text-light font-medium">
            {t.weatherForecastDesc}
          </p>
        </div>

        {/* Search District form */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 self-start sm:self-center">
          <div className="relative">
            <Search className="w-4 h-4 text-text-light absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === "kn" ? "ಜಿಲ್ಲೆ ಹುಡುಕಿ..." : "Search District..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-xs font-bold text-text w-40 sm:w-48 bg-white"
            />
          </div>
          <button 
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-bold px-3 py-2 rounded-xl text-xs"
          >
            {language === "kn" ? "ಹುಡುಕು" : "Search"}
          </button>
        </form>
      </div>

      {/* QUICK QUICK DISTRICT TOGGLERS */}
      <div className="flex flex-wrap gap-2 justify-start border-b border-slate-100 pb-4">
        {Object.keys(karnatakaWeatherEngine).map((key) => {
          const item = karnatakaWeatherEngine[key];
          const isActive = activeDistrict === key;
          return (
            <button
              key={key}
              onClick={() => handleSelectDistrict(key)}
              className={`px-4.5 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 flex items-center gap-1.5 border ${
                isActive 
                  ? "bg-primary text-white border-primary shadow-sm" 
                  : "bg-white text-text-light hover:bg-slate-50 border-slate-200"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              {language === "kn" ? item.district_kn : item.district_en}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* MAIN TEMPERATURE CONSOLE - 7 Columns */}
        <div className="lg:col-span-7 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white rounded-[2rem] p-6 sm:p-8 space-y-8 shadow-md relative overflow-hidden text-left">
          
          <div className="absolute right-0 top-0 opacity-10 translate-x-12 -translate-y-12">
            {currentWeather.rainProb > 50 ? (
              <CloudRain className="w-80 h-80" />
            ) : (
              <CloudSun className="w-80 h-80" />
            )}
          </div>

          <div className="relative z-10 flex justify-between items-start">
            <div className="space-y-1">
              <span className="bg-white/20 text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
                {language === "kn" ? "ಕರ್ನಾಟಕ ಹವಾಮಾನ" : "Karnataka Climate"}
              </span>
              <h2 className="font-poppins font-extrabold text-3xl sm:text-4xl pt-2">
                {language === "kn" ? currentWeather.district_kn : currentWeather.district_en}
              </h2>
              <p className="text-sm text-blue-100 font-bold tracking-wide">
                {language === "kn" ? currentWeather.cropZone_kn : currentWeather.cropZone_en}
              </p>
            </div>

            <div className="flex flex-col items-end">
              {currentWeather.rainProb > 50 ? (
                <CloudRain className="w-16 h-16 text-white shrink-0 animate-bounce" />
              ) : (
                <CloudSun className="w-16 h-16 text-white shrink-0" />
              )}
              <span className="text-4xl sm:text-5xl font-extrabold font-poppins pt-2">{currentWeather.temp}°C</span>
              <p className="text-xs text-blue-100 font-semibold">{language === "kn" ? currentWeather.condition_kn : currentWeather.condition_en}</p>
            </div>
          </div>

          {/* Triple details metrics row */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20 relative z-10">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-xl">
                <CloudRain className="w-5 h-5 text-blue-200" />
              </div>
              <div className="leading-tight">
                <p className="text-[10px] text-blue-100 font-bold uppercase">{t.rainPrediction}</p>
                <p className="text-sm font-extrabold font-poppins">{currentWeather.rainProb}%</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-xl">
                <Droplets className="w-5 h-5 text-blue-200" />
              </div>
              <div className="leading-tight">
                <p className="text-[10px] text-blue-100 font-bold uppercase">{t.humidity}</p>
                <p className="text-sm font-extrabold font-poppins">{currentWeather.humidity}%</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-xl">
                <Wind className="w-5 h-5 text-blue-200" />
              </div>
              <div className="leading-tight">
                <p className="text-[10px] text-blue-100 font-bold uppercase">{t.windSpeed}</p>
                <p className="text-sm font-extrabold font-poppins">{currentWeather.windSpeed} km/h</p>
              </div>
            </div>
          </div>

        </div>

        {/* CROP IMPACT ADVISORY - 5 Columns */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          {/* Active Advisory Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h3 className="font-poppins font-extrabold text-sm text-text flex items-center gap-2 border-b border-slate-100 pb-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              {language === "kn" ? "ರೈತರಿಗೆ ಕೃಷಿ ಸಲಹೆ" : "Weather Crop Advisory"}
            </h3>
            
            <p className="text-xs sm:text-sm text-text-light leading-relaxed font-semibold">
              {language === "kn" ? currentWeather.advice_kn : currentWeather.advice_en}
            </p>

            <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl flex items-center gap-2 text-primary-dark">
              <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0" />
              <span className="text-[10px] font-extrabold uppercase">
                {language === "kn" ? "ಪಾಲಿಸಬೇಕಾದ ನಿಯಮಗಳು" : "Expert Guidelines Recommended"}
              </span>
            </div>
          </div>

          {/* 4 Day simple forecast lists */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h3 className="font-poppins font-extrabold text-sm text-text flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-4.5 h-4.5 text-primary" />
              {language === "kn" ? "೪ ದಿನಗಳ ಮಳೆ ಮುನ್ಸೂಚನೆ" : "4-Day Forecast"}
            </h3>

            <div className="divide-y divide-slate-100">
              {currentWeather.forecast.map((fc, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs font-bold">
                  <span className="text-text-light font-extrabold">{fc.day}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-text">{fc.temp}°C</span>
                    <span className={`px-2 py-0.5 rounded-md ${
                      fc.prob > 50 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-text-light'
                    }`}>
                      ☔ {fc.prob}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
