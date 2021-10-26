import Layout from 'views/layout/Layout.vue';
import Demo from 'views/layout/MainContent/Demo1.vue';
import Demo2 from 'views/layout/MainContent/Demo2.vue';
import Demo3 from 'views/layout/MainContent/Demo3.vue';
import Dashboard from 'views/layout/MainContent/Dashboard.vue';

export default [
  {
    path: '/',
    name: 'index',
    component: Layout,
    redirect: 'dashboard',
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
          index: 5,
          title: 'Dashboard',
          closeable: false,
        },
      },
    ],
  },
];
