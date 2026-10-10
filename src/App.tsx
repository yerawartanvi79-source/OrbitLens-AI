import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal';

import { HomeView } from './components/home/HomeView';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { SatelliteExplorer } from './components/explorer/SatelliteExplorer';
import { AIAssistant } from './components/assistant/AIAssistant';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { AboutView } from './components/about/AboutView';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {activeTab === 'home' && <HomeView />}
      {activeTab === 'dashboard' && <DashboardOverview />}
      {activeTab === 'explorer' && <SatelliteExplorer />}
      {activeTab === 'assistant' && <AIAssistant />}
      {activeTab === 'analytics' && <AnalyticsView />}
      {activeTab === 'about' && <AboutView />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden font-sans">
        {/* Subtle radial cosmic glow highlights */}
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="fixed bottom-10 right-10 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[160px] pointer-events-none -z-10" />

        {/* Global Educational Disclaimer Banner */}
        <DisclaimerBanner />

        {/* Futuristic Aerospace Navbar */}
        <Navbar />

        {/* Active Page View */}
        <MainContent />

        {/* Aerospace Footer */}
        <Footer />

        {/* Global Overlays & Modals */}
        <CommandPalette />
        <KeyboardShortcutsModal />
      </div>
    </AppProvider>
  );
}

export default App;
