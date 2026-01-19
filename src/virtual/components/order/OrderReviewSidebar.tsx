import { FC, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  styled,
  TextField,
  IconButton,
  CircularProgress
} from "@mui/material";
import { useIntl, useTranslations } from "next-intl";

import { CouponModel } from "src/order/models";
import { CartItemModel, ChevronDownIcon } from "src/core";
import { CloseIcon } from "src/core";
import { OrderItemSidebar } from "./OrderItemSidebar";
import { InvoiceModel } from "src/order/models/InvoiceModel";
import { OrderShipmentModel } from "src/order/models/OrderShipmentModel";

export type OrderReviewSidebarProps = {
  expanded?: boolean;
  onExpanded: () => void;
  subTotal: number;
  discount: number;
  shipmentPrice: number;
  totalPrice: number;
  onChangeCoupon: () => any;
  coupon: CouponModel | null;
  onResetCoupon: () => any;
  onRedeem: (couponCode: string) => any;
  cartItems: CartItemModel[];
  currentCustomerAddressId: number;
  currentInvoiceAttributes: InvoiceModel;
  currentOrderShipmentAttributes: OrderShipmentModel;
  currentCouponId: number;
  onLoading: boolean;
};

export const OrderReviewSidebar: FC<OrderReviewSidebarProps> = (props) => {
  const t = useTranslations("order.orderReview.sidebar");
  const intl = useIntl();
  const [couponCode, setCouponCode] = useState(props.coupon?.code ?? "");

  useEffect(() => {
    setCouponCode(props.coupon?.code ?? "");
  }, [props.coupon?.id]);

  const onRedeemClick = () => {
    if (!couponCode) {
      return props.onResetCoupon();
    }

    return props.onRedeem(couponCode);
  };

  return (
    <Box border="1px solid" borderColor="grey.100" borderRadius="8px" px="24px">
      <Box pt="24px" pb="48px">
        <Typography variant="h2" fontWeight="600" textAlign="center">
          {t("title")}
        </Typography>
        <Accordion
          expanded={props.expanded}
          disableGutters
          elevation={0}
          onChange={props.onExpanded}
        >
          <AccordionSummary
            expandIcon={<ChevronDownIcon />}
            sx={{ py: "32px", px: 0 }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography variant="h2" fontWeight="300">
                {t("productList")}
              </Typography>
              <Typography variant="h5" mr="24px">
                {t("items", { item: props.cartItems?.length ?? 0 })}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {props.cartItems?.map((cartItem) => (
              <OrderItemSidebar
                key={cartItem.id}
                name={cartItem?.productItem?.product?.name}
                price={19_999}
                fullPrice={20_000}
                quantity={cartItem?.quantity}
                cartItem={cartItem}
                imageSrc={cartItem?.productItem?.imageUpload?.url || cartItem?.productItem?.product?.productImages?.find((image) => image.order === 0)?.imageUpload?.url || '/new-in-placeholder.svg'} />
            ))}
          </AccordionDetails>
        </Accordion>

        <Box borderTop="1px solid" borderColor="grey.100" my="24px"></Box>

        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Typography variant="h3" pr="72px" mt="12px">
            {t("coupon")}
          </Typography>
          <Box>
            <Box display="flex" height="45px" position="relative">
              <CouponTextField
                value={couponCode}
                disabled
                onChange={(event) => setCouponCode(event.target.value)}
              />
              {
                props.coupon && (
                  <Box
                    onClick={props.onResetCoupon}
                    sx={{
                      position: "absolute",
                      right: "120px",
                      top: "10px",
                      cursor: "pointer"
                    }}
                  >
                    x
                  </Box>
                )
              }
              <Button
                variant="contained"
                disableElevation
                onClick={props.onChangeCoupon}
                sx={{ borderRadius: "0 8px 8px 0", height: "100%", width: "150px" }}
              >
                {t("redeem")}
              </Button>
            </Box>
            <Box display="flex" justifyContent="space-between" my="24px">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {props.coupon && props.currentCouponId !== undefined && (
                  <>
                    <Typography variant="h6" color="primary" mr="8px">
                      ได้รับส่วนลด {intl.formatNumber(props.coupon?.value ?? 0)} {props.coupon.valueType === 'percent' ? '%' : '฿'}
                    </Typography>
                    <svg
                      width="16"
                      height="13"
                      viewBox="0 0 16 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.09091 9.63636L1.27273 5.81818L0 7.09091L5.09091 12.1818L16 1.27273L14.7273 0L5.09091 9.63636Z"
                        fill="black"
                      />
                    </svg>
                  </>
                )}
                {
                  props.coupon && props?.currentCouponId === undefined && (
                    <Typography variant="h6" color="primary" mr="4px">
                      ไม่สามารถใช้คูปองนี้ได้
                    </Typography>
                  )
                }
              </Box>
            </Box>
          </Box>
        </Box>
        <Box borderTop="1px solid" borderColor="grey.100" my="24px"></Box>
        <Box display="flex" justifyContent="space-between" py="24px">
          <Typography variant="h4">{t("subtotal")}</Typography>
          <Typography variant="h4">
            {intl.formatNumber(props.subTotal)} ฿
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" py="24px">
          <Typography variant="h4">{t("shipmentPrice")}</Typography>
          <Typography variant="h4">
            {intl.formatNumber(props.shipmentPrice)} ฿
          </Typography>
        </Box>
        {
          props.coupon && props.currentCouponId !== undefined && (
            <Box display="flex" justifyContent="space-between" py="24px">
              <Typography variant="h4">{t("discount")}</Typography>
              <Typography variant="h4" color="red.50">
                -{intl.formatNumber(props.discount)} ฿
              </Typography>
            </Box>
          )
        }
        <Box display="flex" justifyContent="space-between" py="24px">
          <Typography variant="h2" fontWeight="600">
            {t("total")}
          </Typography>
          <Typography variant="h2" fontWeight="600">
            {intl.formatNumber(props.subTotal + props.shipmentPrice - props.discount)} ฿
          </Typography>
        </Box>
        <Box borderTop="1px solid" borderColor="grey.100" my="24px"></Box>
        <Button
          variant="contained"
          disableElevation
          fullWidth
          type="submit"
          disabled={!(props.currentCustomerAddressId && props.currentInvoiceAttributes && props?.currentOrderShipmentAttributes) || props.onLoading}
          sx={{ py: "16px", borderRadius: "8px" }}
        >
          {
            props.onLoading ? (
              <CircularProgress color="info" />
            ) : (
              <Typography variant="h4">
                {
                  props.coupon && props?.currentCouponId === undefined ?
                  t("submitWithOutCoupon") :
                  t("submit")
                }
              </Typography>
            )
          }
        </Button>
      </Box>
    </Box>
  );
};

const CouponTextField = styled(TextField)({
  ".MuiInputBase-root": {
    borderRadius: "8px 0px 0px 8px",
    border: "1px solid grey.100",
    height: "45px",
  },
});
