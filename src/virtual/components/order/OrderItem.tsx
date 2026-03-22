import { FC } from "react";
import {
  Box,
  Typography,
  ListItem,
  Button,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useTranslations, useIntl } from "next-intl";
import NextImage from "next/image";
import NextLink from "next/link";

import { OrderStepper } from "./OrderStepper";
import { OrderModel } from "src/order/models";
import Router from "next/router";
import { ChevronRightIcon, routes } from "src";

export const OrderItem: FC<OrderModel & {}> = (props) => {
  const t = useTranslations("order.orderItem");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const intl = useIntl();

  let ctaText = "seeMore";

  if (props.status === "pendingPayment") {
    ctaText = "proceedPayment";
  }

  if (props.status === "success") {
    ctaText = "buyAgain";
  }

  const onActionOrder = (status: string) => {
    if (status === "proceedPayment") {
      Router.push(`/me/orders/${props.number}/payment`);
    } else if (status === "buyAgain") {
      Router.push(`/orders/create?orderSlug=${props.number}`);
    } else {
      Router.push(`/me/orders/${props.number}`);
    }
  };

  return (
    <ListItem disablePadding sx={{ width: "100%" }}>
      <Box
        p="16px"
        py="24px"
        border={isDesktop ? "1px solid" : "none"}
        borderColor="grey.100"
        borderRadius={isDesktop ? "8px" : "0"}
        width="100%"
        bgcolor="white"
      >
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3" fontWeight="light">
            คำสั่งซื้อ <Typography component="span" color="blue.main" onClick={() => Router.push(`/me/orders/${props.number}`)} sx={{ cursor: "pointer" }}>{props.number}</Typography>
          </Typography>
          <Typography variant="h4">
            {useTranslations("order.orderList")("status." + props.status)}
          </Typography>
        </Box>

        <OrderStepper status={props.status} />
        <Box
          borderTop="1px solid"
          // borderBottom="1px solid"
          borderColor="grey.100"
          mt="24px"
          py="24px"
          pb="0"
        >
          <Box display="flex" justifyContent="space-between" mb="30px">
            <Typography variant="h2" fontWeight="light">
              {t("orderItem")}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="h4" fontWeight="light">
                {t("items", { item: props.orderItems.length })}
              </Typography>
              {!isDesktop && <NextLink href={routes.order({ number: props.number })}>
                <IconButton>
                  <ChevronRightIcon color="inherit" sx={{ fontSize: "10px" }} />
                </IconButton>
              </NextLink>}
            </Box>
          </Box>
          {props.orderItems.map((orderItem) => (
            <Box key={orderItem.id} display="flex" pt="8px" pb="24px">
              <Box width="140px" height="140px" mr="16px">
                <NextImage
                  className="rounded-2"
                  src={
                    orderItem.productItem?.product?.productImages?.find(
                      (image) => image.order === 0
                    )?.imageUpload?.url ?? ""
                  }
                  width={140}
                  height={140}
                  priority={true}
                  unoptimized={true}
                />
              </Box>
              <Box flex="1">
                <Box display="flex" flexDirection="column" height="100%">
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h4"
                      width={isDesktop ? "560px" : "auto"}
                      fontWeight="light"
                    >
                      ({orderItem?.productItem?.slug || orderItem?.productItem?.product?.slug}) - {orderItem?.productItem?.product?.name}
                    </Typography>
                    {/* <Box display="flex" justifyContent="flex-end" mt="12px">
                      <Typography color="grey.200">
                        ฿{intl.formatNumber(orderItem.price)}
                      </Typography>
                    </Box> */}
                  </Box>
                  <Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h5" textAlign="end" fontWeight="light">
                        {orderItem?.productItem?.primaryOptionsValue &&
                          `${orderItem?.productItem?.primaryOptionsValue}, `}
                        {orderItem?.productItem?.secondaryOptionsValue &&
                          `${orderItem?.productItem?.secondaryOptionsValue}, `}
                        จำนวน: {orderItem.quantity} {orderItem?.unit}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Typography
                          variant="h5"
                          textAlign="end"
                          mr="8px"
                          color="grey.200"
                          fontWeight="light"
                        >
                          {t("subtotal")}
                        </Typography>
                        <Typography variant="h3" textAlign="end">
                          ฿{intl.formatNumber(
                            orderItem?.price * orderItem?.quantity
                          )}{" "}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Box display="flex" justifyContent="space-between" py="24px" pt="8px">
          <Typography variant="h3" fontWeight="light">
            {t("total")}
          </Typography>
          <Typography variant="h2" fontWeight="600">
            ฿{intl.formatNumber(props.invoice.totalPrice)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          {["success", "pendingPayment"].includes(props.status) && (
            <Button
              variant="outlined"
              disableElevation
              sx={{ py: "16px", borderRadius: "8px", mr: "16px" }}
              onClick={() => onActionOrder("seeMore")}
            >
              <Typography variant="h4">{t("seeMore")}</Typography>
            </Button>
          )}
          <Button
            variant={
              ["seeMore", "proceedPayment"].includes(ctaText)
                ? "contained"
                : "contained"
            }
            disableElevation
            sx={{ py: "16px", borderRadius: "8px" }}
            onClick={() => onActionOrder(ctaText)}
          >
            <Typography variant="h4">{t(ctaText)}</Typography>
          </Button>
        </Box>
      </Box>
    </ListItem>
  );
};

export default OrderItem;
