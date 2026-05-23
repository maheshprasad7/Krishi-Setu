"use client";

import { useState, useEffect, useRef } from "react";
import { useAgriMithraStore, VoiceQuery } from "@/lib/store";
import { translations } from "@/lib/translations";
import { getFarmingAdvice } from "@/lib/gemini";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  History, 
  Sprout, 
  HelpCircle,
  Clock,
  Sparkles,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { speakText as advancedSpeakText, stopSpeaking } from "@/lib/voice";

export default function VoicePage() {
  const { language, voiceQueries, addVoiceQuery, clearVoiceQueries } = useAgriMithraStore();
  const t = translations[language];

  // Speech States
  const [inputText, setInputText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [assistantState, setAssistantState] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [voiceOutput, setVoiceOutput] = useState(true);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Sample questions depending on current language
  const sampleQueries = language === "kn" ? [
    "ರಾಗಿ ಬೆಳೆಗೆ ಯಾವ ಗೊಬ್ಬರ ಹಾಕಬೇಕು?",
    "ಮಳೆಗೆ ಮುನ್ನೆಚ್ಚರಿಕೆ ಏನು?",
    "ಇಂದಿನ ರಾಗಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಎಷ್ಟು?",
    "ಸರ್ಕಾರದ ಯಾವ ಸಬ್ಸಿಡಿ ಯೋಜನೆಗಳಿವೆ?"
  ] : [
    "Which fertilizer is best for Ragi?",
    "Any weather precaution for today?",
    "What is the market price of Paddy?",
    "Tell me about PM-Kisan subsidy scheme"
  ];

  // Initialize Speech Recognition on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setRecognitionSupported(true);
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = language === "kn" ? "kn-IN" : "en-IN";

        rec.onstart = () => {
          setAssistantState("listening");
          setReplyText("");
        };

        rec.onresult = (event: any) => {
          const speechToText = event.results[0][0].transcript;
          setInputText(speechToText);
          handleProcessQuery(speechToText);
        };

        rec.onerror = (e: any) => {
          console.warn("Speech Recognition Error:", e);
          setAssistantState("idle");
        };

        rec.onend = () => {
          if (assistantState === "listening") {
            setAssistantState("idle");
          }
        };

        recognitionRef.current = rec;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Handle voice synthesis (TTS)
  const speakText = async (text: string) => {
    if (typeof window === "undefined" || !voiceOutput) return;
    
    setAssistantState("speaking");
    try {
      await advancedSpeakText(text, language);
      setAssistantState("idle");
    } catch (e) {
      console.warn("Speech playback error:", e);
      setAssistantState("idle");
    }
  };

  // Process farming query
  const handleProcessQuery = async (queryText: string) => {
    if (!queryText.trim()) return;
    setAssistantState("thinking");
    setReplyText("");

    try {
      const reply = await getFarmingAdvice(queryText, language);
      setReplyText(reply);
      addVoiceQuery(queryText, reply, language);
      
      // Auto speak response
      if (voiceOutput) {
        speakText(reply);
      } else {
        setAssistantState("idle");
      }
    } catch (err) {
      console.warn(err);
      setAssistantState("idle");
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      // Cancel speech synthesis if speaking
      if (typeof window !== "undefined") {
        stopSpeaking();
      }
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn("Speech recognition already running or blocked:", err);
      }
    } else {
      alert(language === "kn" ? "ನಿಮ್ಮ ಬ್ರೌಸರ್ ಧ್ವನಿ ಗ್ರಹಿಕೆ ಬೆಂಬಲಿಸುವುದಿಲ್ಲ!" : "Speech recognition is not supported in this browser viewport.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setAssistantState("idle");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleProcessQuery(inputText);
    setInputText("");
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
            <h1 className="font-poppins font-extrabold text-2xl sm:text-3xl text-text flex items-center gap-2">
              {t.voiceAssistant}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-text-light font-medium">
            {t.voiceAssistantDesc}
          </p>
        </div>

        {/* Voice read toggle button */}
        <button
          onClick={() => {
            setVoiceOutput(!voiceOutput);
            if (voiceOutput && typeof window !== "undefined") {
              stopSpeaking();
            }
          }}
          className={`flex items-center gap-2 font-bold px-4 py-2.5 rounded-xl text-xs transition-all ${
            voiceOutput 
              ? "bg-primary-light text-primary-dark border border-primary/20" 
              : "bg-slate-100 text-text-light border border-slate-200"
          }`}
        >
          {voiceOutput ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          {t.voiceOutputEnabled}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INTERACTIVE MIC CONSOLE - 5 Columns */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm flex flex-col items-center justify-between aspect-[4/5] min-h-[460px]">
          
          <div className="text-center space-y-2 w-full">
            <span className="bg-amber-100 text-amber-600 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {language === "kn" ? "ದ್ವಿಭಾಷಾ ಚಾಟ್ ಬೂತ್" : "Bilingual Voice Booth"}
            </span>
            <h3 className="font-poppins font-extrabold text-lg text-text">
              {language === "kn" ? "ಕನ್ನಡ ಧ್ವನಿ ಚಾಲಕ" : "Speak to Krishi-Setu"}
            </h3>
            <p className="text-[11px] text-text-light font-semibold">
              {language === "kn" ? "ರೈತರ ಆಡುಭಾಷೆಯಲ್ಲೇ ಸುಲಭ ವಿವರಗಳು" : "Colloquial local terms accepted"}
            </p>
          </div>

          {/* Central Microphone Button and Waveform */}
          <div className="flex flex-col items-center justify-center space-y-6 w-full py-4">
            
            {/* Waveform Visualization */}
            <div className="flex items-center justify-center gap-2 h-16 w-full">
              {assistantState === "listening" && (
                <>
                  <span className="w-1.5 h-6 bg-primary rounded-full wave-animation" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-1.5 h-12 bg-primary rounded-full wave-animation" style={{ animationDelay: '0.3s' }}></span>
                  <span className="w-1.5 h-16 bg-primary rounded-full wave-animation" style={{ animationDelay: '0.5s' }}></span>
                  <span className="w-1.5 h-10 bg-primary rounded-full wave-animation" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 h-14 bg-primary rounded-full wave-animation" style={{ animationDelay: '0.4s' }}></span>
                </>
              )}
              {assistantState === "speaking" && (
                <>
                  <span className="w-1.5 h-4 bg-amber-500 rounded-full wave-animation" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 h-10 bg-amber-500 rounded-full wave-animation" style={{ animationDelay: '0.4s' }}></span>
                  <span className="w-1.5 h-8 bg-amber-500 rounded-full wave-animation" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-1.5 h-12 bg-amber-500 rounded-full wave-animation" style={{ animationDelay: '0.3s' }}></span>
                </>
              )}
              {assistantState === "idle" && (
                <div className="h-[2px] w-24 bg-slate-200 rounded-full"></div>
              )}
              {assistantState === "thinking" && (
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                  <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              )}
            </div>

            {/* Mic trigger button */}
            <div className="relative">
              {/* Outer pulsing ring */}
              {assistantState === "listening" && (
                <div className="absolute -inset-4 rounded-full bg-primary/20 animate-ping z-0"></div>
              )}
              {assistantState === "speaking" && (
                <div className="absolute -inset-4 rounded-full bg-amber-500/20 animate-pulse z-0"></div>
              )}

              <button
                onClick={assistantState === "listening" ? stopListening : startListening}
                className={`relative z-10 p-8 rounded-full text-white shadow-xl transition-all duration-300 transform active:scale-95 ${
                  assistantState === "listening"
                    ? "bg-red-500 hover:bg-red-600 shadow-red-200"
                    : assistantState === "speaking"
                    ? "bg-amber-500 hover:bg-amber-600 shadow-amber-200"
                    : "bg-primary hover:bg-primary-dark shadow-emerald-200"
                }`}
                aria-label="Tap to talk"
              >
                {assistantState === "listening" ? (
                  <MicOff className="w-10 h-10" />
                ) : (
                  <Mic className="w-10 h-10" />
                )}
              </button>
            </div>

            {/* Helper status text */}
            <p className="text-sm font-extrabold text-text min-h-[20px]">
              {assistantState === "listening" 
                ? t.micListening 
                : assistantState === "thinking"
                ? t.micThinking
                : assistantState === "speaking"
                ? t.micSpeaking
                : t.micTapToSpeak}
            </p>
          </div>

          {/* Quick manual typing field */}
          <form onSubmit={handleFormSubmit} className="w-full flex gap-2">
            <input
              type="text"
              placeholder={t.voicePlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-xs font-semibold text-text"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white p-3 rounded-2xl shadow-sm transition-all"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>

        </div>

        {/* DISCUSSION & QUERY LOG CONSOLE - 7 Columns */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Active Reply box */}
          {replyText && (
            <div className="bg-[#F0FDF4] border border-primary-light rounded-3xl p-6.5 space-y-3.5 shadow-sm animate-fadeIn">
              <div className="flex items-center justify-between border-b border-emerald-100/50 pb-2">
                <div className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-primary-dark" />
                  <span className="text-xs font-bold text-primary-dark uppercase">{language === "kn" ? "ಅಗ್ರಿ-ಮಿತ್ರ ಉತ್ತರ" : "Krishi-Setu's Advice"}</span>
                </div>
                {voiceOutput && (
                  <button 
                    onClick={() => speakText(replyText)}
                    className="text-primary hover:text-primary-dark p-1"
                    aria-label="Repeat speech"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-sm sm:text-base font-semibold leading-relaxed text-text">
                {replyText}
              </p>
            </div>
          )}

          {/* Help crop suggestions shortcut grid */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <h4 className="font-poppins font-extrabold text-sm text-text flex items-center gap-2">
              <HelpCircle className="w-4.5 h-4.5 text-primary" />
              {language === "kn" ? "ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳ ಪಟ್ಟಿ (ಕ್ಲಿಕ್ ಮಾಡಿ)" : "Quick Questions (Tap to ask)"}
            </h4>
            <div className="flex flex-col gap-2">
              {sampleQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(q);
                    handleProcessQuery(q);
                  }}
                  className="bg-slate-50 hover:bg-primary-light/40 border border-slate-200 hover:border-primary-light p-3.5 rounded-2xl text-xs font-bold text-text-light hover:text-primary-dark text-left transition-all duration-200"
                >
                  💡 {q}
                </button>
              ))}
            </div>
          </div>

          {/* Voice query History logs */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 max-h-[300px] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <History className="w-4.5 h-4.5 text-primary" />
                <h4 className="font-poppins font-extrabold text-sm text-text">
                  {language === "kn" ? "ಹಿಂದಿನ ಧ್ವನಿ ಚಾಟ್ ಹಿಸ್ಟರಿ" : "Recent Speech Logs"}
                </h4>
              </div>
              {voiceQueries.length > 0 && (
                <button 
                  onClick={clearVoiceQueries}
                  className="text-[10px] font-extrabold text-red-500 hover:underline"
                >
                  {language === "kn" ? "ಹಿಸ್ಟರಿ ಅಳಿಸಿ" : "Clear All"}
                </button>
              )}
            </div>

            {voiceQueries.length === 0 ? (
              <p className="text-xs text-text-light font-semibold text-center py-6">
                {language === "kn" ? "ಯಾವುದೇ ಧ್ವನಿ ದಾಖಲೆ ಇಲ್ಲ!" : "No recent speech queries recorded."}
              </p>
            ) : (
              <div className="space-y-4">
                {voiceQueries.map((vq) => (
                  <div key={vq.id} className="space-y-2 border-b border-slate-50 pb-3 text-xs">
                    <div className="flex justify-between items-center text-[10px] text-text-light font-bold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary" />
                        {vq.date}
                      </span>
                      <span className="uppercase tracking-wider text-primary-dark">{vq.lang}</span>
                    </div>
                    <p className="font-bold text-text bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                      🗣 {vq.query}
                    </p>
                    <p className="font-medium text-text-light pl-4 italic">
                      🤖 {vq.reply}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
