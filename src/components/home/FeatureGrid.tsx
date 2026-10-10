import React from 'react';
import { Compass, Bot, BarChart3, Database, ArrowRight, ShieldCheck, Cpu, Radio, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewTab } from '../../types';

export const FeatureGrid: React.FC = () => {
  const { setActiveTab } = useApp();

  const features: {
    title: string;
    description: string;
    tab: ViewTab;
    icon: React.ReactNode;
    tag: string;
    gradient: string;
    bullets: string[];
  }[] = [
    {
      title: 'Satellite Explorer & Radar',
      description: 'Filter and inspect over 10,000 artificial orbital objects by operator, orbit type (LEO/MEO/GEO), country, and operational status.',
      tab: 'explorer',
      icon: <Compass className="w-6 h-6 text-cyan-400" />,
      tag: 'Interactive Catalog',
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      bullets: [
        'Side-by-side satellite comparison matrix',
        'Detailed orbital telemetry & inclination profiles',
        'Bookmarked favorites and recent query history'
      ]
    },
    {
      title: 'AstroAI Space Tutor',
      description: 'An intelligent aerospace assistant equipped with deep physics knowledge: orbital mechanics, black holes, rockets, star lifecycles, and space missions.',
      tab: 'assistant',
      icon: <Bot className="w-6 h-6 text-purple-400" />,
      tag: 'Conversational Intelligence',
      gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      bullets: [
        'Multi-level explanations (Beginner, Student, Researcher)',
        'Mathematical formulas & LaTeX equation support',
        'Interactive suggested prompts and chat history'
      ]
    },
    {
      title: 'Global Orbital Analytics',
      description: 'Interactive data visualizations examining historical launches, geopolitical launch distributions, and mega-constellation orbital congestion.',
      tab: 'analytics',
      icon: <BarChart3 className="w-6 h-6 text-indigo-400" />,
      tag: 'Big Data Insights',
      gradient: 'from-indigo-500/20 via-cyan-500/10 to-transparent',
      bullets: [
        'AI summaries below every chart explaining key trends',
        'Interactive tooltips, category breakdowns & timelines',
        'One-click PDF briefing report export'
      ]
    },
    {
      title: 'Space Operations Dashboard',
      description: 'Live mission control interface with real-time ISS ephemeris telemetry, solar weather indicators, and orbital congestion indexes.',
      tab: 'dashboard',
      icon: <Radio className="w-6 h-6 text-emerald-400" />,
      tag: 'Live Mission Control',
      gradient: 'from-emerald-500/20 via-cyan-500/10 to-transparent',
      bullets: [
        'Live ISS latitude, longitude & velocity propagator',
        'Solar wind & geomagnetic Kp-index space weather',
        'Orbital shell distribution breakdown'
      ]
    }
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Designed for Modern Space Intelligence
          </h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md">
          Unifying satellite telemetry, astrodynamics physics, and artificial intelligence into a singular accessible workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feat, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(feat.tab)}
            className="group glass-card rounded-2xl p-6 sm:p-7 relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:border-cyan-500/40"
          >
            {/* Background ambient gradient */}
            <div className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-br ${feat.gradient} rounded-full blur-3xl pointer-events-none group-hover:opacity-80 transition-opacity`} />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                    {feat.icon}
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-300">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {feat.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {feat.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                <span>Launch Experience</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
