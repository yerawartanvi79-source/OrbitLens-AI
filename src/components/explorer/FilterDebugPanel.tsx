import React, { useState } from 'react';
import { Bug, ChevronDown, ChevronUp, Filter, Search, ShieldAlert, CheckCircle2, Layers } from 'lucide-react';
import { FilterDebugInfo } from '../../utils/filterSatellites';

interface FilterDebugPanelProps {
  debugInfo: FilterDebugInfo;
  currentFilterSummary: string;
}

export const FilterDebugPanel: React.FC<FilterDebugPanelProps> = ({
  debugInfo,
  currentFilterSummary,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [removedSearch, setRemovedSearch] = useState('');

  // Filter removed satellites by query for fast lookup
  const filteredRemoved = debugInfo.removedSatellites.filter(r => 
    r.satelliteName.toLowerCase().includes(removedSearch.toLowerCase()) ||
    r.filterStep.toLowerCase().includes(removedSearch.toLowerCase()) ||
    r.reason.toLowerCase().includes(removedSearch.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-purple-500/30 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl shadow-purple-500/10 text-xs text-slate-200">
      {/* Collapsible Header */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-3.5 sm:p-4 bg-slate-900/90 border-b border-purple-500/20 flex items-center justify-between cursor-pointer hover:bg-slate-900 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <Bug className="w-4 h-4 text-purple-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white font-mono text-[11px] uppercase tracking-wider">
                Filter Pipeline Debug Inspector
              </span>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-purple-900/60 text-purple-200 border border-purple-500/30">
                Dev Mode
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Pipeline: {debugInfo.totalLoaded} loaded ➔ {debugInfo.steps[debugInfo.steps.length - 1]?.count ?? 0} retained
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-cyan-400 hidden sm:inline">
            {currentFilterSummary || 'No active filters'}
          </span>
          <button className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Step-by-Step Pipeline Retention Counts */}
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5 font-semibold">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Pipeline Stage Retention Counters</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">1. TOTAL LOADED</div>
                <div className="text-base font-bold text-white font-mono">{debugInfo.totalLoaded}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">2. AFTER SEARCH</div>
                <div className="text-base font-bold text-cyan-300 font-mono">{debugInfo.afterSearch}</div>
              </div>

              {debugInfo.steps.slice(1).map((st, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase truncate">
                    {3 + i}. {st.step.replace('After ', '')}
                  </div>
                  <div className="text-base font-bold text-purple-300 font-mono">{st.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Which Filter Removed Each Satellite */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5 font-semibold">
                <Filter className="w-3.5 h-3.5 text-purple-400" />
                <span>Which Filter Removed Each Satellite ({debugInfo.removedSatellites.length} removed)</span>
              </div>

              {debugInfo.removedSatellites.length > 0 && (
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={removedSearch}
                    onChange={e => setRemovedSearch(e.target.value)}
                    placeholder="Search removed satellites..."
                    className="w-full pl-8 pr-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              )}
            </div>

            {debugInfo.removedSatellites.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-slate-400">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span>All {debugInfo.totalLoaded} satellites satisfied the current filter parameters!</span>
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-1.5 rounded-xl border border-slate-800 bg-slate-950 p-2">
                {filteredRemoved.map((r, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white truncate max-w-[220px]">
                        {r.satelliteName}
                      </span>
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-rose-950/80 text-rose-300 border border-rose-500/40 shrink-0">
                        {r.filterStep}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono sm:text-right">
                      {r.reason}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
