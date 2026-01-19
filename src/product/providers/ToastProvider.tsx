import { FC, useState } from "react";

import { toastContextDefaultValue, ToastContext } from "../contexts";

export type ToastProviderProp = Partial<typeof toastContextDefaultValue>;

export const ToastProvider: FC<ToastProviderProp> = (props) => {
  const [isOpenToast, setIsOpenToast] = useState(props.isOpenToast);
  const [messageToast, setMessageToast] = useState(props.messageToast);
  const [typeToast, setTypeToast] = useState(props.typeToast);

  return (
    <ToastContext.Provider
      value={{
        isOpenToast,
        messageToast,
        typeToast,
        setIsOpenToast: (value: any) => setIsOpenToast(value),
        setMessageToast: (value: any) => setMessageToast(value),
        setTypeToast: (value: any) => setTypeToast(value),
      }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};
