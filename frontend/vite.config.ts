/* eslint-disable node/no-unpublished-import */
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import {
  APP_NAME,
  USE_PWA,
  DEV_FRONTEND_PORT,
  DEV_SERVER_PORT,
  CHII_PORT,
} from '@local/common/configs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    USE_PWA
      ? VitePWA({
          registerType: 'autoUpdate',
          devOptions: {
            enabled: true,
          },
          minify: false,
          workbox: {
            // 缓存全部文件，而不是仅js, css, html
            globPatterns: ['**/*'],
          },
          // manifest内容配置
          manifest: {
            short_name: APP_NAME,
            name: APP_NAME,
            icons: [
              {
                src: '/logos/512.png',
                type: 'image/png',
                sizes: '512x512',
              },
            ],
            start_url: '/',
            background_color: '#f6f5f4',
            display: 'standalone',
            scope: '/',
            theme_color: '#f6f5f4',
            description: '',
          },
        })
      : null,
  ],
  envPrefix: 'FRONTEND_', // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中
  resolve: {
    alias: {
      'src/': `${path.resolve(__dirname, 'src')}/`, // 别名，指向 src 目录
    },
  },
  define: {
    'process.env': {}, // 一些包需要此全局变量
  },
  server: {
    port: DEV_FRONTEND_PORT, // 开发服务器端口
    host: true, // 监听所有地址，包括局域网和公网地址
    strictPort: true, // 端口被占用时，抛出错误
    proxy: {
      // API请求代理
      '/api': {
        target: `http://127.0.0.1:${DEV_SERVER_PORT}`,
      },
      // socket推送
      '/socket.io': {
        target: `ws://127.0.0.1:${DEV_SERVER_PORT}`,
        ws: true,
      },
      // chii
      '/chii': {
        target: `http://127.0.0.1:${CHII_PORT}`,
        ws: true,
      },
    },
  },
  preview: {
    port: DEV_FRONTEND_PORT, // 预览服务器端口
    host: true, // 监听所有地址，包括局域网和公网地址
    strictPort: true, // 端口被占用时，抛出错误
  },
  envDir: '.',
});
