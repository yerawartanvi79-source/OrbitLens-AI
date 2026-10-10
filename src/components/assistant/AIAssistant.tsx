import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Trash2, 
  Download, 
  Settings, 
  Sparkles, 
  Key, 
  X, 
  HelpCircle,
  GraduationCap,
  BookOpen,
  Microscope,
  Info
} from 'lucide-react';
import { ChatMessage as ChatMessageType, AIComplexityLevel } from '../../types';
import { aiService } from '../../services/aiService';
import { 
  getStoredChatHistory, 
  saveStoredChatHistory, 
  clearStoredChatHistory,
  getStoredSettings,
  saveStoredSettings 
} from '../../services/storage';
import { ChatMessage } from './ChatMessage';
import { SuggestedPrompts } from './SuggestedPrompts';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>(getStoredChatHistory);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [complexity, setComplexity] = useState<AIComplexityLevel>('student');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [apiProvider, setApiProvider] = useState<'local' | 'gemini' | 'openai'>('local');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load stored settings
  useEffect(() => {
    const s = getStoredSettings();
    if (s.apiKey) setApiKeyInput(s.apiKey);
    if (s.apiProvider) setApiProvider(s.apiProvider);
  }, []);

  // Save chat history
  useEffect(() => {
    saveStoredChatHistory(messages);
  }, [messages]);

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isGenerating) return;

    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsGenerating(true);

    try {
      const historyContext = messages.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));

      const res = await aiService.generateResponse(text, complexity, historyContext);

      const botMsg: ChatMessageType = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: res.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: res.category,
        followUpSuggestions: res.followUpSuggestions,
      };

      setMessages(prev => [...prev, botMsg]);
    } catch {
      const errMsg: ChatMessageType = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: 'An error occurred during orbital reasoning. Please refine your query and try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearChat = () => {
    if (confirm('Clear entire conversation history?')) {
      clearStoredChatHistory();
      setMessages([]);
    }
  };

  const handleExportChat = () => {
    if (messages.length === 0) return;
    const formatted = messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}:\n${m.text}\n\n`).join('---\n\n');
    const blob = new Blob([formatted], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `OrbitLens_AI_Chat_${new Date().toISOString().slice(0, 10)}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveSettings = () => {
    const s = getStoredSettings();
    saveStoredSettings({
      ...s,
      apiKey: apiKeyInput.trim(),
      apiProvider,
    });
    setIsSettingsOpen(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[600px] glass-card rounded-2xl border border-purple-500/20 overflow-hidden animate-fadeIn">
      {/* Top Header Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">AstroAI Intelligence Copilot</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-950/80 border border-purple-500/40 text-purple-300">
                Aerospace Knowledge Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive tutor for satellites, orbital mechanics, black holes, rockets, and astronomy.
            </p>
          </div>
        </div>

        {/* Level Selector & Action buttons */}
        <div className="flex items-center gap-2">
          {/* Complexity Selector */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setComplexity('beginner')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                complexity === 'beginner' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
              title="Plain English, conceptual explanations"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Beginner</span>
            </button>
            <button
              onClick={() => setComplexity('student')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                complexity === 'student' ? 'bg-purple-500/20 text-purple-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
              title="Balanced physics, student curriculum"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Student</span>
            </button>
            <button
              onClick={() => setComplexity('researcher')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                complexity === 'researcher' ? 'bg-indigo-500/20 text-indigo-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
              title="Rigorous astrodynamics & LaTeX formulas"
            >
              <Microscope className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Researcher</span>
            </button>
          </div>

          {/* Export Chat */}
          {messages.length > 0 && (
            <button
              onClick={handleExportChat}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 transition-colors text-xs"
              title="Export Conversation (.md)"
            >
              <Download className="w-4 h-4" />
            </button>
          )}

          {/* Clear Chat */}
          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors text-xs"
              title="Clear Conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* AI Settings Modal Toggle */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-purple-300 transition-colors text-xs"
            title="Configure Custom AI Provider"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.length === 0 ? (
          <SuggestedPrompts onSelectPrompt={p => handleSendMessage(p)} />
        ) : (
          messages.map(msg => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onSelectFollowUp={s => handleSendMessage(s)}
            />
          ))
        )}

        {/* Generating Indicator */}
        {isGenerating && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 w-fit">
            <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-purple-300 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Simulating orbital physics and astrophysical principles...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/90">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 max-w-5xl mx-auto"
        >
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Ask about satellites, Kepler's laws, black holes, rockets, star formation..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-purple-500/50 focus:outline-none text-sm text-white placeholder-slate-500 shadow-inner"
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isGenerating}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20 shrink-0"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="mt-2 text-center text-[11px] text-slate-500 font-sans">
          OrbitLens AI is for educational & analytical exploration. Verify mission telemetry with official aerospace bodies.
        </div>
      </div>

      {/* AI Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="w-full max-w-md bg-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-2xl text-slate-100"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-purple-400" />
                <h3 className="font-semibold text-white">AI Engine Configuration</h3>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Knowledge Provider</label>
                <select
                  value={apiProvider}
                  onChange={e => setApiProvider(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
                >
                  <option value="local">Built-in Space Intelligence Engine (Offline, Instant)</option>
                  <option value="gemini">Google Gemini API (Custom Key)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  The built-in engine contains expert curated astrophysics, Keplerian mechanics, and satellite catalogs.
                </p>
              </div>

              {apiProvider !== 'local' && (
                <div>
                  <label className="block text-slate-300 font-medium mb-1">API Key</label>
                  <input
                    type="password"
                    value={apiKeyInput}
                    onChange={e => setApiKeyInput(e.target.value)}
                    placeholder="Enter your API Key..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Your key is stored only locally in your browser's localStorage.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
