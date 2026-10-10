import React, { useState } from 'react';
import { Info, X, ShieldAlert } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-slate-950/90 border-b border-purple-500/20 text-slate-300 text-xs py-2 px-4 backdrop-blur-md relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
          <p className="truncate sm:whitespace-normal font-sans text-slate-300">
            <span className="font-semibold text-cyan-300">Educational & Analytical Notice:</span> OrbitLens AI is designed exclusively for students, researchers, and space enthusiasts. Orbital data is aggregated from public feeds and does not provide mission-critical flight navigation or official aerospace guidance.
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors shrink-0"
          title="Dismiss banner"
          aria-label="Dismiss disclaimer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
