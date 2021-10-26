/**
 * 路由定义.
 *
 * @Program: tq-project-ui
 * @Author: ytq
 * @Date: 2021/10/25 15:53:57
 */

const routerDefine = {
  Demo1: () => import('views/layout/MainContent/Demo1.vue'),
  Demo2: () => import('views/layout/MainContent/Demo2.vue'),
  Demo3: () => import('views/layout/MainContent/Demo3.vue'),
};

export default routerDefine;
