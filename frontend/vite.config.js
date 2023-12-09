import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    proxy:{
      '/api':{
        target: 'https://fullstack2-86q9.onrender.com',
        changeOrigin: true,
        rewrite: (path) => { console.log(path); return path.replace('/^\/api/','')}
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
