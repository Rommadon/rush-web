import React, { useContext } from 'react';
import Axios from "axios";
import { AlertColor } from '@mui/material'

import { ToastContext } from 'src/product';

export const useToast = () => {
  const { 
    setIsOpenToast,
    setMessageToast,
    setTypeToast
  } = useContext(ToastContext);

  const openToast = (messageToast: string, typeToast: AlertColor) => {
    setIsOpenToast(true);
    setMessageToast(messageToast);
    setTypeToast(typeToast);
  }

  return {
    openToast
  }
}
