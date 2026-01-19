// @ts-nocheck
import { useIntl, useTranslations } from "next-intl";
import React, { FC, useState } from "react";
import {
  DefaultLayout,
  DefaultLayoutProp,
  MobileAppBar,
  OrderModel,
  useResource,
} from "src";
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  CircularProgress,
  SwipeableDrawer,
  Select,
  MenuItem,
} from "@mui/material";
import NextImage from "next/image";
import Router from "next/router";

import { OrderStepper } from "../OrderStepper";
import { formatTel } from "utils";
import { PaymentMethodType } from "../../models/enum/invoice";
import { routes } from "src/core";
import { useToast } from "src/core/hooks/useToast";

export type OrderDetailMobileProps = DefaultLayoutProp & {
  order: OrderModel;
};

export const OrderDetailMobile: FC<OrderDetailMobileProps> = (props) => {
  const t = useTranslations("order.orderDetail");
  const intl = useIntl();
  const toast = useToast();
  const resource = useResource();

  const [onLoading, setOnLoading] = useState(false);
  const [cancelReason, setCancelReason] = useState("editOrderDetail");
  const [cancelByMobileOpen, setCancelByMobileOpen] = useState(false);

  const handleChangeCancelReason = (event: SelectChangeEvent) => {
    setCancelReason(event.target.value);
  };

  const openCancelByMobile = () => setCancelByMobileOpen(true);
  const closeCancelByMobile = () => setCancelByMobileOpen(false);

  const onSubmitOrder = async () => {
    setOnLoading(true);

    try {
      await resource.updateResourceWithAction(
        "order-public",
        props.order.id,
        "submit",
        {}
      );
      Router.push(`/me/orders/${props.order.number}`).then(() => {
        toast.openToast("ยืนยันการได้รับสินค้าเรียบร้อยแล้ว", "success");
        setOnLoading(false);
      });
    } catch (error) {
      toast.openToast("ยืนยันการได้รับสินค้าไม่สำเร็จ", "error");
      setOnLoading(false);
    }
  };

  const onCancelOrder = async () => {
    setOnLoading(true);

    try {
      await resource.updateResourceWithAction(
        "order-public",
        props.order.id,
        "cancel",
        {
          cancelReason: cancelReason,
        }
      );
      Router.push(`/me/orders/${props.order.number}`).then(() => {
        toast.openToast("ยืนยันการยกเลิกคำสั่งซื้อเรียบร้อยแล้ว", "success");
        setOnLoading(false);
      });
    } catch (error) {
      toast.openToast("ยืนยันการยกเลิกคำสั่งซื้อไม่สำเร็จ", "error");
      setOnLoading(false);
    }
  };

  const reOrder = () => {
    Router.push(`/orders/create?orderSlug=${props.order.number}`);
  };

  const getPaymentMethod = (invoice: InvoiceModel) => {
    switch (invoice?.paymentMethodType) {
      case "cash":
        return "เงินสด";
      case "omise":
        return "บัตรเครดิต";
      case "shopditpayCreditCard":
        return "Shopdit Pay (บัตรเครดิต)";
      case "shopditpayLinepay":
        return "Shopdit Pay (Line Pay)";
      case "shopditpayAirpay":
        return "Shopdit Pay (Shopee Pay)";
      case "shopditpayScbEasy":
        return "Shopdit Pay (SCB EASY)";
      case "shopditpayBbl":
        return "Shopdit Pay (Bualuang mBanking)";
      case "shopditpayBaybank":
        return "Shopdit Pay (KMA กรุงศรีโมบายแอป)";
      case "shopditpayTruemoney":
        return "Shopdit Pay (True Money)";
      case "bankAccount":
        return (
          invoice?.merchantBankAccountPaymentMethod?.bank?.name +
          " (" +
          invoice?.merchantBankAccountPaymentMethod?.number +
          ")"
        );
      case "promptpay":
        return (
          "พร้อมเพย์ Promptpay" +
          " (" +
          invoice?.merchantPromptpayPaymentMethod?.number +
          ")"
        );
      default:
        break;
    }
  };

  const selectPushPage = (type: string) => {
    if (type === 'link-pay') {
      Router.push(`/link-pay/${props.order.publicUuid}/payment`)
      return
    }
    Router.push(`/me/orders/${props.order.number}/payment`)
    return
  }

  return (
    <DefaultLayout
      {...props}
      appBar={
        <MobileAppBar
          title={props.type !== 'link-pay' && t("orderHistory")}
          right={props.type === 'link-pay' && `Order ${props.order.number}`}
          onBackClick={() => Router.push(routes.orderList())}
          type={props.type}
        />
      }
    >
      <Box mb="16px">
        <OrderStepper status={props.order.status} />
      </Box>
      <Box
        borderTop="4px solid"
        borderBottom="4px solid"
        borderColor="grey.50"
        p="16px"
      >
        <Box display="flex" justifyContent="space-between">
          <Box width="30%">
            <Typography fontSize="12px">การจัดส่ง</Typography>
          </Box>
          <Box width="70%" textAlign="right">
            <Typography fontSize="12px" fontWeight="light">
              {props.order.orderShipment?.merchantShipment?.name
                ? props.order.orderShipment.merchantShipment.name
                : "-"}
            </Typography>
          </Box>
        </Box>
        {props.order?.orderShipment?.number && (
          <Box display="flex" justifyContent="space-between" mt="16px">
            <Box width="30%">
              <Typography fontSize="12px">{t("trackingNumber")}</Typography>
            </Box>
            <Box width="70%" textAlign="right">
              {props.order?.orderShipment?.number ? (
                <Typography fontSize="12px" mr="8px" fontWeight="light">
                  {props.order?.orderShipment?.number}
                  <Typography
                    color="primary"
                    fontSize="12px"
                    component="span"
                    pl="8px"
                  >
                    คัดลอก
                  </Typography>
                </Typography>
              ) : (
                <Typography fontSize="12px" mr="8px" fontWeight="light">
                  -
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>
      <Box borderBottom="4px solid" borderColor="grey.50" p="16px">
        <Typography fontSize="12px">ที่อยู่</Typography>
        <Typography fontSize="12px" mt="16px" fontWeight="light">
          {props.order.customer.fullName}{" "}
          {props.order.customer.tel &&
            ` (${formatTel(props.order.customer.tel)})`}
        </Typography>
        <Typography fontSize="12px" fontWeight="light">
          {props.order.customer.email}
        </Typography>
        <Typography fontSize="12px" fontWeight="light">
          {[
            props?.order?.customerAddress?.address || "-",
            props?.order?.customerAddress?.subdistrictAddress || "-",
            props?.order?.customerAddress?.districtAddress || "-",
            props?.order?.customerAddress?.provinceAddress || "-",
            props?.order?.customerAddress?.postCodeAddress || "-",
          ]
            ?.filter((string) => string?.length)
            ?.join(", ")}
        </Typography>
      </Box>
      <Box borderBottom="4px solid" borderColor="grey.50" pb="8px">
        <Box display="flex" justifyContent="space-between" p="16px">
          <Typography fontSize="12px">รายการสินค้า</Typography>

          <Typography fontSize="12px">
            <Typography
              color="primary"
              component="span"
              mr="4px"
              fontSize="12px"
            >
              {props.order?.orderItems?.length ?? 0}
            </Typography>
            รายการ
          </Typography>
        </Box>
        <Box maxHeight="384px" sx={{ overflowY: "scroll" }}>
          <List disablePadding>
            {props.order.orderItems.map((orderItem, i) => (
              <ListItem
                key={orderItem.id}
                disablePadding
                sx={{
                  px: "16px",
                }}
              >
                <Box
                  display="flex"
                  py="16px"
                  borderTop={i !== 0 ? "1px solid" : "0"}
                  borderColor="grey.50"
                >
                  <Box
                    width="96px"
                    height="96px"
                    overflow="hidden"
                    borderRadius="8px"
                  >
                    <NextImage
                      src={
                        orderItem.productItem?.product?.productImages?.find(
                          (image) => image.order === 0
                        )?.imageUpload?.url ?? "/new-in-placeholder.svg"
                      }
                      width={96}
                      height={96}
                    />
                  </Box>

                  <Box flex="1">
                    <Box display="flex" flexDirection="column" height="100%">
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          fontSize="12px"
                          ml="8px"
                          lineHeight="23px"
                          height="46px"
                          sx={{
                            display: "-webkit-box",
                            "-webkit-line-clamp": "1",
                            "-webkit-box-orient": "vertical",
                            overflow: "hidden",
                          }}
                        >
                          (
                          {orderItem?.productItem?.slug ||
                            orderItem?.productItem?.product?.slug}
                          ) - {orderItem?.productItem?.product?.name}
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="end"
                        ml="8px"
                      >
                        <Box textAlign="left">
                          <Typography fontSize="10px" pb="4px" color="grey.400">
                            หน่วย: {orderItem?.unit}
                          </Typography>
                          <Typography variant="h4" color="red.50">
                            <Typography
                              component="span"
                              fontFamily="Roboto"
                              variant="h4"
                              color="red.50"
                            >
                              ฿
                            </Typography>
                            {intl.formatNumber(
                              orderItem?.price * orderItem?.quantity
                            )}{" "}
                          </Typography>
                        </Box>
                        <Typography
                          variant="h5"
                          textAlign="end"
                          fontWeight="light"
                        >
                          {orderItem?.productItem?.primaryOptionsValue &&
                            `${orderItem?.productItem?.primaryOptionsValue}, `}
                          {orderItem?.productItem?.secondaryOptionsValue &&
                            `${orderItem?.productItem?.secondaryOptionsValue}, `}
                          x {orderItem.quantity}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box borderBottom="4px solid" borderColor="grey.50" p="16px">
        <Typography fontSize="12px">ช่องทางชำระเงิน</Typography>
        <Box display="flex" pt="10px">
          <Typography fontSize="12px" fontWeight="light">
            {getPaymentMethod(props.order?.invoice)}
          </Typography>
        </Box>
      </Box>
      <Box p="16px">
        <Typography fontSize="12px">หมายเหตุ</Typography>
        <Box
          pt="10px"
          style={{
            wordWrap: "break-word",
            fontWeight: "light",
            fontSize: "14px",
          }}
          fontWeight="light"
        >
          {props?.order?.note ?? "-"}
        </Box>
      </Box>
      <Box p="16px" borderTop="4px solid" borderColor="grey.50">
        <Box display="flex" justifyContent="space-between" pb="16px">
          <Typography fontSize="12px">หมายเลขคำสั่งซื้อ</Typography>
          {props.order?.number && (
            <>
              <Typography fontSize="12px" fontWeight="light">
                {props.order?.number}
                {/* <Typography color="primary" fontSize="12px" component="span" pl="8px" fontWeight="light">
                    คัดลอก
                  </Typography> */}
              </Typography>
            </>
          )}
        </Box>

        <Box display="flex" justifyContent="space-between" pb="16px">
          <Typography fontSize="12px">เวลาที่สั่งซื้อ</Typography>
          <Typography fontSize="12px" fontWeight="light">
            {new Date(props.order.orderedAt)?.toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" pb="16px">
          <Typography fontSize="12px">เวลาชำระเงิน</Typography>
          <Typography fontSize="12px" fontWeight="light">
            {props.order.invoice.paymentAt
              ? new Date(props.order.invoice.paymentAt)?.toLocaleDateString(
                  "th-TH",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
              : "-"}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" pb="16px">
          <Typography fontSize="12px">ราคารวมทั้งหมด</Typography>
          <Typography fontSize="12px" fontWeight="light">
            <Typography component="span" fontFamily="Roboto" fontSize="12px">
              ฿
            </Typography>
            {intl.formatNumber(props.order.invoice.productPrice)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" pb="16px">
          <Typography fontSize="12px">ค่าจัดส่ง</Typography>
          <Typography fontSize="12px" fontWeight="light">
            <Typography component="span" fontFamily="Roboto" fontSize="12px">
              ฿
            </Typography>
            {intl.formatNumber(props.order.invoice.shipmentPrice)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" pb="16px">
          <Typography fontSize="12px">ส่วนลดที่ได้</Typography>
          <Typography fontSize="12px" fontWeight="light" color="red.100">
            <Typography component="span" fontFamily="Roboto" fontSize="12px">
              ฿
            </Typography>
            {intl.formatNumber(props.order.invoice.productDiscountPrice)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" pb="16px">
          <Typography fontSize="12px">พอยท์ส่วนลด</Typography>
          <Typography fontSize="12px" color="red.50">
            <Typography component="span" fontFamily="Roboto" fontSize="12px">
              ฿
            </Typography>
            {intl.formatNumber(props.order.invoice.shopditPoint)}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" px="16px" py="0">
        <Typography fontSize="12px">รวมการสั่งซื้อ</Typography>
        <Typography fontSize="12px">
          <Typography component="span" fontFamily="Roboto" fontSize="12px">
            ฿
          </Typography>
          {intl.formatNumber(props.order.invoice.totalPrice)}
        </Typography>
      </Box>
      {props.order.status === "pendingPayment" && (
        <Box p="16px">
          <Button
            disableElevation
            variant="contained"
            onClick={() => selectPushPage(props.type)}
            sx={{ py: "16px", width: "100%", fontSize: "12px" }}
          >
            ชำระเงินตอนนี้
          </Button>
          {
            props.type !== 'link-pay' && (
              <Button
                variant="outlined"
                disableElevation
                color="error"
                sx={{ py: "16px", width: "100%", mt: "16px", fontSize: "12px" }}
                onClick={openCancelByMobile}
                disabled={onLoading}
              >
                {onLoading ? <CircularProgress color="info" /> : "ยกเลิกคำสั่งซื้อ"}
              </Button>
            )
          }
        </Box>
      )}
      {["pendingVerify"].includes(props.order.status) && (
        <Box p="16px">
          <Button
            variant="contained"
            disabled
            disableElevation
            sx={{ py: "16px", width: "100%", fontSize: "12px" }}
          >
            รอตรวจสอบการชำระเงิน
          </Button>
        </Box>
      )}
      {["prepareProduct"].includes(props.order.status) && (
        <Box p="16px">
          <Button
            variant="contained"
            disabled
            disableElevation
            sx={{ py: "16px", width: "100%", fontSize: "12px" }}
          >
            จัดเตรียมสินค้า
          </Button>
        </Box>
      )}
      {["shipping"].includes(props.order.status) && (
        <Box p="16px">
          <Button
            variant="contained"
            disableElevation
            sx={{ py: "16px", width: "100%", fontSize: "12px" }}
            onClick={() => onSubmitOrder()}
            disabled={onLoading}
          >
            {onLoading ? <CircularProgress color="info" /> : "กำลังจัดส่ง"}
          </Button>
        </Box>
      )}
      {["success"].includes(props.order.status) && (
        <Box p="16px">
          <Button
            variant="contained"
            disableElevation
            sx={{ py: "16px", width: "100%", fontSize: "12px" }}
            onClick={() => reOrder()}
          >
            ซื้ออีกครั้ง
          </Button>
        </Box>
      )}
      <SwipeableDrawer
        anchor={"bottom"}
        open={cancelByMobileOpen}
        onClose={closeCancelByMobile}
        onOpen={openCancelByMobile}
      >
        <Box
          sx={{
            width: "auto",
          }}
          role="presentation"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          <Box px="16px" pt="24px">
            <Typography mb="8px">เหตุผลที่ต้องการยกเลิก</Typography>
            <Select
              onChange={handleChangeCancelReason}
              value={cancelReason}
              sx={{ width: "100%" }}
            >
              <MenuItem key="editOrderDetail" value="editOrderDetail">
                ต้องการแก้ไขรายละเอียดคำสั่งซื้อ
              </MenuItem>
              <MenuItem key="changeAddress" value="changeAddress">
                ต้องการเปลี่ยนที่อยู่ในการจัดส่ง
              </MenuItem>
              <MenuItem key="changePayment" value="changePayment">
                ต้องการเปลี่ยนวิธีการชำระเงิน
              </MenuItem>
              <MenuItem key="editCoupon" value="editCoupon">
                ต้องการเพิ่ม/เปลี่ยนโค้ดส่วนลด
              </MenuItem>
              <MenuItem key="paymentComplicated" value="paymentComplicated">
                ขั้นตอนการชำระเงินซับซ้อนเกินไป
              </MenuItem>
              <MenuItem key="sellerNotRespond" value="sellerNotRespond">
                ผู้ขายไม่ตอบสนองการสอบถามข้อมูล
              </MenuItem>
              <MenuItem key="notToBuy" value="notToBuy">
                ไม่ต้องการซื้อสินค้านี้แล้ว
              </MenuItem>
              <MenuItem
                key="otherOrChangeYourMind"
                value="otherOrChangeYourMind"
              >
                อื่น ๆ หรือเปลี่ยนใจ
              </MenuItem>
            </Select>
          </Box>
          {props.order.status === "pendingPayment" && (
            <Box p="16px" pb="24px">
              <Button
                variant="outlined"
                disableElevation
                color="error"
                sx={{ py: "16px", width: "100%", mt: "16px" }}
                onClick={() => onCancelOrder()}
                disabled={onLoading}
              >
                {onLoading ? (
                  <CircularProgress color="info" />
                ) : (
                  "ยืนยันการยกเลิกคำสั่งซื้อ"
                )}
              </Button>
            </Box>
          )}
        </Box>
      </SwipeableDrawer>
    </DefaultLayout>
  );
};

export default OrderDetailMobile;
