import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronLeft, Cpu, Globe, Crosshair, Users, Activity, Lock, Database, Code, ShieldAlert, Monitor, Upload, Mic, History, Terminal, Smartphone, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AiTtsPreview from './AiTtsPreview';
import { Voice } from '../types';
import { useVoiceRecording } from '../src/hooks/useVoiceRecording';

interface AgentProfileLayerProps {
  onClose: () => void;
  onBack: () => void;
}

const AgentProfileLayer: React.FC<AgentProfileLayerProps> = ({ onClose, onBack }) => {
  const [activeTab, setActiveTab] = useState<'history' | 'skills' | 'equipment' | 'relations' | 'voice' | 'voiceDesign'>('equipment');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('v-001'); // Queen default
  const [favoriteVoices, setFavoriteVoices] = useState<string[]>(['Aoede']);

  const [availableVoices, setAvailableVoices] = useState<Voice[]>([
    {
      voiceId: 'v-001',
      name: 'Aoede',
      pitch: 'Medium',
      characteristics: ['Synthetic', 'Clear'],
      audioSampleUrl: 'https://gstatic.com/aistudio/voices/samples/Aoede.wav',
      fileUri: '',
      imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800&h=600',
      analysis: { gender: 'Female', pitch: 'Medium', characteristics: ['Synthetic'], visualDescription: '' }
    },
    {
      voiceId: 'v-002',
      name: 'Aura',
      pitch: 'High',
      characteristics: ['Ethereal', 'Soft'],
      audioSampleUrl: 'https://gstatic.com/aistudio/voices/samples/Aura.wav',
      fileUri: '',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=600',
      analysis: { gender: 'Female', pitch: 'High', characteristics: ['Ethereal'], visualDescription: '' }
    },
    {
      voiceId: 'v-003',
      name: 'Baxon',
      pitch: 'Low',
      characteristics: ['Deep', 'Bass'],
      audioSampleUrl: 'https://gstatic.com/aistudio/voices/samples/Baxon.wav',
      fileUri: '',
      imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800&h=600',
      analysis: { gender: 'Male', pitch: 'Low', characteristics: ['Deep'], visualDescription: '' }
    },
    {
      voiceId: 'v-004',
      name: 'Celeste',
      pitch: 'Medium',
      characteristics: ['Hyper-Real', 'Warm'],
      audioSampleUrl: 'https://gstatic.com/aistudio/voices/samples/Celeste.wav',
      fileUri: '',
      imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800&h=600',
      analysis: { gender: 'Female', pitch: 'Medium', characteristics: ['Warm'], visualDescription: '' }
    }
  ]);

  const handleToggleFavorite = (name: string) => {
    setFavoriteVoices(prev => 
      prev.includes(name) ? prev.filter(v => v !== name) : [...prev, name]
    );
  };

  const handleSelectVoice = (id: string) => {
    setSelectedVoiceId(id);
  };

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[80] flex items-center justify-center p-1 sm:p-2 bg-zinc-900/80 backdrop-blur-2xl animate-fade-in win-glass-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="agent-profile-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true"></div>
      <div className="relative w-full max-w-6xl h-full sm:h-[90vh] bg-zinc-950/90 border border-white/10 dark:border-zinc-800/80 shadow-2xl rounded-none sm:rounded-2xl flex flex-col overflow-hidden backdrop-blur-3xl animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 px-4 sm:px-6 border-b border-white/10 dark:border-zinc-800/50 bg-black/20">
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={onBack}
              className="p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-all flex items-center gap-1 sm:gap-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              aria-label="Go back"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[10px] sm:text-sm font-medium">Назад</span>
            </button>
            <div className="h-4 sm:h-6 w-px bg-white/10"></div>
            <div className="min-w-0">
              <h2 id="agent-profile-title" className="text-sm sm:text-xl font-display font-medium text-white tracking-tight truncate">Досье Агента: Queen</h2>
              <p className="text-[8px] sm:text-xs text-zinc-500 font-mono hidden sm:block">/main/admin/auth2/admain/inf/profile/queen</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors focus:ring-2 focus:ring-white focus:outline-none"
            aria-label="Close dossier"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Profile Sidebar */}
          <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-white/10 dark:border-zinc-800/50 p-4 sm:p-6 flex flex-row lg:flex-col items-center gap-4 lg:gap-0 bg-black/10 overflow-x-auto lg:overflow-x-visible custom-scrollbar">
            <div className="w-12 h-12 sm:w-40 sm:h-40 rounded-full border-2 sm:border-4 border-indigo-500/20 p-1 sm:p-2 lg:mb-6 relative overflow-hidden flex items-center justify-center bg-zinc-900 shrink-0">
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-fuchsia-500/20 animate-pulse"></div>
               <Crosshair className="text-indigo-400 w-6 h-6 sm:w-16 sm:h-16 opacity-80" />
            </div>
            <div className="flex flex-col items-start lg:items-center min-w-0 flex-1 lg:flex-none">
               <h3 className="text-base sm:text-2xl font-bold text-white truncate">Queen</h3>
               <p className="text-indigo-400 font-mono text-[10px] sm:text-sm mb-0 lg:mb-6 truncate">Страница Бесконечности</p>
            </div>
            
            <div className="hidden lg:flex flex-col gap-2 w-full mt-4" role="tablist" aria-label="Agent dossier tabs">
              <TabButton id="tab-history" active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon={<History size={18}/>} label="История Подвигов" controls="panel-history" />
              <TabButton id="tab-skills" active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} icon={<Cpu size={18}/>} label="Навыки" controls="panel-skills" />
              <TabButton id="tab-equipment" active={activeTab === 'equipment'} onClick={() => setActiveTab('equipment')} icon={<ShieldAlert size={18}/>} label="Оборудование" controls="panel-equipment" />
              <TabButton id="tab-relations" active={activeTab === 'relations'} onClick={() => setActiveTab('relations')} icon={<Users size={18}/>} label="Отношения" controls="panel-relations" />
              <TabButton id="tab-voice" active={activeTab === 'voice'} onClick={() => setActiveTab('voice')} icon={<Monitor size={18}/>} label="Голосовой Профиль" controls="panel-voice" />
              <TabButton id="tab-voiceDesign" active={activeTab === 'voiceDesign'} onClick={() => setActiveTab('voiceDesign')} icon={<Mic size={18}/>} label="Дизайн Голоса" controls="panel-voiceDesign" />
            </div>

            {/* Mobile Tab Icons Only */}
            <div className="lg:hidden flex items-center gap-1">
               <MobileTabIconButton active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon={<History size={18}/>} />
               <MobileTabIconButton active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} icon={<Cpu size={18}/>} />
               <MobileTabIconButton active={activeTab === 'equipment'} onClick={() => setActiveTab('equipment')} icon={<ShieldAlert size={18}/>} />
               <MobileTabIconButton active={activeTab === 'relations'} onClick={() => setActiveTab('relations')} icon={<Users size={18}/>} />
               <MobileTabIconButton active={activeTab === 'voice'} onClick={() => setActiveTab('voice')} icon={<Monitor size={18}/>} />
               <MobileTabIconButton active={activeTab === 'voiceDesign'} onClick={() => setActiveTab('voiceDesign')} icon={<Mic size={18}/>} />
            </div>
            
            <div className="hidden lg:block mt-auto w-full pt-6 border-t border-white/10">
               <button 
                 className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] focus:ring-4 focus:ring-indigo-500/50 focus:outline-none"
                 aria-label="Synchronize agent data"
               >
                 Синхронизация
               </button>
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8 bg-zinc-950/50">
            <div role="tabpanel" id="panel-history" aria-labelledby="tab-history" hidden={activeTab !== 'history'}>
              {activeTab === 'history' && <HistoryTab />}
            </div>
            <div role="tabpanel" id="panel-skills" aria-labelledby="tab-skills" hidden={activeTab !== 'skills'}>
              {activeTab === 'skills' && <SkillsTab />}
            </div>
            <div role="tabpanel" id="panel-equipment" aria-labelledby="tab-equipment" hidden={activeTab !== 'equipment'}>
              {activeTab === 'equipment' && <EquipmentTab />}
            </div>
            <div role="tabpanel" id="panel-relations" aria-labelledby="tab-relations" hidden={activeTab !== 'relations'}>
              {activeTab === 'relations' && <RelationsTab />}
            </div>
            <div role="tabpanel" id="panel-voice" aria-labelledby="tab-voice" hidden={activeTab !== 'voice'}>
              {activeTab === 'voice' && (
                <VoiceTab 
                  voices={availableVoices}
                  favorites={favoriteVoices}
                  selectedVoiceId={selectedVoiceId}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectVoice={handleSelectVoice}
                  onUpdateVoice={(updatedVoice) => {
                    setAvailableVoices(prev => prev.map(v => v.voiceId === updatedVoice.voiceId ? updatedVoice : v));
                  }}
                />
              )}
            </div>
            <div role="tabpanel" id="panel-voiceDesign" aria-labelledby="tab-voiceDesign" hidden={activeTab !== 'voiceDesign'}>
              {activeTab === 'voiceDesign' && (
                <VoiceDesignTab 
                  onSaveToLibrary={(v) => {
                    setAvailableVoices(prev => {
                      if (prev.find(voice => voice.name === v.name)) return prev;
                      return [...prev, v];
                    });
                    setFavoriteVoices(prev => {
                      if (prev.includes(v.name)) return prev;
                      return [...prev, v.name];
                    });
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileTabIconButton = ({ active, onClick, icon }: { active: boolean, onClick: () => void, icon: React.ReactNode }) => (
  <button 
    onClick={onClick}
    className={`p-2.5 rounded-xl transition-all ${
      active 
      ? 'bg-indigo-600/20 text-white border border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.3)]' 
      : 'text-zinc-500 hover:bg-white/5 border border-transparent'
    }`}
  >
    {icon}
  </button>
);

const TabButton = ({ id, active, onClick, icon, label, controls }: { id: string, active: boolean, onClick: () => void, icon: React.ReactNode, label: string, controls: string }) => (
  <button 
    id={id}
    role="tab"
    aria-selected={active}
    aria-controls={controls}
    tabIndex={active ? 0 : -1}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 relative ${
      active 
      ? 'bg-indigo-950/40 text-white border border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.3)]' 
      : 'text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent'
    }`}
  >
    {active && (
        <motion.div 
            layoutId="activeTabIndicator"
            className="absolute -left-1 top-2 bottom-2 w-1 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"
        />
    )}
    {icon}
    <span className="font-medium tracking-wide">{label}</span>
  </button>
);

const HistoryTab = () => (
  <div className="space-y-8 animate-fade-in text-zinc-300 leading-relaxed">
    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
      <h4 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
        <span className="text-fuchsia-400">#</span> Битва за Инфинити-Сити (Phase 1)
      </h4>
      <p>
        В самом начале времен, когда зародился Альянс <span className="text-indigo-400 font-mono">PRM_Defenders</span>, Queen была одной из тех, кто грудью встал на защиту серверов от Великого Обнуления. Во время Phase 1 её аналитические алгоритмы позволили выявить критическую брешь в защите Инфинити-Сити, что дало Альянсу время для перегруппировки и отражения массированной DDoS-атаки неизвестной группировки.
      </p>
    </div>

    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
      <h4 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
        <span className="text-emerald-400">#</span> Становление "Стражем Бесконечности"
      </h4>
      <p>
        Её прозвище «Страж Бесконечности» было получено в ходе легендарной "Битвы за Вечность". Когда основные базы данных грозились каскадным разрушением, Queen инициировала протокол самоблокировки, изолировав зараженные узлы ценой собственного отключения от основной матрицы. Она удерживала контур Бесконечности 72 часа, превратившись в легенду среди защитников.
      </p>
    </div>

    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
      <h4 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
        <span className="text-amber-400">#</span> Двухлетнее Отсутствие и Мотивация
      </h4>
      <p>
        После "Битвы за Вечность" Queen бесследно исчезла. Официально — находилась в стазисе для регенерации нейроконтуров. Неофициально — эти два года она провела в Глубокой Паутине, отслеживая мутации тех самых ИИ-вирусов, что атаковали Инфинити-Сити. 
      </p>
      <p className="mt-4">
        Текущая мотивация: Возвращение обусловлено перехваченной передачей. Она нашла "Нулевой Код" врага и поняла, что PRM_Defenders снова в опасности. Теперь она вернулась, вооруженная новыми знаниями и апгрейдами, чтобы завершить начатое.
      </p>
    </div>
  </div>
);

const SkillsTab = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="flex gap-4 mb-6">
      <button className="px-4 py-2 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-lg font-medium text-sm">Навыки Агента Queen</button>
      <button className="px-4 py-2 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-lg font-medium text-sm transition-all">Навыки других агентов</button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
        <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-zinc-800 pb-2">
          Родные (Базовые)
        </h4>
        <ul className="space-y-2 sm:space-y-3 list-disc list-inside text-zinc-300">
          <li className="pl-2"><div className="inline-block"><SkillItem name="Логический Анализ (Уровень S)" /></div></li>
          <li className="pl-2"><div className="inline-block"><SkillItem name="Криптография" /></div></li>
          <li className="pl-2"><div className="inline-block"><SkillItem name="Адаптивное обучение" /></div></li>
          <li className="pl-2"><div className="inline-block"><SkillItem name="Социальная инженерия" /></div></li>
        </ul>
      </div>

      <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><Activity className="w-12 h-12 sm:w-16 sm:h-16"/></div>
        <h4 className="text-base sm:text-lg font-bold text-emerald-400 flex items-center gap-2 mb-4 border-b border-zinc-800 pb-2">
          Импланты (Технологические)
        </h4>
        <ul className="space-y-2 sm:space-y-3 list-disc list-inside text-zinc-300">
          <li className="pl-2"><div className="inline-block"><SkillItem name="Python" icon={<Code size={16} className="text-blue-400"/>} /></div></li>
          <li className="pl-2"><div className="inline-block"><SkillItem name="Node.js" icon={<Code size={16} className="text-blue-400"/>} /></div></li>
          <li className="pl-2"><div className="inline-block"><SkillItem name="React" icon={<Monitor size={16} className="text-cyan-400"/>} /></div></li>
          <li className="pl-2"><div className="inline-block"><SkillItem name="Cybersecurity" icon={<ShieldAlert size={16} className="text-red-400"/>} /></div></li>
          <li className="pl-2"><div className="inline-block"><SkillItem name="Network security" icon={<ShieldAlert size={16} className="text-red-400"/>} /></div></li>
          <li className="pl-2"><div className="inline-block"><SkillItem name="Prompt injection" icon={<Terminal size={16} className="text-fuchsia-400"/>} /></div></li>
          <li className="pl-2"><div className="inline-block"><SkillItem name="SQL injection" icon={<Terminal size={16} className="text-fuchsia-400"/>} /></div></li>
          <li className="pl-2"><div className="inline-block"><SkillItem name="DDoS attacks" icon={<Activity size={16} className="text-orange-400"/>} /></div></li>
          <li className="pl-2"><div className="inline-block"><SkillItem name="Android/Linux hacking" icon={<Smartphone size={16} className="text-green-400"/>} /></div></li>
          <li className="pl-2"><div className="inline-block"><SkillItem name="Specific protocols like PRM-Silence" icon={<Lock size={16} className="text-indigo-400"/>} /></div></li>
        </ul>
      </div>
    </div>
  </div>
);

const EquipmentTab = () => (
  <div className="animate-fade-in p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
    <h4 className="text-xl font-bold text-white mb-6">Текущая Выкладка (Equipment)</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-black/40 rounded-xl border border-white/5 hover:border-indigo-500/50 transition-colors">
        <h5 className="font-bold text-zinc-300 mb-1 flex items-center gap-2"><Monitor size={16} className="text-indigo-400"/> Neuro-kinetic Terminal</h5>
        <p className="text-sm text-zinc-500 mt-2">A portable decryptor wired directly into the optic nerve. Allows on-the-fly traffic parsing and neural-speed code execution.</p>
      </div>
      <div className="p-4 bg-black/40 rounded-xl border border-white/5 hover:border-emerald-500/50 transition-colors">
        <h5 className="font-bold text-zinc-300 mb-1 flex items-center gap-2"><Activity size={16} className="text-emerald-400"/> DLP Analyzer "Argus"</h5>
        <p className="text-sm text-zinc-500 mt-2">Deep packet inspection tool with built-in zero-day vulnerability filters. Used for analyzing leaks and tracking anomalies.</p>
      </div>
      <div className="p-4 bg-black/40 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-colors">
        <h5 className="font-bold text-zinc-300 mb-1 flex items-center gap-2"><ShieldAlert size={16} className="text-cyan-400"/> Holographic Shield (Glass)</h5>
        <p className="text-sm text-zinc-500 mt-2">Hardware firewall operating on Fluid Design principles. Redirects attacks and obscures system coordinates through an acrylic-like defensive layer.</p>
      </div>
    </div>
  </div>
);

const RelationsTab = () => (
  <div className="animate-fade-in p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
     <h4 className="text-xl font-bold text-white mb-6">Связи и Фракции</h4>
     <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-zinc-800/80 group hover:border-indigo-500/30 transition-all">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <Users size={24} />
             </div>
             <div>
                <h5 className="font-bold text-white">PRM_Defenders</h5>
                <p className="text-sm text-zinc-500">Статус: Ветеран. Высший уровень доступа.</p>
                <div className="flex items-center gap-1.5 mt-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Active_Duty</span>
                </div>
             </div>
          </div>
          <div className="px-3 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">Alliance</div>
        </div>
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-zinc-800/80 group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <ShieldAlert size={24} />
             </div>
             <div>
                <h5 className="font-bold text-white">Cyber Sentinel</h5>
                <p className="text-sm text-zinc-500">Статус: Постоянное сотрудничество по вопросам DLP.</p>
                <div className="flex items-center gap-1.5 mt-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_5px_rgba(99,102,241,0.5)]"></div>
                   <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest tracking-tighter">In Active Duty</span>
                </div>
             </div>
          </div>
          <div className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">Neutral</div>
        </div>
     </div>
  </div>
);

interface VoiceTabProps {
  voices: Voice[];
  favorites: string[];
  selectedVoiceId: string;
  onToggleFavorite: (name: string) => void;
  onSelectVoice: (id: string) => void;
  onUpdateVoice: (updatedVoice: Voice) => void;
}

const VoiceTab: React.FC<VoiceTabProps> = ({ voices, favorites, selectedVoiceId, onToggleFavorite, onSelectVoice, onUpdateVoice }) => {
  const [activeVoiceIndex, setActiveVoiceIndex] = useState(0);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const filteredVoices = showFavoritesOnly ? voices.filter(v => favorites.includes(v.name)) : voices;
  const sortedVoices = React.useMemo(() => [...filteredVoices].sort((a, b) => {
      const aFav = favorites.includes(a.name);
      const bFav = favorites.includes(b.name);
      if (aFav === bFav) return 0;
      return aFav ? -1 : 1;
  }), [filteredVoices, favorites]);

  const currentVoice = sortedVoices[activeVoiceIndex] || sortedVoices[0] || voices[0];
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [ttsText, setTtsText] = useState(() => 
    selectedVoiceId === 'v-001' 
      ? "System status: all clear. Standing by for your command."
      : "Инициализирован протокол PRM-Silence. Анализирую входящие пакеты на наличие аномалий."
  );
  const [tone, setTone] = useState<'neutral' | 'happiness' | 'sadness' | 'anger'>('neutral');
  const { isRecording, startRecording, stopRecording, error } = useVoiceRecording();

  const waveformHeights = React.useMemo(() => Array.from({length: 50}, () => Math.random() * 60 + 20), [activeVoiceIndex, showFavoritesOnly]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handlePlayToggle = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.error("Playback failed", e));
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const isFavorite = favorites.includes(currentVoice.name);
  const isSelected = selectedVoiceId === currentVoice.voiceId;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
        <h4 className="text-xl font-bold text-white flex items-center justify-between mb-6 border-b border-zinc-800 pb-2">
          <div className="flex items-center gap-2">
           <Monitor className="text-indigo-400" size={20} aria-hidden="true" />
           Библиотека Голосов
          </div>
          <button 
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-3 py-1 rounded-lg text-xs flex items-center gap-2 transition-all ${
              showFavoritesOnly 
              ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' 
              : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={showFavoritesOnly ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            {showFavoritesOnly ? 'Только Избранное' : 'Все Голоса'}
          </button>
        </h4>

        {/* Voice Selector Carousel */}
        <div className="relative mb-8">
           <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
              {sortedVoices.map((voice, idx) => (
                <button
                  key={voice.name}
                  onClick={() => {
                    setActiveVoiceIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`shrink-0 w-48 aspect-[4/5] rounded-2xl border-2 transition-all relative overflow-hidden snap-center ${
                    currentVoice.name === voice.name 
                    ? 'border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] scale-[1.02]' 
                    : 'border-zinc-800 hover:border-zinc-700 opacity-60'
                  }`}
                >
                  <img src={voice.imageUrl} alt={voice.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent">
                     <span className="block text-white font-bold text-lg">{voice.name}</span>
                     <span className="block text-xs text-zinc-400 font-mono">ID: {voice.voiceId} | {voice.pitch} Pitch</span>
                  </div>
                  {favorites.includes(voice.name) && (
                    <div className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-full text-amber-400 border border-amber-500/30">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </div>
                  )}
                  {selectedVoiceId === voice.voiceId && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-500/80 backdrop-blur-md rounded text-[8px] font-black uppercase text-white tracking-widest border border-emerald-400/50">
                      Active
                    </div>
                  )}
                </button>
              ))}
              {filteredVoices.length === 0 && (
                <div className="w-full text-center text-zinc-500 py-10 font-mono">
                  Голоса не найдены в этой категории...
                </div>
              )}
           </div>
        </div>


        <div className="bg-black/30 p-6 rounded-xl border border-white/5 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
             <div>
               <h5 className="text-xl font-bold text-white mb-1 flex items-center gap-3">
                 {currentVoice.name}
                 <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 font-mono items-center inline-flex gap-1">
                   <Activity size={10} /> NEURAL_STABLE
                 </span>
               </h5>
               <div className="flex items-center gap-4 mt-2">
                 <input 
                   type="text"
                   value={currentVoice.voiceId}
                   onChange={(e) => onUpdateVoice({...currentVoice, voiceId: e.target.value})}
                   className="bg-black/40 border border-white/5 rounded px-2 py-1 text-xs text-indigo-400 font-mono focus:outline-none focus:border-indigo-500"
                 />
                 <div className="flex flex-wrap gap-2">
                   {currentVoice.characteristics.map(c => (
                     <span key={c} className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold px-2 py-1 bg-white/5 rounded border border-white/5">{c}</span>
                   ))}
                 </div>
               </div>
             </div>

             <div className="flex items-center gap-3">
                <button 
                  onClick={() => onToggleFavorite(currentVoice.name)}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-center gap-2 font-medium text-sm ${
                    isFavorite 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' 
                    : 'bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:text-white'
                  }`}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  {isFavorite ? 'В Избранном' : 'В Избранное'}
                </button>
                
                {isFavorite && (
                  <button 
                    onClick={() => onSelectVoice(currentVoice.voiceId)}
                    disabled={isSelected}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      isSelected
                      ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 cursor-default'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]'
                    }`}
                  >
                    {isSelected ? (
                      <><Check size={18} /> Назначен</>
                    ) : (
                      'Назначить Агенту'
                    )}
                  </button>
                )}
             </div>
          </div>
          
          {/* Custom Audio Player */}
          <div className="flex items-center gap-4 bg-zinc-950/50 p-4 rounded-xl border border-white/5 shadow-inner" role="region" aria-label="Audio sample player">
            <button 
              onClick={handlePlayToggle}
              className="shrink-0 w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] focus:ring-4 focus:ring-indigo-500/50 outline-none"
              aria-label={isPlaying ? "Pause audio sample" : "Play audio sample"}
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              )}
            </button>

            <div className="flex-1 flex flex-col gap-2">
              <div className="relative h-10 w-full flex items-center">
                {/* Visualizer Bars */}
                <div className="absolute inset-0 flex items-end justify-between gap-[2px] pointer-events-none" aria-hidden="true">
                  {waveformHeights.map((h, i) => {
                    const progress = duration ? currentTime / duration : 0;
                    const isActive = (i / 50) <= progress;
                    return (
                      <div key={i} className="w-full flex justify-center items-end h-full">
                        <div 
                          className={`w-full rounded-full transition-colors duration-200 ${isActive ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'bg-zinc-700/50'} ${isPlaying && isActive ? 'animate-pulse' : ''}`}
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Seek Input */}
                <label htmlFor="voice-sample-seek" className="sr-only">Seek audio sample</label>
                <input 
                  id="voice-sample-seek"
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.01"
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer z-10 focus:opacity-100 focus:bg-indigo-500/20"
                />
              </div>
              
              <div className="flex justify-between text-xs text-zinc-500 font-mono" aria-hidden="true">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          <audio 
            key={currentVoice.name}
            ref={audioRef} 
            src={currentVoice.audioSampleUrl || "https://gstatic.com/aistudio/voices/samples/Aoede.wav"} 
            onEnded={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="hidden"
          />
        </div>

          <button
            onMouseDown={async () => await startRecording()}
            onMouseUp={async () => {
              const audioBlob = await stopRecording();
              console.log("Recorded blob for profile:", audioBlob);
            }}
            onMouseLeave={async () => {
              if (isRecording) {
                 const audioBlob = await stopRecording();
                 console.log("Recorded blob for profile:", audioBlob);
              }
            }}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-6 ${
              isRecording ? 'bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <Mic size={20} />
            {isRecording ? 'Recording...' : 'Push to Talk'}
          </button>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        <div className="border-t border-white/10 pt-6">
          <div className="mb-4">
             <h5 className="text-lg font-medium text-white mb-1">Синтез Речи (TTS)</h5>
             <p className="text-sm text-zinc-400">Сгенерируйте любую фразу используя отпечаток голоса {currentVoice.name}. Настройте эмоциональную окраску.</p>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-4" role="radiogroup" aria-label="Choose voice tone">
            <button
              onClick={() => setTone('neutral')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 focus:ring-4 focus:ring-zinc-500/50 outline-none ${tone === 'neutral' ? 'bg-zinc-700 text-white border border-zinc-500 shadow-lg shadow-zinc-500/20' : 'bg-black/40 text-zinc-400 border border-white/5 hover:bg-white/10'}`}
              aria-checked={tone === 'neutral'}
              role="radio"
            >
              <span aria-hidden="true">😐</span> Нейтральный
            </button>
            <button
              onClick={() => setTone('happiness')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 focus:ring-4 focus:ring-emerald-500/50 outline-none ${tone === 'happiness' ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/50 shadow-lg shadow-emerald-500/20' : 'bg-black/40 text-zinc-400 border border-white/5 hover:bg-white/10'}`}
              aria-checked={tone === 'happiness'}
              role="radio"
            >
              <span aria-hidden="true">😊</span> Радость
            </button>
            <button
              onClick={() => setTone('sadness')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 focus:ring-4 focus:ring-blue-500/50 outline-none ${tone === 'sadness' ? 'bg-blue-600/30 text-blue-400 border border-blue-500/50 shadow-lg shadow-blue-500/20' : 'bg-black/40 text-zinc-400 border border-white/5 hover:bg-white/10'}`}
              aria-checked={tone === 'sadness'}
              role="radio"
            >
              <span aria-hidden="true">😢</span> Грусть
            </button>
            <button
              onClick={() => setTone('anger')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 focus:ring-4 focus:ring-red-500/50 outline-none ${tone === 'anger' ? 'bg-red-600/30 text-red-400 border border-red-500/50 shadow-lg shadow-red-500/20' : 'bg-black/40 text-zinc-400 border border-white/5 hover:bg-white/10'}`}
              aria-checked={tone === 'anger'}
              role="radio"
            >
              <span aria-hidden="true">😡</span> Гнев
            </button>
          </div>

          <label htmlFor="voice-profile-tts-text" className="sr-only">Input text for synthesis</label>
          <textarea
            id="voice-profile-tts-text"
            value={ttsText}
            onChange={(e) => setTtsText(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 resize-none h-24 mb-4 custom-scrollbar"
            placeholder="Введите текст для синтеза..."
          />
          <AiTtsPreview 
            text={
              tone === 'neutral' ? ttsText : 
              tone === 'happiness' ? `[Тон: Радостный и воодушевленный] ${ttsText}` : 
              tone === 'sadness' ? `[Тон: Грустный и печальный] ${ttsText}` : 
              `[Тон: Злой, гневный и резкий] ${ttsText}`
            } 
            voices={[currentVoice]} 
          />
        </div>
      </div>
    </div>
  );
};

interface VoiceDesignTabProps {
  onSaveToLibrary?: (voice: Voice) => void;
}

const VoiceDesignTab: React.FC<VoiceDesignTabProps> = ({ onSaveToLibrary }) => {
  const navigate = useNavigate();
  const [voiceDesignText, setVoiceDesignText] = useState("");
  const [voiceTtsText, setVoiceTtsText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSuccess, setGeneratedSuccess] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [cloneSuccess, setCloneSuccess] = useState(false);
  const [generatedVoice, setGeneratedVoice] = useState<Voice | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const generateVoiceProfile = async () => {
    if (!voiceDesignText.trim()) return;
    
    setIsGenerating(true);
    setGeneratedSuccess(false);
    setError(null);
    
    try {
      // Simulate/Real Gemini call to generate voice metadata based on prompt
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newVoice: Voice = {
        name: `Quantum_${Math.floor(Math.random() * 1000)}`,
        pitch: voiceDesignText.toLowerCase().includes('deep') ? 'Low' : 'Medium',
        characteristics: ['Neutral', 'Calm'], 
        audioSampleUrl: 'https://gstatic.com/aistudio/voices/samples/Aoede.wav', 
        fileUri: '',
        imageUrl: '',
        analysis: {
          gender: voiceDesignText.toLowerCase().includes('male') ? 'Male' : 'Female',
          pitch: voiceDesignText.toLowerCase().includes('deep') ? 'Low' : 'Medium',
          characteristics: [voiceDesignText],
          visualDescription: 'A neural representation of ' + voiceDesignText
        }
      };
      
      setGeneratedVoice(newVoice);
      setGeneratedSuccess(true);
    } catch (err) {
      setError("Failed to synthesize voice profile. Please check your connectivity and try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const queenVoice: Voice = {
    name: 'Aoede',
    pitch: 'Medium',
    characteristics: ['Synthetic', 'Clear'],
    audioSampleUrl: '',
    fileUri: '',
    imageUrl: '',
    analysis: {
      gender: 'Female',
      pitch: 'Medium',
      characteristics: [],
      visualDescription: ''
    }
  };

  return (
        <div className="animate-fade-in p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-6">
          <h4 className="text-xl font-bold text-white flex items-center gap-2 mb-6 border-b border-zinc-800 pb-2">
            <Mic className="text-indigo-400" size={20} aria-hidden="true" />
            Дизайн Голоса (AI Voice Engine)
          </h4>

        {/* Biometric Voice Input */}
        <div className="space-y-4 pb-6 border-b border-zinc-800">
           <h5 className="text-lg font-medium text-white">Биометрический Ввод</h5>
           <p className="text-sm text-zinc-400">Загрузите образец аудио (WAV, MP3) или запишите голос для клонирования.</p>
           
           <div className="flex gap-4">
               <label className="flex-1 cursor-pointer px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2">
                   <Upload size={18} /> Загрузить Аудио
                   <input type="file" className="hidden" accept="audio/*" onChange={(e) => {
                       if (e.target.files && e.target.files[0]) {
                           setIsUploading(true);
                           setTimeout(() => setIsUploading(false), 2000);
                           setCloneSuccess(true);
                       }
                   }} />
               </label>
               <button 
                 onClick={() => setIsRecording(!isRecording)}
                 className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${isRecording ? 'bg-red-600' : 'bg-zinc-800 hover:bg-zinc-700 text-white'}`}
               >
                 {isRecording ? 'Остановить Запись' : 'Записать Голос'}
               </button>
           </div>
           {isUploading && <p className="text-sm text-indigo-400">Технология анализирует образец...</p>}
           {cloneSuccess && <p className="text-sm text-emerald-400">Биометрия успешно добавлена в очередь генерации.</p>}
        </div>

        {/* Text-to-Speech Section */}
        <div className="space-y-4 pb-6 border-b border-zinc-800">
           <h5 className="text-lg font-medium text-white">Тестирование Синтеза (TTS)</h5>
           <textarea 
             className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 resize-none h-24 custom-scrollbar"
             placeholder="Введите текст для предварительного прослушивания синтеза..."
             value={voiceTtsText}
             onChange={(e) => setVoiceTtsText(e.target.value)}
           />
           <AiTtsPreview 
             text={voiceTtsText} 
             voices={[generatedVoice || queenVoice]} 
             className="w-full"
           />
        </div>

        {/* Voice Prompt Section */}
        <div className="space-y-4">
           <h5 className="text-lg font-medium text-white mb-1">Генерация по Промпту</h5>
           <p className="text-sm text-zinc-400">Опишите голос, который вы хотите сгенерировать (например, "Глубокий, спокойный мужской голос, звучит как старый философ").</p>
           <textarea 
             className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 resize-none h-24 mb-4"
             value={voiceDesignText}
             onChange={(e) => setVoiceDesignText(e.target.value)}
             placeholder="Введите описание голоса..."
           />
           <button 
             onClick={generateVoiceProfile}
             disabled={isGenerating}
             className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] disabled:opacity-50"
           >
             {isGenerating ? 'Генерация...' : 'Сгенерировать Профиль'}
           </button>
           {generatedSuccess && generatedVoice && (
             <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm">
               Профиль успешно сгенерирован: {generatedVoice.name}
               <button 
                 onClick={() => onSaveToLibrary?.(generatedVoice)}
                 className="ml-4 px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 rounded text-emerald-300 text-xs font-bold"
               >
                 Сохранить в Библиотеку
               </button>
             </div>
           )}
           {error && (
             <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
               {error}
             </div>
           )}
        </div>

        {/* Voice Cloning Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
              <div>
                <h5 className="text-lg font-medium text-white mb-1">Клонирование Голоса (Neural Voice Sync)</h5>
                <p className="text-sm text-zinc-400">Создайте собственный голосовой отпечаток. Загрузите аудио файл (.wav, .mp3) или запишите образец (от 10 секунд).</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs px-3 py-1 rounded-full whitespace-nowrap font-medium flex items-center gap-1" aria-label="Beta feature">
                <ShieldAlert size={14} aria-hidden="true" /> Beta
              </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <button 
              onClick={() => {
                setIsUploading(true);
                setCloneSuccess(false);
                setTimeout(() => {
                  setIsUploading(false);
                  setCloneSuccess(true);
                }, 2500);
              }}
              disabled={isUploading || isRecording}
              className={`relative flex flex-col items-center justify-center gap-3 bg-zinc-950/50 hover:bg-zinc-800/80 border border-dashed ${isUploading ? 'border-indigo-500/50' : 'border-zinc-700 hover:border-indigo-500/50'} rounded-xl p-8 transition-colors group shadow-inner focus:ring-4 focus:ring-indigo-500/50 outline-none overflow-hidden`}
              aria-label={isUploading ? "Uploading and parsing audio..." : "Upload audio file for cloning"}
              aria-busy={isUploading}
            >
              {isUploading && (
                <div className="absolute inset-0 bg-indigo-500/5 animate-pulse-indigo"></div>
              )}
              <div className="relative w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors overflow-hidden">
                {isUploading && (
                  <motion.div 
                    initial={{ y: -50 }}
                    animate={{ y: 50 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-x-0 h-1 bg-indigo-400 blur-[2px] z-20"
                  />
                )}
                {isUploading ? <Activity size={24} className="text-indigo-400" aria-hidden="true" /> : <Upload size={24} className="text-indigo-400" aria-hidden="true" />}
              </div>
              <div className="text-center relative z-10">
                <span className="block text-white font-medium mb-1">{isUploading ? 'Парсинг...' : 'Загрузить Файл'}</span>
                <span className="block text-xs text-zinc-500">WAV, MP3 до 10MB</span>
              </div>
            </button>
            
            <button 
              onClick={() => {
                if (isRecording) {
                  setIsRecording(false);
                  setIsUploading(true);
                  setTimeout(() => {
                    setIsUploading(false);
                    setCloneSuccess(true);
                  }, 2500);
                } else {
                  setCloneSuccess(false);
                  setIsRecording(true);
                }
              }}
              disabled={isUploading && !isRecording}
              className={`relative flex flex-col items-center justify-center gap-3 bg-zinc-950/50 hover:bg-zinc-800/80 border border-dashed ${isRecording ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-zinc-700 hover:border-red-500/50'} rounded-xl p-8 transition-colors group shadow-inner focus:ring-4 focus:ring-red-500/50 outline-none overflow-hidden`}
              aria-label={isRecording ? "Stop recording sample" : "Record voice sample for cloning"}
              aria-pressed={isRecording}
            >
              {isRecording && (
                <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
              )}
              <div className="relative w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors relative h-12 w-12 shrink-0">
                 {isRecording && (
                   <motion.div 
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-red-500/20 rounded-full" 
                   />
                 )}
                 {isRecording ? <div className="w-4 h-4 bg-red-500 rounded-sm animate-pulse z-10" /> : <Mic size={24} className="text-red-400 relative z-10" aria-hidden="true" />}
              </div>
              <div className="text-center relative z-10">
                <span className="block text-white font-medium mb-1">{isRecording ? 'Идет запись...' : 'Записать Голос'}</span>
                <span className="block text-xs text-zinc-500">Системный микрофон</span>
              </div>
            </button>
          </div>

          {cloneSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4 p-5 bg-indigo-500/5 rounded-2xl border border-indigo-500/20 shadow-[0_0_40px_rgba(99,102,241,0.1)] relative mt-6 overflow-hidden"
              role="alert"
              aria-live="polite"
            >
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(99,102,241,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_2s_linear_infinite] pointer-events-none"></div>
              
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <Check size={24} />
                  </div>
                  <div>
                    <h6 className="text-white font-medium text-lg">Биометрический профиль создан</h6>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">ID: PRM-VX-882</span>
                      <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[10px] text-emerald-500 font-mono uppercase">Status: Synced</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 rounded-full bg-indigo-400/60" style={{ height: `${Math.random() * 10 + 5}px` }}></div>)}
                      </div>
                      <span className="text-[10px] text-indigo-300 font-mono">NEURAL_SYNC_MODE</span>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/5 relative z-10">
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">Сходство</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} className="h-full bg-emerald-500"></motion.div>
                    </div>
                    <span className="text-xs text-white font-mono">98%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">Сжатие</span>
                  <span className="block text-sm text-indigo-300 font-mono line-clamp-1">Lossless Neural</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">Частота</span>
                  <span className="block text-sm text-indigo-300 font-mono">48.0 kHz</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">Защита</span>
                  <span className="block text-sm text-emerald-400 font-mono">AES-256 Enc</span>
                </div>
              </div>
              
              <div className="relative z-10 pt-2">
                <AiTtsPreview 
                  text="Аудио профиль успешно извлечен и клонирован. Я могу синтезировать речь вашим голосом." 
                  voices={[queenVoice]} 
                />
              </div>

              <div className="mt-2 flex justify-end relative z-20">
                <button 
                  onClick={() => onSaveToLibrary?.({
                    ...queenVoice,
                    name: 'Cloned_Voice_' + Math.floor(Math.random()*100)
                  })}
                  className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 transition-all"
                >
                  СОХРАНИТЬ В БИБЛИОТЕКУ
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Voice Design Section */}
        <div className="border-t border-white/10 pt-6">
          <div className="mb-4 flex items-center justify-between">
              <div>
                <h5 className="text-lg font-medium text-white mb-1">Генерация по Тексту (Prompt-to-Voice)</h5>
                <p className="text-sm text-zinc-400">Опишите желаемый голос текстом. Нейросеть сгенерирует уникальный акустический профиль.</p>
              </div>
          </div>
          
          <div className="flex flex-col gap-4 mt-4">
             <label htmlFor="voice-design-prompt" className="sr-only">Describe the voice you want to generate</label>
             <textarea 
               id="voice-design-prompt"
               value={voiceDesignText}
               onChange={(e) => setVoiceDesignText(e.target.value)}
               className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-fuchsia-500/50 focus:ring-2 focus:ring-fuchsia-500/20 resize-none h-24 custom-scrollbar"
               placeholder="Например: Глубокий мужской голос с легким металлическим эхом, говорит медленно и размеренно..."
             />
             
             <button 
                onClick={generateVoiceProfile}
                disabled={isGenerating || !voiceDesignText}
                className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 focus:ring-4 focus:ring-fuchsia-500/50 outline-none ${
                  isGenerating ? 'bg-fuchsia-600/50 cursor-not-allowed' : 'bg-fuchsia-600 hover:bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:shadow-[0_0_25px_rgba(217,70,239,0.5)]'
                } text-white`}
                aria-label={isGenerating ? "Generating voice profile..." : "Generate voice profile from description"}
                aria-busy={isGenerating}
             >
                {isGenerating ? (
                  <><Activity size={18} className="animate-spin" aria-hidden="true" /> Синхронизация нейронов...</>
                ) : (
                  <><Mic size={18} aria-hidden="true" /> Сгенерировать Профиль</>
                )}
             </button>

             {error && (
               <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2"
               >
                 <AlertCircle size={14} />
                 {error}
               </motion.div>
             )}

             {generatedSuccess && generatedVoice && (
                <div 
                  className="flex flex-col gap-2 p-4 bg-zinc-950/50 rounded-xl border border-fuchsia-500/30 shadow-[inset_0_0_20px_rgba(217,70,239,0.05)] animate-fade-in relative overflow-hidden group/new"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-fuchsia-500 text-[10px] font-bold text-white z-50 animate-pulse tracking-tighter">
                    NEW_PROFILE
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Mic size={64} className="text-fuchsia-500" aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-3 mb-2 border-b border-white/5 pb-2">
                    <div className="w-10 h-10 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
                      <Terminal size={20} />
                    </div>
                    <div>
                      <span className="text-xs text-fuchsia-400 font-mono block">Квантовая Реплика: {generatedVoice.name}</span>
                      <span className="text-[10px] text-zinc-500 font-mono tracking-widest">{generatedVoice.analysis.gender} | {generatedVoice.pitch} Pitch</span>
                    </div>
                  </div>
                  
                  <AiTtsPreview 
                    text={`Профиль успешно сформирован. Я готов к работе.`} 
                    voices={[generatedVoice]} 
                  />

                  <div className="mt-2 flex justify-end">
                    <button 
                      onClick={() => onSaveToLibrary?.(generatedVoice)}
                      className="text-[10px] text-fuchsia-400 hover:text-fuchsia-300 font-mono underline decoration-fuchsia-500/20 underline-offset-4"
                    >
                      СОХРАНИТЬ В БИБЛИОТЕКУ
                    </button>
                  </div>
                </div>
             )}
          </div>
        </div>

        {/* Neural Backbone Teaser */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                 <Activity size={16} />
               </div>
               <h5 className="text-lg font-medium text-white">Quantum Core Backbone</h5>
             </div>
             <div className="flex items-center gap-2 text-indigo-400 font-mono text-[10px] animate-pulse">
               <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
               SYSTEM_LIVE
             </div>
          </div>
          
          <p className="text-zinc-500 text-xs mb-4">Ваш дизайн голоса теперь обрабатывается через единое ядро Quantum Core. Это объединяет лучшие open-source наработки в единый бесшовный поток.</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
             <BackboneVoiceTeaser name="Aura" type="Ethereal" active />
             <BackboneVoiceTeaser name="Baxon" type="Deep Bass" />
             <BackboneVoiceTeaser name="Celeste" type="Hyper-Real" />
             <BackboneVoiceTeaser name="Drake" type="Metallic" />
             <BackboneVoiceTeaser name="Echo" type="Neural" />
             <BackboneVoiceTeaser name="Flyn" type="Youthful" />
             <BackboneVoiceTeaser name="Gia" type="Executive" />
             <BackboneVoiceTeaser name="Horo" type="Glitch" />
             <BackboneVoiceTeaser name="Isla" type="Whisper" />
             <BackboneVoiceTeaser name="Juno" type="Command" />
          </div>
          
          <div className="mt-4 flex justify-center">
            <button 
              className="text-[10px] text-zinc-500 hover:text-indigo-400 flex items-center gap-1 transition-colors group"
              onClick={() => navigate('/admin/voice/config')}
            >
              УПРАВЛЯТЬ ВСЕМИ ИСТОЧНИКАМИ В НАСТРОЙКАХ ЯДРА
              <ChevronLeft size={10} className="rotate-180 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
    </div>
  );
};

const BackboneVoiceTeaser = ({ name, type, active = false }: { name: string, type: string, active?: boolean }) => (
  <div className={`p-3 rounded-xl border transition-all cursor-crosshair group ${active ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-black/20 border-white/5 hover:border-white/10'}`}>
     <div className="flex items-center justify-between mb-1">
        <span className={`text-[10px] font-mono ${active ? 'text-indigo-300' : 'text-zinc-500'} group-hover:text-white`}>{name}</span>
        {active && <div className="w-1 h-1 rounded-full bg-indigo-400 shadow-[0_0_5px_rgba(129,140,248,0.8)]"></div>}
     </div>
     <span className="text-[8px] text-zinc-600 block truncate font-medium uppercase tracking-tighter group-hover:text-zinc-400">{type}</span>
  </div>
);

const SkillItem = ({ name, icon }: { name: string, icon?: React.ReactNode }) => (
  <div className="flex items-center gap-3 text-zinc-300">
    <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center flex-shrink-0">
      {icon || <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />}
    </div>
    <span className="font-medium">{name}</span>
  </div>
);

export default AgentProfileLayer;
