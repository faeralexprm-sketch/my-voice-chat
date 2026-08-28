/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo, useEffect } from 'react';
import { VOICE_DATA } from '../../constants';
import Carousel3D from '../../components/Carousel3D';
import GridView from '../../components/GridView';
import FilterBar from '../../components/FilterBar';
import VoiceFinder from '../../components/VoiceFinder';
import AiResultCard from '../../components/AiResultCard';
import AdminLayer from '../../components/AdminLayer';
import AgentProfileLayer from '../../components/AgentProfileLayer';
import PrometheusAgentProfile from '../../components/PrometheusAgentProfile';
import UserStandardProfile from '../../components/UserStandardProfile';
import { FilterState, AiRecommendation } from '../../types';
import { Info, ShieldAlert, Sparkles } from 'lucide-react';

const LobbyPage: React.FC = () => {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AiRecommendation | null>(null);
  const [isAiCardVisible, setIsAiCardVisible] = useState(false);
  const [showVoiceFinder, setShowVoiceFinder] = useState(false);
  const [isAdminLayerOpen, setIsAdminLayerOpen] = useState(false);
  const [isAgentProfileOpen, setIsAgentProfileOpen] = useState(false);
  const [isAgentStandardOpen, setIsAgentStandardOpen] = useState(false);
  const [isUserStandardOpen, setIsUserStandardOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Carousel state
  const [activeIndex, setActiveIndex] = useState(0);

  const [filters, setFilters] = useState<FilterState>({
    gender: 'All',
    pitch: 'All',
    search: '',
  });

  // Theme Management
  useEffect(() => {
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const uniqueGenders = useMemo(() => Array.from(new Set(VOICE_DATA.map(v => v.analysis.gender))).sort(), []);
  const uniquePitches = useMemo(() => Array.from(new Set(VOICE_DATA.map(v => v.analysis.pitch))).sort(), []);

  const filteredVoices = useMemo(() => {
    let baseData = VOICE_DATA;
    if (aiResult) {
       const recommended = aiResult.voiceNames
          .map(name => VOICE_DATA.find(v => v.name === name))
          .filter((v): v is typeof VOICE_DATA[0] => !!v);
       return recommended.length > 0 ? recommended : baseData;
    }

    return baseData.filter(voice => {
      const matchGender = filters.gender === 'All' || voice.analysis.gender === filters.gender;
      const matchPitch = filters.pitch === 'All' || voice.analysis.pitch === filters.pitch;
      
      const searchLower = filters.search.toLowerCase();
      const matchSearch = filters.search === '' || 
        voice.name.toLowerCase().includes(searchLower) || 
        voice.characteristics.some(c => c.toLowerCase().includes(searchLower)) ||
        voice.analysis.characteristics.some(c => c.toLowerCase().includes(searchLower)) ||
        voice.analysis.gender.toLowerCase().startsWith(searchLower) ||
        voice.pitch.toLowerCase().includes(searchLower) ||
        voice.analysis.pitch.toLowerCase().includes(searchLower);

      return matchGender && matchPitch && matchSearch;
    });
  }, [filters, aiResult]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filteredVoices.length]);

  const handlePlayToggle = (voiceName: string) => {
    setPlayingVoice(current => current === voiceName ? null : voiceName);
  };

  const clearAiResult = () => {
    setAiResult(null);
    setIsAiCardVisible(false);
    setFilters({ ...filters, search: '' });
  };

  const isModalOpen = showVoiceFinder || (aiResult && isAiCardVisible) || isAdminLayerOpen || isAgentProfileOpen || isAgentStandardOpen || isUserStandardOpen;

  return (
    <div className="h-screen w-screen bg-[#09090b] text-white font-sans overflow-hidden flex flex-col relative transition-colors duration-300 selection:bg-indigo-500/30 p-1 sm:p-2">
      
      {/* Background Ambience - Landing Style */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-[-20%] right-[-10%] w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] rounded-full bg-indigo-900/15 blur-[60px] sm:blur-[120px] opacity-70"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-fuchsia-900/10 blur-[50px] sm:blur-[100px] opacity-50"></div>
          <div className="absolute top-[30%] left-[20%] w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] rounded-full bg-emerald-900/5 blur-[40px] sm:blur-[80px] opacity-30"></div>
      </div>

      {/* Main App Content - aria-hidden and inert when modal is open */}
      <div 
        className="flex flex-col flex-1 overflow-hidden bg-black/20 backdrop-blur-3xl rounded-none sm:rounded-2xl border-none sm:border border-white/5 shadow-2xl relative z-10" 
        aria-hidden={isModalOpen}
        // @ts-ignore - 'inert' is a standard attribute but might not be in all TS types yet
        inert={isModalOpen ? '' : undefined}
        style={isModalOpen ? { pointerEvents: 'none' } : {}}
      >
        <FilterBar 
          filters={filters}
          onFilterChange={setFilters}
          uniqueGenders={uniqueGenders}
          uniquePitches={uniquePitches}
          onOpenAiCasting={() => setShowVoiceFinder(true)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />

        {/* AI Filter Status Indicator */}
        {aiResult && (
          <div className="relative z-40 bg-indigo-600/5 border-b border-indigo-500/10 px-4 sm:px-12 py-2 flex items-center justify-between animate-fade-in group">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
              <p className="text-[10px] font-black font-mono text-indigo-400 tracking-widest uppercase">
                Currently Filtering by Neural Recommendation Profile
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsAiCardVisible(true)}
                className="text-[9px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2 group/btn"
              >
                View Recommendation
                <Sparkles size={10} className="group-hover/btn:rotate-12 transition-transform" />
              </button>
              <div className="w-px h-3 bg-white/5"></div>
              <button 
                onClick={clearAiResult}
                className="text-[9px] font-black text-indigo-400 hover:text-white uppercase tracking-widest transition-colors"
                aria-label="Clear AI filtering"
              >
                Clear All Filter_Nodes
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 relative flex flex-col overflow-hidden">
              {filteredVoices.length > 0 ? (
                  viewMode === 'carousel' ? (
                    <div className="w-full flex-1 flex items-center justify-center pb-8 min-h-0">
                         <Carousel3D 
                            voices={filteredVoices}
                            activeIndex={activeIndex}
                            onChange={setActiveIndex}
                            playingVoice={playingVoice}
                            onPlayToggle={handlePlayToggle}
                            disabled={isModalOpen}
                         />
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto">
                      <GridView 
                          voices={filteredVoices}
                          playingVoice={playingVoice}
                          onPlayToggle={handlePlayToggle}
                      />
                    </div>
                  )
              ) : (
                  <div className="w-full h-full flex items-center justify-center pb-24">
                      <div className="text-center animate-fade-in">
                          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 mb-6 shadow-sm">
                              <Info size={32} className="text-zinc-300 dark:text-zinc-500" />
                          </div>
                          <h3 className="text-xl font-serif text-zinc-900 dark:text-white mb-2">No voices found</h3>
                          <p className="text-zinc-500 dark:text-zinc-400 mb-6">Try adjusting your filters or use AI Match.</p>
                          <button 
                              onClick={() => setShowVoiceFinder(true)}
                              className="px-4 py-2 bg-zinc-900 dark:bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-zinc-800 dark:hover:bg-indigo-500 transition-colors"
                          >
                              Open AI Casting
                          </button>
                      </div>
                  </div>
              )}
              
              {!aiResult && filteredVoices.length > 0 && viewMode === 'carousel' && (
                  <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium tracking-widest uppercase bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm inline-block px-3 py-1 rounded-full border border-white/50 dark:border-zinc-800">
                          {activeIndex + 1} / {filteredVoices.length}
                      </p>
                  </div>
              )}
        </main>
      </div>

      {/* Modals are rendered outside the aria-hidden container */}
      {showVoiceFinder && (
        <VoiceFinder 
            voices={VOICE_DATA}
            onRecommendation={(rec) => {
                if (rec) {
                    setAiResult(rec);
                    setIsAiCardVisible(true);
                    setFilters(prev => ({ ...prev, search: '' })); 
                }
                setShowVoiceFinder(false);
            }}
            onClose={() => setShowVoiceFinder(false)}
        />
      )}

      {aiResult && isAiCardVisible && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-1 sm:p-4 bg-zinc-900/60 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-result-title"
          >
             <div className="absolute inset-0" onClick={clearAiResult}></div>
             <div className="relative w-full max-w-5xl animate-slide-up max-h-[96vh] sm:max-h-[90vh] overflow-hidden rounded-xl sm:rounded-2xl shadow-3xl">
                 <AiResultCard 
                    result={aiResult} 
                    voices={filteredVoices} 
                    onClose={clearAiResult} 
                 />
             </div>
          </div>
      )}

      {isAdminLayerOpen && (
        <AdminLayer 
          onClose={() => setIsAdminLayerOpen(false)} 
          onOpenPopulation={() => {}} 
          onOpenAgentProfile={() => {
            setIsAdminLayerOpen(false);
            setIsAgentProfileOpen(true);
          }} 
          onOpenAgentStandard={() => {
            setIsAdminLayerOpen(false);
            setIsAgentStandardOpen(true);
          }}
          onOpenUserStandard={() => {
            setIsAdminLayerOpen(false);
            setIsUserStandardOpen(true);
          }}
        />
      )}

      {isAgentProfileOpen && (
        <AgentProfileLayer 
           onClose={() => setIsAgentProfileOpen(false)}
           onBack={() => {
             setIsAgentProfileOpen(false);
             setIsAdminLayerOpen(true);
           }}
        />
      )}

      {isAgentStandardOpen && (
        <PrometheusAgentProfile 
           onClose={() => {
             setIsAgentStandardOpen(false);
             setIsAdminLayerOpen(true);
           }}
        />
      )}

      {isUserStandardOpen && (
        <UserStandardProfile 
           onClose={() => {
             setIsUserStandardOpen(false);
             setIsAdminLayerOpen(true);
           }}
        />
      )}

      <button
        onClick={() => setIsAdminLayerOpen(true)}
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 p-3 rounded-full bg-zinc-800/10 dark:bg-zinc-800/50 backdrop-blur-md border border-zinc-200 dark:border-white/10 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-all shadow-lg hover:shadow-indigo-500/20 group z-50 focus:ring-4 focus:ring-indigo-500/50 outline-none"
        aria-label="Открыть Панель Управления"
        title="Панель Управления"
      >
         <ShieldAlert size={20} className="group-hover:text-indigo-400 transition-colors" aria-hidden="true" />
      </button>

    </div>
  );
};

export default LobbyPage;