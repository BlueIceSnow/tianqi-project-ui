/**
 * 租户管理相关接口.
 *
 * @Program: tq-project-ui
 * @Author: ytq
 * @Date: 2021/11/06 14:32:12
 */
import { doGet, doPost, doPut, doDelete } from 'utils/request';

/**
 * 分页加载应用列表
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function loadTenantListByPage(condition) {
  return doGet('/api/auth/tqAuthTenant/page', condition);
}

function loadTenantList(params) {
  return doGet('/api/auth/tqAuthTenant', params);
}

/**
 * 更新应用
 * @param application
 * @returns {Promise<AxiosResponse<*>>}
 */
function updateTenant(application) {
  return doPut('/api/auth/tqAuthTenant', application);
}

/**
 * 保存应用
 * @param application
 * @returns {Promise<AxiosResponse<*>>}
 */
function saveTenant(application) {
  return doPost('/api/auth/tqAuthTenant/saveTenant', application);
}

/**
 * 删除应用
 * @param id
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function removeTenantByPage(id, condition) {
  return doDelete(`/api/auth/tqAuthTenant/page/${id}`, condition);
}

/**
 * 批量分页删除应用
 * @param ids
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function batchRemoveTenantByPage(ids, condition) {
  return doDelete(`/api/auth/tqAuthTenant/batchRemoveByPage/${ids}`, condition);
}

/**
 * 为租户授权应用
 * @param params
 * @returns {Promise<AxiosResponse<*>>}
 */
function authoriseApplicationToTenant(params) {
  return doPut(
    `/api/auth/tqAuthTenantApplicationRelation/authorisedApplicationToTenant`,
    params
  );
}

function loadAuthorisedApplicationList(params) {
  return doGet(
    `/api/auth/tqAuthTenantApplicationRelation/loadTenantRelationApplicationList`,
    params
  );
}

export default {
  loadTenantListByPage,
  updateTenant,
  saveTenant,
  removeTenantByPage,
  batchRemoveTenantByPage,
  authoriseApplicationToTenant,
  loadAuthorisedApplicationList,
  loadTenantList,
};
