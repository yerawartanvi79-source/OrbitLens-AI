import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Orbit, Compass, RotateCcw } from 'lucide-react';

export const Earth3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedOrbitRing, setSelectedOrbitRing] = useState<'LEO' | 'MEO' | 'GEO' | 'All'>('All');
  const [isRotating, setIsRotating] = useState(true);

  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Starfield Background Particles
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 80;
      starPositions[i + 1] = (Math.random() - 0.5) * 80;
      starPositions[i + 2] = (Math.random() - 0.5) * 80;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.12,
      transparent: true,
      opacity: 0.8,
    });
    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // Procedural Earth Texture on Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Ocean gradient
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#0a1d37');
      grad.addColorStop(0.5, '#07162c');
      grad.addColorStop(1, '#051020');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Continent landmass shapes (Stylized high-tech vector continents)
      ctx.fillStyle = '#10395b';
      // North America
      ctx.beginPath();
      ctx.ellipse(250, 150, 90, 60, -0.2, 0, Math.PI * 2);
      ctx.fill();
      // South America
      ctx.beginPath();
      ctx.ellipse(320, 320, 60, 90, 0.3, 0, Math.PI * 2);
      ctx.fill();
      // Eurasia
      ctx.beginPath();
      ctx.ellipse(650, 160, 160, 70, 0.1, 0, Math.PI * 2);
      ctx.fill();
      // Africa
      ctx.beginPath();
      ctx.ellipse(540, 260, 70, 90, -0.1, 0, Math.PI * 2);
      ctx.fill();
      // Australia
      ctx.beginPath();
      ctx.ellipse(820, 360, 50, 40, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cyber longitude & latitude grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.18)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 1024; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y < 512; y += 42) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
      }

      // City light clusters (yellow/cyan glowing dots)
      ctx.fillStyle = '#38bdf8';
      for (let i = 0; i < 180; i++) {
        const cx = 200 + Math.random() * 700;
        const cy = 100 + Math.random() * 300;
        ctx.fillRect(cx, cy, 2, 2);
      }
    }

    const earthTexture = new THREE.CanvasTexture(canvas);

    // Earth Sphere
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const earthGeometry = new THREE.SphereGeometry(3.2, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpScale: 0.05,
      specular: new THREE.Color(0x38bdf8),
      shininess: 15,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);

    // Atmosphere Glow Layer
    const atmosphereGeo = new THREE.SphereGeometry(3.35, 48, 48);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    earthGroup.add(atmosphereMesh);

    // Orbit Rings
    // 1. LEO (Low Earth Orbit ring)
    const leoRingGeo = new THREE.RingGeometry(4.1, 4.15, 96);
    const leoRingMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const leoRing = new THREE.Mesh(leoRingGeo, leoRingMat);
    leoRing.rotation.x = Math.PI / 2.3;
    leoRing.rotation.y = 0.3;
    scene.add(leoRing);

    // 2. MEO Orbit ring (inclined GPS ring)
    const meoRingGeo = new THREE.RingGeometry(5.6, 5.65, 96);
    const meoRingMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const meoRing = new THREE.Mesh(meoRingGeo, meoRingMat);
    meoRing.rotation.x = Math.PI / 3;
    meoRing.rotation.z = 0.4;
    scene.add(meoRing);

    // 3. GEO Equatorial ring
    const geoRingGeo = new THREE.RingGeometry(7.2, 7.26, 96);
    const geoRingMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const geoRing = new THREE.Mesh(geoRingGeo, geoRingMat);
    geoRing.rotation.x = Math.PI / 2;
    scene.add(geoRing);

    // Orbiting Satellite Markers
    interface SatMarker {
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      angle: number;
      inclination: number;
      orbitPlane: THREE.Group;
    }

    const satelliteMarkers: SatMarker[] = [];
    const satConfigs = [
      { radius: 4.12, speed: 0.024, color: 0x38bdf8, incX: Math.PI / 2.3, incY: 0.3 }, // ISS / LEO
      { radius: 4.25, speed: 0.022, color: 0x06b6d4, incX: Math.PI / 2.1, incY: -0.5 }, // Starlink
      { radius: 4.35, speed: 0.020, color: 0x67e8f9, incX: Math.PI / 1.9, incY: 0.8 }, // Sentinel SSO
      { radius: 5.62, speed: 0.012, color: 0xc084fc, incX: Math.PI / 3, incY: 0.4 }, // GPS MEO
      { radius: 5.65, speed: 0.011, color: 0xa855f7, incX: Math.PI / 3.2, incY: -0.4 }, // Galileo
      { radius: 7.23, speed: 0.005, color: 0xfbbf24, incX: Math.PI / 2, incY: 0 }, // GEO Weather
    ];

    satConfigs.forEach(cfg => {
      const planeGroup = new THREE.Group();
      planeGroup.rotation.x = cfg.incX;
      planeGroup.rotation.y = cfg.incY;
      scene.add(planeGroup);

      const markerGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({ color: cfg.color });
      const markerMesh = new THREE.Mesh(markerGeo, markerMat);

      // Add miniature glowing halo around sat
      const haloGeo = new THREE.SphereGeometry(0.24, 12, 12);
      const haloMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.35,
      });
      markerMesh.add(new THREE.Mesh(haloGeo, haloMat));

      planeGroup.add(markerMesh);

      satelliteMarkers.push({
        mesh: markerMesh,
        radius: cfg.radius,
        speed: cfg.speed,
        angle: Math.random() * Math.PI * 2,
        inclination: cfg.incX,
        orbitPlane: planeGroup,
      });
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.6);
    sunLight.position.set(12, 8, 10);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 0.8);
    rimLight.position.set(-10, -5, -8);
    scene.add(rimLight);

    // Mouse Interaction / Drag rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      earthGroup.rotation.y += deltaX * 0.005;
      earthGroup.rotation.x += deltaY * 0.005;

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotatingRef.current && !isDragging) {
        earthGroup.rotation.y += 0.002;
        starPoints.rotation.y += 0.0003;
      }

      // Update satellite marker positions
      satelliteMarkers.forEach(sat => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.y = Math.sin(sat.angle) * sat.radius;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] md:h-[540px] lg:h-[600px] flex items-center justify-center overflow-hidden rounded-2xl glass-card">
      {/* 3D Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD controls on top of 3D globe */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 border border-cyan-500/30 text-xs text-cyan-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Orbital Simulation: 60 FPS</span>
        </div>

        <button
          onClick={() => setIsRotating(prev => !prev)}
          className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all backdrop-blur-md flex items-center gap-1.5 ${
            isRotating
              ? 'bg-slate-900/80 border-purple-500/40 text-purple-200 hover:border-purple-400'
              : 'bg-slate-800/80 border-slate-600 text-slate-300'
          }`}
          title="Pause/Resume Globe Rotation"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
          <span>{isRotating ? 'Auto-Orbiting' : 'Paused'}</span>
        </button>
      </div>

      {/* Orbit Layer Legend / Filter */}
      <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 z-10 p-3 rounded-xl bg-slate-950/80 border border-slate-700/60 backdrop-blur-md text-xs text-slate-300 flex flex-wrap items-center justify-between gap-3 max-w-lg">
        <div className="flex items-center gap-2">
          <Orbit className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-white">Active Shells:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-cyan-400" /> LEO (~550km)
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-purple-400" /> MEO (~20,000km)
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> GEO (~35,786km)
          </span>
        </div>
      </div>

      {/* Drag instructions prompt */}
      <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 backdrop-blur-sm pointer-events-none">
        <Compass className="w-3.5 h-3.5 text-cyan-400" />
        <span>Click & drag to inspect orbital planes</span>
      </div>
    </div>
  );
};
