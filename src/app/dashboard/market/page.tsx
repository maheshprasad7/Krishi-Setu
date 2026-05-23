"use client";

import { useState } from "react";
import { useAgriMithraStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { 
  IndianRupee, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  MapPin, 
  ChevronLeft,
  Calendar,
  Sparkles,
  ArrowUpDown
} from "lucide-react";
import Link from "next/link";

interface CropPriceRecord {
  id: string;
  name_en: string;
  name_kn: string;
  mandi_en: string;
  mandi_kn: string;
  min: number;
  max: number;
  avg: number;
  trend: "up" | "down" | "stable";
}

const mockAPMCCropPrices: CropPriceRecord[] = [
  { id: "1", name_en: "Ragi (Finger Millet)", name_kn: "ರಾಗಿ", mandi_en: "Mandya APMC", mandi_kn: "ಮಂಡ್ಯ ಎಪಿಎಂಸಿ", min: 3200, max: 3750, avg: 3540, trend: "up" },
  { id: "2", name_en: "Paddy (Grade A Rice)", name_kn: "ಭತ್ತ", mandi_en: "Mysore APMC", mandi_kn: "ಮೈಸೂರು ಎಪಿಎಂಸಿ", min: 2150, max: 2500, avg: 2380, trend: "up" },
  { id: "3", name_en: "Tomato (Fresh Crate)", name_kn: "ಟೊಮೆಟೊ", mandi_en: "Kolar APMC", mandi_kn: "ಕೋಲಾರ ಎಪಿಎಂಸಿ", min: 1400, max: 2000, avg: 1850, trend: "down" },
  { id: "4", name_en: "Onion (Bellary Red)", name_kn: "ಈರುಳ್ಳಿ", mandi_en: "Yeshwanthpur APMC", mandi_kn: "ಯಶವಂತಪುರ ಎಪಿಎಂಸಿ", min: 1800, max: 2400, avg: 2100, trend: "stable" },
  { id: "5", name_en: "Coconut (1000 nuts)", name_kn: "ತೆಂಗಿನಕಾಯಿ", mandi_en: "Tiptur APMC", mandi_kn: "ತಿಪಟೂರು ಎಪಿಎಂಸಿ", min: 12000, max: 15500, avg: 14200, trend: "up" },
  { id: "6", name_en: "Groundnut (Peanuts)", name_kn: "ಕಡಲೆಕಾಯಿ", mandi_en: "Challakere APMC", mandi_kn: "ಚಳ್ಳಕೆರೆ ಎಪಿಎಂಸಿ", min: 6100, max: 6900, avg: 6500, trend: "stable" },
  { id: "7", name_en: "Cotton (DCH-32)", name_kn: "ಹತ್ತಿ", mandi_en: "Raichur APMC", mandi_kn: "ರಾಯಚೂರು ಎಪಿಎಂಸಿ", min: 7200, max: 8100, avg: 7650, trend: "down" },
  { id: "8", name_en: "Maize (Corn)", name_kn: "ಮೆಕ್ಕೆಜೋಳ", mandi_en: "Davangere APMC", mandi_kn: "ದಾವಣಗೆರೆ ಎಪಿಎಂಸಿ", min: 1950, max: 2250, avg: 2100, trend: "stable" },
  { id: "9", name_en: "Arecanut (Red)", name_kn: "ಅಡಿಕೆ", mandi_en: "Shimoga APMC", mandi_kn: "ಶಿವಮೊಗ್ಗ ಎಪಿಎಂಸಿ", min: 42000, max: 48000, avg: 45000, trend: "up" },
  { id: "10", name_en: "Tur (Red Gram)", name_kn: "ತೊಗರಿ", mandi_en: "Kalaburagi APMC", mandi_kn: "ಕಲಬುರಗಿ ಎಪಿಎಂಸಿ", min: 8200, max: 9100, avg: 8500, trend: "up" },
  { id: "11", name_en: "Jowar (Sorghum)", name_kn: "ಜೋಳ", mandi_en: "Hubballi APMC", mandi_kn: "ಹುಬ್ಬಳ್ಳಿ ಎಪಿಎಂಸಿ", min: 2600, max: 3100, avg: 2800, trend: "stable" },
  { id: "12", name_en: "Bengal Gram", name_kn: "ಕಡಲೆಬೇಳೆ", mandi_en: "Gadag APMC", mandi_kn: "ಗದಗ ಎಪಿಎಂಸಿ", min: 5200, max: 5800, avg: 5500, trend: "down" },
  { id: "13", name_en: "Black Pepper", name_kn: "ಕರಿಮೆಣಸು", mandi_en: "Sirsi APMC", mandi_kn: "ಶಿರಸಿ ಎಪಿಎಂಸಿ", min: 52000, max: 58000, avg: 55000, trend: "up" },
  { id: "14", name_en: "Green Chilli", name_kn: "ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ", mandi_en: "Belagavi APMC", mandi_kn: "ಬೆಳಗಾವಿ ಎಪಿಎಂಸಿ", min: 2500, max: 3800, avg: 3000, trend: "down" },
  { id: "15", name_en: "Turmeric", name_kn: "ಅರಿಶಿನ", mandi_en: "Chamarajanagar APMC", mandi_kn: "ಚಾಮರಾಜನಗರ ಎಪಿಎಂಸಿ", min: 9500, max: 12500, avg: 11000, trend: "up" },
  { id: "16", name_en: "Jaggery (Cane)", name_kn: "ಬೆಲ್ಲ", mandi_en: "Mandya APMC", mandi_kn: "ಮಂಡ್ಯ ಎಪಿಎಂಸಿ", min: 3900, max: 4600, avg: 4200, trend: "stable" }
];

export default function MarketPricesPage() {
  const { language } = useAgriMithraStore();
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState("");
  const [mandiFilter, setMandiFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "price">("price");

  // Filtering crops
  const filteredCrops = mockAPMCCropPrices.filter((crop) => {
    const nameMatch = 
      crop.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.name_kn.includes(searchQuery);
    const mandiMatch = mandiFilter === "all" || crop.mandi_en.toLowerCase().includes(mandiFilter.toLowerCase());
    return nameMatch && mandiMatch;
  });

  // Sorting
  const sortedCrops = [...filteredCrops].sort((a, b) => {
    if (sortBy === "name") {
      return language === "kn" ? a.name_kn.localeCompare(b.name_kn) : a.name_en.localeCompare(b.name_en);
    } else {
      return b.avg - a.avg; // Higher price first
    }
  });

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
              {t.marketPrices}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-text-light font-medium">
            {t.marketPricesDesc}
          </p>
        </div>

        {/* Date tracker badge */}
        <div className="bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-primary-dark self-start sm:self-center">
          <Calendar className="w-4 h-4 text-primary shrink-0" />
          <span className="text-[10px] font-extrabold uppercase">
            {language === "kn" ? "ಕೊನೆಯ ನವೀಕರಣ: ಇಂದು ಬೆಳಿಗ್ಗೆ" : "Updated: Today 6 AM"}
          </span>
        </div>
      </div>

      {/* FILTER & SORT TOOLS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4.5 h-4.5 text-text-light absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === "kn" ? "ಬೆಳೆಯ ಹೆಸರು ನಮೂದಿಸಿ..." : "Search crop name..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-xs font-bold text-text bg-white"
          />
        </div>

        {/* Mandi select */}
        <select
          value={mandiFilter}
          onChange={(e) => setMandiFilter(e.target.value)}
          className="px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-xs font-bold text-text-light bg-white"
        >
          <option value="all">{language === "kn" ? "ಎಲ್ಲಾ ಮಾರುಕಟ್ಟೆಗಳು (ಮಂಡಿ)" : "All APMC Mandis"}</option>
          <option value="mandya">{language === "kn" ? "ಮಂಡ್ಯ" : "Mandya Mandi"}</option>
          <option value="kolar">{language === "kn" ? "ಕೋಲಾರ" : "Kolar Mandi"}</option>
          <option value="yeshwanthpur">{language === "kn" ? "ಯಶವಂತಪುರ" : "Yeshwanthpur Mandi"}</option>
          <option value="mysore">{language === "kn" ? "ಮೈಸೂರು" : "Mysore Mandi"}</option>
          <option value="tiptur">{language === "kn" ? "ತಿಪಟೂರು" : "Tiptur Mandi"}</option>
          <option value="challakere">{language === "kn" ? "ಚಳ್ಳಕೆರೆ" : "Challakere Mandi"}</option>
          <option value="raichur">{language === "kn" ? "ರಾಯಚೂರು" : "Raichur Mandi"}</option>
          <option value="davangere">{language === "kn" ? "ದಾವಣಗೆರೆ" : "Davangere Mandi"}</option>
          <option value="shimoga">{language === "kn" ? "ಶಿವಮೊಗ್ಗ" : "Shimoga Mandi"}</option>
          <option value="kalaburagi">{language === "kn" ? "ಕಲಬುರಗಿ" : "Kalaburagi Mandi"}</option>
          <option value="hubballi">{language === "kn" ? "ಹುಬ್ಬಳ್ಳಿ" : "Hubballi Mandi"}</option>
          <option value="gadag">{language === "kn" ? "ಗದಗ" : "Gadag Mandi"}</option>
          <option value="sirsi">{language === "kn" ? "ಶಿರಸಿ" : "Sirsi Mandi"}</option>
          <option value="belagavi">{language === "kn" ? "ಬೆಳಗಾವಿ" : "Belagavi Mandi"}</option>
          <option value="chamarajanagar">{language === "kn" ? "ಚಾಮರಾಜನಗರ" : "Chamarajanagar Mandi"}</option>
        </select>

        {/* Sort selector toggle */}
        <button
          onClick={() => setSortBy(sortBy === "price" ? "name" : "price")}
          className="bg-white hover:bg-slate-50 border border-slate-200 text-text-light font-bold px-4 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all"
        >
          <ArrowUpDown className="w-4 h-4 text-primary shrink-0" />
          {sortBy === "price" 
            ? (language === "kn" ? "ಬೆಲೆ ಆಧರಿಸಿ ವಿಂಗಡಿಸಲಾಗಿದೆ" : "Sort: Highest Price First")
            : (language === "kn" ? "ಅಕ್ಷರಮಾಲೆ ಆಧರಿಸಿ ವಿಂಗಡಿಸಲಾಗಿದೆ" : "Sort: Alphabetical")}
        </button>

      </div>

      {/* DETAILED PRICE LISTING CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        
        {/* Table header hidden on tiny screens */}
        <div className="hidden sm:grid grid-cols-12 bg-slate-50 border-b border-slate-200 px-6 py-4.5 text-xs font-bold text-text-light uppercase tracking-wider text-left">
          <div className="col-span-5">{t.cropName}</div>
          <div className="col-span-3">{language === "kn" ? "ಮಾರುಕಟ್ಟೆ ಜಿಲ್ಲೆ" : "APMC Location"}</div>
          <div className="col-span-3 text-right">{t.mandiPrice}</div>
          <div className="col-span-1 text-center">{t.priceTrend}</div>
        </div>

        <div className="divide-y divide-slate-100 text-left">
          {sortedCrops.length === 0 ? (
            <div className="p-8 text-center text-text-light font-semibold text-xs">
              {language === "kn" ? "ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಬೆಳೆ ಸಿಗಲಿಲ್ಲ!" : "No pricing record matched your query filters."}
            </div>
          ) : (
            sortedCrops.map((crop) => (
              <div 
                key={crop.id}
                className="grid grid-cols-1 sm:grid-cols-12 px-6 py-5.5 items-center gap-3 sm:gap-0 hover:bg-slate-50/50 transition-colors"
              >
                {/* Crop title */}
                <div className="col-span-1 sm:col-span-5 flex items-center gap-3">
                  <div className="bg-primary/10 p-2.5 rounded-xl text-primary-dark shrink-0">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-text">
                      {language === "kn" ? crop.name_kn : crop.name_en}
                    </h3>
                    <span className="text-[10px] text-text-light font-bold sm:hidden">
                      {language === "kn" ? crop.mandi_kn : crop.mandi_en}
                    </span>
                  </div>
                </div>

                {/* Mandi location */}
                <div className="col-span-1 sm:col-span-3 hidden sm:flex items-center gap-1.5 text-text-light text-xs font-bold">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  {language === "kn" ? crop.mandi_kn : crop.mandi_en}
                </div>

                {/* Min max avg Prices */}
                <div className="col-span-1 sm:col-span-3 text-left sm:text-right space-y-0.5">
                  <div className="flex sm:justify-end items-baseline gap-1">
                    <span className="text-xs text-text-light font-bold sm:hidden">{t.mandiPrice}: </span>
                    <span className="text-base font-extrabold text-primary-dark">₹{crop.avg}</span>
                  </div>
                  <p className="text-[10px] text-text-light font-bold">
                    Min: ₹{crop.min} | Max: ₹{crop.max}
                  </p>
                </div>

                {/* Trend meter */}
                <div className="col-span-1 sm:col-span-1 flex justify-start sm:justify-center items-center">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase ${
                    crop.trend === 'up' 
                      ? 'bg-emerald-50 text-primary border border-emerald-100' 
                      : crop.trend === 'down'
                      ? 'bg-red-50 text-red-500 border border-red-100'
                      : 'bg-slate-50 text-text-light border border-slate-100'
                  }`}>
                    {crop.trend === 'up' ? (
                      <>
                        <TrendingUp className="w-3 h-3" />
                        {language === "kn" ? "ಏರಿಕೆ" : "Up"}
                      </>
                    ) : crop.trend === 'down' ? (
                      <>
                        <TrendingDown className="w-3 h-3" />
                        {language === "kn" ? "ಇಳಿಕೆ" : "Down"}
                      </>
                    ) : (
                      <>
                        <Minus className="w-3 h-3" />
                        {language === "kn" ? "ಸ್ಥಿರ" : "Flat"}
                      </>
                    )}
                  </span>
                </div>

              </div>
            ))
          )}
        </div>

      </div>

      {/* APMC Government support card */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-3xl p-6.5 text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-yellow" />
            <h4 className="font-poppins font-extrabold text-base">
              {language === "kn" ? "ಸರ್ಕಾರಿ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ (MSP)" : "Official Minimum Support Price (MSP)"}
            </h4>
          </div>
          <p className="text-xs text-amber-50 font-medium max-w-xl leading-relaxed">
            {language === "kn"
              ? "ಕೇಂದ್ರ ಸರ್ಕಾರವು ರಾಗಿ ಮತ್ತು ಭತ್ತಕ್ಕೆ ಅಧಿಕೃತ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆಯನ್ನು ಘೋಷಿಸಿದೆ. ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ತಪ್ಪು ದರಕ್ಕೆ ಮೋಸ ಹೋಗದಿರಿ. ಯಾವುದೇ ದೂರುಗಳಿದ್ದಲ್ಲಿ ತಕ್ಷಣ ಸಮೀಪದ ಎಪಿಎಂಸಿ ಕಛೇರಿ ಸಂಪರ್ಕಿಸಿ."
              : "Know your rights! The Central Government updates MSP every season for Ragi & Paddy. Ensure you do not sell your hard-earned harvest below these safety rates."}
          </p>
        </div>
        <a 
          href="https://agmarknet.gov.in"
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-amber-600 font-extrabold px-5 py-3 rounded-2xl shadow-sm text-xs transition-all tracking-wider shrink-0"
        >
          {language === "kn" ? "ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್" : "Agmarknet Portal"}
        </a>
      </div>

    </div>
  );
}
