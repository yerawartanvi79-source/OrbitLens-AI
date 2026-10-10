import React from 'react';
import { Orbit, ExternalLink, ShieldCheck, Heart, Radio } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="w-full bg-slate-950 border-t border-purple-500/15 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white">
                <Orbit className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base font-sans">
                OrbitLens <span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An intelligent space analytics and astrodynamics platform empowering students, researchers, educators, and stargazers to explore Earth orbit.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-mono">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Public Space Telemetry Stream: Active</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3 font-mono">
              Exploration
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-cyan-300 transition-colors">
                  Orbital Home & 3D Earth
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-cyan-300 transition-colors">
                  Global Space Operations Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('explorer')} className="hover:text-cyan-300 transition-colors">
                  Satellite Catalog & Explorer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('assistant')} className="hover:text-cyan-300 transition-colors">
                  AstroAI Intelligence Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analytics')} className="hover:text-cyan-300 transition-colors">
                  Launch & Constellation Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Public Data Feeds */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3 font-mono">
              Public Data Sources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://api.nasa.gov" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>NASA Open Data & APOD APIs</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://celestrak.org" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>CelesTrak Two-Line Element (TLE)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://wheretheiss.at" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>WhereTheISS Live Ephemeris</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.esa.int/Space_Safety/Space_Debris" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>ESA Space Debris Office</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Disclaimer Card */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Educational Use Only</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              OrbitLens AI is built solely for educational and analytical purposes. It does not provide official aerospace guidance, orbital conjunction warning, or mission-critical flight trajectory solutions.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} OrbitLens AI. Built for the next generation of space explorers.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('about')} className="hover:text-slate-300 transition-colors">
              About Project
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Space Science
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
