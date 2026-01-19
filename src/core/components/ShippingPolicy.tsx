import { FC, useContext } from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

import { DefaultLayout, DefaultLayoutProp } from "./DefaultLayout";
import { AuthContext, routes, MobileAppBar } from "src";

export type ShippingPolicyProps = DefaultLayoutProp & {};

export const ShippingPolicy: FC<ShippingPolicyProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { currentMerchant } = useContext(AuthContext);

  return (
    <DefaultLayout
      {...props}
      appBar={!isDesktop && <MobileAppBar title={"นโยบายการจัดส่งสินค้า"} />}
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
              __html: currentMerchant?.data?.merchantPolicy?.shippingPolicy,
            }}
          />
        </Box>
      </Box>
    </DefaultLayout>
  );
};
