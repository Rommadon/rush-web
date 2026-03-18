/* eslint-disable @next/next/no-img-element */
import { Box, Typography, useMediaQuery } from "@mui/material";
import router from "next/router";
import NextLink from "next/link";

import { Product } from "../../product/models";

import { getProductStock } from "../../../utils/calaulate";

import { routes } from "src/core";
import { useTranslations } from "next-intl";
import { BestSellerCard } from "src/product";
import { BestSellerCardMock } from "src/product/components/BestSellerCardMock";

export type BestSaleProductProps = {
  bestSellerProducts: Product[];
};

export const BestSaleProductComponent = (props: BestSaleProductProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const t = useTranslations("home");

  return (
    <Box
      p={{ lg: "32px 20px", xs: "32px 16px" }}
      component="section"
      mx="auto"
      maxWidth="1240px"
    >
      {isDesktop ? (
        <Box display="flex" mb="24px" justifyContent="space-between">
          <Typography variant="h3" component="h2" fontWeight={500}>
            {t("popularItems")}
          </Typography>
          <NextLink href={routes.products({}, {})}>
            <Typography
              variant="h5"
              component="h4"
              color={"#77adf8"}
              style={{ cursor: "pointer" }}
            >
              ดูทั้งหมด
            </Typography>
          </NextLink>
        </Box>
      ) : (
        <Box display="flex" mb="32px" justifyContent="space-between">
          <Typography variant="h1" component="h2">
            {t("popularItems")}
          </Typography>
        </Box>
      )}
      <Box
        display="flex"
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        flexDirection={"row"}
      >
        {props.bestSellerProducts?.length > 0
          ? props.bestSellerProducts?.slice(0, isDesktop ? 5 : 4).map((product) => (
              <Box
                key={`${product.slug}-best-seller`}
                style={{ scrollSnapAlign: "start" }}
                marginBottom={isDesktop ? "0" : "16px"}
              >
                <BestSellerCard
                  {...product}
                  onClick={() =>
                    router.push(routes.product({ slug: product.slug }))
                  }
                />
              </Box>
            ))
          : [
              "https://staging-shopdit.s3.ap-southeast-1.amazonaws.com/317-1699452559192",
              "https://staging-shopdit.s3.ap-southeast-1.amazonaws.com/1736-1699452558635",
              "https://staging-shopdit.s3.ap-southeast-1.amazonaws.com/1724-1699452558178",
              "https://staging-shopdit.s3.ap-southeast-1.amazonaws.com/339-1699452557663",
              "https://staging-shopdit.s3.ap-southeast-1.amazonaws.com/323-1699452557137",
            ]
              ?.slice(0, isDesktop ? 5 : 4)
              .map((i) => (
                <Box
                  key={`category-${i}`}
                  flex={isDesktop ? undefined : "0 0 48%"}
                  marginBottom={isDesktop ? "0" : "16px"}
                >
                  <BestSellerCardMock image={i} />
                </Box>
              ))}
      </Box>
    </Box>
  );
};
