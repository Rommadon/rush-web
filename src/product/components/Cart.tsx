import {
  Typography,
  Box,
  Button,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { FC, useState, useContext } from "react";
import { useTranslations, useIntl } from "next-intl";
import Router from "next/router";

import { CartContext, DefaultLayout, DefaultLayoutProp } from "src";
import { CartItem } from "./CartItem";
import { CartModel, useResource, MobileAppBar } from "src/core";
import { getProductPriceAndProductDiscountPrice, roundToTwo } from "utils/calaulate";

export type CartProps = DefaultLayoutProp & {
  cart: CartModel;
};

export const Cart: FC<CartProps> = (props) => {
  const t = useTranslations("product.cart");
  const { setCartData } = useContext(CartContext);
  const intl = useIntl();
  const resource = useResource();
  const [cartPrice, setCartPrice] = useState(
    getProductPriceAndProductDiscountPrice(props?.cart?.cartItems)
  );
  const [cart, setCart] = useState(props?.cart);
  const [onLoading, setOnLoading] = useState(false);

  const onFetch = async () => {
    const fetchCart = await resource.fetchResource("cart-public", {}, "");

    if (fetchCart && fetchCart?.data?.data) {
      const cartItems = fetchCart?.data?.data?.cartItems?.sort(
        (a: any, b: any) => a.id - b.id
      );
      const cartData = {
        ...fetchCart?.data?.data,
        cartItems,
      };
      setCartData(fetchCart?.data?.data);
      setCart(cartData);
      setCartPrice(getProductPriceAndProductDiscountPrice(cartItems));
    }
  };

  const goToOrderReview = () => {
    setOnLoading(true);
    Router.push("orders/create").then(() => {
      setOnLoading(false);
    });
  };

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <DefaultLayout
      {...props}
      titleMeta={'ตระกร้า'}
      onDisableLoading
      appBar={!isDesktop && <MobileAppBar title="ตะกร้าสินค้า" />}
      footer={
        !isDesktop ? (
          <Box position="sticky" bottom="0" bgcolor="white">
            <Box borderTop="1px solid" borderColor="grey.100" my="14px"></Box>
            <Box display="flex" justifyContent="space-between" px="16px">
              <Typography variant="h4" fontWeight="400">
                {t("total")}
              </Typography>
              <Typography variant="h4" fontWeight="400" color="red.50" pb="16px">
                <Typography variant="h4" component="span" fontFamily="Roboto" pr="2px">
                  ฿ 
                </Typography>
                {cartPrice.totalPrice === 0 ? '0.00' : (cartPrice.totalPrice).toFixed(2)}
              </Typography>
            </Box>
            <Box px="16px" pb="16px">
              <Button
                variant="contained"
                disableElevation
                fullWidth
                disabled={onLoading || cart?.cartItems?.length <= 0}
                sx={{ py: "16px", borderRadius: "8px" }}
                onClick={() => goToOrderReview()}
              >
                {onLoading ? (
                  <CircularProgress color="info" />
                ) : (
                  <Typography variant="h4" color="white">{t("submit")}</Typography>
                )}
              </Button>
            </Box>
          </Box>
        ) : null
      }
    >
      {isDesktop && (
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          py="80px"
          gap="64px"
        >
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              pb="48px"
            >
              <Typography variant="h1">Shopping Cart</Typography>
              <Typography variant="h4">
                {t("items", { item: cart?.cartItems?.length || 0 })}
              </Typography>
            </Box>
            {cart?.cartItems?.map((cartItem, index) => (
              <CartItem
                key={cartItem?.id}
                name={cartItem?.productItem?.product?.name}
                image={
                  cartItem?.productItem?.product?.productImages?.find(
                    (image) => image.order === 0
                  )?.imageUpload?.url || ""
                }
                cartItem={cartItem}
                onFetch={() => onFetch()}
              />
            ))}
          </Box>
          <Box
            border="1px solid"
            borderColor="grey.100"
            borderRadius="8px"
            p="24px"
          >
            <Typography variant="h2" textAlign="center">
              {t("title")}
            </Typography>

            <Box borderTop="1px solid" borderColor="grey.100" my="24px"></Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h2" fontWeight="600">
                {t("total")}
              </Typography>
              <Typography variant="h2" fontWeight="600">
                <Typography component="span" fontFamily="Roboto">
                  ฿
                </Typography>
                {intl.formatNumber(roundToTwo(cartPrice.totalPrice), {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>
            <Box borderTop="1px solid" borderColor="grey.100" my="24px"></Box>
            <Button
              variant="contained"
              disableElevation
              fullWidth
              disabled={onLoading || cart?.cartItems?.length <= 0}
              sx={{ py: "16px", borderRadius: "8px" }}
              onClick={() => goToOrderReview()}
            >
              {onLoading ? (
                <CircularProgress color="info" />
              ) : (
                <Typography variant="h4">{t("submit")}</Typography>
              )}
            </Button>
          </Box>
        </Box>
      )}
      {!isDesktop && (
        <Box px="16px">
          {cart?.cartItems?.map((cartItem, index) => (
            <CartItem
              key={cartItem?.id}
              name={cartItem?.productItem?.product?.name}
              image={
                cartItem?.productItem?.product?.productImages?.find(
                  (image) => image.order === 0
                )?.imageUpload?.url || ""
              }
              cartItem={cartItem}
              onFetch={() => onFetch()}
            />
          ))}
        </Box>
      )}
    </DefaultLayout>
  );
};

export default Cart;
