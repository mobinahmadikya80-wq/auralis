import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/auralis/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      minify: 'esbuild' as const,
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
      // NOTE: a manual chunking rule used to split "motion" into its own
      // chunk separately from "react". Because motion's module calls
      // React.createContext() at import time, and Rollup doesn't guarantee
      // chunk *load order* the way it guarantees module *dependency* order
      // when chunks are cross-referenced like this, the motion chunk could
      // execute before the react chunk in the browser, crashing the whole
      // app with "Cannot read properties of undefined (reading
      // 'createContext')". Letting Rollup choose chunking automatically
      // avoids this class of ordering bug entirely.
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
