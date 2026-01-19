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
import { OrderModel } from "../models";
import { PaymentMethodType } from "../models/enum/invoice";
import Router from "next/router";
import { ChevronRightIcon, routes } from "src";

export const OrderItem: FC<OrderModel & {}> = (props) => {
  const t = useTranslations("order.orderItem");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const intl = useIntl();

  let ctaText = "seeMore";

  if (props.status === "pendingPayment" && props.invoice?.paymentMethodType !== 'cash') {
    ctaText = "proceedPayment";
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
            คำสั่งซื้อ <Typography component="span" onClick={() => Router.push(`/me/orders/${props.number}`)} sx={{ cursor: "pointer" }}>{props.number}</Typography>
          </Typography>
          <Typography variant="h4" color="primary.main">
            {useTranslations("order.orderList")("status." + props.status)}
          </Typography>
        </Box>

        <Box
          // borderTop="1px solid"
          // borderBottom="1px solid"
          borderColor="grey.100"
          py="24px"
          pb="0"
        >
          {props.orderItems.map((orderItem, index) => {
            if (index === 0) {
              return (
                <Box key={orderItem.id} display="flex" pt="8px" pb="24px">
                  {
                    orderItem.productItem?.product?.productImages?.find(
                      (image) => image.order === 0
                    )?.imageUpload ? (
                      <Box width="100px" height="100px" mr="16px">
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
                        />
                      </Box>
                    ) : ''
                  }
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
                        <Box>
                          <Typography variant="h5" fontWeight="light">
                            หน่วย: {orderItem?.unit}
                            {
                              orderItem?.productItem?.primaryOptionsValue && `, ${orderItem?.productItem?.product?.productPrimaryOption?.name}: ${orderItem?.productItem?.primaryOptionsValue}`
                            }
                            {
                              orderItem?.productItem?.secondaryOptionsValue && `, ${orderItem?.productItem?.product?.productSecondaryOption?.name}: ${orderItem?.productItem?.secondaryOptionsValue}`
                            }
                          </Typography>
                          <Box display="flex" justifyContent="space-between">
                            <Box>
                              <Typography variant="h3" color="red.50">
                                <Typography component="span" fontFamily="Roboto">
                                  ฿
                                </Typography>
                                {orderItem.price.toFixed(2)}</Typography>
                            </Box>
                            <Typography variant="h3" textAlign="right">
                              x{orderItem.quantity}
                            </Typography>
                          </Box>
                        </Box>
                        {/* <Box display="flex" justifyContent="space-between">
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
                              <Typography component="span" fontFamily="Roboto">
                                ฿
                              </Typography>
                              {intl.formatNumber(
                                orderItem?.price * orderItem?.quantity
                              )}{" "}
                            </Typography>
                          </Box>
                        </Box> */}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
            }
          })}
        </Box>
        <Box display="flex" justifyContent="space-between" py="8px">
          <Typography
            variant="h4"
            fontWeight="light"
          >
            {t("paymentChannel")}
          </Typography>
          <Typography variant="h4">
            {
              props.invoice?.paymentMethodType ===
              PaymentMethodType.BANK_ACCOUNT
              && "โอนเงินผ่านธนาคาร"
            }
            {
              props.invoice?.paymentMethodType ===
              PaymentMethodType.CASH
              && "เงินสด"
            }
            {
              props.invoice?.paymentMethodType ===
              PaymentMethodType.OMISE
              && "บัตรเครดิต"
            }
            {
              props.invoice?.paymentMethodType ===
              PaymentMethodType.PAYPAL
              && "Paypal"
            }
            {
              props.invoice?.paymentMethodType ===
              PaymentMethodType.PROMPTPAY
              && "พร้อมเพย์"
            }
            {
              props.invoice?.paymentMethodType ===
              PaymentMethodType.SHOPDITPAY_AIRPAY
              && "Shopee Pay"
            }
            {
              props.invoice?.paymentMethodType ===
              PaymentMethodType.SHOPDITPAY_BAYBANK
              && "KMA (กรุงศรีโมบายแอป)"
            }
            {
              props.invoice?.paymentMethodType ===
              PaymentMethodType.SHOPDITPAY_BBL
              && "Bualuang mBanking"
            }
            {
              props.invoice?.paymentMethodType ===
              PaymentMethodType.SHOPDITPAY_CREDIT_CARD
              && "บัตรเครดิต"
            }
            {
              props.invoice?.paymentMethodType ===
              PaymentMethodType.SHOPDITPAY_LINEPAY
              && "Line Pay"
            }
            {
              props.invoice?.paymentMethodType ===
              PaymentMethodType.SHOPDITPAY_SCB_EASY
              && "SCB EASY"
            }
            {
              props.invoice?.paymentMethodType ===
              PaymentMethodType.SHOPDITPAY_TRUEMONEY
              && "Truemoney"
            }
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" py="24px" pt="8px">
          <Typography variant="h3" fontWeight="light">
            รวมทั้งสิ้น <Typography component="span" fontWeight="light">
                ({t("items", { item: props.orderItems.length })})
              </Typography>
          </Typography>
          <Typography variant="h2" fontWeight="600" fontStyle="italic">
            <Typography component="span" fontFamily="Roboto">
              ฿
            </Typography>
            {` ` + props.invoice?.totalPrice.toFixed(2)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          {["pendingPayment"].includes(props.status)  && props.invoice?.paymentMethodType !== 'cash' && (
            <Button
              variant="outlined"
              disableElevation
              sx={{ py: "16px", borderRadius: "8px", mr: "8px", width: "140px", height: "45px" }}
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
            sx={{ py: "16px", borderRadius: "8px", width: "170px", height: "45px"}}
            onClick={() => onActionOrder(ctaText)}
          >
            <Typography variant="h4" fontWeight="600">{t(ctaText)}</Typography>
          </Button>
        </Box>
      </Box>
    </ListItem>
  );
};

export default OrderItem;
