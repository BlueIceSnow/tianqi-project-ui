import Layout from 'views/layout/Layout.vue';
import Demo from 'views/layout/MainContent/Demo.vue';
import Demo2 from 'views/layout/MainContent/Demo2.vue';
import Demo3 from 'views/layout/MainContent/Demo3.vue';
import Dashboard from 'views/layout/MainContent/Dashboard.vue';

export default [
  {
    path: '/',
    name: '首页',
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
        path: '/demo',
        name: '选项1',
        component: Demo,
        meta: {
          url: '/demo',
          title: '选项1',
          index: 2,
          closeable: true,
        },
      },
      {
        path: '/demo2',
        name: '选项2',
        component: Demo2,
        meta: {
          url: '/demo2',
          title: '选项2',
          index: 3,
          closeable: true,
        },
        children: [
          {
            path: '/demo2/demo3',
            name: '选项3',
            component: Demo3,
            meta: {
              url: '/demo2/demo3',
              index: 4,
              title: '选项3',
              closeable: true,
            },
          },
        ],
      },
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
