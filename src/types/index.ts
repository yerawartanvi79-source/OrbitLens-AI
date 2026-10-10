export type OrbitType = 'LEO' | 'MEO' | 'GEO' | 'SSO' | 'HEO' | 'Lagrange';

export type OperationalStatus = 'Active' | 'Decaying' | 'Decommissioned' | 'In Transit';

export type SatelliteCategory = 
  | 'Earth Observation'
  | 'Communications'
  | 'Navigation / GNSS'
  | 'Space Science & Astronomy'
  | 'Weather & Meteorology'
  | 'Space Station & Crewed'
  | 'Technology Demonstration'
  | 'Military & Defense';

export interface Satellite {
  id: string;
  name: string;
  noradId: number;
  intlDesignator: string;
  operator: string;
  country: string;
  countryCode: string;
  launchDate: string;
  launchSite: string;
  launchVehicle: string;
  orbitType: OrbitType;
  altitudeKm: number; // Mean altitude
  apogeeKm: number;
  perigeeKm: number;
  velocityKmS: number; // km/s
  inclinationDeg: number; // inclination angle
  orbitalPeriodMin: number; // minutes per orbit
  category: SatelliteCategory;
  purpose: string;
  status: OperationalStatus;
  massKg?: number;
  powerWatts?: number;
  expectedDecayDate?: string;
  description: string;
  constellation?: string;
  isFavorite?: boolean;
}

export interface ISSLiveLocation {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility: 'daylight' | 'eclipsed';
  timestamp: number;
  footprint: number;
}

export interface SpaceWeatherMetric {
  solarWindSpeedKmS: number;
  kpIndex: number;
  geomagneticActivity: 'Quiet' | 'Unsettled' | 'Active' | 'Minor Storm' | 'Severe Storm';
  sunspotCount: number;
  lastFlare: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  category?: string;
  followUpSuggestions?: string[];
  isStreaming?: boolean;
}

export type ViewTab = 'home' | 'dashboard' | 'explorer' | 'assistant' | 'analytics' | 'about';

export type AIComplexityLevel = 'beginner' | 'student' | 'researcher';

export interface FilterOptions {
  searchQuery: string;
  country: string;
  orbitType: string;
  operator: string;
  category: string;
  status: string;
  onlyFavorites: boolean;
}
