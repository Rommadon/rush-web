/* eslint-disable @next/next/no-img-element */
import { Box, useMediaQuery } from "@mui/material";

import { BannerPromotion } from "../../product/models";
import dynamic from "next/dynamic";

export type BannerPromotionProps = {
  carousel: {
    position: number;
    src: string;
    alt: string;
  }[];
  bannerPromotions: BannerPromotion[];
};

export const DynamicProductCarousel = dynamic(
  () => import("../../product/components/ProductCarousel"),
  { ssr: false }
);

export const BannerPromotionComponent = (props: BannerPromotionProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (props.bannerPromotions ?? []).length ? (
    <Box
      px={isDesktop ? "20px" : "0"}
      py={isDesktop ? "32px" : "0"}
      component="section"
      mx="auto"
      maxWidth="1240px"
    >
      <DynamicProductCarousel
        imgs={props.carousel}
        bannerPromotions={props.bannerPromotions}
      />
    </Box>
  ) : (
    <></>
  );
};
