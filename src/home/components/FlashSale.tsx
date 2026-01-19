/* eslint-disable @next/next/no-img-element */
import { Box } from "@mui/material";
import NextLink from "next/link";
import { ChevronRightIcon, routes } from "src/core";

import { FlashSale } from "../../product/models";
import { useEffect, useState } from "react";
import FlashSaleSection from "src/product/components/FlashSaleSection";

export type FlashSaleProps = {
  flashSale: FlashSale;
};

export const FlashSaleComponent = (props: FlashSaleProps) => {
  const newDateFlashSaleEndedAt = new Date(props?.flashSale?.endDate);
  const transformFlashSaleEndedAt = newDateFlashSaleEndedAt.setTime(
    newDateFlashSaleEndedAt.getTime()
  );
  const flashSaleEndedAt = new Date(transformFlashSaleEndedAt);
  const [showFlashSale, setShowFlashSale] = useState(
    props.flashSale &&
      Object.keys(props.flashSale).length &&
      flashSaleEndedAt > new Date()
  );

  useEffect(() => {
    let interval: NodeJS.Timer;
    interval = setInterval(() => {
      if (flashSaleEndedAt > new Date()) {
        return;
      }

      setShowFlashSale(false);
      clearInterval(interval);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return showFlashSale ? (
    <Box
      p={{ lg: "32px 20px", xs: "32px 16px" }}
      component="section"
      mx="auto"
      paddingLeft="8px"
      maxWidth="1240px"
    >
      <FlashSaleSection
        products={props.flashSale?.productFlashSales}
        endedAt={flashSaleEndedAt}
        right={
          <NextLink href={routes.productFlashSale()}>
            <Box display="flex" style={{ cursor: "pointer" }}>
              <ChevronRightIcon style={{ width: "20px", height: "20px" }} />
            </Box>
          </NextLink>
        }
      />
    </Box>
  ) : (
    <></>
  );
};
