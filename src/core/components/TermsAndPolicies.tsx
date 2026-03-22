import { FC, useContext } from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { DefaultLayout, DefaultLayoutProp } from "./DefaultLayout";
import { AuthContext, routes, MobileAppBar, MerchantPdpaModel } from "src";
import facebookLogo from "../../../public/icons/facebook.svg";
import instagramLogo from "../../../public/icons/instagram.svg";
import youtubeLogo from "../../../public/icons/youtube.png";

export type TermsAndPoliciesProps = DefaultLayoutProp & {
  merchantPdpa: MerchantPdpaModel
};

export const TermsAndPolicies: FC<TermsAndPoliciesProps> = (props) => {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { currentMerchant } = useContext(AuthContext);

  return (
    <DefaultLayout
      {...props}
      appBar={!isDesktop && <MobileAppBar title={"เงื่อนไข การใช้บริการ"} />}
      titleMeta="เงื่อนไขและนโยบาย"
    >
      <Box mt="80px" mb="58px">
        {isDesktop && (
          <Typography variant="h1" component="h1">
            เงื่อนไขและนโยบาย
          </Typography>
        )}
        <Box
          display="grid"
          gridTemplateColumns={isDesktop ? "1fr 2fr" : "1fr"}
          mt="48px"
          p={isDesktop ? "0" : "32px"}
        >
          {isDesktop && (
            <Box>
              <NextLink href={routes.aboutUs()}>
                <a>
                  <Typography
                    variant="h4"
                    py="16px"
                    color={
                      router.asPath === routes.aboutUs()
                        ? "primary.main"
                        : "black"
                    }
                  >
                    เกี่ยวกับเรา
                  </Typography>
                </a>
              </NextLink>

              <NextLink href={routes.refundsAndReturnPolicy()}>
                <a>
                  <Typography
                    variant="h4"
                    py="16px"
                    color={
                      router.asPath.includes(routes.refundsAndReturnPolicy())
                        ? "primary"
                        : "black"
                    }
                  >
                    นโยบายการคืนสินค้าและคืนเงิน
                  </Typography>
                </a>
              </NextLink>

              <NextLink href={routes.shippingPolicy()}>
                <a>
                  <Typography
                    variant="h4"
                    py="16px"
                    color={
                      router.asPath.includes(routes.shippingPolicy())
                        ? "primary"
                        : "black"
                    }
                  >
                    นโยบายการจัดส่งสินค้า
                  </Typography>
                </a>
              </NextLink>

              <NextLink href={routes.cookiesPolicy()}>
                <a>
                  <Typography
                    variant="h4"
                    py="16px"
                    color={
                      router.asPath.includes(routes.cookiesPolicy())
                        ? "primary"
                        : "black"
                    }
                  >
                    นโยบายคุ้กกี้
                  </Typography>
                </a>
              </NextLink>


              <NextLink href={routes.privacyPolicy()}>
                <a>
                  <Typography
                    variant="h4"
                    py="16px"
                    color={
                      router.asPath.includes(routes.privacyPolicy())
                        ? "primary"
                        : "black"
                    }
                  >
                    นโยบายความเป็นส่วนตัว
                  </Typography>
                </a>
              </NextLink>

              <NextLink href={routes.termsOfServicePolicy()}>
                <a>
                  <Typography
                    variant="h4"
                    py="16px"
                    color={
                      router.asPath.includes(routes.termsOfServicePolicy())
                        ? "primary"
                        : "black"
                    }
                  >
                    เงื่อนไขการให้บริการ
                  </Typography>
                </a>
              </NextLink>

              {/* <NextLink href={routes.faq()}>
              <a>
                <Typography
                  variant="h4"
                  py="16px"
                  color={
                    router.asPath.includes(routes.faq()) ? "primary" : "black"
                  }
                >
                  คำถามที่พบบ่อย
                </Typography>
              </a>
            </NextLink> */}

              <NextLink href={routes.contactUs()}>
                <a>
                  <Typography
                    variant="h4"
                    py="16px"
                    color={
                      router.asPath.includes(routes.contactUs())
                        ? "primary"
                        : "black"
                    }
                  >
                    ติดต่อเรา
                  </Typography>
                </a>
              </NextLink>
            </Box>
          )}
          <Box sx={{ wordBreak: 'break-all' }}>
            <Box
              borderBottom="1px solid"
              borderColor="grey.100"
              pb="32px"
              id="about-us"
            >
              <Typography variant="h2" fontWeight="600" mb="32px">
                เกี่ยวกับเรา
              </Typography>
              <Typography
                variant="h4"
                fontWeight="light"
                mb="32px"
                lineHeight="25px"
              >
                {currentMerchant?.data?.description || "-"}
              </Typography>
            </Box>
            <Box
              borderBottom="1px solid"
              borderColor="grey.100"
              py="64px"
              id="refunds-and-return-policy"
            >
              <Typography variant="h2" fontWeight="600" mb="32px">
                นโยบายการคืนสินค้าและคืนเงิน
              </Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    currentMerchant?.data?.merchantPolicy
                      ?.returnAndRefundPolicy,
                }}
              />
            </Box>
            <Box
              borderBottom="1px solid"
              borderColor="grey.100"
              py="64px"
              id="shipping-policy"
            >
              <Typography variant="h2" fontWeight="600" mb="32px">
                นโยบายการจัดส่งสินค้า
              </Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: currentMerchant?.data?.merchantPolicy?.shippingPolicy,
                }}
              />
            </Box>
            <Box
              borderBottom="1px solid"
              borderColor="grey.100"
              py="64px"
              id="cookies-policy"
            >
              <Typography variant="h2" fontWeight="600" mb="32px">
                นโยบายคุ้กกี้
              </Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: props.merchantPdpa?.cookiesPolicy,
                }}
              />
            </Box>
            <Box
              borderBottom="1px solid"
              borderColor="grey.100"
              py="64px"
              id="privacy-policy"
            >
              <Typography variant="h2" fontWeight="600" mb="32px">
                นโยบายความเป็นส่วนตัว
              </Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: props.merchantPdpa?.privacyPolicy,
                }}
              />
            </Box>
            <Box
              borderBottom="1px solid"
              borderColor="grey.100"
              py="64px"
              id="terms-service-policy"
            >
              <Typography variant="h2" fontWeight="600" mb="32px">
                เงื่อนไขการให้บริการ
              </Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: props.merchantPdpa?.termsOfServicePolicy,
                }}
              />
            </Box>
            <Box
              borderBottom="1px solid"
              borderColor="grey.100"
              py="32px"
              id="contact-us"
            >
              <Typography variant="h2" fontWeight="600" mb="32px">
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
                <Typography
                  variant="h3"
                  component="h3"
                  pb="8px"
                  fontWeight="light"
                >
                  {currentMerchant?.data?.contactAddress} {currentMerchant?.data?.subdistrictContactAddress} {currentMerchant?.data?.districtContactAddress} {currentMerchant?.data?.provinceContactAddress} {currentMerchant?.data?.postCodeContactAddress}
                </Typography>
                {currentMerchant?.data?.email && (
                  <a href={`mailto:${currentMerchant?.data?.email}`}>
                    <Typography
                      variant="h3"
                      component="h3"
                      pb="8px"
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
                  <Typography variant="h4" component="h3">
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
                    <Image src={facebookLogo} alt="facebook logo" unoptimized={true}/>
                  </a>
                )}
                <Box width="32px" />
                {currentMerchant?.data?.instagramSocialContact && (
                  <a
                    href={`https://www.instagram.com/${currentMerchant?.data?.instagramSocialContact}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={instagramLogo} alt="facebook logo" unoptimized={true}/>
                  </a>
                )}
                <Box width="32px" />
                {
                  currentMerchant?.data?.youtubeSocialContact && (
                    <a href={`${currentMerchant?.data?.youtubeSocialContact}`} target="_blank" rel="noreferrer">
                      <Image src={youtubeLogo} alt="youtube logo" width="24px" height="24px" unoptimized={true}/>
                    </a>
                  )
                }
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};
