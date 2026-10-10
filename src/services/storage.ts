import { ChatMessage } from '../types';

const FAVORITES_KEY = 'orbitlens_favorites';
const RECENT_SEARCHES_KEY = 'orbitlens_recent_searches';
const CHAT_HISTORY_KEY = 'orbitlens_chat_history';
const SETTINGS_KEY = 'orbitlens_settings';

export interface AppSettings {
  theme: 'dark' | 'light';
  apiKey?: string;
  apiProvider?: 'local' | 'gemini' | 'openai';
  soundEnabled: boolean;
  reducedMotion: boolean;
}

export const getStoredFavorites = (): string[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : ['sat-25544', 'sat-50463', 'sat-20580'];
  } catch {
    return ['sat-25544', 'sat-50463'];
  }
};

export const saveStoredFavorites = (ids: string[]) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save favorites to localStorage', e);
  }
};

export const getStoredRecentSearches = (): string[] => {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? JSON.parse(raw) : ['Hubble', 'Starlink', 'ISS', 'Galileo', 'Cartosat'];
  } catch {
    return [];
  }
};

export const addRecentSearch = (query: string): string[] => {
  try {
    const clean = query.trim();
    if (!clean) return getStoredRecentSearches();
    const current = getStoredRecentSearches().filter(q => q.toLowerCase() !== clean.toLowerCase());
    const updated = [clean, ...current].slice(0, 8);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const clearStoredRecentSearches = () => {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (e) {
    console.error(e);
  }
};

export const getStoredChatHistory = (): ChatMessage[] => {
  try {
    const raw = localStorage.getItem(CHAT_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveStoredChatHistory = (history: ChatMessage[]) => {
  try {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history.slice(-30)));
  } catch (e) {
    console.error(e);
  }
};

export const clearStoredChatHistory = () => {
  try {
    localStorage.removeItem(CHAT_HISTORY_KEY);
  } catch (e) {
    console.error(e);
  }
};

export const getStoredSettings = (): AppSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return {
    theme: 'dark',
    apiProvider: 'local',
    soundEnabled: false,
    reducedMotion: false,
  };
};

export const saveStoredSettings = (settings: AppSettings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error(e);
  }
};
