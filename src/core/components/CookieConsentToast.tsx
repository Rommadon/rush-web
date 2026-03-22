import { FC, useContext } from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import NextHead from "next/head";
import { getFirstFunctionFacebookMessengerCode, getFuntionFacebookPixel, getFuntionGoogleTagManager, getFuntionLingTag, getFuntionTiktokPixel, getIdGA, getNonScriptFacebookPixel, getNonScriptGoogleTagManager, getNonScriptLingTag, getScrDbd, getSecondFunctionFacebookMessengerCode } from "utils";
import NextLink from "next/link";
import Image from "next/image";
import { Box, Typography, useMediaQuery } from "@mui/material";

import { DefaultLayoutProp } from "./DefaultLayout";
import { AuthContext, routes, MobileAppBar } from "src";

export type CookieConsentToastProps = {};

export const CookieConsentToast: FC<CookieConsentToastProps> = () => {
  const { currentMerchant, acceptCookies, setAcceptCookies } = useContext(AuthContext);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <NextHead>
        {
          acceptCookies &&
          currentMerchant?.data?.merchantCodeIntegration?.googleExtension &&
          currentMerchant?.data?.merchantCodeIntegration?.googleExtension?.googleAnalyticsIsActive && (
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${getIdGA(currentMerchant?.data?.merchantCodeIntegration?.googleExtension?.googleAnalytics)}`}
            />
          )
        }
        {
          acceptCookies &&
          currentMerchant?.data?.merchantCodeIntegration?.googleExtension &&
          currentMerchant?.data?.merchantCodeIntegration?.googleExtension?.googleAnalyticsIsActive && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${getIdGA(currentMerchant?.data?.merchantCodeIntegration?.googleExtension?.googleAnalytics)}', { page_path: window.location.pathname });
              `,
              }}
            />
          )
        }
        {
          acceptCookies &&
          currentMerchant?.data?.merchantCodeIntegration?.googleExtension &&
          currentMerchant?.data?.merchantCodeIntegration?.googleExtension?.googleTagManagerIsActive && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  ${getFuntionGoogleTagManager(currentMerchant?.data?.merchantCodeIntegration?.googleExtension?.googleTagManagerBefore)}
                `,
              }}
            />
          )
        }
        {
          acceptCookies &&
          currentMerchant?.data?.merchantCodeIntegration?.googleExtension &&
          currentMerchant?.data?.merchantCodeIntegration?.googleExtension?.googleTagManagerIsActive && (
            <noscript>
              <img height="1" width="1" style={{ display: "none" }} src={getNonScriptGoogleTagManager(currentMerchant?.data?.merchantCodeIntegration?.googleExtension?.googleTagManagerAfter) || ''} />
            </noscript>
          )
        }
        {/* {
          acceptCookies &&
          currentMerchant?.data?.merchantCodeIntegration?.lineExtension &&
          currentMerchant?.data?.merchantCodeIntegration?.lineExtension?.lineTagIsActive && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  ${getFuntionLingTag(currentMerchant?.data?.merchantCodeIntegration?.lineExtension?.lineTag)}
                `,
              }}
            />
          )
        }
        {
          acceptCookies &&
          currentMerchant?.data?.merchantCodeIntegration?.lineExtension &&
          currentMerchant?.data?.merchantCodeIntegration?.lineExtension?.lineTagIsActive && (
            <noscript>
              <img height="1" width="1" style={{ display: "none" }} src={getNonScriptLingTag(currentMerchant?.data?.merchantCodeIntegration?.lineExtension?.lineTag) || ''} />
            </noscript>
          )
        } */}
        {
          acceptCookies &&
          currentMerchant?.data?.merchantCodeIntegration?.facebookExtension &&
          currentMerchant?.data?.merchantCodeIntegration?.facebookExtension?.facebookPixelIsActive && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  ${getFuntionFacebookPixel(currentMerchant?.data?.merchantCodeIntegration?.facebookExtension?.facebookPixel)}
                `,
              }}
            />
          )
        }
        {
          acceptCookies &&
          currentMerchant?.data?.merchantCodeIntegration?.facebookExtension &&
          currentMerchant?.data?.merchantCodeIntegration?.facebookExtension?.facebookPixelIsActive && (
            <noscript>
              <img height="1" width="1" style={{ display: "none" }} src={getNonScriptFacebookPixel(currentMerchant?.data?.merchantCodeIntegration?.facebookExtension?.facebookPixel) || ''} />
            </noscript>
          )
        }
        {
          acceptCookies &&
          currentMerchant?.data?.merchantCodeIntegration?.tiktokExtension &&
          currentMerchant?.data?.merchantCodeIntegration?.tiktokExtension?.tiktokPixelIsActive && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  ${getFuntionTiktokPixel(currentMerchant?.data?.merchantCodeIntegration?.tiktokExtension?.tiktokPixel)}
                `,
              }}
            />
          )
        }
        {
          acceptCookies &&
          currentMerchant?.data?.merchantCodeIntegration?.dbdExtension &&
          currentMerchant?.data?.merchantCodeIntegration?.dbdExtension?.dbdIsActive && (
            <script
              async
              id="dbd-init"
              src={`${getScrDbd(currentMerchant?.data?.merchantCodeIntegration?.dbdExtension?.dbd)}`}
            />
          )
        }
        {
          acceptCookies &&
          currentMerchant?.data?.merchantCodeIntegration?.facebookExtension &&
          currentMerchant?.data?.merchantCodeIntegration?.facebookExtension?.facebookMessengerCodeIsActive && (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `${getFirstFunctionFacebookMessengerCode(currentMerchant?.data?.merchantCodeIntegration?.facebookExtension?.facebookMessengerCode)}`
                }}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `${getSecondFunctionFacebookMessengerCode(currentMerchant?.data?.merchantCodeIntegration?.facebookExtension?.facebookMessengerCode)}`,
                }}
              />
            </>
          )
        }
      </NextHead>
      {
        !acceptCookies && (
          <CookieConsent
            location="bottom"
            buttonText="ยอมรับทั้งหมด"
            cookieName="acceptCookies"
            style={{ background: "rgba(0,1,6,0.9)", zIndex: '100000', color: "#000000" }}
            buttonStyle={{ color: "#fff", fontSize: "14px", background: "rgba(0,1,6,0.9)", padding: '12px 18px', borderRadius: '8px', border: '1px solid #fff' }}
            onAccept={(acceptedByScrolling) => {
              if (acceptedByScrolling) {
              } else {
                setAcceptCookies('true');
              }
            }}
          >
            <Box className="cookie-info">
              {
                currentMerchant?.data?.merchantIcon?.imageUpload?.url && (
                  <Box pr="24px" className="cookie-info-icon">
                    <Image src={currentMerchant?.data?.merchantIcon?.imageUpload?.url} alt="merchant icon" width="100px" height="100px" unoptimized={true}/>
                  </Box>
                )
              }
              <Box>
                <Typography variant="h6" fontWeight="light" lineHeight="20px">
                  <Typography variant="h3" fontWeight="bold" sx={{ pb: isDesktop ? '8px' : '16px' }}>เว็บไซด์เราใช้คุกกี้ !</Typography>
                  เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพและประสบการณ์ที่ดีในการใช้งานเว็บไซต์ คุณสามารถยินยอมการใช้คุกกี้ได้โดยคลิกยอมรับทั้งหมด
                  <NextLink href={routes.cookiesPolicy()}><Typography component="span" variant="h6" fontWeight="light" sx={{ px: '2px', textDecoration: 'underline', cursor: 'pointer' }}>เรียนรู้เพิ่มเติม</Typography></NextLink>
                </Typography>
              </Box>
            </Box>
          </CookieConsent>
        )
      }
    </>
  );
};

export default CookieConsentToast;
