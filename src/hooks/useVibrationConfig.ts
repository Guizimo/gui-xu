import { useSettingStore } from '../stores';
import { vibrateShort } from '@tarojs/taro';

const useVibrationConfig = () => {
  const { isVibrationFeedback } = useSettingStore();

  // 短震动
  const runVibrateShort = () => {
    if (isVibrationFeedback) {
      try {
        // 轻度震动
        vibrateShort({
          type: 'light'
        });
      } catch (e) {}
    }
  };

  return { runVibrateShort };
};

export default useVibrationConfig;
