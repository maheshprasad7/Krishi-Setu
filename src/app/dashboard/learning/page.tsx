"use client";

import { useEffect, useState } from "react";
import { useAgriMithraStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { getRecommendedVideos, VideoRecommendation } from "@/lib/recommendations";
import { PlayCircle, Bookmark, BookmarkCheck, Lightbulb } from "lucide-react";

export default function LearningPage() {
  const { language, profile, bookmarkedVideos, toggleBookmarkedVideo } = useAgriMithraStore();
  const t = translations[language];
  const [videos, setVideos] = useState<VideoRecommendation[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVideos(getRecommendedVideos(profile));
    setMounted(true);
  }, [profile]);

  if (!mounted) return null;

  return (
    <div className="space-y-6 animate-fadeIn max-w-6xl mx-auto pb-10">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 rounded-[2rem] p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 translate-x-8 -translate-y-8">
          <Lightbulb className="w-64 h-64" />
        </div>
        <div className="relative z-10">
          <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl">
            {t.navLearning}
          </h1>
          <p className="text-blue-50 mt-2 font-medium max-w-xl">
            {language === "kn" 
              ? "ಹೊಸ ಕೃಷಿ ತಂತ್ರಜ್ಞಾನಗಳು, ರೋಗ ನಿವಾರಣೆ ಮತ್ತು ಸಾವಯವ ಕೃಷಿಯ ಬಗ್ಗೆ ತಜ್ಞರ ವೀಡಿಯೊಗಳು."
              : "Learn from expert videos on modern farming tech, disease treatment, and organic practices."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {videos.map((video) => {
          const isSaved = bookmarkedVideos.includes(video.id);
          return (
            <div key={video.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:border-blue-300 transition-colors group flex flex-col">
              <a 
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.title.en)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-video bg-slate-100 overflow-hidden block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={video.thumbnail} 
                  alt="Video thumbnail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-16 h-16 text-white drop-shadow-md" />
                </div>
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white font-extrabold text-[10px] px-2 py-1 rounded-md uppercase tracking-wider">
                  {video.category}
                </div>
              </a>
              
              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <h3 className="font-poppins font-extrabold text-base text-text leading-snug line-clamp-2">
                  {language === "kn" ? video.title.kn : video.title.en}
                </h3>
                
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button 
                    onClick={() => toggleBookmarkedVideo(video.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                      isSaved ? "text-blue-600" : "text-text-light hover:text-text"
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    {language === "kn" 
                      ? (isSaved ? "ಉಳಿಸಲಾಗಿದೆ" : "ಉಳಿಸಿ") 
                      : (isSaved ? "Saved" : "Save")}
                  </button>
                  
                  <a 
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.title.en)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-extrabold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5"
                  >
                    <PlayCircle className="w-4 h-4" />
                    {language === "kn" ? "ವೀಕ್ಷಿಸಿ" : "Watch"}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
