/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import router from "next/router";

import { routes } from "src/core";
import { BannerMerhchant } from "../../product/models";
import { BannerMerchantType } from "../../product/models/enum/bannerPromotion";
import DynamicCarousel from "../../core/components/Carousel";
import HomeBannerCarousel from "../../core/components/HomeBannerCarousel";

export type BannerProp = {
  bannerMerchants: BannerMerhchant[];
};

export const BannerComponent = (props: BannerProp) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const targetRef = useRef();
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setIsMediaLoading(false);
  }, []);

  const onClickBannerMerchant = (bannerMerchant: BannerMerhchant) => {
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
        window.open(
          bannerMerchant.url,
          bannerMerchant.isOpenNewWindow ? "_blank" : "_self"
        );
        break;
    }
  };

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current["offsetWidth"] || 202,
        height: targetRef.current["offsetHeight"] || 202,
      });
    }
  }, []);

  const renderBanner = () =>
    isDesktop ? (
      <HomeBannerCarousel
        images={props?.bannerMerchants?.map((heroImage: any, i: any) => (
          <Box key={i}>
            <Image  
              src={
                heroImage?.bannerMerchantDesktop?.imageUpload?.url ||
                "/popular-product-thumbnail.jpg"
              }
              alt={heroImage?.bannerMerchantDesktop?.imageUpload?.name}
              width={1440}
              height={740}
              placeholder="blur"
              layout="responsive"
              blurDataURL={
                heroImage?.bannerMerchantDesktop?.imageUpload?.url ||
                "/popular-product-thumbnail.jpg"
              }
  unoptimized={true}
/>
          </Box>
        ))}
      />
    ) : (
      <DynamicCarousel
        images={props?.bannerMerchants?.map((heroImage: any, i: any) => (
          <Box
            key={i}
            position="relative"
            width="100%"
            onClick={() => onClickBannerMerchant(heroImage)}
            sx={{
              cursor:
                heroImage.type !== BannerMerchantType.NON_LINK ? "pointer" : "",
            }}
          >
            <Box
              width="100%"
              position="relative"
              display={{ xs: "none", md: "block" }}
            >
              <Image  
                src={
                  heroImage?.bannerMerchantDesktop?.imageUpload?.url ||
                  "/popular-product-thumbnail.jpg"
                }
                alt={heroImage?.bannerMerchantDesktop?.imageUpload?.name}
                width={1440}
                height={740}
                layout="responsive"
                placeholder="blur"
                blurDataURL={
                  heroImage?.bannerMerchantDesktop?.imageUpload?.url ||
                  "/popular-product-thumbnail.jpg"
                }
  unoptimized={true}
/>
            </Box>
            <Box position="relative" display={{ xs: "block", md: "none" }}>
              <Image  
                className="image-responsive"
                src={
                  heroImage?.bannerMerchantApplication?.imageUpload?.url ||
                  "/popular-product-thumbnail.jpg"
                }
                alt={heroImage?.bannerMerchantApplication?.imageUpload?.name}
                width={dimensions.width}
                height={(dimensions.width * 4) / 3}
                layout="responsive"
                blurDataURL={"/popular-product-thumbnail.jpg"}
                quality={70}
  unoptimized={true}
/>
            </Box>
            <Box
              width="100%"
              height="224px"
              bottom="0"
              position="absolute"
              sx={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.16) 100%);",
              }}
            />
          </Box>
        ))}
      />
    );

  return (
    <Box mx="auto" ref={targetRef}>
      {props?.bannerMerchants?.length <= 0 ? (
        isDesktop ? <></> : <Box pt={'65px'}></Box>
      ) : isMediaLoading ? (
        <Box
          display={{ xs: "none", md: "block" }}
          position="relative"
          width="100%"
          style={{ height: "740px" }}
        />
      ) : (
        renderBanner()
      )}
    </Box>
  );
};
