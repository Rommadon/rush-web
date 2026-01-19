import { FC, useContext, useEffect, useState } from "react";
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

import { CouponModel } from "../models";
import { CartItemModel, ChevronDownIcon } from "src/core";
import { CloseIcon } from "src/core";
import { OrderItemSidebar } from "./OrderItemSidebar";
import { InvoiceModel } from "../models/InvoiceModel";
import { OrderShipmentModel } from "../models/OrderShipmentModel";
import { AuthContext } from "src/auth";

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
  onSetPoint?: any;
};

export const OrderReviewSidebar: FC<OrderReviewSidebarProps> = (props) => {
  const t = useTranslations("order.orderReview.sidebar");
  const intl = useIntl();
  const [couponCode, setCouponCode] = useState(props.coupon?.code ?? "");
  const [point, setPoint] = useState<undefined | number>(undefined);
  const [invoiceTotalPrice, setInvoiceTotalPrice] = useState(props.subTotal + props.shipmentPrice - props.discount - (point || 0));
  const { currentMerchant, profile } = useContext(AuthContext);

  useEffect(() => {
    setInvoiceTotalPrice(props.subTotal + props.shipmentPrice - props.discount - (point || 0));
  }, [props.subTotal, props.shipmentPrice, props.discount, point])

  useEffect(() => {
    setCouponCode(props.coupon?.code ?? "");
  }, [props.coupon?.id]);

  useEffect(() => {
    if (profile && point && profile?.customerWallet && point > profile?.customerWallet?.shopditPoint) {
      setPoint(profile?.customerWallet?.shopditPoint);
    }
  }, [profile, point])

  useEffect(() => {
    if (props.onSetPoint) {
      if (invoiceTotalPrice >= 0) {
        props.onSetPoint(point);
      } else {
        if (point) {
          const updatedPoint = (props.subTotal + props.shipmentPrice - props.discount);
          setPoint(updatedPoint);
          props.onSetPoint(updatedPoint);
        }
      }
    }
  }, [invoiceTotalPrice, point]);

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
            {props.cartItems?.map((cartItem, index) => (
              <OrderItemSidebar
                key={cartItem.id}
                name={cartItem?.productItem?.product?.name}
                index={index}
                sku={cartItem?.productItem?.product?.slug}
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
                sx={{ borderRadius: "0 8px 8px 0", height: "100%", width: "120px" }}
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
                      ได้รับส่วนลด {
                        intl.formatNumber(
                          props.coupon?.value ?? 0,
                          props.coupon.valueType !== 'percent' ? {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          } : {}
                        )} {props.coupon.valueType === 'percent' ? '%' : '฿'
                      }
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
        <Box borderTop="1px solid" borderColor="grey.100" mb="24px"></Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h3" sx={{
              textTransform: 'uppercase'
            }}>
              {currentMerchant?.data?.slug} POINT
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box width="25px" height="25px" color="white" bgcolor={"#00B900"} borderRadius="50%" textAlign="center" display="flex" alignItems="center" justifyContent="center">
              <Typography component="h2" variant="h3">
                P
              </Typography>
            </Box>
            <Typography component="h1" variant="h3" px="8px">
              {intl.formatNumber(profile?.customerWallet?.shopditPoint || 0)}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" py="24px">
          <TextField
            value={point}
            onChange={(e) => setPoint(+e.target.value)}
            fullWidth
            type="number"
            size="small"
            InputProps={{
              startAdornment: (
                <Box width="24px" height="18px" mr="16px" color="white" bgcolor={"#00B900"} borderRadius="50%" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                  <Typography component="h2" variant="h5">
                    P
                  </Typography>
                </Box>
              ),
            }}
          />
          <Button
            variant="contained"
            sx={{ py: "16px", px: "8px", borderRadius: "8px", height: "40px", marginLeft: '-10px', width: '150px' }}
            size="small"
            onClick={() => setPoint(profile?.customerWallet?.shopditPoint || 0)}
          >
            <Typography variant="h5">ใช้ทั้งหมด</Typography>
          </Button>
        </Box>
        <Box borderTop="1px solid" borderColor="grey.100" my="24px"></Box>
        <Box display="flex" justifyContent="space-between" py="24px">
          <Typography variant="h4">{t("subtotal")}</Typography>
          <Typography variant="h4">
            <Typography component="span" fontFamily="Roboto">
              ฿
            </Typography>
            {intl.formatNumber(
              props.subTotal,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" py="24px">
          <Typography variant="h4">{t("shipmentPrice")}</Typography>
          <Typography variant="h4">
            <Typography component="span" fontFamily="Roboto">
              ฿
            </Typography>
            {intl.formatNumber(
              props.shipmentPrice,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </Typography>
        </Box>
        {
          props.coupon && props.currentCouponId !== undefined && (
            <Box display="flex" justifyContent="space-between" py="24px">
              <Typography variant="h4">{t("discount")}</Typography>
              <Typography variant="h4" color="red.50">
                -<Typography component="span" fontFamily="Roboto">
                  ฿
                </Typography>
                {intl.formatNumber(
                  props.discount,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </Typography>
            </Box>
          )
        }
        {
          point && point > 0 ? (
            <Box display="flex" justifyContent="space-between" py="24px">
              <Typography variant="h4">ส่วนลดจากพอยท์</Typography>
              <Typography variant="h4" color="red.50">
                -<Typography component="span" fontFamily="Roboto">
                  ฿
                </Typography>
                {intl.formatNumber(
                  point,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </Typography>
            </Box>
          ) : ''
        }
        <Box display="flex" justifyContent="space-between" py="24px">
          <Typography variant="h2" fontWeight="600">
            {t("total")}
          </Typography>
          <Typography variant="h2" fontWeight="600">
            <Typography component="span" fontFamily="Roboto">
              ฿
            </Typography>
            {intl.formatNumber(
              invoiceTotalPrice,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </Typography>
        </Box>
        <Box borderTop="1px solid" borderColor="grey.100" my="24px"></Box>
        <Button
          variant="contained"
          disableElevation
          fullWidth
          type="submit"
          disabled={
            !(
              props.currentCustomerAddressId
              && props?.currentInvoiceAttributes?.paymentMethodType
              && props?.currentOrderShipmentAttributes
            ) || props.onLoading}
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
