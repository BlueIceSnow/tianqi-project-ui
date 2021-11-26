/**
 * 组织管理.
 *
 * @Program: tq-project-ui
 * @Author: ytq
 * @Date: 2021/11/09 14:11:40
 */
import { doGet, doPost, doPut, doDelete } from 'utils/request';

/**
 * 通过APPID加载组织ID
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function loadOrgByAppId(condition) {
  return doGet('/api/auth/tqAuthOrg/listOrgByLoginUser', condition);
}

/**
 * 通过APPID加载组织ID
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function loadOrg(condition) {
  return doGet('/api/auth/tqAuthOrg/listOrg', condition);
}

/**
 * 更新组织
 * @param organization
 * @returns {Promise<AxiosResponse<*>>}
 */
function updateOrg(organization) {
  return doPut('/api/auth/tqAuthOrg', organization);
}

/**
 * 保存组织
 * @param organization
 * @returns {Promise<AxiosResponse<*>>}
 */
function saveOrg(organization) {
  return doPost('/api/auth/tqAuthOrg', organization);
}

/**
 * 删除组织
 * @param id
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function removeOrg(id, condition) {
  return doDelete(`/api/auth/tqAuthOrg/${id}`, condition);
}

/**
 * 批量删除组织
 * @param ids
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function batchRemoveOrg(ids, condition) {
  return doDelete(`/api/auth/tqAuthOrg/batchRemove/${ids}`, condition);
}

/**
 * 授权用户给组织
 * @param params
 * @returns {Promise<AxiosResponse<*>>}
 */
function authorizeUserToOrg(params) {
  return doPut(`/api/auth/tqAuthUserOrgRelation/authoriseUserToOrg`, params);
}

/**
 * 加载授权给组织的用户列表
 * @param params
 */
function loadAuthorizedUserList(params) {
  return doGet(
    `/api/auth/tqAuthUserOrgRelation/loadAuthorizedUserList`,
    params
  );
}

/**
 * 授权角色给组织
 * @param params
 * @returns {Promise<AxiosResponse<*>>}
 */
function authorizeRoleToOrg(params) {
  return doPut('/api/auth/tqAuthOrgRoleRelation/authorizeRoleToOrg', params);
}

/**
 * 加载授权给组织的角色列表
 * @param params
 * @returns {Promise<AxiosResponse<*>>}
 */
function loadAuthorizedRoleList(params) {
  return doGet(
    '/api/auth/tqAuthOrgRoleRelation/loadAuthorizedRoleList',
    params
  );
}

export default {
  loadOrgByAppId,
  loadOrg,
  updateOrg,
  saveOrg,
  removeOrg,
  batchRemoveOrg,
  authorizeUserToOrg,
  loadAuthorizedUserList,
  authorizeRoleToOrg,
  loadAuthorizedRoleList,
};
