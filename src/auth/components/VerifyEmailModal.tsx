import { FC } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

import { useAuth } from "src";
import { useToast } from "src/core/hooks/useToast";
import Axios from "axios";

import Image from "next/image";
import EmailIcon from "public/google/mail.svg";

export type VerifyEmailModalProp = {
  open: boolean;
  // handleOpen: () => any
  // handleClose: () => any
};

export const VerifyEmailModal: FC<VerifyEmailModalProp> = (props) => {
  const { token, profile, baseApiUrl, currentMerchant } = useAuth();
  const toast = useToast();

  const resendEmailVerify = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      CurrentMerchantSlug: `${currentMerchant?.data?.slug || "-"}`,
    };

    const result = await Axios.post(
      `${baseApiUrl}/p/user/resend-verify-email`,
      {},
      {
        headers: headers,
      }
    ).catch((error) => {
      console.log("error", error.response.data.message);
      const errorMessage =
        error.response.data.message ||
        "ส่งอีเมลไม่สำเร็จ กรุณาติดต่อเจ้าหน้าที่";
      toast.openToast(errorMessage, "error");
    });

    toast.openToast("ส่งอีเมลสำเร็จ", "success");
  };

  return (
    <Modal open={props.open}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "720px",
          transform: "translate(-50%, -50%)",
          bgcolor: "common.white",
          boxShadow: 24,
          borderRadius: "8px",
          p: "36px 32px 64px 32px",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              border="3px #f6c630 solid"
              borderRadius="50%"
              sx={{
                width: 100,
                height: 100,
                padding: "20px",
                margin: "auto",
              }}
            >
              <Image
                src={EmailIcon} // Replace with the correct path to your image
                alt="Email Image"
                width="400px" // Make the image take up the entire Box
                height="400px" // Make the image take up the entire Box
              />
            </Box>
            <Typography variant="h2" fontWeight="bold" mt={2}>
              กรุณายืนยันอีเมลของคุณ
            </Typography>
          </Box>
          <Box textAlign="center" sx={{ mt: 2 }} className="nk-modal-text">
            <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "light" }}>
                อีเมลของคุณ
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {profile?.email}
              </Typography>
            </Box>
            <Box mt="24px">
              <Typography variant="body1" sx={{ mb: 1 }}>
                อีเมลของคุณยังไม่ได้รับการยืนยัน
                กรุณายืนยันอีเมลของคุณก่อนใช้งาน
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                สามารถตรวจสอบอีเมลได้ทาง กล่องข้อความ, สแปม หรือ ขยะ
              </Typography>
            </Box>
            <Typography textAlign="center" variant="body1" sx={{ my: 3 }}>
              หรือ
            </Typography>
            <Box>
              <Typography textAlign="center" variant="body1" sx={{ mb: 1 }}>
                สามารถกดปุ่มด้านล่างเพื่อรับอีเมลใหม่อีกครั้ง
              </Typography>
              <Box textAlign="center">
                <Button
                  disableElevation
                  variant="contained"
                  onClick={() => resendEmailVerify()}
                  sx={{ py: "8px", mt: 2 }}
                >
                  ส่งอีเมลอีกครั้ง
                </Button>
              </Box>
            </Box>
            <Typography
              textAlign="center"
              variant="body2"
              mt={5}
              sx={{ color: "text.secondary" }}
            >
              หากต้องการความช่วยเหลือ โปรดติดต่อเรามาที่ support@shopdit.com
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default VerifyEmailModal;
