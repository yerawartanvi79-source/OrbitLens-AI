import React from 'react';
import { Orbit, ShieldAlert, Globe2, Radio, Activity, Rocket } from 'lucide-react';
import { SPACE_METRICS } from '../../data/mockSatellites';
import { useApp } from '../../context/AppContext';

export const LiveStatsBar: React.FC = () => {
  const { issLocation } = useApp();

  const stats = [
    {
      label: 'Active Satellites',
      value: SPACE_METRICS.totalActiveSatellites.toLocaleString() + '+',
      change: '+18% YoY',
      icon: <Orbit className="w-5 h-5 text-cyan-400" />,
      subtext: 'Tracked in Low, Medium & Geostationary orbits',
      color: 'border-cyan-500/20 text-cyan-400',
    },
    {
      label: 'Cataloged Debris (>10cm)',
      value: SPACE_METRICS.totalDebrisTracked.toLocaleString(),
      change: 'High Alert',
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
      subtext: 'Monitored by Space Surveillance Networks',
      color: 'border-rose-500/20 text-rose-400',
    },
    {
      label: 'Operational Orbits',
      value: `${SPACE_METRICS.operationalOrbits} Shells`,
      change: 'LEO / MEO / GEO / SSO / HEO / L2',
      icon: <Globe2 className="w-5 h-5 text-purple-400" />,
      subtext: 'Altitude span 200 km to 1.5M km',
      color: 'border-purple-500/20 text-purple-400',
    },
    {
      label: 'ISS Real-Time Speed',
      value: issLocation ? `${Math.round(issLocation.velocity).toLocaleString()} km/h` : '27,580 km/h',
      change: issLocation ? `Alt: ${Math.round(issLocation.altitude)} km` : 'Alt: 418 km',
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      subtext: 'Orbital velocity ~7.66 km/s',
      color: 'border-emerald-500/20 text-emerald-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="glass-card rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              {stat.label}
            </span>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              {stat.icon}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-sans">
              {stat.value}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-400 truncate">{stat.subtext}</span>
            <span className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-900/60 border ${stat.color} shrink-0`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
