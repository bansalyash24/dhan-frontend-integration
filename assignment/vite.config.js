import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:true,
    port:3000,
    proxy: {
      '/api': {
        target: import.meta.env.DHAN_URL,
        changeOrigin: true,
        secure:false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
      '/backend':{
        target: import.meta.env.BACKEND_URL,
        changeOrigin: true,
        secure:false,
        ws: true,
        rewrite: (path) => path.replace(/^\/backend/, "")
      }
    },
  },
});
