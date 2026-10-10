import React, { useEffect, useState } from 'react';
import { Telescope, Sparkles, ExternalLink, Calendar, Info } from 'lucide-react';
import { apiService } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AstronomyPhotoCard: React.FC = () => {
  const { setActiveTab } = useApp();
  const [photoData, setPhotoData] = useState<{
    title: string;
    explanation: string;
    url: string;
    date: string;
    copyright?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    apiService.getAstronomyPictureOfTheDay().then(data => {
      if (mounted) {
        setPhotoData(data);
        setIsLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading || !photoData) {
    return (
      <div className="glass-card rounded-2xl p-6 animate-pulse flex items-center justify-center min-h-[300px]">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
          <Telescope className="w-5 h-5 animate-spin" />
          <span>Calibrating deep-space optics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-cyan-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Image Preview */}
        <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden bg-slate-950">
          <img
            src={photoData.url}
            alt={photoData.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:hidden" />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
            <Telescope className="w-3.5 h-3.5" />
            <span>NASA APOD • Cosmic Highlight</span>
          </div>
        </div>

        {/* Info & Story */}
        <div className="lg:col-span-7 p-6 lg:p-8 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{photoData.date}</span>
              </span>
              {photoData.copyright && (
                <span className="truncate max-w-[200px]">Credit: {photoData.copyright}</span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {photoData.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-4">
              {photoData.explanation}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setActiveTab('assistant')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all shadow-lg shadow-purple-500/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Ask AstroAI About This Observation</span>
            </button>

            <a
              href="https://apod.nasa.gov/apod/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
            >
              <span>NASA Archive</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
