import { Image, View } from '@tarojs/components';
import { Animate, Loading } from '@nutui/nutui-react-taro';
import './GlobalLoading.scss';

interface Props {
  visible: boolean;
  message?: string;
  isInit?: boolean; // 是否是初始化状态
}

const GlobalLoading = (props: Props) => {
  const { visible, message, isInit } = props;

  if (!visible) return null;

  return (
    <View className="global-loading-container">
      {isInit ? <Loading direction="vertical">{message || '加载中'}</Loading> : <View>
        <Animate type="float" loop>
          {/*<Image src={} />*/}
        </Animate>
      </View>}
    </View>
  );
};

export default GlobalLoading;
