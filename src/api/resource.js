import { doGet, doPost, doPut, doDelete } from 'utils/request';

/**
 * 系统管理相关接口.
 *
 * @Program: tq-project-ui
 * @Author: ytq
 * @Date: 2021/10/30 11:05:01
 */

/**
 * 通过APPID加载资源
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function loadResByAppId(condition) {
  return doGet('/api/auth/tqAuthResource/listResourceByRole', condition);
}

/**
 * 分页加载资源
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function loadResByPage(condition) {
  return doGet('/api/auth/tqAuthResource/page', condition);
}

/**
 * 分页删除资源
 * @param id
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function removeResByPage(id, condition) {
  return doDelete(`/api/auth/tqAuthResource/page/${id}`, condition);
}

/**
 * 批量分页删除资源
 * @param ids
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function batchRemoveResByPage(ids, condition) {
  return doDelete(
    `/api/auth/tqAuthResource/batchRemoveByPage/${ids}`,
    condition
  );
}

/**
 * 更新资源
 * @param menu
 * @returns {Promise<AxiosResponse<*>>}
 */
function updateRes(menu) {
  return doPut('/api/auth/tqAuthResource', menu);
}

/**
 * 保存资源
 * @param menu
 * @returns {Promise<AxiosResponse<*>>}
 */
function saveRes(menu) {
  return doPost('/api/auth/tqAuthResource', menu);
}

/**
 * 删除资源
 * @param id
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function removeRes(id, condition) {
  return doDelete(`/api/auth/tqAuthResource/${id}`, condition);
}

/**
 * 批量删除资源
 * @param ids
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function batchRemoveRes(ids, condition) {
  return doDelete(`/api/auth/tqAuthResource/batchRemove/${ids}`, condition);
}

export default {
  loadResByAppId,
  updateRes,
  saveRes,
  removeRes,
  batchRemoveRes,
  loadResByPage,
  removeResByPage,
  batchRemoveResByPage,
};
