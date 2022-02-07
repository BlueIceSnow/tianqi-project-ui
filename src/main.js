import { createApp } from 'vue';

import * as Icons from '@element-plus/icons-vue';
import './router/permission';
// import ElementPlus from 'element-plus';
// import 'element-plus/theme-chalk/src/index.scss';
import App from './App.vue';
import 'element-plus/theme-chalk/src/message.scss';

import store from './store';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(store);
// app.use(ElementPlus);
const iconKeys = Object.keys(Icons);
for (let i = 0; i < iconKeys.length; i++) {
  app.component(iconKeys[i], Icons[iconKeys[i]]);
}
app.mount('#app');
