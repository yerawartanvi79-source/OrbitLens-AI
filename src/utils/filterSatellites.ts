import { Satellite, FilterOptions } from '../types';

export interface FilterStepResult {
  step: string;
  count: number;
  satellites: Satellite[];
}

export interface RemovedSatelliteInfo {
  satelliteId: string;
  satelliteName: string;
  filterStep: string;
  reason: string;
}

export interface FilterDebugInfo {
  totalLoaded: number;
  afterSearch: number;
  steps: FilterStepResult[];
  removedSatellites: RemovedSatelliteInfo[];
}

export interface FilterSatellitesResult {
  filtered: Satellite[];
  debugInfo: FilterDebugInfo;
}

/**
 * Normalizes orbit filter string.
 * Maps UI labels like "LEO (Low Earth)" -> "LEO", "SSO (Sun-Sync)" -> "SSO", etc.
 */
export function normalizeOrbit(val?: string | null): string | null {
  if (!val) return null;
  const clean = val.trim().toLowerCase();
  if (!clean || clean === 'all') return null;

  if (clean.includes('leo') || clean.includes('low earth')) return 'LEO';
  if (clean.includes('sso') || clean.includes('sun-sync')) return 'SSO';
  if (clean.includes('meo') || clean.includes('medium earth')) return 'MEO';
  if (clean.includes('geo') || clean.includes('geostationary')) return 'GEO';
  if (clean.includes('lagrange') || clean.includes('l1') || clean.includes('l2')) return 'Lagrange';
  if (clean.includes('heo') || clean.includes('highly elliptical')) return 'HEO';

  // Fallback to uppercase
  return val.trim().toUpperCase();
}

/**
 * Normalizes operational status filter string.
 * Maps UI labels like "Operational Active" -> "Active", etc.
 */
export function normalizeStatus(val?: string | null): string | null {
  if (!val) return null;
  const clean = val.trim().toLowerCase();
  if (!clean || clean === 'all') return null;

  if (clean.includes('active') || clean.includes('operational')) return 'Active';
  if (clean.includes('decommission')) return 'Decommissioned';
  if (clean.includes('decay')) return 'Decaying';
  if (clean.includes('transit')) return 'In Transit';

  return val.trim();
}

/**
 * Normalizes category filter string.
 */
export function normalizeCategory(val?: string | null): string | null {
  if (!val) return null;
  const clean = val.trim().toLowerCase();
  if (!clean || clean === 'all') return null;

  if (clean.includes('earth obs')) return 'Earth Observation';
  if (clean.includes('comm')) return 'Communications';
  if (clean.includes('nav') || clean.includes('gnss')) return 'Navigation / GNSS';
  if (clean.includes('science') || clean.includes('astro')) return 'Space Science & Astronomy';
  if (clean.includes('weather') || clean.includes('climate') || clean.includes('meteorol')) return 'Weather & Meteorology';
  if (clean.includes('station') || clean.includes('crewed')) return 'Space Station & Crewed';
  if (clean.includes('tech') || clean.includes('demo')) return 'Technology Demonstration';
  if (clean.includes('milit') || clean.includes('defense')) return 'Military & Defense';

  return clean;
}

/**
 * Normalizes country filter string.
 */
export function normalizeCountry(val?: string | null): string | null {
  if (!val) return null;
  const clean = val.trim().toLowerCase();
  if (!clean || clean === 'all') return null;

  // Handle common aliases like United States -> USA
  if (clean === 'united states' || clean === 'united states of america' || clean === 'us') {
    return 'usa';
  }
  return clean;
}

/**
 * Normalizes operator filter string.
 */
export function normalizeOperator(val?: string | null): string | null {
  if (!val) return null;
  const clean = val.trim().toLowerCase();
  if (!clean || clean === 'all') return null;
  return clean;
}

/**
 * Checks if satellite operator matches filter query (case-insensitive, trimmed, partial match).
 */
export function matchesOperator(satelliteOperator: string, operatorFilter: string): boolean {
  const normFilter = normalizeOperator(operatorFilter);
  if (!normFilter) return true;

  const opLower = satelliteOperator.trim().toLowerCase();

  // Direct substring match
  if (opLower.includes(normFilter)) return true;

  // Handle common operator acronym expansion or parenthetical mapping
  // e.g., filter: "isro", satellite: "Indian Space Research Organisation (ISRO)" -> already matched by includes!
  // e.g., filter: "nasa", satellite: "National Aeronautics and Space Administration" -> handle acronym
  const acronymMap: Record<string, string[]> = {
    isro: ['indian space research organisation', 'isro'],
    nasa: ['national aeronautics and space administration', 'nasa'],
    esa: ['european space agency', 'esa', 'euspa'],
    noaa: ['national oceanic and atmospheric administration', 'noaa'],
    jaxa: ['japan aerospace exploration agency', 'jaxa'],
    cnsa: ['china national space administration', 'cnsa', 'cmsa', 'china manned space'],
  };

  const aliases = acronymMap[normFilter];
  if (aliases) {
    return aliases.some(alias => opLower.includes(alias));
  }

  return false;
}

/**
 * Checks if satellite country matches filter query (case-insensitive, trimmed, partial match).
 */
export function matchesCountry(satelliteCountry: string, countryFilter: string): boolean {
  const normFilter = normalizeCountry(countryFilter);
  if (!normFilter) return true;

  const satCountryLower = satelliteCountry.trim().toLowerCase();

  // Direct substring match (e.g. "India" matches "India" and "India / France")
  if (satCountryLower.includes(normFilter)) return true;

  // Special alias handling: "usa" matches "usa" or "united states"
  if (normFilter === 'usa' || normFilter === 'united states') {
    return satCountryLower.includes('usa') || satCountryLower.includes('united states');
  }

  // "europe" or "european" matches "european union", "europe", "eu"
  if (normFilter.includes('europe') || normFilter === 'eu') {
    return satCountryLower.includes('europe') || satCountryLower.includes('eu');
  }

  return false;
}

/**
 * Checks if satellite matches search query.
 * Searches: satellite name, NORAD ID, operator, purpose, category, constellation.
 */
export function matchesSearch(satellite: Satellite, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  // Name match
  if (satellite.name.trim().toLowerCase().includes(q)) return true;

  // NORAD ID match
  if (satellite.noradId.toString().includes(q)) return true;

  // Operator match (partial)
  if (satellite.operator.trim().toLowerCase().includes(q)) return true;

  // Purpose match
  if (satellite.purpose.trim().toLowerCase().includes(q)) return true;

  // Category match
  if (satellite.category.trim().toLowerCase().includes(q)) return true;

  // Constellation match
  if (satellite.constellation && satellite.constellation.trim().toLowerCase().includes(q)) return true;

  return false;
}

/**
 * Core filtering function with normalization, partial matching, and complete step-by-step debug tracking.
 */
export function filterSatellites(
  satellites: Satellite[],
  filters: Partial<FilterOptions> = {},
  isFavoriteFn?: (id: string) => boolean
): FilterSatellitesResult {
  const totalLoaded = satellites.length;
  const removedSatellites: RemovedSatelliteInfo[] = [];

  // Step 1: Search query filter
  let currentList = satellites;
  const rawSearch = filters.searchQuery || '';
  if (rawSearch.trim()) {
    const afterSearchList: Satellite[] = [];
    for (const sat of currentList) {
      if (matchesSearch(sat, rawSearch)) {
        afterSearchList.push(sat);
      } else {
        removedSatellites.push({
          satelliteId: sat.id,
          satelliteName: sat.name,
          filterStep: 'Search Query',
          reason: `Did not match query "${rawSearch.trim()}" across name, NORAD, operator, purpose, category, constellation`,
        });
      }
    }
    currentList = afterSearchList;
  }
  const afterSearchCount = currentList.length;

  const steps: FilterStepResult[] = [
    { step: 'After Search', count: afterSearchCount, satellites: [...currentList] }
  ];

  // Step 2: Orbit filter
  const normOrbit = normalizeOrbit(filters.orbitType);
  if (normOrbit) {
    const nextList: Satellite[] = [];
    for (const sat of currentList) {
      if (sat.orbitType.toUpperCase() === normOrbit.toUpperCase()) {
        nextList.push(sat);
      } else {
        removedSatellites.push({
          satelliteId: sat.id,
          satelliteName: sat.name,
          filterStep: 'Orbit Filter',
          reason: `Orbit ${sat.orbitType} does not match required orbit ${normOrbit}`,
        });
      }
    }
    currentList = nextList;
    steps.push({ step: 'After Orbit Filter', count: currentList.length, satellites: [...currentList] });
  }

  // Step 3: Country filter
  const normCountry = normalizeCountry(filters.country);
  if (normCountry) {
    const nextList: Satellite[] = [];
    for (const sat of currentList) {
      if (matchesCountry(sat.country, normCountry)) {
        nextList.push(sat);
      } else {
        removedSatellites.push({
          satelliteId: sat.id,
          satelliteName: sat.name,
          filterStep: 'Country Filter',
          reason: `Country "${sat.country}" does not match required country "${normCountry}"`,
        });
      }
    }
    currentList = nextList;
    steps.push({ step: 'After Country Filter', count: currentList.length, satellites: [...currentList] });
  }

  // Step 4: Operator filter
  const normOperator = normalizeOperator(filters.operator);
  if (normOperator) {
    const nextList: Satellite[] = [];
    for (const sat of currentList) {
      if (matchesOperator(sat.operator, normOperator)) {
        nextList.push(sat);
      } else {
        removedSatellites.push({
          satelliteId: sat.id,
          satelliteName: sat.name,
          filterStep: 'Operator Filter',
          reason: `Operator "${sat.operator}" does not contain "${normOperator}"`,
        });
      }
    }
    currentList = nextList;
    steps.push({ step: 'After Operator Filter', count: currentList.length, satellites: [...currentList] });
  }

  // Step 5: Category filter
  const normCategory = normalizeCategory(filters.category);
  if (normCategory) {
    const nextList: Satellite[] = [];
    for (const sat of currentList) {
      const satCatLower = sat.category.trim().toLowerCase();
      const normCatLower = normCategory.trim().toLowerCase();
      if (satCatLower.includes(normCatLower) || normCatLower.includes(satCatLower)) {
        nextList.push(sat);
      } else {
        removedSatellites.push({
          satelliteId: sat.id,
          satelliteName: sat.name,
          filterStep: 'Category Filter',
          reason: `Category "${sat.category}" does not match "${normCategory}"`,
        });
      }
    }
    currentList = nextList;
    steps.push({ step: 'After Category Filter', count: currentList.length, satellites: [...currentList] });
  }

  // Step 6: Status filter
  const normStatus = normalizeStatus(filters.status);
  if (normStatus) {
    const nextList: Satellite[] = [];
    for (const sat of currentList) {
      if (sat.status.toLowerCase() === normStatus.toLowerCase()) {
        nextList.push(sat);
      } else {
        removedSatellites.push({
          satelliteId: sat.id,
          satelliteName: sat.name,
          filterStep: 'Status Filter',
          reason: `Status "${sat.status}" does not match "${normStatus}"`,
        });
      }
    }
    currentList = nextList;
    steps.push({ step: 'After Status Filter', count: currentList.length, satellites: [...currentList] });
  }

  // Step 7: Favorites filter
  if (filters.onlyFavorites && isFavoriteFn) {
    const nextList: Satellite[] = [];
    for (const sat of currentList) {
      if (isFavoriteFn(sat.id)) {
        nextList.push(sat);
      } else {
        removedSatellites.push({
          satelliteId: sat.id,
          satelliteName: sat.name,
          filterStep: 'Favorites Filter',
          reason: 'Satellite is not marked as favorite',
        });
      }
    }
    currentList = nextList;
    steps.push({ step: 'After Favorites Filter', count: currentList.length, satellites: [...currentList] });
  }

  return {
    filtered: currentList,
    debugInfo: {
      totalLoaded,
      afterSearch: afterSearchCount,
      steps,
      removedSatellites,
    },
  };
}
