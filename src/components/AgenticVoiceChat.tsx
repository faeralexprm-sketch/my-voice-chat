import React, { useState, useRef, useEffect } from 'react';
import { Mic, Zap, Terminal, Send, Loader2, Trash } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useVoiceRecording } from '../hooks/useVoiceRecording';

const AgenticVoiceChat: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'agent', text: string}[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { isRecording, startRecording, stopRecording, error } = useVoiceRecording();
  
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const chatRef = useRef<any>(null);

  useEffect(() => {
    chatRef.current = ai.chats.create({
      model: "gemini-1.5-flash",
      config: {
        systemInstruction: "You are an agentic voice assistant, an advanced neural backbone for the Nexus network. Be concise, technical but helpful, and sound like a sophisticated AI."
      }
    });
  }, []);

  const clearChat = () => setMessages([]);
  
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, {role: 'user', text}]);
    setIsProcessing(true);
    try {
        const response = await chatRef.current.sendMessage({ message: text });
        setMessages(prev => [...prev, {role: 'agent', text: response.text}]);
    } catch(err) {
        setMessages(prev => [...prev, {role: 'agent', text: "Error: Neural link failed."}]);
    } finally {
        setIsProcessing(false);
    }
  };

  const handleSendText = () => {
      if (inputText.trim()) {
          sendMessage(inputText);
          setInputText('');
      }
  };

  const handlePtt = async (active: boolean) => {
    if (active) {
        await startRecording();
    } else if (isRecording) {
        const audioBlob = await stopRecording();
        // Here, in a real integration, you would upload and process the audioBlob.
        // For now, simulate sending the voice input.
        sendMessage("Voice input received (audio blob processed)");
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/40 rounded-2xl border border-white/10 p-6">
      <h2 className="text-xl font-black text-indigo-400 mb-6 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2"><Zap size={20} /> NEURAL_VOICE_CHAT</span>
        <button onClick={clearChat} className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-red-400 transition-colors" title="Clear Chat">
             <Trash size={16} />
        </button>
      </h2>
      <div className="flex-1 overflow-y-auto space-y-4 mb-6 custom-scrollbar pr-2">
        {messages.map((m, i) => (
          <div key={i} className={`p-4 rounded-2xl max-w-[85%] ${m.role === 'user' ? 'bg-indigo-600 text-white ml-auto rounded-tr-none' : 'bg-zinc-800 text-zinc-100 mr-auto rounded-tl-none'}`}>
            <span className="text-[10px] text-white/50 font-mono block mb-1">{m.role.toUpperCase()}</span>
            <p className="text-sm">{m.text}</p>
          </div>
        ))}
        {isProcessing && (
            <div className="p-4 rounded-2xl mr-auto bg-zinc-800 flex items-center gap-2 text-zinc-400">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm">Processing neural feedback...</span>
            </div>
        )}
      </div>
      
      <div className="flex gap-2 mb-4 bg-black/60 p-2 rounded-xl border border-white/5">
        <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type command..."
            className="flex-1 bg-transparent px-2 text-sm text-white focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
        />
        <button onClick={handleSendText} className="p-2 text-indigo-400 hover:text-indigo-300">
            <Send size={18} />
        </button>
      </div>

      <button 
        onMouseDown={() => handlePtt(true)}
        onMouseUp={() => handlePtt(false)}
        onMouseLeave={() => handlePtt(false)}
        className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
          isRecording ? 'bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]' : 'bg-indigo-600 hover:bg-indigo-500'
        }`}
      >
        <Mic size={20} />
        {isRecording ? 'RECORDING INPUT...' : 'PUSH TO TALK'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
    </div>
  );
};

export default AgenticVoiceChat;
