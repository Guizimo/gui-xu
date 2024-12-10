import { createSelectorQuery } from '@tarojs/taro';

export const getScrollTop = () => {
  return new Promise((resolve, reject) => {
    const query = createSelectorQuery();
    query
      .selectViewport()
      .scrollOffset() // 获取滚动距离
      .exec((res) => {
        if (res && res[0]) {
          resolve(res[0].scrollTop); // 返回当前页面滚动高度
        } else {
          reject('获取失败');
        }
      });
  });
};
