/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import NextImage from "next/image";
import NextLink from "next/link";

import { ArticleModel } from "src/article";
import { routes } from "src/core";

export type ArticleCardProps = ArticleModel & {
  width?: number;
  height?: number;
};

export const ArticleCard: FC<ArticleCardProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const targetCurrentRef = useRef();

  useLayoutEffect(() => {
    if (targetCurrentRef.current) {
      setDimensions({
        width: targetCurrentRef.current["offsetWidth"] || 200,
        height: targetCurrentRef.current["offsetHeight"] || 200,
      });
    }
  }, []);

  useEffect(() => {
    if (targetCurrentRef.current) {
      setDimensions({
        width: targetCurrentRef.current["offsetWidth"] || 200,
        height: targetCurrentRef.current["offsetHeight"] || 200,
      });
    }
  }, []);

  return (
    <NextLink href={routes.articleDetail({ slug: props.urlSlug || props.id })}>
      <Box ref={targetCurrentRef}>
        <Box width={props.width || dimensions.width}>
          <Box
            position="relative"
            overflow="hidden"
            borderRadius={isDesktop ? "0" : "8px"}
          >
            <NextImage  
              className={isDesktop ? "img-cover" : "rounded-2 img-cover"}
              src={props?.imageUpload?.url ?? "/new-in-placeholder.svg"}
              width={props?.width || dimensions.width || 240}
              height={props?.height || (dimensions.width * 9) / 16 || 135}
              // priority={true}
              // placeholder="blur"
              blurDataURL={"/popular-product-thumbnail.jpg"}
              quality={50}
  unoptimized={true}
/>
            {/* <img
          src={props?.imageUpload?.url ?? "/article-placeholder.svg"}
          className="image-responsive rounded"
        /> */}
          </Box>
          <Box width={isDesktop ? "100%" : (props.width || dimensions.width || 275)} mt="8px">
          {
              <Box display="flex" justifyContent="space-between" my="10px">
                <Box display="flex">
                  {props?.tag?.map((tag) => (
                    <Box
                      key={tag}
                      borderRadius="4px"
                      border="1px solid"
                      borderColor="grey.400"
                      px="3px"
                      mr="5px"
                    >
                      <Typography
                        fontSize="10px"
                        color="grey.400"
                        p="3px"
                        fontWeight="light"
                      >
                        {tag}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            }
            <Typography component="h2" variant="h5" fontWeight="light" lineHeight="23px">
              {props.name}
            </Typography>
          </Box>
        </Box>
      </Box>
    </NextLink>
  );
};
