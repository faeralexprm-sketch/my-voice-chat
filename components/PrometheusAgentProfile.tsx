import React, { useState } from 'react';
import { 
  User, Shield, Zap, Terminal, Clock, Package, Bell, LogOut, Trash2, Crosshair, ChevronLeft
} from 'lucide-react';

interface PrometheusAgentProfileProps {
  onClose: () => void;
}

const PrometheusAgentProfile: React.FC<PrometheusAgentProfileProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const colors = {
    bg: 'bg-[#0a0a0b]',
    card: 'bg-[#121214]',
    accent: 'text-[#FF8C00]',
    accentBg: 'bg-[#FF8C00]',
    border: 'border-[#1f1f23]'
  };

  const agentData = {
    name: 'Кан',
    role: 'Агент - Сеть Агентов',
    level: 1,
    xp: 0,
    maxXp: 1000,
    trust: 0,
    reputation: 1000,
    stats: [
      { label: 'МИССИИ', value: '0', icon: <Crosshair size={18} className="text-orange-500" /> },
      { label: 'КОД (СТРОК)', value: '0', icon: <Terminal size={18} className="text-blue-500" /> },
      { label: 'STREAK', value: '1', icon: <Zap size={18} className="text-yellow-500" /> },
      { label: 'ЧАСОВ', value: '0', icon: <Clock size={18} className="text-gray-400" /> },
    ],
    skills: [
      { name: 'Кодинг', level: 1 },
      { name: 'Безопасность', level: 1 },
      { name: 'Аналитика', level: 1 },
      { name: 'Дипломатия', level: 1 },
      { name: 'Тактика', level: 1 },
    ],
    inventory: [
      { id: 1, type: 'case', icon: <Package size={24} />, active: true },
      { id: 2, type: 'tech', icon: <Terminal size={24} />, active: false },
      { id: 3, type: 'weapon', icon: <Crosshair size={24} />, active: false },
      { id: 4, type: 'armor', icon: <Shield size={24} />, active: false },
      { id: 5, type: 'empty' },
      { id: 6, type: 'empty' },
      { id: 7, type: 'empty' },
      { id: 8, type: 'empty' },
    ]
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className={`relative w-full max-w-md h-[90vh] overflow-y-auto ${colors.bg} text-white font-sans rounded-3xl border border-white/10 shadow-2xl flex flex-col custom-scrollbar`}>
        {/* Header */}
        <header className="p-4 flex justify-between items-center border-b border-white/5 bg-black/40 sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
              <ChevronLeft size={24} />
            </button>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-600 to-red-900 flex items-center justify-center border border-orange-500/50 shadow-[0_0_15px_rgba(255,140,0,0.3)]">
              <span className="text-xl font-bold text-white">П</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-widest text-orange-500 uppercase">Прометей</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Профиль Агента</p>
            </div>
          </div>
          <button className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all">
            <Bell size={20} className="text-orange-400" />
          </button>
        </header>

        <main className="p-4 space-y-6 flex-1">
          {/* Hero Section */}
          <section className="relative flex flex-col items-center py-6">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-2xl group-hover:bg-orange-500/40 transition-all duration-700"></div>
              <div className="relative w-40 h-40 rounded-full border-2 border-orange-500/30 p-1 bg-[#1a1a1c] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <div className="w-full h-full rounded-full border border-orange-500/50 overflow-hidden bg-gradient-to-b from-gray-800 to-black flex items-center justify-center">
                  <User size={80} className="text-gray-600 translate-y-4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 right-4 w-4 h-4 bg-orange-500 rounded-full border-2 border-[#1a1a1c] shadow-[0_0_10px_#f97316]"></div>
              </div>
            </div>

            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">{agentData.name}</h2>
              <p className="text-orange-500/80 text-xs font-medium uppercase tracking-widest">{agentData.role}</p>
            </div>

            <div className="w-full mt-6 space-y-1">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest px-1">
                <span className="text-gray-400">Уровень {agentData.level}</span>
                <span className="text-orange-500">{agentData.xp} / {agentData.maxXp} XP</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,140,0,0.5)]"
                  style={{ width: `${(agentData.xp / agentData.maxXp) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 w-full">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Доверие</p>
                <p className="text-lg font-bold text-white">{agentData.trust}</p>
              </div>
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Репутация</p>
                <p className="text-lg font-bold text-orange-500">{agentData.reputation}</p>
              </div>
            </div>
          </section>

          {/* Tabs Navigation */}
          <nav className="flex bg-black/40 p-1 rounded-xl border border-white/10">
            {['overview', 'inventory', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-[10px] uppercase font-bold tracking-widest rounded-lg transition-all ${
                  activeTab === tab 
                  ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20' 
                  : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab === 'overview' ? 'Обзор' : tab === 'inventory' ? 'Инвентарь' : 'Настройки'}
              </button>
            ))}
          </nav>

          {/* Content Area */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {agentData.stats.map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center space-y-2 hover:border-orange-500/30 transition-colors">
                      {stat.icon}
                      <div className="text-center">
                        <p className="text-lg font-black leading-none">{stat.value}</p>
                        <p className="text-[8px] text-gray-500 mt-1 uppercase font-bold">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
                  <h3 className="text-[10px] uppercase font-black tracking-widest text-gray-400">Навыки Неиросети</h3>
                  <div className="space-y-3">
                    {agentData.skills.map((skill, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span>{skill.name}</span>
                          <span className="text-orange-500">1%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-600 rounded-full" style={{ width: '1%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-[10px] uppercase font-black tracking-widest text-gray-400">Модули / Снаряжение</h3>
                  <span className="text-[10px] text-orange-500 font-bold">4 / 8 СЛОТОВ</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {agentData.inventory.map((item, i) => (
                    <div 
                      key={i} 
                      className={`aspect-square rounded-xl border flex items-center justify-center transition-all cursor-pointer group ${
                        item.type === 'empty' 
                        ? 'border-white/5 bg-white/[0.02] hover:border-white/20' 
                        : 'border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10 shadow-inner'
                      }`}
                    >
                      {item.type !== 'empty' ? (
                        <div className="text-orange-500 group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex items-center gap-3">
                  <Package size={20} className="text-orange-500 shrink-0" />
                  <p className="text-[10px] text-orange-200/70 leading-relaxed">
                    <span className="font-bold text-orange-400">Подсказка:</span> Интеграция программного обеспечения увеличивает вычислительный потенциал.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                   <div className="p-4 border-b border-white/5">
                      <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-2">Идентификатор агента</p>
                      <div className="space-y-2">
                         <div className="flex justify-between text-xs">
                            <span className="text-gray-400">ID:</span>
                            <span className="text-orange-500 font-mono">PRM-MN24BC50-1P88W</span>
                         </div>
                         <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Дамп:</span>
                            <span className="text-white">22.03.2025</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="p-4 space-y-4">
                      {[
                        { label: 'Режим тишины (Silence)', desc: 'Блокировать внешние пинги', active: true },
                        { label: 'Телеметрия', desc: 'Отправлять логи в ядро', active: true },
                        { label: 'Агрессивная защита', desc: 'Автоматический сброс при угрозе', active: false },
                      ].map((toggle, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <div>
                            <p className="text-xs font-bold text-gray-200">{toggle.label}</p>
                            <p className="text-[10px] text-gray-500">{toggle.desc}</p>
                          </div>
                          <div className={`w-10 h-5 rounded-full relative transition-colors ${toggle.active ? 'bg-orange-500' : 'bg-gray-700'}`}>
                            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${toggle.active ? 'right-1' : 'left-1'}`}></div>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <footer className="text-center py-6 opacity-30 select-none pb-8">
          <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-white">Prometheus Project © 2026 | Agent Node</p>
        </footer>
      </div>
    </div>
  );
};

export default PrometheusAgentProfile;
