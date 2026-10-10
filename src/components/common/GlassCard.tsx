import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: 'cyan' | 'purple' | 'none';
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  glow = 'none',
  className = '',
  hoverEffect = true,
  ...props
}) => {
  const glowClass = 
    glow === 'cyan' ? 'glow-cyan border-cyan-500/30' :
    glow === 'purple' ? 'glow-purple border-purple-500/30' : 
    'border-slate-800/80';

  const hoverClass = hoverEffect ? 'transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5' : '';

  return (
    <div
      className={`glass-card rounded-2xl p-5 md:p-6 text-slate-100 ${glowClass} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
