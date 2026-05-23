"use client";

// Krishi-Sanjeevini Web Speech Synthesis & Recognition Services

let synth: any = typeof window !== "undefined" ? window.speechSynthesis : null;
let SpeechRecognition: any = typeof window !== "undefined" ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : null;
let recognition: any = null;
let currentUtterance: any = null;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
}

function findVoice(langCode: string) {
  if (!synth) return null;
  const voices = synth.getVoices();
  
  const prefix = langCode.split("-")[0].toLowerCase();
  
  // 1. Try to find native matching voices (e.g. kn-IN)
  let matchingVoices = voices.filter((v: any) => v.lang.toLowerCase() === langCode.toLowerCase() || v.lang.toLowerCase().startsWith(prefix));
  
  if (matchingVoices.length > 0) {
    // 2. Prefer high-quality/neural South Indian voices over older robotic ones
    const premiumVoice = matchingVoices.find((v: any) => 
      v.name.toLowerCase().includes("natural") || 
      v.name.toLowerCase().includes("online") || 
      v.name.toLowerCase().includes("gagan") || 
      v.name.toLowerCase().includes("shruti") || 
      v.name.toLowerCase().includes("google")
    );
    return premiumVoice || matchingVoices[0];
  }

  // 3. Special fallbacks
  if (prefix === "kn") {
    // Look for any Indian voice as alternative fallback
    const indianVoice = voices.find((v: any) => v.lang.toLowerCase().includes("in"));
    return indianVoice || voices[0];
  }
  return voices[0];
}

export function transliterateKannada(text: string) {
  const consonants: Record<string, string> = {
    'ಕ': 'k', 'ಖ': 'kh', 'ಗ': 'g', 'ಘ': 'gh', 'ಙ': 'ng',
    'ಚ': 'ch', 'ಛ': 'chh', 'ಜ': 'j', 'ಝ': 'jh', 'ಞ': 'ny',
    'ಟ': 't', 'ಠ': 'th', 'ಡ': 'd', 'ಢ': 'dh', 'ಣ': 'n',
    'ತ': 't', 'ಥ': 'th', 'ದ': 'd', 'ಧ': 'dh', 'ನ': 'n',
    'ಪ': 'p', 'ಫ': 'ph', 'ಬ': 'b', 'ಭ': 'bh', 'ಮ': 'm',
    'ಯ': 'y', 'ರ': 'r', 'ಲ': 'l', 'ವ': 'v', 'ಶ': 'sh',
    'ಷ': 'sh', 'ಸ': 's', 'ಹ': 'h', 'ಳ': 'l', 'ಕ್ಷ': 'ksh'
  };
  const vowels: Record<string, string> = {
    'ಅ': 'a', 'ಆ': 'aa', 'ಇ': 'i', 'ಈ': 'ee', 'ಉ': 'u', 'ಊ': 'oo', 'ಋ': 'ru', 'ಎ': 'e', 'ಏ': 'ee', 'ಐ': 'ai', 'ಒ': 'o', 'ಓ': 'o', 'ಔ': 'au'
  };
  const vowelSigns: Record<string, string> = {
    'ಾ': 'aa', 'ಿ': 'i', 'ೀ': 'ee', 'ು': 'u', 'ೂ': 'oo', 'ೃ': 'ru', 'ೆ': 'e', 'ೇ': 'ee', 'ೈ': 'ai', 'ೊ': 'o', 'ೋ': 'o', 'ೌ': 'au', 'ಂ': 'm', 'ಃ': 'h'
  };
  
  let result = '';
  let i = 0;
  while (i < text.length) {
    const char = text[i];
    if (consonants[char]) {
      let base = consonants[char];
      let nextChar = text[i + 1];
      if (nextChar === '್') {
        result += base; i += 2;
      } else if (nextChar === 'ಂ' || nextChar === 'ಃ') {
        result += base + 'a' + vowelSigns[nextChar]; i += 2;
      } else if (vowelSigns[nextChar]) {
        result += base + vowelSigns[nextChar]; i += 2;
      } else {
        result += base + 'a'; i += 1;
      }
    } else if (vowels[char]) {
      result += vowels[char]; i += 1;
    } else {
      result += char; i += 1;
    }
  }
  
  // Custom corrections for common agricultural phrases to optimize pronunciation
  return result
    .replace(/\bragi\b/gi, 'raagi')
    .replace(/\broga\b/gi, 'rooga')
    .replace(/\bbele\b/gi, 'bele')
    .replace(/\bmannu\b/gi, 'mannu')
    .replace(/\bkrushi\b/gi, 'krushi')
    .replace(/\bsanjeevini\b/gi, 'sanjeevini');
}

let audioQueue: any[] = [];
let currentAudio: any = null;
let globalAudioPlayer: any = typeof window !== "undefined" ? new Audio() : null;
let isPlayingAudioQueue = false;
let audioResolve: any = null;
let audioReject: any = null;

/**
 * Splits text into safe pronunciation chunks under standard limits
 */
function splitTextIntoChunks(text: string, maxLength = 160) {
  const chunks = [];
  const sentences = text.split(/([.?!,;|।\n]+)/);
  let currentChunk = "";

  for (let i = 0; i < sentences.length; i++) {
    const part = sentences[i];
    if (!part) continue;

    if ((currentChunk + part).length > maxLength) {
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = part;
      while (currentChunk.length > maxLength) {
        let cutIndex = currentChunk.lastIndexOf(" ", maxLength);
        if (cutIndex === -1) cutIndex = maxLength;
        chunks.push(currentChunk.substring(0, cutIndex).trim());
        currentChunk = currentChunk.substring(cutIndex);
      }
    } else {
      currentChunk += part;
    }
  }
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  return chunks;
}

/**
 * Plays the next chunk prioritizing high-quality native Web Speech over Google TTS.
 */
function playNextQueueItem() {
  if (!isPlayingAudioQueue || audioQueue.length === 0) {
    isPlayingAudioQueue = false;
    if (audioResolve) {
      audioResolve();
      audioResolve = null;
      audioReject = null;
    }
    return;
  }

  const { text, lang } = audioQueue.shift();

  // Forcefully use Google TTS for Kannada because native OS voices (like Microsoft Ravi) 
  // or transliterated fallbacks sound terrible and robotic.
  if (lang === "kn") {
    fallbackToGoogleTTS(text, lang);
    return;
  }

  const voiceLang = "en-IN";
  const bestVoice = findVoice(voiceLang);
  const hasNative = bestVoice && bestVoice.lang.toLowerCase().startsWith(lang);

  if (hasNative) {
    speakWithWebSpeech(text, lang)
      .then(() => {
        playNextQueueItem();
      })
      .catch((err) => {
        console.error("Web Speech chunk failed, trying Google TTS:", err);
        fallbackToGoogleTTS(text, lang);
      });
  } else {
    // Natively use Google's high-quality Kannada voice instead of transliterated English robot
    fallbackToGoogleTTS(text, lang);
  }
}

/**
 * Legacy Google TTS fallback
 */
function fallbackToGoogleTTS(text: string, lang: string) {
  if (!globalAudioPlayer) {
    fallbackToWebSpeech(text, lang);
    return;
  }

  // Do NOT transliterate here! Google TTS `tl=kn` strictly expects native Kannada script.
  const targetText = text;

  // Use the highly reliable client=gtx endpoint
  const ttsUrl = `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=${lang}&q=${encodeURIComponent(targetText)}`;
  
  globalAudioPlayer.src = ttsUrl;
  
  const playTimeout = setTimeout(() => {
    console.warn("TTS Playback timed out, falling back to Web Speech.");
    if (globalAudioPlayer) {
      try { globalAudioPlayer.pause(); } catch (e) {}
    }
    fallbackToWebSpeech(text, lang);
  }, 4000);

  globalAudioPlayer.play()
    .then(() => {
      clearTimeout(playTimeout);
      if (!globalAudioPlayer) return;
      globalAudioPlayer.onended = () => {
        playNextQueueItem();
      };
      globalAudioPlayer.onerror = () => {
        console.error("Audio playback error, falling back to Web Speech.");
        fallbackToWebSpeech(text, lang);
      };
    })
    .catch((err: unknown) => {
      console.error("Audio play blocked or failed:", err);
      clearTimeout(playTimeout);
      fallbackToWebSpeech(text, lang);
    });
}

/**
 * Native SpeechSynthesis fallback for offline or blocked requests
 */
function fallbackToWebSpeech(text: string, lang: string) {
  isPlayingAudioQueue = false;
  const remainingText = text + " " + audioQueue.map(item => item.text).join(" ");
  audioQueue = [];
  
  speakWithWebSpeech(remainingText, lang)
    .then(() => {
      if (audioResolve) {
        audioResolve();
        audioResolve = null;
        audioReject = null;
      }
    })
    .catch((err) => {
      if (audioReject) {
        audioReject(err);
        audioResolve = null;
        audioReject = null;
      }
    });
}

/**
 * Standard SpeechSynthesis speaker
 */
function speakWithWebSpeech(text: string, lang = "en") {
  return new Promise<void>((resolve, reject) => {
    if (!synth) {
      reject("Speech Synthesis not supported in this browser.");
      return;
    }
    
    let targetText = text;
    let voiceLang = lang === "kn" ? "kn-IN" : "en-IN";

    const bestVoice = findVoice(voiceLang);
    const hasNativeKannada = bestVoice && bestVoice.lang.toLowerCase().startsWith("kn");

    if (lang === "kn" && !hasNativeKannada) {
      // If there is no native Kannada voice, TRANSLITERATE IT to English characters
      // so the Indian English voice can read it with a perfect accent instead of saying gibberish.
      console.warn("No native Kannada Web Speech voice found. Transliterating for Indian English voice...");
      targetText = transliterateKannada(text);
      voiceLang = "en-IN";
    }

    currentUtterance = new SpeechSynthesisUtterance(targetText);
    currentUtterance.lang = voiceLang;

    // Use the voice we found (could be kn-IN, or en-IN for transliterated)
    const activeVoice = findVoice(voiceLang);
    if (activeVoice) {
      currentUtterance.voice = activeVoice;
    }

    currentUtterance.rate = lang === "kn" ? 0.85 : 1.0;
    currentUtterance.pitch = 1.05;

    currentUtterance.onend = () => {
      currentUtterance = null;
      resolve();
    };

    currentUtterance.onerror = (event: any) => {
      currentUtterance = null;
      reject(event.error);
    };

    synth.speak(currentUtterance);
  });
}

/**
 * Speaks out the provided text using sequential Google TTS streams (falling back to Web Speech Synthesis)
 */
export function speakText(text: string, lang = "en"): Promise<void> {
  return new Promise((resolve, reject) => {
    stopSpeaking();

    // Prime the global audio player immediately on user interaction to bypass autoplay blocks
    if (globalAudioPlayer && globalAudioPlayer.paused) {
      globalAudioPlayer.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"; // silent wav
      globalAudioPlayer.play().catch(() => {});
    }

    const cleanText = text
      .replace(/[*#`_\-]/g, " ")
      .replace(/\d\./g, "")
      .trim();

    if (!cleanText) {
      resolve();
      return;
    }

    audioResolve = resolve;
    audioReject = reject;
    isPlayingAudioQueue = true;

    const chunks = splitTextIntoChunks(cleanText, 160);
    audioQueue = chunks.map(chunk => ({ text: chunk, lang }));

    playNextQueueItem();
  });
}

/**
 * Stops any ongoing narration (TTS streams or standard speech synthesis)
 */
export function stopSpeaking() {
  if (synth) {
    synth.cancel();
    currentUtterance = null;
  }
  isPlayingAudioQueue = false;
  audioQueue = [];
  if (globalAudioPlayer) {
    try {
      globalAudioPlayer.pause();
      globalAudioPlayer.src = "";
    } catch (e) {
      console.error("Error pausing audio track:", e);
    }
  }
  if (audioResolve) {
    audioResolve();
    audioResolve = null;
    audioReject = null;
  }
}

// Force synthesis voices to load on initialization
if (typeof window !== "undefined" && synth) {
  synth.getVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = () => synth.getVoices();
  }
}

export { SpeechRecognition };
