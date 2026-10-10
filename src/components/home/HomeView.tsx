import React from 'react';
import { HeroSection } from './HeroSection';
import { LiveStatsBar } from './LiveStatsBar';
import { FeatureGrid } from './FeatureGrid';
import { AstronomyPhotoCard } from './AstronomyPhotoCard';

export const HomeView: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16 animate-fadeIn">
      {/* 1. Hero Section with 3D Orbital Earth Globe */}
      <HeroSection />

      {/* 2. Key Live Telemetry Stats Bar */}
      <LiveStatsBar />

      {/* 3. Feature Overview Grid */}
      <FeatureGrid />

      {/* 4. Cosmic Highlight (NASA APOD) */}
      <AstronomyPhotoCard />
    </div>
  );
};
