import { FC, useContext } from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { DefaultLayout, DefaultLayoutProp } from "./DefaultLayout";
import { AuthContext, routes, MobileAppBar } from "src";
import facebookLogo from "../../../public/icons/facebook-mobile.png";
import instagramLogo from "../../../public/icons/instagram.svg";
import youtubeLogo from "../../../public/icons/youtube-mobile.svg";

export type ContactUsProps = DefaultLayoutProp & {};

export const ContactUs: FC<ContactUsProps> = (props) => {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { currentMerchant } = useContext(AuthContext);

  return (
    <DefaultLayout
      {...props}
      appBar={!isDesktop && <MobileAppBar title={"ติดต่อเรา"} />}
      titleMeta="ติดต่อเรา"
    >
      <Box mt="80px" mb="58px">
        <Box
          display="grid"
          gridTemplateColumns={isDesktop ? "1fr 2fr" : "1fr"}
          mt="48px"
          p={isDesktop ? "0" : "32px"}
        >
          <Box
            borderBottom="1px solid"
            borderColor="grey.100"
            pb="16px"
            id="contact-us"
          >
            <Typography variant="h2" fontWeight="600" mb="16px">
              ติดต่อเรา
            </Typography>
            <address>
              <Typography
                variant="h3"
                component="h3"
                pb="8px"
                fontWeight="light"
              >
                {currentMerchant?.data?.name}
              </Typography>
              {
                <Typography
                  variant="h3"
                  component="h3"
                  pb="12px"
                  fontWeight="light"
                >
                  {currentMerchant?.data?.contactAddress} {currentMerchant?.data?.subdistrictContactAddress} {currentMerchant?.data?.districtContactAddress} {currentMerchant?.data?.provinceContactAddress} {currentMerchant?.data?.postCodeContactAddress}
                </Typography>
              }
              {currentMerchant?.data?.email && (
                <a href={`mailto:${currentMerchant?.data?.email}`}>
                  <Typography
                    variant="h3"
                    component="h3"
                    pb="12px"
                    fontWeight="light"
                  >
                    {currentMerchant?.data?.email}
                  </Typography>
                </a>
              )}
              {currentMerchant?.data?.tel && (
                <a
                  key={currentMerchant?.data?.tel}
                  href={`tel:+66${currentMerchant?.data?.tel
                    .slice(1)
                    .split(" ")
                    .join("")}`}
                >
                  <Typography variant="h3" component="h3" fontWeight="light" pb="8px">
                    {currentMerchant?.data?.tel}
                  </Typography>
                </a>
              )}
            </address>
            {
              currentMerchant?.data?.lineSocialContact && (
                <Typography variant="h3" component="h3" fontWeight="light" pb="8px">
                  LINE ID : {currentMerchant?.data?.lineSocialContact}
                </Typography>
              )
            }
            <Box display="flex" pt="16px" pb="32px" alignItems="center">
              {currentMerchant?.data?.facebookSocialContact && (
                <a
                  href={`https://www.facebook.com/${currentMerchant?.data?.facebookSocialContact}`}
                  target="_blank"
                  rel="noreferrer"
                  
                >
                  <Image src={facebookLogo} alt="facebook logo" width="24px" height="24px" />
                </a>
              )}
              <Box width="8px" />
              {currentMerchant?.data?.instagramSocialContact && (
                <a
                  href={`https://www.instagram.com/${currentMerchant?.data?.instagramSocialContact}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image src={instagramLogo} alt="facebook logo" />
                </a>
              )}
              <Box width="4px" />
              {
                currentMerchant?.data?.youtubeSocialContact && (
                  <a href={`${currentMerchant?.data?.youtubeSocialContact}`} target="_blank" rel="noreferrer">
                    <Image src={youtubeLogo} alt="youtube logo" width="42px" height="42px" />
                  </a>
                )
              }
            </Box>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};
