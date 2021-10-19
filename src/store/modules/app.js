export default {
  namespaced: true,
  state: () => ({
    /**
     * 应用设置
     */
    settings: {},
    /**
     * 用户打开标签列表
     */
    tags: [],
    /**
     * 当前打开标签
     */
    currentOpenTAG: {},
    /**
     * 单签菜单所指向标签
     */
    currentMenuTag: null,
    /**
     * 是否展示侧边栏
     */
    showSideBar: true,
    /**
     * 当前页面大小，有mobile 与 pc
     */
    size: 'pc',
    matchedRouters: [],
    isFullScreen: false,
  }),
  mutations: {
    SET_MATCHED_ROUTERS: (state, payload) => {
      state.matchedRouters.splice(0, state.matchedRouters.length);
      state.matchedRouters.push(...payload);
    },
    SET_CURRENT_MENU_TAG: (state, payload) => {
      state.currentMenuTag = payload;
    },
    /**
     * 添加标签
     * @param state
     * @param payload
     * @constructor
     */
    ADD_TAG: (state, payload) => {
      // 判断当前添加的标签是否为当前打开的标签，如果是则不做操作
      if (payload.url === state.currentOpenTAG.url) {
        return;
      }
      state.currentOpenTAG.isActive = false;
      payload.isActive = true;
      // 判断是否已存在该标签
      state.currentOpenTAG = state.tags.find((tag) => tag.url === payload.url);
      if (state.currentOpenTAG) {
        return;
      }
      // 元素不存在，则加入
      state.tags.push(payload);
      state.currentOpenTAG = payload;
    },
    /**
     * 删除标签
     * @param state
     * @param payload
     * @constructor
     */
    REMOVE_TAG: (state, payload) => {
      if (!payload.closable) {
        // 标签不可关闭直接返回
        return;
      }
      const index = state.tags.findIndex((tag) => tag.url === payload.url);
      if (payload.isActive) {
        // 删除标签为激活状态自动解惑其前一个或后一个元素
        let step = -1;
        // 将前一个标签置为激活状态
        if (index === 0 && state.tags.length > 1) {
          step = 1;
        }
        state.currentOpenTAG = state.tags[index + step];
      }
      // 删除元素
      state.tags.splice(index, 1);
    },
    /**
     * 删除所有标签
     * @param state
     * @constructor
     */
    REMOVE_ALL: (state) => {
      for (let i = 0; i < state.tags.length; i++) {
        if (state.tags[i].closable) {
          // 可关闭标签直接删除
          state.tags.splice(i, 1);
          i--;
        }
      }
      if (state.currentOpenTAG.closable) {
        // 当前打开的是可关闭标签，将当前菜单标签及当前打开标签重置
        state.currentMenuTag = null;
        state.currentOpenTAG = state.tags.length === 0 ? null : state.tags[0];
      }
    },
    /**
     * 删除其他标签
     * @param state
     * @param payload
     * @constructor
     */
    REMOVE_OTHER: (state, payload) => {
      payload = state.currentMenuTag;
      // 删除除了不可关闭
      for (let i = 0; i < state.tags.length; i++) {
        const tag = state.tags[i];
        if (tag.url !== payload.url && tag.closable) {
          // 可关闭标签直接删除
          state.tags.splice(i, 1);
          i--;
        }
      }
      // 将当前打开的标签改为菜单所指标签，没有则指向第一个不可关闭标签
      state.currentOpenTAG = null;
      const closeableTagList = state.tags.filter((tag) => tag.closable);
      if (closeableTagList.length >= 1) {
        state.currentOpenTAG = closeableTagList[0];
      } else if (state.tags.length >= 1) {
        state.currentOpenTAG = state.tags[0];
      }
    },
    /**
     * 修改全屏状态
     * @param state
     * @param payload
     * @constructor
     */
    CHANGE_IS_FULL_SCREEN: (state, payload) => {
      state.isFullScreen = !state.isFullScreen;
    },
  },
  actions: {
    /**
     * 校验用户Token
     * @param context
     * @param payload
     * @constructor
     */
    CHECK_TOKEN: async (context, payload) => {
      // ElMessage.info('刷新Token');
    },
    /**
     * 设置用来判断是PC还是Mobile
     * @param context
     * @param payload
     * @returns {Promise<void>}
     * @constructor
     */
    SET_SIZE: async (context, payload) => {
      context.state.size = payload;
    },
    /**
     * 修改侧边栏的展示隐藏
     * @param context
     * @param payload
     * @constructor
     */
    CHANGE_SHOW_SIDE_BAR(context, payload) {
      context.state.showSideBar = !context.state.showSideBar;
    },
  },
  getters: {
    settings: (state) => state.userInfo,
    tags: (state) => state.tags,
    size: (state) => state.size,
    currentOpenTag: (state) => state.currentOpenTAG,
    currentMenuTag: (state) => state.currentMenuTag,
    showSideBar: (state) => state.showSideBar,
    matchedRouters: (state) => state.matchedRouters,
    fullScreen: (state) => state.isFullScreen,
  },
};
