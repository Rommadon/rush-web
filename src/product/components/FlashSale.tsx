import {
  Typography,
  Box,
  Button,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { FC, useContext } from "react";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import router from "next/router";

import {
  DefaultLayout,
  DefaultLayoutProp,
  FlashSale,
  FlashSaleCard,
  FlashSaleCountDown,
  routes,
  MobileAppBar,
  ArrowLeftIcon,
  CartIcon,
  CartContext,
} from "src";

export type FlashSaleProps = DefaultLayoutProp & {
  flashSale: FlashSale;
};

export const FlashSaleComponent: FC<FlashSaleProps> = (props) => {
  const endedAt = new Date(props?.flashSale?.endDate);
  const t = useTranslations("product.flashSale");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { cartData } = useContext(CartContext);

  return (
    <DefaultLayout
      {...props}
      titleMeta="แฟลซเซล"
      appBar={
        isDesktop ? null : (
          <MobileAppBar
            title={t("title")}
            right={
              <>
                <NextLink href={routes.cart()}>
                  <IconButton sx={{ color: 'black' }}>
                    <CartIcon />
                  </IconButton>
                </NextLink>
                {
                  cartData?.cartItems?.length > 0 && (
                    <Box height="7px" width="7px" bgcolor="red.50" position="absolute" borderRadius="50%" right="26px" top="26px" border="1px solid #ffffff"/>
                  )
                }
              </>
            }
          />
        )
      }
    >
      <Box
        display="flex"
        justifyContent="space-between"
        my="32px"
        {...(isDesktop ? { pt: '64px' } : { px: "16px", pt: '16px' })}
      >
        {isDesktop && (
          <Typography component="h1" variant="h1">
            {t("title")}
          </Typography>
        )}
        {props?.flashSale &&
          <Box mx={isDesktop ? 'initial' : 'auto'}>
            <FlashSaleCountDown endedAt={endedAt} size="lg" />
          </Box>
        }
      </Box>
      <Box pb="58px">
        {props?.flashSale?.productFlashSales &&
          props?.flashSale?.productFlashSales.length > 0 ? (
          <Box
            display="grid"
            gridTemplateColumns={isDesktop ? "repeat(3, 1fr)" : "repeat(1, 1fr)"}
            gap="32px 16px"
            pb="58px"
            px={isDesktop ? '0' : '16px'}

          >
            {props?.flashSale?.productFlashSales?.map((flashSale) => (
              <Box key={flashSale?.product?.id}>
                <FlashSaleCard {...flashSale} onClick={() => router.push(routes.product({ slug: flashSale?.product?.slug }))} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            width="100%"
            py="100px"
            borderRadius="8px"
            boxShadow="0 2px 10px 0 rgb(1 27 42 / 12%)"
            bgcolor="grey.50"
          >
            <Typography variant="h1" textAlign="center">
              ไม่มีแฟลชเซลในช่วงเวลานี้
            </Typography>
            <Typography
              variant="h3"
              textAlign="center"
              py="16px"
              fontWeight="light"
            >
              คุณสามารถเลือกซื้อสินค้าอื่นๆที่น่าสนใจได้ง่ายๆเพียงกดปุ่มข้างล่าง
            </Typography>
            <Box textAlign="center" pt="8px">
              <Button
                variant="contained"
                disableElevation
                color="primary"
                onClick={() => router.push("/products")}
              >
                <Typography variant="h4" textAlign="center" py="8px">
                  เลือกซื้อสินค้าอื่นๆที่น่าสนใจ
                </Typography>
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </DefaultLayout>
  );
};

export default FlashSaleComponent;
