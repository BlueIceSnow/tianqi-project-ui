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
function loadRoleGroupListByPage(condition) {
  return doGet('/api/auth/tqAuthRoleGroup/page', condition);
}

/**
 * 更新角色
 * @param application
 * @returns {Promise<AxiosResponse<*>>}
 */
function updateRoleGroup(role) {
  return doPut('/api/auth/tqAuthRoleGroup', role);
}

/**
 * 保存角色
 * @param application
 * @returns {Promise<AxiosResponse<*>>}
 */
function saveRoleGroup(role) {
  return doPost('/api/auth/tqAuthRoleGroup', role);
}

/**
 * 删除角色
 * @param id
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function removeRoleGroupByPage(id, condition) {
  return doDelete(`/api/auth/tqAuthRoleGroup/page/${id}`, condition);
}

/**
 * 批量分页删除角色
 * @param ids
 * @param condition
 * @returns {Promise<AxiosResponse<*>>}
 */
function batchRemoveRoleGroupByPage(ids, condition) {
  return doDelete(
    `/api/auth/tqAuthRoleGroup/batchRemoveByPage/${ids}`,
    condition
  );
}

export default {
  loadRoleGroupListByPage,
  updateRoleGroup,
  saveRoleGroup,
  removeRoleGroupByPage,
  batchRemoveRoleGroupByPage,
};
