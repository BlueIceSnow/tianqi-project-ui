import axios from 'axios';
import { ElMessage } from 'element-plus';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

// request interceptor
request.interceptors.request.use(
  (config) => {
    // 请求前将TOKEN放入
    config.headers.Authorization = localStorage.getItem('Authorization');
    return config;
  },
  (error) => {
    ElMessage.error('前端请求出现异常');
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    const { status, error, validates, data } = { ...res };
    const codeStr = status.code.toString();
    if (codeStr.indexOf('3') !== 0) {
      if (codeStr.indexOf('1') === 0) {
        ElMessage.warning(status.msg);
        return Promise.reject(new Error(status.msg || 'Error'));
      }
      if (codeStr.indexOf('2') === 0) {
        ElMessage.success(status.msg);
        return res.data;
      }

      if (codeStr.indexOf('5') === 0) {
        ElMessage.error(status.msg);
        return Promise.reject(new Error(status.msg));
      }
    }
    return res.data;
  },
  (error) => {
    ElMessage.error('服务器在开小差~');
    return Promise.reject(error);
  }
);

/**
 * 发送Get请求
 * @param uri
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function doGet(uri, params) {
  return request.get(uri, {
    params: {
      ...params,
    },
  });
}

/**
 * 发送Post请求
 * @param uri
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function doPost(uri, params) {
  return request.post(uri, params, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * 发送Put请求
 * @param uri
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function doPut(uri, params) {
  return request.put(uri, params, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * 发送Delete请求
 * @param uri
 * @param param
 * @returns {Promise<AxiosResponse<any>>}
 */
export function doDelete(uri, params) {
  return request.delete(uri, { params });
}

export default request;
