import { useEffect, useState } from 'react';
import { getWindowInfo, getMenuButtonBoundingClientRect } from '@tarojs/taro';

const useAppConfig = () => {
  const [statusBarHeight, setStatusBarHeight] = useState(20); // 默认状态栏高度（一般 Android 是 20）
  const [screenHeight, setScreenHeight] = useState(800);
  const [screenWidth, setScreenWidth] = useState(400);
  const [menuBarWidth, setMenuBarWidth] = useState(100); // 右上角胶囊按钮宽度

  /**
   * 将 rpx 转换为 px
   * @param rpx 需要转换的 rpx 值
   */
  const rpxToPx = (rpx: number) => {
    const windowInfo = getWindowInfo(); // 获取设备信息
    return (rpx * windowInfo.screenWidth) / 750 ; // 屏幕宽度（以 px 为单位）, 750 是设计稿宽度
  };
  const [navBarHeight, setNavBarHeight] = useState(rpxToPx(100)); // 自定义菜单的高度

  useEffect(() => {
    const windowInfo: any = getWindowInfo(); // 获取系统信息
    setStatusBarHeight(windowInfo?.statusBarHeight); // 设置状态栏高度
    setScreenHeight(windowInfo?.screenHeight); // 设置状态栏高度
    setScreenWidth(windowInfo?.screenWidth); // 设置状态栏宽度
    setNavBarHeight(rpxToPx(100));
    const menuButtonInfo = getMenuButtonBoundingClientRect();
    setMenuBarWidth(menuButtonInfo?.width); // 设置右上角胶囊按钮宽度
  }, []);

  return { statusBarHeight, screenWidth, screenHeight, navBarHeight, menuBarWidth };
};

export default useAppConfig;
