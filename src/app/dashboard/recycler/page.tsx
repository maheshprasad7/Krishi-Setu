"use client";

import { useState } from "react";
import { useAgriMithraStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { 
  Recycle, 
  MapPin, 
  Leaf, 
  PackageSearch,
  PlusCircle,
  Tag,
  CheckCircle,
  Truck,
  Phone
} from "lucide-react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const recyclableItems = [
  { en: "Cow dung", kn: "ಸಗಣಿ" },
  { en: "Cow urine", kn: "ಗೋಮೂತ್ರ" },
  { en: "Cocopeat", kn: "ತೆಂಗಿನ ನಾರು (ಕೊಕೊಪೀಟ್)" },
  { en: "Sugarcane bagasse", kn: "ಕಬ್ಬಿನ ಸಿಪ್ಪೆ" },
  { en: "Rice husk", kn: "ಭತ್ತದ ಹೊಟ್ಟು" },
  { en: "Paddy straw", kn: "ಭತ್ತದ ಹುಲ್ಲು" },
  { en: "Coconut shells", kn: "ತೆಂಗಿನ ಚಿಪ್ಪು" },
  { en: "Banana stems", kn: "ಬಾಳೆ ದಿಂಡು" },
  { en: "Groundnut shells", kn: "ಕಡಲೆಕಾಯಿ ಸಿಪ್ಪೆ" },
  { en: "Dry leaves", kn: "ಒಣಗಿದ ಎಲೆಗಳು" },
  { en: "Vegetable waste", kn: "ತರಕಾರಿ ತ್ಯಾಜ್ಯ" },
  { en: "Fruit peels", kn: "ಹಣ್ಣಿನ ಸಿಪ್ಪೆಗಳು" },
  { en: "Poultry litter", kn: "ಕೋಳಿ ಗೊಬ್ಬರ" },
  { en: "Sawdust", kn: "ಮರದ ಪುಡಿ" },
  { en: "Arecanut sheath", kn: "ಅಡಿಕೆ ಹಾಳೆ" },
  { en: "Neem seeds", kn: "ಬೇವಿನ ಬೀಜ" },
  { en: "Corn cobs", kn: "ಮೆಕ್ಕೆಜೋಳದ ದಿಂಡು" },
  { en: "Cotton stalks", kn: "ಹತ್ತಿ ಗಿಡದ ಕಡ್ಡಿಗಳು" },
  { en: "Coffee husk", kn: "ಕಾಫಿ ಹೊಟ್ಟು" }
];


export default function RecyclerPage() {
  const { language, profile, recyclerListings, addRecyclerListing } = useAgriMithraStore();
  const t = translations[language];

  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !quantity || (!isFree && !price)) return;
    
    const itemData = recyclableItems.find(i => i.en === selectedItem);
    
    addRecyclerListing({
      itemEn: selectedItem,
      itemKn: itemData ? itemData.kn : selectedItem,
      quantity,
      price: isFree ? (language === "kn" ? "ಉಚಿತ" : "Free") : `₹${price}`
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedItem("");
      setQuantity("");
      setPrice("");
      setIsFree(false);
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-10">
      
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
            <h1 className="font-poppins font-extrabold text-2xl sm:text-3xl text-text flex items-center gap-2">
              <Recycle className="w-7 h-7 text-emerald-500" />
              {language === "kn" ? "ಕೃಷಿ ತ್ಯಾಜ್ಯ ಮರುಬಳಕೆ" : "Agri Recycler"}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-text-light font-medium flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-emerald-400" />
            {language === "kn" ? "ಕೃಷಿ ತ್ಯಾಜ್ಯವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ ಅಥವಾ ಮಾರಿ ಲಾಭ ಗಳಿಸಿ" : "Trade or share your agricultural byproducts and waste"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: POST AN ITEM (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <PlusCircle className="w-32 h-32 text-emerald-600" />
            </div>

            <h3 className="font-poppins font-extrabold text-lg text-text flex items-center gap-2 border-b border-slate-100 pb-3 relative z-10">
              <PackageSearch className="w-6 h-6 text-emerald-600" />
              {language === "kn" ? "ತ್ಯಾಜ್ಯ / ವಸ್ತು ಸೇರಿಸಿ" : "Post an Item"}
            </h3>

            {isSubmitted ? (
              <div className="py-10 flex flex-col items-center justify-center text-center space-y-3 animate-fadeIn relative z-10">
                <CheckCircle className="w-12 h-12 text-emerald-500 animate-bounce" />
                <p className="font-extrabold text-text">
                  {language === "kn" ? "ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ!" : "Item Posted Successfully!"}
                </p>
                <p className="text-xs text-text-light font-medium">
                  {language === "kn" ? "ಹತ್ತಿರದ ರೈತರಿಗೆ ನಿಮ್ಮ ವಸ್ತು ಕಾಣಿಸುತ್ತದೆ." : "Nearby farmers can now see your listing."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 pt-4 relative z-10">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-light uppercase tracking-wider block">
                    {language === "kn" ? "ವಸ್ತುವಿನ ಹೆಸರು" : "Select Item"}
                  </label>
                  <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-bold bg-slate-50 outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      {language === "kn" ? "ಆಯ್ಕೆ ಮಾಡಿ..." : "Choose an item..."}
                    </option>
                    {recyclableItems.map(item => (
                      <option key={item.en} value={item.en}>
                        {language === "kn" ? item.kn : item.en}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-light uppercase tracking-wider block">
                    {language === "kn" ? "ಪ್ರಮಾಣ (ಕ್ವಾಂಟಿಟಿ)" : "Quantity (e.g., 2 Tons, 50 Kg)"}
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    placeholder={language === "kn" ? "ಉದಾ: ೨ ಟ್ರಾಕ್ಟರ್, ೫೦ ಕೆ.ಜಿ" : "e.g., 2 Tractors, 50 Kg"}
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-bold bg-slate-50 outline-none"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-text-light uppercase tracking-wider block">
                      {language === "kn" ? "ಬೆಲೆ ಅಥವಾ ಉಚಿತ" : "Pricing"}
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" checked={isFree} onChange={() => { setIsFree(!isFree); setPrice(""); }} />
                        <div className={`block w-10 h-6 rounded-full transition-colors ${isFree ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isFree ? 'translate-x-4' : ''}`}></div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                        {language === "kn" ? "ಉಚಿತವಾಗಿ ನೀಡಿ" : "Give for Free"}
                      </span>
                    </label>
                  </div>

                  {!isFree && (
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                      <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required={!isFree}
                        placeholder={language === "kn" ? "ಬೆಲೆ ನಮೂದಿಸಿ (ಉದಾ: ₹500)" : "Enter amount"}
                        className="w-full pl-8 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-bold bg-slate-50 outline-none"
                      />
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl shadow-xl shadow-emerald-200 transition-all duration-300 flex justify-center items-center gap-2 mt-4"
                >
                  <PlusCircle className="w-5 h-5" />
                  {language === "kn" ? "ಪೋಸ್ಟ್ ಮಾಡಿ" : "Post Listing"}
                </button>
              </form>
            )}
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-3xl flex items-start gap-4">
            <div className="bg-emerald-200/50 p-2.5 rounded-xl shrink-0">
              <Leaf className="w-6 h-6 text-emerald-700" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm text-emerald-900">
                {language === "kn" ? "ಮರುಬಳಕೆ ಏಕೆ ಮುಖ್ಯ?" : "Why Recycle?"}
              </h4>
              <p className="text-xs font-medium text-emerald-800 leading-relaxed">
                {language === "kn" 
                  ? "ಕೃಷಿ ತ್ಯಾಜ್ಯ ಸುಡುವುದರಿಂದ ಭೂಮಿ ಹಾಳಾಗುತ್ತದೆ. ಇದನ್ನು ಇತರರಿಗೆ ನೀಡುವುದರಿಂದ ಸಾವಯವ ಗೊಬ್ಬರ ತಯಾರಿಸಲು ಸಹಾಯವಾಗುತ್ತದೆ." 
                  : "Burning farm waste harms the soil. Sharing it helps other farmers create organic compost and reduces pollution."}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AVAILABLE NEARBY (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <h3 className="font-poppins font-extrabold text-lg text-text flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                {language === "kn" ? "ಹತ್ತಿರದಲ್ಲಿ ಲಭ್ಯವಿರುವವು" : "Available Nearby"}
              </h3>
              <span className="bg-primary/10 text-primary-dark text-xs font-bold px-3 py-1 rounded-full">
                {profile.district || "Mandya"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recyclerListings.map(listing => (
                <div key={listing.id} className="border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 group bg-slate-50/50">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-base text-text group-hover:text-emerald-700 transition-colors">
                      {language === "kn" ? listing.itemKn : listing.itemEn}
                    </h4>
                    {listing.price.includes("Free") || listing.price.includes("ಉಚಿತ") ? (
                      <span className="bg-green-100 text-green-700 text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wide flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {language === "kn" ? "ಉಚಿತ" : "FREE"}
                      </span>
                    ) : (
                      <span className="bg-white text-text-light text-xs font-bold px-2 py-1 border border-slate-200 rounded-lg">
                        {listing.price}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-text-light">
                      <Truck className="w-4 h-4 text-emerald-500" />
                      {listing.quantity}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-text-light">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      {listing.distance} • {listing.farmer}
                    </div>
                  </div>

                  <button className="w-full bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-700 text-sm font-bold py-2.5 rounded-xl transition-all flex justify-center items-center gap-2 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600">
                    <Phone className="w-4 h-4" />
                    {language === "kn" ? "ರೈತರನ್ನು ಸಂಪರ್ಕಿಸಿ" : "Contact Farmer"}
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
