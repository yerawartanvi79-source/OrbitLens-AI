import React, { useState } from 'react';
import { Bot, User, Copy, Check, Sparkles, CornerDownRight } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
  onSelectFollowUp?: (suggestion: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSelectFollowUp }) => {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.sender === 'assistant';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic markdown parser for headings, bullet points, code blocks, bold text
  const formatMarkdown = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // H2
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-xl font-bold text-white mt-4 mb-2">
            {line.replace('## ', '')}
          </h2>
        );
      }
      // H3
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base font-bold text-cyan-300 mt-3 mb-1.5 flex items-center gap-1.5">
            {line.replace('### ', '')}
          </h3>
        );
      }
      // H4
      if (line.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-sm font-semibold text-purple-300 mt-2 mb-1">
            {line.replace('#### ', '')}
          </h4>
        );
      }
      // Blockquote
      if (line.startsWith('> ')) {
        return (
          <div key={idx} className="border-l-2 border-cyan-400 pl-3 my-2 text-xs italic text-slate-300 bg-slate-950/40 py-1 rounded-r">
            {line.replace('> ', '')}
          </div>
        );
      }
      // Bullet list item
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-300 my-0.5 text-xs sm:text-sm">
            {renderInlineMarkdown(line.trim().substring(2))}
          </li>
        );
      }
      // Math equation display
      if (line.trim().startsWith('$$') && line.trim().endsWith('$$')) {
        const mathExpr = line.trim().slice(2, -2);
        return (
          <div key={idx} className="my-2.5 p-2.5 rounded-lg bg-slate-950/90 border border-purple-500/30 text-center font-mono text-xs sm:text-sm text-cyan-300 shadow-inner overflow-x-auto">
            {mathExpr}
          </div>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      // Regular paragraph
      return (
        <p key={idx} className="my-1 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
          {renderInlineMarkdown(line)}
        </p>
      );
    });
  };

  const renderInlineMarkdown = (text: string) => {
    // Bold, backticks, math
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\$.*?\$)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-cyan-300 font-mono text-xs">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('$') && part.endsWith('$')) {
        return (
          <span key={i} className="font-mono text-purple-300 bg-purple-950/40 px-1 py-0.2 rounded border border-purple-500/20 text-xs">
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex gap-3 sm:gap-4 p-4 rounded-2xl transition-all ${
      isAssistant 
        ? 'bg-slate-900/80 border border-purple-500/20 shadow-md shadow-purple-500/5' 
        : 'bg-cyan-950/30 border border-cyan-500/20 ml-auto max-w-3xl'
    }`}>
      {/* Sender Avatar */}
      <div className="shrink-0">
        {isAssistant ? (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/30">
            <Bot className="w-4 h-4" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-xl bg-cyan-600 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/30">
            <User className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Message Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">
              {isAssistant ? 'AstroAI Copilot' : 'You'}
            </span>
            {message.category && (
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-slate-950 border border-purple-500/30 text-purple-300">
                {message.category}
              </span>
            )}
            <span className="text-[10px] text-slate-400 font-mono">
              {message.timestamp}
            </span>
          </div>

          {isAssistant && (
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              title="Copy answer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Content text */}
        <div className="text-slate-200">
          {formatMarkdown(message.text)}
        </div>

        {/* Follow-up suggestions */}
        {isAssistant && message.followUpSuggestions && message.followUpSuggestions.length > 0 && onSelectFollowUp && (
          <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-purple-400 font-semibold">
              <CornerDownRight className="w-3.5 h-3.5" />
              <span>Recommended Follow-up Questions:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {message.followUpSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectFollowUp(suggestion)}
                  className="px-2.5 py-1 rounded-lg bg-purple-950/50 hover:bg-purple-900 border border-purple-500/30 text-purple-200 text-xs transition-colors flex items-center gap-1 text-left"
                >
                  <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
