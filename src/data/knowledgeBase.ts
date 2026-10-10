export interface SpaceTopicResponse {
  topic: string;
  keywords: string[];
  beginnerSummary: string;
  detailedExplanation: string;
  advancedFormulasAndConcepts: string;
  keyTakeaways: string[];
  suggestedFollowUps: string[];
}

export const SPACE_KNOWLEDGE_BASE: SpaceTopicResponse[] = [
  {
    topic: "Orbital Mechanics & How Satellites Stay in Orbit",
    keywords: ["orbit", "orbital mechanics", "stay in orbit", "gravity", "centripetal", "velocity", "kepler", "hohmann", "delta v", "lagrange", "escape velocity"],
    beginnerSummary: "A satellite stays in orbit because it is essentially in constant free-fall toward Earth, but moving forward so fast that as it falls, the Earth's surface curves away beneath it at the exact same rate! It never hits the ground.",
    detailedExplanation: `### The Physics of Orbital Motion

Sir Isaac Newton proposed the famous thought experiment: **Newton's Cannonball**. If you fire a cannon from a tall mountaintop horizontally, gravity pulls the projectile down. If you increase the gunpowder charge, the projectile lands further. Eventually, at approximately **7.8 km/s (28,000 km/h or 17,500 mph)**, the curve of the cannonball's fall matches the curvature of the Earth (Earth drops ~5 meters every 8 kilometers).

#### Kepler's Three Laws of Planetary Motion:
1. **Law of Ellipses**: All orbits are ellipses with the central body (Earth or Sun) located at one of the two focal points.
2. **Law of Equal Areas**: A line segment joining a satellite and its central body sweeps out equal areas during equal intervals of time (satellites move faster at **perigee** and slower at **apogee**).
3. **Harmonic Law**: The square of the orbital period ($T^2$) is directly proportional to the cube of the semi-major axis ($a^3$):
$$T^2 = \\frac{4\\pi^2}{GM} a^3$$

#### Orbital Transfer Maneuvers:
To move from a low orbit to a higher orbit, spacecraft use a **Hohmann Transfer Orbit**, firing an engine burst ($\\Delta v_1$) to create an elliptical transfer path, followed by a second burn ($\\Delta v_2$) at apogee to circularize the new orbit.`,
    advancedFormulasAndConcepts: `**Orbital Velocity Formula:**
$$v = \\sqrt{\\frac{GM}{r}}$$
Where $G = 6.67430 \\times 10^{-11} \\text{ m}^3/(\\text{kg}\\cdot\\text{s}^2)$, $M_{\\text{Earth}} \\approx 5.972 \\times 10^{24} \\text{ kg}$, and $r = R_{\\text{Earth}} + h$.

**Vis-Viva Equation (General Elliptical Orbit Velocity):**
$$v^2 = GM \\left(\\frac{2}{r} - \\frac{1}{a}\\right)$$

**Lagrange Points (L1 to L5):**
Points of gravitational equilibrium where the gravitational pull of two large masses (e.g., Sun and Earth) equals the centripetal force required for a small object to orbit along with them. JWST orbits Sun-Earth L2 halo orbit ~1.5 million km from Earth.`,
    keyTakeaways: [
      "Satellites do not experience zero gravity; gravity is ~90% as strong at 400 km as on the ground.",
      "Weightlessness is caused by free-fall, not lack of gravity.",
      "Higher orbits have slower orbital speeds and longer orbital periods (LEO: 90 mins; GEO: 24 hours)."
    ],
    suggestedFollowUps: [
      "What is the difference between LEO and GEO orbits?",
      "How do Lagrange points work and why is JWST at L2?",
      "What causes orbital decay and how do satellites de-orbit?"
    ]
  },
  {
    topic: "Satellites & Orbital Regimes (LEO, MEO, GEO, SSO)",
    keywords: ["satellites", "satellite", "orbit types", "leo", "geo", "meo", "sso", "geostationary", "starlink", "cubesat", "constellation"],
    beginnerSummary: "Satellites are artificial machines placed into different altitude zones called orbits. Depending on their mission, they orbit close to Earth for fast internet and sharp photos (LEO), medium altitudes for GPS (MEO), or 35,786 km high to hover over one spot (GEO).",
    detailedExplanation: `### The Major Orbital Regimes

1. **LEO (Low Earth Orbit, 160 – 2,000 km):**
   - **Characteristics**: Fast velocity (~7.6 km/s), 90–120 minute orbital period, low signal latency (10–30 ms).
   - **Examples**: International Space Station (420 km), Hubble Space Telescope (535 km), Starlink constellation (550 km).
   - **Drawbacks**: Atmospheric drag causes orbit decay; satellites pass overhead in minutes requiring huge constellations for continuous global coverage.

2. **MEO (Medium Earth Orbit, 2,000 – 35,786 km):**
   - **Characteristics**: Orbital periods between 2 and 24 hours. Passes through the dangerous Van Allen radiation belts.
   - **Examples**: Global Navigation Satellite Systems: US GPS (20,180 km), European Galileo (23,222 km), Russian GLONASS (19,100 km).

3. **GEO (Geostationary / Geosynchronous Orbit, 35,786 km):**
   - **Characteristics**: Orbital period precisely equals Earth’s rotation (23 hours, 56 minutes, 4 seconds). Circular orbit over the equator.
   - **Advantage**: The satellite appears motionless relative to a spot on Earth, so ground dish antennas don't have to steer.
   - **Examples**: NOAA GOES weather satellites, satellite TV broadcast (DirecTV, SES).
   - **Drawbacks**: High latency (~500 ms roundtrip signal) and higher launch energy required.

4. **SSO (Sun-Synchronous Orbit, 600 – 800 km, ~98° inclination):**
   - **Characteristics**: Retrograde polar orbit where orbital plane precesses at the exact rate the Earth orbits the Sun (~0.9856°/day).
   - **Advantage**: Passes over any given spot on Earth at the exact same local solar time, ensuring identical sunlight shadows for Earth observation (Sentinel-2, Landsat).`,
    advancedFormulasAndConcepts: `**Geostationary Radius Derivation:**
Setting orbital period $T = 86,164.1 \\text{ s}$ (1 sidereal day):
$$r_{\\text{GEO}} = \\left(\\frac{GM T^2}{4\\pi^2}\\right)^{1/3} \\approx 42,164 \\text{ km}$$
Subtracting Earth mean radius ($6,371 \\text{ km}$), we get an altitude $h \\approx 35,793 \\text{ km}$.`,
    keyTakeaways: [
      "LEO is ideal for imaging and broadband internet.",
      "MEO is the sweet spot for global positioning constellations.",
      "GEO allows stationary antennas for telecommunications and full-disk weather monitoring.",
      "SSO provides consistent lighting angles for planetary science."
    ],
    suggestedFollowUps: [
      "How does GPS calculate user position from 4 satellites?",
      "Why are mega-constellations like Starlink launched in LEO rather than GEO?",
      "How do satellites maneuver without running out of propellant?"
    ]
  },
  {
    topic: "Black Holes, Event Horizons & Singularities",
    keywords: ["black hole", "event horizon", "singularity", "hawking radiation", "supermassive", "spaghettification", "schwarzschild", "general relativity", "gravitational lensing"],
    beginnerSummary: "A black hole is a region in space where matter is packed so tightly that gravity is overwhelmingly strong. Nothing—not even light, the fastest thing in the universe—can move fast enough to escape its gravitational pull once inside its boundary (the event horizon).",
    detailedExplanation: `### The Anatomy of a Black Hole

Predicted by Albert Einstein’s General Theory of Relativity in 1915 and first solved by Karl Schwarzschild in 1916.

1. **The Singularity:**
   At the center, all matter is crushed into an infinitesimally small point of infinite density (in classical physics), where our known laws of physics and spacetime curvature break down. Quantum gravity is required to explain what truly occurs here.

2. **The Event Horizon:**
   The ultimate point of no return. The boundary at which the escape velocity equals the speed of light ($c = 299,792 \\text{ km/s}$). Outside the event horizon, escape is possible with sufficient thrust; inside, all possible future spacetime geodesics lead toward the center.

3. **Accretion Disk & Relativistic Jets:**
   Matter falling toward a black hole spirals in, heating up to tens of millions of degrees due to friction and magnetic compression, emitting brilliant X-rays. Magnetic field lines twist at the poles to eject relativistic jets of plasma near the speed of light.

4. **Spaghettification:**
   Extreme gravitational tidal forces: the pull on your feet is so much stronger than the pull on your head that an infalling object is stretched vertically and compressed horizontally into a noodle-like string.`,
    advancedFormulasAndConcepts: `**Schwarzschild Radius ($R_s$):**
$$R_s = \\frac{2GM}{c^2}$$
For Earth to become a black hole, its entire mass would need to be compressed into a sphere with radius $R_s \\approx 9 \\text{ mm}$ (the size of a marble). For our Sun, $R_s \\approx 2.95 \\text{ km}$.

**Hawking Radiation:**
Discovered by Stephen Hawking in 1974. Quantum vacuum fluctuations near the event horizon produce virtual particle-antiparticle pairs. One falls in while the other escapes as thermal radiation, causing black holes to slowly lose mass and eventually evaporate:
$$T_H = \\frac{\\hbar c^3}{8\\pi G M k_B}$$
Temperature is inversely proportional to mass; stellar black holes evaporate over $\\sim 10^{67}$ years.`,
    keyTakeaways: [
      "Black holes are not cosmic vacuum cleaners; if our Sun were replaced by an equal-mass black hole, Earth's orbit would not change.",
      "Supermassive black holes (millions to billions of solar masses) reside at the center of almost all major galaxies (e.g., Sagittarius A* in the Milky Way).",
      "Gravitational time dilation causes time to run slower near the event horizon relative to a distant observer."
    ],
    suggestedFollowUps: [
      "What happens to time as you approach a black hole's event horizon?",
      "How did astronomers photograph Sagittarius A* and M87*?",
      "Can anything escape a black hole through quantum tunneling or Hawking radiation?"
    ]
  },
  {
    topic: "Rockets, Propulsion Systems & Space Launch",
    keywords: ["rocket", "rockets", "propulsion", "specific impulse", "isp", "thrust", "starship", "falcon 9", "sls", "ion engine", "chemical", "staging", "tsiolkovsky"],
    beginnerSummary: "Rockets work on Newton's Third Law of Motion: 'For every action, there is an equal and opposite reaction.' By burning fuel and blasting hot gas downward at hypersonic speeds, the rocket gets pushed upward with equal momentum.",
    detailedExplanation: `### The Physics of Rocket Launch

Unlike jet engines, rockets carry both their **fuel** (e.g., liquid methane, kerosene, liquid hydrogen) and their **oxidizer** (liquid oxygen - LOX), because there is no atmospheric oxygen in space.

#### The Rocket Equation (Tsiolkovsky's Law):
Formulated by Konstantin Tsiolkovsky in 1903, this fundamental equation governs spaceflight:
$$\\Delta v = I_{\\text{sp}} \\cdot g_0 \\cdot \\ln\\left(\\frac{m_0}{m_f}\\right)$$
Where:
- $\\Delta v$ = Maximum change in velocity achievable
- $I_{\\text{sp}}$ = **Specific Impulse** (efficiency of rocket engine in seconds)
- $g_0$ = Standard gravity ($9.80665 \\text{ m/s}^2$)
- $m_0$ = Initial wet mass (rocket + propellant)
- $m_f$ = Final dry mass (rocket without propellant)

#### Why Rockets Have Stages:
The rocket equation imposes the **tyranny of the rocket equation**: to get more velocity, you need exponentially more fuel, which makes the rocket heavier, requiring even more fuel. By discarding empty propellant tanks (staging), the rocket drops dead weight, dramatically increasing acceleration.

#### Types of Propulsion:
1. **Chemical (Hydrolox, Methalox, Keralox)**: High thrust, moderate efficiency ($I_{\\text{sp}} \\sim 300 - 450 \\text{ s}$). Essential for escaping Earth's gravity well.
2. **Electric / Ion Propulsion (Hall-effect thrusters)**: Low thrust (millinewtons), but phenomenal efficiency ($I_{\\text{sp}} \\sim 1,500 - 3,500 \\text{ s}$). Used on Starlink and deep-space probes (Dawn, BepiColombo).`,
    advancedFormulasAndConcepts: `**Thrust Formula:**
$$F = \\dot{m} v_e + (p_e - p_a) A_e$$
Where $\\dot{m}$ is mass flow rate, $v_e$ is exhaust velocity, $p_e$ is exit pressure, and $p_a$ is ambient atmospheric pressure.

**Modern Rocket Comparisons:**
- **SpaceX Falcon 9**: Two-stage reusable kerosene/LOX rocket; first stage lands autonomously.
- **SpaceX Starship**: Fully reusable two-stage super-heavy launcher using methalox Raptor full-flow staged combustion engines.
- **NASA SLS (Space Launch System)**: Heavy-lift core powered by 4 RS-25 engines + solid rocket boosters for Artemis lunar missions.`,
    keyTakeaways: [
      "90% to 95% of a rocket's total launch pad mass is propellant.",
      "Methalox (methane + liquid oxygen) is favored for Mars exploration because methane can be synthesized on Mars (Sabatier reaction).",
      "Ion thrusters can operate continuously for months or years in deep space with minuscule propellant consumption."
    ],
    suggestedFollowUps: [
      "Why is methane (Methalox) replacing kerosene in modern rockets?",
      "How do ion thrusters generate thrust using noble gases like Xenon or Krypton?",
      "What is specific impulse (Isp) and why is it measured in seconds?"
    ]
  },
  {
    topic: "Space Missions (Apollo, Artemis, JWST, Voyager & Mars)",
    keywords: ["space missions", "missions", "artemis", "apollo", "jwst", "voyager", "perseverance", "curiosity", "mars", "moon landing", "new horizons"],
    beginnerSummary: "Space missions are robotic and crewed voyages beyond Earth. Iconic missions include Apollo (first humans on the Moon), Voyager (probes currently travelling in interstellar space), and the James Webb Space Telescope (observing the first galaxies).",
    detailedExplanation: `### Landmark Space Exploration Missions

1. **Apollo Program (1961–1972):**
   - **Apollo 11 (July 20, 1969)**: Neil Armstrong and Buzz Aldrin became the first humans to walk on the lunar surface.
   - Six crewed lunar landings brought back 382 kg of lunar rocks, revolutionizing our understanding of planetary evolution and the Giant Impact hypothesis.

2. **Artemis Program (Present - 2030s):**
   - NASA's international program to return humans to the Moon, including the first woman and first person of color, establishing a sustainable presence at the lunar South Pole.
   - Key components: SLS rocket, Orion spacecraft, Starship Human Landing System (HLS), and the lunar-orbiting **Gateway** station.

3. **James Webb Space Telescope (JWST):**
   - Launched Christmas Day 2021. Stationed at Sun-Earth L2, Webb uses an origami-folding 6.5-meter beryllium mirror and tennis-court-sized sunshield.
   - Observes infrared wavelengths to pierce dust clouds and detect redshifted light from galaxies born just 300 million years after the Big Bang.

4. **Voyager 1 & 2 (1977–Present):**
   - The farthest human-made objects from Earth. Both crossed the **heliopause** (where solar wind gives way to the interstellar medium).
   - Voyager 1 is over 24 billion kilometers (160+ Astronomical Units) away and still transmitting science data with its 23-watt radio.

5. **Mars Exploration Fleet:**
   - **Curiosity (2012)** & **Perseverance (2021)**: Nuclear-powered rovers examining Jezero Crater and Gale Crater for signs of ancient microbial biosignatures, collecting rock cores for future Mars Sample Return.`,
    advancedFormulasAndConcepts: `**Gravitational Slingshot (Gravity Assist):**
A spacecraft flies close to a moving planet, 'stealing' a tiny fraction of the planet's orbital momentum to accelerate or decelerate without expending propellant:
$$\\Delta v_{\\text{spacecraft}} = 2 v_{\\text{planet}} - v_{\\text{initial}}$$
Voyager 2 utilized a rare alignment of Jupiter, Saturn, Uranus, and Neptune occurring once every 175 years.`,
    keyTakeaways: [
      "Voyager 1 and 2 carry the Golden Record—a time capsule of Earth sounds, music, and greetings to extraterrestrial intelligence.",
      "The lunar South Pole contains water ice in permanently shadowed craters, critical for drinking water and rocket fuel ($H_2$ and $O_2$).",
      "JWST looks backward in time: because light has a finite speed, seeing an object 13.5 billion light-years away means observing it as it looked 13.5 billion years ago."
    ],
    suggestedFollowUps: [
      "Why is NASA focusing on the Moon's South Pole for Artemis?",
      "How does gravity assist (slingshot maneuver) work without violating physics?",
      "How does JWST's sunshield keep its instruments at -233°C?"
    ]
  },
  {
    topic: "Stars & Stellar Evolution (Supernovae, Neutron Stars & Fusion)",
    keywords: ["stars", "star", "fusion", "supernova", "neutron star", "pulsar", "magnetar", "white dwarf", "hertzsprung russell", "nuclear fusion", "red giant"],
    beginnerSummary: "Stars are colossal spheres of glowing plasma held together by their own gravity. In their cores, extreme pressure and temperature fuse hydrogen atoms into helium, releasing enormous amounts of light and energy for billions of years.",
    detailedExplanation: `### The Life Cycle of Stars

A star's destiny is determined entirely by one factor: **its mass**.

1. **Protostar & Main Sequence:**
   Stars form in cold interstellar molecular gas clouds (nebulae). As gravity collapses the cloud, the core reaches ~15 million Kelvin, igniting **nuclear fusion** (the proton-proton chain or CNO cycle). A star lives most of its life in **hydrostatic equilibrium**—the outward thermal radiation pressure from fusion perfectly balances inward gravitational collapse.

2. **Low-to-Medium Mass Stars (like our Sun):**
   - Core runs out of hydrogen $\\rightarrow$ Core contracts $\\rightarrow$ Outer envelope expands into a **Red Giant**.
   - Helium fuses into carbon and oxygen.
   - The outer layers are gently puffed away as a colorful **Planetary Nebula**, leaving behind a super-dense, Earth-sized stellar remnant called a **White Dwarf**.

3. **High-Mass Stars (> 8 Solar Masses):**
   - Fuses elements through progressive shells: Hydrogen $\\rightarrow$ Helium $\\rightarrow$ Carbon $\\rightarrow$ Neon $\\rightarrow$ Oxygen $\\rightarrow$ Silicon $\\rightarrow$ **Iron**.
   - **Iron catastrophe**: Fusing iron absorbs energy instead of releasing it. Hydrostatic equilibrium halts abruptly.
   - Core collapses in a fraction of a second, causing a titanic **Type II Supernova** explosion, outshining an entire galaxy.
   - The compressed remnant becomes a **Neutron Star** (density: a teaspoon weighs a billion tons) or, if mass exceeds the Tolman-Oppenheimer-Volkoff limit (~2.2 solar masses), collapses directly into a **Black Hole**.`,
    advancedFormulasAndConcepts: `**Nuclear Fusion Energy Release:**
$$E = \\Delta m c^2$$
Four hydrogen protons fuse into one helium nucleus ($^4\\text{He}$), with 0.7% of the mass converted into raw energy.

**Chandrasekhar Limit:**
The maximum mass of a stable white dwarf star supported by electron degeneracy pressure:
$$M_{\\text{Ch}} \\approx 1.44 M_{\\odot}$$
Beyond this limit, the white dwarf collapses into a neutron star or detonates completely in a **Type Ia Supernova** standard candle.`,
    keyTakeaways: [
      "Every atom of carbon, oxygen, iron, and calcium in your body was forged inside the fiery heart of ancient stars and supernovae ('We are all stardust').",
      "Neutron stars can spin hundreds of times per second, emitting beams of radio waves as **pulsars**.",
      "The most magnetic objects known in the cosmos are **magnetars**, with magnetic fields a quadrillion times stronger than Earth's."
    ],
    suggestedFollowUps: [
      "What is the Chandrasekhar limit and why is it important?",
      "How do pulsars and magnetars differ from regular neutron stars?",
      "How do astronomers use Type Ia supernovae to measure the expansion of the universe?"
    ]
  },
  {
    topic: "Planets, Exoplanets & Solar System Dynamics",
    keywords: ["planets", "planet", "solar system", "mars", "jupiter", "europa", "titan", "venus", "exoplanets", "habitable zone", "goldilocks"],
    beginnerSummary: "Our solar system has 8 official planets: 4 rocky terrestrial worlds (Mercury, Venus, Earth, Mars) and 4 gas/ice giants (Jupiter, Saturn, Uranus, Neptune). Beyond our system, thousands of exoplanets orbit distant stars in the galaxy.",
    detailedExplanation: `### Worlds of Our Solar System and Beyond

1. **Terrestrial Worlds:**
   - **Mercury**: Heavily cratered, extreme temperature swings (-180°C to 430°C), no protective atmosphere.
   - **Venus**: Earth's 'evil twin'. Runway greenhouse effect with a thick $CO_2$ atmosphere and sulfuric acid clouds; surface pressure is 92 times Earth's and temperatures exceed 465°C.
   - **Mars**: The Red Planet. Thin atmosphere ($<1\\%$ of Earth), home to Olympus Mons (tallest volcano in the solar system, 22 km high) and Valles Marineris. Abundant evidence of ancient liquid rivers, lakes, and oceans.

2. **Gas & Ice Giants:**
   - **Jupiter**: Contains more mass than all other planets combined. The Great Red Spot is a persistent anticyclonic storm larger than Earth.
   - **Saturn**: Spectacular ring system made of billions of ice chunks from micrometers to meters in diameter.

3. **Ocean Worlds & Astrobiology:**
   - **Europa (Jupiter's Moon)**: Harbors a subsurface liquid saltwater ocean beneath its 20 km ice shell containing more water than all of Earth's oceans combined.
   - **Titan (Saturn's Moon)**: The only moon with a dense nitrogen atmosphere; features lakes, rivers, and rain made of liquid methane and ethane.
   - **Enceladus (Saturn's Moon)**: Geysers erupt through ice fissures, spewing organic molecules and ocean spray directly into space.

4. **Exoplanets & The Habitable Zone:**
   - Over 5,600 confirmed exoplanets discovered by Kepler, TESS, and ground observatories.
   - **Goldilocks Zone**: The orbital distance from a host star where temperatures allow liquid water to pool on a rocky planet's surface.`,
    advancedFormulasAndConcepts: `**Transit Photometry Method:**
When an exoplanet crosses in front of its host star, it blocks a fraction of the star's light:
$$\\frac{\\Delta F}{F} \\approx \\left(\\frac{R_p}{R_*}\\right)^2$$
Measuring this transit dip reveals the planet's physical radius $R_p$. Combined with radial velocity Doppler wobble, astronomers calculate the planet's density and atmospheric composition via transmission spectroscopy.`,
    keyTakeaways: [
      "Europa and Enceladus are prime targets in the search for extraterrestrial microbial life because they contain energy, water, and essential elements.",
      "The TRAPPIST-1 system hosts seven Earth-sized rocky planets orbiting a red dwarf star, three of which are in the habitable zone.",
      "A day on Venus is longer than a Venusian year: it takes 243 Earth days to rotate once, but only 225 Earth days to orbit the Sun."
    ],
    suggestedFollowUps: [
      "Could life survive in Europa's subsurface ocean?",
      "How do astronomers analyze the atmosphere of an exoplanet?",
      "Why is Mars so dry and cold today if it once had rivers?"
    ]
  },
  {
    topic: "Astronomy Concepts (Cosmic Microwave Background, Dark Matter, Redshift)",
    keywords: ["astronomy", "astronomy concepts", "dark matter", "dark energy", "cosmic microwave background", "cmb", "redshift", "big bang", "gravitational waves"],
    beginnerSummary: "Astronomy is the study of everything outside Earth's atmosphere. Fundamental concepts include the Big Bang (the origin of spacetime 13.8 billion years ago), Dark Matter (invisible mass binding galaxies together), and Redshift (the stretching of light as space expands).",
    detailedExplanation: `### Foundational Astronomical Concepts

1. **The Expanding Universe & Cosmological Redshift:**
   - Discovered by Edwin Hubble in 1929: distant galaxies are receding from us in all directions.
   - Space itself is stretching. As light travels through expanding spacetime, its wavelength stretches toward the red end of the electromagnetic spectrum:
   $$z = \\frac{\\lambda_{\\text{observed}} - \\lambda_{\\text{emitted}}}{\\lambda_{\\text{emitted}}}$$
   - The further away a galaxy is, the higher its redshift ($v = H_0 \\cdot d$).

2. **The Cosmic Microwave Background (CMB):**
   - The afterglow of the Big Bang, emitted ~380,000 years after creation during the **Recombination era**, when the universe cooled to ~3,000 K allowing electrons and protons to form neutral hydrogen.
   - Today, cosmic expansion has stretched this radiation into microwaves with an almost perfectly uniform temperature of **2.725 Kelvin** across the entire sky.

3. **Dark Matter & Dark Energy:**
   - **Normal baryonic matter** (stars, planets, gas, humans) accounts for only **~5%** of the total energy density of the universe!
   - **Dark Matter (~27%)**: Does not interact with or emit electromagnetic radiation. Discovered through galactic rotation curves (Vera Rubin) and gravitational lensing; acts as gravitational scaffolding holding galaxies together.
   - **Dark Energy (~68%)**: An unknown repulsive energy density causing the accelerated expansion of the universe.

4. **Gravitational Waves:**
   - Ripples in the fabric of spacetime predicted by Einstein and first directly detected by LIGO in 2015 from colliding black holes 1.3 billion light-years away.`,
    advancedFormulasAndConcepts: `**Hubble-Lemaître Law:**
$$v = H_0 \\cdot d$$
Where $H_0 \\approx 70 \\text{ km/s/Mpc}$ (the Hubble constant).

**Friedmann Equation (Cosmological Dynamics):**
$$\\left(\\frac{\\dot{a}}{a}\\right)^2 = \\frac{8\\pi G}{3}\\rho - \\frac{k c^2}{a^2} + \\frac{\\Lambda c^2}{3}$$
Governs the expansion rate of space as a function of matter density $\\rho$, spatial curvature $k$, and the cosmological constant $\\Lambda$ (Dark Energy).`,
    keyTakeaways: [
      "The universe has no center and no edge; space itself is expanding everywhere simultaneously.",
      "The CMB was discovered by accident in 1965 by Arno Penzias and Robert Wilson using a horn antenna.",
      "Gravitational wave astronomy gives humanity a new 'auditory' sense to probe cosmic collisions invisible to traditional telescopes."
    ],
    suggestedFollowUps: [
      "How do astronomers know Dark Matter exists if we cannot see it?",
      "What is the Hubble Tension in modern cosmology?",
      "How did LIGO detect ripples in spacetime smaller than the width of a proton?"
    ]
  }
];

export const DEFAULT_SUGGESTED_PROMPTS = [
  "How do satellites stay in orbit without falling?",
  "What is the difference between LEO and Geostationary orbits?",
  "Explain black holes and what happens at the event horizon.",
  "How does the James Webb Space Telescope see back in time?",
  "Explain how rocket engines work and what specific impulse means.",
  "What are Lagrange points and why is JWST placed at L2?",
  "Why is there water ice at the Moon's South Pole?",
  "What is dark matter and how do we know it exists?"
];
