import { useTranslations } from "next-intl";
import { FC, useContext } from "react";
import LazyLoad from "react-lazyload";
import Image from "next/image";
import { Typography, Box, InputBase, styled } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

import facebookLogo2 from "../../../public/icons/icons8-facebook-f.svg";
import instagramLogo2 from "../../../public/icons/icons8-instagram.svg";
import youtubeLogo2 from "../../../public/icons/icons8-youtube.svg";
import { AuthContext, routes } from "src";

export type FooterProp = {
  merchantName: string;
  companyName: string;
  description: string;
  email?: string;
  phoneNumbers?: string[];
  facebook?: string;
  instagram?: string;
  twitter?: string;
};

export const LocaleInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    background: theme.palette.common.white,
    borderRadius: "8px",
    padding: "8px 16px",
    width: "80px",
    fontSize: "16px",
  },
}));

export const Footer: FC<FooterProp> = (props) => {
  const { currentMerchant } = useContext(AuthContext);
  const t = useTranslations("footer");
  const router = useRouter();

  const renderContent = () => {
    return (
      <Box
        display="flex"
        justifyContent="space-between"
        mx="auto"
        maxWidth="1240px"
        flexWrap="wrap"
        mb="20px"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          pr="80px"
          width="50%"
        >
          <Typography
            component="h1"
            variant="h4"
            fontSize={28}
            pb="12px"
            fontWeight="600"
            color={currentMerchant?.data?.primaryColor}
          >
            {currentMerchant?.data?.name}
          </Typography>
          {currentMerchant?.data?.description && (
            <Box
              sx={{
                position: "relative",
                display: "block",
                wordBreak: "break-all",
              }}
            >
              <Typography
                component="h3"
                variant="h5"
                fontWeight="light"
                lineHeight="24px"
              >
                {currentMerchant?.data?.description}
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          width="20%"
          paddingRight="80px"
        >
          <Typography
            component="h1"
            variant="h4"
            fontSize={18}
            pb="12px"
            fontWeight="600"
            color={currentMerchant?.data?.primaryColor}
          >
            Info
          </Typography>
          <Link href={routes.aboutUs()}>
            <a>
              <Typography
                component="h3"
                variant="h5"
                pb="8px"
                fontWeight="light"
                lineHeight="24px"
              >
                {t("aboutUs")}
              </Typography>
            </a>
          </Link>
          <Link href={routes.contactUs()}>
            <a>
              <Typography
                component="h3"
                variant="h5"
                pb="8px"
                fontWeight="light"
                lineHeight="24px"
              >
                {t("contactUs")}
              </Typography>
            </a>
          </Link>
          <Link href={routes.articles()}>
            <a>
              <Typography
                component="h3"
                variant="h5"
                pb="8px"
                fontWeight="light"
                lineHeight="24px"
              >
                บทความ
              </Typography>
            </a>
          </Link>
          <Link href={routes.refundsAndReturnPolicy()}>
            <a>
              <Typography
                component="h3"
                variant="h5"
                pb="8px"
                fontWeight="light"
                lineHeight="24px"
              >
                นโยบายการคืนสินค้า
              </Typography>
            </a>
          </Link>
          <Link href={routes.shippingPolicy()}>
            <a>
              <Typography
                component="h3"
                variant="h5"
                pb="8px"
                fontWeight="light"
                lineHeight="24px"
              >
                นโยบายการจัดส่งสินค้า
              </Typography>
            </a>
          </Link>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          width="20%"
        >
          <Typography
            component="h1"
            variant="h4"
            fontSize={18}
            pb="12px"
            fontWeight="600"
            color={currentMerchant?.data?.primaryColor}
          >
            Contact
          </Typography>
          <Typography
            component="h3"
            variant="h5"
            fontWeight="light"
            lineHeight="24px"
          >
            {currentMerchant?.data?.contactAddress}{" "}
            {currentMerchant?.data?.subdistrictContactAddress}{" "}
            {currentMerchant?.data?.districtContactAddress}{" "}
            {currentMerchant?.data?.provinceContactAddress}{" "}
            {currentMerchant?.data?.postCodeContactAddress}
          </Typography>
          <Typography
            component="h3"
            variant="h5"
            fontWeight="light"
            lineHeight="24px"
          >
            {currentMerchant?.data?.email}
          </Typography>
          <Typography
            component="h3"
            variant="h5"
            pb="16px"
            fontWeight="light"
            lineHeight="24px"
          >
            {currentMerchant?.data?.tel}
          </Typography>
          <Box display="flex" pb="32px" alignItems="center" marginLeft="-4px">
            {currentMerchant?.data?.facebookSocialContact && (
              <a
                href={`https://www.facebook.com/${currentMerchant?.data?.facebookSocialContact}`}
                target="_blank"
                rel="noreferrer"
              >
                <Box
                  sx={{
                    width: "26px",
                    height: "26px",
                  }}
                >
                  <Image src={facebookLogo2} alt="facebook logo" unoptimized={true}/>
                </Box>
              </a>
            )}
            <Box width="16px" />
            {currentMerchant?.data?.instagramSocialContact && (
              <a
                href={`https://www.instagram.com/${currentMerchant?.data?.instagramSocialContact}`}
                target="_blank"
                rel="noreferrer"
              >
                <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                  }}
                >
                  <Image src={instagramLogo2} alt="ig logo" unoptimized={true}/>
                </Box>
              </a>
            )}
            <Box width="16px" />
            {currentMerchant?.data?.youtubeSocialContact && (
              <a
                href={`${currentMerchant?.data?.youtubeSocialContact}`}
                target="_blank"
                rel="noreferrer"
              >
                <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                  }}
                >
                  <Image src={youtubeLogo2} alt="youtube logo" unoptimized={true}/>
                </Box>
              </a>
            )}
            <Box width="32px" />
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <LazyLoad height={290}>
      {/* <DesktopMobileAppBanner /> */}
      <footer>
        <Box
          bgcolor="common.white"
          color="common.black"
          py="50px"
          px="20px"
          style={{ borderTop: "1px solid rgba(18, 18, 18, .08)" }}
        >
          {!currentMerchant?.data?.shopditProductWhitelists?.includes('verifyMerchant') ? (
            <></>
          ) : (
            renderContent()
          )}
          <Box
            display="flex"
            justifyContent="space-between"
            mx="auto"
            maxWidth="1240px"
            flexWrap="wrap"
          >
            <Typography
              variant="h6"
              component="h5"
              fontWeight="200"
              fontSize={14}
            >
              © {new Date().getUTCFullYear()},{" "}
              {!currentMerchant?.data?.shopditProductWhitelists?.includes('verifyMerchant')
                ? "My Store Powered by Shopdit"
                : `${currentMerchant?.data?.name} All rights reserved.`}
            </Typography>
            <Box display="flex">
              <Box px="8px">
                <Link href={routes.cookiesPolicy()}>
                  <a>
                    <Typography
                      variant="h6"
                      component="h5"
                      fontWeight="200"
                      fontSize={14}
                    >
                      นโยบายคุ้กกี้
                    </Typography>
                  </a>
                </Link>
              </Box>
              <Box px="8px">
                <Link href={routes.privacyPolicy()}>
                  <a>
                    <Typography
                      variant="h6"
                      component="h5"
                      fontWeight="200"
                      fontSize={14}
                    >
                      นโยบายความเป็นส่วนตัว
                    </Typography>
                  </a>
                </Link>
              </Box>
              <Box px="8px">
                <Link href={routes.termsOfServicePolicy()}>
                  <a>
                    <Typography
                      variant="h6"
                      component="h5"
                      fontWeight="200"
                      fontSize={14}
                    >
                      เงื่อนไขการให้บริการ
                    </Typography>
                  </a>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </footer>
    </LazyLoad>
  );
};

export default Footer;
