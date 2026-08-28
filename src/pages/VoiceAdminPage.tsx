import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Cpu, Mic, Activity, Globe, ArrowLeft, Shield } from 'lucide-react';
import VoiceSynthesisAnalytics from '../../components/VoiceSynthesisAnalytics';

const VoiceAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [modelTemp, setModelTemp] = useState(0.7);
  const [voiceStability, setVoiceStability] = useState(0.85);
  const [audioNormalization, setAudioNormalization] = useState(true);

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans flex flex-col relative overflow-hidden p-1 sm:p-2">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-10%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-indigo-900/10 blur-[80px] sm:blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-fuchsia-900/10 blur-[80px] sm:blur-[120px] opacity-30"></div>
      </div>

      <div className="flex-1 bg-black/20 backdrop-blur-3xl rounded-none sm:rounded-2xl border-none sm:border border-white/5 shadow-2xl relative z-10 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="relative z-10 px-4 sm:px-6 py-3 sm:py-5 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 sm:p-3 -ml-1 sm:-ml-2 rounded-xl sm:rounded-2xl hover:bg-white/5 text-zinc-500 hover:text-white transition-all border border-transparent hover:border-white/10 active:scale-95 focus:ring-2 focus:ring-indigo-500 outline-none"
              aria-label="Back to Admin Center"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white uppercase italic">Quantum_Core_Control</h1>
              <p className="text-[8px] sm:text-[10px] text-zinc-500 font-mono tracking-widest mt-0.5">V8.2.0-STABLE | NEURAL_BACKBONE_ACTIVE</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg sm:rounded-xl text-indigo-400 text-[8px] sm:text-xs font-bold uppercase tracking-tighter">
            <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Encrypted_Session</span>
          </div>
        </header>

        <main className="relative z-10 flex-1 p-2 sm:p-6 overflow-y-auto w-full space-y-4 sm:space-y-10 animate-fade-in py-6 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
              {/* Model Unified Settings */}
              <div className="p-4 sm:p-10 rounded-2xl sm:rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-md border border-white/5 space-y-4 sm:space-y-8 shadow-2xl">
                  <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
                      <div className="p-2 sm:p-3 bg-indigo-500/10 rounded-xl sm:rounded-2xl text-indigo-400">
                          <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                          <h5 className="text-base sm:text-xl font-bold text-white tracking-tight">Unified LLM Architecture</h5>
                          <p className="text-[8px] sm:text-xs text-zinc-500 uppercase tracking-widest font-mono">Backbone Configuration</p>
                      </div>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                      <div className="space-y-2 sm:space-y-4">
                          <div className="flex justify-between items-center">
                              <label className="text-[8px] sm:text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">Neural_Temperature</label>
                              <span className="text-xs sm:text-sm text-indigo-400 font-mono font-bold">{modelTemp.toFixed(2)}</span>
                          </div>
                          <input 
                              type="range" min="0" max="1" step="0.01" value={modelTemp} 
                              onChange={(e) => setModelTemp(parseFloat(e.target.value))}
                              className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-indigo-500"
                          />
                      </div>
                      
                      <div className="bg-black/40 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/5 space-y-3 sm:space-y-4">
                          <span className="text-[8px] sm:text-[9px] text-indigo-500 font-black uppercase tracking-widest block">Active_Nodes</span>
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                              {['Gemini-1.5-Pro', 'Llama-3-70B', 'Mistral-Large', 'Claude-3.5-Sonnet'].map(m => (
                                  <span key={m} className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border text-[8px] sm:text-[10px] font-mono transition-colors ${m.includes('Gemini') ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-white/5 border-white/10 text-zinc-500'}`}>
                                      {m}
                                  </span>
                              ))}
                          </div>
                          <p className="text-[12px] sm:text-sm text-zinc-500 leading-relaxed font-light">Система автоматически балансирует нагрузку между open-source и проприетарными моделями для минимизации задержек и повышения точности вывода.</p>
                      </div>
                  </div>
              </div>

              {/* TTS Unified Settings */}
              <div className="p-4 sm:p-10 rounded-2xl sm:rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-md border border-white/5 space-y-4 sm:space-y-8 shadow-2xl">
                  <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
                      <div className="p-2 sm:p-3 bg-fuchsia-500/10 rounded-xl sm:rounded-2xl text-fuchsia-400">
                          <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                          <h5 className="text-base sm:text-xl font-bold text-white tracking-tight">Neural Audio Engine</h5>
                          <p className="text-[8px] sm:text-xs text-zinc-500 uppercase tracking-widest font-mono">Synthesis & Normalization</p>
                      </div>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                      <div className="space-y-2 sm:space-y-4">
                          <div className="flex justify-between items-center">
                              <label className="text-[8px] sm:text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">Voice_Stability</label>
                              <span className="text-xs sm:text-sm text-fuchsia-400 font-mono font-bold">{voiceStability.toFixed(2)}</span>
                          </div>
                          <input 
                              type="range" min="0" max="1" step="0.01" value={voiceStability} 
                              onChange={(e) => setVoiceStability(parseFloat(e.target.value))}
                              className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-fuchsia-500"
                          />
                      </div>

                      <label className="flex items-center justify-between bg-black/40 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/5 cursor-pointer group hover:bg-black/60 transition-colors">
                          <div className="flex items-center gap-3 sm:gap-4">
                              <div className={`w-10 sm:w-12 h-6 sm:h-7 rounded-full p-1 transition-colors duration-300 ${audioNormalization ? 'bg-fuchsia-600' : 'bg-zinc-800'}`}>
                                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-lg ${audioNormalization ? 'translate-x-5' : 'translate-x-0'}`} />
                              </div>
                              <div>
                                  <span className="text-[12px] sm:text-sm text-white font-bold tracking-tight block">Auto-Normalization</span>
                                  <span className="text-[8px] sm:text-xs text-zinc-500 uppercase tracking-tighter">Loudness Control Peak Protection</span>
                              </div>
                          </div>
                          <input 
                              type="checkbox" 
                              className="hidden" 
                              checked={audioNormalization} 
                              onChange={() => setAudioNormalization(!audioNormalization)}
                          />
                          <Activity className={`w-4 h-4 sm:w-5 sm:h-5 ${audioNormalization ? 'text-fuchsia-400' : 'text-zinc-600'}`} />
                      </label>
                  </div>
              </div>
          </div>

          {/* Visual Analytics: Real-Time Synthesis Latency & Token Usage */}
          <VoiceSynthesisAnalytics />

          {/* Global Strategy Section */}
          <div className="p-6 sm:p-12 rounded-2xl sm:rounded-[3.5rem] bg-gradient-to-br from-indigo-900/20 via-zinc-900/40 to-fuchsia-900/20 border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 sm:p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <Globe className="w-48 h-48 sm:w-96 sm:h-96" />
              </div>
              <div className="relative z-10 w-full lg:w-2/3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[8px] sm:text-[10px] font-black uppercase tracking-widest mb-4 sm:mb-6">
                      <Database className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      Neural Strategy Roadmap
                  </div>
                  <h5 className="text-xl sm:text-3xl font-black text-white mb-4 sm:mb-6 tracking-tighter italic uppercase">Infrastructural_Optimization</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-10">
                      <div className="space-y-2 sm:space-y-3">
                          <span className="text-[9px] sm:text-[11px] text-indigo-400 font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Cross-Model Sync</span>
                          <p className="text-[12px] sm:text-sm text-zinc-400 leading-relaxed font-light">Внедрение векторных эмбеддингов позволяет сохранять контекст диалога и "личность" агента при динамическом переключении между различными языковыми моделями в зависимости от сложности запроса.</p>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                          <span className="text-[9px] sm:text-[11px] text-fuchsia-400 font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Neural Cross-Fade</span>
                          <p className="text-[12px] sm:text-sm text-zinc-400 leading-relaxed font-light">Специальный алгоритм постобработки аудио-потока, который выполняет кросс-фейдинг между выводами нескольких TTS движков, устраняя характерную "роботизацию" и микро-паузы в длинных предложениях.</p>
                      </div>
                  </div>
              </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VoiceAdminPage;
