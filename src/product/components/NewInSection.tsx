import { Box, Typography, useMediaQuery } from "@mui/material";
import { FC, useLayoutEffect, useRef, useState } from "react";
import { SummaryProductCard } from "./SummaryProductCard";
import router from "next/router";
import { routes } from "src/core";
import { Product } from "../models";
import { BestSellerCardMock } from "./BestSellerCardMock";

export type NewInSectionProps = {
  newProducts: Product[];
};

export const NewInSection: FC<NewInSectionProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const targetCurrentRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (targetCurrentRef.current) {
      setDimensions({
        width: targetCurrentRef.current["offsetWidth"],
        height: targetCurrentRef.current["offsetHeight"],
      });
    }
  }, []);

  return (
    <>
      <Box
        display={"flex"}
        mx="0"
        // sx={{
        //   overflowX: "scroll",
        // }}
        ref={targetCurrentRef}
      >
        <Box flex={"0 0 40%"}>
          {props.newProducts[0] && (
            <SummaryProductCard
              {...props.newProducts[0]}
              width={isDesktop ? dimensions?.width * 0.4 - 40 : 160}
              height={isDesktop ? dimensions?.width * 0.4 - 40 : 160}
              onClick={() =>
                router.push(routes.product({ slug: props.newProducts[0].slug }))
              }
              sizeLg
            />
          )}
        </Box>
        <Box flex={"0 0 60%"}>
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
              ? props.newProducts?.slice(1, 7)?.map((product, index) => (
                  <Box
                    key={`${index}-${product.slug}-new`}
                    marginRight="-10px"
                    paddingRight="10px"
                    paddingLeft="8px"
                    style={{ scrollSnapAlign: "start", cursor: "pointer" }}
                  >
                    <SummaryProductCard
                      {...product}
                      onClick={() =>
                        router.push(routes.product({ slug: product.slug }))
                      }
                      width={isDesktop ? ((dimensions?.width * 0.6) / 3) - 40 : 160}
                      height={isDesktop ? ((dimensions?.width * 0.6 )/ 3) - 40 : 160}
                    />
                  </Box>
                ))
              :
              [
                "https://staging-shopdit.s3.ap-southeast-1.amazonaws.com/317-1699452559192",
                "https://staging-shopdit.s3.ap-southeast-1.amazonaws.com/1736-1699452558635",
              ]?.map((i) => (
                <Box
                  marginRight="32px"
                  paddingLeft="8px"
                  style={{ scrollSnapAlign: "start" }}
                  key={`category-${i}`}
                >
                  <BestSellerCardMock image={i} />
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};
