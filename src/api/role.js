/**
 * 角色管理.
 *
 * @Program: tq-project-ui
 * @Author: ytq
 * @Date: 2021/11/06 14:58:34
 */
import { doGet, doPost, doPut, doDelete } from 'utils/request';

/**
 * 分页加载角色列表
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function loadRoleListByPage(condition) {
  return doGet('/api/auth/tqAuthRole/page', condition);
}

/**
 * 加载角色列表
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function loadRoleList(condition) {
  return doGet('/api/auth/tqAuthRole', condition);
}

/**
 * 更新角色
 * @param application
 * @returns {Promise<AxiosResponse<*>>}
 */
function updateRole(role) {
  return doPut('/api/auth/tqAuthRole', role);
}

/**
 * 保存角色
 * @param application
 * @returns {Promise<AxiosResponse<*>>}
 */
function saveRole(role) {
  return doPost('/api/auth/tqAuthRole', role);
}

/**
 * 删除角色
 * @param id
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function removeRoleByPage(id, condition) {
  return doDelete(`/api/auth/tqAuthRole/page/${id}`, condition);
}

/**
 * 批量分页删除角色
 * @param ids
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function batchRemoveRoleByPage(ids, condition) {
  return doDelete(`/api/auth/tqAuthRole/batchRemoveByPage/${ids}`, condition);
}

function authoriseResToRole(params) {
  return doPut(
    '/api/auth/tqAuthRoleResourceRelation/authoriseResToRole',
    params
  );
}

/**
 * 根据角色ID获取已授权的菜单列表
 * @param params
 */
function loadAuthorisedResByRoleId(params) {
  return doGet(
    '/api/auth/tqAuthRoleResourceRelation/loadAuthorisedResByRoleId',
    params
  );
}

export default {
  loadRoleListByPage,
  updateRole,
  saveRole,
  removeRoleByPage,
  batchRemoveRoleByPage,
  authoriseResToRole,
  loadAuthorisedResByRoleId,
  loadRoleList,
};
