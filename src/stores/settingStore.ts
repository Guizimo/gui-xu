import { create } from 'zustand';

interface storeState {
  isVibrationFeedback: boolean;
  setVibrationFeedback: (isVibrationFeedback: boolean) => void;
}

const useSettingStore = create<storeState>((set) => ({
  isVibrationFeedback: true, // 是否开启震动反馈
  setVibrationFeedback: (isVibrationFeedback: boolean) => set({ isVibrationFeedback: isVibrationFeedback }),
}));

export default useSettingStore;
