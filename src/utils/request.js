import axios from 'axios';
import { ElMessage } from 'element-plus';

const request = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

// request interceptor
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    ElMessage.error('服务器异常');
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code !== 200) {
      if (res.code === 500) {
        ElMessage.error('服务器异常');
        return Promise.reject(new Error('服务器错误'));
      }
      // ElMessage.warning(res.message);
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res.data;
  },
  (error) => {
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
export function doDelete(uri, param) {
  return request.delete(uri);
}

export default request;
