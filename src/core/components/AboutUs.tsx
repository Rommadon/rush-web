import { FC, useContext } from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

import { DefaultLayout, DefaultLayoutProp } from "./DefaultLayout";
import { AuthContext, routes, MobileAppBar } from "src";

export type AboutUsProps = DefaultLayoutProp & {};

export const AboutUs: FC<AboutUsProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { currentMerchant } = useContext(AuthContext);

  return (
    <DefaultLayout
      {...props}
      appBar={!isDesktop && <MobileAppBar title={"เกี่ยวกับเรา"} />}
      titleMeta="เกี่ยวกับเรา"
    >
      <Box mt="80px" mb="58px">
        <Box
          display="grid"
          gridTemplateColumns={isDesktop ? "1fr 2fr" : "1fr"}
          mt="48px"
          p={isDesktop ? "0" : "32px"}
        >
          <Box>
            <Box
              pb="32px"
              id="about-us"
            >
              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Typography
                  variant="h3"
                  fontWeight="light"
                  lineHeight="25px"
                  mb="32px"
                >
                  ชื่อร้านค้า
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="light"
                  lineHeight="25px"
                  mb="32px"
                >
                  {currentMerchant?.data?.name || "-"}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Typography
                  variant="h3"
                  fontWeight="light"
                  lineHeight="25px"
                  mb="32px"
                >
                  หมวดหมู่ร้านค้า
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="light"
                  lineHeight="25px"
                  mb="32px"
                >
                  {currentMerchant?.data?.merchantCategory?.name || "-"}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
              >

              </Box>
              
              <Typography
                variant="h3"
                fontWeight="light"
                lineHeight="25px"
                mb="16px"
              >
                รายละเอียดร้านค้า
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
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};
