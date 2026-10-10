import React from 'react';
import { 
  X, 
  Orbit, 
  Calendar, 
  Rocket, 
  MapPin, 
  Activity, 
  Zap, 
  Weight, 
  Layers, 
  Bot, 
  Star, 
  ShieldAlert,
  Clock
} from 'lucide-react';
import { Satellite } from '../../types';
import { useApp } from '../../context/AppContext';
import { OrbitVisualizerCanvas } from './OrbitVisualizerCanvas';

export const SatelliteDetailModal: React.FC = () => {
  const { 
    selectedSatellite, 
    setSelectedSatellite, 
    toggleFavorite, 
    isFavorite, 
    toggleCompare, 
    compareList,
    setActiveTab 
  } = useApp();

  if (!selectedSatellite) return null;

  const isFav = isFavorite(selectedSatellite.id);
  const isCompared = compareList.some(s => s.id === selectedSatellite.id);

  const handleAskAI = () => {
    setSelectedSatellite(null);
    setActiveTab('assistant');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="w-full max-w-3xl bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden text-slate-100 my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/80 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                {selectedSatellite.orbitType} Orbit
              </span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono ${
                selectedSatellite.status === 'Active'
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${selectedSatellite.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                {selectedSatellite.status}
              </span>
              <span className="text-xs font-mono text-slate-400">
                NORAD #{selectedSatellite.noradId} • INTL: {selectedSatellite.intlDesignator}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {selectedSatellite.name}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Operator: <span className="text-slate-200 font-medium">{selectedSatellite.operator}</span> ({selectedSatellite.country})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(selectedSatellite.id)}
              className={`p-2 rounded-xl border text-sm transition-all ${
                isFav
                  ? 'bg-amber-950/80 border-amber-500/50 text-amber-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-amber-400'
              }`}
              title="Star favorite"
            >
              <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={() => setSelectedSatellite(null)}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Orbit Canvas Projection */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-cyan-400 uppercase font-semibold">
                <Orbit className="w-4 h-4" />
                <span>Simulated Keplerian Orbit Profile</span>
              </span>
              <span>Inclination: {selectedSatellite.inclinationDeg}°</span>
            </div>
            <OrbitVisualizerCanvas satellite={selectedSatellite} />
          </div>

          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Mean Altitude</div>
              <div className="text-lg font-bold text-cyan-300 font-mono">
                {selectedSatellite.altitudeKm.toLocaleString()} km
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                Apo: {selectedSatellite.apogeeKm} km
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Orbital Speed</div>
              <div className="text-lg font-bold text-purple-300 font-mono">
                {selectedSatellite.velocityKmS} km/s
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                ~{(selectedSatellite.velocityKmS * 3600).toLocaleString()} km/h
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Orbital Period</div>
              <div className="text-lg font-bold text-amber-300 font-mono">
                {selectedSatellite.orbitalPeriodMin} min
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                ~{(selectedSatellite.orbitalPeriodMin / 60).toFixed(2)} hrs/rev
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Inclination</div>
              <div className="text-lg font-bold text-emerald-300 font-mono">
                {selectedSatellite.inclinationDeg}°
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                Peri: {selectedSatellite.perigeeKm} km
              </div>
            </div>
          </div>

          {/* Mission Specifications List */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase font-mono tracking-wider text-[11px]">
              Mission Specifications & Launch Architecture
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Launch Date: <strong className="text-white font-mono">{selectedSatellite.launchDate}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Launch Vehicle: <strong className="text-white">{selectedSatellite.launchVehicle}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Launch Site: <strong className="text-white">{selectedSatellite.launchSite}</strong></span>
              </div>
              {selectedSatellite.massKg && (
                <div className="flex items-center gap-2">
                  <Weight className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Wet Mass: <strong className="text-white font-mono">{selectedSatellite.massKg.toLocaleString()} kg</strong></span>
                </div>
              )}
              {selectedSatellite.powerWatts && (
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Solar Array Power: <strong className="text-white font-mono">{selectedSatellite.powerWatts.toLocaleString()} W</strong></span>
                </div>
              )}
              {selectedSatellite.expectedDecayDate && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Est. De-orbit / End of Life: <strong className="text-white font-mono">{selectedSatellite.expectedDecayDate}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Description & Purpose */}
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Operational Purpose
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                {selectedSatellite.purpose}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Technical Dossier & Background
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                {selectedSatellite.description}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompare(selectedSatellite)}
              className={`px-4 py-2 rounded-xl border text-xs font-medium transition-all flex items-center gap-2 ${
                isCompared
                  ? 'bg-purple-600 text-white border-purple-400'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-purple-300 hover:border-purple-500/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{isCompared ? 'In Compare List' : 'Add to Compare'}</span>
            </button>
          </div>

          <button
            onClick={handleAskAI}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Consult AstroAI About This Satellite</span>
          </button>
        </div>
      </div>
    </div>
  );
};
