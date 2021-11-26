import Layout from 'views/layout/Layout.vue';
import Dashboard from 'views/Dashboard.vue';

export default [
  {
    path: '/',
    name: 'index',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      url: '/',
      title: '首页',
      index: 1,
      closeable: true,
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          url: '/dashboard',
          index: -1,
          title: 'Dashboard',
          closeable: false,
        },
      },
    ],
  },
];
