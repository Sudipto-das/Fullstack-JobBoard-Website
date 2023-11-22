import { atom } from 'recoil';

interface UserData {
    isAdmin: boolean;
    charAt(arg0: number): import("react").ReactNode;
    isUser: boolean;
    username:string
}

export const userState = atom<UserData | null>({
  key: 'userState',
  default: null,
});
