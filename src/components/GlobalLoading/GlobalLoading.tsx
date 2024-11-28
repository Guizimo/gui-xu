import { View } from '@tarojs/components';
import { Loading } from '@nutui/nutui-react-taro';
import './GlobalLoading.scss';

interface Props {
  visible: boolean;
  message?: string;
}

const GlobalLoading = (props: Props) => {
  const { visible, message } = props;

  if (!visible) return null;

  return (
    <View className="global-loading-container">
      <Loading direction="vertical">{message || '加载中'}</Loading>
    </View>
  );
};

export default GlobalLoading;
