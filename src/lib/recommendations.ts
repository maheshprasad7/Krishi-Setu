import { UserProfile } from "./store";

export interface VideoRecommendation {
  id: string;
  title: { en: string; kn: string };
  category: "treatment" | "organic" | "tech" | "general";
  thumbnail: string;
  videoId: string; // YouTube ID
}

export interface GovtScheme {
  id: string;
  title: { en: string; kn: string };
  description: { en: string; kn: string };
  matchReason: { en: string; kn: string };
  url: string;
}

export interface EquipmentSuggestion {
  id: string;
  name: { en: string; kn: string };
  type: string;
  estimatedPrice: string;
  matchReason: { en: string; kn: string };
  imageUrl: string;
  providerUrl: string;
}

export interface FarmingTip {
  id: string;
  title: { en: string; kn: string };
  content: { en: string; kn: string };
  type: "warning" | "success" | "info";
}

// -----------------------------------------
// Mock Data Hub
// -----------------------------------------

const ALL_VIDEOS: VideoRecommendation[] = [
  {
    id: "v1",
    title: { en: "How to treat Early Blight in Tomatoes naturally", kn: "ಟೊಮೆಟೊ ಬೆಳೆಯಲ್ಲಿ ಮುಂಚಿನ ಕರಕಲು ರೋಗಕ್ಕೆ ನೈಸರ್ಗಿಕ ಚಿಕಿತ್ಸೆ" },
    category: "treatment",
    thumbnail: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=500&auto=format&fit=crop&q=60",
    videoId: "mock_tomato_blight",
  },
  {
    id: "v2",
    title: { en: "Making Jeevamrutha - Organic Fertilizer at Home", kn: "ಮನೆಯಲ್ಲೇ ಜೀವಾಮೃತ (ಸಾವಯವ ಗೊಬ್ಬರ) ತಯಾರಿಸುವ ವಿಧಾನ" },
    category: "organic",
    thumbnail: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=500&auto=format&fit=crop&q=60",
    videoId: "mock_jeevamrutha",
  },
  {
    id: "v3",
    title: { en: "Drip Irrigation Setup for Beginners", kn: "ಹನಿ ನೀರಾವರಿ ಅಳವಡಿಕೆ - ಹೊಸಬರಿಗೆ ಮಾರ್ಗದರ್ಶನ" },
    category: "tech",
    thumbnail: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=500&auto=format&fit=crop&q=60",
    videoId: "mock_drip_irrigation",
  },
  {
    id: "v4",
    title: { en: "Ragi Cultivation Best Practices for High Yield", kn: "ರಾಗಿ ಬೆಳೆಯಲ್ಲಿ ಹೆಚ್ಚು ಇಳುವರಿ ಪಡೆಯಲು ಉತ್ತಮ ಕ್ರಮಗಳು" },
    category: "general",
    thumbnail: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&auto=format&fit=crop&q=60",
    videoId: "mock_ragi_yield",
  }
];

const ALL_SCHEMES: GovtScheme[] = [
  {
    id: "s1",
    title: { en: "PM-KISAN Samman Nidhi", kn: "ಪಿಎಂ-ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ" },
    description: { en: "Provides ₹6,000 per year in three equal installments to small and marginal farmer families.", kn: "ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತ ಕುಟುಂಬಗಳಿಗೆ ವರ್ಷಕ್ಕೆ ₹೬,೦೦೦ ಮೂರು ಸಮಾನ ಕಂತುಗಳಲ್ಲಿ ನೀಡಲಾಗುತ್ತದೆ." },
    matchReason: { en: "Matches your profile as a registered farmer.", kn: "ನೋಂದಾಯಿತ ರೈತರಾಗಿರುವುದರಿಂದ ನಿಮಗೆ ಅನ್ವಯಿಸುತ್ತದೆ." },
    url: "https://pmkisan.gov.in/",
  },
  {
    id: "s2",
    title: { en: "Krishi Bhagya Scheme (Karnataka)", kn: "ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ (ಕರ್ನಾಟಕ)" },
    description: { en: "Provides up to 90% subsidy for building farm ponds to improve rainwater harvesting.", kn: "ಮಳೆನೀರು ಕೊಯ್ಲು ಸುಧಾರಿಸಲು ಕೃಷಿ ಹೊಂಡ ನಿರ್ಮಿಸಲು ಶೇ.೯೦ ರಷ್ಟು ಸಬ್ಸಿಡಿ ನೀಡಲಾಗುತ್ತದೆ." },
    matchReason: { en: "Highly recommended since you lack modern irrigation methods.", kn: "ನಿಮ್ಮ ಬಳಿ ಆಧುನಿಕ ನೀರಾವರಿ ವ್ಯವಸ್ಥೆ ಇಲ್ಲದಿರುವುದರಿಂದ ಇದು ನಿಮಗೆ ಹೆಚ್ಚು ಸೂಕ್ತವಾಗಿದೆ." },
    url: "https://raitamitra.karnataka.gov.in/",
  },
  {
    id: "s3",
    title: { en: "Pradhan Mantri Fasal Bima Yojana", kn: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ (ಬೆಳೆ ವಿಮೆ)" },
    description: { en: "Crop insurance scheme providing financial support in the event of crop failure due to natural calamities.", kn: "ನೈಸರ್ಗಿಕ ವಿಕೋಪಗಳಿಂದ ಬೆಳೆ ಹಾನಿಯಾದರೆ ಆರ್ಥಿಕ ನೆರವು ನೀಡುವ ಬೆಳೆ ವಿಮೆ ಯೋಜನೆ." },
    matchReason: { en: "Protects your current crop investment.", kn: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಬೆಳೆಯ ಹೂಡಿಕೆಯನ್ನು ರಕ್ಷಿಸುತ್ತದೆ." },
    url: "https://pmfby.gov.in/",
  }
];

const ALL_EQUIPMENT: EquipmentSuggestion[] = [
  {
    id: "e1",
    name: { en: "Mahindra 275 DI TU Tractor", kn: "ಮಹೀಂದ್ರ 275 DI TU ಟ್ರ್ಯಾಕ್ಟರ್" },
    type: "Tractor",
    estimatedPrice: "₹800 - ₹1200 / day",
    matchReason: { en: "Ideal for your 5 acre land size.", kn: "ನಿಮ್ಮ ೫ ಎಕರೆ ಜಮೀನಿಗೆ ಹೇಳಿ ಮಾಡಿಸಿದಂತಿದೆ." },
    imageUrl: "https://images.unsplash.com/photo-1592838464221-a50d2208d0e3?w=500&auto=format&fit=crop&q=60",
    providerUrl: "https://www.jfarmservices.in/",
  },
  {
    id: "e2",
    name: { en: "Agriculture Spraying Drone", kn: "ಕೃಷಿ ಸಿಂಪರಣಾ ಡ್ರೋನ್" },
    type: "Drone",
    estimatedPrice: "₹500 / acre",
    matchReason: { en: "Fast pesticide spraying for large crop areas.", kn: "ದೊಡ್ಡ ಜಮೀನುಗಳಿಗೆ ವೇಗವಾಗಿ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಲು ಸೂಕ್ತ." },
    imageUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&auto=format&fit=crop&q=60",
    providerUrl: "https://em3agri.com/",
  },
  {
    id: "e3",
    name: { en: "Heavy Duty Rotavator", kn: "ಹೆವಿ ಡ್ಯೂಟಿ ರೋಟಾವೇಟರ್" },
    type: "Implement",
    estimatedPrice: "₹400 / hour",
    matchReason: { en: "Best for preparing soil before your next crop cycle.", kn: "ಮುಂದಿನ ಬೆಳೆಗಾಗಿ ಮಣ್ಣನ್ನು ಸಿದ್ಧಪಡಿಸಲು ಅತ್ಯುತ್ತಮ." },
    imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&auto=format&fit=crop&q=60",
    providerUrl: "https://agribazaar.com/",
  }
];

// -----------------------------------------
// Recommendation Engine Logic
// -----------------------------------------

export const getRecommendedVideos = (profile: UserProfile): VideoRecommendation[] => {
  let recommendations = [...ALL_VIDEOS];
  
  // Logic: If farming type is organic, bubble up organic videos
  if (profile.farmingType?.toLowerCase() === "organic") {
    recommendations.sort((a, b) => a.category === "organic" ? -1 : 1);
  }

  // Logic: If current crop matches a video, bubble it up
  if (profile.currentCrop) {
    const crop = profile.currentCrop.toLowerCase();
    const matches = recommendations.filter(v => v.title.en.toLowerCase().includes(crop));
    const nonMatches = recommendations.filter(v => !v.title.en.toLowerCase().includes(crop));
    recommendations = [...matches, ...nonMatches];
  }

  return recommendations;
};

export const getEligibleSchemes = (profile: UserProfile): GovtScheme[] => {
  // Mock logic: everyone gets PM-KISAN.
  const schemes = [ALL_SCHEMES[0], ALL_SCHEMES[2]];
  
  // Logic: If they don't have Drip Irrigation, suggest Krishi Bhagya
  if (profile.irrigationMethod && !profile.irrigationMethod.toLowerCase().includes("drip")) {
    schemes.push(ALL_SCHEMES[1]);
  }
  
  return schemes;
};

export const getEquipmentSuggestions = (profile: UserProfile): EquipmentSuggestion[] => {
  // If land is > 2 acres, suggest tractor
  const acres = parseInt(profile.totalAcres || "0");
  if (acres > 2) {
    return ALL_EQUIPMENT; // Return all
  }
  
  // Otherwise, filter out heavy machinery
  return ALL_EQUIPMENT.filter(e => e.type !== "Tractor");
};

export const getFarmingTips = (profile: UserProfile): FarmingTip[] => {
  const tips: FarmingTip[] = [];

  if (profile.farmingType === "Organic") {
    tips.push({
      id: "t1",
      title: { en: "Organic Farming Bonus", kn: "ಸಾವಯವ ಕೃಷಿ ಲಾಭ" },
      content: { en: "Your organic produce can sell at a 20% premium in certified markets.", kn: "ನಿಮ್ಮ ಸಾವಯವ ಬೆಳೆಯನ್ನು ಪ್ರಮಾಣೀಕೃತ ಮಾರುಕಟ್ಟೆಗಳಲ್ಲಿ ಶೇ.೨೦ ರಷ್ಟು ಹೆಚ್ಚಿನ ಬೆಲೆಗೆ ಮಾರಾಟ ಮಾಡಬಹುದು." },
      type: "success"
    });
  }

  if (profile.soilType?.toLowerCase().includes("red")) {
    tips.push({
      id: "t2",
      title: { en: "Soil Care Alert", kn: "ಮಣ್ಣಿನ ಪೋಷಣೆ ಎಚ್ಚರಿಕೆ" },
      content: { en: "Red soil requires frequent watering. Consider installing a drip irrigation system.", kn: "ಕೆಂಪು ಮಣ್ಣಿಗೆ ಆಗಾಗ್ಗೆ ನೀರು ಬೇಕಾಗುತ್ತದೆ. ಹನಿ ನೀರಾವರಿ ಅಳವಡಿಸುವುದು ಸೂಕ್ತ." },
      type: "info"
    });
  }

  if (tips.length === 0) {
    tips.push({
      id: "t0",
      title: { en: "Seasonal Advisory", kn: "ಋತುಮಾನದ ಸಲಹೆ" },
      content: { en: "Ensure your fields are cleared of weeds before the upcoming monsoon.", kn: "ಮುಂಬರುವ ಮುಂಗಾರಿಗೂ ಮುನ್ನ ನಿಮ್ಮ ಜಮೀನಿನಲ್ಲಿ ಕಳೆ ತೆಗೆದು ಸ್ವಚ್ಛಗೊಳಿಸಿ." },
      type: "warning"
    });
  }

  return tips;
};
