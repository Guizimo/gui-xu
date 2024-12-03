import { useSettingStore } from '../stores';
import { vibrateShort } from '@tarojs/taro';

const useVibrationConfig = () => {
  const {isVibrationFeedback} = useSettingStore()

  const runVibrateShort = () => {
    if (isVibrationFeedback) {
      vibrateShort({
        type: 'heavy',
        complete: (res) => {
          console.log(res)
        }
      })
    }
  }

  return { runVibrateShort };
}

export default useVibrationConfig;
