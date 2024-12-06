import { taroRequest } from '../common/request';

/**
 * 获取分类列表
 */
export const getCategoryList = () => {
  let url = `/apis/api.content.halo.run/v1alpha1/categories`;
  return taroRequest({ url, method: 'GET' });
};

/**
 * 获取文章列表
 * @param categoryId 分类id
 */
export const getPosts = (categoryId: string) => {
  let url = `/apis/api.console.halo.run/v1alpha1/posts`;
  let params: any = {};
  if (categoryId !== 'all') {
    params.categoryWithChildren = categoryId;
  }
  return taroRequest({ url, method: 'GET', params });
};

/**
 * 获取文章详情
 * @param postId
 */
export const getPostDetail = (postId: any) => {
  let url = `/apis/api.content.halo.run/v1alpha1/posts/${postId}`;
  return taroRequest({ url, method: 'GET' });
};
