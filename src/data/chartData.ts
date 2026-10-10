export interface ChartSummary {
  headline: string;
  keyPoints: string[];
  takeaway: string;
}

export const ORBIT_DISTRIBUTION_DATA = [
  { name: 'LEO (Low Earth Orbit)', count: 8350, percentage: 81.5, color: '#06b6d4' },
  { name: 'GEO (Geostationary)', count: 590, percentage: 5.8, color: '#a855f7' },
  { name: 'SSO (Sun-Synchronous)', count: 820, percentage: 8.0, color: '#3b82f6' },
  { name: 'MEO (Medium Earth Orbit)', count: 215, percentage: 2.1, color: '#ec4899' },
  { name: 'HEO (Highly Elliptical)', count: 95, percentage: 0.9, color: '#f59e0b' },
  { name: 'Lagrange (L1/L2 Halos)', count: 42, percentage: 0.4, color: '#10b981' },
  { name: 'Other / Cislunar', count: 128, percentage: 1.3, color: '#8b5cf6' },
];

export const ORBIT_AI_SUMMARY: ChartSummary = {
  headline: "LEO Dominance and Megaconstellation Hyper-Growth",
  keyPoints: [
    "Low Earth Orbit (LEO, 200–2,000 km) now hosts over 81.5% of all functional satellites, primarily propelled by commercial broadband swarms (Starlink, OneWeb).",
    "Geostationary Orbit (GEO, ~35,786 km) remains critical for hemispheric telecommunications and geostationary weather monitoring, though its share has shifted relatively from 28% in 2012 to ~5.8% today due to LEO expansion.",
    "Sun-Synchronous Orbits (SSO) continue to host the world's most critical multispectral optical and synthetic aperture radar (SAR) Earth observation constellations.",
    "Lagrange points (L1 and L2) host flagship deep-space observatories like JWST and Gaia, immune to atmospheric interference and Earth thermal occlusion."
  ],
  takeaway: "Orbital crowding in LEO demands automated collision avoidance algorithms (Conjunction Assessment Risk Analysis) and rigorous 5-year post-mission disposal standards."
};

export const COUNTRY_LAUNCHES_DATA = [
  { country: 'United States', launches: 114, activeSats: 6240, flag: '🇺🇸', code: 'US' },
  { country: 'China', launches: 68, activeSats: 980, flag: '🇨🇳', code: 'CN' },
  { country: 'European Union / ESA', launches: 14, activeSats: 580, flag: '🇪🇺', code: 'EU' },
  { country: 'India (ISRO)', launches: 9, activeSats: 142, flag: '🇮🇳', code: 'IN' },
  { country: 'Russia (Roscosmos)', launches: 18, activeSats: 220, flag: '🇷🇺', code: 'RU' },
  { country: 'Japan (JAXA)', launches: 7, activeSats: 110, flag: '🇯🇵', code: 'JP' },
  { country: 'United Kingdom', launches: 4, activeSats: 690, flag: '🇬🇧', code: 'GB' },
  { country: 'Rest of World', launches: 12, activeSats: 278, flag: '🌐', code: 'GL' },
];

export const COUNTRY_AI_SUMMARY: ChartSummary = {
  headline: "Commercialization and Global Shift in Orbital Assets",
  keyPoints: [
    "The United States leads total orbital assets largely through private commercial entities (SpaceX, Amazon Kuiper, Planet Labs), operating over 60% of all registered active spacecraft.",
    "China maintains a strong cadence of sovereign orbital deployments via the Long March fleet, expanding BeiDou-3, the Tiangong space station modules, and the Guowang constellation.",
    "India's ISRO demonstrates world-class launch economy with the PSLV, LVM3, and SSLV platforms, capturing growing shares of commercial ride-shares alongside scientific milestones (Chandrayaan-3, Aditya-L1).",
    "European space strategy is re-centering around autonomous heavy-lift capability (Ariane 6) and sovereign multi-orbit secure communication infrastructure (IRIS²)."
  ],
  takeaway: "The global launch paradigm has transitioned from purely state-funded defense endeavors to high-cadence commercial orbital infrastructure."
};

export const SATELLITE_CATEGORIES_DATA = [
  { category: 'Communications', count: 6850, share: '66.9%', fill: '#06b6d4' },
  { category: 'Earth Observation', count: 1450, share: '14.2%', fill: '#3b82f6' },
  { category: 'Technology Demo', count: 620, share: '6.1%', fill: '#a855f7' },
  { category: 'Navigation / GNSS', count: 480, share: '4.7%', fill: '#ec4899' },
  { category: 'Military & Defense', count: 390, share: '3.8%', fill: '#ef4444' },
  { category: 'Space Science', count: 260, share: '2.5%', fill: '#10b981' },
  { category: 'Weather & Climate', count: 190, share: '1.8%', fill: '#f59e0b' },
];

export const CATEGORIES_AI_SUMMARY: ChartSummary = {
  headline: "The Communication & Connectivity Revolution",
  keyPoints: [
    "Two out of every three active satellites in space today serve orbital communications, providing high-throughput Internet, cellular backhaul, and emergency connectivity.",
    "Earth Observation is experiencing unprecedented growth through miniaturized CubeSat constellations equipped with hyper-spectral sensors and synthetic aperture radar (SAR).",
    "Science and exploratory missions represent approximately 2.5% of active payloads, yet contribute the highest per-mission scientific publications and fundamental physics discoveries."
  ],
  takeaway: "Miniaturization and standardized bus form-factors (e.g., 3U/6U/12U CubeSats) have democratized access to orbit for universities and startups."
};

export const LAUNCH_TIMELINE_DATA = [
  { year: '2016', orbitalLaunches: 85, commercialPercent: 32, satellitesDeployed: 220 },
  { year: '2017', orbitalLaunches: 90, commercialPercent: 41, satellitesDeployed: 440 },
  { year: '2018', orbitalLaunches: 114, commercialPercent: 48, satellitesDeployed: 480 },
  { year: '2019', orbitalLaunches: 102, commercialPercent: 52, satellitesDeployed: 510 },
  { year: '2020', orbitalLaunches: 114, commercialPercent: 61, satellitesDeployed: 1280 },
  { year: '2021', orbitalLaunches: 146, commercialPercent: 69, satellitesDeployed: 1810 },
  { year: '2022', orbitalLaunches: 186, commercialPercent: 74, satellitesDeployed: 2490 },
  { year: '2023', orbitalLaunches: 223, commercialPercent: 79, satellitesDeployed: 2890 },
  { year: '2024', orbitalLaunches: 254, commercialPercent: 82, satellitesDeployed: 3150 },
  { year: '2025', orbitalLaunches: 285, commercialPercent: 85, satellitesDeployed: 3620 },
  { year: '2026 (Est.)', orbitalLaunches: 310, commercialPercent: 88, satellitesDeployed: 4100 },
];

export const TIMELINE_AI_SUMMARY: ChartSummary = {
  headline: "Exponential Surge Driven by Reusable Rocketry",
  keyPoints: [
    "Annual satellite deployments increased by over 1,500% between 2016 and 2026, transitioning from hundreds of spacecraft per year to thousands.",
    "Rapid booster reusability (Falcon 9 flight flight-proven boosters exceeding 20+ turnarounds) dropped the cost per kilogram to LEO from ~$10,000/kg to under $1,500/kg.",
    "Rideshare architectures (e.g., SpaceX Transporter missions, ISRO SSLV) enable dozens of academic CubeSats and commercial micro-satellites to hitchhike in a single mission."
  ],
  takeaway: "The space sector is operating at an unprecedented launch tempo, necessitating next-generation space traffic management (STM) frameworks."
};

export const MISSION_STATS_DATA = [
  { status: 'Successful Missions', count: 268, rate: '94.2%', fill: '#10b981' },
  { status: 'Partial Success (Anomalies)', count: 11, rate: '3.8%', fill: '#f59e0b' },
  { status: 'Launch Failures', count: 6, rate: '2.0%', fill: '#ef4444' },
];

export const CONGESTION_BY_ALTITUDE_DATA = [
  { altitudeBand: '200-400 km', sats: 420, debris: 1200, status: 'Self-Cleaning (High Drag)' },
  { altitudeBand: '400-600 km', sats: 6850, debris: 4800, status: 'Peak Congestion (Megaconstellations)' },
  { altitudeBand: '600-800 km', sats: 1450, debris: 8200, status: 'Severe Debris Concentration' },
  { altitudeBand: '800-1000 km', sats: 620, debris: 11400, status: 'High Collision Risk' },
  { altitudeBand: '1000-1500 km', sats: 380, debris: 4100, status: 'Moderate Stability' },
  { altitudeBand: '20000 km (MEO)', count: 215, debris: 600, status: 'Navigation Core' },
  { altitudeBand: '35786 km (GEO)', count: 590, debris: 1800, status: 'Equatorial Arc' },
];
