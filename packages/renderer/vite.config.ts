import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import resolve, { lib2esm } from 'vite-plugin-resolve'
import electron from 'vite-plugin-electron/renderer'
import pkg from '../../package.json'

//mock
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

//elementUI
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// exports报错
import polyfillExports from 'vite-plugin-electron/polyfill-exports'

export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    polyfillExports(),
    vue(),
    electron(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    resolve(
      {
        'electron-store': 'export default require("electron-store");',
        sqlite3: lib2esm('sqlite3', { format: 'cjs' }),
        serialport: lib2esm(
          'serialport',
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
      injectFile: path.resolve("src/main.ts"), // 在main.ts注册后需要在此处注入，否则可能报找不到setupProdMockServer的错误
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, 'src/assets/css/base.less')}";`
      }
    },
  },
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
