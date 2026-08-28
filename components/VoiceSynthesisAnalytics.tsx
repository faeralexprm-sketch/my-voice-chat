import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  ComposedChart, 
  ReferenceLine 
} from 'recharts';
import { 
  Activity, 
  Zap, 
  TrendingUp, 
  Cpu, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  Flame,
  Radio
} from 'lucide-react';

interface TelemetryPoint {
  id: string;
  time: string;
  timestamp: number;
  latency: number; // Total ms
  ttfb: number; // Time to First Byte ms
  audioRender: number; // Audio DSP ms
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  tokenRate: number; // tokens/sec
  model: string;
  status: 'optimal' | 'warning' | 'throttled';
}

const MODELS = ['Gemini-2.0-Flash', 'Gemini-1.5-Pro', 'Claude-3.5-Sonnet', 'Neural-TTS-v4'];

function generateInitialData(count = 20): TelemetryPoint[] {
  const now = Date.now();
  const data: TelemetryPoint[] = [];
  
  for (let i = count - 1; i >= 0; i--) {
    const timeObj = new Date(now - i * 2000);
    const timeStr = timeObj.toTimeString().split(' ')[0];
    const ttfb = Math.floor(45 + Math.random() * 35);
    const audioRender = Math.floor(55 + Math.random() * 45);
    const latency = ttfb + audioRender + Math.floor(Math.random() * 20);
    const promptTokens = Math.floor(120 + Math.random() * 200);
    const completionTokens = Math.floor(220 + Math.random() * 350);
    const totalTokens = promptTokens + completionTokens;
    const tokenRate = Math.floor(95 + Math.random() * 45);
    const model = MODELS[Math.floor(Math.random() * MODELS.length)];

    data.push({
      id: `pt-${now - i * 2000}`,
      time: timeStr,
      timestamp: now - i * 2000,
      latency,
      ttfb,
      audioRender,
      promptTokens,
      completionTokens,
      totalTokens,
      tokenRate,
      model,
      status: latency > 180 ? 'warning' : 'optimal'
    });
  }
  return data;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950/90 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-3 shadow-2xl shadow-black/80 font-mono text-xs z-50">
        <div className="text-zinc-400 font-bold mb-2 pb-1 border-b border-white/10 flex justify-between items-center gap-4">
          <span className="text-white flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-indigo-400" />
            {label}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-sans">
            LIVE_LOG
          </span>
        </div>
        <div className="space-y-1.5">
          {payload.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between gap-6">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: item.color || item.stroke || item.fill }} 
                />
                {item.name}:
              </span>
              <span className="font-bold text-white tracking-wider">
                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                {item.name.toLowerCase().includes('latency') || item.name.toLowerCase().includes('ttfb') || item.name.toLowerCase().includes('render') ? ' ms' : ''}
                {item.name.toLowerCase().includes('rate') ? ' tps' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const VoiceSynthesisAnalytics: React.FC = () => {
  const [data, setData] = useState<TelemetryPoint[]>(() => generateInitialData(20));
  const [isLive, setIsLive] = useState(true);
  const [activeTab, setActiveTab] = useState<'latency' | 'tokens' | 'combined'>('combined');
  const [timeRange, setTimeRange] = useState<'30s' | '5m' | '1h'>('30s');
  const [selectedModel, setSelectedModel] = useState<string>('ALL');
  const [slaThreshold, setSlaThreshold] = useState<number>(180);
  const [burstCount, setBurstCount] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Live real-time stream simulation
  useEffect(() => {
    if (!isLive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setData(prev => {
        const now = Date.now();
        const timeStr = new Date(now).toTimeString().split(' ')[0];
        
        // Realistic dynamic simulation with occasional jitter
        const isSpike = Math.random() > 0.88;
        const spikeMultiplier = isSpike ? 1.45 : 1.0;

        const ttfb = Math.floor((40 + Math.random() * 30) * spikeMultiplier);
        const audioRender = Math.floor((50 + Math.random() * 40) * spikeMultiplier);
        const latency = ttfb + audioRender + Math.floor(Math.random() * 15);
        
        const promptTokens = Math.floor(100 + Math.random() * 250);
        const completionTokens = Math.floor(180 + Math.random() * 420);
        const totalTokens = promptTokens + completionTokens;
        const tokenRate = Math.floor((100 + Math.random() * 40) / (isSpike ? 1.2 : 1));
        const model = MODELS[Math.floor(Math.random() * MODELS.length)];

        const newPoint: TelemetryPoint = {
          id: `pt-${now}`,
          time: timeStr,
          timestamp: now,
          latency,
          ttfb,
          audioRender,
          promptTokens,
          completionTokens,
          totalTokens,
          tokenRate,
          model,
          status: latency > slaThreshold ? 'warning' : 'optimal'
        };

        const maxPoints = timeRange === '30s' ? 24 : timeRange === '5m' ? 40 : 60;
        const updated = [...prev.slice(1), newPoint];
        if (updated.length > maxPoints) {
          return updated.slice(updated.length - maxPoints);
        }
        return updated;
      });
    }, 1800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLive, slaThreshold, timeRange]);

  // Inject a manual synthetic workload burst
  const triggerBurst = () => {
    setBurstCount(prev => prev + 1);
    setData(prev => {
      const now = Date.now();
      const timeStr = new Date(now).toTimeString().split(' ')[0];
      const burstPoint: TelemetryPoint = {
        id: `pt-burst-${now}`,
        time: timeStr,
        timestamp: now,
        latency: 245,
        ttfb: 110,
        audioRender: 120,
        promptTokens: 820,
        completionTokens: 1450,
        totalTokens: 2270,
        tokenRate: 185,
        model: 'Gemini-1.5-Pro',
        status: 'warning'
      };
      return [...prev.slice(1), burstPoint];
    });
  };

  // Filtered dataset
  const filteredData = useMemo(() => {
    if (selectedModel === 'ALL') return data;
    return data.filter(d => d.model === selectedModel);
  }, [data, selectedModel]);

  // Real-time aggregates
  const stats = useMemo(() => {
    if (data.length === 0) return { avgLatency: 0, avgTtfb: 0, totalTokens: 0, p95Latency: 0, avgTps: 0, slaBreaches: 0 };
    
    const latencies = data.map(d => d.latency).sort((a, b) => a - b);
    const avgLatency = Math.round(data.reduce((acc, d) => acc + d.latency, 0) / data.length);
    const avgTtfb = Math.round(data.reduce((acc, d) => acc + d.ttfb, 0) / data.length);
    const totalTokens = data.reduce((acc, d) => acc + d.totalTokens, 0);
    const avgTps = Math.round(data.reduce((acc, d) => acc + d.tokenRate, 0) / data.length);
    
    const p95Index = Math.floor(latencies.length * 0.95);
    const p95Latency = latencies[p95Index] || latencies[latencies.length - 1];
    const slaBreaches = data.filter(d => d.latency > slaThreshold).length;

    return { avgLatency, avgTtfb, totalTokens, p95Latency, avgTps, slaBreaches };
  }, [data, slaThreshold]);

  // Model breakdown distribution
  const modelBreakdown = useMemo(() => {
    const counts: Record<string, { count: number; totalTokens: number; avgLatency: number; latencies: number[] }> = {};
    MODELS.forEach(m => {
      counts[m] = { count: 0, totalTokens: 0, avgLatency: 0, latencies: [] };
    });

    data.forEach(d => {
      if (counts[d.model]) {
        counts[d.model].count += 1;
        counts[d.model].totalTokens += d.totalTokens;
        counts[d.model].latencies.push(d.latency);
      }
    });

    return Object.entries(counts).map(([name, stat]) => ({
      name: name.replace('Gemini-', 'G-').replace('-Sonnet', ''),
      fullName: name,
      invocations: stat.count,
      tokens: stat.totalTokens,
      avgLatency: stat.latencies.length ? Math.round(stat.latencies.reduce((a, b) => a + b, 0) / stat.latencies.length) : 0
    }));
  }, [data]);

  return (
    <div id="voice-synthesis-analytics" className="p-4 sm:p-8 rounded-2xl sm:rounded-[2.5rem] bg-zinc-900/50 backdrop-blur-xl border border-white/10 space-y-6 sm:space-y-8 shadow-2xl relative overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 bg-gradient-to-br from-indigo-500/20 via-indigo-600/10 to-fuchsia-500/20 border border-indigo-500/30 rounded-xl sm:rounded-2xl text-indigo-400 shadow-lg shadow-indigo-500/10">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight uppercase italic">
                Synthesis Telemetry & Neural Metrics
              </h3>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                {isLive ? 'STREAMING_ACTIVE' : 'PAUSED'}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest font-mono mt-0.5">
              Real-time DSP Roundtrip Latency (TTFB + Render) & Token Throughput Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Model Filter */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-1 text-[11px] font-mono">
            <span className="px-2 text-zinc-500 font-bold text-[9px] uppercase tracking-wider hidden sm:inline">Node:</span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-transparent text-zinc-300 font-bold px-2 py-1 outline-none cursor-pointer hover:text-white"
            >
              <option value="ALL" className="bg-zinc-900 text-white">ALL_NODES</option>
              {MODELS.map(m => (
                <option key={m} value={m} className="bg-zinc-900 text-white">{m}</option>
              ))}
            </select>
          </div>

          {/* View Tab Selector */}
          <div className="flex bg-black/40 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('combined')}
              className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'combined'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('latency')}
              className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'latency'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Latency
            </button>
            <button
              onClick={() => setActiveTab('tokens')}
              className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'tokens'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Tokens
            </button>
          </div>

          {/* Pause / Resume button */}
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-mono font-bold uppercase tracking-wider transition-all active:scale-95 ${
              isLive
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
            }`}
            title={isLive ? 'Pause live stream' : 'Resume live stream'}
          >
            {isLive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLive ? 'Pause' : 'Resume'}</span>
          </button>

          {/* Simulate Burst */}
          <button
            onClick={triggerBurst}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border border-fuchsia-500/30 rounded-xl text-fuchsia-400 text-[11px] font-mono font-bold uppercase tracking-wider transition-all active:scale-95"
            title="Simulate load burst"
          >
            <Flame className="w-3.5 h-3.5 text-fuchsia-400" />
            <span className="hidden sm:inline">Stress Burst</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Avg Latency */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-all">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-widest">
              Avg_Synthesis_Latency
            </span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              {stats.avgLatency}
            </span>
            <span className="text-xs text-indigo-400 font-mono font-bold">ms</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-zinc-400 font-mono">
            <span className="text-emerald-400 flex items-center font-bold">
              TTFB: {stats.avgTtfb}ms
            </span>
            <span className="text-zinc-600">•</span>
            <span>Target &lt; 200ms</span>
          </div>
        </div>

        {/* Metric 2: P95 Latency */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden group hover:border-fuchsia-500/30 transition-all">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-widest">
              P95_Latency_Threshold
            </span>
            <div className="p-1.5 rounded-lg bg-fuchsia-500/10 text-fuchsia-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${
              stats.p95Latency > slaThreshold ? 'text-amber-400' : 'text-white'
            }`}>
              {stats.p95Latency}
            </span>
            <span className="text-xs text-fuchsia-400 font-mono font-bold">ms</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-zinc-400 font-mono">
            {stats.slaBreaches > 0 ? (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> {stats.slaBreaches} Breaches
              </span>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 100% In-SLA
              </span>
            )}
          </div>
        </div>

        {/* Metric 3: Total Tokens Processed */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-widest">
              Session_Token_Volume
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Cpu className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              {stats.totalTokens.toLocaleString()}
            </span>
            <span className="text-xs text-emerald-400 font-mono font-bold">tok</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-zinc-400 font-mono">
            <span className="text-zinc-300 font-bold">{data.length} synthesis chunks</span>
            <span className="text-zinc-600">•</span>
            <span>Cached 94.2%</span>
          </div>
        </div>

        {/* Metric 4: Throughput Rate */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden group hover:border-cyan-500/30 transition-all">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-widest">
              Live_Generation_Rate
            </span>
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Radio className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              {stats.avgTps}
            </span>
            <span className="text-xs text-cyan-400 font-mono font-bold">tps</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-zinc-400 font-mono">
            <span className="text-cyan-400 font-bold">Stream Chunking</span>
            <span className="text-zinc-600">•</span>
            <span>48kHz Opus</span>
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="space-y-6">
        {/* Chart 1: Latency Timeline (Area Chart) */}
        {(activeTab === 'combined' || activeTab === 'latency') && (
          <div className="p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-400" />
                  Synthesis Roundtrip Latency Breakdown (TTFB vs Audio Render)
                </h4>
                <p className="text-[10px] sm:text-xs text-zinc-500 font-mono">
                  Time-to-first-byte (TTFB) and DSP neural vocoder rendering latency in milliseconds (ms)
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> TTFB
                </span>
                <span className="flex items-center gap-1.5 text-fuchsia-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500" /> Audio DSP
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-0.5 bg-amber-400" /> SLA (180ms)
                </span>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="dspGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d946ef" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#d946ef" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#71717a" 
                    fontSize={10} 
                    tickLine={false}
                    axisLine={{ stroke: '#ffffff15' }}
                  />
                  <YAxis 
                    stroke="#71717a" 
                    fontSize={10} 
                    tickLine={false}
                    axisLine={{ stroke: '#ffffff15' }}
                    unit="ms"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={slaThreshold} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'SLA LIMIT', fill: '#f59e0b', fontSize: 9, position: 'top' }} />
                  <Area 
                    type="monotone" 
                    dataKey="ttfb" 
                    name="TTFB" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#latencyGradient)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="audioRender" 
                    name="Audio Render" 
                    stroke="#d946ef" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#dspGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Chart 2: Token Economics & Throughput (Composed Chart) */}
        {(activeTab === 'combined' || activeTab === 'tokens') && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Token Volume per Request */}
            <div className="lg:col-span-2 p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    Token Consumption Dynamics (Prompt vs Speech Output)
                  </h4>
                  <p className="text-[10px] sm:text-xs text-zinc-500 font-mono">
                    Input prompt tokens versus synthesized output stream tokens &amp; generation velocity
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-indigo-400">
                    <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" /> Prompt
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Audio Stream
                  </span>
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <span className="w-2.5 h-0.5 bg-cyan-400" /> Rate (TPS)
                  </span>
                </div>
              </div>

              <div className="h-64 sm:h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#71717a" 
                      fontSize={10} 
                      tickLine={false}
                      axisLine={{ stroke: '#ffffff15' }}
                    />
                    <YAxis 
                      yAxisId="left"
                      stroke="#71717a" 
                      fontSize={10} 
                      tickLine={false}
                      axisLine={{ stroke: '#ffffff15' }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      stroke="#06b6d4" 
                      fontSize={10} 
                      tickLine={false}
                      axisLine={{ stroke: '#ffffff15' }}
                      unit=" tps"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar yAxisId="left" dataKey="promptTokens" name="Prompt Tokens" fill="#6366f1" radius={[2, 2, 0, 0]} stackId="a" />
                    <Bar yAxisId="left" dataKey="completionTokens" name="Completion Tokens" fill="#10b981" radius={[4, 4, 0, 0]} stackId="a" />
                    <Line yAxisId="right" type="monotone" dataKey="tokenRate" name="Token Rate" stroke="#06b6d4" strokeWidth={2.5} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right: Model Distribution Breakdown */}
            <div className="p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-fuchsia-400" />
                  Neural Model Load Distribution
                </h4>
                <p className="text-[10px] sm:text-xs text-zinc-500 font-mono">
                  Real-time traffic split across neural backbone providers
                </p>
              </div>

              <div className="space-y-3.5 my-auto py-2">
                {modelBreakdown.map((m, idx) => {
                  const maxTokens = Math.max(...modelBreakdown.map(x => x.tokens), 1);
                  const pct = Math.round((m.tokens / maxTokens) * 100);
                  const colors = ['bg-indigo-500', 'bg-fuchsia-500', 'bg-emerald-500', 'bg-cyan-500'];
                  const barColor = colors[idx % colors.length];

                  return (
                    <div key={m.fullName} className="space-y-1">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-zinc-300 font-bold truncate max-w-[140px]">{m.fullName}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-500">{m.invocations} calls</span>
                          <span className="text-white font-bold">{m.avgLatency}ms</span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${barColor} transition-all duration-500 rounded-full`} 
                          style={{ width: `${Math.max(pct, 8)}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-zinc-400 font-mono flex items-center justify-between">
                <span className="text-zinc-500">Autonomous Failover:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> ACTIVE_HEALTHY
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer telemetry details */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/5">
        <div className="flex items-center gap-3">
          <span>SAMPLER: DPM++ 2M Karras</span>
          <span>•</span>
          <span>AUDIO CODEC: 48kHz Ogg/Opus</span>
          <span>•</span>
          <span>SLA P95: &lt; 200ms</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>RECHARTS_TELEMETRY_ENGINE_V2 // 0 ERROR_DROPS</span>
        </div>
      </div>
    </div>
  );
};

export default VoiceSynthesisAnalytics;
