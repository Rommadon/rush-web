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
} from "@mui/material";
import Image from "next/image";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { CloseIcon } from "src/core";
import visibilityIcon from "public/visibility.svg";
import visibilityOffIcon from "public/visibility-off.svg";
import checkCircle from "public/check-circle.svg";
import cancel from "public/cancel.svg";

export type RegisterFormProp = {
  email: string;
  handleClose?: () => any;
  countryCode: string;
  handleSubmit: (data: any) => any;
  handleChangeToPassword: () => any;
  shopName?: string;
};

export const RegisterForm: FC<RegisterFormProp> = (props) => {
  const t = useTranslations("auth.RegisterForm");
  const { register, handleSubmit, formState, watch } = useForm();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const watchPassword = watch("password");

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };

  const checkUpperLowerNumber = () => {
    return (
      /[A-Z]+/.test(watchPassword) &&
      /[a-z]+/.test(watchPassword) &&
      /\d/.test(watchPassword)
    );
  };

  const checkSpecialCharacter = () => {
    return /[!@#$%^&*(),.?":{}|<>_-]/g.test(watchPassword);
  };

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
          สมัครสมาชิก
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
          สมัครสมาชิก
        </Typography>
      )}
      <Typography mb="16px" fontWeight="light">
        อีเมล
      </Typography>
      <TextField
        fullWidth
        type="email"
        sx={{ borderRadius: "16px" }}
        {...register("email", { required: true })}
      />

      <Typography my="16px" fontWeight="light">
        รหัสผ่าน
      </Typography>
      <FormControl fullWidth sx={{ borderRadius: "16px" }}>
        <IconButton
          sx={{
            position: "absolute",
            top: "8px",
            right: "6px",
            zIndex: 100,
          }}
          onClick={togglePasswordVisibility}
        >
          <Image  
            src={passwordShown ? visibilityIcon : visibilityOffIcon}
            alt="visibility icon"
            width="24px"
            height="24px"
  unoptimized={true}
/>
        </IconButton>
        <TextField
          fullWidth
          type={passwordShown ? "text" : "password"}
          sx={{ borderRadius: "16px" }}
          {...register("password", { required: true })}
        />
      </FormControl>
      <Box display={"flex"}>
        <Box>
          <Image  
            src={watchPassword?.length >= 8 ? checkCircle : cancel}
            alt="check icon"
            color="#1ee0ac"
            width="12px"
            height="12px"
            unoptimized={true}
          />
        </Box>
        <Typography
          variant="body2" // or "caption" depending on your preference
          sx={{
            fontSize: "0.745rem !important",
            lineHeight: 0.5,
            py: "4px",
            paddingTop: "8px",
            color: "#8094AE",
            marginLeft: "4px",
          }} // Adjust these values as needed
        >
          รหัสผ่านขั้นต่ำ 8 ตัวอักษร
        </Typography>
      </Box>
      <Box display={"flex"}>
        <Box>
          <Image  
            src={checkUpperLowerNumber() ? checkCircle : cancel}
            alt="check icon"
            color="#1ee0ac"
            width="12px"
            height="12px"
  unoptimized={true}
/>
        </Box>
        <Typography
          variant="body2" // or "caption" depending on your preference
          sx={{
            fontSize: "0.745rem !important",
            lineHeight: 0.5,
            py: "4px",
            paddingTop: "8px",
            color: "#8094AE",
            marginLeft: "4px",
          }} // Adjust these values as needed
        >
          รหัสผ่านต้องมีทั้งตัวอักษรเล็ก ตัวอักษรใหญ่ และ ตัวเลข
        </Typography>
      </Box>
      <Box display={"flex"}>
        <Box>
          <Image  
            src={checkSpecialCharacter() ? checkCircle : cancel}
            alt="check icon"
            color="#1ee0ac"
            width="12px"
            height="12px"
  unoptimized={true}
/>
        </Box>
        <Typography
          variant="body2" // or "caption" depending on your preference
          sx={{
            fontSize: "0.745rem !important",
            lineHeight: 0.5,
            py: "4px",
            paddingTop: "8px",
            color: "#8094AE",
            marginLeft: "4px",
          }} // Adjust these values as needed
        >
          รหัสผ่านต้องมีตัวอักษรพิเศษเหล่านี้ !, @, #, $, %, ^, &, *, -, _
        </Typography>
      </Box>

      <Typography my="16px" fontWeight="light">
        ยืนยันรหัสผ่าน
      </Typography>
      <FormControl fullWidth sx={{ borderRadius: "16px" }}>
        <IconButton
          sx={{
            position: "absolute",
            top: "8px",
            right: "6px",
            zIndex: 100,
          }}
          onClick={toggleConfirmPasswordVisibility}
        >
          <Image  
            src={confirmPasswordShown ? visibilityIcon : visibilityOffIcon}
            alt="visibility icon"
            width="24px"
            height="24px"
  unoptimized={true}
/>
        </IconButton>
        <TextField
          fullWidth
          type={confirmPasswordShown ? "text" : "password"}
          sx={{ borderRadius: "16px" }}
          {...register("confirmPassword", { required: true })}
        />
      </FormControl>
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
          สมัคร
        </Button>
      </Box>
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
    </Box>
  );
};
