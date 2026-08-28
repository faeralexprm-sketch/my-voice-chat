import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Sparkles, ChevronRight, Activity, Cpu } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans overflow-x-hidden relative p-1 sm:p-2">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-[-20%] right-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-indigo-900/20 blur-[80px] sm:blur-[120px] opacity-60"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full bg-fuchsia-900/20 blur-[80px] sm:blur-[120px] opacity-50"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 w-full p-2 sm:p-4 mb-2 flex justify-between items-center bg-transparent">
        <div className="flex items-center gap-2">
          <Shield className="text-indigo-500" size={24} aria-hidden="true" />
          <span className="text-lg sm:text-xl font-bold tracking-wider font-display">PRM_OS</span>
        </div>
        <button 
          onClick={() => navigate('/auth')}
          className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-white/10 hover:border-indigo-500/50 bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-medium transition-all backdrop-blur-md focus:ring-2 focus:ring-indigo-500 outline-none"
          aria-label="Authentication"
        >
          AUTH
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6 relative z-10 text-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-8 animate-fade-in">
          <Sparkles size={12} aria-hidden="true" />
          <span>Next-Gen Agentic Intelligence</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <span className="block text-zinc-400">Добро пожаловать в</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400">
            PRM Nexus
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          Автономная экосистема, управляемая нейронными агентами. Получите доступ к глубокой сети, управляйте протоколами и синтезируйте реальность.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <button 
            onClick={() => navigate('/execution')}
            className="w-full sm:w-64 px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] flex items-center justify-center gap-2 focus:ring-4 focus:ring-indigo-500/50 outline-none italic"
            aria-label="Начать"
          >
            Начать <ChevronRight size={18} aria-hidden="true" />
          </button>
          <button 
             onClick={() => navigate('/landing/auth/main/adminpane/auth2/content')}
             className="w-full sm:w-64 px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 text-zinc-300 hover:text-white font-medium transition-all flex items-center justify-center gap-2 focus:ring-4 focus:ring-zinc-500/50 outline-none"
             aria-label="Настройки"
          >
            Настройки
          </button>
        </div>
      </main>

      {/* Footer Features */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6 p-1 sm:p-6 pb-4 sm:pb-12 relative z-10 max-w-6xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
         <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md">
            <Cpu className="text-indigo-400 mb-2 sm:mb-4 w-5 h-5 sm:w-6 sm:h-6" />
            <h3 className="text-base sm:text-lg font-medium text-white mb-1 sm:mb-2">Нейронная синхронизация</h3>
            <p className="text-[12px] sm:text-sm text-zinc-500">Действия в реальном времени под управлением LLM, организованные через протокол API Rotator.</p>
         </div>
         <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md">
            <Shield className="text-emerald-400 mb-2 sm:mb-4 w-5 h-5 sm:w-6 sm:h-6" />
            <h3 className="text-base sm:text-lg font-medium text-white mb-1 sm:mb-2">Защита Zero-Trust</h3>
            <p className="text-[12px] sm:text-sm text-zinc-500">Бескомпромиссная безопасность для всех узлов сети и запросов под-агентов.</p>
         </div>
         <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md sm:col-span-2 md:col-span-1">
            <Activity className="text-fuchsia-400 mb-2 sm:mb-4 w-5 h-5 sm:w-6 sm:h-6" />
            <h3 className="text-base sm:text-lg font-medium text-white mb-1 sm:mb-2">Агентская популяция</h3>
            <p className="text-[12px] sm:text-sm text-zinc-500">Сотни настроенных ИИ-агентов, работающих в полной синергии.</p>
         </div>
    </div>
  </div>
);
};

export default LandingPage;
