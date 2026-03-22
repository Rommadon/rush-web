import { FC, useContext, useEffect, useState } from "react";
import {
  Typography,
  Box,
  IconButton,
  Button,
  FormControl,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";

import { useForm } from "react-hook-form";

import visibilityIcon from "public/visibility.svg";
import visibilityOffIcon from "public/visibility-off.svg";
import checkCircle from "public/check-circle.svg";
import cancel from "public/cancel.svg";
import router from "next/router";
import { useToast } from "src/core/hooks/useToast";
import { AuthContext } from "src";
import Axios from "axios";

export const ResetPassword: FC<any> = (props) => {
  const toast = useToast();

  const { register, handleSubmit, formState, watch } = useForm();
  const { currentMerchant, baseApiUrl } = useContext(AuthContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const watchPassword = watch("password");

  useEffect(() => {
    if (!router?.query?.token) {
      router.push("/404", undefined, { locale: router.locale });
    }
  }, []);

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

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*-_])[A-Za-z\d!@#$%^&*-_]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = async (data: any) => {
    if (!validatePassword(data["password"])) {
      toast.openToast("รหัสผ่านไม่สามารถใช้ได้", "error");
      return;
    }

    if (data["password"] !== data["confirmPassword"]) {
      toast.openToast("รหัสผ่านไม่ตรงกัน", "error");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${router?.query?.token}`,
      CurrentMerchantSlug: `${currentMerchant?.data?.slug || "-"}`,
    };

    const result = await Axios.put(
      `${baseApiUrl}/p/user/set-new-password`,
      {
        password: data["password"],
      },
      {
        headers: headers,
      }
    ).catch((error) => {
      console.error(error);
      // The error is from the API response
      const errorMessage =
        error.response.data.message ||
        "เปลี่ยนรหัสผ่านไม่สำเร็จ กรุณาตรวจสอบข้อมูลให้ถูกต้อง";
      toast.openToast(errorMessage, "error");
    });

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 second
    toast.openToast("เปลี่ยนรหัสผ่านสำเร็จ", "success");
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay for 1 second

    for (let i = 5; i > 0; i--) {
      toast.openToast(`ระบบจะนำทางกลับสู่หน้าหลักใน ${i} วินาที`, "info");

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 second
    }

    toast.openToast("นำทางกลับสู่หน้าหลัก", "success");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 second
    router.push("/");
  };

  return (
    <>
      {isDesktop ? (
        <Box
          component="form"
          onSubmit={handleSubmit(handleResetPassword)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            background: "#f2f3f4",
          }}
        >
          <Box
            sx={{
              padding: "20px",
              background: "#ffffff",
            }}
          >
            <Box
              sx={{
                width: 600,
                margin: "auto",
                padding: 2,
                background: "#ffffff",
                textAlign: "left",
              }}
            >
              <Typography variant="h2" component="h2" textAlign="center">
                รีเซ็ตรหัสผ่าน
              </Typography>

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
              <Box display={"flex"} marginTop="5px">
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
                  รหัสผ่านต้องมีตัวอักษรพิเศษเหล่านี้ !, @, #, $, %, ^, &, *, -,
                  _
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
                    src={
                      confirmPasswordShown ? visibilityIcon : visibilityOffIcon
                    }
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
                  รีเซ็ตรหัสผ่าน
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          component="form"
          px={"16px"}
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <Box width="100%" mt="-50px">
            <Typography
              component="h1"
              fontSize="24px"
              textAlign="center"
              pt="32px"
              pb="48px"
              fontWeight="light"
            >
              รีเซ็ตรหัสผ่าน
            </Typography>
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
                  src={
                    confirmPasswordShown ? visibilityIcon : visibilityOffIcon
                  }
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
                รีเซ็ตรหัสผ่าน
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
