import { ElMessage } from 'element-plus';
import userApi from 'api/user';
import router from '../../router';

export default {
  namespaced: true,
  state: () => ({
    userInfo: {},
  }),
  mutations: {
    REFRESH_USER_INFO: (state, payload) => {
      state.userInfo = payload;
    },
  },
  actions: {
    /**
     * 用户登录
     * @param context
     * @param payload
     * @constructor
     */
    DO_LOGIN: (context, payload) => {
      // 进行用户登录
      userApi.doLogin(payload).then((res) => {
        ElMessage.success('登录成功');
        context.commit('REFRESH_USER_INFO', res);
        router.push('/');
      });
    },
    /**
     * 校验用户Token
     * @param context
     * @param payload
     * @constructor
     */
    CHECK_TOKEN: async (context, payload) => {
      // ElMessage.info('刷新Token');
      const result = await userApi
        .checkToken({ token: context.state.userInfo.token })
        .then((res) => {
          ElMessage.success('Token校验通过');
          context.commit('REFRESH_USER_INFO', res);
          return context.state.userInfo;
        })
        .catch((error) => {
          // ElMessage.error('Token校验失败');
          return undefined;
        });

      return result;
    },
  },
  getters: {
    userInfo: (state) => state.userInfo,
  },
};
