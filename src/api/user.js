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

/**
 * 分页加载用户列表
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function loadUserListByPage(condition) {
  return doGet('/api/auth/tqAuthUser/page', condition);
}

/**
 * 更新用户
 * @param application
 * @returns {Promise<AxiosResponse<*>>}
 */
function updateUser(user) {
  return doPut('/api/auth/tqAuthUser', user);
}

/**
 * 保存用户
 * @param application
 * @returns {Promise<AxiosResponse<*>>}
 */
function saveUser(user) {
  return doPost('/api/auth/tqAuthUser', user);
}

/**
 * 删除用户
 * @param id
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function removeUserByPage(id, condition) {
  return doDelete(`/api/auth/tqAuthUser/page/${id}`, condition);
}

/**
 * 批量分页删除用户
 * @param ids
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function batchRemoveUserByPage(ids, condition) {
  return doDelete(`/api/auth/tqAuthUser/batchRemoveByPage/${ids}`, condition);
}

function loadUserList(params) {
  return doGet('/api/auth/tqAuthUser', params);
}

/**
 * 授权角色给用户
 * @param params
 */
function authorizeRoleToUser(params) {
  return doPut('/api/auth/tqAuthUserRoleRelation/authorizeRoleToUser', params);
}

/**
 * 加载授权的角色列表
 * @param params
 */
function loadAuthorizedRoleList(params) {
  return doGet(
    '/api/auth/tqAuthUserRoleRelation/loadAuthorizedRoleList',
    params
  );
}
export default {
  doLogin,
  loadMenu,
  loadUserListByPage,
  updateUser,
  saveUser,
  removeUserByPage,
  batchRemoveUserByPage,
  loadUserList,
  authorizeRoleToUser,
  loadAuthorizedRoleList,
};
