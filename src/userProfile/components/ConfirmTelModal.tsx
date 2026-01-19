import { FC, useState } from "react";
import { Modal, Box, Typography, IconButton, Button, TextField, CircularProgress } from "@mui/material";
import { CloseIcon, useResource } from "src/core";
import { useToast } from "src/core/hooks/useToast";


export type ConfirmTelModalProps = {
  open: boolean;
  onClose: () => any;
  onSubmit: (data: any) => any;
  otpRef: string;
  token: string;
  tel: string;
};

export const ConfirmTelModal: FC<ConfirmTelModalProps> = (props) => {
  const resource = useResource();
  const toast = useToast();

  const [pin, setPin] = useState('');
  const [onLoading, setonLoading] = useState(false);

  const handleSubmit = async () => {
    setonLoading(true);

    try {
      await resource.createResource('auth/verifyOTP', {
        token: props.token,
        pin: pin
      });
      await props.onSubmit({});
      setonLoading(false);
    } catch (error) {
      toast.openToast('รหัส OTP ไม่ถูกต้อง', 'error');
      setonLoading(false);
    }
  }

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          borderRadius: "8px",
          minWidth: "720px",
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography
          id="modal-modal-title"
          variant="h2"
          textAlign="center"
          pt="10px"
          pb="32px"
        >
          ยืนยันหมายเลขโทรศัพท์
        </Typography>
        <Box>
          <Typography variant="h4" pb="16px">รหัส OTP หมายเลขอ้างอิง {props.otpRef}</Typography>
          <TextField fullWidth value={pin} onChange={(e) => setPin(e.target.value)} />
        </Box>
        <Box display="flex" justifyContent="center" my="32px">
          <Button variant="contained"
                  disableElevation
                  onClick={handleSubmit}
                  disabled={onLoading}
                  sx={{ width: '352px', py: '16px', borderRadius: '8px' }}>
                    {
                      onLoading ? (
                        <CircularProgress color="info" />
                      ) : (
                        <Typography variant="h4">
                          ยืนยัน
                        </Typography>
                      )
                    }
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
