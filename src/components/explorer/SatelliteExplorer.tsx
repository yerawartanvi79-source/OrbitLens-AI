import React, { useState, useMemo } from 'react';
import { Compass, Orbit, Search, Star, Layers, Sparkles, Bug } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExplorerFilters } from './ExplorerFilters';
import { SatelliteCard } from './SatelliteCard';
import { SatelliteTable } from './SatelliteTable';
import { SatelliteDetailModal } from './SatelliteDetailModal';
import { SatelliteCompareModal } from './SatelliteCompareModal';
import { FilterDebugPanel } from './FilterDebugPanel';
import { filterSatellites } from '../../utils/filterSatellites';

export const SatelliteExplorer: React.FC = () => {
  const { 
    satellites, 
    isLoadingSatellites, 
    filterOptions, 
    isFavorite,
    setIsCompareModalOpen,
    compareList
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  // Show debug panel by default in dev mode or allow toggle
  const isDev = import.meta.env.DEV;
  const [showDebugPanel, setShowDebugPanel] = useState(isDev);

  // Normalized filter calculation with step-by-step debug info
  const { filtered: filteredSatellites, debugInfo } = useMemo(() => {
    return filterSatellites(satellites, filterOptions, isFavorite);
  }, [satellites, filterOptions, isFavorite]);

  // Human-readable summary of active filters
  const filterSummary = useMemo(() => {
    const parts: string[] = [];
    if (filterOptions.searchQuery.trim()) parts.push(`Query: "${filterOptions.searchQuery.trim()}"`);
    if (filterOptions.orbitType && filterOptions.orbitType !== 'ALL') parts.push(`Orbit: ${filterOptions.orbitType}`);
    if (filterOptions.country && filterOptions.country !== 'ALL') parts.push(`Country: ${filterOptions.country}`);
    if (filterOptions.operator && filterOptions.operator !== 'ALL') parts.push(`Operator: ${filterOptions.operator}`);
    if (filterOptions.category && filterOptions.category !== 'ALL') parts.push(`Category: ${filterOptions.category}`);
    if (filterOptions.status && filterOptions.status !== 'ALL') parts.push(`Status: ${filterOptions.status}`);
    if (filterOptions.onlyFavorites) parts.push('Favorites Only');
    return parts.join(' | ');
  }, [filterOptions]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Satellite Intelligence Catalog</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Orbital Satellite Explorer
          </h1>
          <p className="text-sm text-slate-400">
            Query public orbital elements, filter by operator and orbit regimes, or benchmark spacecraft.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Debug Panel Toggle Button */}
          <button
            onClick={() => setShowDebugPanel(prev => !prev)}
            className={`px-3 py-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
              showDebugPanel
                ? 'bg-purple-950/80 border-purple-500/50 text-purple-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-purple-300'
            }`}
            title="Toggle Filter Debug Inspector"
          >
            <Bug className="w-3.5 h-3.5 text-purple-400" />
            <span>{showDebugPanel ? 'Hide Debug' : 'Debug Filters'}</span>
          </button>

          {compareList.length > 0 && (
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-purple-600/25 animate-pulse"
            >
              <Layers className="w-4 h-4" />
              <span>Open Comparison ({compareList.length}/2)</span>
            </button>
          )}
        </div>
      </div>

      {/* Development Debug Panel */}
      {showDebugPanel && (
        <FilterDebugPanel
          debugInfo={debugInfo}
          currentFilterSummary={filterSummary}
        />
      )}

      {/* Filter Controls Component */}
      <ExplorerFilters
        viewMode={viewMode}
        setViewMode={setViewMode}
        resultCount={filteredSatellites.length}
      />

      {/* Loading Skeletons */}
      {isLoadingSatellites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="glass-card rounded-2xl p-6 h-64 animate-pulse">
              <div className="w-24 h-4 bg-slate-800 rounded mb-4" />
              <div className="w-48 h-6 bg-slate-800 rounded mb-2" />
              <div className="w-32 h-3 bg-slate-800 rounded mb-6" />
              <div className="w-full h-16 bg-slate-800/60 rounded" />
            </div>
          ))}
        </div>
      ) : filteredSatellites.length === 0 ? (
        /* Empty State */
        <div className="glass-card rounded-2xl p-12 text-center border border-slate-800 space-y-4">
          <Orbit className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Satellites Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            No orbital assets matched your current search parameters ({filterSummary || 'active filters'}). Try clearing some filters or searching for terms like "Starlink", "Hubble", "GPS", or "ISS".
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Cards Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSatellites.map(sat => (
            <SatelliteCard key={sat.id} satellite={sat} />
          ))}
        </div>
      ) : (
        /* High-density Table View */
        <SatelliteTable satellites={filteredSatellites} />
      )}

      {/* Modals */}
      <SatelliteDetailModal />
      <SatelliteCompareModal />
    </div>
  );
};
