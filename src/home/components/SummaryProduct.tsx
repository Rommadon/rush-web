/* eslint-disable @next/next/no-img-element */
import { Box, useMediaQuery } from "@mui/material";

import { Product } from "../../product/models";
import { SummaryProducts } from "src/product/components/SummaryProducts";

export type SummaryProductProps = {
  recommendProducts: Product[];
  bestSellerProducts: Product[];
  newProducts: Product[];
  discountProducts: Product[];
  openRegisterPhoneModal: (p: any) => any;
};

export const SummaryProductComponent = (props: SummaryProductProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return props.recommendProducts?.length > 2 ||
    props.bestSellerProducts?.length > 2 ||
    props.newProducts?.length > 2 ||
    props.discountProducts?.length > 2 ? (
    <Box
      px={isDesktop ? "20px" : "0"}
      py={isDesktop ? "32px" : "0"}
      component="section"
      mx="auto"
      maxWidth="1240px"
    >
      <SummaryProducts
        recommendedProducts={props.recommendProducts}
        bestSellerProducts={props.bestSellerProducts}
        newInProducts={props.newProducts}
        promotedProducts={props.discountProducts}
        openRegisterPhoneModal={props.openRegisterPhoneModal}
        recentlyViewedProducts={[]}
      />
    </Box>
  ) : isDesktop ? (
    <></>
  ) : (
    <Box pt={"65px"}></Box>
  );
};
