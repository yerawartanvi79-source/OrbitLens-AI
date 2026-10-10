import { AIComplexityLevel } from '../types';
import { SPACE_KNOWLEDGE_BASE, SpaceTopicResponse } from '../data/knowledgeBase';
import { SATELLITE_DATABASE } from '../data/mockSatellites';
import { getStoredSettings } from './storage';

export interface AIResponsePayload {
  text: string;
  category: string;
  followUpSuggestions: string[];
}

export class OrbitLensAiService {
  /**
   * Generates a context-aware space intelligence response.
   */
  async generateResponse(
    query: string,
    complexity: AIComplexityLevel = 'student',
    _chatHistory: { role: string; content: string }[] = []
  ): Promise<AIResponsePayload> {
    const qLower = query.toLowerCase().trim();
    const settings = getStoredSettings();

    // If user configured a custom Gemini or OpenAI API Key, we can try calling it:
    if (settings.apiKey && (settings.apiProvider === 'gemini' || settings.apiProvider === 'openai')) {
      try {
        const liveResponse = await this.callExternalLLM(query, complexity, settings.apiKey, settings.apiProvider);
        if (liveResponse) return liveResponse;
      } catch (err) {
        console.warn('External API call failed, falling back to local space intelligence engine:', err);
      }
    }

    // Small delay to simulate intelligent synthesis
    await new Promise(res => setTimeout(res, 350));

    // 1. Check for satellite specific inquiry
    const matchedSat = SATELLITE_DATABASE.find(s => 
      qLower.includes(s.name.toLowerCase()) || 
      qLower.includes(s.noradId.toString()) ||
      (s.constellation && qLower.includes(s.constellation.toLowerCase()))
    );

    if (matchedSat) {
      return this.formatSatelliteResponse(matchedSat, complexity);
    }

    // 2. Search our rich space topic knowledge base
    let bestMatch: SpaceTopicResponse | null = null;
    let highestScore = 0;

    for (const item of SPACE_KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (qLower.includes(kw)) score += 2;
      }
      if (qLower.includes(item.topic.toLowerCase())) score += 5;
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && highestScore > 0) {
      return this.formatTopicResponse(bestMatch, complexity);
    }

    // 3. Intelligent fallback / synthesized reply for open questions
    return this.synthesizeGeneralSpaceResponse(query, complexity);
  }

  private formatSatelliteResponse(sat: typeof SATELLITE_DATABASE[0], complexity: AIComplexityLevel): AIResponsePayload {
    let text = `### Satellite Dossier: **${sat.name}** (NORAD ID: \`${sat.noradId}\`)\n\n`;
    text += `**Operator:** ${sat.operator} (${sat.country})\n`;
    text += `**Orbit Classification:** ${sat.orbitType} at ~${sat.altitudeKm.toLocaleString()} km altitude\n`;
    text += `**Current Operational Status:** ${sat.status === 'Active' ? '🟢 Operational' : '🔴 ' + sat.status}\n\n`;

    if (complexity === 'beginner') {
      text += `> **Plain English Summary:** ${sat.purpose}\n\n`;
      text += `This satellite was launched on **${sat.launchDate}** on a **${sat.launchVehicle}** rocket. It speeds around the planet at approximately **${(sat.velocityKmS * 3600).toLocaleString()} km/h** (~${sat.velocityKmS} km/s), taking just **${sat.orbitalPeriodMin} minutes** to make a complete lap around the Earth.\n\n`;
    } else {
      text += `#### Mission Architecture & Telemetry\n`;
      text += `- **Apogee / Perigee:** ${sat.apogeeKm} km / ${sat.perigeeKm} km\n`;
      text += `- **Orbital Inclination:** ${sat.inclinationDeg}°\n`;
      text += `- **Orbital Period:** ${sat.orbitalPeriodMin} minutes (${(sat.orbitalPeriodMin / 60).toFixed(2)} hours)\n`;
      text += `- **Launch Site:** ${sat.launchSite}\n`;
      if (sat.massKg) text += `- **Wet Mass:** ${sat.massKg.toLocaleString()} kg\n`;
      if (sat.powerWatts) text += `- **Solar Array Power:** ${sat.powerWatts.toLocaleString()} Watts\n\n`;
      text += `**Detailed Role:** ${sat.description}\n\n`;
    }

    if (complexity === 'researcher') {
      text += `#### Astrodynamics & Conjunction Assessment\n`;
      text += `Orbital energy per unit mass is given by $\\epsilon = -\\frac{\\mu}{2a}$, with semi-major axis $a \\approx ${6371 + sat.altitudeKm} \\text{ km}$. Mean motion $n \\approx ${(1440 / sat.orbitalPeriodMin).toFixed(2)} \\text{ rev/day}$. Solar radiation pressure and $J_2$ geopotential harmonic perturbations drive nodal precession rate $\\dot{\\Omega}$.\n\n`;
    }

    return {
      text,
      category: sat.category,
      followUpSuggestions: [
        `How does ${sat.name}'s orbit compare to a geostationary satellite?`,
        `What launch vehicle carried ${sat.name} to space?`,
        `How does atmospheric drag affect satellites at ${sat.altitudeKm} km?`
      ]
    };
  }

  private formatTopicResponse(topic: SpaceTopicResponse, complexity: AIComplexityLevel): AIResponsePayload {
    let text = `## ${topic.topic}\n\n`;

    if (complexity === 'beginner') {
      text += `### 💡 Quick Summary for Curious Minds\n${topic.beginnerSummary}\n\n`;
      text += `### 🔭 Essential Concepts\n${topic.detailedExplanation}\n\n`;
    } else if (complexity === 'student') {
      text += `### 📘 Concept Overview\n${topic.beginnerSummary}\n\n`;
      text += `${topic.detailedExplanation}\n\n`;
      text += `### 📐 Mathematical Principles\n${topic.advancedFormulasAndConcepts}\n\n`;
    } else {
      text += `### 🔬 Rigorous Astrodynamics & Astrophysical Analysis\n`;
      text += `${topic.detailedExplanation}\n\n`;
      text += `### 📐 Governing Equations & Derivations\n${topic.advancedFormulasAndConcepts}\n\n`;
    }

    text += `### 🎯 Key Takeaways\n`;
    for (const t of topic.keyTakeaways) {
      text += `- ${t}\n`;
    }

    return {
      text,
      category: topic.topic,
      followUpSuggestions: topic.suggestedFollowUps
    };
  }

  private synthesizeGeneralSpaceResponse(query: string, complexity: AIComplexityLevel): AIResponsePayload {
    let text = `### OrbitLens AI Space Intelligence Report\n\n`;
    text += `Regarding your inquiry: **"${query}"**\n\n`;
    
    if (complexity === 'beginner') {
      text += `Space is an extreme environment governed by gravity, thermodynamics, and the laws of orbital motion. Objects in space are either bound in gravitational orbits around massive bodies (like planets orbiting stars or satellites orbiting Earth), or traveling on hyperbolic escape trajectories across the interstellar void.\n\n`;
      text += `Every spacecraft must balance orbital velocity ($v$), altitude ($r$), and propellant capacity ($\\Delta v$) to navigate celestial mechanics.`;
    } else {
      text += `In aerospace engineering and modern astrophysics, systems are modeled through Hamiltonian orbital mechanics, Keplerian orbital elements (semi-major axis $a$, eccentricity $e$, inclination $i$, RAAN $\\Omega$, argument of periapsis $\\omega$, and true anomaly $\\nu$), and electromagnetic telemetry.\n\n`;
      text += `To achieve sustained orbital flight, a spacecraft requires specific orbital energy $\\mathcal{E} = \\frac{v^2}{2} - \\frac{GM}{r} < 0$. Escaping the gravitational well requires reaching parabolic escape velocity $v_{\\text{esc}} = \\sqrt{\\frac{2GM}{r}}$.\n\n`;
    }

    text += `\n\n> ℹ️ *Note: OrbitLens AI provides educational analytics and conceptual aerospace insight based on peer-reviewed astrophysical principles.*`;

    return {
      text,
      category: 'General Space Intelligence',
      followUpSuggestions: [
        'How do rockets achieve orbital velocity?',
        'What is Kepler\'s third law of orbital motion?',
        'Explain how the James Webb Space Telescope works.'
      ]
    };
  }

  private async callExternalLLM(
    query: string,
    complexity: AIComplexityLevel,
    apiKey: string,
    provider: 'gemini' | 'openai'
  ): Promise<AIResponsePayload | null> {
    const systemPrompt = `You are OrbitLens AI, an expert aerospace engineer, astrophysicist, and space science educator. 
Explain space, satellite, orbital mechanics, astronomy, and rocketry topics with high clarity, accuracy, and excitement.
Audience level: ${complexity}.
Use markdown with headings, bullet points, and LaTeX formulas where appropriate ($v = \\sqrt{GM/r}$).
Always maintain an inspiring, professional tone. Never claim to give mission-critical aerospace flight guidance.`;

    if (provider === 'gemini') {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${query}` }] }
          ]
        })
      });
      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            text,
            category: 'Live Gemini Space AI',
            followUpSuggestions: [
              'Can you elaborate on the orbital physics of this?',
              'What real-world satellite missions use this concept?',
              'Explain this in simpler terms for a beginner.'
            ]
          };
        }
      }
    }
    return null;
  }
}

export const aiService = new OrbitLensAiService();
