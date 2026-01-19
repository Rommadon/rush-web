/* eslint-disable @next/next/no-img-element */
import { Box, Typography, useMediaQuery } from "@mui/material";
import router from "next/router";
import NextLink from "next/link";

import { Product } from "../../product/models";
import { NewInSection } from "src/product/components/NewInSection";
import { NewInCard } from "src/product/components/NewInCard";

import { getProductStock } from "../../../utils/calaulate";

import { routes } from "src/core";
import { useTranslations } from "next-intl";

export type NewProductProps = {
  newProducts: Product[];
  openRegisterPhoneModal: (p: any) => any;
};

export const NewProductComponent = (props: NewProductProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const t = useTranslations("home");

  return props.newProducts?.length > 3 ? (
    <Box
      p={{ lg: "32px 20px", xs: "32px 16px" }}
      component="section"
      mx="auto"
      maxWidth="1240px"
    >
      {isDesktop ? (
        <Box display="flex" mb="24px" justifyContent="space-between">
          <Typography variant="h3" component="h2" fontWeight={500}>
            {t("newIn")}
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
            {t("newIn")}
          </Typography>
        </Box>
      )}
      {isDesktop ? (
        <NewInSection newProducts={props.newProducts} />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gridTemplateRows="repeat(2, 1fr)"
          gap="24px"
          justifyContent={isDesktop ? "space-between" : "inherit"}
          sx={
            !isDesktop
              ? {
                  overflowX: "scroll",
                  overflowY: "hidden",
                  scrollSnapType: "x mandatory",
                }
              : {}
          }
        >
          {props.newProducts?.length > 0
            ? props.newProducts?.slice(0, 9)?.map((product, index) => (
                <Box
                  key={`${index}-${product.slug}-new`}
                  marginRight="-10px"
                  paddingRight="10px"
                  paddingLeft="8px"
                  style={{ scrollSnapAlign: "start", cursor: "pointer" }}
                >
                  {console.log("prod", product)}
                  <NewInCard
                    {...product}
                    onClick={
                      getProductStock(product.productItems) > 0
                        ? () =>
                            router.push(routes.product({ slug: product.slug }))
                        : () => props.openRegisterPhoneModal(product)
                    }
                  />
                </Box>
              ))
            : [1, 2, 3, 4, 5, 6]?.map((i) => (
                <Box
                  width="100%"
                  position="relative"
                  height={isDesktop ? 200 : 100}
                  bgcolor="grey.300"
                  key={`category-${i}`}
                  mr="16px"
                >
                  <Box
                    sx={{
                      position: "relative",
                      float: "left",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Typography
                      variant="h3"
                      component="h3"
                      textAlign="center"
                      fontWeight="bold"
                      color="white"
                    >
                      Product
                    </Typography>
                  </Box>
                </Box>
              ))}
        </Box>
      )}
    </Box>
  ) : (
    <></>
  );
};
