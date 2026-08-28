import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        allowedHosts: true,
      },
      plugins: [
        react(),
        tailwindcss()
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_GEMINI_KEY || ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_GEMINI_KEY || ''),
        'process.env.VITE_GEMINI_KEY': JSON.stringify(env.VITE_GEMINI_KEY || env.GEMINI_API_KEY || ''),
        'process.env.VITE_GEMINI_KEY_FALLBACK': JSON.stringify(env.VITE_GEMINI_KEY_FALLBACK || ''),
        'process.env.VITE_OPENAI_KEY': JSON.stringify(env.VITE_OPENAI_KEY || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
