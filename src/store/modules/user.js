import userApi from 'api/user';
import applicationApis from 'api/application';
import NotFound from 'views/layout/MainContent/404.vue';
import router from '../../router';
import constRouterDefine from '../../router/router-component-define';

export default {
  namespaced: true,
  state: () => ({
    userInfo: {},
    routerList: [],
    applicationList: [],
    currentApplication: {},
  }),
  mutations: {
    REFRESH_USER_INFO: (state, payload) => {
      state.userInfo = payload;
    },
    SET_APPLICATION_LIST: (state, payload) => {
      state.applicationList.splice(0, state.applicationList.length);
      state.applicationList.push(...payload);
    },
    SET_CURRENT_APPLICATION: (state, payload) => {
      state.currentApplication = payload;
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
        localStorage.setItem('Authorization', res.row);
        context.commit('REFRESH_USER_INFO', res);
        router.push('/');
      });
    },
    /**
     * 加载用户菜单
     * @param context
     * @param payload
     * @constructor
     */
    LOAD_USER_MENU: async (context, payload) => {
      const result = await userApi
        .loadMenu()
        .then((res) => {
          context.state.routerList = [];
          // 构建树
          const routerList = context.state.routerList;
          const menuTree = buildTree(res.row.menus, routerList, -1);
          res.row.menus = menuTree;
          context.commit('REFRESH_USER_INFO', res.row);
          const appId = res.row.appId;
          if (Reflect.ownKeys(context.state.currentApplication).length === 0) {
            context.dispatch('LOAD_APPLICATION_LIST').then((result) => {
              // 找到当前用户选择的应用
              context.commit(
                'SET_CURRENT_APPLICATION',
                context.state.applicationList.find((item) => item.id === appId)
              );
            });
          }
          return context.state.userInfo;
        })
        .catch((error) => {
          return undefined;
        });

      return result;
    },
    /**
     * 加载用户拥有的应用列表
     * @param context
     * @returns {Promise<void>}
     * @constructor
     */
    LOAD_APPLICATION_LIST: async (context) => {
      await applicationApis.loadApplicationListByCurrentUser().then((res) => {
        context.commit('SET_APPLICATION_LIST', res.row);
      });
    },
  },
  getters: {
    userInfo: (state) => state.userInfo,
    routerList: (state) => state.routerList,
    currentApplication: (state) => state.currentApplication,
    applicationList: (state) => state.applicationList,
  },
};

/**
 * 将列表构建为树
 * @param menuList
 */
function buildTree(menuList, routerList, pid) {
  const rootMenu = [];
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].parentId === pid) {
      rootMenu.push(menuList[i]);
      let children = [];
      if (!menuList[i].extField.isGroup) {
        const router = {
          path: menuList[i].url,
          name: menuList[i].name,
          component: constRouterDefine[menuList[i].component] || NotFound,
          meta: {
            url: menuList[i].url,
            title: menuList[i].name,
            index: menuList[i].id,
            closeable: menuList[i].closeable,
          },
          children,
        };
        routerList.push(router);
      } else {
        children = routerList;
      }
      const child = buildTree(menuList, children, menuList[i].id);
      menuList[i].child = child;
    }
  }
  return rootMenu;
}
