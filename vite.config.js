// Vite configuration — includes React plugin and Tailwind CSS v4 plugin
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Register both the React (JSX transform + Fast Refresh) and Tailwind CSS plugins
  plugins: [
    react(),
    tailwindcss(),
  ],
})
