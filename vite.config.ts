import react from '@vitejs/plugin-react'
import path from "path";
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/DynamicFormX/',
  optimizeDeps: {
    exclude: ['jsoneditor/dist/jsoneditor-minimalist', 'jsoneditor/dist/jsoneditor.css']
  },
  resolve: {
    alias: [{ find: "~", replacement: path.resolve(__dirname, "src") }],
  },
})
