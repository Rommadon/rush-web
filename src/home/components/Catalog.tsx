/* eslint-disable @next/next/no-img-element */
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import Image from "next/image";

import { routes } from "src/core";
import { Catalog } from "src/product/models/catalog";
import CatalogItem from "src/product/components/CatalogItem";
import { Text } from "../../core/components";
import { FC } from "react";

export type CatalogProps = {
  catalogs: Catalog[];
  isMediaLoading: boolean;
};

export const CatalogComponent: FC<CatalogProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const t = useTranslations("home");

  const renderCatalog = () =>
    isDesktop ? (
      <Box
        display="flex"
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        flexDirection={"row"}
      >
        {props.catalogs.slice(0, 6).map((catalog: any, i) => (
          <NextLink
            key={catalog?.id}
            href={routes.products(
              {},
              {
                productCatalogIds: catalog?.id,
              }
            )}
          >
            <Box
              maxWidth={150}
              key={`catalog-${i}`}
              style={{ cursor: "pointer" }}
            >
              <Box>
                <Image
                  src={catalog?.imageUpload?.url}
                  alt={catalog?.name}
                  height={150}
                  width={150}
                  className="circle-3"
                  key={i}
                />
              </Box>
              <Box pt={1}>
                <Text lineClamp="2">
                  <Typography
                    textAlign="center"
                    component="h3"
                    variant="h5"
                    lineHeight="20px"
                    sx={{ lineClamp: 2 }}
                  >
                    {catalog?.name}
                  </Typography>
                </Text>
              </Box>
            </Box>
          </NextLink>
        ))}
      </Box>
    ) : (
      <Box
        display="flex"
        sx={{
          overflowX: "scroll",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
        }}
      >
        {props.catalogs?.length > 0 &&
          props.catalogs?.map((catalog: any) => {
            return (
              <Box key={catalog?.id} mr="16px">
                <NextLink href={routes.productCatalog({ id: catalog.id })}>
                  <a style={{ scrollSnapAlign: "start" }}>
                    <CatalogItem
                      imgSrc={catalog?.imageUpload?.url}
                      imgAlt={catalog?.name}
                      name={catalog?.name}
                    />
                  </a>
                </NextLink>
              </Box>
            );
          })}
      </Box>
    );

  return props.catalogs?.length > 0 ? (
    !isDesktop ? (
      <Box
        p={{ xs: "32px 16px" }}
        component="section"
        mx="auto"
        maxWidth="1240px"
      >
        {props.catalogs?.length > 0 ? (
          <>
            <Typography variant="h1" component="h2" pb="32px">
              {t("catalog")}
            </Typography>
            {props.isMediaLoading ? <Box /> : renderCatalog()}
          </>
        ) : (
          <></>
        )}
      </Box>
    ) : (
      <Box
        p={{ xs: "32px 16px" }}
        component="section"
        mx="auto"
        maxWidth="1240px"
      >
        {props.catalogs?.length > 0 ? (
          <>
            <Box display="flex" mb="24px" justifyContent="space-between">
              <Typography variant="h3" component="h2" fontWeight={500}>
                {t("catalog")}
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
            {props.isMediaLoading ? <Box /> : renderCatalog()}
          </>
        ) : (
          <></>
        )}
      </Box>
    )
  ) : (
    <></>
  );
};
