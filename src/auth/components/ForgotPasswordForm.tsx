import { FC, useContext } from "react";
import {
  Typography,
  Box,
  IconButton,
  Button,
  Link,
  TextField,
  useMediaQuery,
} from "@mui/material";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { CloseIcon } from "src/core";
import { AuthContext } from "../contexts";

export type ForgotPasswordFormProp = {
  email: string;
  isSignIn: boolean;
  isSendResetPasswordEmail: boolean;
  handleClose?: () => any;
  handleSubmit: (data: any) => any;
  handleChangeToPassword: () => any;
  shopName?: string;
};

export const ForgotPasswordForm: FC<ForgotPasswordFormProp> = (props) => {
  const t = useTranslations("auth.RegisterForm");
  const { register, handleSubmit, formState, watch } = useForm();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { currentMerchant } = useContext(AuthContext);

  return (
    <Box
      component="form"
      px={isDesktop ? "0px" : "16px"}
      onSubmit={handleSubmit(props.handleSubmit)}
    >
      {props.handleClose && (
        <Box display="flex" justifyContent={"flex-end"}>
          <IconButton onClick={props.handleClose}>
            <CloseIcon fill="common.black" />
          </IconButton>
        </Box>
      )}
      {isDesktop && (
        <Typography variant="h2" component="h2" textAlign="center">
          ลืมรหัสผ่าน
        </Typography>
      )}
      {!isDesktop && (
        <Typography
          component="h1"
          fontSize="24px"
          textAlign="center"
          pt="32px"
          pb="48px"
          fontWeight="light"
        >
          ลืมรหัสผ่าน
        </Typography>
      )}
      {props.isSendResetPasswordEmail ? (
        <Box textAlign="center" sx={{ mt: 2 }} className="nk-modal-text">
          <Box mt="24px">
            <Typography variant="body1" sx={{ mb: 1 }}>
              ระบบได้ส่งอีเมลเพื่อทำการรีเซ็ตรหัสผ่าน
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              สามารถตรวจสอบอีเมลได้ทาง กล่องข้อความ, สแปม หรือ ขยะ
            </Typography>
          </Box>
          <Typography
            textAlign="center"
            variant="body2"
            mt={5}
            sx={{ color: "text.secondary" }}
          >
            หากต้องการความช่วยเหลือ โปรดติดต่อเรามาที่{" "}
            {currentMerchant?.data?.email
              ? currentMerchant?.data?.email
              : currentMerchant?.data?.tel}
          </Typography>
          {(!isDesktop || props.isSignIn) && (
            <Box display="flex" justifyContent="center">
              <Link
                textAlign="center"
                fontWeight="light"
                color="common.black"
                sx={{ cursor: "pointer" }}
                pt="20px"
                onClick={props.handleChangeToPassword}
              >
                กลับเข้าสู่ระบบ
              </Link>
            </Box>
          )}
        </Box>
      ) : (
        <>
          <Typography mb="16px" fontWeight="light">
            อีเมล
          </Typography>
          <TextField
            fullWidth
            type="email"
            sx={{ borderRadius: "16px" }}
            {...register("email", { required: true })}
          />
          <Box my="32px">
            <Button
              disableElevation
              variant="contained"
              fullWidth
              sx={{
                py: "16px",
                borderRadius: "8px",
              }}
              type="submit"
            >
              รีเซ็ตรหัสผ่าน
            </Button>
          </Box>
        </>
      )}
      {!props.isSendResetPasswordEmail && (
        <Box display="flex" justifyContent="center">
          <Link
            textAlign="center"
            fontWeight="light"
            color="common.black"
            sx={{ cursor: "pointer" }}
            pt="20px"
            onClick={props.handleChangeToPassword}
          >
            กลับเข้าสู่ระบบ
          </Link>
        </Box>
      )}
    </Box>
  );
};
