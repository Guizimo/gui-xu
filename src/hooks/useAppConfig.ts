import { useEffect, useState } from 'react';
import {getSystemInfoSync} from '@tarojs/taro'

const useAppConfig = () => {
  const [statusBarHeight, setStatusBarHeight] = useState(20); // 默认状态栏高度（一般 Android 是 20）
  const [screenHeight, setScreenHeight] = useState(800);

  useEffect(() => {
    const systemInfo: any = getSystemInfoSync(); // 获取系统信息
    setStatusBarHeight(systemInfo?.statusBarHeight); // 设置状态栏高度
    setScreenHeight(systemInfo?.screenHeight); // 设置状态栏高度
  }, []);

  return { statusBarHeight, screenHeight }
}

export default useAppConfig;
