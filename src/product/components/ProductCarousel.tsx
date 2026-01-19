import { FC, useState } from "react";
import NextImage from "next/image";
import { Box, useMediaQuery } from "@mui/material";
import "react-alice-carousel/lib/alice-carousel.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import router from "next/router";

import { BannerPromotion } from "../models";
import { BannerMerchantType } from "../models/enum/bannerPromotion";
import { routes } from "src";

export type BannerCarouselProp = {
  imgs: {
    position: number;
    src: string;
    alt: string;
  }[];
  bannerPromotions: BannerPromotion[];
};

export const BannerCarousel: FC<BannerCarouselProp> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const items = props.imgs.map((img, index) => (
    <Box key={img.position} mx={isDesktop ? "20px" : "5px" } onClick={() => onClickBannerMerchant(props.bannerPromotions[index])}>
      <Box
        position="relative"
        width="100%"
        alignItems="center"
        borderRadius={isDesktop ? "0" : "8px"}
        overflow="hidden"
        sx={{
          height: {
            xs: "130px",
            md: "250px",
            lg: "425px",
          },
          width: {
            xs: "260px",
            md: "500px",
            lg: "850px",
          }
        }}
      >
        <NextImage {...img} src={img.src || "/home-carousel-placeholder.svg"} layout="fill" objectFit="fill" unoptimized priority={true} />
      </Box>
    </Box>
  ));

  const settings = {
    dots: false,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const onClickBannerMerchant = (bannerMerchant: BannerPromotion) => {
    switch (bannerMerchant.type) {
      case BannerMerchantType.ARTICLE:
        const idArticle = bannerMerchant.article.id;
        router.push(routes.articleDetail({ slug: idArticle }));

        break;
      case BannerMerchantType.PRODUCT:
        const slugProduct = bannerMerchant.product.slug;
        router.push(routes.product({ slug: slugProduct }));

        break;
      case BannerMerchantType.PRODUCT_BRAND:
        const idBrand = bannerMerchant.productBrand.id;
        router.push(`/products?productBrandIds=${idBrand || 1}&tap=1`);

        break;
      case BannerMerchantType.PRODUCT_CATEGORY:
        const idCategory = bannerMerchant.productCategory.id;
        router.push(`/products?productCategoryIds=${idCategory || 1}`);

        break;
      case BannerMerchantType.URL:
        window.open(bannerMerchant.url, bannerMerchant.isOpenNewWindow ? "_blank" : "_self");
        break;
    }
  }

  return (
    <Box maxHeight={isDesktop ? 'auto' : '250px'} py={isDesktop ? '0' : '32px'}>
      <Slider {...settings}>
        {items?.map((item) => item)}
      </Slider>
    </Box>
  );
};

export default BannerCarousel
