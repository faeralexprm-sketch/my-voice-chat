/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { AiRecommendation, Voice } from '../types';
import { Sparkles, Copy, Check, Quote, X } from 'lucide-react';
import AiTtsPreview from './AiTtsPreview';
import ReactMarkdown from 'react-markdown';

interface AiResultCardProps {
  result: AiRecommendation;
  voices: Voice[];
  onClose: () => void;
}

const AiResultCard: React.FC<AiResultCardProps> = ({ result, voices, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Focus trap implementation
  useEffect(() => {
    cardRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      if (!cardRef.current) return;

      const focusableElements = cardRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Ensure markdown is properly formatted even if the model returns compact text
  const formattedInstruction = useMemo(() => {
    if (!result.systemInstruction) return '';
    let text = result.systemInstruction;
    text = text.replace(/([^\n])\s*(##)/g, '$1\n\n$2');
    return text;
  }, [result.systemInstruction]);

  return (
    <div 
        ref={cardRef}
        tabIndex={-1}
        className="w-full bg-[#09090b] border border-indigo-500/30 shadow-[0_0_50px_rgba(79,70,229,0.2)] overflow-hidden relative group outline-none h-full flex flex-col"
    >
        
        {/* Decorative AI Elements */}
        <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20">
            <Sparkles size={120} className="text-indigo-500" />
        </div>

        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white rounded-xl hover:bg-white/10 transition-all z-50 border border-transparent hover:border-white/10"
            aria-label="Close recommendations"
        >
            <X size={20} />
        </button>

        {/* AI Recognition Banner */}
        <div className="bg-indigo-600/10 border-b border-indigo-500/20 px-6 py-3 flex items-center justify-between overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent animate-shimmer pointer-events-none"></div>
            <div className="flex items-center gap-3 relative z-10">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.8)]"></div>
                <span className="text-[10px] font-black font-mono text-indigo-400 tracking-[0.3em] uppercase">AI_Generated_Recommendation</span>
            </div>
            <div className="flex items-center gap-4 relative z-10">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hidden sm:block">Match Score: 98.4%</span>
                <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
                <button 
                  onClick={onClose}
                  className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1"
                >
                   Clear <X size={12} />
                </button>
            </div>
        </div>
        
        <div className="p-6 md:p-10 flex flex-col md:flex-row gap-10 overflow-y-auto max-h-[85vh]">
            
            {/* Left: Persona Info */}
            <div className="flex-1 space-y-6 min-w-0 flex flex-col">
                <div className="flex items-center gap-4 mb-2 flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                         <Sparkles size={24} />
                    </div>
                    <div>
                        <h2 id="ai-result-title" className="text-2xl font-bold text-white tracking-tighter uppercase italic leading-none">Persona_Sync</h2>
                        <p className="text-[10px] text-indigo-400/80 font-mono tracking-widest uppercase mt-1">Generated by PRM_Nexus Node</p>
                    </div>
                </div>

                <div className="bg-white/5 rounded-3xl border border-white/5 shadow-2xl relative group/code flex-1 flex flex-col min-h-[350px] md:min-h-0 overflow-hidden backdrop-blur-md">
                    <div className="flex justify-between items-center p-5 pb-3 border-b border-white/5 flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <Quote size={14} className="text-zinc-600" />
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                                Extraction_Directives
                            </span>
                        </div>
                        <button 
                            onClick={() => handleCopy(result.systemInstruction, 'sys')} 
                            className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-500 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover/code:opacity-100 focus:opacity-100"
                            title="Copy Directives"
                        >
                            {copiedSection === 'sys' ? <Check size={16} className="text-indigo-400"/> : <Copy size={16} />}
                        </button>
                    </div>
                    
                    {/* Markdown Scroll Container */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-black/20">
                         <div className="prose prose-sm prose-invert max-w-none prose-headings:text-indigo-300 prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:mb-3 prose-headings:mt-6 first:prose-headings:mt-0 prose-p:text-zinc-400 prose-p:leading-relaxed prose-strong:text-indigo-200 text-sm font-mono tracking-tight">
                            <ReactMarkdown>{formattedInstruction}</ReactMarkdown>
                         </div>
                    </div>
                </div>
            </div>

            {/* Right: Audio Preview */}
            <div className="flex-1 flex flex-col justify-center space-y-8 pt-4">
                 <div className="relative pl-10">
                    <Quote size={40} className="absolute -top-4 left-0 text-white/5" />
                    <p className="text-2xl md:text-3xl text-white font-medium italic tracking-tight leading-snug">
                        "{result.sampleText}"
                    </p>
                 </div>
                 
                 <div className="bg-[#0c0c0e] p-2 rounded-[2rem] shadow-2xl border border-white/5 group/preview hover:border-indigo-500/20 transition-all">
                    <AiTtsPreview text={result.sampleText} voices={voices} />
                 </div>

                 <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Architecture</span>
                        <span className="text-xs text-white font-mono">Neural_V5</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Consistency</span>
                        <span className="text-xs text-white font-mono">99.8%</span>
                    </div>
                 </div>

                 <button 
                  onClick={onClose}
                  className="w-full py-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 text-zinc-400 hover:text-white font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2"
                 >
                    Dismiss Recommendation
                 </button>
            </div>
        </div>
    </div>
  );
};

export default AiResultCard;