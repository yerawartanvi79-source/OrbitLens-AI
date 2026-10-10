import React from 'react';
import { X, Layers, Trash2, ArrowRightLeft, Orbit, Activity, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SATELLITE_DATABASE } from '../../data/mockSatellites';
import { Satellite } from '../../types';

export const SatelliteCompareModal: React.FC = () => {
  const { 
    isCompareModalOpen, 
    setIsCompareModalOpen, 
    compareList, 
    removeFromCompare, 
    clearCompare,
    toggleCompare 
  } = useApp();

  if (!isCompareModalOpen) return null;

  const satA: Satellite | undefined = compareList[0];
  const satB: Satellite | undefined = compareList[1];

  const handleSelectSatB = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = SATELLITE_DATABASE.find(s => s.id === e.target.value);
    if (selected) {
      toggleCompare(selected);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="w-full max-w-4xl bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100 my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Side-by-Side Satellite Comparison</h2>
              <p className="text-xs text-slate-400">Evaluate orbital mechanics, telemetry, and payload capabilities</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-400 text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {!satA ? (
            <div className="text-center py-12 space-y-3">
              <Orbit className="w-12 h-12 text-slate-600 mx-auto animate-spin" style={{ animationDuration: '12s' }} />
              <p className="text-base text-slate-300 font-medium">No Satellites Selected for Comparison</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Click the "+ Compare" button on any satellite card or table row to benchmark it against another spacecraft.
              </p>
            </div>
          ) : (
            <div>
              {/* Satellite Selectors Header */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Slot A */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/30 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">Primary Spacecraft</span>
                    <h3 className="text-lg font-bold text-white mt-1">{satA.name}</h3>
                    <p className="text-xs text-slate-400">{satA.operator} • {satA.country}</p>
                  </div>
                  <button
                    onClick={() => removeFromCompare(satA.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Slot B */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-500/30">
                  {satB ? (
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-purple-400 font-semibold">Comparison Spacecraft</span>
                        <h3 className="text-lg font-bold text-white mt-1">{satB.name}</h3>
                        <p className="text-xs text-slate-400">{satB.operator} • {satB.country}</p>
                      </div>
                      <button
                        onClick={() => removeFromCompare(satB.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[10px] font-mono uppercase text-purple-400 font-semibold">Choose Second Spacecraft</span>
                      <select
                        onChange={handleSelectSatB}
                        defaultValue=""
                        className="w-full mt-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                      >
                        <option value="" disabled>Select satellite to benchmark against...</option>
                        {SATELLITE_DATABASE.filter(s => s.id !== satA.id).map(s => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.orbitType} - {s.operator})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Comparison Matrix Table */}
              {satB && (
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 text-xs">
                    <div className="grid grid-cols-3 p-3 bg-slate-900/80 font-mono text-slate-400 border-b border-slate-800 font-semibold uppercase text-[11px]">
                      <div>Telemetry Parameter</div>
                      <div className="text-cyan-400 truncate">{satA.name}</div>
                      <div className="text-purple-400 truncate">{satB.name}</div>
                    </div>

                    {/* Metric Rows */}
                    <div className="divide-y divide-slate-800/60 font-sans">
                      <div className="grid grid-cols-3 p-3 hover:bg-slate-900/40">
                        <span className="text-slate-400 font-medium">Orbit Classification</span>
                        <span className="font-mono text-cyan-300 font-bold">{satA.orbitType}</span>
                        <span className="font-mono text-purple-300 font-bold">{satB.orbitType}</span>
                      </div>

                      <div className="grid grid-cols-3 p-3 hover:bg-slate-900/40">
                        <span className="text-slate-400 font-medium">Mean Altitude</span>
                        <span className="font-mono text-white">{satA.altitudeKm.toLocaleString()} km</span>
                        <span className="font-mono text-white">{satB.altitudeKm.toLocaleString()} km</span>
                      </div>

                      <div className="grid grid-cols-3 p-3 hover:bg-slate-900/40">
                        <span className="text-slate-400 font-medium">Orbital Velocity</span>
                        <span className="font-mono text-cyan-300 font-bold">{satA.velocityKmS} km/s</span>
                        <span className="font-mono text-purple-300 font-bold">{satB.velocityKmS} km/s</span>
                      </div>

                      <div className="grid grid-cols-3 p-3 hover:bg-slate-900/40">
                        <span className="text-slate-400 font-medium">Orbital Period</span>
                        <span className="font-mono text-white">{satA.orbitalPeriodMin} min</span>
                        <span className="font-mono text-white">{satB.orbitalPeriodMin} min</span>
                      </div>

                      <div className="grid grid-cols-3 p-3 hover:bg-slate-900/40">
                        <span className="text-slate-400 font-medium">Inclination Angle</span>
                        <span className="font-mono text-white">{satA.inclinationDeg}°</span>
                        <span className="font-mono text-white">{satB.inclinationDeg}°</span>
                      </div>

                      <div className="grid grid-cols-3 p-3 hover:bg-slate-900/40">
                        <span className="text-slate-400 font-medium">Launch Date</span>
                        <span className="font-mono text-slate-300">{satA.launchDate}</span>
                        <span className="font-mono text-slate-300">{satB.launchDate}</span>
                      </div>

                      <div className="grid grid-cols-3 p-3 hover:bg-slate-900/40">
                        <span className="text-slate-400 font-medium">Launch Vehicle</span>
                        <span className="text-slate-300">{satA.launchVehicle}</span>
                        <span className="text-slate-300">{satB.launchVehicle}</span>
                      </div>

                      <div className="grid grid-cols-3 p-3 hover:bg-slate-900/40">
                        <span className="text-slate-400 font-medium">Wet Mass</span>
                        <span className="font-mono text-slate-300">{satA.massKg ? `${satA.massKg.toLocaleString()} kg` : 'N/A'}</span>
                        <span className="font-mono text-slate-300">{satB.massKg ? `${satB.massKg.toLocaleString()} kg` : 'N/A'}</span>
                      </div>

                      <div className="grid grid-cols-3 p-3 hover:bg-slate-900/40">
                        <span className="text-slate-400 font-medium">Solar Array Power</span>
                        <span className="font-mono text-slate-300">{satA.powerWatts ? `${satA.powerWatts.toLocaleString()} W` : 'N/A'}</span>
                        <span className="font-mono text-slate-300">{satB.powerWatts ? `${satB.powerWatts.toLocaleString()} W` : 'N/A'}</span>
                      </div>

                      <div className="grid grid-cols-3 p-3 hover:bg-slate-900/40">
                        <span className="text-slate-400 font-medium">Operational Status</span>
                        <span className="font-mono text-emerald-400">{satA.status}</span>
                        <span className="font-mono text-emerald-400">{satB.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Relative Velocity & Altitude Difference Insight */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="text-cyan-400 font-semibold font-mono">ASTRODYNAMICS DELTA: </span>
                    {satA.altitudeKm > satB.altitudeKm ? (
                      <span><strong>{satA.name}</strong> operates {(satA.altitudeKm - satB.altitudeKm).toLocaleString()} km higher than <strong>{satB.name}</strong>, requiring lower orbital speed ({satA.velocityKmS} km/s vs {satB.velocityKmS} km/s) in accordance with Kepler's Third Law.</span>
                    ) : (
                      <span><strong>{satB.name}</strong> operates {(satB.altitudeKm - satA.altitudeKm).toLocaleString()} km higher than <strong>{satA.name}</strong>, requiring lower orbital speed ({satB.velocityKmS} km/s vs {satA.velocityKmS} km/s) in accordance with Kepler's Third Law.</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
