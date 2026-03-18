import { FC, useState, useContext, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import NextImage from "next/image";
import { useIntl } from "next-intl";
import router from "next/router";

import { Product } from "../models";
import {
  getProductItemsPrice,
  getProductStock,
} from "../../../utils/calaulate";
import cartIcon from "public/icons/new-cart.svg";
import { CartContext } from "..";
import { ProductDetailDrawer } from "./ProductDetailDrawer";
import { routes, useAuth } from "src";
import { Text } from "../../core/components";
import { ProductBadges, ProductBadgesProps } from "./ProductBadges";

type BestSellerCardProps = ProductBadgesProps & {
  onClick?: () => any;
};

export const BestSellerCard: FC<Product & BestSellerCardProps> = (props) => {
  const intl = useIntl();
  const { cartData, currentMerchant } = useContext(CartContext);
  const { isAuth, openAuthModal } = useAuth();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [openOptionDrawer, setOpenOptionDrawer] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [badgeLeftText, setBadgeLeftText] = useState("");
  const [badgeRightText, setBadgeRightText] = useState("");

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
    <Box
      width={isDesktop ? "200px" : "155px"}
      maxHeight={isDesktop ? "320px" : "280px"}
      sx={{ cursor: "pointer" }}
    >
      <ProductDetailDrawer
        open={openOptionDrawer}
        onClose={() => setOpenOptionDrawer(false)}
        onOpen={() => setOpenOptionDrawer(true)}
        product={props}
        cart={cartData}
      />

      <Box
        height={isDesktop ? "200px" : "155px"}
        width={isDesktop ? "200px" : "155px"}
        borderRadius={isDesktop ? "0" : "8px"}
        position="relative"
        onClick={() => onClickProduct()}
      >
        {isOutOfStock && (
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
              variant="h3"
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
        )}
        <ProductBadges
          badgeLeftText={badgeLeftText}
          badgeRightText={badgeRightText}
        />
        {productImage ? (
          <NextImage
            className={isDesktop ? "" : "rounded-2"}
            src={
              productImage ??
              "https://staging-shopdit.s3.ap-southeast-1.amazonaws.com/376545-1699448874325"
            }
            width={272}
            height={272}
            blurDataURL={"/popular-product-thumbnail.jpg"}
            quality={70}
            alt={`${currentMerchant} - ${props?.name}`}
            objectFit="cover"
          />
        ) : (
          <Box
            width={isDesktop ? 200 : 155}
            height={isDesktop ? 200 : 155}
            bgcolor={"#f3f3f3"}
            className={isDesktop ? "" : "rounded-2"}
          ></Box>
        )}
      </Box>
      <Box onClick={onClickProduct} pt="8px">
        <Text lineClamp="2">
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
      <Box margin="auto">
        <Box display="flex" justifyContent="space-between" alignItems="center">
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
                  <Typography variant="h4" color="red.100" mr="8px">
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
                  <Typography variant="h4" color="red.100" mr="8px">
                    <Typography component="span" fontFamily="Roboto">
                      ฿
                    </Typography>
                    {intl.formatNumber(
                      productPrice?.minPrice?.priceOnDiscount,
                      {}
                    )}
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
  );
};
