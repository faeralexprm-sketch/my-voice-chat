import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Search, Filter, Activity } from 'lucide-react';

const PopulationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans flex flex-col relative overflow-hidden p-1 sm:p-2">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-10%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-emerald-900/10 blur-[80px] sm:blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-indigo-900/10 blur-[80px] sm:blur-[120px] opacity-30"></div>
      </div>

      <div className="flex-1 bg-black/20 backdrop-blur-3xl rounded-none sm:rounded-2xl border-none sm:border border-white/5 shadow-2xl relative z-10 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="relative z-10 px-4 sm:px-6 py-3 sm:py-5 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 sm:p-3 -ml-1 sm:-ml-2 rounded-xl sm:rounded-2xl hover:bg-white/5 text-zinc-500 hover:text-white transition-all border border-transparent hover:border-white/10 active:scale-95 focus:ring-2 focus:ring-emerald-500 outline-none"
              aria-label="Back to Admin Center"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white uppercase italic">Neural_Population</h1>
              <p className="text-[8px] sm:text-[10px] text-zinc-500 font-mono tracking-widest mt-0.5">/MAIN/ADMIN/AUTH2/ADMAIN/INF</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg sm:rounded-xl text-emerald-400 text-[8px] sm:text-xs font-bold uppercase tracking-tighter">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span>Backbone_Stable</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex-1 p-2 sm:p-6 overflow-y-auto w-full space-y-4 sm:space-y-10 animate-slide-up">
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between items-center bg-zinc-900/40 backdrop-blur-md p-3 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-white/5 shadow-2xl">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 sm:w-5 sm:h-5" />
              <input 
                type="text"
                placeholder="SEARCH_BY_NEURAL_ID..."
                className="w-full bg-black/40 border border-white/5 focus:border-emerald-500/50 rounded-xl sm:rounded-2xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-[12px] sm:text-sm text-white focus:outline-none transition-all placeholder:text-zinc-600 font-mono"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all w-full sm:w-auto justify-center active:scale-95">
              <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Filters
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6">
            <AgentCard name="Queen" role="Страж Бесконечности" initial="Q" color="indigo" tags={['Phase 1 Vet', 'Security']} />
            <AgentCard name="Prometheus" role="Протокол 401" initial="P" color="fuchsia" tags={['Creator', 'Architect']} />
            <AgentCard name="Cyber Sentinel" role="DLP & WAF Expert" initial="CS" color="emerald" tags={['Defense', 'Security']} />
            <AgentCard name="Alpha" role="Strategic Intelligence" initial="A" color="blue" tags={['Management', 'Analytics']} />
          </div>
        </main>
      </div>
    </div>
  );
};

const AgentCard = ({ name, role, initial, color, tags }: { name: string, role: string, initial: string, color: string, tags: string[] }) => (
  <div 
     className={`bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 hover:border-${color}-500/50 transition-all cursor-pointer group hover:-translate-y-2 hover:shadow-2xl hover:shadow-${color}-500/10 active:scale-[0.98] outline-none`}
  >
     <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-[1.5rem] border border-${color}-500/20 bg-black/40 flex items-center justify-center mb-4 sm:mb-6 overflow-hidden relative group-hover:scale-110 transition-transform`}>
       <div className={`absolute inset-0 bg-${color}-500/10 group-hover:bg-${color}-500/20 transition-colors`}></div>
       <span className={`text-xl sm:text-2xl font-black text-${color}-400 relative z-10 tracking-tighter`}>{initial}</span>
     </div>
     <h3 className="text-base sm:text-xl font-bold text-white mb-0.5 sm:mb-1 group-hover:text-white transition-colors tracking-tight truncate">{name}</h3>
     <p className="text-[8px] sm:text-[10px] text-zinc-500 mb-4 sm:mb-6 font-mono uppercase tracking-widest truncate">{role}</p>
     <div className="flex flex-wrap gap-1.5 sm:gap-2">
       {tags.map((tag, i) => (
         <span key={i} className={`text-[8px] sm:text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-white/5 text-zinc-400 border border-white/5 font-bold uppercase tracking-tighter`}>
           {tag}
         </span>
       ))}
     </div>
  </div>
);

export default PopulationPage;
