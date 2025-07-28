import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/sign-up': {
        target: 'https://railway.todo.techtrain.dev',
        changeOrigin: true,
        secure: false,
      },
      '/signin': {
        target: 'https://railway.todo.techtrain.dev',
        changeOrigin: true,
        secure: false,
      },
      '/me': {
        target: 'https://railway.todo.techtrain.dev',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
});