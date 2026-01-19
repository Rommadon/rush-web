import { FC, ReactNode, useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

import { routes } from "src/core";
import { FlashSaleCard, FlashSaleCountDown } from "..";
import { ProductFlashSale } from "../models/productFlashSale";

export type FlashSaleSectionProps = {
  products: ProductFlashSale[];
  endedAt: Date;
  right?: ReactNode;
};

export const FlashSaleSection: FC<FlashSaleSectionProps> = (props) => {
  const t = useTranslations("home");
  const router = useRouter();
  // const [cardWidth, setCardWidth] = useState("100%");
  // useEffect(() => {
  //   setCardWidth(`${document.body.getBoundingClientRect().width - 32}px`);
  // }, []);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <Box display="flex" mb="32px" justifyContent="space-between">
        {
          isDesktop ? (
            <Typography variant="h3" component="h2" fontWeight={500}>
              {t("flashSale")}
            </Typography>
          ) : (
            <Typography variant="h1" component="h2">
              {t("flashSale")}
            </Typography>
          )
        }
        <FlashSaleCountDown endedAt={props.endedAt} right={props.right} />
      </Box>
      <Box
        display="grid"
        gridTemplateRows="1fr"
        gridAutoFlow="column"
        gap="32px"
        sx={{
          overflowX: "scroll",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
        }}
      >
        {props.products.map((productFlashSale) => (
          <Box
            key={productFlashSale?.product?.id}
            width={{ lg: "100%" }}
            paddingLeft="8px"
            style={{ scrollSnapAlign: "start" }}
          >
            <FlashSaleCard
              {...productFlashSale}
              onClick={() =>
                router.push(
                  routes.product({ slug: productFlashSale?.product?.slug })
                )
              }
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default FlashSaleSection;
