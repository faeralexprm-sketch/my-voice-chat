import React, { useState } from 'react';
import { 
  User, Shield, Zap, Terminal, Clock, Package, Bell, LogOut, Trash2, Brain, ChevronLeft, Fingerprint, Activity, Network
} from 'lucide-react';

interface UserStandardProfileProps {
  onClose: () => void;
}

const UserStandardProfile: React.FC<UserStandardProfileProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const colors = {
    bg: 'bg-[#050B14]', // Dark deep blue for human/organic
    card: 'bg-[#0A1628]',
    accent: 'text-[#00E5FF]', // Cyan
    accentBg: 'bg-[#00E5FF]',
    border: 'border-[#1A2C42]'
  };

  const userData = {
    name: 'Фаэр (Alex)',
    role: 'Пользователь - Создатель',
    level: 42,
    xp: 8450,
    maxXp: 10000,
    trust: 99,
    reputation: 9999,
    stats: [
      { label: 'ПРОЕКТЫ', value: '12', icon: <Network size={18} className="text-cyan-400" /> },
      { label: 'КРЕАТИВ (ИНТ)', value: '88', icon: <Brain size={18} className="text-fuchsia-400" /> },
      { label: 'ЭНЕРГИЯ', value: '100', icon: <Zap size={18} className="text-yellow-400" /> },
      { label: 'СЕУНД', value: '∞', icon: <Clock size={18} className="text-gray-400" /> },
    ],
    skills: [
      { name: 'Воображение', level: 95 },
      { name: 'Эмпатия', level: 82 },
      { name: 'Логика', level: 75 },
      { name: 'Управление ИИ', level: 99 },
      { name: 'Био-стабильность', level: 60 },
    ],
    inventory: [
      { id: 1, type: 'access_key', icon: <Fingerprint size={24} />, active: true },
      { id: 2, type: 'tech', icon: <Terminal size={24} />, active: true },
      { id: 3, type: 'biomonitor', icon: <Activity size={24} />, active: true },
      { id: 4, type: 'empty' },
      { id: 5, type: 'empty' },
      { id: 6, type: 'empty' },
      { id: 7, type: 'empty' },
      { id: 8, type: 'empty' },
    ]
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className={`relative w-full max-w-md h-[90vh] overflow-y-auto ${colors.bg} text-white font-sans rounded-3xl border border-cyan-500/20 shadow-2xl flex flex-col custom-scrollbar shadow-cyan-900/20`}>
        {/* Header */}
        <header className="p-4 flex justify-between items-center border-b border-white/5 bg-black/40 sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
              <ChevronLeft size={24} />
            </button>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-900 flex items-center justify-center border border-cyan-500/50 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              <span className="text-xl font-bold text-white">Б</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-widest text-cyan-400 uppercase">Био-Сущность</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Профиль Пользователя</p>
            </div>
          </div>
          <button className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all">
            <Bell size={20} className="text-cyan-400" />
          </button>
        </header>

        <main className="p-4 space-y-6 flex-1">
          {/* Hero Section */}
          <section className="relative flex flex-col items-center py-6">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl group-hover:bg-cyan-500/40 transition-all duration-700"></div>
              <div className="relative w-40 h-40 rounded-full border-2 border-cyan-500/30 p-1 bg-[#0A1628] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <div className="w-full h-full rounded-full border border-cyan-500/50 overflow-hidden bg-gradient-to-b from-blue-900 to-[#0A1628] flex items-center justify-center">
                  <User size={80} className="text-cyan-100 translate-y-4 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 right-4 w-4 h-4 bg-cyan-400 rounded-full border-2 border-[#0A1628] shadow-[0_0_10px_#00E5FF]"></div>
              </div>
            </div>

            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">{userData.name}</h2>
              <p className="text-cyan-400/80 text-xs font-medium uppercase tracking-widest">{userData.role}</p>
            </div>

            <div className="w-full mt-6 space-y-1">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest px-1">
                <span className="text-gray-400">Уровень {userData.level}</span>
                <span className="text-cyan-400">{userData.xp} / {userData.maxXp} XP</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                  style={{ width: `${(userData.xp / userData.maxXp) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 w-full">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Био-Статус</p>
                <p className="text-lg font-bold text-white">Стабилен</p>
              </div>
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Уровень Доступа</p>
                <p className="text-lg font-bold text-cyan-400">OMNI</p>
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
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' 
                  : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab === 'overview' ? 'Обзор' : tab === 'inventory' ? 'Артефакты' : 'Настройки'}
              </button>
            ))}
          </nav>

          {/* Content Area */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {userData.stats.map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center space-y-2 hover:border-cyan-500/30 transition-colors">
                      {stat.icon}
                      <div className="text-center">
                        <p className="text-lg font-black leading-none">{stat.value}</p>
                        <p className="text-[8px] text-gray-400 mt-1 uppercase font-bold">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
                  <h3 className="text-[10px] uppercase font-black tracking-widest text-cyan-500/70">Органические навыки</h3>
                  <div className="space-y-3">
                    {userData.skills.map((skill, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span>{skill.name}</span>
                          <span className="text-cyan-400">{skill.level}%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${skill.level}%` }}></div>
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
                  <h3 className="text-[10px] uppercase font-black tracking-widest text-gray-400">Доступы / Устройства</h3>
                  <span className="text-[10px] text-cyan-400 font-bold">3 / 8 СЛОТОВ</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {userData.inventory.map((item, i) => (
                    <div 
                      key={i} 
                      className={`aspect-square rounded-xl border flex items-center justify-center transition-all cursor-pointer group ${
                        item.type === 'empty' 
                        ? 'border-white/5 bg-white/[0.02] hover:border-white/20' 
                        : 'border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 shadow-inner'
                      }`}
                    >
                      {item.type !== 'empty' ? (
                        <div className="text-cyan-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">
                          {item.icon}
                        </div>
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-4 flex items-center gap-3">
                  <Fingerprint size={20} className="text-cyan-400 shrink-0" />
                  <p className="text-[10px] text-cyan-100/70 leading-relaxed">
                    <span className="font-bold text-cyan-300">Внимание:</span> Биометрический ключ OMNI предоставляет полный доступ к управлению агентами.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                   <div className="p-4 border-b border-white/5">
                      <p className="text-[10px] uppercase font-black tracking-widest text-cyan-500/70 mb-2">Глобальная конфигурация</p>
                      <div className="space-y-2">
                         <div className="flex justify-between text-xs">
                            <span className="text-gray-400">UID:</span>
                            <span className="text-cyan-400 font-mono">HUMAN-01-PRIME</span>
                         </div>
                         <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Подключение:</span>
                            <span className="text-white">NeuralLink (Stable)</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="p-4 space-y-4">
                      {[
                        { label: 'Push-директивы', desc: 'Уведомления от системы', active: true },
                        { label: 'Тактильная отдача', desc: 'Вибрация нейроинтерфейса', active: true },
                        { label: 'Мониторинг vitals', desc: 'Передавать пульс ядру', active: false },
                      ].map((toggle, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <div>
                            <p className="text-xs font-bold text-gray-200">{toggle.label}</p>
                            <p className="text-[10px] text-gray-500">{toggle.desc}</p>
                          </div>
                          <div className={`w-10 h-5 rounded-full relative transition-colors ${toggle.active ? 'bg-cyan-500' : 'bg-gray-700'}`}>
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
          <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-white">Prometheus Project © 2026 | Human Override</p>
        </footer>
      </div>
    </div>
  );
};

export default UserStandardProfile;
