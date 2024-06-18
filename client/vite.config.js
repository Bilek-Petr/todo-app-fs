import { defineConfig } from 'vite';

export default defineConfig({
   build: {
      outDir: 'public',
      emptyOutDir: true,
      rollupOptions: {
         input: '/src/index.js', // Ensure this points to your main JS file
      },
   },
   server: {
      port: 5173,
   },
});
