import { FC, useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import Axios from "axios";
import router from "next/router";
import Image from "next/image";
import { VerifyOtpForm } from "./VerifyOtpForm";
import { RequestOtpForm } from "./RequestOtpForm";
import { LoginForm } from "./LoginForm";
import { AuthModalMode } from "..";
import { useAuth, useResource } from "src";
import { useToast } from "src/core/hooks/useToast";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { RegisterForm } from "./RegisterForm";
export type SignInMode =
  | "otp"
  | "password"
  | "verifyOtp"
  | "register"
  | "forgotPassword";
export type SignInProps = {
  // open: boolean;
  mode?: AuthModalMode;
  // handleOpen: () => any
  // handleClose: () => any
};
export const SignIn: FC<SignInProps> = (props) => {
  const {
    setToken: handleSetToken,
    setProfile: handleSetProfile,
    setIsAuth: handleSetIsAuth,
    currentMerchant,
    baseApiUrl,
  } = useAuth();
  const resource = useResource();
  const toast = useToast();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mode, setMode] = useState<AuthModalMode>(props.mode ?? "otp");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otpRef, setOtpRef] = useState("");
  const [token, setToken] = useState("");
  const [isSendResetPasswordEmail, setIsSendResetPasswordEmail] =
    useState(false);
  const countryCode = "+66";

  useEffect(() => {
    if (!currentMerchant?.data?.isEnableOtpLogin) {
      setMode("password");
    }
  }, []);

  const handleSendOtp = async (data: any) => {
    try {
      const tel = data["tel"].length === 10 ? data["tel"] : `0${data["tel"]}`;
      const result = await resource.createResource("auth/requestOTP", {
        tel: tel,
      });
      setPhoneNumber(data["tel"]);
      setOtpRef(result.data.refno);
      setToken(result.data.token);
      setMode("verifyOtp");
    } catch (error: any) {
      console.log(error);
      toast.openToast("ไม่พบผู้ใช้งานในระบบ", "error");
    }
  };
  const handleLogin = async (data: any) => {
    try {
      const resultLogin = await resource.createResource(
        "p/auth/login-with-email",
        {
          email: data["email"],
          password: data["password"],
        }
      );
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resultLogin?.data?.accessToken}`,
        CurrentMerchantSlug: `${currentMerchant?.data?.slug || "-"}`,
      };
      const path = "customer-public";
      const resultProfile = await Axios.get(`${baseApiUrl}/${path}`, {
        headers: headers,
        params: {},
      });
      Cookies.set("token", resultLogin?.data?.accessToken, { expires: 30 });
      handleSetToken(resultLogin?.data?.accessToken);
      handleSetProfile(resultProfile?.data?.data);
      handleSetIsAuth(true);
      router.push("/");
      toast.openToast("การเข้าสู่ระบบสำเร็จ", "success");
    } catch (error) {
      console.log(error);
      toast.openToast(
        "ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบข้อมูลให้ถูกต้อง",
        "error"
      );
    }
  };
  const handleLoginWithOtp = async (data: any) => {
    try {
      const resultLogin = await resource.createResource("auth/loginWithOTP", {
        token: token,
        pin: data["otp"],
        countryCode: "+66",
        tel: phoneNumber.length === 10 ? phoneNumber : `0${phoneNumber}`,
      });
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resultLogin?.data?.access_token}`,
        CurrentMerchantSlug: `${currentMerchant?.data?.slug || "-"}`,
      };
      const path = "customer-public";
      const resultProfile = await Axios.get(`${baseApiUrl}/${path}`, {
        headers: headers,
        params: {},
      });
      Cookies.set("token", resultLogin?.data?.access_token, { expires: 30 });
      handleSetToken(resultLogin?.data?.access_token);
      handleSetProfile(resultProfile?.data?.data);
      handleSetIsAuth(true);
      router.push("/");
      toast.openToast("การเข้าสู่ระบบสำเร็จ", "success");
    } catch (error) {
      console.log(error);
      toast.openToast(
        "ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบข้อมูลให้ถูกต้อง",
        "error"
      );
    }
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*-_])[A-Za-z\d!@#$%^&*-_]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (data: any) => {
    try {
      if (!validatePassword(data["password"])) {
        toast.openToast("รหัสผ่านไม่สามารถใช้ได้", "error");
        return;
      }

      if (data["password"] !== data["confirmPassword"]) {
        toast.openToast("รหัสผ่านไม่ตรงกัน", "error");
        return;
      }

      const resultLogin = await resource.createResource(
        "p/auth/register-with-email",
        {
          email: data["email"],
          password: data["password"],
        }
      );

      setMode("password");
      toast.openToast("การสมัครสมาชิกสำเร็จ", "success");
    } catch (error: any) {
      console.error(error);

      // The error is from the API response
      const errorMessage =
        error.response.data.message ||
        "ไม่สามารถสมัครสมาชิกได้ กรุณาตรวจสอบข้อมูลให้ถูกต้อง";
      toast.openToast(errorMessage, "error");
    }
  };

  const handleSendResetPasswordEmail = async (data: any) => {
    try {
      const resultLogin = await resource.createResource(
        "p/user/send-reset-password-email",
        {
          email: data["email"],
        }
      );
      toast.openToast("ส่งอีเมลสำเร็จ", "success");
      setIsSendResetPasswordEmail(true);
    } catch (error: any) {
      console.error(error);

      // The error is from the API response
      const errorMessage =
        error.response.data.message || "กรุณาตรวจสอบอีเมลอีกครั้ง";
      toast.openToast(errorMessage, "error");
    }
  };

  const changeToPasswordAndSetIsSendResetPasswordEmail = () => {
    setMode("password");
    setIsSendResetPasswordEmail(false);
  };

  return (
    <>
      {isDesktop ? (
        <Box
          display="flex"
          flexDirection="column"
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
          {currentMerchant?.data?.merchantIcon?.imageUpload?.url && (
            <Box textAlign="center" mb="24px">
              <Image
                src={currentMerchant?.data?.merchantIcon?.imageUpload?.url}
                alt="merchant icon"
                width="80px"
                height="80px"
              />
            </Box>
          )}
          {mode === "verifyOtp" && (
            <VerifyOtpForm
              otpRef={otpRef}
              phoneNumber={phoneNumber}
              handleBack={() => setMode("otp")}
              handleSubmit={handleLoginWithOtp}
              timeLimit={300}
            />
          )}
          {mode === "otp" && (
            <RequestOtpForm
              countryCode={countryCode}
              handleSubmit={handleSendOtp}
              handleChangeToPassword={() => setMode("password")}
            />
          )}
          {mode === "password" && (
            <LoginForm
              email={email}
              countryCode={countryCode}
              isEnableOtpLogin={currentMerchant?.data?.isEnableOtpLogin}
              handleSubmit={handleLogin}
              handleChangeToOtp={() => setMode("otp")}
              handleChangeToRegister={() => setMode("register")}
              handleChangeToForgotPassword={() => setMode("forgotPassword")}
            />
          )}
          {mode === "register" && (
            <RegisterForm
              email={email}
              countryCode={countryCode}
              handleClose={changeToPasswordAndSetIsSendResetPasswordEmail}
              handleSubmit={handleRegister}
              handleChangeToPassword={() => setMode("password")}
            />
          )}
          {mode === "forgotPassword" && (
            <ForgotPasswordForm
              email={email}
              isSignIn={true}
              isSendResetPasswordEmail={isSendResetPasswordEmail}
              handleSubmit={handleSendResetPasswordEmail}
              handleChangeToPassword={
                changeToPasswordAndSetIsSendResetPasswordEmail
              }
              shopName={currentMerchant?.data?.name}
            />
          )}
        </Box>
      ) : (
        <>
          {currentMerchant?.data?.merchantIcon?.imageUpload?.url && (
            <Box textAlign="center" mt="50px">
              <Image
                src={currentMerchant?.data?.merchantIcon?.imageUpload?.url}
                alt="merchant icon"
                width="80px"
                height="80px"
              />
            </Box>
          )}
          {mode === "verifyOtp" && (
            <VerifyOtpForm
              otpRef={otpRef}
              phoneNumber={phoneNumber}
              handleSubmit={handleLoginWithOtp}
              timeLimit={300}
            />
          )}
          {mode === "otp" && (
            <RequestOtpForm
              countryCode={countryCode}
              handleSubmit={handleSendOtp}
              handleChangeToPassword={() => setMode("password")}
              shopName={currentMerchant?.data?.name}
            />
          )}
          {mode === "password" && (
            <LoginForm
              email={email}
              countryCode={countryCode}
              isEnableOtpLogin={currentMerchant?.data?.isEnableOtpLogin}
              handleSubmit={handleLogin}
              handleChangeToOtp={() => setMode("otp")}
              handleChangeToRegister={() => setMode("register")}
              handleChangeToForgotPassword={() => setMode("forgotPassword")}
              shopName={currentMerchant?.data?.name}
            />
          )}
          {mode === "register" && (
            <RegisterForm
              email={email}
              countryCode={countryCode}
              handleClose={changeToPasswordAndSetIsSendResetPasswordEmail}
              handleSubmit={handleRegister}
              handleChangeToPassword={() => setMode("password")}
              shopName={currentMerchant?.data?.name}
            />
          )}
          {mode === "forgotPassword" && (
            <ForgotPasswordForm
              email={email}
              isSignIn={true}
              isSendResetPasswordEmail={isSendResetPasswordEmail}
              handleSubmit={handleSendResetPasswordEmail}
              handleChangeToPassword={
                changeToPasswordAndSetIsSendResetPasswordEmail
              }
              shopName={currentMerchant?.data?.name}
            />
          )}
        </>
      )}
    </>
  );
};
export default SignIn;
