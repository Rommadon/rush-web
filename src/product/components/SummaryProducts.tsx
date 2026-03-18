import { FC, SyntheticEvent, useState } from "react";
import {
  Tab,
  Tabs,
  Box,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { useTranslations } from "next-intl";
import router from "next/router";

import { Product } from "../models";
import { SummaryProductCard } from "./SummaryProductCard";
import { routes } from "../..";
import { SortByIcon } from "src/core";
import { getProductStock } from "utils/calaulate";

export type SummaryProductProp = {
  recommendedProducts: Product[];
  bestSellerProducts: Product[];
  newInProducts: Product[];
  promotedProducts: Product[];
  recentlyViewedProducts: Product[];
  showAction?: boolean;
};

export const SummaryProducts: FC<SummaryProductProp> = (props) => {
  const [value, setValue] = useState(0);
  const { showAction = false } = props;
  const t = useTranslations("summaryProducts");
  const summaryProducts = [
    props.recommendedProducts,
    props.bestSellerProducts,
    props.newInProducts,
    props.promotedProducts,
    props.recentlyViewedProducts,
  ];

  const handleChange = (_: SyntheticEvent, newValue: number) =>
    setValue(newValue);

  const handleChangeIndex = setValue;
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        textColor="inherit"
        sx={{
          px: isDesktop ? "0" : "16px",
          "& .MuiTabs-flexContainer": {
            // px: isDesktop ? "16px" : "0",
          },
        }}
      >
        <Tab
          label={t("recommended")}
          sx={{ fontSize: isDesktop ? "16px" : "14px", fontWeight: "light" }}
        />
        <Tab
          label={t("bestSeller")}
          sx={{ fontSize: isDesktop ? "16px" : "14px", fontWeight: "light" }}
        />
        <Tab
          label={t("newIn")}
          sx={{ fontSize: isDesktop ? "16px" : "14px", fontWeight: "light" }}
        />
        <Tab
          label={t("promoted")}
          sx={{ fontSize: isDesktop ? "16px" : "14px", fontWeight: "light" }}
        />
      </Tabs>
      {showAction && (
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          mt="42.5px"
        >
          <Typography>
            {t("item", { item: summaryProducts?.[value]?.length })}
          </Typography>
          <Box
            height="24px"
            mx="24px"
            borderRight="1px solid"
            borderColor="#E5E7EB"
          />
          <Button endIcon={<SortByIcon viewBox="0 0 16 17" />}>
            <Typography>{t("sortBy")}</Typography>
          </Button>
        </Box>
      )}
      {summaryProducts && (
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          {summaryProducts?.map((products, index) => (
            <Box
              key={index}
              display="grid"
              pb="64px"
              pt="32px"
              gridTemplateColumns={
                isDesktop ? "repeat(5, 1fr)" : "repeat(2, 45.5%)"
              }
              justifyContent="space-between"
              gap={"32px 36px"}
              px={isDesktop ? "0" : "16px"}
            >
              {products?.slice(0, 10).map((product, index) => (
                <Box key={`${product.slug}-${index}`}>
                  {/* <NextLink
                      key={product.id}
                      href={routes.product({ slug: product.slug })}
                    > */}
                  {/* <a> */}
                  <SummaryProductCard
                    {...product}
                    {...(isDesktop ? {} : { width: "100%", height: 163 })}
                    onClick={() =>
                      router.push(routes.product({ slug: product.slug }))
                    }
                  />
                  {/* </a> */}
                  {/* </NextLink> */}
                </Box>
              ))}
            </Box>
          ))}
        </SwipeableViews>
      )}
    </>
  );
};
