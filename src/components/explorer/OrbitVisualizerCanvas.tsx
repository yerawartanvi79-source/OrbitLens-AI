import React, { useEffect, useRef } from 'react';
import { Satellite } from '../../types';

interface OrbitVisualizerProps {
  satellite: Satellite;
}

export const OrbitVisualizerCanvas: React.FC<OrbitVisualizerProps> = ({ satellite }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let trueAnomaly = 0; // orbital angle in radians

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Dark Space backdrop
      ctx.fillStyle = '#050a18';
      ctx.fillRect(0, 0, width, height);

      // Star sparkles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 20; i++) {
        const sx = (i * 37) % width;
        const sy = (i * 73) % height;
        ctx.fillRect(sx, sy, 1, 1);
      }

      // Scaling factor: Scale altitude to canvas
      // Earth radius ~6371 km
      const earthRadiusPx = 28;
      let orbitScale = 1;

      if (satellite.orbitType === 'LEO' || satellite.orbitType === 'SSO') {
        orbitScale = 1.35;
      } else if (satellite.orbitType === 'MEO') {
        orbitScale = 2.4;
      } else if (satellite.orbitType === 'GEO') {
        orbitScale = 3.6;
      } else {
        orbitScale = 3.8;
      }

      const semiMajorPx = earthRadiusPx * orbitScale;
      // Ellipticity calculation from apogee vs perigee
      const diff = satellite.apogeeKm - satellite.perigeeKm;
      const eccentricity = Math.min(0.7, diff / (satellite.apogeeKm + satellite.perigeeKm + 12742));
      const semiMinorPx = semiMajorPx * Math.sqrt(Math.max(0.2, 1 - eccentricity * eccentricity));

      // 1. Draw Earth Sphere
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadiusPx, 0, Math.PI * 2);
      ctx.fillStyle = '#0c3d69';
      ctx.fill();

      // Earth atmosphere glow
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Earth continents / core glow
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(centerX - 4, centerY - 2, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(centerX + 6, centerY + 6, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Draw Orbit Ellipse Path
      ctx.save();
      ctx.translate(centerX, centerY);
      // Tilt orbit by inclination
      const inclinationRad = (satellite.inclinationDeg * Math.PI) / 180;
      ctx.rotate(inclinationRad * 0.3); // aesthetic tilt for 2D perspective

      ctx.strokeStyle = satellite.orbitType === 'GEO' ? '#f59e0b' : satellite.orbitType === 'MEO' ? '#a855f7' : '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.ellipse(0, 0, semiMajorPx, semiMinorPx, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Draw Perigee and Apogee markers
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(semiMajorPx, 0, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(-semiMajorPx, 0, 3, 0, Math.PI * 2);
      ctx.fill();

      // 4. Draw Orbiting Satellite position
      // Angular velocity faster at perigee (Kepler's 2nd law approximation)
      const angularSpeed = (0.02 * (7.8 / Math.max(1, satellite.velocityKmS))) * (1 + eccentricity * Math.cos(trueAnomaly));
      trueAnomaly += angularSpeed;

      const satX = semiMajorPx * Math.cos(trueAnomaly);
      const satY = semiMinorPx * Math.sin(trueAnomaly);

      // Satellite glow
      ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.beginPath();
      ctx.arc(satX, satY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Satellite core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(satX, satY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Solar panel wings
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(satX - 7, satY);
      ctx.lineTo(satX + 7, satY);
      ctx.stroke();

      ctx.restore();

      // 5. Annotations
      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px monospace';
      ctx.fillText(`Earth (r: 6,371 km)`, 8, 14);
      ctx.fillText(`Inc: ${satellite.inclinationDeg}°`, 8, 26);
      ctx.fillText(`Alt: ${satellite.altitudeKm.toLocaleString()} km`, 8, 38);

      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`v: ${satellite.velocityKmS} km/s`, width - 95, 14);
      ctx.fillText(`T: ${satellite.orbitalPeriodMin}m`, width - 95, 26);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [satellite]);

  return (
    <div className="w-full h-48 rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-950 relative shadow-inner">
      <canvas
        ref={canvasRef}
        width={420}
        height={192}
        className="w-full h-full block"
      />
      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-cyan-300">
        Keplerian 2D Projection
      </div>
    </div>
  );
};
