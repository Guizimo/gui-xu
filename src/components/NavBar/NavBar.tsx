import { View } from '@tarojs/components';
import BackTop from '../BackTop/BackTop';
import { useUserStore } from '../../stores';
import { useEffect, useState } from 'react';
import useVibrationConfig from '../../hooks/useVibrationConfig';
import { usePageScroll } from '@tarojs/taro';
import useAppConfig from '../../hooks/useAppConfig';
import Layout from '../../pages/index/Layout/Layout';
import './NavBar.scss';

const NavBar = () => {
  const { userinfo } = useUserStore();
  const [showLayout, setShowLayout] = useState<boolean>(false);
  const { runVibrateShort } = useVibrationConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [navStyle, setNavStyle] = useState({});
  const { statusBarHeight, menuBarWidth } = useAppConfig();

  // 监听页面滚动
  usePageScroll((res) => {
    // 根据滚动位置调整背景色
    setIsScrolled(res.scrollTop > 20);
  });

  useEffect(() => {
    if (statusBarHeight) {
      setNavStyle({ paddingTop: `${statusBarHeight}px` });
    }
  }, [statusBarHeight]);


  const openLayout = () => {
    runVibrateShort();
    setShowLayout(true);
  };

  const closeLayout = () => {
    setShowLayout(false);
  };

  return  <>
    <View className={`nav-bar-container ${isScrolled ? 'isScroll' : ''}`} style={navStyle}>
      <View className="nav-bar-title" onClick={openLayout}>
        {userinfo?.basic?.title}
      </View>
      <View className="nav-bar-tools" style={{ marginRight: `${menuBarWidth}px` }}>
        <BackTop />
      </View>
    </View>
    <Layout show={showLayout} onClose={closeLayout} />
  </>
}

export default NavBar;
