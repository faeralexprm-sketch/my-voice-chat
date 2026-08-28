/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useEffect } from 'react';
import { Play, Pause, Activity } from 'lucide-react';
import { Voice } from '../types';
import AudioVisualizer from './AudioVisualizer';

interface VoiceCardProps {
  voice: Voice;
  isPlaying: boolean;
  onPlayToggle: (voiceName: string) => void;
}

const VoiceCard: React.FC<VoiceCardProps> = ({ voice, isPlaying, onPlayToggle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying]);

  const handleAudioEnded = () => {
    if (isPlaying) {
      onPlayToggle(voice.name);
    }
  };

  const handleClick = () => {
      onPlayToggle(voice.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
      }
  };

  return (
    <div 
        className={`group relative bg-white dark:bg-zinc-800 border transition-all duration-200 flex flex-col sm:flex-row h-auto sm:h-28 cursor-pointer rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-600 focus-within:ring-4 focus-within:ring-indigo-500/50 outline-none ${isPlaying ? 'border-indigo-200 dark:border-indigo-800 ring-2 ring-indigo-100 dark:ring-indigo-900/30 shadow-md' : 'border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md'}`}
        onClick={handleClick}
        role="listitem"
    >
      <button 
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`${isPlaying ? 'Pause' : 'Play'} sample for ${voice.name}. Gender: ${voice.analysis.gender}, Pitch: ${voice.pitch}`}
        aria-pressed={isPlaying}
        className="absolute inset-0 z-50 rounded-2xl bg-transparent border-none appearance-none cursor-pointer"
      ></button>
      
      {/* Visualizer / Action Area - Left Side */}
      <div className="relative h-20 sm:h-full w-full sm:w-28 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0 border-b sm:border-b-0 sm:border-r border-zinc-100 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
        
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>

        {/* Resting State Visual */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
             <Activity size={20} className="text-zinc-300 dark:text-zinc-600" strokeWidth={1.5} />
        </div>

        {/* Active Visualizer */}
        <div className={`absolute inset-0 z-10 transition-opacity duration-200 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
             <AudioVisualizer isPlaying={isPlaying} color={document.documentElement.classList.contains('dark') ? '#a5b4fc' : '#18181b'} />
        </div>

        <div className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-200 ${isPlaying ? 'opacity-0 hover:opacity-100 focus-within:opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'}`}>
            <div className="h-9 w-9 bg-zinc-900 dark:bg-zinc-100 rounded-full flex items-center justify-center shadow-lg transform transition-transform active:scale-95">
                {isPlaying ? <Pause size={14} className="text-white dark:text-zinc-900" fill="currentColor" /> : <Play size={14} className="text-white dark:text-zinc-900 ml-0.5" fill="currentColor" />}
            </div>
        </div>
        
        {/* Status Indicator */}
        <div className={`absolute top-2 left-2 w-1.5 h-1.5 rounded-full ${isPlaying ? 'animate-google-colors' : 'bg-zinc-200 dark:bg-zinc-600'}`}></div>
      </div>

      {/* Content Area - Right Side */}
      <div className="flex-1 p-4 flex flex-col justify-center min-w-0 bg-white dark:bg-zinc-800">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tighter leading-none">{voice.name}</h3>
            <div className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? 'bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'bg-zinc-200 dark:bg-zinc-700'}`}></span>
                <span className="text-[9px] uppercase font-black text-zinc-400 tracking-widest">{isPlaying ? 'Active' : 'Standby'}</span>
            </div>
        </div>
        
        {/* Characteristics - Prominent Tags */}
        <div className={`flex flex-wrap gap-1 transition-all duration-300 mb-2 ${isPlaying ? 'max-h-20' : 'max-h-5 overflow-hidden'}`}>
            <span className="inline-flex items-center px-1.5 py-0.5 border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-900/20 text-[9px] font-black text-indigo-500 dark:text-indigo-400 rounded-sm uppercase tracking-tighter">
                {voice.analysis.gender}
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 border border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 text-[9px] font-black text-zinc-500 dark:text-zinc-400 rounded-sm uppercase tracking-tighter">
                {voice.pitch}
            </span>
            {voice.analysis.characteristics.map((char, index) => (
                <span key={index} className={`inline-flex items-center px-1.5 py-0.5 bg-zinc-100/50 dark:bg-zinc-900/50 text-[9px] font-medium text-zinc-500 dark:text-zinc-500 rounded uppercase tracking-tighter border border-transparent whitespace-nowrap transition-opacity duration-300 ${!isPlaying && index > 1 ? 'opacity-0 scale-90' : 'opacity-100'}`}>
                    {char}
                </span>
            ))}
        </div>
        
        {/* Description - Compact when not active */}
        <p className={`text-xs leading-relaxed transition-all duration-300 font-mono ${isPlaying ? 'text-zinc-500 dark:text-zinc-400 line-clamp-2 opacity-100 translate-x-0' : 'text-zinc-400 dark:text-zinc-600 line-clamp-1 opacity-40 translate-x-1'}`}>
            {voice.analysis.visualDescription || `Neural voice profile: ${voice.analysis.characteristics.join(' • ')}`}
        </p>
      </div>

      <audio ref={audioRef} src={voice.audioSampleUrl} onEnded={handleAudioEnded} preload="none" />
    </div>
  );
};

export default VoiceCard;