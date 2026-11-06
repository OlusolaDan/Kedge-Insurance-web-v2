import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    // The site is deployed at the cPanel document root; root-relative assets keep
    // direct visits to nested SPA routes working with the public .htaccess fallback.
    base: '/',
    plugins: [react(), tailwindcss()],
    build: {
      // Emit even small SVGs as files so every image is uploaded from /images/.
      assetsInlineLimit: 0,
      rolldownOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const imageExtensions = /\.(?:avif|bmp|gif|jpe?g|jfif|png|svg|webp)$/i;
            const directory = imageExtensions.test(assetInfo.name ?? '') ? 'images' : 'assets';
            return `${directory}/[name]-[hash][extname]`;
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
