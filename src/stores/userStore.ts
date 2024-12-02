import { create } from 'zustand';

interface UserInfoData {
  activeTheme: string;
  basic: any;
  themeTop: any;
}

interface UserState {
  userinfo: UserInfoData | null;
  setUserinfo: (userInfo: UserInfoData) => void;
}

const useUserStore = create<UserState>((set) => ({
  userinfo: null, // 用户信息
  setUserinfo: (userInfo: UserInfoData) => set({ userinfo: userInfo })
}));

export default useUserStore;
