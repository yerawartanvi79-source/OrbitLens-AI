import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Satellite, ISSLiveLocation, ViewTab, FilterOptions } from '../types';
import { apiService } from '../services/api';
import { 
  getStoredFavorites, 
  saveStoredFavorites, 
  getStoredRecentSearches, 
  addRecentSearch, 
  clearStoredRecentSearches,
  getStoredSettings,
  saveStoredSettings
} from '../services/storage';
import { sounds } from './soundFx';

interface AppContextType {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  satellites: Satellite[];
  isLoadingSatellites: boolean;
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  selectedSatellite: Satellite | null;
  setSelectedSatellite: (sat: Satellite | null) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  recentSearches: string[];
  addSearchTerm: (query: string) => void;
  clearSearches: () => void;
  issLocation: ISSLiveLocation | null;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  compareList: Satellite[];
  toggleCompare: (sat: Satellite) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isShortcutsModalOpen: boolean;
  setIsShortcutsModalOpen: (open: boolean) => void;
}

const initialFilters: FilterOptions = {
  searchQuery: '',
  country: 'ALL',
  orbitType: 'ALL',
  operator: 'ALL',
  category: 'ALL',
  status: 'ALL',
  onlyFavorites: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<ViewTab>('home');
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [isLoadingSatellites, setIsLoadingSatellites] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(initialFilters);
  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(null);
  const [favorites, setFavorites] = useState<string[]>(getStoredFavorites);
  const [recentSearches, setRecentSearches] = useState<string[]>(getStoredRecentSearches);
  const [issLocation, setIssLocation] = useState<ISSLiveLocation | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => getStoredSettings().theme || 'dark');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => getStoredSettings().soundEnabled || false);
  const [compareList, setCompareList] = useState<Satellite[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);

  // Sync sounds state
  useEffect(() => {
    sounds.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Apply theme to HTML root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    const current = getStoredSettings();
    saveStoredSettings({ ...current, theme });
  }, [theme]);

  const setActiveTab = (tab: ViewTab) => {
    sounds.playClick();
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    sounds.playClick();
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.setEnabled(next);
    if (next) sounds.playRadar();
    const current = getStoredSettings();
    saveStoredSettings({ ...current, soundEnabled: next });
  };

  // Load satellites
  useEffect(() => {
    let mounted = true;
    setIsLoadingSatellites(true);
    apiService.getSatellites().then(data => {
      if (mounted) {
        setSatellites(data);
        setIsLoadingSatellites(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Poll ISS Location
  useEffect(() => {
    let mounted = true;
    const updateISS = async () => {
      const pos = await apiService.getISSLivePosition();
      if (mounted) {
        setIssLocation(pos);
      }
    };

    updateISS();
    const interval = setInterval(updateISS, 5000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    sounds.playClick();
    setFavorites(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(fId => fId !== id) : [...prev, id];
      saveStoredFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const addSearchTerm = useCallback((term: string) => {
    const updated = addRecentSearch(term);
    setRecentSearches(updated);
  }, []);

  const clearSearches = useCallback(() => {
    clearStoredRecentSearches();
    setRecentSearches([]);
  }, []);

  const toggleCompare = useCallback((sat: Satellite) => {
    sounds.playClick();
    setCompareList(prev => {
      const exists = prev.some(s => s.id === sat.id);
      if (exists) {
        return prev.filter(s => s.id !== sat.id);
      }
      if (prev.length >= 2) {
        return [prev[1], sat]; // keep last and add new
      }
      return [...prev, sat];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    sounds.playClick();
    setCompareList(prev => prev.filter(s => s.id !== id));
  }, []);

  const clearCompare = useCallback(() => {
    sounds.playClick();
    setCompareList([]);
  }, []);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K: Open Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sounds.playOpen();
        setIsCommandPaletteOpen(prev => !prev);
        return;
      }

      // Escape: Close open modals
      if (e.key === 'Escape') {
        if (isCommandPaletteOpen) setIsCommandPaletteOpen(false);
        if (isShortcutsModalOpen) setIsShortcutsModalOpen(false);
        if (isCompareModalOpen) setIsCompareModalOpen(false);
        if (selectedSatellite) setSelectedSatellite(null);
        return;
      }

      // '?' key: Show shortcuts modal when not in input
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        sounds.playOpen();
        setIsShortcutsModalOpen(prev => !prev);
        return;
      }

      // Number keys 1-6 for tab switching when not in input/textarea
      if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName) && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const keyMap: Record<string, ViewTab> = {
          '1': 'home',
          '2': 'dashboard',
          '3': 'explorer',
          '4': 'assistant',
          '5': 'analytics',
          '6': 'about',
        };
        if (keyMap[e.key]) {
          e.preventDefault();
          setActiveTab(keyMap[e.key]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, isShortcutsModalOpen, isCompareModalOpen, selectedSatellite]);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        satellites,
        isLoadingSatellites,
        filterOptions,
        setFilterOptions,
        selectedSatellite,
        setSelectedSatellite,
        favorites,
        toggleFavorite,
        isFavorite,
        recentSearches,
        addSearchTerm,
        clearSearches,
        issLocation,
        theme,
        toggleTheme,
        soundEnabled,
        toggleSound,
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isShortcutsModalOpen,
        setIsShortcutsModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
