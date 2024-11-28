import { taroRequest } from '../common/request';

/**
 * 获取配置
 * @param name
 */
export const getConfigByName = (name: string) => {
  const url = `/api/v1alpha1/configmaps/${name}`;
  return taroRequest({ url, method: 'GET' });
}
