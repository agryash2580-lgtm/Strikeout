import {defineConfig} from 'vite';
export default defineConfig({build:{outDir:'dist',chunkSizeWarningLimit:900},server:{proxy:{'/api':'http://127.0.0.1:3000','/published':'http://127.0.0.1:3000'}}});
