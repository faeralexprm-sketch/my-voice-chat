import React, { useState } from 'react';
import { X, Users, Shield, Database, Activity, Terminal, User } from 'lucide-react';

interface AdminLayerProps {
  onClose: () => void;
  onOpenPopulation: () => void;
  onOpenAgentProfile: () => void;
  onOpenAgentStandard: () => void;
  onOpenUserStandard: () => void;
}

const AdminLayer: React.FC<AdminLayerProps> = ({ onClose, onOpenPopulation, onOpenAgentProfile, onOpenAgentStandard, onOpenUserStandard }) => {
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xl animate-fade-in win-glass-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-panel-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true"></div>
      <div className="relative w-full max-w-6xl h-[85vh] bg-white/10 dark:bg-[#09090b]/80 border border-white/20 dark:border-zinc-800/50 shadow-2xl rounded-2xl flex flex-col overflow-hidden backdrop-blur-3xl animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 dark:border-zinc-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <Shield className="text-indigo-400" size={24} />
            </div>
            <div>
              <h2 id="admin-panel-title" className="text-2xl font-display font-medium text-white tracking-tight">Панель Управления</h2>
              <p className="text-sm text-zinc-400 font-mono">landing/auth/main/adminpane/auth2/content/page.jsx</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors focus:ring-2 focus:ring-white focus:outline-none"
            aria-label="Close admin panel"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 border-r border-white/10 dark:border-zinc-800/50 p-4 flex flex-col gap-2">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white border border-white/10 transition-all hover:bg-white/10">
              <Activity size={18} className="text-emerald-400" />
              <span className="font-medium">Мониторинг</span>
            </button>
            <button 
              onClick={onOpenPopulation}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all group"
            >
              <Users size={18} className="group-hover:text-amber-400 transition-colors" />
              <span className="font-medium">Население</span>
            </button>
            <button 
              onClick={onOpenAgentProfile}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all group"
            >
              <Users size={18} className="group-hover:text-fuchsia-400 transition-colors" />
              <span className="font-medium">Досье Queen</span>
            </button>
            <button 
              onClick={onOpenAgentStandard}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all group"
            >
              <User size={18} className="group-hover:text-orange-400 transition-colors" />
              <span className="font-medium">Стандарт Агента</span>
            </button>
            <button 
              onClick={onOpenUserStandard}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all group"
            >
              <User size={18} className="group-hover:text-cyan-400 transition-colors" />
              <span className="font-medium">Стандарт Юзера</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all group">
              <Database size={18} className="group-hover:text-blue-400 transition-colors" />
              <span className="font-medium">Базы данных</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all group">
              <Terminal size={18} className="group-hover:text-pink-400 transition-colors" />
              <span className="font-medium">Терминал (SEC)</span>
            </button>
          </div>

          {/* Main Area */}
          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-3 gap-6">
               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                 <h3 className="text-zinc-400 font-mono text-sm mb-2">SEC_STATUS</h3>
                 <p className="text-2xl font-bold text-emerald-400 tracking-wider">CLEAR</p>
               </div>
               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                 <h3 className="text-zinc-400 font-mono text-sm mb-2">Active Connections</h3>
                 <p className="text-2xl font-bold text-white tracking-wider">1,492</p>
               </div>
               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                 <h3 className="text-zinc-400 font-mono text-sm mb-2">System Load</h3>
                 <p className="text-2xl font-bold text-amber-400 tracking-wider">42%</p>
               </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-medium text-white mb-4">Журнал Системы безопасности (DLP)</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex gap-4 p-3 rounded-lg bg-zinc-900/50 text-zinc-300">
                  <span className="text-zinc-500">[17:01:42]</span>
                  <span className="text-emerald-400">INFO</span>
                  <span>Neural audit completed. No anomalies detected.</span>
                </div>
                <div className="flex gap-4 p-3 rounded-lg bg-zinc-900/50 text-zinc-300">
                  <span className="text-zinc-500">[17:02:15]</span>
                  <span className="text-amber-400">WARN</span>
                  <span>Base64 entropy spike near endpoint /auth2/verify.</span>
                </div>
                <div className="flex gap-4 p-3 rounded-lg bg-zinc-900/50 text-zinc-300">
                  <span className="text-zinc-500">[17:04:01]</span>
                  <span className="text-pink-400">BLOCK</span>
                  <span>Attempted prompt injection nullified. Origin: Sector 7.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayer;
