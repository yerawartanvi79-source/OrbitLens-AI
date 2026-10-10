# OrbitLens AI – Space Intelligence & Analytics Platform

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js&logoColor=white)](https://threejs.org/)

**OrbitLens AI** is an AI-powered space intelligence and astrodynamics platform designed for students, researchers, educators, and space enthusiasts. It combines interactive 3D visualizations, satellite telemetry databases, deep space analytics, and an intelligent aerospace copilot into a modern, futuristic interface.

> ⚠️ **Educational & Analytical Notice:** OrbitLens AI is built solely for educational and analytical purposes. It does not provide mission-critical flight navigation, tactical defense guidance, or official aerospace launch predictions.

---

## 🚀 Key Features

### 1. 🪐 Interactive Home & 3D Orbital Earth
- **WebGL 3D Earth Globe**: Powered by Three.js with realistic shaders, starfields, and multi-orbit shells (LEO, MEO, GEO).
- **Interactive Orbit Paths**: Click & drag to rotate the globe and inspect satellite velocities.
- **Live Statistics Cards**: Real-time count of active satellites, cataloged space debris (>10cm), operational orbital shells, and ISS speed.
- **NASA APOD Cosmic Highlight**: Real-time Astronomy Picture of the Day with deep-space explanations.

### 2. 📊 Space Operations Dashboard
- **Live ISS Real-Time Tracker**: Real-time latitude, longitude, velocity (~27,600 km/h), and an animated 2D Mercator ground track projection.
- **Space Weather & Solar Activity**: Live tracking of solar wind speed, planetary Kp-index, solar flare activity, and thermospheric drag alerts.
- **Orbit Distribution**: Interactive Recharts donut visualization of satellites across LEO, MEO, GEO, SSO, and Lagrange orbits.
- **Country-Wise Fleet**: Comparative national asset distribution across the USA, China, EU/ESA, India, Russia, Japan, and the UK.
- **Constellation Growth & Launch Timelines**: Decadal surge in launches and orbital deployments from 2016 to 2026.

### 3. 🛰️ Satellite Explorer & Radar
- **Multi-Parameter Filtering**: Filter satellites by Country, Orbit Type (LEO, MEO, GEO, SSO, HEO, Lagrange), Operator, Category, and Operational Status.
- **Quick Search & Recent History**: Instant search across satellite names, NORAD catalog IDs, and mission purposes with persistent recent search history.
- **Detailed Telemetry Dossier**: Modal with perigee/apogee altitudes, orbital period, inclination angle, launch vehicle, launch site, wet mass, solar array power, and Keplerian 2D orbit profile canvas.
- **Side-by-Side Satellite Comparison**: Benchmark any two spacecraft simultaneously with an interactive parameter matrix and astrodynamics delta insight.
- **Favorite Bookmarks**: Star satellites to save them locally for quick one-click filtering.
- **Dual View Modes**: Switch between responsive Glassmorphic Cards and High-Density Data Table.

### 4. 🤖 AstroAI Space Intelligence Copilot
- **Specialized Physics Knowledge**: Explains:
  - **Orbital Mechanics**: Kepler's laws, Hohmann transfer orbits, delta-v, Lagrange points (L1–L5), orbital decay.
  - **Satellites**: LEO vs GEO tradeoffs, CubeSats, mega-constellations, communication payloads.
  - **Black Holes**: Event horizons, singularities, Hawking radiation, supermassive black holes, gravitational lensing.
  - **Rockets & Propulsion**: Specific impulse ($I_{\text{sp}}$), staging, Tsiolkovsky equation, Methalox vs Keralox, ion thrusters.
  - **Space Missions**: Apollo, Artemis, James Webb Space Telescope (JWST), Voyager 1 & 2, Mars rovers.
  - **Stars & Supernovae**: Nuclear fusion, Chandrasekhar limit, neutron stars, magnetars, stellar lifecycle.
  - **Planets & Astronomy**: Exoplanet transit photometry, Europa subsurface oceans, dark matter, Cosmic Microwave Background (CMB).
- **Multi-Level Audience Adaptability**: Toggle between **Beginner** (plain English), **Student** (curriculum & equations), and **Researcher** (astrodynamics derivations).
- **Interactive Follow-ups**: Dynamic suggested follow-up chips generated after every response.
- **Conversation Persistence**: Full chat history saved in `localStorage`, with one-click export to Markdown (`.md`) and clear chat options.
- **Custom AI Engine Support**: Works out of the box with an intelligent built-in offline engine, or connect a personal Google Gemini API key in Settings.

### 5. 📈 Global Space Analytics & AI Insights
- **AI Analytical Summaries Under Every Chart**: Automated explanations of geopolitical trends, mega-constellation congestion, and launch cost reductions.
- **Mission Outcome Statistics**: Global launch success rates (94.2%), anomalies, and failure statistics.
- **Orbital Shell Congestion Risk**: Breakdown of debris and collision risk across altitude bands (200 km to 36,000 km).
- **One-Click PDF / Print Briefing Export**: Generate a printable aerospace intelligence briefing report.

### 6. 🎨 Futuristic Design & UX
- **Aerospace Color Palette**: Deep Space Blue (`#030712`, `#070d1e`), Purple (`#a855f7`), Cyan (`#06b6d4`), White text (`#f8fafc`).
- **Glassmorphism**: Translucent panels with glowing gradients and blurred backdrop filters.
- **Keyboard Shortcuts**:
  - `Ctrl + K`: Open Command Palette / Global Satellite Search
  - `1` – `6`: Fast navigation to Home, Dashboard, Explorer, AI Assistant, Analytics, About
  - `?`: Toggle Keyboard Shortcuts cheat sheet
  - `Esc`: Close any active dialog or modal
- **Synthesized Web Audio FX**: Subtle futuristic clicks and radar blips generated via the native browser Web Audio API (zero audio file dependencies).
- **Light / Dark Mode**: High-contrast theme toggle with persistence.

---

## 🛠️ Project Structure

```
OrbitLens AI/
├── index.html                     # Application entry HTML with dark theme & metadata
├── vite.config.ts                 # Vite bundler configuration with Tailwind CSS plugin
├── tsconfig.json                  # TypeScript project references
├── tsconfig.app.json              # TypeScript compilation configuration
├── package.json                   # Project dependencies and direct node runner scripts
└── src/
    ├── types/
    │   └── index.ts               # Core TypeScript definitions (Satellite, OrbitType, ISSLocation, etc.)
    ├── data/
    │   ├── mockSatellites.ts      # Comprehensive satellite database (ISS, JWST, Starlink, GPS, etc.)
    │   ├── chartData.ts           # Analytics datasets & AI analytical insights
    │   └── knowledgeBase.ts       # Aerospace physics knowledge base for AstroAI
    ├── services/
    │   ├── api.ts                 # Space API service (ISS propagator, NASA APOD, filters)
    │   ├── aiService.ts           # Space intelligence reasoning engine + Gemini API key adapter
    │   ├── storage.ts             # LocalStorage manager (favorites, searches, chat history)
    │   └── pdfExport.ts           # Printable / PDF intelligence briefing generator
    ├── context/
    │   ├── AppContext.tsx         # Centralized state management & keyboard listeners
    │   └── soundFx.ts             # Web Audio API futuristic sound synthesizer
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.tsx         # Futuristic top bar with navigation, search, audio & theme
    │   │   ├── Footer.tsx         # Aerospace footer with public data credits and legal disclaimers
    │   │   ├── DisclaimerBanner.tsx # Top analytical & educational banner
    │   │   ├── GlassCard.tsx      # Reusable glassmorphism card component
    │   │   ├── CommandPalette.tsx # Global Ctrl+K command search palette
    │   │   └── KeyboardShortcutsModal.tsx # Keyboard navigation modal
    │   ├── home/
    │   │   ├── HomeView.tsx       # Home page orchestrator
    │   │   ├── HeroSection.tsx    # Hero section with primary CTAs
    │   │   ├── Earth3DCanvas.tsx  # Three.js 60fps 3D Earth Globe with orbital shells
    │   │   ├── LiveStatsBar.tsx   # Live telemetry KPI ribbon
    │   │   ├── FeatureGrid.tsx    # Platform capabilities grid
    │   │   └── AstronomyPhotoCard.tsx # NASA APOD cosmic highlight
    │   ├── dashboard/
    │   │   ├── DashboardOverview.tsx # Operations dashboard with interactive charts
    │   │   ├── IssLiveTracker.tsx # ISS real-time position & ground track canvas
    │   │   └── SpaceWeatherWidget.tsx # Solar wind and Kp-index space weather
    │   ├── explorer/
    │   │   ├── SatelliteExplorer.tsx # Catalog search, filters, and view toggles
    │   │   ├── ExplorerFilters.tsx   # Filter dropdowns & recent search tags
    │   │   ├── SatelliteCard.tsx     # Satellite card with orbital telemetry preview
    │   │   ├── SatelliteTable.tsx    # High-density sortable table view
    │   │   ├── SatelliteDetailModal.tsx # Complete satellite specs & 2D orbit profile
    │   │   ├── SatelliteCompareModal.tsx # Side-by-side comparison benchmark
    │   │   └── OrbitVisualizerCanvas.tsx # 2D Keplerian orbit animation canvas
    │   ├── assistant/
    │   │   ├── AIAssistant.tsx       # AI chat interface with complexity toggles
    │   │   ├── ChatMessage.tsx       # Markdown message renderer with LaTeX math
    │   │   └── SuggestedPrompts.tsx  # Categorized prompt cards for empty state
    │   ├── analytics/
    │   │   ├── AnalyticsView.tsx     # Visualizations & PDF export
    │   │   └── ChartAiSummary.tsx    # AI insights card positioned below each chart
    │   └── about/
    │       └── AboutView.tsx         # Project vision, public data feeds, and architecture
    ├── App.tsx                    # Root application component
    ├── main.tsx                   # React root entry point
    └── index.css                  # Tailwind CSS v4 & custom space styling
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended; verified on Node v24)
- **npm** (v9 or higher)

### Installation
```bash
# Clone or navigate to the project directory
cd "c:\Users\LENOVO\Desktop\OrbitLens AI – Space Intelligence & Analytics Platform"

# Install dependencies
npm run install (or npm install)
```

### Running Locally
To launch the development server:
```bash
npm run dev
```
Open your browser at **`http://localhost:5173/`**.

### Building for Production
To generate optimized production assets:
```bash
npm run build
```
The output will be placed in the `dist/` directory, ready for deployment to Vercel, Netlify, Cloudflare Pages, or AWS S3/CloudFront.

---

## 📡 Public Data Architecture

OrbitLens AI is designed with an interchangeable data provider layer (`src/services/api.ts`):
- **CelesTrak / Space-Track**: Two-Line Element (TLE) satellite ephemeris data.
- **WhereTheISS.at**: Real-time International Space Station coordinates and orbital footprint.
- **NASA Open APIs**: Astronomy Picture of the Day (APOD) and mission logs.
- **NOAA SWPC**: Space weather, solar wind, and geomagnetic Kp indices.

---

## 📄 License & Terms
Distributed under the MIT License. Developed for educational, research, and non-commercial analytical use.
