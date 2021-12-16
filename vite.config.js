import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import viteESLint from '@ehutch79/vite-eslint';
import { viteMockServe } from 'vite-plugin-mock';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  root: './',
  base: '/tq/',
  mode: 'development',
  publicDir: 'public',
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
      components: resolve(__dirname, 'src/components'),
      views: resolve(__dirname, 'src/views'),
      utils: resolve(__dirname, 'src/utils'),
      api: resolve(__dirname, 'src/api'),
      styles: resolve(__dirname, 'src/styles'),
      common: resolve(__dirname, 'src/common'),
    },
  },
  server: {
    port: 8080,
    proxy: {
      // 正则表达式写法
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/theme/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    viteESLint({ include: ['src/**/*.vue', 'src/**/*.js'] }),
    viteMockServe({
      // default
      mockPath: 'src/mock',
      supportTs: false,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
  ],
});
