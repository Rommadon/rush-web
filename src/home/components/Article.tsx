/* eslint-disable @next/next/no-img-element */
import { Box, Typography, useMediaQuery } from "@mui/material";
import NextLink from "next/link";

import { ArticleCard } from "../../product/components";
import { ArticleModel } from "src/article/models";

import { ChevronRightIcon, routes } from "src/core";
import { useTranslations } from "next-intl";

export type ArticleProps = {
  articles: ArticleModel[];
};

export const ArticleComponent = (props: ArticleProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const t = useTranslations("home");

  return props.articles?.length > 0 ? (
    <Box
      p={{ lg: "32px 20px", xs: "32px 16px" }}
      component="section"
      mx="auto"
      maxWidth="1240px"
    >
      {props.articles?.length > 0 ? (
        isDesktop ? (
          <Box display="flex" mb="24px" justifyContent="space-between">
            <Typography variant="h3" component="h2" fontWeight={500}>
              {t("articles")}
            </Typography>
            <NextLink href={routes.articles({}, {})}>
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
              {t("articles")}
            </Typography>
            <Box display="flex" alignItems="center">
              <NextLink href={routes.articles()}>
                <a>
                  <ChevronRightIcon />
                </a>
              </NextLink>
            </Box>
          </Box>
        )
      ) : (
        ""
      )}
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap="16px"
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
        {props.articles?.slice(0, 6)?.map((article, index) => (
          <Box
            key={`${article.releasedAt}-${index}`}
            style={{ scrollSnapAlign: "start", cursor: "pointer" }}
            pb="24px"
          >
            <ArticleCard
              {...article}
              width={isDesktop ? undefined : 240}
              height={isDesktop ? undefined : 135}
            />
          </Box>
        ))}
      </Box>
    </Box>
  ) : (
    <></>
  );
};
