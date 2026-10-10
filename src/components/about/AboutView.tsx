import React from 'react';
import { 
  Orbit, 
  ShieldAlert, 
  Database, 
  Cpu, 
  BookOpen, 
  Code2, 
  ExternalLink, 
  Sparkles,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutView: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs text-cyan-300 font-mono">
          <Orbit className="w-3.5 h-3.5" />
          <span>About OrbitLens AI SpaceLab</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Pioneering Open Space Intelligence
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Democratizing satellite telemetry, astrodynamics physics, and space data analytics for students, researchers, educators, and space enthusiasts worldwide.
        </p>
      </div>

      {/* Prominent Educational & Analytical Disclaimer */}
      <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-slate-200 space-y-3">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <span>Official Disclaimer & Educational Scope</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong>OrbitLens AI</strong> is designed exclusively for educational, academic research, and analytical data visualization purposes. It <strong>must not</strong> be used or relied upon for mission-critical aerospace flight guidance, real-time collision conjunction warnings, tactical defense maneuvers, or official launch trajectory predictions. Orbital coordinates and ephemeris values are aggregated from public open repositories and propagation models.
        </p>
      </div>

      {/* Project Vision & Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Educational Mission</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Astrophysics and orbital mechanics can feel abstract. OrbitLens AI transforms complex mathematics into tangible, interactive 3D visualizations and conversational reasoning.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">AI-Driven Insights</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our AstroAI engine doesn't just display raw numbers—it synthesizes meaningful takeaways below every chart and explains concepts at beginner, student, or researcher levels.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Open Telemetry</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Built upon open standards and modular adapters that seamlessly integrate with NASA APIs, CelesTrak TLE feeds, and space debris surveillance databases.
          </p>
        </div>
      </div>

      {/* How Public Space Data is Used */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-400" />
          <span>How Public Space Data is Sourced & Processed</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Modern space traffic management relies on public transparency. OrbitLens AI ingests, normalizes, and renders data from leading public astronomical and aerospace organizations:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">NASA Open APIs & APOD</span>
              <a href="https://api.nasa.gov" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs text-slate-400">
              Astronomy Picture of the Day (APOD), planetary telemetry, and earth observation satellite databases.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">CelesTrak (TLE Ephemeris)</span>
              <a href="https://celestrak.org" target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs text-slate-400">
              Two-Line Element (TLE) orbital sets, NORAD catalog IDs, and Simplified General Perturbations (SGP4) parameters.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">WhereTheISS.at</span>
              <a href="https://wheretheiss.at" target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs text-slate-400">
              Real-time International Space Station latitude, longitude, velocity, and orbital footprint tracking.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">ESA & NOAA Space Weather</span>
              <a href="https://www.swpc.noaa.gov" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs text-slate-400">
              Geomagnetic planetary Kp-index, solar flare activity, solar wind velocities, and space debris statistics.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack & Architecture */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-purple-400" />
          <span>Modular Technical Architecture</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Engineered with a modern, high-performance web stack ensuring smooth 60fps animations, modular data provider interfaces, and responsive accessibility:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-2">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            <div className="text-cyan-400 font-bold">React 19 & Vite</div>
            <div className="text-[11px] text-slate-500 mt-1">Component architecture</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            <div className="text-purple-400 font-bold">TypeScript</div>
            <div className="text-[11px] text-slate-500 mt-1">Strict orbital types</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            <div className="text-blue-400 font-bold">Tailwind CSS v4</div>
            <div className="text-[11px] text-slate-500 mt-1">Futuristic glassmorphism</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            <div className="text-emerald-400 font-bold">Three.js WebGL</div>
            <div className="text-[11px] text-slate-500 mt-1">60fps 3D Earth Globe</div>
          </div>
        </div>
      </div>

      {/* Call to Action to Explore */}
      <div className="text-center pt-4">
        <button
          onClick={() => setActiveTab('explorer')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all inline-flex items-center gap-2"
        >
          <Orbit className="w-4 h-4" />
          <span>Start Exploring the Satellite Catalog</span>
        </button>
      </div>
    </div>
  );
};
