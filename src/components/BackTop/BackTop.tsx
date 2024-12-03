import './BackTop.scss';
import { useState } from 'react';
import { pageScrollTo, usePageScroll } from '@tarojs/taro';
import useVibrationConfig from '../../hooks/useVibrationConfig';

interface Props {
  maxScrollTop?: number;
}

const BackTop = (props: Props) => {
  const { maxScrollTop = 400 } = props;
  const { runVibrateShort } = useVibrationConfig();

  const [show, setShow] = useState(false);

  // 监听页面滚动
  usePageScroll((res) => {
    // 根据滚动位置判断是否显示
    setShow(res.scrollTop > maxScrollTop);
  });

  const scrollToTop = () => {
    runVibrateShort();
    pageScrollTo({
      scrollTop: 0,
      duration: 300 // 动画时长
    });
  };

  if (!show) return null;

  return (
    <view className="back-top-container" onClick={scrollToTop}>
      回到顶部
    </view>
  );
};

export default BackTop;
