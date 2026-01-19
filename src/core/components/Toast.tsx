import * as React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ToastContext } from "src";
import { useMediaQuery } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// export type ToastProp = {
//   isOpenToast: boolean,
//   message?: string,
//   type: string
// }

export const Toast = () => {
  const { 
    isOpenToast,
    messageToast,
    typeToast,
    setIsOpenToast
  } = React.useContext(ToastContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [open, setOpen] = React.useState(isOpenToast ?? false);

  React.useEffect(() => {
    setOpen(isOpenToast ?? false)
  }, [isOpenToast])

  const handleClose = (event?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setIsOpenToast(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: isDesktop ? 'top' : 'bottom', horizontal: 'center' }}
        sx={
          {
            top: isDesktop ? "100px !important" : "none",
            bottom: !isDesktop ? "85px !important" : "none",
          }
        }
      >
        <Alert severity={typeToast} sx={{ width: '100%' }}>
          {messageToast}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
 export default Toast;
