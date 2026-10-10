import React from 'react';
import { Orbit, Sparkles, Rocket, Globe2, Sun, Telescope, Compass, Zap } from 'lucide-react';

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onSelectPrompt }) => {
  const promptCategories = [
    {
      title: 'Orbital Mechanics & Orbits',
      icon: <Orbit className="w-4 h-4 text-cyan-400" />,
      prompts: [
        'How do satellites stay in orbit without falling to Earth?',
        'What is the difference between LEO and Geostationary orbits?',
        'What are Lagrange points and why is JWST placed at L2?',
      ],
    },
    {
      title: 'Black Holes & Astronomy',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      prompts: [
        'Explain black holes and what happens at the event horizon.',
        'What is dark matter and how do astronomers know it exists?',
        'How does cosmic microwave background radiation prove the Big Bang?',
      ],
    },
    {
      title: 'Rockets & Propulsion',
      icon: <Rocket className="w-4 h-4 text-amber-400" />,
      prompts: [
        'Explain how rocket engines work and what specific impulse means.',
        'Why is methane (Methalox) replacing kerosene in modern rockets like Starship?',
        'How do ion thrusters generate thrust using noble gases?',
      ],
    },
    {
      title: 'Space Missions & Stars',
      icon: <Telescope className="w-4 h-4 text-emerald-400" />,
      prompts: [
        'How does the James Webb Space Telescope look back in time?',
        'How do stars fuse hydrogen into heavier elements before going supernova?',
        'Why is NASA focusing on the lunar South Pole for Artemis?',
      ],
    },
  ];

  return (
    <div className="space-y-6 my-auto py-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs text-purple-300 font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AstroAI Space Tutor Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How can I assist your cosmic exploration?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Choose a foundational astrophysics prompt below or ask any question about satellites, orbital decay, or rocket engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promptCategories.map((cat, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider font-mono">
              {cat.icon}
              <span>{cat.title}</span>
            </div>
            <div className="space-y-1.5">
              {cat.prompts.map((p, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => onSelectPrompt(p)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800/80 hover:border-cyan-500/30 text-xs text-slate-300 hover:text-cyan-300 transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{p}</span>
                  <Sparkles className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
