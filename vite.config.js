import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    cssMinify: true,  // Force CSS minification
    rollupOptions: {
      output: {
        // Enforce consistent chunking and hash naming for aggressive browser caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
