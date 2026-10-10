import React, { useState } from 'react';
import { 
  Orbit, 
  Globe2, 
  BarChart3, 
  TrendingUp, 
  Compass, 
  Layers, 
  Sparkles,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  ORBIT_DISTRIBUTION_DATA, 
  COUNTRY_LAUNCHES_DATA, 
  SATELLITE_CATEGORIES_DATA, 
  LAUNCH_TIMELINE_DATA 
} from '../../data/chartData';
import { SPACE_METRICS } from '../../data/mockSatellites';
import { IssLiveTracker } from './IssLiveTracker';
import { SpaceWeatherWidget } from './SpaceWeatherWidget';
import { useApp } from '../../context/AppContext';

export const DashboardOverview: React.FC = () => {
  const { setActiveTab } = useApp();
  const [selectedOrbitFilter, setSelectedOrbitFilter] = useState<string | null>(null);

  // Custom Chart Tooltip for dark mode
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/95 border border-cyan-500/40 p-3 rounded-xl shadow-xl backdrop-blur-md text-xs">
          <p className="font-bold text-white mb-1">{label || payload[0].name}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-mono flex items-center gap-2" style={{ color: entry.color || entry.payload.fill || '#06b6d4' }}>
              <span>{entry.name}:</span>
              <span className="font-bold text-white">{entry.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
            <Orbit className="w-4 h-4" />
            <span>Mission Control • Global Operations</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Space Intelligence Dashboard
          </h1>
          <p className="text-sm text-slate-400">
            Real-time orbital census, constellation growth, and operational telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('explorer')}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>View All Satellites</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className="px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Deep Analytics</span>
          </button>
        </div>
      </div>

      {/* Top Telemetry Widgets: Live ISS + Space Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <IssLiveTracker />
        </div>
        <div className="lg:col-span-5">
          <SpaceWeatherWidget />
        </div>
      </div>

      {/* KPI Stats Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-cyan-500/30">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">TOTAL ACTIVE SATELLITES</div>
          <div className="text-3xl font-extrabold text-white font-mono">{SPACE_METRICS.totalActiveSatellites.toLocaleString()}+</div>
          <div className="mt-2 text-[11px] text-cyan-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Exponential 5-yr surge (+18% YoY)</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-purple-500/30">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">LEO FLEET SHARE</div>
          <div className="text-3xl font-extrabold text-purple-300 font-mono">81.5%</div>
          <div className="mt-2 text-[11px] text-purple-400">
            <span>8,350+ satellites in low orbit</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-amber-500/30">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">GEO ARC TELECOMS</div>
          <div className="text-3xl font-extrabold text-amber-300 font-mono">590</div>
          <div className="mt-2 text-[11px] text-amber-400">
            <span>Stationary at 35,786 km altitude</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-emerald-500/30">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">LAUNCHES YTD</div>
          <div className="text-3xl font-extrabold text-emerald-300 font-mono">188</div>
          <div className="mt-2 text-[11px] text-emerald-400">
            <span>Commercial cadence 94.2% success</span>
          </div>
        </div>
      </div>

      {/* Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Orbit Distribution (Donut Chart) */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 border border-cyan-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Orbit className="w-5 h-5 text-cyan-400" />
                <span>Orbit Distribution</span>
              </h3>
              <span className="text-xs font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                10,240 Assets
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Breakdown across Low Earth Orbit (LEO), Sun-Synchronous (SSO), Geostationary (GEO), and Deep Space.
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ORBIT_DISTRIBUTION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {ORBIT_DISTRIBUTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Orbit Legend Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4 border-t border-slate-800 text-xs">
            {ORBIT_DISTRIBUTION_DATA.slice(0, 6).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate text-slate-300 font-medium">{item.name.split(' ')[0]}</span>
                <span className="font-mono text-slate-400 ml-auto">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Country-Wise Satellite Count (Bar Chart) */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 border border-purple-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-purple-400" />
                <span>Country-Wise Satellite Fleet</span>
              </h3>
              <span className="text-xs font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/30">
                Top Space Nations
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Registered operational assets by sovereign state and private commercial operators.
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={COUNTRY_LAUNCHES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis 
                    dataKey="code" 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="activeSats" name="Active Satellites" fill="#a855f7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200">
            <span className="font-semibold text-purple-300">Dominance Driver:</span> The United States leads active asset counts through commercial mega-constellations (Starlink, Kuiper), while China and Europe maintain strategic sovereign deployments.
          </div>
        </div>

        {/* Chart 3: Satellite Categories (Horizontal Breakdown) */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Satellite Mission Categories</span>
            </h3>
            <span className="text-xs font-mono text-cyan-400">Purpose Ratio</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Commercial internet, Earth observation remote sensing, navigation GNSS, and defense.
          </p>

          <div className="space-y-3">
            {SATELLITE_CATEGORIES_DATA.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{cat.category}</span>
                  <span className="font-mono text-cyan-300 font-semibold">{cat.count.toLocaleString()} ({cat.share})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: cat.share,
                      backgroundColor: cat.fill,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: Launches by Year (Area Chart) */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>Launches by Year & Deployment Trend</span>
              </h3>
              <span className="text-xs font-mono text-emerald-400">2016–2026</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Annual rocket launches and explosive growth in payload satellites deployed to orbit.
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={LAUNCH_TIMELINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorDeployed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="satellitesDeployed" name="Satellites Deployed" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorDeployed)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            <span className="text-cyan-400 font-semibold">The Reusability Inflection:</span> Deployments escalated steeply following booster reusability (Falcon 9) and dedicated rideshare missions (Transporter), multiplying annual satellite output tenfold.
          </div>
        </div>
      </div>
    </div>
  );
};
