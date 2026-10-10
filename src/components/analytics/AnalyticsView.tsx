import React, { useState } from 'react';
import { 
  BarChart3, 
  Orbit, 
  Globe2, 
  TrendingUp, 
  FileDown, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Layers,
  Sparkles
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
  ORBIT_AI_SUMMARY,
  COUNTRY_LAUNCHES_DATA, 
  COUNTRY_AI_SUMMARY,
  SATELLITE_CATEGORIES_DATA, 
  CATEGORIES_AI_SUMMARY,
  LAUNCH_TIMELINE_DATA, 
  TIMELINE_AI_SUMMARY,
  MISSION_STATS_DATA,
  CONGESTION_BY_ALTITUDE_DATA
} from '../../data/chartData';
import { ChartAiSummary } from './ChartAiSummary';
import { exportAnalyticsReport } from '../../services/pdfExport';

export const AnalyticsView: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'launches' | 'activeSats'>('launches');

  // Custom Dark Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/95 border border-cyan-500/40 p-3 rounded-xl shadow-xl backdrop-blur-md text-xs">
          <p className="font-bold text-white mb-1">{label || payload[0].name}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-mono flex items-center gap-2" style={{ color: entry.color || entry.payload?.fill || '#06b6d4' }}>
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
      {/* Header with Export Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Astrodynamics Telemetry Intelligence</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Orbital Space Analytics
          </h1>
          <p className="text-sm text-slate-400">
            Statistical modeling of worldwide space missions, launch cadence, and orbital congestion.
          </p>
        </div>

        <button
          onClick={exportAnalyticsReport}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 shrink-0"
        >
          <FileDown className="w-4 h-4" />
          <span>Export Analytics PDF Report</span>
        </button>
      </div>

      {/* Visualizations Section */}
      <div className="space-y-8">
        {/* Visualization 1: Country-wise Launches & Fleets */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-purple-400" />
                <span>Country-Wise Launches & Active Satellite Fleets</span>
              </h3>
              <p className="text-xs text-slate-400">
                Comparative orbital presence across major sovereign space powers and commercial launch operators.
              </p>
            </div>

            {/* Metric Toggle */}
            <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setSelectedMetric('launches')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedMetric === 'launches' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Launches YTD
              </button>
              <button
                onClick={() => setSelectedMetric('activeSats')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedMetric === 'activeSats' ? 'bg-purple-500/20 text-purple-300 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Active Satellites
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COUNTRY_LAUNCHES_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <XAxis dataKey="country" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey={selectedMetric} 
                  name={selectedMetric === 'launches' ? 'Orbital Launches' : 'Active Satellites'}
                  fill={selectedMetric === 'launches' ? '#06b6d4' : '#a855f7'} 
                  radius={[6, 6, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* AI Summary Below Chart */}
          <ChartAiSummary summary={COUNTRY_AI_SUMMARY} />
        </div>

        {/* Visualization 2 & 3: Orbit Distribution + Satellite Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orbit Distribution */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                <Orbit className="w-5 h-5 text-cyan-400" />
                <span>Orbit Distribution Breakdown</span>
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Allocation of active artificial satellites across low, medium, geostationary, and halo orbits.
              </p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ORBIT_DISTRIBUTION_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
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

            <ChartAiSummary summary={ORBIT_AI_SUMMARY} />
          </div>

          {/* Satellite Categories */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                <Layers className="w-5 h-5 text-indigo-400" />
                <span>Satellite Categories & Applications</span>
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Distribution of operational payloads by primary mission mandate.
              </p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SATELLITE_CATEGORIES_DATA} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                    <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis dataKey="category" type="category" stroke="#64748b" fontSize={11} tickLine={false} width={100} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" name="Satellites" fill="#38bdf8" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <ChartAiSummary summary={CATEGORIES_AI_SUMMARY} />
          </div>
        </div>

        {/* Visualization 4: Launch Timeline & Constellation Growth */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Launch Timeline & Satellites Deployed (2016 – 2026)</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400">10-Year Decadal Trend</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Correlation between rocket launch cadence and the exponential surge in orbital assets deployed per year.
          </p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LAUNCH_TIMELINE_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorSat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="satellitesDeployed" name="Satellites Deployed" stroke="#a855f7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSat)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <ChartAiSummary summary={TIMELINE_AI_SUMMARY} />
        </div>

        {/* Visualization 5: Mission Statistics & Orbital Congestion Bands */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mission Success Statistics */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Global Mission Reliability Statistics</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Outcome distribution across recorded orbital launches worldwide over the trailing 12 months.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-sm font-bold text-white">Successful Orbital Insertions</div>
                    <div className="text-xs text-emerald-300 font-mono">268 Successful Missions</div>
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-emerald-400 font-mono">94.2%</div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <div>
                    <div className="text-sm font-bold text-white">Partial Mission Anomalies</div>
                    <div className="text-xs text-amber-300 font-mono">11 Sub-optimal Orbits / Payload Deployments</div>
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-amber-400 font-mono">3.8%</div>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <div>
                    <div className="text-sm font-bold text-white">Launch Failures</div>
                    <div className="text-xs text-rose-300 font-mono">6 Booster / Upper-Stage Failures</div>
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-rose-400 font-mono">2.0%</div>
              </div>
            </div>
          </div>

          {/* Congestion by Altitude Band */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <Orbit className="w-5 h-5 text-amber-400" />
              <span>Orbital Shell Congestion Risk</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Debris density and collision risk across specific Earth altitude bands.
            </p>

            <div className="space-y-2.5">
              {CONGESTION_BY_ALTITUDE_DATA.slice(0, 5).map((band, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono text-cyan-300 font-semibold">{band.altitudeBand}</span>
                    <div className="text-[11px] text-slate-400">{band.status}</div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-white font-bold">{band.sats} Active Sats</span>
                    <div className="text-rose-400 text-[11px]">{band.debris} Debris objects</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
