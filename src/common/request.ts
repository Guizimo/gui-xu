import { addInterceptor, request, showToast } from '@tarojs/taro';

/**
 * 基础请求方法
 * @param url 请求地址
 * @param method 请求方法
 * @param params 请求参数
 */
export const taroRequest = ({ url, method, params = {} }) => {
  // 请求拦截器
  addInterceptor((chain) => {
    const requestParams = chain.requestParams;
    // 可在此处添加 token 或其他请求前逻辑
    requestParams.header = {
      ...requestParams.header,
      Authorization: `Bearer ${process.env.TARO_APP_API_TOKEN}`
    };
    return chain.proceed(requestParams).then((response: any) => {
      // 响应拦截器
      return response;
    });
  });

  return request({
    url: `${process.env.TARO_APP_API_BASE_URL}${url}`,
    method,
    data: params,
    header: {
      'Content-Type': 'application/json'
      // 可以在此添加 token 等其他 headers
    }
  })
    .then((response) => {
      const { statusCode, data } = response;
      if (statusCode === 200) {
        return data;
      } else {
        throw new Error(`HTTP error: ${statusCode}`);
      }
    })
    .catch((error) => {
      showToast({ title: '请求失败', icon: 'none' });
      console.error('HTTP Request Error:', error);
      throw error;
    });
};
