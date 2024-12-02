import { View } from '@tarojs/components';
import { Animate, ConfigProvider } from '@nutui/nutui-react-taro';
import './index.scss';
import useSystemConfig from '../../hooks/useSystemConfig';
import GlobalLoading from '../../components/GlobalLoading/GlobalLoading';
import { useEffect, useState } from 'react';
import useAppConfig from '../../hooks/useAppConfig';
import { ArrowDown } from '@nutui/icons-react-taro';
import { usePageScroll, pageScrollTo } from '@tarojs/taro';
import TypingEffect from '../../components/TypingEffect/TypingEffect';
import CategoryList from './CategoryList/CategoryList';
import PostList from './PostList/PostList';
import { useUserStore } from '../../stores';
import BackTop from '../../components/BackTop/BackTop';

const Index = () => {
  const { loading } = useSystemConfig();
  const { userinfo } = useUserStore();
  const { statusBarHeight, screenHeight, navBarHeight, menuBarWidth } = useAppConfig();
  const [welcomeStyle, setWelcomeStyle] = useState({});
  const [navStyle, setNavStyle] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // 设置欢迎页背景图
    if (userinfo?.themeTop?.above?.phone_index_img) {
      setWelcomeStyle({
        background: `url(${userinfo?.themeTop?.above?.phone_index_img}) no-repeat center / cover`
      });
    }
  }, [userinfo]);

  useEffect(() => {
    if (statusBarHeight) {
      setNavStyle({ paddingTop: `${statusBarHeight}px` });
    }
  }, [statusBarHeight]);

  const [isScrolled, setIsScrolled] = useState(false);

  const changeCategory = (id: string) => {
    setActiveCategory(id);
  };

  // 监听页面滚动
  usePageScroll((res) => {
    // 根据滚动位置调整背景色
    setIsScrolled(res.scrollTop > 20);
  });

  const nextPage = () => {
    // 跳转到下一页
    pageScrollTo({
      scrollTop: screenHeight - statusBarHeight - navBarHeight,
      duration: 300 // 动画时长
    });
  };

  return (
    <ConfigProvider>
      <View className="index-page">
        <View className={`index-page-nav ${isScrolled ? 'isScroll' : ''}`} style={navStyle}>
          <View className="index-page-nav-title">{userinfo?.basic?.title}</View>
          <View className="index-page-nav-tools" style={{marginRight: `${menuBarWidth}px`}}>
            <BackTop />
          </View>
        </View>
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
          <PostList activeCategory={activeCategory} gotoDetail={() => {}} />
        </View>
        <GlobalLoading visible={loading} isInit message="疯狂扒拉数据中..." />
      </View>
    </ConfigProvider>
  );
};

export default Index;
