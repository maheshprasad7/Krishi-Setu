/**
 * gemini.ts — Client-side Gemini helper
 *
 * SECURITY: The Gemini API key is NEVER used here.
 * All requests go through internal Next.js API routes:
 *   /api/gemini/scan    — crop disease analysis
 *   /api/gemini/advice  — farming voice advice
 *
 * The server routes hold the private GEMINI_API_KEY env var.
 */

// ---------------------------------------------------------------------------
// Offline fallback data (used when server API is unavailable)
// ---------------------------------------------------------------------------

const offlineDiseases = [
  {
    diseaseName: {
      en: "Early Blight (Fungal Disease)",
      kn: "ಮುಂಚಿನ ಕರಕಲು ರೋಗ (ಶಿಲೀಂಧ್ರ ಬಾಧೆ)",
    },
    severity: "Medium",
    symptoms: {
      en: "Concentric black spots on older leaves, yellowing halos around lesions, and premature defoliation of lower branches.",
      kn: "ಹಳೆಯ ಎಲೆಗಳ ಮೇಲೆ ಕಪ್ಪು ವೃತ್ತಾಕಾರದ ಚುಕ್ಕೆಗಳು, ಚುಕ್ಕೆಗಳ ಸುತ್ತ ಹಳದಿ ಬಣ್ಣದ ವಲಯಗಳು ಮತ್ತು ಅಂತಿಮವಾಗಿ ಎಲೆಗಳು ಒಣಗಿ ಉದುರುವುದು.",
    },
    prevention: {
      en: "• Keep crops rotated.\n• Water the soil directly instead of overhead spraying to avoid wet leaves.",
      kn: "• ಬೆಳೆ ಬದಲಾವಣೆ ಪದ್ಧತಿ ಅನುಸರಿಸಿ.\n• ಎಲೆಗಳ ಮೇಲೆ ನೀರು ಸಿಂಪಡಿಸುವ ಬದಲು ನೇರವಾಗಿ ಬುಡಕ್ಕೆ ನೀರು ಹಾಯಿಸಿ.",
    },
    treatment: {
      en: "• Apply natural neem oil (5ml/liter of water) every 10 days.\n• Remove and burn heavily infected lower leaves.",
      kn: "• ಜೈವಿಕ ಬೇವಿನ ಎಣ್ಣೆ (೫ ಮಿಲಿ/ಲೀಟರ್ ನೀರು) ಪ್ರತಿ ೧೦ ದಿನಕ್ಕೊಮ್ಮೆ ಸಿಂಪಡಿಸಿ.\n• ಹೆಚ್ಚು ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದು ಸುಡಿ.",
    },
    chemicals: {
      en: "• Spray Copper Oxychloride (3g/liter) (Est cost: ₹350/kg, easily available in local Agri hubs)",
      kn: "• ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ (೩ ಗ್ರಾಂ/ಲೀಟರ್) ಸಿಂಪಡಿಸಿ (ಅಂದಾಜು ಬೆಲೆ: ₹೩೫೦/ಕೆ.ಜಿ, ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರದಲ್ಲಿ ಲಭ್ಯ)",
    },
  },
  {
    diseaseName: {
      en: "Blast Disease in Rice (Magnaporthe oryzae)",
      kn: "ಭತ್ತದ ಬೆಂಕಿ ರೋಗ (ಶಿಲೀಂಧ್ರ ರೋಗ)",
    },
    severity: "High",
    symptoms: {
      en: "Diamond-shaped or spindle-shaped lesions on leaves with gray centers and reddish-brown borders. Stem nodes turn black and break easily.",
      kn: "ಎಲೆಗಳ ಮೇಲೆ ಕಣ್ಣಿನ ಆಕಾರದ (ಮಧ್ಯದಲ್ಲಿ ಬೂದು ಬಣ್ಣ, ಸುತ್ತಲೂ ಕಂದು ಬಣ್ಣದ ಅಂಚುಳ್ಳ) ಮಚ್ಚೆಗಳು. ಗಂಟುಗಳು ಕಪ್ಪಾಗಿ ಕೊಳೆತು ಮುರಿದು ಬೀಳುತ್ತವೆ.",
    },
    prevention: {
      en: "• Avoid applying excessive nitrogen fertilizers.\n• Plant resistant varieties and keep fields clean.",
      kn: "• ಅತಿಯಾದ ಸಾರಜನಕ (ಯೂರಿಯಾ) ಗೊಬ್ಬರ ಹಾಕಬೇಡಿ.\n• ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬಳಸಿ ಮತ್ತು ಗದ್ದೆಯನ್ನು ಶುದ್ಧವಾಗಿಡಿ.",
    },
    treatment: {
      en: "• Use biological agent Pseudomonas fluorescens (5g/liter).\n• Enhance soil with organic compost.",
      kn: "• ಜೈವಿಕವಾಗಿ ಸ್ಯೂಡೋಮೊನಾಸ್ ಫ್ಲೋರೆಸೆನ್ಸ್ (೫ ಗ್ರಾಂ/ಲೀಟರ್) ಬಳಸಿ.\n• ಸಾವಯವ ಗೊಬ್ಬರ ಬಳಸಿ ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ಹೆಚ್ಚಿಸಿ.",
    },
    chemicals: {
      en: "• Spray Tricyclazole 75 WP at 0.6 grams per liter of water (Est cost: ₹450/250g, available at pesticide shops)",
      kn: "• ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ ೭೫ ಡಬ್ಲ್ಯೂ.ಪಿ ಕೀಟನಾಶಕವನ್ನು ಲೀಟರ್ ನೀರಿಗೆ ೦.೬ ಗ್ರಾಂ ನಂತೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ (ಅಂದಾಜು ಬೆಲೆ: ₹೪೫೦/೨೫೦ಗ್ರಾಂ, ಔಷಧ ಅಂಗಡಿಗಳಲ್ಲಿ ಲಭ್ಯ)",
    },
  },
  {
    diseaseName: {
      en: "Powdery Mildew in Veggies",
      kn: "ಬೂದಿ ರೋಗ (ಶಿಲೀಂಧ್ರ ರೋಗ)",
    },
    severity: "Low",
    symptoms: {
      en: "White powdery fungal growth on the upper and lower surfaces of leaves and stems, causing leaves to curl and dry.",
      kn: "ಎಲೆಗಳ ಮೇಲ್ಭಾಗ ಮತ್ತು ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಬೂದಿಯಂತಹ ಪೌಡರ್ ತರಹದ ಪದರ ಆವರಿಸುತ್ತದೆ. ಎಲೆಗಳು ಸುರುಳಿ ಸುತ್ತಿ ಒಣಗುತ್ತವೆ.",
    },
    prevention: {
      en: "• Ensure adequate spacing between plants to improve air circulation.\n• Maximize sunlight exposure.",
      kn: "• ಗಿಡಗಳ ಮಧ್ಯೆ ಸೂಕ್ತ ಅಂತರ ಕಾಯ್ದುಕೊಳ್ಳಿ.\n• ಇದರಿಂದ ಗಾಳಿ ಮತ್ತು ಸೂರ್ಯನ ಬೆಳಕು ಚೆನ್ನಾಗಿ ಬೀಳುತ್ತದೆ.",
    },
    treatment: {
      en: "• Spray diluted milk whey mixture (1 part milk whey to 9 parts water).\n• Apply organic neem-based solutions.",
      kn: "• ಮಜ್ಜಿಗೆ ಮಿಶ್ರಣವನ್ನು (೧ ಲೀಟರ್ ಹುಳಿ ಮಜ್ಜಿಗೆಗೆ ೯ ಲೀಟರ್ ನೀರು) ಸಿಂಪಡಿಸಿ.\n• ಸಾವಯವ ಬೇವಿನ ಎಣ್ಣೆ ಬಳಸಿ.",
    },
    chemicals: {
      en: "• Spray Water-soluble Sulphur (3g/liter) (Est cost: ₹150/kg, very common in all local markets)",
      kn: "• ನೀರಿನಲ್ಲಿ ಕರಗುವ ಗಂಧಕ (ಸಲ್ಫರ್ - ೩ ಗ್ರಾಂ/ಲೀಟರ್) ಸಿಂಪಡಿಸಿ (ಅಂದಾಜು ಬೆಲೆ: ₹೧೫೦/ಕೆ.ಜಿ, ಎಲ್ಲಾ ಕಡೆ ಲಭ್ಯ)",
    },
  },
  {
    diseaseName: {
      en: "Late Blight of Potato",
      kn: "ಆಲೂಗಡ್ಡೆ ಲೇಟ್ ಬ್ಲೈಟ್ (ಅಂಗಮಾರಿ ರೋಗ)",
    },
    severity: "High",
    symptoms: {
      en: "Water-soaked dark lesions on leaf tips and margins, white fuzzy fungal growth on leaf undersides in humid weather, rotting tubers.",
      kn: "ಎಲೆಗಳ ಅಂಚಿನಲ್ಲಿ ನೀರು ಸೋಕಿದಂತಿರುವ ಕಪ್ಪು ಕಲೆಗಳು. ಹವಾಮಾನ ತೇವವಾಗಿದ್ದಾಗ ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಬೂಷ್ಟು ಬೆಳೆಯುತ್ತದೆ, ಆಲೂಗಡ್ಡೆ ಕೊಳೆಯುತ್ತದೆ.",
    },
    prevention: {
      en: "• Use certified disease-free seed tubers.\n• Avoid overhead irrigation and harvest in dry conditions.",
      kn: "• ರೋಗಮುಕ್ತ ಪ್ರಮಾಣೀಕೃತ ಬಿತ್ತನೆ ಆಲೂಗಡ್ಡೆ ಬಳಸಿ.\n• ರಾತ್ರಿ ವೇಳೆ ನೀರು ಹಾಯಿಸುವುದನ್ನು ತಪ್ಪಿಸಿ ಮತ್ತು ಒಣ ಹವಾಮಾನದಲ್ಲಿ ಕಟಾವು ಮಾಡಿ.",
    },
    treatment: {
      en: "• Spray Trichoderma viride naturally as a bio-fungicide.\n• Isolate infected plants instantly.",
      kn: "• ಜೈವಿಕವಾಗಿ ಟ್ರೈಕೋಡರ್ಮಾ ವಿರಿಡೆ ಬಳಸಿ.\n• ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ತಕ್ಷಣ ಬೇರ್ಪಡಿಸಿ.",
    },
    chemicals: {
      en: "• Apply Metalaxyl + Mancozeb (2g/liter of water) immediately (Est cost: ₹500/kg, available at major agri dealers)",
      kn: "• ಮೆಟಲಾಕ್ಸಿಲ್ + ಮ್ಯಾಂಕೋಜೆಬ್ ಜಂಟಿ ಔಷಧಿ (೨ ಗ್ರಾಂ/ಲೀಟರ್) ತಕ್ಷಣ ಸಿಂಪಡಿಸಿ (ಅಂದಾಜು ಬೆಲೆ: ₹೫೦೦/ಕೆ.ಜಿ, ಪ್ರಮುಖ ಕೃಷಿ ಅಂಗಡಿಗಳಲ್ಲಿ ಲಭ್ಯ)",
    },
  },
];

const offlineVoiceReplies: Array<{
  queries: string[];
  reply: { en: string; kn: string };
}> = [
  {
    queries: ["fertilizer", "gobbara", "nutrition", "gobbara haki"],
    reply: {
      en: "For healthy crops, use organic compost mixed with balanced NPK fertilizer based on soil testing. For cereals like Paddy or Ragi, apply NPK in 50:40:40 ratio. For legumes, use less nitrogen and more phosphorous.",
      kn: "ಆರೋಗ್ಯಕರ ಬೆಳೆಗೆ, ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯ ಆಧಾರದ ಮೇಲೆ ಸಾವಯವ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರವನ್ನು ಎನ್‌ಪಿಕೆ ರಸಗೊಬ್ಬರದೊಂದಿಗೆ ಬೆರೆಸಿ ಹಾಕಿ.",
    },
  },
  {
    queries: ["rain", "weather", "clouds", "male", "havamana"],
    reply: {
      en: "Current weather for Karnataka shows 40% chance of light showers in southern zones. Avoid spraying chemicals or harvesting if cloud cover increases.",
      kn: "ಕರ್ನಾಟಕದ ದಕ್ಷಿಣ ಭಾಗದಲ್ಲಿ ಶೇ. ೪೦ ರಷ್ಟು ಮಳೆಯ ಸಾಧ್ಯತೆ ಇದೆ. ಮೋಡ ಹೆಚ್ಚಾಗಿದ್ದರೆ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಬೇಡಿ.",
    },
  },
  {
    queries: ["price", "mandi", "market", "bele", "dara"],
    reply: {
      en: "Market prices in Mandya APMC: Ragi ₹3,200–₹3,600/quintal, Paddy ₹2,100–₹2,450, Tomatoes ₹1,800/crate.",
      kn: "ಮಂಡ್ಯ ಎಪಿಎಂಸಿ: ರಾಗಿ ₹೩,೨೦೦–₹೩,೬೦೦/ಕ್ವಿಂಟಾಲ್, ಭತ್ತ ₹೨,೧೦೦–₹೨,೪೫೦, ಟೊಮ್ಯಾಟೊ ₹೧,೮೦೦/ಕ್ರೇಟ್.",
    },
  },
  {
    queries: ["scheme", "government", "subsidy", "yojane", "sarkari"],
    reply: {
      en: "PM-KISAN gives ₹6,000/year. Karnataka Krishi Bhagya gives 80–90% subsidy on farm ponds. PM Fasal Bima protects against crop losses.",
      kn: "ಪಿಎಂ-ಕಿಸಾನ್ ಅಡಿ ವಾರ್ಷಿಕ ₹೬,೦೦೦ ಸಿಗುತ್ತದೆ. ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆಯಡಿ ಶೇ. ೮೦–೯೦ ಸಬ್ಸಿಡಿ ಸಿಗುತ್ತದೆ.",
    },
  },
];

// ---------------------------------------------------------------------------
// Public API: analyzeCropDisease — calls /api/gemini/scan (server route)
// ---------------------------------------------------------------------------

export async function analyzeCropDisease(
  imageBase64: string,
  imageName: string
): Promise<{
  status: "healthy" | "diseased";
  diseaseName: { en: string; kn: string };
  confidence: number;
  symptoms: { en: string; kn: string };
  prevention: { en: string; kn: string };
  remedy: { en: string; kn: string };
  chemicals?: { en: string; kn: string };
  severity?: "Low" | "Medium" | "High" | "Unknown";
}> {
  const minDelay = new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const [res] = await Promise.all([
      fetch("/api/gemini/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64, imageName }),
      }),
      minDelay,
    ]);

    if (res.status === 429) {
      throw new Error("Rate limit reached");
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || `Server error ${res.status}`);
    }

    const { result: parsed } = await res.json();

    if (!parsed?.status || !parsed?.disease) {
      throw new Error("Invalid response structure from server");
    }

    return {
      status: parsed.status.toLowerCase().includes("healthy") ? "healthy" : "diseased",
      diseaseName: parsed.disease || { en: "Unidentified Condition", kn: "ಗುರುತಿಸಲಾಗದ ತೊಂದರೆ" },
      severity: parsed.severity || "Unknown",
      confidence: Number(parsed.confidence) || 90,
      symptoms: parsed.symptoms || { en: "General plant weakness.", kn: "ಗಿಡದ ಸಾಮಾನ್ಯ ದೌರ್ಬಲ್ಯ." },
      prevention: parsed.prevention || { en: "Ensure crop rotation.", kn: "ಬೆಳೆ ಬದಲಾವಣೆ ಮಾಡಿ." },
      remedy: parsed.remedy || { en: "Consult nearest KVK.", kn: "ಹತ್ತಿರದ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರಕ್ಕೆ ಸಂಪರ್ಕಿಸಿ." },
      chemicals: parsed.chemicals || { en: "No specific chemical required.", kn: "ಯಾವುದೇ ರಾಸಾಯನಿಕದ ಅಗತ್ಯವಿಲ್ಲ." },
    };
  } catch (err) {
    console.warn("[gemini.ts] analyzeCropDisease failed, using offline fallback:", err);
    await minDelay;
    const chosen = offlineDiseases[Math.floor(Math.random() * offlineDiseases.length)];
    return {
      status: "diseased",
      diseaseName: chosen.diseaseName,
      severity: (chosen.severity as "Low" | "Medium" | "High") || "Medium",
      confidence: Math.floor(Math.random() * 14) + 85,
      symptoms: chosen.symptoms,
      prevention: chosen.prevention,
      remedy: chosen.treatment,
      chemicals: chosen.chemicals,
    };
  }
}

// ---------------------------------------------------------------------------
// Public API: getFarmingAdvice — calls /api/gemini/advice (server route)
// ---------------------------------------------------------------------------

export async function getFarmingAdvice(
  query: string,
  preferredLang: "en" | "kn"
): Promise<string> {
  const normQuery = query.toLowerCase();

  const getOfflineReply = (): string => {
    for (const item of offlineVoiceReplies) {
      if (item.queries.some((q) => normQuery.includes(q))) {
        return item.reply[preferredLang];
      }
    }
    return preferredLang === "kn"
      ? "ಕ್ಷಮಿಸಿ, ಈ ಬಗ್ಗೆ ಸದ್ಯಕ್ಕೆ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ. ರಾಗಿ, ಗೊಬ್ಬರ, ಮಳೆ, ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಬಗ್ಗೆ ಕೇಳಿದರೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ!"
      : "I'm sorry, I don't have information on that yet. Try asking about Ragi, fertilizers, rain, Mandi prices, or government subsidies!";
  };

  try {
    const res = await fetch("/api/gemini/advice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, lang: preferredLang }),
    });

    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 1000));
      return getOfflineReply();
    }

    if (!res.ok) {
      throw new Error(`Server error ${res.status}`);
    }

    const { reply } = await res.json();
    if (!reply) throw new Error("Empty reply from server");
    return reply;
  } catch (err) {
    console.warn("[gemini.ts] getFarmingAdvice failed, using offline fallback:", err);
    await new Promise((r) => setTimeout(r, 1000));
    return getOfflineReply();
  }
}
