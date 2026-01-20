import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";

export default function InternalServerErrorPage() {
  const [currentMerchant, setCurrentMerchant] = useState<any>();
  const [text, setText] = useState<String>("");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    async function fetchMerchant() {
      if (
        window.location.href &&
        ["lvh", "staging.myshopdit", "myshopdit", "rushbps"].includes(
          window.location.href.split(".").slice(1, -1).join(".")
        )
      ) {
        const host = window.location.href.split("//")[1];
        const merchantSlug = window.location.href.split("//")[1].split(".")[0];
        let merchantDomain = {};
        if (host && !host.includes("myshopdit.com") && !host.includes("rushbps.com")) {
          merchantDomain = {
            CurrentMerchantDomain: host.split("/")[0].replace("www.", ""),
          };
        }

        const headers = {
          "Content-Type": "application/json",
          CurrentMerchantSlug: `${merchantSlug || "-"}`,
          ...merchantDomain,
        };

        try {
          const { data } = await Axios.get(
            `${process.env.API_HOST}/merchant-public`,
            {
              headers: headers,
              params: {},
            }
          );

          setCurrentMerchant(data);
        } catch (error) {
          // @ts-ignore
          setText(error.response?.data?.message);
        }
      }
    }

    fetchMerchant();
  }, []);

  return (
    <>
      <Box
        position="fixed"
        bgcolor="common.white"
        width="100%"
        sx={{ zIndex: 1299, boxShadow: "0 2px 10px 0 rgb(1 27 42 / 12%)" }}
        px="16px"
      >
        <Box display="flex" alignItems="center" maxWidth="1184px" margin="auto">
          <Box
            display="flex"
            py="15px"
            alignItems="center"
            sx={{
              flex: "1 1 auto",
            }}
          >
            <Box pr="16px" position="relative" height="auto" width="36px">
              <NextLink href={"https://www.shopdit.com"}>
                <a
                  style={{
                    display: "block",
                    width: isDesktop ? "128px" : "96px",
                    height: isDesktop ? "40px" : "30px",
                    position: "relative",
                  }}
                >
                  <Image
                    src="/shopdit-logo.png"
                    alt="shopdit logo"
                    width="256px"
                    height="79px"
                  />
                </a>
              </NextLink>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          color: "#000",
          background: "#E5E7EB",
          height: "100vh",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            background: "#fff",
            px: isDesktop ? "300px" : "16px",
            py: isDesktop ? "150px" : "100px",
            borderRadius: "8px",
          }}
        >
          {currentMerchant?.data?.merchantIcon?.imageUpload && (
            <NextLink href={"/"}>
              <Box
                style={{
                  display: "block",
                  width: "100%",
                  height: isDesktop ? "100px" : "75px",
                  position: "relative",
                }}
              >
                <Image
                  src={currentMerchant?.data?.merchantIcon?.imageUpload?.url}
                  alt="shopdit logo"
                  layout="fill"
                  objectFit="contain"
                  priority={true}
                />
              </Box>
            </NextLink>
          )}
          <Typography variant="h1" py="16px">
            {text}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          mx="auto"
          maxWidth="1440px"
          pt="100px"
          pb="30px"
          flexWrap="wrap"
          px={isDesktop ? "128px" : "16px"}
        >
          <Typography variant="h6" component="h5" fontWeight="light">
            © 2023 Shopdit Co., Ltd. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
