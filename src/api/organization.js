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

export default {
  loadOrgByAppId,
  updateOrg,
  saveOrg,
  removeOrg,
  batchRemoveOrg,
};
