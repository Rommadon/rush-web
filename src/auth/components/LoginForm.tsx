import { FC, useState } from "react";
import {
  Typography,
  Box,
  IconButton,
  Button,
  Link,
  FormControl,
  TextField,
  useMediaQuery,
  Checkbox,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import NextLink from "next/link";

import { CloseIcon } from "src/core";

import { SocialLogin } from "./SocialLogin";

export type LoginFormProp = {
  email: string;
  handleClose?: () => any;
  countryCode: string;
  isEnableOtpLogin: boolean;
  handleSubmit: (data: any) => any;
  handleChangeToOtp: () => any;
  handleChangeToRegister: () => any;
  handleChangeToForgotPassword: () => any;
  shopName?: string;
};

export const LoginForm: FC<LoginFormProp> = (props) => {
  const t = useTranslations("auth.loginForm");
  const { register, handleSubmit, formState } = useForm({ mode: "onChange" });
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [onCheckPolicy, setOnCheckPolicy] = useState(true);

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
          {t("title")}
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
          ยินดีต้อนรับสู่ {props.shopName}
        </Typography>
      )}
      <Typography mb="16px" fontWeight="light">
        อีเมล
      </Typography>
      <TextField
        fullWidth
        type="text"
        sx={{ borderRadius: "16px" }}
        {...register("email", { required: true })}
      />

      <Typography my="16px" fontWeight="light">
        {t("password")}
      </Typography>
      <FormControl fullWidth sx={{ borderRadius: "16px" }}>
        <TextField
          fullWidth
          type="password"
          sx={{ borderRadius: "16px" }}
          {...register("password", { required: true })}
        />
      </FormControl>
      {isDesktop ? (
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" py="8px" alignItems="center">
            <Checkbox
              checked={onCheckPolicy}
              size="small"
              onChange={(event) => setOnCheckPolicy(event.target.checked)}
            />
            <Typography variant="h6" lineHeight="20px">
              คุณยอมรับนโยบายความเป็นส่วนตัวของเรา (
              <Typography
                component="span"
                variant="h6"
                lineHeight="20px"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                <NextLink href="/terms-and-policies#privacy-policy">
                  เรียนรู้เพิ่มเติม
                </NextLink>
              </Typography>
              ) และเงื่อนไขการให้บริการ (
              <Typography
                component="span"
                variant="h6"
                lineHeight="20px"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                <NextLink href="/terms-and-policies#terms-service-policy">
                  เรียนรู้เพิ่มเติม
                </NextLink>
              </Typography>
              )
            </Typography>
          </Box>
          <Link
            textAlign="left"
            fontWeight="light"
            color="common.black"
            sx={{ cursor: "pointer" }}
            pt="20px"
            onClick={props.handleChangeToForgotPassword}
          >
            ลืมรหัสผ่าน?
          </Link>
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="end">
            <Link
              textAlign="left"
              fontWeight="light"
              color="common.black"
              sx={{ cursor: "pointer" }}
              pt="20px"
              onClick={props.handleChangeToForgotPassword}
            >
              ลืมรหัสผ่าน?
            </Link>
          </Box>
          <Box display="flex" py="8px" alignItems="center">
            <Checkbox
              checked={onCheckPolicy}
              size="small"
              onChange={(event) => setOnCheckPolicy(event.target.checked)}
            />
            <Typography variant="h6" lineHeight="20px">
              คุณยอมรับนโยบายความเป็นส่วนตัวของเรา (
              <Typography
                component="span"
                variant="h6"
                lineHeight="20px"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                <NextLink href="/terms-and-policies#privacy-policy">
                  เรียนรู้เพิ่มเติม
                </NextLink>
              </Typography>
              ) และเงื่อนไขการให้บริการ (
              <Typography
                component="span"
                variant="h6"
                lineHeight="20px"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                <NextLink href="/terms-and-policies#terms-service-policy">
                  เรียนรู้เพิ่มเติม
                </NextLink>
              </Typography>
              )
            </Typography>
          </Box>
        </>
      )}
      <Box my="16px">
        <Button
          disableElevation
          variant="contained"
          fullWidth
          sx={{
            py: "16px",
            borderRadius: "8px",
          }}
          type="submit"
          disabled={!formState.isValid || !onCheckPolicy}
        >
          {t("login")}
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent={props.isEnableOtpLogin ? "space-between" : "end"}
      >
        {props.isEnableOtpLogin && (
          <Link
            textAlign="left"
            fontWeight="light"
            color="common.black"
            sx={{ cursor: "pointer" }}
            pt="20px"
            onClick={props.handleChangeToOtp}
          >
            เข้าสู่ระบบด้วย OTP
          </Link>
        )}
        <Link
          textAlign="right"
          fontWeight="light"
          color="common.black"
          sx={{ cursor: "pointer" }}
          pt="20px"
          onClick={props.handleChangeToRegister}
        >
          สมัครสมาชิก
        </Link>
      </Box>
      <SocialLogin />
    </Box>
  );
};
