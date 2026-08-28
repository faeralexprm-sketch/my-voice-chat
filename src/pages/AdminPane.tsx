import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Network, Database, ShieldAlert, Cpu, Eye, ArrowLeft, Mic } from 'lucide-react';

const AdminPane: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans p-1 sm:p-2 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-10%] left-[-10%] w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full bg-red-900/10 blur-[80px] sm:blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full bg-indigo-900/10 blur-[80px] sm:blur-[120px] opacity-30"></div>
      </div>

      <div className="min-h-[calc(100vh-8px)] sm:min-h-[calc(100vh-16px)] bg-black/20 backdrop-blur-3xl rounded-none sm:rounded-2xl border-none sm:border border-white/5 shadow-2xl relative z-10 flex flex-col p-4 sm:p-8">
        {/* Top Bar */}
        <div className="relative z-10 flex items-center justify-between mb-8 sm:mb-12 animate-fade-in max-w-6xl w-full mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 sm:p-3 -ml-1 sm:-ml-2 rounded-xl sm:rounded-2xl hover:bg-white/5 text-zinc-500 hover:text-white transition-all border border-transparent hover:border-white/10 active:scale-95 focus:ring-2 focus:ring-red-500 outline-none"
            aria-label="Back to previous page"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="flex items-center gap-3">
             <div className="hidden sm:block h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
             <span className="text-[8px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.3em] text-red-500 font-black uppercase">Root Access / Content Pane</span>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl w-full mx-auto space-y-8 sm:space-y-12 animate-slide-up flex-1 flex flex-col">
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 border-b border-white/5 pb-8 sm:pb-10">
            <div className="p-4 sm:p-5 bg-red-500/10 rounded-2xl sm:rounded-3xl border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
               <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase italic">Control_Center</h1>
              <p className="text-[8px] sm:text-xs text-zinc-500 font-mono mt-1 sm:mt-2 tracking-widest break-all px-2 sm:px-0">PATH://LANDING/AUTH/MAIN/ADMINPANE/AUTH2/CONTENT</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 flex-1">
            {/* Population Button (Requested) */}
            <button 
              onClick={() => navigate('/main/admin/auth2/admain/inf')}
              className="group relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-indigo-500/50 p-4 sm:p-8 flex flex-col items-start transition-all hover:shadow-2xl hover:shadow-indigo-500/10 active:scale-[0.98] focus:ring-4 focus:ring-indigo-500/30 outline-none"
            >
              <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                 <Network className="w-20 h-20 sm:w-28 sm:h-28 text-indigo-500" />
              </div>
              <div className="p-3 sm:p-4 bg-indigo-500/10 rounded-xl sm:rounded-2xl mb-4 sm:mb-8 group-hover:scale-110 transition-transform">
                <Network className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-3 tracking-tight">Население</h3>
              <p className="text-[12px] sm:text-sm text-zinc-500 text-left leading-relaxed">Администрирование популяций агентов, мониторинг рождаемости нейро-кода и контроль фракций.</p>
            </button>

            {/* Dummy Button 1 */}
            <button className="group relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-zinc-900/20 backdrop-blur-sm border border-white/5 hover:border-emerald-500/50 p-4 sm:p-8 flex flex-col items-start transition-all opacity-60 hover:opacity-100 hover:bg-zinc-900/40 active:scale-[0.98] outline-none">
              <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                 <Database className="w-20 h-20 sm:w-28 sm:h-28 text-emerald-500" />
              </div>
              <div className="p-3 sm:p-4 bg-emerald-500/10 rounded-xl sm:rounded-2xl mb-4 sm:mb-8">
                <Database className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-3 tracking-tight">Базы Знаний</h3>
              <p className="text-[12px] sm:text-sm text-zinc-500 text-left leading-relaxed">Управление векторными хранилищами, индексация RAG-контекста и оптимизация памяти.</p>
            </button>

            {/* Dummy Button 2 */}
            <button className="group relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-zinc-900/20 backdrop-blur-sm border border-white/5 hover:border-fuchsia-500/50 p-4 sm:p-8 flex flex-col items-start transition-all opacity-60 hover:opacity-100 hover:bg-zinc-900/40 active:scale-[0.98] outline-none">
              <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                 <Cpu className="w-20 h-20 sm:w-28 sm:h-28 text-fuchsia-500" />
              </div>
              <div className="p-3 sm:p-4 bg-fuchsia-500/10 rounded-xl sm:rounded-2xl mb-4 sm:mb-8">
                <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-fuchsia-400" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-3 tracking-tight">API Ротатор</h3>
              <p className="text-[12px] sm:text-sm text-zinc-500 text-left leading-relaxed">Трафик-менеджмент, балансировка нагрузки между Gemini, Claude и GPT-4o в реальном времени.</p>
            </button>

            {/* Voice Admin Button (Requested) */}
            <button 
               onClick={() => navigate('/admin/voice/config')}
               className="group relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-fuchsia-500/50 p-4 sm:p-8 flex flex-col items-start transition-all hover:shadow-2xl hover:shadow-fuchsia-500/10 active:scale-[0.98] focus:ring-4 focus:ring-fuchsia-500/30 outline-none"
            >
              <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                 <Mic className="w-20 h-20 sm:w-28 sm:h-28 text-fuchsia-500" />
              </div>
              <div className="p-3 sm:p-4 bg-fuchsia-500/10 rounded-xl sm:rounded-2xl mb-4 sm:mb-8 group-hover:scale-110 transition-transform">
                <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-fuchsia-400" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-3 tracking-tight">Настройки Голоса</h3>
              <p className="text-[12px] sm:text-sm text-zinc-500 text-left leading-relaxed">Конфигурация Quantum Core, выбор нейронных архитектур TTS и управление стабильностью синтеза.</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPane;
