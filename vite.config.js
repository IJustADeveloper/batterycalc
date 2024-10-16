import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/batterycalc/",
  plugins: [react()],
  server: {
    host: true,
  },
});
