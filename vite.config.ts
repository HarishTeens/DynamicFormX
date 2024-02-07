import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['jsoneditor/dist/jsoneditor-minimalist', 'jsoneditor/dist/jsoneditor.css']
  }
})
