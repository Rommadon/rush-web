import { createContext } from "react";

export type ToastContextDefaultValueType = {
  isOpenToast?: any,
  setIsOpenToast: (value: any) => void,
  messageToast?: any,
  setMessageToast: (value: any) => void,
  typeToast?: any,
  setTypeToast: (value: any) => void
}

export const toastContextDefaultValue: ToastContextDefaultValueType = {
  isOpenToast: false,
  setIsOpenToast: (value: any) => {},
  messageToast: '',
  setMessageToast: (value: any) => {},
  typeToast: 'success',
  setTypeToast: (value: any) => {}
}

export const ToastContext = createContext(toastContextDefaultValue);

export default ToastContext;
