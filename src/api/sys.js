import { doGet, doPost, doPut, doDelete } from 'utils/request';

/**
 * 系统管理相关接口.
 *
 * @Program: tq-project-ui
 * @Author: ytq
 * @Date: 2021/10/30 11:05:01
 */
function loadMenuByAppId(condition) {
  return doGet('/api/auth/tqAuthResource/listResourceByRole', condition);
}

function updateMenu(menu) {
  return doPut('/api/auth/tqAuthResource', menu);
}

function saveMenu(menu) {
  return doPost('/api/auth/tqAuthResource', menu);
}

function removeMenu(id, condition) {
  return doDelete(`/api/auth/tqAuthResource/${id}`, condition);
}

function batchRemoveMenu(ids, condition) {
  return doDelete(`/api/auth/tqAuthResource/batchRemove/${ids}`, condition);
}

export default {
  loadMenuByAppId,
  updateMenu,
  saveMenu,
  removeMenu,
  batchRemoveMenu,
};
