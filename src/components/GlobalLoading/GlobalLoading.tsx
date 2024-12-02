import { Image, View } from '@tarojs/components';
import { Animate, Loading } from '@nutui/nutui-react-taro';
import './GlobalLoading.scss';
import { useUserStore } from '../../stores';

interface Props {
  visible: boolean;
  message?: string;
  isInit?: boolean; // 是否是初始化状态
}

const GlobalLoading = (props: Props) => {
  const { visible, message, isInit = false } = props;
  const { userinfo } = useUserStore();

  if (!visible) return null;

  return (
    <View className="global-loading-container">
      {isInit ? (
        <Loading direction="vertical">{message || '加载中'}</Loading>
      ) : (
        <View>
          <Animate type="breath" loop>
            <View className="global-loading-box">
              <Image src={userinfo?.basic?.logo} className="global-loading-image" />
              <View className="global-loading-bar" />
            </View>
          </Animate>
        </View>
      )}
    </View>
  );
};

export default GlobalLoading;
