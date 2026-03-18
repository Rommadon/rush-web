import {
  FC,
  useState,
  useContext,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useIntl } from "next-intl";
import NextImage from "next/image";
import router from "next/router";

import { Text } from "../../core/components";
import { Product } from "../models";
import {
  getProductItemsPrice,
  getProductStock,
} from "../../../utils/calaulate";
import cartIcon from "public/icons/new-cart.svg";
import { ProductDetailDrawer } from "./ProductDetailDrawer";
import { CartContext } from "..";
import { routes, useAuth } from "src";
import { ProductBadges, ProductBadgesProps } from "./ProductBadges";

export const SummaryProductCard: FC<
  Product & {
    width?: number | string;
    height?: number | string;
    onClick?: () => any;
    badgeLeftText?: string;
    badgeRightText?: string;
    sizeLg?: boolean;
  } & ProductBadgesProps
> = (props) => {
  const intl = useIntl();
  const { cartData, currentMerchant } = useContext(CartContext);
  const { isAuth, openAuthModal } = useAuth();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const targetCurrentRef = useRef();
  const [width, setWidth] = useState(props.width ?? 220);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [openOptionDrawer, setOpenOptionDrawer] = useState(false);
  const [badgeLeftText, setBadgeLeftText] = useState("");
  const [badgeRightText, setBadgeRightText] = useState("");
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const onClickProduct = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const productImage = props?.productImages?.find((image) => image.order === 0)
    ?.imageUpload?.url;
  const productPrice = getProductItemsPrice(props.productItems);

  useLayoutEffect(() => {
    if (targetCurrentRef.current) {
      setDimensions({
        width: targetCurrentRef.current["offsetWidth"] || 220,
        height: targetCurrentRef.current["offsetHeight"] || 220,
      });
    }
  }, []);

  useEffect(() => {
    if (targetCurrentRef.current) {
      setDimensions({
        width: targetCurrentRef.current["offsetWidth"] || 220,
        height: targetCurrentRef.current["offsetHeight"] || 220,
      });
    }
  }, []);

  useEffect(() => {
    if (props && props.isPopular) {
      setBadgeLeftText("ขายดี");
    }

    setIsOutOfStock(getProductStock(props.productItems) > 0 ? false : true);
  }, [props]);

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

  return (
    <Box
      ref={targetCurrentRef}
      width={props.width ?? 220}
      // mx={badgeText ? '8px' : 'auto'}
      position={"relative"}
      mx={props.sizeLg ? "" : "auto"}
      style={{ cursor: "pointer" }}
    >
      <ProductDetailDrawer
        open={openOptionDrawer}
        onClose={() => setOpenOptionDrawer(false)}
        onOpen={() => setOpenOptionDrawer(true)}
        product={props}
        cart={cartData}
      />
      <ProductBadges
        badgeLeftText={badgeLeftText}
        badgeRightText={badgeRightText}
      />
      <Box
        width={isDesktop ? props.width || 220 : dimensions.width}
        height={isDesktop ? props.width || 220 : dimensions.width}
        borderRadius={isDesktop ? "0" : "8px"}
        overflow="hidden"
        onClick={() => onClickProduct()}
        position="relative"
      >
        {isOutOfStock && (
          <>
            <Box
              sx={{
                position: "absolute",
                zIndex: 2,
                backgroundColor: "black",
                height: isDesktop ? props.width || 220 : dimensions.width,
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
        {props?.productImages && productImage ? (
          <NextImage
            src={productImage}
            className={isDesktop ? "" : "rounded-2"}
            width={isDesktop ? props.width || 220 : dimensions.width}
            height={isDesktop ? props.width || 220 : dimensions.width}
            // priority={true}
            // unoptimized
            // placeholder="blur"
            blurDataURL={"/popular-product-thumbnail.jpg"}
            quality={70}
            alt={`${currentMerchant} - ${props?.name}`}
          />
        ) : (
          <NextImage
            src="/new-in-placeholder.svg"
            width={isDesktop ? props.width || 220 : dimensions.width}
            height={isDesktop ? props.width || 220 : dimensions.width}
            // priority={true}
            // unoptimized
          />
        )}
      </Box>
      <Box
        pt="8px"
        pb="8px"
        onClick={() => onClickProduct()}
        minHeight={"60px"}
      >
        <Text lineClamp="2">
          <Typography
            component="h2"
            variant={isDesktop ? (props.sizeLg ? "h2" : "h5") : "h4"}
            fontWeight="light"
            lineHeight="22px"
            sx={{ lineClamp: 2 }}
          >
            {props.name}
          </Typography>
        </Text>
      </Box>
      <Box marginTop="auto">
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
                  <Typography
                    variant={props.sizeLg ? "h2" : "h4"}
                    color="red.100"
                    mr="8px"
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
                    variant={props.sizeLg ? "h2" : "h4"}
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
                    variant={props.sizeLg ? "h2" : "h4"}
                    color="red.100"
                    mr="8px"
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
              </Box>
            </Box>
            {props?.soldQuantity > 0 && (
              <Box alignSelf="baseline">
                <Typography
                  variant={props.sizeLg ? "h2" : "h4"}
                  color="grey.400"
                >
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
