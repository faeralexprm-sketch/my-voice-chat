/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { FilterState } from '../types';
import { Search, Sparkles, ChevronDown, Mic, LayoutGrid, GalleryHorizontalEnd, Sun, Moon } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  uniqueGenders: string[];
  uniquePitches: string[];
  onOpenAiCasting: () => void;
  viewMode: 'carousel' | 'grid';
  onViewModeChange: (mode: 'carousel' | 'grid') => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  filters, 
  onFilterChange, 
  uniqueGenders, 
  uniquePitches,
  onOpenAiCasting,
  viewMode,
  onViewModeChange,
  isDarkMode,
  toggleTheme
}) => {
  
  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, gender: e.target.value });
  };

  const handlePitchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, pitch: e.target.value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  return (
    <div className="relative z-[100] w-full bg-[#09090b]/80 backdrop-blur-2xl border-b border-white/5 transition-colors duration-300 selection:bg-indigo-500/30">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 h-20">
            <div 
                className="flex items-center justify-between h-full gap-2 sm:gap-8"
                role="toolbar"
                aria-label="Filter and View controls"
            >
                
                {/* Left: Brand + AI Casting Button */}
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                    <div className="flex items-center gap-3 group select-none cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0 group-hover:scale-110 transition-transform duration-500">
                            <Mic size={20} className="text-white" aria-hidden="true" />
                        </div>
                        <h1 className="hidden lg:block text-xl font-black tracking-tighter text-white font-display whitespace-nowrap uppercase italic">
                            PRM_Nexus
                        </h1>
                    </div>

                    <button 
                        onClick={onOpenAiCasting}
                        className="flex items-center gap-2.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:scale-105 active:scale-95 group shrink-0 focus:ring-4 focus:ring-indigo-500/50 outline-none"
                        aria-label="Open AI Casting Director"
                    >
                        <Sparkles size={16} className="text-indigo-100 group-hover:rotate-12 transition-transform" aria-hidden="true" />
                        <span className="hidden sm:inline">AI_Casting_Director</span>
                        <span className="sm:hidden">Casting</span>
                    </button>
                </div>

                {/* Right: Search, Filters & Actions */}
                <div className="flex items-center gap-3 justify-end min-w-0 flex-1">
                    
                    {/* Search Input (Flexible width) */}
                    <div className="relative group w-full max-w-[140px] sm:max-w-[280px] transition-all">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
                            <Search size={16} aria-hidden="true" />
                        </div>
                        <label htmlFor="library-search" className="sr-only">Search voices</label>
                        <input
                            id="library-search"
                            type="text"
                            placeholder="SEARCH_VOICES..."
                            value={filters.search}
                            onChange={handleSearchChange}
                            className="block w-full pl-11 pr-4 py-2.5 bg-white/5 border-white/5 focus:bg-white/10 border focus:border-indigo-500/50 rounded-2xl text-[10px] font-mono tracking-widest text-white placeholder-zinc-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                        />
                    </div>

                    {/* Desktop Filter Dropdowns */}
                    <div className="hidden xl:flex gap-3 shrink-0">
                         <div className="relative group">
                            <label htmlFor="gender-filter-desktop" className="sr-only">Filter by gender</label>
                            <select
                                id="gender-filter-desktop"
                                value={filters.gender}
                                onChange={handleGenderChange}
                                className="appearance-none bg-white/5 border border-white/10 text-zinc-400 py-2.5 pl-4 pr-10 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-indigo-500/10 hover:bg-white/10 cursor-pointer transition-all"
                            >
                                <option value="All">All Genders</option>
                                {uniqueGenders.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-600">
                                <ChevronDown size={14} aria-hidden="true" />
                            </div>
                        </div>

                        <div className="relative group">
                            <label htmlFor="pitch-filter-desktop" className="sr-only">Filter by pitch</label>
                            <select
                                id="pitch-filter-desktop"
                                value={filters.pitch}
                                onChange={handlePitchChange}
                                className="appearance-none bg-white/5 border border-white/10 text-zinc-400 py-2.5 pl-4 pr-10 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-indigo-500/10 hover:bg-white/10 cursor-pointer transition-all"
                            >
                                <option value="All">All Pitches</option>
                                {uniquePitches.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-600">
                                <ChevronDown size={14} aria-hidden="true" />
                            </div>
                        </div>
                    </div>

                    <div className="w-px h-8 bg-white/5 mx-2 hidden sm:block shrink-0" aria-hidden="true"></div>

                    {/* Actions Group */}
                    <div className="flex gap-2 shrink-0">
                        {/* View Toggle */}
                        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10" role="group" aria-label="View mode">
                            <button
                                onClick={() => onViewModeChange('carousel')}
                                className={`p-2 rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${viewMode === 'carousel' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                                aria-label="Carousel View"
                                aria-pressed={viewMode === 'carousel'}
                                title="Carousel View"
                            >
                                <GalleryHorizontalEnd size={18} aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => onViewModeChange('grid')}
                                className={`p-2 rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                                aria-label="Grid View"
                                aria-pressed={viewMode === 'grid'}
                                title="Grid View"
                            >
                                <LayoutGrid size={18} aria-hidden="true" />
                            </button>
                        </div>

                        {/* Theme Toggle - Removed since we are standardizing on Landing/Dark aesthetic */}
                    </div>

                </div>
            </div>
        </div>
        
        {/* Mobile Filters Sub-bar */}
        <div className="xl:hidden border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide" role="group" aria-label="Mobile filters">
                 <label htmlFor="gender-filter-mobile" className="sr-only">Gender filter</label>
                 <select
                    id="gender-filter-mobile"
                    value={filters.gender}
                    onChange={handleGenderChange}
                    className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 py-1 px-3 rounded-md text-[10px] font-bold uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                    <option value="All">All Genders</option>
                    {uniqueGenders.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <label htmlFor="pitch-filter-mobile" className="sr-only">Pitch filter</label>
                <select
                    id="pitch-filter-mobile"
                    value={filters.pitch}
                    onChange={handlePitchChange}
                    className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 py-1 px-3 rounded-md text-[10px] font-bold uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                    <option value="All">All Pitches</option>
                    {uniquePitches.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>
        </div>
    </div>
  );
};

export default FilterBar;