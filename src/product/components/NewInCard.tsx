import { FC, useContext, useState, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import NextImage from "next/image";
import { useIntl } from "next-intl";
import router from "next/router";

import { Product } from "../models";
import { getProductItemsPrice, getProductStock } from "utils/calaulate";
import cartIcon from "public/icons/new-cart.svg";
import { CartContext } from "..";
import { ProductDetailDrawer } from "./ProductDetailDrawer";
import { routes, useAuth } from "src";
import { Text } from "src/core/components";
import { ProductBadges, ProductBadgesProps } from "./ProductBadges";

export type NewInCardProps = Product &
  ProductBadgesProps & {
    image?: string;
    name?: string;
    price?: number;
    fullPrice?: number;
    isLike?: boolean;
    onClick?: () => any;
  };

export const NewInCard: FC<NewInCardProps> = (props) => {
  const intl = useIntl();
  const { cartData, currentMerchant } = useContext(CartContext);
  const { isAuth, openAuthModal } = useAuth();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [openOptionDrawer, setOpenOptionDrawer] = useState(false);
  const [badgeLeftText, setBadgeLeftText] = useState("");
  const [badgeRightText, setBadgeRightText] = useState("");
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const productImage = props?.productImages?.find((image) => image.order === 0)
    ?.imageUpload?.url;
  const productPrice = getProductItemsPrice(props.productItems);

  const onClickProduct = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const setOpenOptionDrawerOrLogin = () => {
    if (isAuth) {
      if (isDesktop) {
        router.push(routes.product({ slug: props.slug }));
      } else {
        setOpenOptionDrawer(true);
      }
    } else {
      if (isDesktop) {
        openAuthModal();
      } else {
        router.push(routes.login());
      }
    }
  };

  useEffect(() => {
    if (
      productPrice?.minPrice?.priceOnDiscount &&
      productPrice?.minPrice?.priceOnDiscount !== productPrice?.minPrice?.price
    ) {
      const percentageDiscount = Math.floor(
        (productPrice?.minPrice?.discount / productPrice?.minPrice?.price) * 100
      );
      setBadgeRightText(`ลด ${percentageDiscount}%`);
    }
  }, [productPrice]);

  useEffect(() => {
    if (props && props.isPopular) {
      setBadgeLeftText("ขายดี");
    }

    setIsOutOfStock(getProductStock(props.productItems) > 0 ? false : true);
  }, [props]);

  return (
    <>
      <ProductDetailDrawer
        open={openOptionDrawer}
        onClose={() => setOpenOptionDrawer(false)}
        onOpen={() => setOpenOptionDrawer(true)}
        product={props}
        cart={cartData}
      />
      <Box display="flex">
        <Box
          height={isDesktop ? "170px" : "120px"}
          width={isDesktop ? "170px" : "120px"}
          borderRadius={isDesktop ? "0" : "8px"}
          position="relative"
          onClick={onClickProduct}
        >
          {/* {isOutOfStock && (
            <>
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  backgroundColor: "black",
                  height: "100%",
                  width: "100%",
                  opacity: 0.5,
                  borderRadius: isDesktop ? "0" : "8px",
                }}
              ></Box>
              <Typography
                color="white"
                variant={isDesktop ? "h3" : "h5"}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 3,
                }}
              >
                สินค้าหมด
              </Typography>
            </>
          )} */}
          <ProductBadges
            badgeLeftText={badgeLeftText}
            badgeRightText={badgeRightText}
          />
          <NextImage
            className={isDesktop ? "" : "rounded-2"}
            src={productImage ?? "/new-in-placeholder.svg"}
            width={isDesktop ? 170 : 120}
            height={isDesktop ? 170 : 120}
            // priority={true}
            // unoptimized
            // placeholder="blur"
            blurDataURL={"/popular-product-thumbnail.jpg"}
            quality={70}
            alt={`${currentMerchant} - ${props?.name}`}
          />
        </Box>
        <Box
          pt="4px"
          px="8px"
          width="160px"
          height={isDesktop ? "170px" : "120px"}
          display="flex"
          flexDirection="column"
        >
          <Box onClick={onClickProduct}>
            <Text lineClamp="3">
              <Typography
                component="h2"
                variant={isDesktop ? "h5" : "h4"}
                fontWeight="light"
                lineHeight="22px"
                sx={{ lineClamp: 2 }}
              >
                {props?.name}
              </Typography>
            </Text>
          </Box>
          <Box marginTop="auto">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                onClick={() => onClickProduct()}
              >
                <Box alignSelf="baseline">
                  <Box display="flex">
                    {productPrice?.minPrice?.priceOnDiscount ===
                      productPrice?.maxPrice?.priceOnDiscount && (
                      <Typography
                        variant="h4"
                        color="red.100"
                        mr="8px"
                        fontWeight="light"
                      >
                        <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(
                          productPrice?.minPrice?.priceOnDiscount,
                          {}
                        )}
                      </Typography>
                    )}
                    {productPrice?.minPrice?.priceOnDiscount ===
                      productPrice?.maxPrice?.priceOnDiscount &&
                    productPrice?.minPrice?.discount &&
                    productPrice?.maxPrice?.discount ? (
                      <Typography
                        variant="h4"
                        color="grey.100"
                        fontWeight="light"
                        sx={{ textDecoration: "line-through" }}
                      >
                        <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(productPrice?.minPrice?.price, {})}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {productPrice?.minPrice?.priceOnDiscount !==
                      productPrice?.maxPrice?.priceOnDiscount && (
                      <Typography
                        variant="h4"
                        color="red.100"
                        mr="8px"
                        fontWeight="light"
                      >
                        <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(
                          productPrice?.minPrice?.priceOnDiscount,
                          {}
                        )}{" "}
                      </Typography>
                    )}
                  </Box>
                </Box>
                {props?.soldQuantity > 0 && (
                  <Box alignSelf="baseline">
                    <Typography variant="h4" color="grey.400">
                      <Typography component="span" fontSize="12px">
                        ขายได้ {intl.formatNumber(props?.soldQuantity)} ชิ้น
                      </Typography>
                    </Typography>
                  </Box>
                )}
              </Box>
              {isDesktop ? (
                <></>
              ) : (
                <Box
                  width="20px"
                  height="20px"
                  alignSelf="baseline"
                  onClick={() => setOpenOptionDrawerOrLogin()}
                >
                  <NextImage
                    src={cartIcon}
                    alt="cart icon"
                    width="20px"
                    height="20px"
                    priority={true}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
