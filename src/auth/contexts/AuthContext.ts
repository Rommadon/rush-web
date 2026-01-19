import { createContext } from "react";

export type AuthContextDefaultValueType = {
  isAuth: boolean,
  isAuthModalOpen: boolean,
  currentMerchant: any | null,
  baseApiUrl?: string,
  profile?: any,
  token?: any,
  acceptCookies?: any,
  openAuthModal: () => void,
  closeAuthModal: () => void,
  setCurrentMerchant: (value: any) => void,
  setToken: (value: any) => void,
  setProfile: (value: any) => void,
  setIsAuth: (value: boolean) => void,
  setAcceptCookies: (value: any) => void,
}

export const authContextDefaultValue: AuthContextDefaultValueType = {
  isAuth: false,
  isAuthModalOpen: false,
  currentMerchant: null,
  baseApiUrl: '',
  profile: null,
  token: null,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  setCurrentMerchant: (value: any) => {},
  setToken: (value: any) => {},
  setProfile: (value: any) => {},
  setIsAuth: (value: boolean) => {},
  setAcceptCookies: (value: any) => {},
}

export const AuthContext = createContext(authContextDefaultValue);

export default AuthContext;