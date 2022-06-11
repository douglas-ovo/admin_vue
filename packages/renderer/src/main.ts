import { createApp } from 'vue'
import App from './App.vue'
import { setupProdMockServer } from '../../mock';
import 'element-plus/dist/index.css'
import '@/assets/css/global.less'
import { createPinia } from 'pinia'
import router from './router'

// if (process.env.NODE_ENV === 'production') {
setupProdMockServer();
// }

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
  .$nextTick(window.removeLoading)
