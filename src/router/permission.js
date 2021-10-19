import { ElMessage } from 'element-plus';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from './index';
import store from '../store';

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 刷新用户信息
  if (to.fullPath !== '/login') {
    const result = await store.dispatch('user/CHECK_TOKEN');
    console.log(result);
    // if (!result) {
    // router.push('/login');
    // }
  }
  // ElMessage.info('处理用户权限');
  return next();
});

router.beforeResolve((to, from) => {
  // ElMessage.info('再次校验权限');
  if (to.matched.length === 0) {
    router.push('/404');
  }
  store.commit('app/SET_MATCHED_ROUTERS', to.matched);
  console.log(to.matched);
});

router.afterEach((to, from) => {
  // ElMessage.info('处理页面渲染');
  NProgress.done();
  return false;
});
