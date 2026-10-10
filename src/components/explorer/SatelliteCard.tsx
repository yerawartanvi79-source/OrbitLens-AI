import React from 'react';
import { 
  Orbit, 
  Star, 
  Layers, 
  ExternalLink, 
  Calendar, 
  Activity, 
  Compass, 
  Info,
  ChevronRight
} from 'lucide-react';
import { Satellite } from '../../types';
import { useApp } from '../../context/AppContext';

interface SatelliteCardProps {
  satellite: Satellite;
}

export const SatelliteCard: React.FC<SatelliteCardProps> = ({ satellite }) => {
  const { 
    setSelectedSatellite, 
    toggleFavorite, 
    isFavorite, 
    compareList, 
    toggleCompare 
  } = useApp();

  const isFav = isFavorite(satellite.id);
  const isCompared = compareList.some(s => s.id === satellite.id);

  const getOrbitBadgeColor = (orbit: string) => {
    switch (orbit) {
      case 'LEO': return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40';
      case 'SSO': return 'bg-blue-950/80 text-blue-300 border-blue-500/40';
      case 'MEO': return 'bg-purple-950/80 text-purple-300 border-purple-500/40';
      case 'GEO': return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      case 'Lagrange': return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      default: return 'bg-slate-900 text-slate-300 border-slate-700';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        );
      case 'Decommissioned':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            Decommissioned
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-950/80 text-amber-300 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1 group">
      <div>
        {/* Header badges & Actions */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold border ${getOrbitBadgeColor(satellite.orbitType)}`}>
              {satellite.orbitType}
            </span>
            {getStatusBadge(satellite.status)}
          </div>

          <div className="flex items-center gap-1">
            {/* Compare Toggle */}
            <button
              onClick={() => toggleCompare(satellite)}
              className={`p-1.5 rounded-lg border text-xs transition-all ${
                isCompared
                  ? 'bg-purple-600 text-white border-purple-400 shadow-sm shadow-purple-500/30'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-purple-300 hover:border-purple-500/40'
              }`}
              title={isCompared ? 'Remove from compare' : 'Add to side-by-side comparison'}
              aria-label="Toggle compare"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>

            {/* Favorite Star */}
            <button
              onClick={() => toggleFavorite(satellite.id)}
              className={`p-1.5 rounded-lg border text-xs transition-all ${
                isFav
                  ? 'bg-amber-950/80 border-amber-500/50 text-amber-400'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/30'
              }`}
              title={isFav ? 'Remove from favorites' : 'Star favorite'}
              aria-label="Toggle favorite"
            >
              <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title & Operator */}
        <div className="mb-3">
          <h3 
            onClick={() => setSelectedSatellite(satellite)}
            className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer flex items-center justify-between"
          >
            <span className="truncate">{satellite.name}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
            <span className="text-slate-300 font-medium truncate">{satellite.operator}</span>
            <span>•</span>
            <span className="truncate">{satellite.country}</span>
          </p>
        </div>

        {/* Purpose summary */}
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">
          {satellite.purpose}
        </p>

        {/* Quick Telemetry Grid */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs font-mono mb-4">
          <div>
            <div className="text-[10px] text-slate-400">ALTITUDE</div>
            <div className="text-cyan-300 font-semibold">{satellite.altitudeKm.toLocaleString()} km</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">VELOCITY</div>
            <div className="text-purple-300 font-semibold">{satellite.velocityKmS} km/s</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">INCLINATION</div>
            <div className="text-slate-300">{satellite.inclinationDeg}°</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">PERIOD</div>
            <div className="text-slate-300">{satellite.orbitalPeriodMin}m</div>
          </div>
        </div>
      </div>

      {/* Card Footer action */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-[11px] font-mono text-slate-400">
          NORAD: {satellite.noradId}
        </span>
        <button
          onClick={() => setSelectedSatellite(satellite)}
          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium group/btn transition-colors"
        >
          <span>Telemetry Dossier</span>
          <ChevronRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
