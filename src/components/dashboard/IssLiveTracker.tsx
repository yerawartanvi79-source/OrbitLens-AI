import React, { useEffect, useRef } from 'react';
import { Radio, Compass, Activity, Globe, Eye, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const IssLiveTracker: React.FC = () => {
  const { issLocation } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Render 2D orbit track on world coordinate grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !issLocation) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.fillStyle = '#060d1f';
    ctx.fillRect(0, 0, width, height);

    // Draw longitude & latitude grid
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += width / 8) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += height / 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Equator line
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Projected sine wave orbital ground track of ISS (inclination 51.64 deg)
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    const currentX = ((issLocation.longitude + 180) / 360) * width;
    const currentY = ((90 - issLocation.latitude) / 180) * height;

    for (let px = 0; px <= width; px += 2) {
      const lon = (px / width) * 360 - 180;
      // Phase shifted sinusoidal ground track
      const deltaLon = (lon - issLocation.longitude) * (Math.PI / 180);
      const lat = Math.sin(deltaLon + Math.asin(Math.max(-1, Math.min(1, issLocation.latitude / 51.64)))) * 51.64;
      const py = ((90 - lat) / 180) * height;
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw ISS Marker
    // Footprint circle
    ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
    ctx.beginPath();
    ctx.arc(currentX, currentY, 26, 0, Math.PI * 2);
    ctx.fill();

    // Outer pulsating ring
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(currentX, currentY, 12, 0, Math.PI * 2);
    ctx.stroke();

    // Center icon dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Coordinates label
    ctx.fillStyle = '#38bdf8';
    ctx.font = '10px monospace';
    ctx.fillText(`ISS [${issLocation.latitude}°, ${issLocation.longitude}°]`, Math.min(width - 150, Math.max(10, currentX + 15)), currentY - 10);
  }, [issLocation]);

  if (!issLocation) {
    return (
      <div className="glass-card rounded-2xl p-6 animate-pulse flex items-center justify-center min-h-[220px]">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
          <Radio className="w-4 h-4 animate-spin" />
          <span>Acquiring ISS Downlink Ephemeris...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 border border-cyan-500/25 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>ISS Live Ephemeris & Ground Track</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live 5s Feed
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              NORAD ID: 25544 • Expedition 72 Onboard
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-1 text-slate-400">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>7 Crew</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="capitalize">{issLocation.visibility}</span>
          </div>
        </div>
      </div>

      {/* 2D Projected Map Canvas */}
      <div className="w-full h-36 rounded-xl overflow-hidden border border-slate-800 mb-4 bg-slate-950 relative">
        <canvas
          ref={canvasRef}
          width={640}
          height={144}
          className="w-full h-full block"
        />
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-[10px] font-mono text-slate-400 border border-slate-800">
          Mercator Ground Track
        </div>
      </div>

      {/* Real-time Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">LATITUDE</div>
          <div className="text-base font-bold text-cyan-300 font-mono">
            {issLocation.latitude > 0 ? `${issLocation.latitude}° N` : `${Math.abs(issLocation.latitude)}° S`}
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">LONGITUDE</div>
          <div className="text-base font-bold text-cyan-300 font-mono">
            {issLocation.longitude > 0 ? `${issLocation.longitude}° E` : `${Math.abs(issLocation.longitude)}° W`}
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">ALTITUDE</div>
          <div className="text-base font-bold text-purple-300 font-mono">
            {issLocation.altitude.toLocaleString()} km
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">ORBITAL SPEED</div>
          <div className="text-base font-bold text-emerald-300 font-mono">
            {Math.round(issLocation.velocity).toLocaleString()} km/h
          </div>
        </div>
      </div>
    </div>
  );
};
