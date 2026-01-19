import NextHead from "next/head";
import type { AppProps } from "next/app";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { NextIntlProvider } from "next-intl";
import dynamic from "next/dynamic";
import NextNProgress from "nextjs-progressbar";

import "react-alice-carousel/lib/alice-carousel.css";
import "styles/globals.css";
import "nprogress/nprogress.css";

import {
  AuthProvider,
  ComparisonProvider,
  CartProvider,
  defaultTheme as theme,
  ToastProvider
} from "src";
// import ComparisonModal from "src/product/components/ComparisonModal";
// import { ComparisonSnackbar } from "src/product/components/ComparisonSnackbar";
// import { Toast } from "src/core/components/Toast";
const CookieConsentToast = dynamic(
  () => {
    return import('src/core/components/CookieConsentToast');
  },
  { ssr: false },
);
const ComparisonSnackbar = dynamic(
  () => {
    return import('src/product/components/ComparisonSnackbar');
  },
  { ssr: false },
);
const ComparisonModal = dynamic(
  () => {
    return import('src/product/components/ComparisonModal');
  },
  { ssr: false },
);
const AuthModal = dynamic(
  () => {
    return import('src/auth/components/AuthModal');
  },
  { ssr: false },
);
const Toast = dynamic(
  () => {
    return import('src/core/components/Toast');
  },
  { ssr: false },
);
const TopProgressBar = dynamic(
  () => {
    return import("src/core/components/TopProgressBar");
  },
  { ssr: false },
);

function MyApp({ Component, pageProps }: AppProps) {
  const authProviderProps = {
    isAuth: pageProps.isAuth,
    isAuthModalOpen: pageProps.isAuthModalOpen,
    currentMerchant: pageProps.currentMerchant,
    baseApiUrl: pageProps.baseApiUrl,
    profile: pageProps.profile,
    token: pageProps.token,
    acceptCookies: pageProps.acceptCookies
  };

  const comparisonProviderProps = {
    products: pageProps.comparisonProducts,
    isModalOpen: pageProps.isComparisonModalOpen,
    maximumProduct: 4,
  };

  const cartProviderProps = {
    cartData: pageProps.cartData,
    isAuth: pageProps.isAuth,
  };

  const toastProviderProps = {
    isOpenToast: pageProps.isOpenToast,
    messageToast: pageProps.messageToast,
    typeToast: pageProps.typeToast,
  };

  return (
    <>
      <NextIntlProvider messages={pageProps.messages}>
        <NextHead>
          <title>{(pageProps.currentMerchant?.data?.slug[0]?.toUpperCase() + pageProps.currentMerchant?.data?.slug.slice(1)) || 'Shopdit | ช็อปดิท - แอพช้อปปิ้งสำเร็จรูป เปิดร้านกับเรา ได้ทั้ง APP และ WEBSITE'}</title>
          <link href={pageProps.currentMerchant?.data?.merchantIcon?.imageUpload?.url || "/shopdit-circular-favicon-72.png"} rel="icon" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
          <meta
            content="minimum-scale=1, initial-scale=1, width=device-width"
            name="viewport"
          />
        </NextHead>
        <AuthProvider {...authProviderProps}>
          <CartProvider {...cartProviderProps}>
            <ComparisonProvider {...comparisonProviderProps}>
              <ToastProvider {...toastProviderProps}>
                <ThemeProvider theme={theme(pageProps.currentMerchant?.data?.primaryColor)}>
                  <CssBaseline />
                  <AuthModal />
                  <ComparisonModal />
                  <ComparisonSnackbar />
                  <TopProgressBar />
                  <NextNProgress height={3} showOnShallow={false} options={{ showSpinner: false }} />
                  <Component {...pageProps} />
                  <Toast />
                  <Box id="fb-root"></Box>
                  <Box id="fb-customer-chat" className="fb-customerchat">
                  </Box>
                  <CookieConsentToast />
                </ThemeProvider>
              </ToastProvider>
            </ComparisonProvider>
          </CartProvider>
        </AuthProvider>
      </NextIntlProvider>
    </>
  );
}
export default MyApp;
