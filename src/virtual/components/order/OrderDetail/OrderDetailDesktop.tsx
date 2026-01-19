import { FC, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  useMediaQuery,
  Modal,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import NextLink from "next/link";
import NextImage from "next/image";
import Router from "next/router";

import {
  useResource,
} from "src";
import { useTranslations, useIntl } from "next-intl";

import { Order, OrderModel } from "src/order/models";
import { OrderStepper } from "../OrderStepper";
// import { SlipUploadModal } from "../SlipUploadModal";
import { PaymentMethodType } from "src/order/models/enum/invoice";
import { useToast } from "src/core/hooks/useToast";
import { ImageUpload } from "src/product";
import { DefaultLayout, DefaultLayoutProp } from "src/core/components/DefaultLayout";
import { MobileAppBar } from "src/core/components/MobileAppBar";
import ChevronLeftIcon from "src/core/components/ChevronLeftIcon";

export type OrderDetailDesktopProps = DefaultLayoutProp & {
  order: OrderModel;
};

export const OrderDetailDesktop: FC<OrderDetailDesktopProps> = (props) => {
  const t = useTranslations("order.orderDetail");
  const intl = useIntl();
  const resource = useResource();
  const toast = useToast();

  const [slipOpen, setSlipOpen] = useState(false);
  const [onLoading, setOnLoading] = useState(false);
  const [cancelReason, setCancelReason] = useState("editOrderDetail");
  const [cancelByMobileOpen, setCancelByMobileOpen] = useState(false);

  const handleChangeCancelReason = (event: SelectChangeEvent) => {
    setCancelReason(event.target.value);
  };

  const openCancelByMobile = () => setCancelByMobileOpen(true);
  const closeCancelByMobile = () => setCancelByMobileOpen(false);

  const onSlipUploadSubmit = () => {
    () => setSlipOpen(false);
  };

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
          cancelReason: cancelReason
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

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <DefaultLayout
      {...props}
      appBar={!isDesktop && <MobileAppBar title={t("orderHistory")} />}
    >
      {/* <SlipUploadModal
        banks={banks}
        open={slipOpen}
        onClose={() => setSlipOpen(false)}
        total={59_999}
        onSubmit={onSlipUploadSubmit}
      /> */}
      <Box mt="80px" mb="57px">
        <Box display="flex">
          <NextLink href="/me/orders">
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </NextLink>
          <Typography variant="h1" component="h1" pl="8px">
            {t("orderHistory")}
          </Typography>
        </Box>
        <Box
          px="32px"
          py="40px"
          border="1px solid"
          borderColor="grey.100"
          borderRadius="8px"
          width="100%"
          mt="48px"
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h2" fontWeight="light">
              Order {props.order.number}
            </Typography>
            {/* <Typography variant="h2" fontWeight="light">
              {useTranslations("order.orderList")(
                "status." + props.order.status
              )}
            </Typography> */}
          </Box>

          <OrderStepper status={props.order.status} />
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, 1fr)"
            bgcolor="#FAFAFB"
            border="1px solid #E5E7EB"
            width="100%"
            p="32px"
            mt="24px"
            gap="60px 24px"
            borderRadius="8px"
          >
            <Box>
              <Typography variant="h4">{t("status")}</Typography>
              <Box width="100%" height="1px" bgcolor="grey.100" my="28px" />
              <Typography variant="h4" fontWeight="light">
                {useTranslations("order.orderStepper")(props.order.status)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4">{t("orderDate")}</Typography>
              <Box width="100%" height="1px" bgcolor="grey.100" my="28px" />
              <Typography variant="h4" fontWeight="light">
                {intl.formatDateTime(new Date(props.order.orderedAt))}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4">{t("paymentChannel")}</Typography>
              <Box width="100%" height="1px" bgcolor="grey.100" my="28px" />
              <Typography variant="h4" fontWeight="light">
                {
                  props.order.invoice.paymentMethodType ===
                  PaymentMethodType.BANK_ACCOUNT
                  && "โอนเงินผ่านธนาคาร"
                }
                {
                  props.order.invoice.paymentMethodType ===
                  PaymentMethodType.CASH
                  && "เงินสด"
                }
                {
                  props.order.invoice.paymentMethodType ===
                  PaymentMethodType.OMISE
                  && "บัตรเครดิต"
                }
                {
                  props.order.invoice.paymentMethodType ===
                  PaymentMethodType.PAYPAL
                  && "Paypal"
                }
                {
                  props.order.invoice.paymentMethodType ===
                  PaymentMethodType.PROMPTPAY
                  && "พร้อมเพย์"
                }
                {
                  props.order.invoice.paymentMethodType ===
                  PaymentMethodType.SHOPDITPAY_AIRPAY
                  && "Shopee Pay"
                }
                {
                  props.order.invoice.paymentMethodType ===
                  PaymentMethodType.SHOPDITPAY_BAYBANK
                  && "KMA (กรุงศรีโมบายแอป)"
                }
                {
                  props.order.invoice.paymentMethodType ===
                  PaymentMethodType.SHOPDITPAY_BBL
                  && "Bualuang mBanking"
                }
                {
                  props.order.invoice.paymentMethodType ===
                  PaymentMethodType.SHOPDITPAY_CREDIT_CARD
                  && "บัตรเครดิต"
                }
                {
                  props.order.invoice.paymentMethodType ===
                  PaymentMethodType.SHOPDITPAY_LINEPAY
                  && "Line Pay"
                }
                {
                  props.order.invoice.paymentMethodType ===
                  PaymentMethodType.SHOPDITPAY_SCB_EASY
                  && "SCB EASY"
                }
                {
                  props.order.invoice.paymentMethodType ===
                  PaymentMethodType.SHOPDITPAY_TRUEMONEY
                  && "Truemoney"
                }
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4">{t("paymentDate")}</Typography>
              <Box width="100%" height="1px" bgcolor="grey.100" my="28px" />
              <Typography variant="h4" fontWeight="light">
                {props.order.invoice.paymentAt
                  ? intl.formatDateTime(new Date(props.order.invoice.paymentAt))
                  : "-"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4">{t("shipmentChannel")}</Typography>
              <Box width="100%" height="1px" bgcolor="grey.100" my="28px" />
              <Typography variant="h4" fontWeight="light">
                {props.order.orderShipment?.merchantShipment?.name
                  ? props.order.orderShipment.merchantShipment.name
                  : "-"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4">{t("trackingNumber")}</Typography>
              <Box width="100%" height="1px" bgcolor="grey.100" my="28px" />
              <Typography variant="h4" fontWeight="light">
                {props.order.orderShipment?.number || "-"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4">{t("shipmentDate")}</Typography>
              <Box width="100%" height="1px" bgcolor="grey.100" my="28px" />
              <Typography variant="h4" fontWeight="light">
                {props.order.orderShipment?.shipedAt
                  ? intl.formatDateTime(
                    new Date(props.order.orderShipment.shipedAt)
                  )
                  : "-"}
              </Typography>
            </Box>
            {/* <Box>
              <Typography variant="h3">{t("receiveDate")}</Typography>
              <Box width="100%" height="1px" bgcolor="grey.100" my="28px" />
              <Typography variant="h4" fontWeight="light">
                {useTranslations("order.orderStepper")(props.order.status)}
              </Typography>
            </Box> */}
          </Box>
          <Box
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor="grey.100"
            mt="24px"
            py="24px"
          >
            <Box display="flex" justifyContent="space-between" mb="30px">
              <Typography variant="h2" fontWeight="light">
                {t("orderItem")}
              </Typography>
              <Typography variant="h4" fontWeight="light">
                {t("items", { item: props.order.orderItems.length })}
              </Typography>
            </Box>
            {props.order.orderItems.map((orderItem: any) => (
              <Box key={orderItem.id} display="flex" pt="8px" pb="24px">
                <Box width="140px" height="140px" mr="16px">
                  <NextImage
                    className="rounded-2"
                    src={
                      orderItem.productItem?.product?.productImages?.find((image: ImageUpload) => image.order === 0)
                        ?.imageUpload?.url ?? ""
                    }
                    width={140}
                    height={140}
                    priority={true}
                  />
                </Box>
                <Box flex="1">
                  <Box display="flex" flexDirection="column" height="100%">
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h4" width="560px" fontWeight="light">
                        ({orderItem?.productItem?.slug || orderItem?.productItem?.product?.slug}) - {orderItem?.productItem?.product?.name}
                      </Typography>
                      {/* <Box display="flex" justifyContent="flex-end" mt="12px">
                        <Typography color="grey.200">
                          ฿{intl.formatNumber(orderItem.price)}
                        </Typography>
                      </Box> */}
                    </Box>
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
            ))}
          </Box>
          <Box display="flex" justifyContent="space-between" py="24px">
            <Typography variant="h2">{t("subtotal")}</Typography>
            <Typography variant="h2" fontWeight="600">
              ฿{intl.formatNumber(props.order.invoice.totalPrice)}
            </Typography>
          </Box>
          {props.order.status === "pendingPayment" && (
            <OrderPaymentDetail
              order={props.order}
              // onUploadSlipClick={() => setSlipOpen(true)}
              onUploadSlipClick={() =>
                Router.push(`/me/orders/${props.order.number}/payment`)
              }
            />
          )}
          {["pendingVerify", "prepareProduct"].includes(props.order.status) && (
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                disabled
                disableElevation
                sx={{ py: "16px" }}
              >
                ได้รับสินค้าแล้ว
              </Button>
            </Box>
          )}
          {["shipping"].includes(props.order.status) && (
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                disableElevation
                sx={{ py: "16px", minWidth: "200px" }}
                onClick={() => onSubmitOrder()}
                disabled={onLoading}
              >
                {onLoading ? (
                  <CircularProgress color="info" />
                ) : (
                  "ได้รับสินค้าแล้ว"
                )}
              </Button>
            </Box>
          )}
          {["success"].includes(props.order.status) && (
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="outlined"
                disableElevation
                sx={{ py: "16px", minWidth: "200px" }}
                onClick={() => reOrder()}
              >
                ซื้ออีกครั้ง
              </Button>
            </Box>
          )}
        </Box>
        <Box display="grid" mt="32px" gridTemplateColumns="2fr 1fr" gap="64px">
          <Box>
            <Box
              border="1px solid"
              borderColor="grey.100"
              p="32px"
              borderRadius="8px"
            >
              <Typography variant="h2">ที่อยู่จัดส่ง</Typography>
              <Box height="1px" bgcolor="grey.100" my="24px" />
              <Typography>{props.order.customerAddress.name}</Typography>
              <Typography fontWeight="light">
                {props.order.customerAddress.fullName} (
                {props.order.customerAddress.tel})
              </Typography>
              <Typography fontWeight="light">
                {[
                  props.order.customerAddress.address,
                  props.order.customerAddress.subdistrictAddress,
                  props.order.customerAddress.districtAddress,
                  props.order.customerAddress.provinceAddress,
                  props.order.customerAddress.postCodeAddress,
                ]
                  .filter((string) => string?.length)
                  .join(", ")}
              </Typography>
            </Box>
          </Box>

          <Box
            border="1px solid"
            borderColor="grey.100"
            p="32px"
            borderRadius="8px"
          >
            <Typography variant="h2">สรุปรายการสั่งซื้อ</Typography>
            <Box height="1px" bgcolor="grey.100" my="24px" />
            <Box display="flex" justifyContent="space-between" py="16px">
              <Typography variant="h4">ราคารวมสินค้า</Typography>
              <Typography variant="h4">
                ฿{intl.formatNumber(props.order.invoice.productPrice)}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" py="16px">
              <Typography variant="h4">ค่าจัดส่ง</Typography>
              <Typography variant="h4">
                ฿{intl.formatNumber(props.order.invoice.shipmentPrice)}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" py="16px">
              <Typography variant="h4">ส่วนลดที่ได้</Typography>
              <Typography variant="h4" color="red.50">
                ฿{intl.formatNumber(props.order.invoice.productDiscountPrice)}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" py="16px">
              <Typography variant="h2" fontWeight="600">
                ยอดเงินที่ต้องชำระ
              </Typography>
              <Typography variant="h2" fontWeight="600">
                ฿{intl.formatNumber(props.order.invoice.totalPrice)}
              </Typography>
            </Box>
            {["pendingPayment"].includes(props.order.status) && (
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="error"
                  disableElevation
                  sx={{ py: "8px", minWidth: "100%", mt: "16px" }}
                  onClick={openCancelByMobile}
                  disabled={onLoading}
                >
                  {onLoading ? (
                    <CircularProgress color="info" />
                  ) : (
                    "ยกเลิกคำสั่งซื้อ"
                  )}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Modal
        open={cancelByMobileOpen}
        onClose={closeCancelByMobile}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            borderRadius: "8px",
            minWidth: "720px",
            p: 4,
          }}
        >
          <Box px="16px" pt="24px">
            <Typography mb="8px">เหตุผลที่ต้องการยกเลิก</Typography>
            <Select onChange={handleChangeCancelReason} value={cancelReason} sx={{ width: "100%" }}>
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
              <MenuItem key="otherOrChangeYourMind" value="otherOrChangeYourMind">
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
      </Modal>
    </DefaultLayout>
  );
};

const OrderPaymentDetail: FC<{
  order: OrderModel;
  onUploadSlipClick: () => any;
}> = (props) => {
  const t = useTranslations("order.orderPaymentDetail");

  return (
    <Box>
      <Typography
        variant="h2"
        fontWeight="600"
        borderTop="1px solid"
        borderColor="grey.100"
        pt="24px"
      >
        {t("title")}
      </Typography>
      {props.order.invoice?.paymentMethodType ===
        PaymentMethodType.BANK_ACCOUNT &&
        props.order.invoice?.merchantBankAccountPaymentMethod && (
          <Box
            key={props.order.invoice.merchantBankAccountPaymentMethod.id}
            display="flex"
            py="26px"
          >
            <Box
              mr="18px"
              className={`bank-${props.order.invoice.merchantBankAccountPaymentMethod.bank.slug}`}
              p="4px"
            >
              <NextImage
                src={`/bank-svg/${props.order.invoice.merchantBankAccountPaymentMethod.bank.slug}.svg`}
                width={76}
                height={60}
                priority={true}
              />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="light">
                {props.order.invoice.merchantBankAccountPaymentMethod.bank.name}
              </Typography>
              <Typography variant="h4" py="4px" fontWeight="light">
                {t("bankAccount")}{" "}
                {props.order.invoice.merchantBankAccountPaymentMethod.name}
              </Typography>
              <Typography variant="h2" pt="8px">
                {[
                  props.order.invoice.merchantBankAccountPaymentMethod.number.slice(
                    0,
                    3
                  ),
                  props.order.invoice.merchantBankAccountPaymentMethod.number.slice(
                    3,
                    6
                  ),
                  props.order.invoice.merchantBankAccountPaymentMethod.number.slice(
                    6
                  ),
                ].join(" ")}
              </Typography>
            </Box>
          </Box>
        )}
      {props.order.invoice?.paymentMethodType === PaymentMethodType.PROMPTPAY &&
        props.order.invoice?.merchantPromptpayPaymentMethod && (
          <Box
            key={props.order.invoice.merchantPromptpayPaymentMethod.id}
            display="flex"
            py="26px"
          >
            <Box>
              <Typography variant="h3" fontWeight="light">
                พร้อมเพย์
              </Typography>
              <Typography variant="h4" fontWeight="light" pt="8px">
                {props.order.invoice.merchantPromptpayPaymentMethod.name}
              </Typography>
              <Typography variant="h2" pt="8px">
                {props.order.invoice.merchantPromptpayPaymentMethod.number}
              </Typography>
              {props.order.invoice.merchantPromptpayPaymentMethod?.imageUpload
                ?.url && (
                  <Box
                    sx={{
                      position: "relative",
                      display: "block",
                      width: "200px",
                      height: "200px",
                    }}
                  >
                    <NextImage
                      src={
                        props.order.invoice.merchantPromptpayPaymentMethod
                          ?.imageUpload?.url
                      }
                      layout="fill"
                      objectFit="contain"
                      priority={true}
                    />
                  </Box>
                )}
            </Box>
          </Box>
        )}
      {props.order.invoice?.paymentMethodType === PaymentMethodType.CASH &&
        props.order.invoice?.merchantCashPaymentMethod && (
          <Box display="flex" py="26px">
            <Typography variant="h2" fontWeight="light">
              ชำระด้วยเงินสด
            </Typography>
          </Box>
        )}
      <Box display="flex" justifyContent="flex-end">
        <Box width="10px" />
        <Button
          disableElevation
          variant="contained"
          onClick={props.onUploadSlipClick}
          sx={{ py: "16px", borderRadius: "8px" }}
        >
          ทำรายการชำระเงิน
        </Button>
      </Box>
    </Box>
  );
};

export default OrderDetailDesktop;
