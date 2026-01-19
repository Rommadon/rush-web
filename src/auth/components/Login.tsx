import { useMediaQuery } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Axios from "axios";

import { DefaultLayout, DefaultLayoutProp, MobileAppBar, useAuth } from "src";
import { LoginForm } from "./LoginForm";
import { VerifyOtpForm } from "./VerifyOtpForm";
import { RequestOtpForm } from "./RequestOtpForm";
import { useResource } from "src";
import { useToast } from "src/core/hooks/useToast";
import { useRouter } from "next/router";
import { RegisterForm } from "./RegisterForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export type LoginProps = DefaultLayoutProp & {};

export const Login: FC<LoginProps> = (props) => {
  const {
    isAuth,
    isAuthModalOpen: open,
    openAuthModal: handleOpen,
    closeAuthModal: handleClose,
    setToken: handleSetToken,
    setProfile: handleSetProfile,
    setIsAuth: handleSetIsAuth,
    currentMerchant,
    baseApiUrl,
  } = useAuth();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mode, setMode] = useState("otp");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otpRef, setOtpRef] = useState("");
  const [token, setToken] = useState("");
  const [isSendResetPasswordEmail, setIsSendResetPasswordEmail] =
    useState(false);
  const countryCode = "+66";
  const router = useRouter();
  const resource = useResource();
  const toast = useToast();

  useEffect(() => {
    if (isDesktop) {
      router.push("/").then(() => {
        handleOpen();
      });
    }
  }, [isAuth, isDesktop]);

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

      setPhoneNumber(
        data["tel"].length === 10 ? data["tel"] : `0${data["tel"]}`
      );
      setOtpRef(result.data.refno);
      setToken(result.data.token);
      setMode("verifyOtp");
    } catch (error) {
      console.log(error);
      toast.openToast("ส่ง OTP ไม่สำเร็จ", "error");
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
      handleClose();
      router.push("/").then(() => {
        toast.openToast("การเข้าสู่ระบบสำเร็จ", "success");
      });
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
      handleClose();
      router.push("/").then(() => {
        toast.openToast("การสมัครสมาชิกสำเร็จ", "success");
      });
    } catch (error: any) {
      console.error(error);

      // The error is from the API response
      const errorMessage =
        error.response.data.message ||
        "ไม่สามารถสมัครสมาชิกได้ กรุณาตรวจสอบข้อมูลให้ถูกต้อง";
      toast.openToast(errorMessage, "error");
    }
  };

  const handleLoginWithOtp = async (data: any) => {
    try {
      const resultLogin = await resource.createResource("auth/loginWithOTP", {
        token: token,
        pin: data["otp"],
        countryCode: "+66",
        tel: phoneNumber,
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
      handleClose();
      router.push("/").then(() => {
        toast.openToast("การเข้าสู่ระบบสำเร็จ", "success");
      });
    } catch (error) {
      console.log(error);
      toast.openToast(
        "ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบข้อมูลให้ถูกต้อง",
        "error"
      );
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

  const getTitle = (mode: string) => {
    if (mode === "otp" || mode === "password") {
      return "เข้าสู่ระบบ";
    }
    if (mode === "register") {
      return "สมัครสมาชิก";
    }
    if (mode === "forgotPassword") {
      return "ลืมรหัสผ่าน";
    }
    return;
  };

  const changeToPasswordAndSetIsSendResetPasswordEmail = () => {
    setMode("password");
    setIsSendResetPasswordEmail(false);
  };

  return (
    <DefaultLayout
      {...props}
      onDisableLoading
      appBar={
        !isDesktop && <MobileAppBar noArrow={true} title={getTitle(mode)} />
      }
      titleMeta={getTitle(mode)}
    >
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
          handleSubmit={handleRegister}
          handleChangeToPassword={() => setMode("password")}
          shopName={currentMerchant?.data?.name}
        />
      )}
      {mode === "forgotPassword" && (
        <ForgotPasswordForm
          email={email}
          isSignIn={false}
          isSendResetPasswordEmail={isSendResetPasswordEmail}
          handleSubmit={handleSendResetPasswordEmail}
          handleChangeToPassword={
            changeToPasswordAndSetIsSendResetPasswordEmail
          }
          shopName={currentMerchant?.data?.name}
        />
      )}
    </DefaultLayout>
  );
};
