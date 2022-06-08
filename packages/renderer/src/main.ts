import { createApp } from 'vue'
import App from './App.vue'
import { setupProdMockServer } from '../../mock';

// if (process.env.NODE_ENV === 'production') {
  setupProdMockServer();
// }

createApp(App)
  .mount('#app')
  .$nextTick(window.removeLoading)
