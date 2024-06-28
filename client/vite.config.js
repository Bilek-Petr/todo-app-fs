import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
   plugins: [vue()],
   build: {
      outDir: '../dist', // Output directory for the build
      rollupOptions: {
         input: {
            main: './src/index.js', // Adjust this path to your actual entry point
         },
      },
   },
   publicDir: 'client/public', // Directory to serve as the public folder
});
