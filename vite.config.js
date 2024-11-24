import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv';

// Load environment variables from .env file
config();


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Your Vite configuration
  define: {
    // eslint-disable-next-line no-undef
    'process.env': process.env
  },
  base: "/gemini-clone/"
})
