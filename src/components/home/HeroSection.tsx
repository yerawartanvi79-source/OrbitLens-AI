import React from 'react';
import { Compass, Bot, BarChart3, Sparkles, Orbit, Radio, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Earth3DCanvas } from './Earth3DCanvas';

export const HeroSection: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <section className="relative pt-6 pb-12">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Col: Hero Narrative */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 text-xs text-purple-300 backdrop-blur-md shadow-lg shadow-purple-500/5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
              Live Orbital Telemetry • AI Astrodynamics
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-sans">
              Explore Earth’s Orbit with{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent glow-text-cyan">
                Space Intelligence
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-xl">
              An AI-powered exploration platform for students, researchers, and space enthusiasts. Inspect thousands of satellites, understand complex orbital mechanics, and converse with an aerospace copilot.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('explorer')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm transition-all duration-200 flex items-center gap-2.5 shadow-lg shadow-cyan-500/25 active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Satellites</span>
            </button>

            <button
              onClick={() => setActiveTab('assistant')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/40 hover:border-purple-400 text-purple-200 font-semibold text-sm transition-all duration-200 flex items-center gap-2.5 backdrop-blur-md shadow-lg shadow-purple-500/10 active:scale-95"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>Launch AstroAI</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className="px-5 py-3.5 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700 hover:border-cyan-500/40 text-slate-300 hover:text-white font-medium text-sm transition-all duration-200 flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>View Analytics</span>
            </button>
          </div>

          {/* Quick Telemetry Indicators */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <div className="text-slate-400 text-[11px]">ACTIVE OBJECTS</div>
              <div className="text-cyan-400 font-bold text-sm">10,240+</div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">ORBITAL SHELLS</div>
              <div className="text-purple-400 font-bold text-sm">LEO • MEO • GEO</div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">DATA SOURCES</div>
              <div className="text-emerald-400 font-bold text-sm">NASA & CelesTrak</div>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive 3D Earth Canvas */}
        <div className="lg:col-span-6 w-full">
          <Earth3DCanvas />
        </div>
      </div>
    </section>
  );
};
