import { createApp } from 'vue'
import App from './App.vue'
import { setupProdMockServer } from '../../mock';
import 'element-plus/dist/index.css'
import '@/assets/css/global.less'
import { createPinia } from 'pinia'
import router from './router'
import Particles from "particles.vue3";
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// if (process.env.NODE_ENV === 'production') {
setupProdMockServer();
// }

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Particles)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount('#app')
  .$nextTick(window.removeLoading)
