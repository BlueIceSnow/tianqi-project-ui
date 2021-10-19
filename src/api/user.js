import { doGet, doPost, doPut, doDelete } from 'utils/request';

/**
 * 用户登录接口
 * @param data
 * @returns {Promise<AxiosResponse<*>>}
 */
function doLogin(data) {
  return doPost(`/api/doLogin`, data);
}

/**
 * 校验Token
 * @param data
 * @returns {*}
 */
function checkToken(data) {
  return doPost(`/api/checkToken`, data);
}

export default {
  doLogin,
  checkToken,
};
