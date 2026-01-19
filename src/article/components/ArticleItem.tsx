import { FC } from "react";
import NextImage from "next/image";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useIntl } from "next-intl";
import { ArticleModel } from "../models";
import { ArticleCard } from "src";

export type ArticleItemProps = {
  article: ArticleModel;
  title: string;
  body: string;
  imgSrc?: string | null;
  tags?: string[] | null;
  publishedAt: string;
};

export const ArticleItem: FC<ArticleItemProps> = (props) => {
  const intl = useIntl();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    isDesktop ? (
      <Box display="flex">
        <Box
          {...(isDesktop
            ? { width: "250px", height: 250*9/16+'px' }
            : { width: "144px", height: "81px" })}
          mr="16px"
          overflow="hidden"
          borderRadius={ isDesktop ? "2px" : "8px" }
        >
          <NextImage
            src={props.imgSrc || ""}
            {...(isDesktop
              ? { width: 250, height: 250*9/16 }
              : { width: 144, height: 81 })}
            objectFit="cover"
          />
        </Box>
        <Box flex="1">
          {isDesktop && (
            <Typography variant="h4">
              {props.title}
            </Typography>
          )}
          {!isDesktop && (
            <Typography variant="h4" fontWeight="light" fontSize="14px">
              {props.title}
            </Typography>
          )}
          <Typography variant="h6" mt="8px" fontWeight="light">
            {props.body}
          </Typography>
          {
            <Box display="flex" justifyContent="space-between" my="10px">
              <Box display="flex">
                {props?.tags?.map((tag) => (
                  <Box
                    key={tag}
                    border="1px solid"
                    borderRadius="3px"
                    borderColor="grey.400"
                    px="4px"
                    mr="5px"
                  >
                    <Typography
                      variant="h6"
                      color="grey.400"
                      p="3px"
                    >
                      {tag}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          }
        </Box>
      </Box>
    ) : (
      <ArticleCard {...props.article} />
    )
  );
};
