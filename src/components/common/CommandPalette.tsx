import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Orbit, 
  Compass, 
  Bot, 
  BarChart3, 
  X, 
  Sun, 
  Moon, 
  FileDown, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewTab } from '../../types';
import { exportAnalyticsReport } from '../../services/pdfExport';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    satellites, 
    setSelectedSatellite, 
    setActiveTab, 
    theme, 
    toggleTheme,
    addSearchTerm
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  // Filter satellites
  const matchedSatellites = query.trim()
    ? satellites.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.operator.toLowerCase().includes(query.toLowerCase()) ||
        s.noradId.toString().includes(query) ||
        s.country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const defaultActions = [
    {
      id: 'tab-explorer',
      label: 'Explore Satellite Catalog',
      category: 'Navigation',
      icon: <Compass className="w-4 h-4 text-cyan-400" />,
      action: () => setActiveTab('explorer'),
    },
    {
      id: 'tab-assistant',
      label: 'Launch AstroAI Space Chatbot',
      category: 'AI Assistant',
      icon: <Bot className="w-4 h-4 text-purple-400" />,
      action: () => setActiveTab('assistant'),
    },
    {
      id: 'tab-analytics',
      label: 'View Orbital Analytics & Statistics',
      category: 'Analytics',
      icon: <BarChart3 className="w-4 h-4 text-indigo-400" />,
      action: () => setActiveTab('analytics'),
    },
    {
      id: 'export-pdf',
      label: 'Export Space Intelligence PDF Report',
      category: 'Reports',
      icon: <FileDown className="w-4 h-4 text-emerald-400" />,
      action: () => exportAnalyticsReport(),
    },
    {
      id: 'toggle-theme',
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Appearance',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />,
      action: () => toggleTheme(),
    },
  ];

  const handleSelectSat = (sat: typeof satellites[0]) => {
    addSearchTerm(sat.name);
    setSelectedSatellite(sat);
    setIsCommandPaletteOpen(false);
  };

  const handleSelectAction = (actionFn: () => void) => {
    actionFn();
    setIsCommandPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/10 overflow-hidden text-slate-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search satellites, operators, NORAD IDs, or type an aerospace question..."
            className="w-full bg-transparent text-sm focus:outline-none placeholder-slate-500 text-slate-100"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Matched Satellites */}
          {matchedSatellites.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 px-3 mb-1">
                Satellites Found
              </div>
              <div className="space-y-1">
                {matchedSatellites.map(sat => (
                  <div
                    key={sat.id}
                    onClick={() => handleSelectSat(sat)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors border border-transparent hover:border-cyan-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                        <Orbit className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white flex items-center gap-2">
                          <span>{sat.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                            {sat.orbitType}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">
                          {sat.operator} • {sat.country} • NORAD: {sat.noradId}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ask AI quick action if query exists */}
          {query.trim() && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400 px-3 mb-1">
                Ask OrbitLens AI
              </div>
              <div
                onClick={() => {
                  setActiveTab('assistant');
                  setIsCommandPaletteOpen(false);
                }}
                className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 cursor-pointer transition-colors border border-purple-500/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-900/60 flex items-center justify-center text-purple-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-purple-200">
                      Ask AI about "{query}"
                    </div>
                    <div className="text-xs text-purple-400">
                      Explain celestial mechanics, orbital parameters, or mission history
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-400" />
              </div>
            </div>
          )}

          {/* Quick Platform Actions */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-3 mb-1">
              Quick Actions
            </div>
            <div className="space-y-1">
              {defaultActions.map(act => (
                <div
                  key={act.id}
                  onClick={() => handleSelectAction(act.action)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors border border-transparent hover:border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                      {act.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-200">{act.label}</div>
                      <div className="text-[11px] text-slate-400">{act.category}</div>
                    </div>
                  </div>
                  <kbd className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    ↵ Select
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer shortcuts tip */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span><kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">Esc</kbd> to close</span>
            <span><kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">Ctrl+K</kbd> to toggle</span>
          </div>
          <span className="text-cyan-400 font-mono">OrbitLens Space Search Engine</span>
        </div>
      </div>
    </div>
  );
};
