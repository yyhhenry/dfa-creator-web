import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import wasmPlugin from 'vite-plugin-wasm';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), wasmPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          katex: ['katex'],
          mermaid: ['mermaid'],
          MarkdownIt: ['markdown-it'],
          ElementPlus: ['element-plus'],
        },
      },
    },
  },
});
