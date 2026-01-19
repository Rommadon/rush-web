import { FC, useContext } from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

import { DefaultLayout, DefaultLayoutProp } from "./DefaultLayout";
import { MobileAppBar } from "./MobileAppBar";
import { MerchantPdpaModel } from "../models";

export type CookiesProps = DefaultLayoutProp & {
  merchantPdpa: MerchantPdpaModel
};

export const Cookies: FC<CookiesProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <DefaultLayout
      {...props}
      appBar={!isDesktop && <MobileAppBar title={"นโยบายคุ้กกี้"} />}
    >
      <Box mt="80px" mb="58px">
        <Box
          display="grid"
          gridTemplateColumns={isDesktop ? "1fr 2fr" : "1fr"}
          mt="48px"
          p={isDesktop ? "0" : "32px"}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: props?.merchantPdpa?.cookiesPolicy,
            }}
          />
        </Box>
      </Box>
    </DefaultLayout>
  );
};
