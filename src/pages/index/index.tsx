import { View } from '@tarojs/components';
import { Animate, ConfigProvider } from '@nutui/nutui-react-taro';
import './index.scss';
import useSystemConfig from '../../hooks/useSystemConfig';
import GlobalLoading from '../../components/GlobalLoading/GlobalLoading';
import { useEffect, useState } from 'react';
import useAppConfig from '../../hooks/useAppConfig';
import { ArrowDown } from '@nutui/icons-react-taro';
import { pageScrollTo } from '@tarojs/taro';
import TypingEffect from '../../components/TypingEffect/TypingEffect';
import CategoryList from './CategoryList/CategoryList';
import PostList from './PostList/PostList';
import { useUserStore } from '../../stores';
import useVibrationConfig from '../../hooks/useVibrationConfig';
import NavBar from '../../components/NavBar/NavBar';

const Index = () => {
  const { loading } = useSystemConfig();
  const { userinfo } = useUserStore();
  const { statusBarHeight, navBarHeight } = useAppConfig();
  const [welcomeStyle, setWelcomeStyle] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const { runVibrateShort } = useVibrationConfig();

  useEffect(() => {
    // 设置欢迎页背景图
    if (userinfo?.themeTop?.above?.phone_index_img) {
      setWelcomeStyle({
        background: `url(${userinfo?.themeTop?.above?.phone_index_img}) no-repeat center / cover`
      });
    }
  }, [userinfo]);

  // 改变分类
  const changeCategory = (id: string) => {
    setActiveCategory(id);
    nextPage();
  };

  // 滚动到下一页
  const nextPage = () => {
    runVibrateShort();
    // 跳转到下一页
    pageScrollTo({
      selector: '.index-page-content',
      offsetTop: -(statusBarHeight + navBarHeight),
      duration: 300 // 动画时长
    });
  };

  return (
    <ConfigProvider>
      <View className="index-page">
        <NavBar />
        <View className="index-page-welcome" style={welcomeStyle}>
          <View className="index-page-welcome-head" />
          <View className="index-page-welcome-box">
            <View className="index-page-welcome-box-title">{userinfo?.basic?.title}</View>
            <View className="index-page-welcome-box-desc">
              <TypingEffect text={userinfo?.themeTop?.above?.typed[0]?.text} speed={150} />
            </View>
          </View>
          <View className="index-page-welcome-footer">
            <Animate type="float" loop>
              <ArrowDown color="rgba(255,255,255,0.7)" size="30px" onClick={nextPage} />
            </Animate>
          </View>
        </View>
        <View className="index-page-content">
          <CategoryList activeCategory={activeCategory} onChange={changeCategory} />
          <PostList activeCategory={activeCategory} />
        </View>
        <GlobalLoading visible={loading} isInit message="疯狂扒拉数据中..." />
      </View>
    </ConfigProvider>
  );
};

export default Index;
