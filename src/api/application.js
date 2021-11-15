/**
 * 应用管理相关接口.
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
function loadAppListByPage(condition) {
  return doGet('/api/auth/tqAuthApplication/page', condition);
}

/**
 * 更新应用
 * @param application
 * @returns {Promise<AxiosResponse<*>>}
 */
function updateApplication(application) {
  return doPut('/api/auth/tqAuthApplication', application);
}

/**
 * 保存应用
 * @param application
 * @returns {Promise<AxiosResponse<*>>}
 */
function saveApplication(application) {
  return doPost('/api/auth/tqAuthApplication', application);
}

/**
 * 删除应用
 * @param id
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function removeApplicationByPage(id, condition) {
  return doDelete(`/api/auth/tqAuthApplication/page/${id}`, condition);
}

/**
 * 批量分页删除应用
 * @param ids
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function batchRemoveApplicationByPage(ids, condition) {
  return doDelete(
    `/api/auth/tqAuthApplication/batchRemoveByPage/${ids}`,
    condition
  );
}

/**
 * 获取当前登录用户拥有的应用列表
 */
function loadApplicationListByCurrentUser() {
  return doGet(
    `/api/auth/tqAuthTenantApplicationRelation/loadApplicationListByCurrentUser`
  );
}

export default {
  loadAppListByPage,
  updateApplication,
  saveApplication,
  removeApplicationByPage,
  batchRemoveApplicationByPage,
  loadApplicationListByCurrentUser,
};
