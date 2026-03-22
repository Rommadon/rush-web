import { FC, useContext, useState, useEffect } from "react";
import {
  Box,
  LinearProgress,
  linearProgressClasses,
  Typography,
  useMediaQuery,
  // styled
} from "@mui/material";
import NextImage from "next/image";
import { useIntl } from "next-intl";
import { styled } from "@mui/material/styles";
import router from "next/router";

import { getProductItemsPrice, getProductStock } from "utils/calaulate";
import cartIcon from "public/icons/new-cart.svg";
import { ProductFlashSale } from "../models/productFlashSale";
import { CartContext } from "..";
import { ProductDetailDrawer } from "./ProductDetailDrawer";
import { routes, useAuth } from "src";
import { Text } from "../../core/components";
import { ProductBadges, ProductBadgesProps } from "./ProductBadges";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "rgba(182, 190, 205, .2)",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 4,
    backgroundColor: "primary",
  },
}));

export type FlashSaleCardProps = ProductFlashSale &
  ProductBadgesProps & { onClick: () => any };

export const FlashSaleCard: FC<FlashSaleCardProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const intl = useIntl();
  const { cartData } = useContext(CartContext);
  const { isAuth, openAuthModal } = useAuth();

  const [openOptionDrawer, setOpenOptionDrawer] = useState(false);
  const [badgeLeftText, setBadgeLeftText] = useState("");
  const [badgeRightText, setBadgeRightText] = useState("");
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const productImage = props?.product?.productImages?.find(
    (image) => image.order === 0
  )?.imageUpload?.url;
  const productPrice = getProductItemsPrice(props?.product?.productItems);

  const onClickProduct = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const setOpenOptionDrawerOrLogin = () => {
    if (isAuth) {
      if (isDesktop) {
        router.push(routes.product({ slug: props.product?.slug }));
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
    if (props && props?.product?.isPopular) {
      setBadgeLeftText("ขายดี");
    }

    setIsOutOfStock(
      getProductStock(props.product.productItems) > 0 ? false : true
    );
  }, [props]);

  return (
    <>
      <ProductDetailDrawer
        open={openOptionDrawer}
        onClose={() => setOpenOptionDrawer(false)}
        onOpen={() => setOpenOptionDrawer(true)}
        product={props?.product}
        cart={cartData}
      />
      {isDesktop ? (
        <>
          <Box display="flex">
            <Box
              height="120px"
              width="120px"
              borderRadius="8px"
              onClick={onClickProduct}
              position="relative"
              mb="8px"
              sx={{ cursor: "pointer" }}
            >
              {/* {
                  isOutOfStock && (
                    <>
                      <Box sx={{
                        position: "absolute",
                        zIndex: 2,
                        backgroundColor: "black",
                        height: "100%",
                        width: "100%",
                        opacity: 0.5,
                        borderRadius: "8px"
                      }}>
                      </Box>
                      <Typography color="white" variant="h5" sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 3,
                      }}>สินค้าหมด</Typography>
                    </>
                  )
                } */}
              <ProductBadges
                badgeLeftText={badgeLeftText}
                badgeRightText={badgeRightText}
              />
              <NextImage  
                className="rounded-2"
                src={productImage ?? "/new-in-placeholder.svg"}
                width={120}
                height={120}
                priority={true}
                // placeholder="blur"
                blurDataURL={"/popular-product-thumbnail.jpg"}
                quality={70}
  unoptimized={true}
/>
            </Box>
            <Box
              pt="4px"
              px="8px"
              width="175px"
              height="120px"
              display="flex"
              flexDirection="column"
              sx={{
                flexGrow: 1,
              }}
            >
              <Box onClick={onClickProduct}>
                <Text
                  variant="h4"
                  lineClamp={"2"}
                  fontWeight="light"
                  lineHeight="22px"
                >
                  {props.product?.name}
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
                    alignItems="center"
                    onClick={() => onClickProduct()}
                  >
                    {productPrice?.minPrice?.priceOnDiscount ===
                      productPrice?.maxPrice?.priceOnDiscount && (
                      <Typography
                        variant="h3"
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
                      productPrice?.maxPrice?.discount && (
                        <Typography
                          variant="h3"
                          color="grey.100"
                          fontWeight="light"
                          sx={{ textDecoration: "line-through" }}
                        >
                          <Typography component="span" fontFamily="Roboto">
                            ฿
                          </Typography>
                          {intl.formatNumber(productPrice?.minPrice?.price, {})}
                        </Typography>
                      )}
                    {productPrice?.minPrice?.priceOnDiscount !==
                      productPrice?.maxPrice?.priceOnDiscount && (
                      <Typography
                        variant="h3"
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
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5" fontWeight="light"></Typography>
                    <Typography variant="h5" fontWeight="light">
                      ขายแล้ว {props.soldQuantity ?? 0}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <BorderLinearProgress variant="determinate" value={100} />
        </>
      ) : (
        <>
          <Box display="flex">
            <Box
              height="120px"
              width="120px"
              borderRadius="8px"
              onClick={onClickProduct}
              position="relative"
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
                      borderRadius: "8px",
                    }}
                  ></Box>
                  <Typography
                    color="white"
                    variant="h5"
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
                className="rounded-2"
                src={productImage ?? "/new-in-placeholder.svg"}
                width={120}
                height={120}
                priority={true}
                // placeholder="blur"
                blurDataURL={"/popular-product-thumbnail.jpg"}
                quality={70}
  unoptimized={true}
/>
            </Box>
            <Box
              pt="4px"
              px="8px"
              width="175px"
              height="120px"
              display="flex"
              flexDirection="column"
              sx={{
                flexGrow: 1,
              }}
            >
              <Box onClick={onClickProduct}>
                <Text
                  variant="h4"
                  lineClamp={"2"}
                  fontWeight="light"
                  lineHeight="22px"
                >
                  {props.product?.name}
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
                    alignItems="center"
                    onClick={() => onClickProduct()}
                  >
                    {productPrice?.minPrice?.priceOnDiscount ===
                      productPrice?.maxPrice?.priceOnDiscount && (
                      <Typography
                        variant="h3"
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
                      productPrice?.maxPrice?.discount && (
                        <Typography
                          variant="h3"
                          color="grey.100"
                          fontWeight="light"
                          sx={{ textDecoration: "line-through" }}
                        >
                          <Typography component="span" fontFamily="Roboto">
                            ฿
                          </Typography>
                          {intl.formatNumber(productPrice?.minPrice?.price, {})}
                        </Typography>
                      )}
                    {productPrice?.minPrice?.priceOnDiscount !==
                      productPrice?.maxPrice?.priceOnDiscount && (
                      <Typography
                        variant="h3"
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
                  <Box
                    width="20px"
                    height="20px"
                    onClick={() => setOpenOptionDrawerOrLogin()}
                  >
                    <NextImage  
                      src={cartIcon}
                      alt="cart icon"
                      width="20px"
                      height="20px"
                      priority={true}
  unoptimized={true}
/>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" mt="16px" mb="8px">
            <Typography variant="h5" fontWeight="light"></Typography>
            <Typography variant="h5" fontWeight="light">
              ขายแล้ว {props.soldQuantity ?? 0}
            </Typography>
          </Box>
          <BorderLinearProgress variant="determinate" value={100} />
        </>
      )}
    </>
  );
};
