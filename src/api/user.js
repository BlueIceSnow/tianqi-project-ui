import { doGet, doPost, doPut, doDelete } from 'utils/request';

/**
 * 用户登录接口
 * @param data
 * @returns {Promise<AxiosResponse<*>>}
 */
function doLogin(data) {
  return doPost(`/api/auth/token`, data);
}

/**
 * 加载菜单路由信息
 * @returns {Promise<AxiosResponse<*>>}
 */
function loadMenu() {
  return doPost(`/api/auth/tqAuthResource/loadMenu`);
}
export default {
  doLogin,
  loadMenu,
};
