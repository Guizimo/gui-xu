import { Image, View } from '@tarojs/components';
import './NoData.scss';
import { useUserStore } from '../../stores';

interface Props {
  text?: string;
  height?: number;
}

const NoData = (props: Props) => {
  const { text, height } = props;

  const { userinfo } = useUserStore();

  return (
    <View className="no-data-box" style={{height: `${height}px`}}>
      <Image src={userinfo?.basic?.logo} className="no-data__image" />
      <View className="no-data__text">{text || '扒拉不到数据了'}</View>
    </View>
  );
};

export default NoData;
