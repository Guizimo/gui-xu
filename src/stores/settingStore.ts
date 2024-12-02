import { create } from 'zustand';

const useSettingStore = create((set) => ({
  user: null, // 用户信息
  login: (userInfo) => set({ user: userInfo }),
  logout: () => set({ user: null }),
}));

export default useSettingStore;
