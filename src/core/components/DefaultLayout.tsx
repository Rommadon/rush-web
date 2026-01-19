import { useMediaQuery } from "@mui/material";
import React, { FC, ReactNode, useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import NextHead from "next/head";
import Router from "next/router";

import { Navbar, NavbarMobile, Footer, FooterMobile } from "..";
import Head from "next/head";
import { useAuth } from "src/auth";

export type DefaultLayoutProp = {
  isAuth?: boolean;
  merchantName: string;
  companyName: string;
  description: string;
  email: string;
  phoneNumbers: string[];
  search?: string;
  appBar?: ReactNode | null;
  disableFooterMobile: boolean;
  footer?: ReactNode | null;
  onDisableLoading?: boolean;
  isHomePage?: boolean;
  titleMeta?: string;
  descriptionMeta?: string;
  keywordsMeta?: string;
  imageUrl?: string;
};

React.useLayoutEffect = React.useEffect;

export const DefaultLayout: FC<DefaultLayoutProp> = (props) => {
  const {
    currentMerchant,
  } = useAuth();

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [onChangePage, setOnChangePage] = useState(false);
  const [onDisableLoading, setOnDisableLoading] = useState(props?.onDisableLoading || false);
  const [isShowFooter, setIsShowFooter] = useState(false);
  let minHeight = '85vh'

  const onChangePageStart = () => {
    setOnChangePage(true)
  }

  const onChangePageEnd = () => {
    setOnChangePage(false)
  }

  useEffect(() => {
    setIsShowFooter(true);
  }, []);

  Router.events.on("routeChangeStart", onChangePageStart);
  Router.events.on("routeChangeComplete", onChangePageEnd);
  Router.events.on("routeChangeError", onChangePageEnd);

  const renderFooter = () => (
    isDesktop ? (
      <Footer
        merchantName={props.merchantName}
        companyName={props.companyName}
        description={props.description}
        email={props.email}
        phoneNumbers={props.phoneNumbers}
      />
    ) : (
      !props.disableFooterMobile && (
        <Box
          width="100%"
          position="fixed"
          bottom="0"
          left="0"
          zIndex="1100"
          borderTop=".5px solid #E5E7EB"
        >
          <FooterMobile />
        </Box>
      )
    )
  );

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{props.titleMeta ? `${props.titleMeta} | ${currentMerchant?.data?.name} - ${currentMerchant?.data?.highlight}` : `${currentMerchant?.data?.name} - ${currentMerchant?.data?.highlight}`}</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={props.descriptionMeta || currentMerchant?.data?.description} />
        <meta name="keywords" content={props.keywordsMeta || currentMerchant?.data?.keyword} />
        {/* <meta
          property="twitter:image:src"
          content={`${origin}${image}?v=${Math.floor(Date.now() / 100)}`}
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} /> */}
        {
          currentMerchant?.data?.merchantIcon?.imageUpload || props.imageUrl ? (
            <meta
              property="og:image"
              content={props.imageUrl || currentMerchant?.data?.merchantIcon?.imageUpload?.url}
            />
          ) : ''
        }
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.titleMeta ? `${props.titleMeta} | ${currentMerchant?.data?.name} - ${currentMerchant?.data?.highlight}` : `${currentMerchant?.data?.name} - ${currentMerchant?.data?.highlight}`} />
        <meta property="og:description" content={props.descriptionMeta || currentMerchant?.data?.description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      {
        !isDesktop && onChangePage && !onDisableLoading ? (
          <Box
            maxWidth={props.isHomePage ? '1960px' : '1200px'}
            mx="auto"
            pt={isDesktop ? `80px` : `0px`}
            minHeight={minHeight}
            position="relative"
          >
            <Box position="absolute" top="40%" left="50%" sx={{ transform: "translate(-50%, -50%)" }}>
              <CircularProgress />
            </Box>
          </Box>
        ) : (
          <>
            <Navbar search={props.search} isHomePage={props.isHomePage} />
            {!props.appBar ? <NavbarMobile search={props.search} /> : props.appBar}
            <Box
              maxWidth={props.isHomePage ? '1960px' : isDesktop ? '1240px' : '1200px'}
              mx="auto"
              position="relative"
              pt={isDesktop ? `60px` : `0px`}
              pb={isDesktop ? `0px` : `80px`}
              px={props.isHomePage ? '0' : isDesktop ? '20px' : '0'}
              minHeight={minHeight}
            >
              {props.children}
            </Box>
          </>
        )
      }
      {props.footer && props.footer}
      {isShowFooter && renderFooter()}
    </>
  );
};
