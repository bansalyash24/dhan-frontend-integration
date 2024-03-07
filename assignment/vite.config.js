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
        target: "https://api.dhan.co/",
        changeOrigin: true,
        secure:false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
      '/backend':{
        target: "https://easy-teal-salmon-belt.cyclic.app/",
        changeOrigin: true,
        secure:false,
        ws: true,
        rewrite: (path) => path.replace(/^\/backend/, "")
      }
    },
  },
});
