import { FC, useContext, useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import router from "next/router";
import Image from "next/image";
import Axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../contexts";
import { useTranslations } from "next-intl";

import VerifyIcon from "public/verify.svg";
import VerifySuccessIcon from "public/verify-success.svg";
import { useAuth } from "../hooks";
import { useToast } from "src/core/hooks/useToast";

export const VerifyCustomer: FC<any> = (props) => {
  const t = useTranslations("verify_page");
  const { currentMerchant } = useContext(AuthContext);
  const [title, setTitle] = useState(t("verify_customer"));
  const [verifyStatus, setVerifyStatus] = useState(false);
  const [verifyContent, setVerifyContent] = useState(t("system_verifying"));
  const {
    setToken: handleSetToken,
    setProfile: handleSetProfile,
    setIsAuth: handleSetIsAuth,
    baseApiUrl,
  } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (!router?.query?.token) {
      router.push("/404", undefined, { locale: router.locale });
    } else {
      onVerifyUserEmail(router?.query?.token as string);
    }
  }, []);

  const onVerifyUserEmail = async (token: string) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      CurrentMerchantSlug: `${currentMerchant?.data?.slug || "-"}`,
    };

    const result = await Axios.put(
      `${baseApiUrl}/p/user/verify-email`,
      {},
      {
        headers: headers,
      }
    ).catch((error) => {
      console.log("error", error);
      setTitle(t("verify_failed"));
      setVerifyContent(t("contact_support"));
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (result?.data?.status === "active") {
      const path = "customer-public";
      const resultProfile = await Axios.get(`${baseApiUrl}/${path}`, {
        headers: headers,
        params: {},
      });
      setTitle(t("verify_success"));
      setVerifyStatus(true);

      for (let i = 5; i > 0; i--) {
        setVerifyContent(`${t("will_redirect_homepage")} ${i} ${t("seconds")}`);

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 second
      }
      setVerifyContent(t("redirect_homepage"));
      Cookies.set("token", token, { expires: 30 });
      handleSetToken(token);
      handleSetProfile(resultProfile?.data?.data);
      handleSetIsAuth(true);
      router.push("/").then(() => {
        toast.openToast("การเข้าสู่ระบบสำเร็จ", "success");
      });
    } else {
      setTitle(t("verify_failed"));
      setVerifyContent(t("contact_support"));
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setVerifyContent(t("redirect_homepage"));
      router.push("/");
    }
  };

  return (
    <Box
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
        component="form"
        sx={{
          padding: "100px",
          background: "#ffffff",
        }}
      >
        <Box
          sx={{
            maxWidth: 400,
            width: 400,
            margin: "auto",
            padding: 2,
            background: "#ffffff",
            textAlign: "center",
          }}
        >
          <Typography variant="h1" component="div" mt={3}>
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 200,
            height: 200,
            padding: "20px",
            margin: "auto",
            background: "#ffffff",
          }}
        >
          <Image
            src={verifyStatus ? VerifySuccessIcon : VerifyIcon} // Replace with the correct path to your image
            alt="Circle Image"
            width="400px" // Make the image take up the entire Box
            height="400px" // Make the image take up the entire Box
          />
        </Box>
        <Box
          sx={{
            maxWidth: 400,
            width: 400,
            margin: "auto",
            padding: 2,
            background: "#ffffff",
            textAlign: "center",
          }}
        >
          <Typography variant="h3" color="text.secondary" mb={2}>
            {t("thank_you")} {currentMerchant?.data?.name}
          </Typography>
          <Typography variant="h3" color="text.secondary" mb={2}>
            {verifyContent}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
