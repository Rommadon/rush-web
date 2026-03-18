/* eslint-disable @next/next/no-img-element */
import { Box, Typography, useMediaQuery } from "@mui/material";
import NextImage from "next/image";
import { routes } from "src/core";
import NextLink from "next/link";
import { Text } from "../../core/components";
import { ProductBrand } from "../../product/models";
import CategoryItem from "src/product/components/CategoryItem";
import { useTranslations } from "next-intl";

export type BrandProps = {
  productBrands: ProductBrand[];
  isMediaLoading?: boolean;
};

export const BrandComponent = (props: BrandProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const t = useTranslations("home");

  const displayedBrands = props.productBrands?.slice(1) || [];

  const renderBrand = () =>
    isDesktop ? (
      <Box
        display="flex"
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        flexDirection={"row"}
      >
        {displayedBrands.length > 0
          ? displayedBrands.slice(0, 5).map((brand: any, i) => (
              <NextLink
                key={brand?.order ?? i}
                href={`/products?productBrandIds=${brand?.id}&tap=1`}
              >
                <Box sx={{ cursor: "pointer" }}>
                  <Box
                    height={isDesktop ? "200px" : "155px"}
                    width={isDesktop ? "200px" : "155px"}
                    borderRadius={isDesktop ? "0" : "8px"}
                    position="relative"
                  >
                    {brand?.logo?.url ? (
                      <NextImage
                        className={isDesktop ? "" : "rounded-2"}
                        src={brand.logo.url}
                        width={272}
                        height={272}
                        blurDataURL={"/popular-product-thumbnail.jpg"}
                        quality={70}
                        alt={brand?.name}
                        objectFit="cover"
                      />
                    ) : (
                      <Box width={200} height={200} bgcolor={"#f3f3f3"}></Box>
                    )}
                  </Box>
                  <Box pt="8px">
                    <Text lineClamp="2">
                      <Typography
                        component="h2"
                        variant={isDesktop ? "h5" : "h4"}
                        fontWeight="light"
                        lineHeight="22px"
                        sx={{ lineClamp: 2 }}
                        textAlign="center"
                      >
                        {brand?.name}
                      </Typography>
                    </Text>
                  </Box>
                </Box>
              </NextLink>
            ))
          : [1, 2, 3, 4]?.map((i) => (
              <Box
                width="100%"
                position="relative"
                height={isDesktop ? 200 : 100}
                bgcolor="grey.300"
                key={`brand-${i}`}
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
                    Brand
                  </Typography>
                </Box>
              </Box>
            ))}
      </Box>
    ) : (
      <Box
        display="grid"
        gridTemplateColumns={{ lg: "repeat(4, 1fr)", xs: "auto" }}
        gridTemplateRows={{ lg: "auto", xs: "1fr 1fr" }}
        gridAutoFlow={"column"}
        gap={2}
        sx={{
          overflowX: "scroll",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
        }}
      >
        {displayedBrands.length > 0
          ? displayedBrands.map((brand: any, i) => (
              <NextLink
                key={brand?.order ?? i}
                href={`/products?productBrandIds=${brand?.id}&tap=1`}
              >
                <a style={{ scrollSnapAlign: "start" }}>
                  <CategoryItem
                    imgSrc={brand?.logo?.url}
                    imgAlt={brand?.name}
                    name={brand?.name}
                  />
                </a>
              </NextLink>
            ))
          : [1, 2, 3, 4]?.map((i) => (
              <Box
                width="100%"
                position="relative"
                height={isDesktop ? 200 : 100}
                bgcolor="grey.300"
                key={`brand-${i}`}
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
                    Brand
                  </Typography>
                </Box>
              </Box>
            ))}
      </Box>
    );

  return displayedBrands.length > 0 ? (
    <Box
      p={{ xs: "32px 16px" }}
      component="section"
      mx="auto"
      maxWidth="1240px"
    >
      {isDesktop ? (
        <Box display="flex" mb="24px" justifyContent="space-between">
          <Typography variant="h3" component="h2" fontWeight={500}>
            แบรนด์
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
        <Typography variant="h1" component="h2" pb="32px">
          แบรนด์
        </Typography>
      )}
      {props.isMediaLoading ? <Box /> : renderBrand()}
    </Box>
  ) : (
    <></>
  );
};
