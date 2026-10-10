import React from 'react';
import { Keyboard, X, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const KeyboardShortcutsModal: React.FC = () => {
  const { isShortcutsModalOpen, setIsShortcutsModalOpen } = useApp();

  if (!isShortcutsModalOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + K', description: 'Open Command Palette & Global Search' },
    { key: '1', description: 'Navigate to Home (3D Orbital Earth)' },
    { key: '2', description: 'Navigate to Space Operations Dashboard' },
    { key: '3', description: 'Navigate to Satellite Explorer' },
    { key: '4', description: 'Navigate to AstroAI Assistant' },
    { key: '5', description: 'Navigate to Analytics & Launch Trends' },
    { key: '6', description: 'Navigate to About & Data Architecture' },
    { key: '?', description: 'Toggle this Keyboard Shortcuts cheat sheet' },
    { key: 'Esc', description: 'Close any active modal, dialog, or drawer' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl text-slate-100 relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-white">Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-400">Navigate OrbitLens AI at orbital speed</p>
            </div>
          </div>
          <button
            onClick={() => setIsShortcutsModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {shortcuts.map((sc, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <span className="text-sm text-slate-300">{sc.description}</span>
              <kbd className="px-2.5 py-1 text-xs font-mono font-semibold bg-slate-800 border border-slate-700 rounded-md text-cyan-300 shadow-inner">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Power User Navigation</span>
          </span>
          <button
            onClick={() => setIsShortcutsModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
