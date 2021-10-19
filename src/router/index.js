import { createRouter, createWebHistory } from 'vue-router';
import layout from './modules/layout';
import login from './modules/login';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...layout, ...login],
});

export default router;
