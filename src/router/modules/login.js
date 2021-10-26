import NotFound from 'views/layout/MainContent/404.vue';

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('views/Login.vue'),
    meta: {
      url: '/login',
      title: '登录',
      index: 6,
      closeable: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    meta: {
      url: '/404',
      title: '404',
      index: 7,
      closeable: true,
    },
  },
];
