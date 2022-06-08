import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import resolve, { lib2esm } from 'vite-plugin-resolve'
import electron from 'vite-plugin-electron/renderer'
import pkg from '../../package.json'

import { resolve as resolves } from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  plugins: [
    vue(),
    electron(),
    resolve(
      /**
       * Here you can specify other modules
       * 🚧 You have to make sure that your module is in `dependencies` and not in the` devDependencies`,
       *    which will ensure that the electron-builder can package it correctly
       */
      {
        // If you use the following modules, the following configuration will work
        // What they have in common is that they will return - ESM format code snippets

        // ESM format string
        'electron-store': 'export default require("electron-store");',
        // Use lib2esm() to easy to convert ESM
        // Equivalent to
        /**
         * sqlite3: () => `
         * const _M_ = require('sqlite3');
         * const _D_ = _M_.default || _M_;
         * export { _D_ as default }
         * `
         */
        sqlite3: lib2esm('sqlite3', { format: 'cjs' }),
        serialport: lib2esm(
          // CJS lib name
          'serialport',
          // export memebers
          [
            'SerialPort',
            'SerialPortMock',
          ],
          { format: 'cjs' },
        ),
      }
    ),
    viteMockServe({
      mockPath: "./src/mock/source", // 解析，路径可根据实际变动
      localEnabled: false, // 开发环境
      prodEnabled: true, // 生产环境设为true，也可以根据官方文档格式
      injectCode:
        ` import { setupProdMockServer } from './src/mock';
        setupProdMockServer(); `,
      watchFiles: true, // 监听文件内容变更
      injectFile: resolves("src/main.ts"), // 在main.ts注册后需要在此处注入，否则可能报找不到setupProdMockServer的错误
    })
  ],
  base: './',
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
})
