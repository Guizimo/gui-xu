import { useEffect, useState } from 'react';
import {getSystemInfoSync} from '@tarojs/taro'

const useAppConfig = () => {
  const [statusBarHeight, setStatusBarHeight] = useState(20); // 默认状态栏高度（一般 Android 是 20）
  const [screenHeight, setScreenHeight] = useState(800);
  const [navBarHeight, setNavBarHeight] = useState(100) // 自定义菜单的高度

  /**
   * 将 rpx 转换为 px
   * @param rpx 需要转换的 rpx 值
   */
  const rpxToPx = (rpx: number) => {
    const systemInfo = getSystemInfoSync(); // 获取设备信息
    const screenWidth = systemInfo.screenWidth; // 屏幕宽度（以 px 为单位）
    return (rpx / 750) * screenWidth; // 750 是设计稿宽度
  };

  useEffect(() => {
    const systemInfo: any = getSystemInfoSync(); // 获取系统信息
    setStatusBarHeight(systemInfo?.statusBarHeight); // 设置状态栏高度
    setScreenHeight(systemInfo?.screenHeight); // 设置状态栏高度
    setNavBarHeight(rpxToPx(100))
  }, []);

  return { statusBarHeight, screenHeight, navBarHeight }
}

export default useAppConfig;
