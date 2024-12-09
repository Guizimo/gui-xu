import './Layout.scss';
import { Popup, Switch } from '@nutui/nutui-react-taro';
import { Image, View } from '@tarojs/components';
import useAppConfig from '../../../hooks/useAppConfig';
import { useSettingStore, useUserStore } from '../../../stores';
import { useEffect, useState } from 'react';
import useVibrationConfig from '../../../hooks/useVibrationConfig';
import { Github, Link } from '@nutui/icons-react-taro';

interface Props {
  show: boolean;
  onClose: () => void;
}

const Layout = (props: Props) => {
  const { show, onClose } = props;
  const { statusBarHeight } = useAppConfig();
  const { userinfo } = useUserStore();
  const { setVibrationFeedback, isVibrationFeedback } = useSettingStore();
  const [visibleLayout, setVisibleLayout] = useState(false);
  const { runVibrateShort } = useVibrationConfig();

  const changeVibration = (value: boolean) => {
    setVibrationFeedback(value);
  };

  const closeHandle = () => {
    runVibrateShort();
    onClose && onClose();
  };

  useEffect(() => {
    setVisibleLayout(show);
  }, [show]);

  return (
    <Popup
      visible={visibleLayout}
      style={{ width: '70%', height: '100%', background: '#f6f8fa' }}
      position="left"
      onClose={closeHandle}
    >
      <View className="layout-container" style={{ paddingTop: `${statusBarHeight}px` }}>
        <View className="layout-header">
          <Image className="layout-header-img" src={userinfo?.basic?.logo} />
          <View className="layout-header-name">{userinfo?.basic?.title}</View>
          <View className="layout-header-text">{userinfo?.themeTop?.above?.typed[0]?.text}</View>
          <View className="layout-header-btn">
            <View className="layout-header-btn-item">
              <Github />
            </View>
            <View className="layout-header-btn-item">
              <Link />
            </View>
          </View>
        </View>
        <View className="layout-setting">
          <View className="layout-setting-name">设置</View>
          <View className="layout-setting-content">
            <View className="layout-setting-title">震动反馈</View>
            <Switch
              defaultChecked={isVibrationFeedback}
              style={{
                // @ts-ignore
                '--nutui-switch-open-background-color': '#425AEF'
              }}
              onChange={changeVibration}
            />
          </View>
        </View>
      </View>
    </Popup>
  );
};

export default Layout;
