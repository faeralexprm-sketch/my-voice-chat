import AgenticVoiceChat from '../components/AgenticVoiceChat';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Terminal, 
  Activity, 
  Cpu, 
  Shield, 
  Globe, 
  ArrowLeft, 
  Play, 
  Square, 
  RefreshCw,
  Search,
  Settings,
  MoreVertical,
  Code,
  Layers,
  Box,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ExecutionAgentPage: React.FC = () => {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'console' | 'graph' | 'metrics' | 'chat'>('console');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const timestamp = new Date().toLocaleTimeString();
        const events = [
          `[${timestamp}] INFO: Initializing neural backbone sync...`,
          `[${timestamp}] DEBUG: Handshaking with node PRM-Nexus-08...`,
          `[${timestamp}] SUCCESS: Quantum handshake complete.`,
          `[${timestamp}] WARN: High latency detected in Sector 4.`,
          `[${timestamp}] INFO: Re-routing execution through backup fiber...`,
          `[${timestamp}] INFO: Executing behavioral heuristic sweep...`,
          `[${timestamp}] DATA: Vector cluster 8812 processed (0.4ms).`
        ];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        setLogs(prev => [...prev.slice(-100), randomEvent]);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans flex flex-col relative overflow-hidden selection:bg-indigo-500/30 p-1 sm:p-2">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-10%] right-[-10%] w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] rounded-full bg-indigo-900/15 blur-[80px] sm:blur-[120px] opacity-70"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-fuchsia-900/10 blur-[60px] sm:blur-[100px] opacity-50"></div>
      </div>

      <div className="flex-1 bg-black/20 backdrop-blur-3xl rounded-none sm:rounded-2xl border-none sm:border border-white/5 shadow-2xl relative z-10 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="relative z-50 px-4 sm:px-6 py-3 sm:py-5 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => navigate('/')}
              className="p-2 sm:p-3 -ml-1 sm:-ml-2 rounded-xl sm:rounded-2xl hover:bg-white/5 text-zinc-500 hover:text-white transition-all border border-transparent hover:border-white/10 active:scale-95 focus:ring-2 focus:ring-indigo-500 outline-none"
              aria-label="Back to Landing"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
               <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
               </div>
               <div>
                  <h1 className="text-sm sm:text-xl font-black tracking-tighter uppercase italic leading-none">Nexus_Execution_V</h1>
                  <p className="text-[8px] sm:text-[10px] text-zinc-500 font-mono tracking-widest mt-0.5 sm:mt-1">STATUS: {isRunning ? 'OPERATIONAL' : 'DORMANT'}</p>
               </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                <Search size={14} className="text-zinc-500" />
                <input type="text" placeholder="GLOBAL_SEARCH..." className="bg-transparent border-none text-[10px] font-mono tracking-widest focus:outline-none w-32" />
             </div>
             <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-500 hover:text-white transition-all">
                <RefreshCw size={18} />
             </button>
             <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-500 hover:text-white transition-all">
                <Settings size={18} />
             </button>
          </div>
        </header>

        <main className="flex-1 relative z-10 p-2 sm:p-6 flex flex-col gap-6 animate-fade-in">
            <div className="flex gap-2">
                <TabButton active={activeTab === 'console'} onClick={() => setActiveTab('console')} icon={<Terminal size={14} />} label="CONSOLE" />
                <TabButton active={activeTab === 'graph'} onClick={() => setActiveTab('graph')} icon={<Box size={14} />} label="GRAPH" />
                <TabButton active={activeTab === 'metrics'} onClick={() => setActiveTab('metrics')} icon={<Activity size={14} />} label="METRICS" />
                <TabButton active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} icon={<MessageSquare size={14} />} label="CHAT" />
            </div>

            <div className="flex-1 bg-black/40 rounded-2xl border border-white/5 p-4 overflow-hidden">
                {activeTab === 'chat' && <AgenticVoiceChat />}
                {activeTab === 'console' && (
                    <div ref={scrollRef} className="h-full overflow-y-auto font-mono text-[10px] sm:text-xs text-zinc-400 space-y-1 custom-scrollbar">
                        {logs.map((log, i) => <div key={i}>{log}</div>)}
                    </div>
                )}
                {/* Graph/Metrics placeholder */}
                {(activeTab === 'graph' || activeTab === 'metrics') && (
                    <div className="h-full flex items-center justify-center text-zinc-600 font-mono text-xs">
                        MODULE_DATA_RENDERING_PENDING
                    </div>
                )}
            </div>
        </main>
      </div>
    </div>
  );
};

const MetricRow = ({ label, value, active = true }: { label: string, value: string, active?: boolean }) => (
  <div className="flex justify-between items-center group">
    <span className="text-[8px] sm:text-[10px] text-zinc-500 font-mono tracking-widest uppercase group-hover:text-zinc-300 transition-colors">{label}</span>
    <span className={`text-[8px] sm:text-[10px] font-black font-mono tracking-widest uppercase transition-colors ${active ? 'text-white' : 'text-zinc-700'}`}>{value}</span>
  </div>
);

const TabButton = ({ active, onClick, icon, label, fullWidth = false }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, fullWidth?: boolean }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-2 rounded-xl sm:rounded-[1.25rem] text-[8px] sm:text-[10px] font-black tracking-widest transition-all ${fullWidth ? 'flex-1' : ''} ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-zinc-500 hover:text-white'}`}
  >
    {icon} {label}
  </button>
);

export default ExecutionAgentPage;
