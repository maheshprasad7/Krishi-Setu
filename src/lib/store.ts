import { create } from "zustand";
import { Language } from "./translations";

export interface ScanReport {
  id: string;
  date: string;
  imageName: string;
  imageUrl: string;
  status: "healthy" | "diseased";
  diseaseName: { en: string; kn: string };
  confidence: number;
  symptoms: { en: string; kn: string };
  prevention: { en: string; kn: string };
  remedy: { en: string; kn: string };
  chemicals?: { en: string; kn: string };
  severity?: "Low" | "Medium" | "High";
}

export interface VoiceQuery {
  id: string;
  date: string;
  query: string;
  reply: string;
  lang: Language;
}

export interface RecyclerListing {
  id: string | number;
  itemEn: string;
  itemKn: string;
  quantity: string;
  price: string;
  distance: string;
  farmer: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  district: string;
  isLoggedIn: boolean;
  // Expanded Ecosystem Fields
  age?: string;
  gender?: string;
  village?: string;
  state?: string;
  experienceYears?: string;
  totalAcres?: string;
  soilType?: string;
  waterSource?: string;
  irrigationMethod?: string;
  currentCrop?: string;
  previousCrop?: string;
  fertilizersUsed?: string[];
  pesticidesUsed?: string[];
  machineryOwned?: string[];
  annualIncome?: string;
  existingLoans?: string;
  sellingMethod?: string;
  marketUsed?: string;
  farmingType?: string; // Organic or Chemical
}

interface AgriMithraStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  profile: UserProfile;
  profileCompletion: number;
  updateProfile: (profile: Partial<UserProfile>) => void;
  clearProfile: () => void;
  reports: ScanReport[];
  addReport: (report: Omit<ScanReport, "id" | "date">) => void;
  deleteReport: (id: string) => void;
  clearReports: () => void;
  voiceQueries: VoiceQuery[];
  addVoiceQuery: (query: string, reply: string, lang: Language) => void;
  clearVoiceQueries: () => void;
  savedSchemes: string[];
  toggleSavedScheme: (schemeId: string) => void;
  bookmarkedVideos: string[];
  toggleBookmarkedVideo: (videoId: string) => void;
  recyclerListings: RecyclerListing[];
  addRecyclerListing: (listing: Omit<RecyclerListing, "id" | "distance" | "farmer">) => void;
}

// Helper to calculate profile completion
const calculateProfileCompletion = (profile: UserProfile): number => {
  const fieldsToCheck: (keyof UserProfile)[] = [
    'name', 'phone', 'district', 'age', 'village', 'experienceYears', 
    'totalAcres', 'soilType', 'irrigationMethod', 'currentCrop', 
    'farmingType'
  ];
  let filled = 0;
  fieldsToCheck.forEach(field => {
    if (profile[field] && (Array.isArray(profile[field]) ? (profile[field] as any[]).length > 0 : true)) {
      filled++;
    }
  });
  return Math.round((filled / fieldsToCheck.length) * 100);
};

const defaultRecyclerListings: RecyclerListing[] = [
  { id: 1, itemEn: "Cow dung", itemKn: "ಸಗಣಿ", quantity: "2 Tractors", price: "₹1,500/Tractor", distance: "2 km away", farmer: "Raju Gowda" },
  { id: 2, itemEn: "Cocopeat", itemKn: "ತೆಂಗಿನ ನಾರು (ಕೊಕೊಪೀಟ್)", quantity: "500 Kg", price: "Free Pickup", distance: "4 km away", farmer: "Suresh" },
  { id: 3, itemEn: "Paddy straw", itemKn: "ಭತ್ತದ ಹುಲ್ಲು", quantity: "1 Ton", price: "₹800", distance: "5 km away", farmer: "Basavaraj" },
  { id: 4, itemEn: "Arecanut sheath", itemKn: "ಅಡಿಕೆ ಹಾಳೆ", quantity: "200 Pieces", price: "₹2/Piece", distance: "8 km away", farmer: "Kumar" }
];

// Initial mock data for a rich, wow-effect demonstration on first launch!
const defaultReports: ScanReport[] = [
  {
    id: "rep-1",
    date: "2026-05-22 09:30 AM",
    imageName: "tomato_leaf.jpg",
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=500&auto=format&fit=crop&q=60",
    diseaseName: {
      en: "Early Blight (Fungal Infection)",
      kn: "ಮುಂಚಿನ ಕರಕಲು ರೋಗ (ಶಿಲೀಂಧ್ರ ಬಾಧೆ)"
    },
    status: "diseased",
    confidence: 94,
    symptoms: {
      en: "Dark brown spots with concentric rings resembling a target on older leaves first. Leaves yellow and fall off.",
      kn: "ಹಳೆಯ ಎಲೆಗಳ ಮೇಲೆ ವೃತ್ತಾಕಾರದ ಕಡು ಕಂದು ಬಣ್ಣದ ಚುಕ್ಕೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ. ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಉದುರುತ್ತವೆ."
    },
    prevention: {
      en: "Keep crops rotated. Water the soil directly instead of overhead spraying to avoid wet leaves.",
      kn: "ಬೆಳೆ ಬದಲಾವಣೆ ಪದ್ಧತಿ ಅನುಸರಿಸಿ. ಎಲೆಗಳ ಮೇಲೆ ನೀರು ಸಿಂಪಡಿಸುವ ಬದಲು ನೇರವಾಗಿ ಬುಡಕ್ಕೆ ನೀರು ಹಾಯಿಸಿ."
    },
    remedy: {
      en: "Apply Copper Oxychloride (3g/liter) or spray natural neem oil (5ml/liter of water) every 10 days.",
      kn: "ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ (೩ ಗ್ರಾಂ/ಲೀಟರ್) ಸಿಂಪಡಿಸಿ ಅಥವಾ ಜೈವಿಕ ಬೇವಿನ ಎಣ್ಣೆ (೫ ಮಿಲಿ/ಲೀಟರ್ ನೀರು) ಪ್ರತಿ ೧೦ ದಿನಕ್ಕೊಮ್ಮೆ ಸಿಂಪಡಿಸಿ."
    }
  },
  {
    id: "rep-2",
    date: "2026-05-21 04:15 PM",
    imageName: "maize_stem.jpg",
    imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=500&auto=format&fit=crop&q=60",
    diseaseName: {
      en: "Fall Armyworm (Pest Attack)",
      kn: "ಕತ್ತರಿ ಹುಳು ಬಾಧೆ (ಕೀಟ ಬಾಧೆ)"
    },
    status: "diseased",
    confidence: 89,
    symptoms: {
      en: "Large ragged holes in leaves, whorl damage, and greenish-brown frass (poop) visible on stem joints.",
      kn: "ಎಲೆಗಳ ಮೇಲೆ ದೊಡ್ಡದಾದ ಹರಿದ ರಂಧ್ರಗಳು ಮತ್ತು ಸುಳಿಯಲ್ಲಿ ಕತ್ತರಿಸಿದ ಗುರುತುಗಳು ಹಾಗೂ ಮಣ್ಣಿನ ಬಣ್ಣದ ಹಿಕ್ಕೆಗಳು ಕಾಣುತ್ತವೆ."
    },
    prevention: {
      en: "Sow early in the season. Plant companion crops like Napier grass to attract beneficial predators.",
      kn: "ಮುಂಗಾರು ಹಂಗಾಮಿನ ಪ್ರಾರಂಭದಲ್ಲೇ ಬಿತ್ತನೆ ಮಾಡಿ. ನೇಪಿಯರ್ ಹುಲ್ಲಿನಂತಹ ಆಕರ್ಷಕ ಬೆಳೆಗಳನ್ನು ಸುತ್ತಲೂ ನೆಡಿರಿ."
    },
    remedy: {
      en: "Spray Emamectin Benzoate (0.4g/liter) or spray homemade garlic-chilli ginger paste mixed with soapy water.",
      kn: "ಎಮಾಮೆಕ್ಟಿನ್ ಬೆಂಜೊಯೇಟ್ (೦.೪ ಗ್ರಾಂ/ಲೀಟರ್) ಸಿಂಪಡಿಸಿ ಅಥವಾ ಮನೆಯಲ್ಲೇ ತಯಾರಿಸಿದ ಬೆಳ್ಳುಳ್ಳಿ-ಮೆಣಸಿನಕಾಯಿ ಕಷಾಯ ಸಿಂಪಡಿಸಿ."
    }
  }
];

const defaultVoiceQueries: VoiceQuery[] = [
  {
    id: "vq-1",
    date: "2026-05-22 10:45 AM",
    query: "Which fertilizer is best for Ragi?",
    reply: "For Ragi (Finger Millet), it is recommended to apply 10 tons of Farm Yard Manure (FYM) per hectare. Additionally, use NPK chemical fertilizer in a ratio of 50:40:40 kg per hectare for rainfed crops, and 100:50:50 kg for irrigated crops for high yield.",
    lang: "en"
  },
  {
    id: "vq-2",
    date: "2026-05-22 10:46 AM",
    query: "ರಾಗಿ ಬೆಳೆಗೆ ಯಾವ ಗೊಬ್ಬರ ಹಾಕಬೇಕು?",
    reply: "ರಾಗಿ ಬೆಳೆಗೆ ಹೆಕ್ಟೇರ್‌ಗೆ ೧೦ ಟನ್ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರವನ್ನು ಮಣ್ಣಿನಲ್ಲಿ ಬೆರೆಸಬೇಕು. ರಾಸಾಯನಿಕ ಗೊಬ್ಬರವಾಗಿ ಹೆಕ್ಟೇರ್‌ಗೆ ೫೦ ಕಿಲೋ ಸಾರಜನಕ, ೪೦ ಕಿಲೋ ರಂಜಕ ಮತ್ತು ೪೦ ಕಿಲೋ ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರವನ್ನು ಮಳೆಯಾಶ್ರಿತ ಬೆಳೆಗೆ ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ನೀರಾವರಿ ಬೆಳೆಗೆ ಪ್ರಮಾಣವನ್ನು ದುಪ್ಪಟ್ಟು ಮಾಡಬಹುದು.",
    lang: "kn"
  }
];

const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

const setLocalStorage = <T>(key: string, value: T) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Local storage error:", error);
  }
};

export const useAgriMithraStore = create<AgriMithraStore>((set) => ({
  language: getLocalStorage<Language>("am_language", "kn"), // Default to Kannada for rural reach!
  setLanguage: (lang) => {
    setLocalStorage("am_language", lang);
    set({ language: lang });
  },
  profile: getLocalStorage<UserProfile>("am_profile", {
    name: "Basavaraja Gowda",
    phone: "9876543210",
    email: "basavaraj.farmers@gmail.com",
    district: "Mandya",
    isLoggedIn: true,
    age: "45",
    gender: "Male",
    village: "Maddur",
    state: "Karnataka",
    experienceYears: "20",
    totalAcres: "5",
    soilType: "Red Soil",
    waterSource: "Borewell",
    irrigationMethod: "Drip Irrigation",
    currentCrop: "Ragi",
    farmingType: "Organic"
  }),
  profileCompletion: 0, // Will be computed on update
  updateProfile: (updates) =>
    set((state) => {
      const newProfile = { ...state.profile, ...updates };
      setLocalStorage("am_profile", newProfile);
      return { profile: newProfile, profileCompletion: calculateProfileCompletion(newProfile) };
    }),
  clearProfile: () =>
    set(() => {
      setLocalStorage("am_profile", {});
      return { profile: {} as UserProfile, profileCompletion: 0 };
    }),
  reports: getLocalStorage<ScanReport[]>("am_reports", defaultReports),
  addReport: (report) =>
    set((state) => {
      const newReport: ScanReport = {
        ...report,
        id: `rep-${Date.now()}`,
        date: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        })
      };
      const newReports = [newReport, ...state.reports];
      setLocalStorage("am_reports", newReports);
      return { reports: newReports };
    }),
  deleteReport: (id) =>
    set((state) => {
      const newReports = state.reports.filter((report) => report.id !== id);
      setLocalStorage("am_reports", newReports);
      return { reports: newReports };
    }),
  clearReports: () => {
    setLocalStorage("am_reports", []);
    set({ reports: [] });
  },
  voiceQueries: getLocalStorage<VoiceQuery[]>("am_voice_queries", defaultVoiceQueries),
  addVoiceQuery: (query, reply, lang) =>
    set((state) => {
      const newQuery: VoiceQuery = {
        id: `vq-${Date.now()}`,
        date: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        }),
        query,
        reply,
        lang
      };
      const newQueries = [newQuery, ...state.voiceQueries];
      setLocalStorage("am_voice_queries", newQueries);
      return { voiceQueries: newQueries };
    }),
  clearVoiceQueries: () => {
    setLocalStorage("am_voice_queries", []);
    set({ voiceQueries: [] });
  },
  savedSchemes: getLocalStorage<string[]>("am_saved_schemes", []),
  toggleSavedScheme: (schemeId) => set((state) => {
    const isSaved = state.savedSchemes.includes(schemeId);
    const newSaved = isSaved 
      ? state.savedSchemes.filter(id => id !== schemeId)
      : [...state.savedSchemes, schemeId];
    setLocalStorage("am_saved_schemes", newSaved);
    return { savedSchemes: newSaved };
  }),
  bookmarkedVideos: getLocalStorage<string[]>("am_videos", []),
  toggleBookmarkedVideo: (videoId) =>
    set((state) => {
      const isBookmarked = state.bookmarkedVideos.includes(videoId);
      const newBookmarked = isBookmarked 
        ? state.bookmarkedVideos.filter(id => id !== videoId)
        : [...state.bookmarkedVideos, videoId];
      setLocalStorage("am_videos", newBookmarked);
      return { bookmarkedVideos: newBookmarked };
    }),
  recyclerListings: getLocalStorage<RecyclerListing[]>("am_recycler", defaultRecyclerListings),
  addRecyclerListing: (listing) =>
    set((state) => {
      const newListing: RecyclerListing = {
        ...listing,
        id: `rec-${Date.now()}`,
        distance: "0 km away (You)",
        farmer: state.profile.name || "You"
      };
      const newListings = [newListing, ...state.recyclerListings];
      setLocalStorage("am_recycler", newListings);
      return { recyclerListings: newListings };
    })
}));

// Initialize computed profile completion after store creation
useAgriMithraStore.setState((state) => ({
  profileCompletion: calculateProfileCompletion(state.profile)
}));
