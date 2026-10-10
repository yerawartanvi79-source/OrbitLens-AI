import React from 'react';
import { Bot, Sparkles, Lightbulb, ArrowUpRight } from 'lucide-react';
import { ChartSummary } from '../../data/chartData';

interface ChartAiSummaryProps {
  summary: ChartSummary;
}

export const ChartAiSummary: React.FC<ChartAiSummaryProps> = ({ summary }) => {
  return (
    <div className="mt-4 p-4 rounded-xl bg-slate-950/70 border border-purple-500/25 space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-purple-300">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold">
          AI Astrodynamics Summary & Key Insight
        </span>
      </div>

      <h4 className="text-sm font-bold text-white">
        {summary.headline}
      </h4>

      <ul className="space-y-1.5 text-xs text-slate-300">
        {summary.keyPoints.map((pt, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
            <span className="leading-relaxed">{pt}</span>
          </li>
        ))}
      </ul>

      <div className="pt-2 border-t border-slate-800 flex items-start gap-2 text-xs text-cyan-300 bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-500/20">
        <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <span><strong>Analytical Takeaway:</strong> {summary.takeaway}</span>
      </div>
    </div>
  );
};
