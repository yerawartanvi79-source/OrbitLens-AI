import React from 'react';
import { Sun, Wind, Compass, Zap, ShieldCheck } from 'lucide-react';

export const SpaceWeatherWidget: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-6 border border-amber-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950/70 border border-amber-500/30 flex items-center justify-center text-amber-300">
            <Sun className="w-5 h-5 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Space Weather & Solar Activity</h3>
            <p className="text-xs text-slate-400 font-mono">NOAA Space Weather Prediction Center</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
          Geomagnetic: Quiet (Kp 3)
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
            <Wind className="w-3.5 h-3.5 text-cyan-400" />
            <span>SOLAR WIND</span>
          </div>
          <div className="text-lg font-bold text-cyan-300 font-mono">412 km/s</div>
          <div className="text-[10px] text-slate-400">Nominal stream</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>KP-INDEX</span>
          </div>
          <div className="text-lg font-bold text-purple-300 font-mono">3 / 9</div>
          <div className="text-[10px] text-slate-400">Low auroral risk</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>SOLAR FLARES</span>
          </div>
          <div className="text-lg font-bold text-amber-300 font-mono">M1.4 Peak</div>
          <div className="text-[10px] text-slate-400">Active Region 3664</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>HF RADIO DRAG</span>
          </div>
          <div className="text-lg font-bold text-emerald-300 font-mono">Normal</div>
          <div className="text-[10px] text-slate-400">LEO decay standard</div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <span className="text-amber-400 font-semibold">Orbital Drag Insight:</span> Solar Cycle 25 maximum solar ultraviolet flux warms Earth’s thermosphere, expanding atmospheric density at 300–500 km. Satellites in Low Earth Orbit require intermittent station-keeping thruster firings to counter increased aerodynamic drag.
      </div>
    </div>
  );
};
