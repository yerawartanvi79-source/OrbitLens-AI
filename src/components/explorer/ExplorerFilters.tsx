import React from 'react';
import { 
  Search, 
  X, 
  Filter, 
  RotateCcw, 
  Star, 
  LayoutGrid, 
  TableProperties, 
  Clock, 
  Trash2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ExplorerFiltersProps {
  viewMode: 'grid' | 'table';
  setViewMode: (mode: 'grid' | 'table') => void;
  resultCount: number;
}

export const ExplorerFilters: React.FC<ExplorerFiltersProps> = ({
  viewMode,
  setViewMode,
  resultCount,
}) => {
  const { 
    filterOptions, 
    setFilterOptions, 
    recentSearches, 
    addSearchTerm, 
    clearSearches 
  } = useApp();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filterOptions.searchQuery.trim()) {
      addSearchTerm(filterOptions.searchQuery);
    }
  };

  const handleApplyRecent = (term: string) => {
    setFilterOptions(prev => ({ ...prev, searchQuery: term }));
  };

  const resetFilters = () => {
    setFilterOptions({
      searchQuery: '',
      country: 'ALL',
      orbitType: 'ALL',
      operator: 'ALL',
      category: 'ALL',
      status: 'ALL',
      onlyFavorites: false,
    });
  };

  const hasActiveFilters = 
    filterOptions.searchQuery !== '' ||
    filterOptions.country !== 'ALL' ||
    filterOptions.orbitType !== 'ALL' ||
    filterOptions.operator !== 'ALL' ||
    filterOptions.category !== 'ALL' ||
    filterOptions.status !== 'ALL' ||
    filterOptions.onlyFavorites;

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
      {/* Search Bar & Primary Toggles */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filterOptions.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by satellite name, NORAD ID, operator, or payload..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-500/50 focus:outline-none text-sm text-slate-100 placeholder-slate-500 shadow-inner"
          />
          {filterOptions.searchQuery && (
            <button
              type="button"
              onClick={() => setFilterOptions(prev => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        <div className="flex items-center gap-2 shrink-0">
          {/* Favorite filter toggle */}
          <button
            onClick={() => setFilterOptions(prev => ({ ...prev, onlyFavorites: !prev.onlyFavorites }))}
            className={`px-3 py-2.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
              filterOptions.onlyFavorites
                ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filterOptions.onlyFavorites ? 'fill-amber-400' : ''}`} />
            <span>Favorites</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Density Table View"
            >
              <TableProperties className="w-4 h-4" />
            </button>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="px-3 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 text-xs flex items-center gap-1 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Recent Searches Tags */}
      {recentSearches.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 shrink-0">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>Recent:</span>
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {recentSearches.map((term, i) => (
              <button
                key={i}
                onClick={() => handleApplyRecent(term)}
                className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-[11px] transition-colors"
              >
                {term}
              </button>
            ))}
            <button
              onClick={clearSearches}
              className="text-[10px] text-slate-400 hover:text-rose-400 ml-1 p-0.5"
              title="Clear search history"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Filter Select Dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-slate-800/80">
        {/* Orbit Type */}
        <div>
          <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Orbit Type</label>
          <select
            value={filterOptions.orbitType}
            onChange={e => setFilterOptions(prev => ({ ...prev, orbitType: e.target.value }))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="ALL">All Orbits</option>
            <option value="LEO">LEO (Low Earth)</option>
            <option value="SSO">SSO (Sun-Sync)</option>
            <option value="MEO">MEO (Medium Earth)</option>
            <option value="GEO">GEO (Geostationary)</option>
            <option value="Lagrange">Lagrange (L1/L2)</option>
            <option value="HEO">HEO (Highly Elliptical)</option>
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Country / Agency</label>
          <select
            value={filterOptions.country}
            onChange={e => setFilterOptions(prev => ({ ...prev, country: e.target.value }))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="ALL">All Nations</option>
            <option value="USA">United States</option>
            <option value="International">International</option>
            <option value="European">European Union</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="Japan">Japan</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Russia">Russia</option>
          </select>
        </div>

        {/* Operator */}
        <div>
          <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Operator</label>
          <select
            value={filterOptions.operator}
            onChange={e => setFilterOptions(prev => ({ ...prev, operator: e.target.value }))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="ALL">All Operators</option>
            <option value="SpaceX">SpaceX</option>
            <option value="NASA">NASA</option>
            <option value="ESA">ESA</option>
            <option value="ISRO">ISRO</option>
            <option value="NOAA">NOAA</option>
            <option value="Planet">Planet Labs</option>
            <option value="OneWeb">OneWeb</option>
            <option value="Iridium">Iridium</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Category</label>
          <select
            value={filterOptions.category}
            onChange={e => setFilterOptions(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="ALL">All Categories</option>
            <option value="Communications">Communications</option>
            <option value="Earth Observation">Earth Observation</option>
            <option value="Navigation / GNSS">Navigation / GNSS</option>
            <option value="Space Science & Astronomy">Science & Astronomy</option>
            <option value="Weather & Meteorology">Weather & Climate</option>
            <option value="Space Station & Crewed">Space Station</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Status</label>
          <select
            value={filterOptions.status}
            onChange={e => setFilterOptions(prev => ({ ...prev, status: e.target.value }))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Operational Active</option>
            <option value="Decommissioned">Decommissioned</option>
          </select>
        </div>
      </div>

      {/* Result Count Status Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
        <span>Displaying {resultCount} satellites matching criteria</span>
        {hasActiveFilters && (
          <span className="text-cyan-400">Filters applied</span>
        )}
      </div>
    </div>
  );
};
