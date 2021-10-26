import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import * as Icons from '@element-plus/icons';
import 'element-plus/dist/index.css';
import router from './router';
import store from './store';
import App from './App.vue';
import './router/permission';

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(store);
const iconKeys = Object.keys(Icons);
for (let i = 0; i < iconKeys.length; i++) {
  app.component(iconKeys[i], Icons[iconKeys[i]]);
}
app.mount('#app');
