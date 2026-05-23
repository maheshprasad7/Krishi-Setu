"use client";

import { useState, useEffect } from "react";
import { useAgriMithraStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { 
  User, 
  ChevronLeft,
  Settings,
  Sprout,
  Tractor,
  Banknote,
  Languages,
  Key,
  Database,
  Mic,
  Volume2,
  LogOut,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { speakText, stopSpeaking, SpeechRecognition } from "@/lib/voice";

// Reusable Voice Input Component moved OUTSIDE to prevent focus loss on re-renders
const VoiceInput = ({ 
  id, 
  label, 
  value, 
  setter, 
  promptEn, 
  promptKn, 
  type = "text", 
  list, 
  maxLength, 
  placeholder,
  listeningField,
  handleVoiceInput,
  language
}: any) => (
  <div className="space-y-1.5 relative">
    <label className="text-xs font-bold text-text-light uppercase tracking-wider block">{label}</label>
    <div className="relative">
      <input 
        id={id}
        type={type} 
        list={list}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value} 
        onChange={(e) => setter(e.target.value)} 
        className={`w-full px-4 py-3 pr-12 rounded-2xl border transition-all focus:ring-1 text-sm font-bold bg-slate-50/50 ${
          listeningField === id ? "border-amber-400 ring-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]" : "border-slate-200 focus:border-primary focus:ring-primary"
        }`}
      />
      <button
        type="button"
        onClick={() => handleVoiceInput(id, promptEn, promptKn, setter)}
        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-300 ${
          listeningField === id 
            ? "bg-amber-100 text-amber-600 shadow-inner" 
            : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:scale-105 shadow-sm"
        }`}
        title={language === "kn" ? "ಧ್ವನಿ ಮೂಲಕ ತುಂಬಿ" : "Fill with Voice"}
      >
        {listeningField === id ? <Volume2 className="w-4 h-4 animate-pulse" /> : <Mic className="w-4 h-4" />}
      </button>
    </div>
  </div>
);

export default function SettingsPage() {
  const { 
    language, 
    setLanguage, 
    profile, 
    updateProfile, 
    clearProfile,
    clearReports, 
    clearVoiceQueries 
  } = useAgriMithraStore();
  const t = translations[language];
  const router = useRouter();

  // Core Forms states
  const [name, setName] = useState(profile.name || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [district, setDistrict] = useState(profile.district || "");
  const [age, setAge] = useState(profile.age || "");
  const [gender, setGender] = useState(profile.gender || "");
  const [village, setVillage] = useState(profile.village || "");
  
  // Farm Details
  const [experienceYears, setExperienceYears] = useState(profile.experienceYears || "");
  const [totalAcres, setTotalAcres] = useState(profile.totalAcres || "");
  const [soilType, setSoilType] = useState(profile.soilType || "");
  const [waterSource, setWaterSource] = useState(profile.waterSource || "");
  const [irrigationMethod, setIrrigationMethod] = useState(profile.irrigationMethod || "");
  const [currentCrop, setCurrentCrop] = useState(profile.currentCrop || "");
  const [previousCrop, setPreviousCrop] = useState(profile.previousCrop || "");
  const [farmingType, setFarmingType] = useState(profile.farmingType || "");
  
  // Checkbox Arrays
  const [machineryOwned, setMachineryOwned] = useState<string[]>(profile.machineryOwned || []);
  
  // Financial
  const [annualIncome, setAnnualIncome] = useState(profile.annualIncome || "");
  const [existingLoans, setExistingLoans] = useState(profile.existingLoans || "");
  const [sellingMethod, setSellingMethod] = useState(profile.sellingMethod || "");
  const [marketUsed, setMarketUsed] = useState(profile.marketUsed || "");

  const [customKey, setCustomKey] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  
  // Voice Assistant State
  const [listeningField, setListeningField] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCustomKey(window.localStorage.getItem("AM_GEMINI_KEY") || "");
    }
  }, []);

  const handleVoiceInput = async (fieldId: string, promptEn: string, promptKn: string, setter: (val: string) => void) => {
    if (listeningField) return;

    setListeningField(fieldId); // Show listening visual while speaking to indicate activity
    const prompt = language === "kn" ? promptKn : promptEn;
    
    try {
      await speakText(prompt, language);
      
      if (!SpeechRecognition) {
        alert(language === "kn" ? "ನಿಮ್ಮ ಬ್ರೌಸರ್ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆಯನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ." : "Your browser doesn't support speech recognition.");
        setListeningField(null);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = language === "kn" ? "kn-IN" : "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setter(transcript);
        setListeningField(null);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error", event.error);
        setListeningField(null);
      };

      recognition.onend = () => {
        setListeningField(null);
      };

      recognition.start();
    } catch (e) {
      console.warn(e);
      setListeningField(null);
    }
  };

  const handleCheckboxToggle = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(false);

    updateProfile({
      name, phone, district, age, gender, village,
      experienceYears, totalAcres, soilType, waterSource, irrigationMethod, currentCrop, previousCrop, farmingType,
      machineryOwned,
      annualIncome, existingLoans, sellingMethod, marketUsed
    });

    if (typeof window !== "undefined") {
      if (customKey.trim()) {
        window.localStorage.setItem("AM_GEMINI_KEY", customKey.trim());
      } else {
        window.localStorage.removeItem("AM_GEMINI_KEY");
      }
    }

    setSavedSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleClearScans = () => {
    if (confirm(language === "kn" ? "ಖಚಿತವಾಗಿ ಹಳೆಯ ಬೆಳೆ ವರದಿಗಳನ್ನು ಅಳಿಸಬೇಕೇ?" : "Are you sure you want to delete all saved crop scans?")) {
      clearReports();
      alert(language === "kn" ? "ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ!" : "Crop scans cleared successfully!");
    }
  };

  const handleClearSpeech = () => {
    if (confirm(language === "kn" ? "ಖಚಿತವಾಗಿ ಹಳೆಯ ಧ್ವನಿ ಚಾಟ್ ಹಿಸ್ಟರಿ ಅಳಿಸಬೇಕೇ?" : "Are you sure you want to clear speech logs?")) {
      clearVoiceQueries();
      alert(language === "kn" ? "ಧ್ವನಿ ಹಿಸ್ಟರಿ ಅಳಿಸಲಾಗಿದೆ!" : "Speech logs cleared successfully!");
    }
  };

  const handleSignOut = () => {
    if (confirm(language === "kn" ? "ನೀವು ಖಂಡಿತವಾಗಿ ಲಾಗ್‌ಔಟ್ ಮಾಡಲು ಬಯಸುವಿರಾ?" : "Are you sure you want to log out?")) {
      clearProfile();
      router.push("/");
    }
  };

  const districts = ["Mandya", "Kolar", "Belagavi", "Davanagere", "Chikkamagaluru", "Mysuru", "Hassan"];
  const soilTypes = ["Red Soil", "Black Soil", "Sandy Soil", "Clay Soil", "Laterite Soil"];
  const waterSources = ["Borewell", "Canal", "Rainfed", "River/Stream", "Pond"];
  const farmingTypes = ["Organic", "Chemical", "Mixed"];
  const irrigationMethods = ["Drip", "Sprinkler", "Flood"];
  const genders = ["Male", "Female", "Other"];
  const sellingMethods = ["APMC Mandi", "Direct to Buyer", "Middleman/Broker"];
  const machineryList = ["Tractor", "Rotavator", "Sprayer", "Water Pump", "Harvester"];

  const commonProps = {
    listeningField,
    handleVoiceInput,
    language
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto pb-10">
      
      {/* Datalists for custom autocomplete */}
      <datalist id="districtsList">{districts.map(d => <option key={d} value={d} />)}</datalist>
      <datalist id="soilTypesList">{soilTypes.map(s => <option key={s} value={s} />)}</datalist>
      <datalist id="waterSourcesList">{waterSources.map(s => <option key={s} value={s} />)}</datalist>
      <datalist id="farmingTypesList">{farmingTypes.map(s => <option key={s} value={s} />)}</datalist>
      <datalist id="irrigationMethodsList">{irrigationMethods.map(s => <option key={s} value={s} />)}</datalist>
      <datalist id="gendersList">{genders.map(s => <option key={s} value={s} />)}</datalist>
      <datalist id="sellingMethodsList">{sellingMethods.map(s => <option key={s} value={s} />)}</datalist>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="text-left space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="md:hidden bg-slate-100 hover:bg-slate-200 p-2 rounded-xl text-text">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-poppins font-extrabold text-2xl sm:text-3xl text-text flex items-center gap-2">
              <Settings className="w-7 h-7 text-primary" />
              {t.settings}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-text-light font-medium flex items-center gap-1.5">
            <Mic className="w-4 h-4 text-emerald-500" />
            {language === "kn" ? "ಧ್ವನಿ ಮೂಲಕ ನಿಮ್ಮ ವಿವರಗಳನ್ನು ತುಂಬಿ!" : "Fill your profile easily using your voice!"}
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-primary-dark p-4 rounded-2xl text-sm font-bold flex items-center gap-2 text-left sticky top-4 z-40 shadow-sm">
          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
          {t.changesSaved}
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-8 text-left">
        
        {/* Section 4: App Preferences (Moved to Top) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="font-poppins font-extrabold text-lg text-text flex items-center gap-2 border-b border-slate-100 pb-3">
            <Languages className="w-6 h-6 text-blue-500" />
            {language === "kn" ? "ಆಪ್ ಸೆಟ್ಟಿಂಗ್ಸ್" : "App Preferences"}
          </h3>

          <div className="space-y-4">
            <label className="text-xs font-bold text-text-light uppercase tracking-wider block">{t.preferredLanguage}</label>
            <div className="flex gap-4">
              <button type="button" onClick={() => setLanguage("kn")} className={`flex-1 py-4.5 rounded-2xl font-extrabold text-sm border transition-all ${language === "kn" ? "bg-primary-light text-primary-dark border-primary shadow-sm" : "bg-slate-50 text-text-light border-slate-200 hover:bg-slate-100"}`}>ಕನ್ನಡ (Kannada)</button>
              <button type="button" onClick={() => setLanguage("en")} className={`flex-1 py-4.5 rounded-2xl font-extrabold text-sm border transition-all ${language === "en" ? "bg-primary-light text-primary-dark border-primary shadow-sm" : "bg-slate-50 text-text-light border-slate-200 hover:bg-slate-100"}`}>English</button>
            </div>
          </div>
        </div>

        {/* Section 1: Personal Profile */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <User className="w-32 h-32" />
          </div>
          <h3 className="font-poppins font-extrabold text-lg text-text flex items-center gap-2 border-b border-slate-100 pb-3 relative z-10">
            <User className="w-6 h-6 text-primary" />
            {language === "kn" ? "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ" : "Personal Information"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10">
            <VoiceInput {...commonProps} id="name" label={language === "kn" ? "ಹೆಸರು" : "Full Name"} value={name} setter={setName} promptEn="Please tell me your full name." promptKn="ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ಹೇಳಿ." />
            <VoiceInput {...commonProps} id="phone" label={t.phone} value={phone} setter={setPhone} promptEn="Please tell me your phone number." promptKn="ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಹೇಳಿ." maxLength={10} type="number" />
            <VoiceInput {...commonProps} id="age" label={t.age} value={age} setter={setAge} promptEn="What is your age?" promptKn="ನಿಮ್ಮ ವಯಸ್ಸು ಎಷ್ಟು?" type="number" />
            <VoiceInput {...commonProps} id="gender" label={t.gender} value={gender} setter={setGender} list="gendersList" promptEn="What is your gender?" promptKn="ನಿಮ್ಮ ಲಿಂಗ ಯಾವುದು?" />
            <VoiceInput {...commonProps} id="village" label={t.village} value={village} setter={setVillage} promptEn="Which village are you from?" promptKn="ನೀವು ಯಾವ ಊರಿನವರು?" />
            <VoiceInput {...commonProps} id="district" label={t.location} value={district} setter={setDistrict} list="districtsList" promptEn="Which district are you from?" promptKn="ನಿಮ್ಮ ಜಿಲ್ಲೆ ಯಾವುದು?" />
          </div>
        </div>

        {/* Section 2: Farm Details */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Sprout className="w-32 h-32" />
          </div>
          <h3 className="font-poppins font-extrabold text-lg text-text flex items-center gap-2 border-b border-slate-100 pb-3 relative z-10">
            <Sprout className="w-6 h-6 text-emerald-500" />
            {language === "kn" ? "ಕೃಷಿ ವಿವರಗಳು" : "Farm Details"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10">
            <VoiceInput {...commonProps} id="totalAcres" label={t.totalAcres} value={totalAcres} setter={setTotalAcres} type="number" promptEn="How many acres of land do you have?" promptKn="ನಿಮಗೆ ಎಷ್ಟು ಎಕರೆ ಜಮೀನಿದೆ?" />
            <VoiceInput {...commonProps} id="experienceYears" label={t.experienceYears} value={experienceYears} setter={setExperienceYears} type="number" promptEn="How many years of farming experience do you have?" promptKn="ನಿಮಗೆ ಎಷ್ಟು ವರ್ಷಗಳ ಕೃಷಿ ಅನುಭವವಿದೆ?" />
            <VoiceInput {...commonProps} id="soilType" label={t.soilType} value={soilType} setter={setSoilType} list="soilTypesList" promptEn="What type of soil is in your farm?" promptKn="ನಿಮ್ಮ ಹೊಲದಲ್ಲಿ ಯಾವ ರೀತಿಯ ಮಣ್ಣಿದೆ?" />
            <VoiceInput {...commonProps} id="waterSource" label={t.waterSource} value={waterSource} setter={setWaterSource} list="waterSourcesList" promptEn="What is your main water source?" promptKn="ನಿಮ್ಮ ನೀರಿನ ಮೂಲ ಯಾವುದು?" />
            <VoiceInput {...commonProps} id="irrigationMethod" label={t.irrigationMethod} value={irrigationMethod} setter={setIrrigationMethod} list="irrigationMethodsList" promptEn="What irrigation method do you use?" promptKn="ನೀವು ಯಾವ ನೀರಾವರಿ ಪದ್ಧತಿ ಬಳಸುತ್ತೀರಿ?" />
            <VoiceInput {...commonProps} id="farmingType" label={t.farmingType} value={farmingType} setter={setFarmingType} list="farmingTypesList" promptEn="Do you do organic or chemical farming?" promptKn="ನೀವು ಸಾವಯವ ಅಥವಾ ರಾಸಾಯನಿಕ ಕೃಷಿ ಮಾಡುತ್ತೀರಾ?" />
            <VoiceInput {...commonProps} id="currentCrop" label={t.currentCrop} value={currentCrop} setter={setCurrentCrop} promptEn="What is your current crop?" promptKn="ನೀವು ಪ್ರಸ್ತುತ ಯಾವ ಬೆಳೆ ಬೆಳೆಯುತ್ತಿದ್ದೀರಿ?" />
            <VoiceInput {...commonProps} id="previousCrop" label={t.previousCrop} value={previousCrop} setter={setPreviousCrop} promptEn="What crop did you grow previously?" promptKn="ಇದಕ್ಕೂ ಮೊದಲು ಯಾವ ಬೆಳೆ ಬೆಳೆದಿದ್ದೀರಿ?" />
          </div>
          
          <div className="space-y-3 pt-3 relative z-10">
            <label className="text-xs font-bold text-text-light uppercase tracking-wider block flex items-center gap-2">
              <Tractor className="w-4 h-4 text-emerald-500" />
              {t.machineryOwned}
            </label>
            <div className="flex flex-wrap gap-2">
              {machineryList.map(m => (
                <button
                  type="button"
                  key={m}
                  onClick={() => handleCheckboxToggle(machineryOwned, setMachineryOwned, m)}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
                    machineryOwned.includes(m) ? "bg-primary text-white border-primary shadow-md shadow-emerald-200" : "bg-slate-50 text-text border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Financial & Market Details */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Banknote className="w-32 h-32" />
          </div>
          <h3 className="font-poppins font-extrabold text-lg text-text flex items-center gap-2 border-b border-slate-100 pb-3 relative z-10">
            <Banknote className="w-6 h-6 text-amber-500" />
            {language === "kn" ? "ಹಣಕಾಸು ಮತ್ತು ಮಾರುಕಟ್ಟೆ" : "Financial & Market"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10">
            <VoiceInput {...commonProps} id="annualIncome" label={t.annualIncome} value={annualIncome} setter={setAnnualIncome} type="number" promptEn="What is your approximate annual income?" promptKn="ನಿಮ್ಮ ಅಂದಾಜು ವಾರ್ಷಿಕ ಆದಾಯ ಎಷ್ಟು?" />
            <VoiceInput {...commonProps} id="existingLoans" label={t.existingLoans} value={existingLoans} setter={setExistingLoans} type="number" promptEn="What is your existing loan amount?" promptKn="ನಿಮ್ಮ ಹಾಲಿ ಸಾಲದ ಮೊತ್ತ ಎಷ್ಟು?" />
            <VoiceInput {...commonProps} id="sellingMethod" label={t.sellingMethod} value={sellingMethod} setter={setSellingMethod} list="sellingMethodsList" promptEn="How do you sell your crops? Direct or APMC?" promptKn="ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಹೇಗೆ ಮಾರಾಟ ಮಾಡುತ್ತೀರಿ? ನೇರವಾಗಿ ಅಥವಾ ಎಪಿಎಂಸಿ ಮೂಲಕವೇ?" />
            <VoiceInput {...commonProps} id="marketUsed" label={t.marketUsed} value={marketUsed} setter={setMarketUsed} promptEn="Which specific market do you sell at?" promptKn="ನೀವು ಯಾವ ನಿರ್ದಿಷ್ಟ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಮಾರಾಟ ಮಾಡುತ್ತೀರಿ?" />
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 z-40 space-y-4">
          <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold py-4.5 rounded-2xl shadow-xl transition-all duration-300 text-base shadow-emerald-200">
            {t.saveChanges}
          </button>
          
          <button 
            type="button" 
            onClick={handleSignOut}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-extrabold py-4 rounded-2xl shadow-sm transition-all duration-300 text-sm flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            {language === "kn" ? "ಲಾಗ್‌ಔಟ್ ಮಾಡಿ" : "Sign Out"}
          </button>
        </div>

      </form>
    </div>
  );
}
