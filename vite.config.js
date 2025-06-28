import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Social-Media-app/', 
  plugins: [react()],
})
