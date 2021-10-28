import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from './index';
import store from '../store';

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 刷新用户信息
  let result = null;
  if (to.fullPath !== '/login') {
    result = await store.dispatch('user/LOAD_USER_MENU');

    if (!result) {
      return next('/login');
    }
    // 构建路由
    const routers = store.getters['user/routerList'];
    for (let i = 0; i < routers.length; i++) {
      router.addRoute('index', routers[i]);
    }
    if (
      !router.hasRoute(to.name) &&
      findNodeFromTree(result?.menus, to.fullPath, 'child', 'url')
    ) {
      return next({ ...to, replace: true });
    }
  }

  return next();
});

router.beforeResolve((to, from) => {
  if (to.matched.length === 0) {
    router.push('/404');
  }
  // 设置匹配到的路由，用于菜单导航
  store.commit('app/SET_MATCHED_ROUTERS', to.matched);
});

router.afterEach((to, from) => {
  NProgress.done();
  return false;
});

function findNodeFromTree(tree, matchVal, childKey, matchKey) {
  let node = null;
  for (let i = 0; i < tree.length; i++) {
    if (tree[i][matchKey] === matchVal) {
      node = tree[i];
      break;
    }
    node = findNodeFromTree(tree[i][childKey], matchVal, childKey, matchKey);
  }
  return node;
}
