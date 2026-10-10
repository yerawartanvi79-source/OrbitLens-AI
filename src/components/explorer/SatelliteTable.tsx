import React, { useState } from 'react';
import { Orbit, Star, Layers, ChevronRight, ArrowUpDown } from 'lucide-react';
import { Satellite } from '../../types';
import { useApp } from '../../context/AppContext';

interface SatelliteTableProps {
  satellites: Satellite[];
}

export const SatelliteTable: React.FC<SatelliteTableProps> = ({ satellites }) => {
  const { 
    setSelectedSatellite, 
    toggleFavorite, 
    isFavorite, 
    compareList, 
    toggleCompare 
  } = useApp();

  const [sortField, setSortField] = useState<keyof Satellite>('name');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (field: keyof Satellite) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sorted = [...satellites].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (aVal === undefined || bVal === undefined) return 0;
    if (aVal < bVal) return sortAsc ? -1 : 1;
    if (aVal > bVal) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-slate-800">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <th className="py-3 px-4">Fav</th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-white"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  <span>Satellite Name</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4">Operator</th>
              <th className="py-3 px-4">Country</th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-white"
                onClick={() => handleSort('orbitType')}
              >
                <div className="flex items-center gap-1">
                  <span>Orbit</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-white"
                onClick={() => handleSort('altitudeKm')}
              >
                <div className="flex items-center gap-1">
                  <span>Altitude (km)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-white"
                onClick={() => handleSort('velocityKmS')}
              >
                <div className="flex items-center gap-1">
                  <span>Velocity (km/s)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {sorted.map(sat => {
              const isFav = isFavorite(sat.id);
              const isCompared = compareList.some(s => s.id === sat.id);

              return (
                <tr 
                  key={sat.id}
                  className="hover:bg-slate-900/60 transition-colors group cursor-pointer"
                  onClick={() => setSelectedSatellite(sat)}
                >
                  <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => toggleFavorite(sat.id)}
                      className="p-1 text-slate-500 hover:text-amber-400"
                    >
                      <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {sat.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      NORAD: {sat.noradId}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300 truncate max-w-[140px]">
                    {sat.operator}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {sat.country}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-900 border border-slate-700 text-cyan-300 font-semibold">
                      {sat.orbitType}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">
                    {sat.altitudeKm.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono text-purple-300">
                    {sat.velocityKmS}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      sat.status === 'Active' 
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}>
                      {sat.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => toggleCompare(sat)}
                        className={`p-1.5 rounded-lg border text-xs ${
                          isCompared 
                            ? 'bg-purple-600 text-white border-purple-400' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-purple-300'
                        }`}
                        title="Compare"
                      >
                        <Layers className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedSatellite(sat)}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300"
                        title="View details"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
