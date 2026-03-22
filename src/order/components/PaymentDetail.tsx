import {
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  useMediaQuery,
  IconButton
} from "@mui/material";
import { FC, useState, useRef, useEffect } from "react";
import { useResource } from "src";
import { useTranslations, useIntl } from "next-intl";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import NextImage from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ChevronLeftIcon from "src/core/components/ChevronLeftIcon";

import { useToast } from "src/core/hooks/useToast";
import { OrderModel } from "../models/OrderModel";
import { PaymentMethodType } from "../models/enum/invoice";
import { routes } from "src/core";
import {
  DefaultLayout,
  DefaultLayoutProp,
} from "src/core/components/DefaultLayout";
import { MobileAppBar } from "src/core/components/MobileAppBar";
import { InvoiceModel } from "../models/InvoiceModel";

export type PaymentDetailProps = DefaultLayoutProp & {
  order: OrderModel;
  type: string;
};

export const PaymentDetail: FC<PaymentDetailProps> = (props) => {
  const t = useTranslations("order.paymentDetail");
  const intl = useIntl();
  const [date, setDate] = useState<Date | null>(null);
  const slipRef = useRef(null);
  const router = useRouter();
  const toast = useToast();
  const resource = useResource();

  const [onLoading, setOnLoading] = useState(false);
  const [onUploadSlipMode, setOnUploadSlipMode] = useState(false);

  const onClickUpload = () => {
    // @ts-ignore
    slipRef.current?.click?.();
  };

  const { register, handleSubmit, setValue, watch } = useForm();

  const onSubmit = async (data: any) => {
    setOnLoading(true);
    try {
      let fd = await new FormData();
      const now = new Date();

      if (data.file) {
        await fd.append(
          "file",
          data.file,
          `${props.order.number}-payment-${data.paymentAt}`
        );
      }

      await fd.append(
        "paymentMethodType",
        props.order.invoice.paymentMethodType
      );
      await fd.append("paymentAt", data.paymentAt || now);
      await fd.append(
        "timePaymentAt",
        data.paymentAt
          ? data.paymentAt.toLocaleTimeString()
          : now.toLocaleTimeString()
      );

      if (props.order.invoice.merchantBankAccountPaymentMethod) {
        await fd.append(
          "merchantBankAccountPaymentMethodId",
          `${props?.order?.invoice?.merchantBankAccountPaymentMethod?.id}`
        );
      }

      if (props.order.invoice.merchantPromptpayPaymentMethod) {
        await fd.append(
          "merchantPromptpayPaymentMethodId",
          `${props?.order?.invoice?.merchantPromptpayPaymentMethod?.id}`
        );
      }

      if (props.order.invoice.merchantCashPaymentMethod) {
        await fd.append(
          "merchantCashPaymentMethodId",
          `${props?.order?.invoice?.merchantCashPaymentMethod?.id}`
        );
      }

      if (props.order.invoice.customerCreditCard) {
        await fd.append(
          "customerCreditCardId",
          `${props?.order?.invoice?.customerCreditCard?.id}`
        );
      }

      if (props.order.invoice.merchantShopditPaymentMethod) {
        await fd.append(
          "merchantShopditPaymentMethodId",
          `${props?.order?.invoice?.merchantShopditPaymentMethod?.id}`
        );
      }

      // if (props.type !== 'link-pay') {
      //   if (props.order.invoice.redirectUrl) {
      //     await fd.append(
      //       "redirectUrl",
      //       `${props?.order?.invoice?.merchantShopditPaymentMethod?.id}`
      //     );
      //   }
      // }

      let action, resourceId;

      if (props.type !== 'link-pay') {
        action = "pay";
        resourceId = props.order.id;
      } else {
        action = "publicPay";
        resourceId = props.order.publicUuid;
      }

      const result = await resource.updateResourceWithFormDataWithAction(
        "order-public",
        resourceId,
        action,
        fd
      );

      if (result && result.data && result.data.reference) {
        await router.push(result.data.reference);

        setOnLoading(false);
      } else {
        if (props.type !== 'link-pay') {
          await router.push(`/me/orders/${props.order.number}`);
        } else {
          await router.push(`/link-pay/${props.order.publicUuid}`);
        }

        if (
          props.order.invoice.paymentMethodType ===
            PaymentMethodType.SHOPDITPAY_AIRPAY ||
          props.order.invoice.paymentMethodType ===
            PaymentMethodType.SHOPDITPAY_BAYBANK ||
          props.order.invoice.paymentMethodType ===
            PaymentMethodType.SHOPDITPAY_BBL ||
          props.order.invoice.paymentMethodType ===
            PaymentMethodType.SHOPDITPAY_CREDIT_CARD ||
          props.order.invoice.paymentMethodType ===
            PaymentMethodType.SHOPDITPAY_LINEPAY ||
          props.order.invoice.paymentMethodType ===
            PaymentMethodType.SHOPDITPAY_SCB_EASY ||
          props.order.invoice.paymentMethodType ===
            PaymentMethodType.SHOPDITPAY_TRUEMONEY
        ) {
          toast.openToast("ไม่สามารถชำระเงิน ณ ขณะนี้", "error");
        } else {
          toast.openToast(
            t("successful", { orderNumber: props.order.number }),
            "success"
          );
        }
        setOnLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.openToast(t("error", { orderNumber: props.order.number }), "error");
      setOnLoading(false);
    }
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

  useEffect(() => {
    setValue("paymentAt", date);
  }, [date]);

  const selectPushLink = (type: string) => {
    if (type === 'link-pay') {
      router.push(`/link-pay/${props.order.publicUuid}`)
      return
    }
    router.push(routes.orderList())
    return
  }

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <DefaultLayout
      {...props}
      appBar={
        !isDesktop && (
          <MobileAppBar
            title={t("title")}
            onBackClick={() => selectPushLink(props.type)}
          />
        )
      }
    >
      {onUploadSlipMode ? (
        <Box
          component="form"
          position="relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box mt="40px" p="16px">
            <Typography fontSize="12px">{t("uploadImage")}</Typography>
            <Box padding="16px" display="flex" justifyContent="center">
              <input
                type="file"
                hidden
                ref={slipRef}
                name="slip"
                id="slip"
                onChange={(e: any) => setValue("file", e.target.files[0])}
              />
              <Box onClick={onClickUpload} sx={{ cursor: "pointer" }}>
                {watch("file") ? (
                  <Box
                    sx={{
                      position: "relative",
                      display: "block",
                      width: "250px",
                      height: "300px",
                    }}
                  >
                    <NextImage  
                      src={URL.createObjectURL(watch("file"))}
                      layout="fill"
                      objectFit="contain"
                      priority={true}
  unoptimized={true}
/>
                  </Box>
                ) : (
                  <svg
                    width="104"
                    height="100"
                    viewBox="0 0 104 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M66.5714 60.4286H34.5714V28.4286H55.1429V23.8571H34.5714C32.0571 23.8571 30 25.9143 30 28.4286V60.4286C30 62.9429 32.0571 65 34.5714 65H66.5714C69.0857 65 71.1429 62.9429 71.1429 60.4286V39.8571H66.5714V60.4286ZM48.7657 53.1829L44.2857 47.7886L38 55.8571H63.1429L55.0514 45.0914L48.7657 53.1829ZM71.1429 23.8571V17H66.5714V23.8571H59.7143C59.7371 23.88 59.7143 28.4286 59.7143 28.4286H66.5714V35.2629C66.5943 35.2857 71.1429 35.2629 71.1429 35.2629V28.4286H78V23.8571H71.1429Z"
                      fill="#B6BECD"
                    />
                    <path
                      d="M18.796 73.464H16.204V72.6H22.48V73.464H19.9V81H18.796V73.464ZM24.2265 81.12C23.6345 81.12 23.1505 80.948 22.7745 80.604C22.3985 80.26 22.2105 79.816 22.2105 79.272C22.2105 78.672 22.4345 78.208 22.8825 77.88C23.3385 77.552 23.9825 77.388 24.8145 77.388H26.0505V77.076C26.0505 76.628 25.9305 76.288 25.6905 76.056C25.4585 75.816 25.1185 75.696 24.6705 75.696C24.3105 75.696 23.9785 75.772 23.6745 75.924C23.3785 76.068 23.1305 76.28 22.9305 76.56L22.4145 75.936C22.6865 75.592 23.0185 75.332 23.4105 75.156C23.8025 74.972 24.2385 74.88 24.7185 74.88C25.4705 74.88 26.0505 75.064 26.4585 75.432C26.8665 75.8 27.0705 76.328 27.0705 77.016V79.836C27.0705 80.148 27.1185 80.536 27.2145 81H26.3265C26.2545 80.816 26.2025 80.536 26.1705 80.16H26.1465C25.9225 80.472 25.6465 80.712 25.3185 80.88C24.9905 81.04 24.6265 81.12 24.2265 81.12ZM24.3825 80.316C24.6865 80.316 24.9665 80.26 25.2225 80.148C25.4785 80.028 25.6785 79.868 25.8225 79.668C25.9745 79.468 26.0505 79.248 26.0505 79.008V78.12H24.7785C24.2745 78.12 23.8865 78.22 23.6145 78.42C23.3425 78.62 23.2065 78.904 23.2065 79.272C23.2065 79.592 23.3105 79.848 23.5185 80.04C23.7345 80.224 24.0225 80.316 24.3825 80.316ZM28.6505 76.512C28.6505 76 28.6345 75.496 28.6025 75H29.5385C29.5625 75.296 29.5745 75.612 29.5745 75.948H29.5985C29.7665 75.628 30.0265 75.372 30.3785 75.18C30.7305 74.98 31.1105 74.88 31.5185 74.88C32.2945 74.88 32.9025 75.156 33.3425 75.708C33.7825 76.26 34.0025 77.024 34.0025 78C34.0025 78.632 33.8985 79.184 33.6905 79.656C33.4825 80.12 33.1865 80.48 32.8025 80.736C32.4265 80.992 31.9865 81.12 31.4825 81.12C31.0665 81.12 30.7025 81.04 30.3905 80.88C30.0785 80.72 29.8505 80.496 29.7065 80.208H29.6705V83.904H28.6505V76.512ZM31.3265 80.34C31.8385 80.34 32.2425 80.128 32.5385 79.704C32.8345 79.272 32.9825 78.692 32.9825 77.964C32.9825 77.236 32.8385 76.676 32.5505 76.284C32.2625 75.892 31.8585 75.696 31.3385 75.696C30.8505 75.696 30.4505 75.856 30.1385 76.176C29.8265 76.496 29.6705 76.904 29.6705 77.4V78.492C29.6705 79.044 29.8225 79.492 30.1265 79.836C30.4305 80.172 30.8305 80.34 31.3265 80.34ZM40.2556 81.12C39.7276 81.12 39.3116 80.952 39.0076 80.616C38.7036 80.272 38.5516 79.8 38.5516 79.2V75.792H37.4716V75H38.5516V73.404L39.5236 73.104H39.5716V75H41.2756V75.792H39.5716V79.104C39.5716 79.512 39.6476 79.816 39.7996 80.016C39.9516 80.208 40.1876 80.304 40.5076 80.304C40.8516 80.304 41.1316 80.26 41.3476 80.172L41.4196 80.928C41.1556 81.056 40.7676 81.12 40.2556 81.12ZM44.8477 81.12C44.2557 81.12 43.7397 80.996 43.2997 80.748C42.8677 80.492 42.5317 80.128 42.2917 79.656C42.0597 79.184 41.9437 78.632 41.9437 78C41.9437 77.368 42.0597 76.816 42.2917 76.344C42.5317 75.872 42.8677 75.512 43.2997 75.264C43.7397 75.008 44.2557 74.88 44.8477 74.88C45.7437 74.88 46.4517 75.16 46.9717 75.72C47.4997 76.28 47.7637 77.04 47.7637 78C47.7637 78.96 47.4997 79.72 46.9717 80.28C46.4517 80.84 45.7437 81.12 44.8477 81.12ZM44.8477 80.34C45.4397 80.34 45.9037 80.132 46.2397 79.716C46.5757 79.3 46.7437 78.728 46.7437 78C46.7437 77.272 46.5757 76.7 46.2397 76.284C45.9037 75.868 45.4397 75.66 44.8477 75.66C44.2637 75.66 43.8037 75.868 43.4677 76.284C43.1317 76.7 42.9637 77.272 42.9637 78C42.9637 78.728 43.1317 79.3 43.4677 79.716C43.8037 80.132 44.2637 80.34 44.8477 80.34ZM54.6854 81.12C54.3094 81.12 53.9454 81.024 53.5934 80.832C53.2414 80.632 52.9774 80.372 52.8014 80.052H52.7774C52.7854 80.308 52.7774 80.624 52.7534 81H51.8174C51.8414 80.736 51.8534 80.232 51.8534 79.488V72.096H52.8734V75.804H52.8974C53.2974 75.188 53.9014 74.88 54.7094 74.88C55.4774 74.88 56.0854 75.152 56.5334 75.696C56.9814 76.232 57.2054 76.964 57.2054 77.892C57.2054 78.892 56.9774 79.68 56.5214 80.256C56.0734 80.832 55.4614 81.12 54.6854 81.12ZM54.5414 80.304C55.0534 80.304 55.4534 80.092 55.7414 79.668C56.0374 79.244 56.1854 78.66 56.1854 77.916C56.1854 77.204 56.0374 76.652 55.7414 76.26C55.4534 75.86 55.0534 75.66 54.5414 75.66C54.0454 75.66 53.6414 75.832 53.3294 76.176C53.0254 76.512 52.8734 76.956 52.8734 77.508V78.6C52.8734 79.12 53.0214 79.536 53.3174 79.848C53.6214 80.152 54.0294 80.304 54.5414 80.304ZM58.4173 76.464C58.4173 75.784 58.4053 75.296 58.3813 75H59.3293C59.3613 75.32 59.3773 75.672 59.3773 76.056V76.176H59.4133C59.5653 75.76 59.8093 75.44 60.1453 75.216C60.4813 74.992 60.8773 74.88 61.3333 74.88C61.4613 74.88 61.5773 74.892 61.6813 74.916V75.756C61.5773 75.732 61.4373 75.72 61.2613 75.72C60.9253 75.72 60.6173 75.824 60.3373 76.032C60.0573 76.232 59.8373 76.508 59.6773 76.86C59.5173 77.212 59.4373 77.596 59.4373 78.012V81H58.4173V76.464ZM65.0274 81.12C64.4354 81.12 63.9194 80.996 63.4794 80.748C63.0474 80.492 62.7114 80.128 62.4714 79.656C62.2394 79.184 62.1234 78.632 62.1234 78C62.1234 77.368 62.2394 76.816 62.4714 76.344C62.7114 75.872 63.0474 75.512 63.4794 75.264C63.9194 75.008 64.4354 74.88 65.0274 74.88C65.9234 74.88 66.6314 75.16 67.1514 75.72C67.6794 76.28 67.9434 77.04 67.9434 78C67.9434 78.96 67.6794 79.72 67.1514 80.28C66.6314 80.84 65.9234 81.12 65.0274 81.12ZM65.0274 80.34C65.6194 80.34 66.0834 80.132 66.4194 79.716C66.7554 79.3 66.9234 78.728 66.9234 78C66.9234 77.272 66.7554 76.7 66.4194 76.284C66.0834 75.868 65.6194 75.66 65.0274 75.66C64.4434 75.66 63.9834 75.868 63.6474 76.284C63.3114 76.7 63.1434 77.272 63.1434 78C63.1434 78.728 63.3114 79.3 63.6474 79.716C63.9834 80.132 64.4434 80.34 65.0274 80.34ZM76.2551 75L74.7551 81H73.8311L72.3791 76.092L70.9271 81H70.0031L68.5031 75H69.5711L70.5431 79.608L71.9111 75H72.8471L74.2151 79.608L75.1871 75H76.2551ZM78.7867 81.12C78.3387 81.12 77.9307 81.028 77.5627 80.844C77.2027 80.66 76.9467 80.416 76.7947 80.112L77.4547 79.656C77.5907 79.872 77.7787 80.04 78.0187 80.16C78.2587 80.28 78.5187 80.34 78.7987 80.34C79.1347 80.34 79.4107 80.244 79.6267 80.052C79.8507 79.852 79.9627 79.604 79.9627 79.308C79.9627 79.068 79.8747 78.868 79.6987 78.708C79.5227 78.548 79.2107 78.384 78.7627 78.216C78.0827 77.968 77.6027 77.708 77.3227 77.436C77.0507 77.164 76.9147 76.828 76.9147 76.428C76.9147 75.964 77.0987 75.592 77.4667 75.312C77.8347 75.024 78.3227 74.88 78.9307 74.88C79.3227 74.88 79.6787 74.964 79.9987 75.132C80.3267 75.3 80.5787 75.532 80.7547 75.828L80.1307 76.284C79.8507 75.868 79.4507 75.66 78.9307 75.66C78.6347 75.66 78.3907 75.728 78.1987 75.864C78.0147 76 77.9227 76.176 77.9227 76.392C77.9227 76.608 78.0187 76.792 78.2107 76.944C78.4027 77.088 78.7587 77.26 79.2787 77.46C79.8947 77.692 80.3307 77.948 80.5867 78.228C80.8427 78.5 80.9707 78.848 80.9707 79.272C80.9707 79.832 80.7707 80.28 80.3707 80.616C79.9707 80.952 79.4427 81.12 78.7867 81.12ZM87.3973 78.396H83.0773C83.1333 79.004 83.3133 79.468 83.6173 79.788C83.9213 80.1 84.3413 80.256 84.8773 80.256C85.5973 80.256 86.1693 79.972 86.5933 79.404L87.1693 79.956C86.9373 80.324 86.6133 80.612 86.1973 80.82C85.7893 81.02 85.3373 81.12 84.8413 81.12C83.9533 81.12 83.2653 80.848 82.7773 80.304C82.2893 79.76 82.0453 78.996 82.0453 78.012C82.0453 77.036 82.2893 76.272 82.7773 75.72C83.2733 75.16 83.9533 74.88 84.8173 74.88C85.6253 74.88 86.2573 75.156 86.7133 75.708C87.1693 76.252 87.3973 77.016 87.3973 78V78.396ZM86.4613 77.556C86.4613 76.98 86.3093 76.528 86.0053 76.2C85.7093 75.872 85.2973 75.708 84.7693 75.708C84.2733 75.708 83.8773 75.876 83.5813 76.212C83.2933 76.548 83.1253 77.024 83.0773 77.64H86.4613V77.556Z"
                      fill="#111827"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="103"
                      height="99"
                      rx="5.5"
                      stroke="#B6BECD"
                      strokeDasharray="8 8"
                    />
                  </svg>
                )}
              </Box>
            </Box>
            <Box py="16x" pt="24px">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography fontSize="12px">{t("paidAt")}</Typography>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      inputFormat="dd/MM/yyyy HH:mm"
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          sx={{
                            flex: 1,
                            width: "130px",
                            "& .MuiInputBase-root": {
                              height: 30,
                              fontSize: "12px",
                            },
                          }}
                          placeholder="--- เลือกวันที่ชำระ ---"
                        />
                      )}
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
            </Box>
            <Box py="16px">
              <Box display="flex" justifyContent="space-between">
                <Typography fontSize="12px">{t("total")}</Typography>
                <Typography fontSize="12px">
                  <Typography
                    component="span"
                    fontFamily="Roboto"
                    fontSize="12px"
                    px="1px"
                  >
                    ฿
                  </Typography>
                  {intl.formatNumber(
                    props.order?.invoice?.totalPrice ?? 0,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </Typography>
              </Box>
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              sx={{
                py: "12px",
                borderRadius: "8px",
                fontSize: "12px",
                mt: "16px",
              }}
              disabled={
                date === null ||
                watch("file") === null ||
                watch("file") === undefined ||
                onLoading
              }
            >
              {onLoading &&
              watch("file") !== null &&
              watch("file") !== undefined ? (
                <CircularProgress color="info" />
              ) : (
                "ยืนยัน"
              )}
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            {...(isDesktop
              ? {
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: "64px",
                  pt: "80px",
                  pb: "134px",
                }
              : {})}
          >
            <Box p={isDesktop ? "0" : "16px"}>
              {isDesktop && (
                <Box display="flex">
                  {
                    props.type === 'link-pay' && (
                      <IconButton onClick={() => router.push(`/link-pay/${props.order.publicUuid}`)} style={{ marginRight: '20px' }}>
                        <ChevronLeftIcon />
                      </IconButton>
                    )
                  }
                  <Typography component="h1" variant="h1" fontWeight="300">
                    {t("title")}
                  </Typography>
                </Box>
              )}
              {isDesktop ? (
                <>
                  <Typography variant="h2" fontWeight="600" mt="40px" mb="16px">
                    {t("orderNumber")} {props.order?.number}
                  </Typography>
                  <Typography variant="h2" fontWeight="300">
                    {t("total")}
                  </Typography>
                  <Typography variant="h2" fontWeight="600" mt="16px" mb="32px">
                    <Typography component="span" fontFamily="Roboto">
                      ฿
                    </Typography>
                    {intl.formatNumber(
                      props.order?.invoice?.totalPrice,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </Typography>
                  <Typography variant="h2" fontWeight="600" mt="40px" mb="16px">
                    {t("paymentOptionTitle")}
                  </Typography>
                </>
              ) : (
                <>
                  {props.order?.invoice?.paymentMethodType ===
                    PaymentMethodType.BANK_ACCOUNT ||
                  props.order?.invoice?.paymentMethodType ===
                    PaymentMethodType.PROMPTPAY ? (
                    <>
                      {props.order?.invoice?.paymentMethodType ===
                        PaymentMethodType.BANK_ACCOUNT &&
                      props.order.invoice?.merchantBankAccountPaymentMethod ? (
                        <>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            borderBottom="1px solid"
                            borderColor="grey.100"
                            alignItems="center"
                          >
                            <Box
                              key={
                                props.order?.invoice
                                  ?.merchantBankAccountPaymentMethod?.id
                              }
                              display="flex"
                              pb="24px"
                              pt="8px"
                            >
                              <Box
                                mr="18px"
                                className={`bank-${props.order?.invoice?.merchantBankAccountPaymentMethod?.bank?.slug}`}
                                p="4px"
                              >
                                <NextImage  
                                  src={`/bank-svg/${props.order.invoice.merchantBankAccountPaymentMethod.bank.slug}.svg`}
                                  width={76}
                                  height={60}
                                  priority={true}
  unoptimized={true}
/>
                              </Box>
                              <Box>
                                <Typography variant="h4" fontWeight="light">
                                  {
                                    props.order.invoice
                                      .merchantBankAccountPaymentMethod.bank
                                      .name
                                  }
                                </Typography>
                                <Typography
                                  variant="h4"
                                  py="4px"
                                  fontWeight="light"
                                >
                                  {t("bankAccount")}{" "}
                                  {
                                    props.order.invoice
                                      .merchantBankAccountPaymentMethod.name
                                  }
                                </Typography>
                                <Typography variant="h3" pt="8px">
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
                                  ].join("-")}
                                </Typography>
                              </Box>
                            </Box>
                            <CopyToClipboard
                              text={[
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
                              ].join("-")}
                            >
                              <Typography
                                variant="h4"
                                fontWeight="bold"
                                marginTop="-16px"
                                color="primary"
                              >
                                คัดลอก
                              </Typography>
                            </CopyToClipboard>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            py="24px"
                          >
                            <Box>
                              <Typography variant="h4" fontWeight="bold">
                                ยอดเงินที่ต้องชำระ
                              </Typography>
                              <Typography
                                variant="h4"
                                fontWeight="bold"
                                pt="8px"
                              >
                                <Typography
                                  component="span"
                                  fontFamily="Roboto"
                                  fontSize="12px"
                                  px="1px"
                                  fontWeight="bold"
                                >
                                  ฿
                                </Typography>
                                {intl.formatNumber(
                                  props.order.invoice.totalPrice,
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )}
                              </Typography>
                            </Box>
                            <CopyToClipboard
                              text={intl.formatNumber(
                                props.order.invoice.totalPrice,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            >
                              <Typography
                                variant="h4"
                                fontWeight="bold"
                                color="primary"
                              >
                                คัดลอก
                              </Typography>
                            </CopyToClipboard>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box textAlign={"center"}>
                            {props.order.invoice.merchantPromptpayPaymentMethod
                              ?.imageUpload?.url && (
                              <Box
                                sx={{
                                  position: "relative",
                                  display: "block",
                                  height: "200px",
                                }}
                              >
                                <NextImage  
                                  src={
                                    props.order.invoice
                                      .merchantPromptpayPaymentMethod
                                      ?.imageUpload?.url
                                  }
                                  layout="fill"
                                  objectFit="contain"
                                  priority={true}
  unoptimized={true}
/>
                              </Box>
                            )}
                            <Box
                              display={"flex"}
                              alignContent={"center"}
                              alignItems={"center"}
                              justifyContent={"center"}
                            >
                              <Typography
                                variant="h4"
                                fontWeight="light"
                                fontSize={"12px"}
                                px="4px"
                              >
                                {
                                  props.order?.invoice
                                    ?.merchantPromptpayPaymentMethod?.number
                                }
                              </Typography>
                              {props.order?.invoice
                                ?.merchantPromptpayPaymentMethod?.number ? (
                                <CopyToClipboard
                                  text={
                                    props.order?.invoice
                                      ?.merchantPromptpayPaymentMethod?.number
                                  }
                                >
                                  <NextImage  
                                    src={"/copy-icon.svg"}
                                    alt="heart icon"
                                    width={"12px"}
                                    height={"12px"}
  unoptimized={true}
/>
                                </CopyToClipboard>
                              ) : (
                                ""
                              )}
                            </Box>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            py="24px"
                          >
                            <Box>
                              <Typography variant="h4" fontWeight="bold">
                                ยอดเงินที่ต้องชำระ
                              </Typography>
                              <Typography
                                variant="h4"
                                fontWeight="bold"
                                pt="8px"
                              >
                                <Typography
                                  component="span"
                                  fontFamily="Roboto"
                                  fontSize="12px"
                                  px="1px"
                                  fontWeight="bold"
                                >
                                  ฿
                                </Typography>
                                {intl.formatNumber(
                                  props.order.invoice.totalPrice,
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )}
                              </Typography>
                            </Box>
                            <CopyToClipboard
                              text={intl.formatNumber(
                                props.order.invoice.totalPrice,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            >
                              <Typography
                                variant="h4"
                                fontWeight="bold"
                                color="primary"
                              >
                                คัดลอก
                              </Typography>
                            </CopyToClipboard>
                          </Box>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Box py="16px">
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          pb="16px"
                        >
                          <Typography fontSize="12px">
                            หมายเลขคำสั่งซื้อ
                          </Typography>
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
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          pb="16px"
                        >
                          <Typography fontSize="12px">
                            ช่องทางชำระเงิน
                          </Typography>
                          <Typography fontSize="12px" fontWeight="light">
                            {getPaymentMethod(props?.order?.invoice)}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          pb="16px"
                        >
                          <Typography fontSize="12px">
                            เวลาที่สั่งซื้อ
                          </Typography>
                          <Typography fontSize="12px" fontWeight="light">
                            {new Date(
                              props.order.orderedAt
                            )?.toLocaleDateString("th-TH", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          pb="16px"
                        >
                          <Typography fontSize="12px">
                            ราคารวมทั้งหมด
                          </Typography>
                          <Typography fontSize="12px" fontWeight="light">
                            <Typography
                              component="span"
                              fontFamily="Roboto"
                              fontSize="12px"
                            >
                              ฿
                            </Typography>
                            {intl.formatNumber(
                              props.order.invoice.productPrice,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          pb="16px"
                        >
                          <Typography fontSize="12px">ค่าจัดส่ง</Typography>
                          <Typography fontSize="12px" fontWeight="light">
                            <Typography
                              component="span"
                              fontFamily="Roboto"
                              fontSize="12px"
                            >
                              ฿
                            </Typography>
                            {intl.formatNumber(
                              props.order.invoice.shipmentPrice,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          pb="16px"
                        >
                          <Typography fontSize="12px">ส่วนลดที่ได้</Typography>
                          <Typography
                            fontSize="12px"
                            fontWeight="light"
                            color="red.100"
                          >
                            <Typography
                              component="span"
                              fontFamily="Roboto"
                              fontSize="12px"
                            >
                              ฿
                            </Typography>
                            {intl.formatNumber(
                              props.order.invoice.productDiscountPrice,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography fontSize="12px">พอยท์ส่วนลด</Typography>
                          <Typography fontSize="12px" color="red.50">
                            <Typography
                              component="span"
                              fontFamily="Roboto"
                              fontSize="12px"
                            >
                              ฿
                            </Typography>
                            {intl.formatNumber(
                              props.order.invoice.shopditPoint,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" justifyContent="space-between" py="0">
                        <Typography fontSize="14px" fontWeight="bold">
                          รวมการสั่งซื้อ
                        </Typography>
                        <Typography fontSize="14px" fontWeight="bold">
                          <Typography
                            component="span"
                            fontFamily="Roboto"
                            fontSize="12px"
                            px="1px"
                            fontWeight="bold"
                          >
                            ฿
                          </Typography>
                          {intl.formatNumber(
                            props.order.invoice.totalPrice,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </Typography>
                      </Box>
                    </>
                  )}
                </>
              )}
              {isDesktop ? (
                <>
                  {props.order.invoice?.paymentMethodType ===
                    PaymentMethodType.BANK_ACCOUNT &&
                    props.order.invoice?.merchantBankAccountPaymentMethod && (
                      <Box
                        key={
                          props.order.invoice.merchantBankAccountPaymentMethod
                            .id
                        }
                        display="flex"
                        py="26px"
                        borderTop="1px solid"
                        borderColor="grey.100"
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
  unoptimized={true}
/>
                        </Box>
                        <Box>
                          <Typography variant="h4" fontWeight="light">
                            {
                              props.order.invoice
                                .merchantBankAccountPaymentMethod.bank.name
                            }
                          </Typography>
                          <Typography variant="h4" py="4px" fontWeight="light">
                            {t("bankAccount")}{" "}
                            {
                              props.order.invoice
                                .merchantBankAccountPaymentMethod.name
                            }
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
                  {props.order.invoice?.paymentMethodType ===
                    PaymentMethodType.PROMPTPAY &&
                    props.order.invoice?.merchantPromptpayPaymentMethod && (
                      <Box
                        key={
                          props.order.invoice.merchantPromptpayPaymentMethod.id
                        }
                        display="flex"
                        py="26px"
                        borderTop="1px solid"
                        borderColor="grey.100"
                      >
                        <Box>
                          <Typography variant="h3">พร้อมเพย์</Typography>
                          <Typography variant="h4" fontWeight="light" pt="8px">
                            {
                              props.order.invoice.merchantPromptpayPaymentMethod
                                .name
                            }
                          </Typography>
                          <Typography variant="h2" pt="8px">
                            {
                              props.order.invoice.merchantPromptpayPaymentMethod
                                .number
                            }
                          </Typography>
                          {props.order.invoice.merchantPromptpayPaymentMethod
                            ?.imageUpload?.url && (
                            <Box
                              sx={{
                                position: "relative",
                                display: "block",
                                width: "250px",
                                height: "300px",
                              }}
                            >
                              <NextImage  
                                src={
                                  props.order.invoice
                                    .merchantPromptpayPaymentMethod?.imageUpload
                                    ?.url
                                }
                                layout="fill"
                                objectFit="contain"
                                priority={true}
  unoptimized={true}
/>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    )}
                  {props.order.invoice?.paymentMethodType ===
                    PaymentMethodType.CASH &&
                    props.order.invoice?.merchantCashPaymentMethod && (
                      <Box
                        display="flex"
                        py="26px"
                        borderTop="1px solid"
                        borderColor="grey.100"
                      >
                        <Typography variant="h2">ชำระด้วยเงินสด</Typography>
                      </Box>
                    )}
                  {props.order.invoice?.paymentMethodType ===
                    PaymentMethodType.OMISE &&
                    props.order.invoice?.customerCreditCard && (
                      <Box
                        py="26px"
                        borderTop="1px solid"
                        borderColor="grey.100"
                      >
                        <Typography variant="h3" pb="16px">
                          ชำระด้วยบัตรเครดิต
                        </Typography>
                        <Box display="flex" justifyContent="space-between">
                          <Box>
                            <Typography variant="h3">
                              {
                                props.order.invoice?.customerCreditCard
                                  ?.cardName
                              }
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="h3">
                              ***{" "}
                              {
                                props.order.invoice?.customerCreditCard
                                  ?.lastNumber
                              }
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  {props.order.invoice?.paymentMethodType ===
                    PaymentMethodType.SHOPDITPAY_AIRPAY &&
                    props.order.invoice?.merchantShopditPaymentMethod && (
                      <Box
                        py="26px"
                        borderTop="1px solid"
                        borderColor="grey.100"
                      >
                        <Typography variant="h3" pb="16px">
                          Shopee Pay
                        </Typography>
                      </Box>
                    )}
                  {props.order.invoice?.paymentMethodType ===
                    PaymentMethodType.SHOPDITPAY_BAYBANK &&
                    props.order.invoice?.merchantShopditPaymentMethod && (
                      <Box
                        py="26px"
                        borderTop="1px solid"
                        borderColor="grey.100"
                      >
                        <Typography variant="h3" pb="16px">
                          KMA (กรุงศรีโมบายแอป)
                        </Typography>
                      </Box>
                    )}
                  {props.order.invoice?.paymentMethodType ===
                    PaymentMethodType.SHOPDITPAY_BBL &&
                    props.order.invoice?.merchantShopditPaymentMethod && (
                      <Box
                        py="26px"
                        borderTop="1px solid"
                        borderColor="grey.100"
                      >
                        <Typography variant="h3" pb="16px">
                          Bualuang mBanking
                        </Typography>
                      </Box>
                    )}
                  {props.order.invoice?.paymentMethodType ===
                    PaymentMethodType.SHOPDITPAY_CREDIT_CARD &&
                    props.order.invoice?.merchantShopditPaymentMethod && (
                      <Box
                        py="26px"
                        borderTop="1px solid"
                        borderColor="grey.100"
                      >
                        <Typography variant="h3" pb="16px">
                          บัตรเครดิต
                        </Typography>
                      </Box>
                    )}
                  {props.order.invoice?.paymentMethodType ===
                    PaymentMethodType.SHOPDITPAY_LINEPAY &&
                    props.order.invoice?.merchantShopditPaymentMethod && (
                      <Box
                        py="26px"
                        borderTop="1px solid"
                        borderColor="grey.100"
                      >
                        <Typography variant="h3" pb="16px">
                          Line Pay
                        </Typography>
                      </Box>
                    )}
                  {props.order.invoice?.paymentMethodType ===
                    PaymentMethodType.SHOPDITPAY_SCB_EASY &&
                    props.order.invoice?.merchantShopditPaymentMethod && (
                      <Box
                        py="26px"
                        borderTop="1px solid"
                        borderColor="grey.100"
                      >
                        <Typography variant="h3" pb="16px">
                          SCB EASY
                        </Typography>
                      </Box>
                    )}
                  {props.order.invoice?.paymentMethodType ===
                    PaymentMethodType.SHOPDITPAY_TRUEMONEY &&
                    props.order.invoice?.merchantShopditPaymentMethod && (
                      <Box
                        py="26px"
                        borderTop="1px solid"
                        borderColor="grey.100"
                      >
                        <Typography variant="h3" pb="16px">
                          True Money
                        </Typography>
                      </Box>
                    )}
                </>
              ) : (
                ""
              )}
            </Box>

            <Box
              component="form"
              position="relative"
              borderRadius={isDesktop ? "8px" : ""}
              boxShadow={isDesktop ? "0 2px 10px 0 rgb(1 27 42 / 12%)" : ""}
              p="16px"
              onSubmit={handleSubmit(onSubmit)}
            >
              {isDesktop ? (
                <>
                  {props.order.invoice?.paymentMethodType !==
                    PaymentMethodType.OMISE &&
                  props.order.invoice?.paymentMethodType !==
                    PaymentMethodType.SHOPDITPAY_AIRPAY &&
                  props.order.invoice?.paymentMethodType !==
                    PaymentMethodType.SHOPDITPAY_BAYBANK &&
                  props.order.invoice?.paymentMethodType !==
                    PaymentMethodType.SHOPDITPAY_BBL &&
                  props.order.invoice?.paymentMethodType !==
                    PaymentMethodType.SHOPDITPAY_CREDIT_CARD &&
                  props.order.invoice?.paymentMethodType !==
                    PaymentMethodType.SHOPDITPAY_LINEPAY &&
                  props.order.invoice?.paymentMethodType !==
                    PaymentMethodType.SHOPDITPAY_SCB_EASY &&
                  props.order.invoice?.paymentMethodType !==
                    PaymentMethodType.SHOPDITPAY_TRUEMONEY ? (
                    <>
                      <Typography
                        variant="h2"
                        fontWeight="600"
                        textAlign="center"
                      >
                        {t("subtitle")}
                      </Typography>
                      <Box mt="40px">
                        <Typography variant="h4">{t("uploadImage")}</Typography>
                        <Box
                          padding="16px"
                          display="flex"
                          justifyContent="center"
                        >
                          <input
                            type="file"
                            hidden
                            ref={slipRef}
                            name="slip"
                            id="slip"
                            onChange={(e: any) =>
                              setValue("file", e.target.files[0])
                            }
                          />
                          <Box
                            onClick={onClickUpload}
                            sx={{ cursor: "pointer" }}
                          >
                            {watch("file") ? (
                              <Box
                                sx={{
                                  position: "relative",
                                  display: "block",
                                  width: "250px",
                                  height: "300px",
                                }}
                              >
                                <NextImage  
                                  src={URL.createObjectURL(watch("file"))}
                                  layout="fill"
                                  objectFit="contain"
                                  priority={true}
  unoptimized={true}
/>
                              </Box>
                            ) : (
                              <svg
                                width="104"
                                height="100"
                                viewBox="0 0 104 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M66.5714 60.4286H34.5714V28.4286H55.1429V23.8571H34.5714C32.0571 23.8571 30 25.9143 30 28.4286V60.4286C30 62.9429 32.0571 65 34.5714 65H66.5714C69.0857 65 71.1429 62.9429 71.1429 60.4286V39.8571H66.5714V60.4286ZM48.7657 53.1829L44.2857 47.7886L38 55.8571H63.1429L55.0514 45.0914L48.7657 53.1829ZM71.1429 23.8571V17H66.5714V23.8571H59.7143C59.7371 23.88 59.7143 28.4286 59.7143 28.4286H66.5714V35.2629C66.5943 35.2857 71.1429 35.2629 71.1429 35.2629V28.4286H78V23.8571H71.1429Z"
                                  fill="#B6BECD"
                                />
                                <path
                                  d="M18.796 73.464H16.204V72.6H22.48V73.464H19.9V81H18.796V73.464ZM24.2265 81.12C23.6345 81.12 23.1505 80.948 22.7745 80.604C22.3985 80.26 22.2105 79.816 22.2105 79.272C22.2105 78.672 22.4345 78.208 22.8825 77.88C23.3385 77.552 23.9825 77.388 24.8145 77.388H26.0505V77.076C26.0505 76.628 25.9305 76.288 25.6905 76.056C25.4585 75.816 25.1185 75.696 24.6705 75.696C24.3105 75.696 23.9785 75.772 23.6745 75.924C23.3785 76.068 23.1305 76.28 22.9305 76.56L22.4145 75.936C22.6865 75.592 23.0185 75.332 23.4105 75.156C23.8025 74.972 24.2385 74.88 24.7185 74.88C25.4705 74.88 26.0505 75.064 26.4585 75.432C26.8665 75.8 27.0705 76.328 27.0705 77.016V79.836C27.0705 80.148 27.1185 80.536 27.2145 81H26.3265C26.2545 80.816 26.2025 80.536 26.1705 80.16H26.1465C25.9225 80.472 25.6465 80.712 25.3185 80.88C24.9905 81.04 24.6265 81.12 24.2265 81.12ZM24.3825 80.316C24.6865 80.316 24.9665 80.26 25.2225 80.148C25.4785 80.028 25.6785 79.868 25.8225 79.668C25.9745 79.468 26.0505 79.248 26.0505 79.008V78.12H24.7785C24.2745 78.12 23.8865 78.22 23.6145 78.42C23.3425 78.62 23.2065 78.904 23.2065 79.272C23.2065 79.592 23.3105 79.848 23.5185 80.04C23.7345 80.224 24.0225 80.316 24.3825 80.316ZM28.6505 76.512C28.6505 76 28.6345 75.496 28.6025 75H29.5385C29.5625 75.296 29.5745 75.612 29.5745 75.948H29.5985C29.7665 75.628 30.0265 75.372 30.3785 75.18C30.7305 74.98 31.1105 74.88 31.5185 74.88C32.2945 74.88 32.9025 75.156 33.3425 75.708C33.7825 76.26 34.0025 77.024 34.0025 78C34.0025 78.632 33.8985 79.184 33.6905 79.656C33.4825 80.12 33.1865 80.48 32.8025 80.736C32.4265 80.992 31.9865 81.12 31.4825 81.12C31.0665 81.12 30.7025 81.04 30.3905 80.88C30.0785 80.72 29.8505 80.496 29.7065 80.208H29.6705V83.904H28.6505V76.512ZM31.3265 80.34C31.8385 80.34 32.2425 80.128 32.5385 79.704C32.8345 79.272 32.9825 78.692 32.9825 77.964C32.9825 77.236 32.8385 76.676 32.5505 76.284C32.2625 75.892 31.8585 75.696 31.3385 75.696C30.8505 75.696 30.4505 75.856 30.1385 76.176C29.8265 76.496 29.6705 76.904 29.6705 77.4V78.492C29.6705 79.044 29.8225 79.492 30.1265 79.836C30.4305 80.172 30.8305 80.34 31.3265 80.34ZM40.2556 81.12C39.7276 81.12 39.3116 80.952 39.0076 80.616C38.7036 80.272 38.5516 79.8 38.5516 79.2V75.792H37.4716V75H38.5516V73.404L39.5236 73.104H39.5716V75H41.2756V75.792H39.5716V79.104C39.5716 79.512 39.6476 79.816 39.7996 80.016C39.9516 80.208 40.1876 80.304 40.5076 80.304C40.8516 80.304 41.1316 80.26 41.3476 80.172L41.4196 80.928C41.1556 81.056 40.7676 81.12 40.2556 81.12ZM44.8477 81.12C44.2557 81.12 43.7397 80.996 43.2997 80.748C42.8677 80.492 42.5317 80.128 42.2917 79.656C42.0597 79.184 41.9437 78.632 41.9437 78C41.9437 77.368 42.0597 76.816 42.2917 76.344C42.5317 75.872 42.8677 75.512 43.2997 75.264C43.7397 75.008 44.2557 74.88 44.8477 74.88C45.7437 74.88 46.4517 75.16 46.9717 75.72C47.4997 76.28 47.7637 77.04 47.7637 78C47.7637 78.96 47.4997 79.72 46.9717 80.28C46.4517 80.84 45.7437 81.12 44.8477 81.12ZM44.8477 80.34C45.4397 80.34 45.9037 80.132 46.2397 79.716C46.5757 79.3 46.7437 78.728 46.7437 78C46.7437 77.272 46.5757 76.7 46.2397 76.284C45.9037 75.868 45.4397 75.66 44.8477 75.66C44.2637 75.66 43.8037 75.868 43.4677 76.284C43.1317 76.7 42.9637 77.272 42.9637 78C42.9637 78.728 43.1317 79.3 43.4677 79.716C43.8037 80.132 44.2637 80.34 44.8477 80.34ZM54.6854 81.12C54.3094 81.12 53.9454 81.024 53.5934 80.832C53.2414 80.632 52.9774 80.372 52.8014 80.052H52.7774C52.7854 80.308 52.7774 80.624 52.7534 81H51.8174C51.8414 80.736 51.8534 80.232 51.8534 79.488V72.096H52.8734V75.804H52.8974C53.2974 75.188 53.9014 74.88 54.7094 74.88C55.4774 74.88 56.0854 75.152 56.5334 75.696C56.9814 76.232 57.2054 76.964 57.2054 77.892C57.2054 78.892 56.9774 79.68 56.5214 80.256C56.0734 80.832 55.4614 81.12 54.6854 81.12ZM54.5414 80.304C55.0534 80.304 55.4534 80.092 55.7414 79.668C56.0374 79.244 56.1854 78.66 56.1854 77.916C56.1854 77.204 56.0374 76.652 55.7414 76.26C55.4534 75.86 55.0534 75.66 54.5414 75.66C54.0454 75.66 53.6414 75.832 53.3294 76.176C53.0254 76.512 52.8734 76.956 52.8734 77.508V78.6C52.8734 79.12 53.0214 79.536 53.3174 79.848C53.6214 80.152 54.0294 80.304 54.5414 80.304ZM58.4173 76.464C58.4173 75.784 58.4053 75.296 58.3813 75H59.3293C59.3613 75.32 59.3773 75.672 59.3773 76.056V76.176H59.4133C59.5653 75.76 59.8093 75.44 60.1453 75.216C60.4813 74.992 60.8773 74.88 61.3333 74.88C61.4613 74.88 61.5773 74.892 61.6813 74.916V75.756C61.5773 75.732 61.4373 75.72 61.2613 75.72C60.9253 75.72 60.6173 75.824 60.3373 76.032C60.0573 76.232 59.8373 76.508 59.6773 76.86C59.5173 77.212 59.4373 77.596 59.4373 78.012V81H58.4173V76.464ZM65.0274 81.12C64.4354 81.12 63.9194 80.996 63.4794 80.748C63.0474 80.492 62.7114 80.128 62.4714 79.656C62.2394 79.184 62.1234 78.632 62.1234 78C62.1234 77.368 62.2394 76.816 62.4714 76.344C62.7114 75.872 63.0474 75.512 63.4794 75.264C63.9194 75.008 64.4354 74.88 65.0274 74.88C65.9234 74.88 66.6314 75.16 67.1514 75.72C67.6794 76.28 67.9434 77.04 67.9434 78C67.9434 78.96 67.6794 79.72 67.1514 80.28C66.6314 80.84 65.9234 81.12 65.0274 81.12ZM65.0274 80.34C65.6194 80.34 66.0834 80.132 66.4194 79.716C66.7554 79.3 66.9234 78.728 66.9234 78C66.9234 77.272 66.7554 76.7 66.4194 76.284C66.0834 75.868 65.6194 75.66 65.0274 75.66C64.4434 75.66 63.9834 75.868 63.6474 76.284C63.3114 76.7 63.1434 77.272 63.1434 78C63.1434 78.728 63.3114 79.3 63.6474 79.716C63.9834 80.132 64.4434 80.34 65.0274 80.34ZM76.2551 75L74.7551 81H73.8311L72.3791 76.092L70.9271 81H70.0031L68.5031 75H69.5711L70.5431 79.608L71.9111 75H72.8471L74.2151 79.608L75.1871 75H76.2551ZM78.7867 81.12C78.3387 81.12 77.9307 81.028 77.5627 80.844C77.2027 80.66 76.9467 80.416 76.7947 80.112L77.4547 79.656C77.5907 79.872 77.7787 80.04 78.0187 80.16C78.2587 80.28 78.5187 80.34 78.7987 80.34C79.1347 80.34 79.4107 80.244 79.6267 80.052C79.8507 79.852 79.9627 79.604 79.9627 79.308C79.9627 79.068 79.8747 78.868 79.6987 78.708C79.5227 78.548 79.2107 78.384 78.7627 78.216C78.0827 77.968 77.6027 77.708 77.3227 77.436C77.0507 77.164 76.9147 76.828 76.9147 76.428C76.9147 75.964 77.0987 75.592 77.4667 75.312C77.8347 75.024 78.3227 74.88 78.9307 74.88C79.3227 74.88 79.6787 74.964 79.9987 75.132C80.3267 75.3 80.5787 75.532 80.7547 75.828L80.1307 76.284C79.8507 75.868 79.4507 75.66 78.9307 75.66C78.6347 75.66 78.3907 75.728 78.1987 75.864C78.0147 76 77.9227 76.176 77.9227 76.392C77.9227 76.608 78.0187 76.792 78.2107 76.944C78.4027 77.088 78.7587 77.26 79.2787 77.46C79.8947 77.692 80.3307 77.948 80.5867 78.228C80.8427 78.5 80.9707 78.848 80.9707 79.272C80.9707 79.832 80.7707 80.28 80.3707 80.616C79.9707 80.952 79.4427 81.12 78.7867 81.12ZM87.3973 78.396H83.0773C83.1333 79.004 83.3133 79.468 83.6173 79.788C83.9213 80.1 84.3413 80.256 84.8773 80.256C85.5973 80.256 86.1693 79.972 86.5933 79.404L87.1693 79.956C86.9373 80.324 86.6133 80.612 86.1973 80.82C85.7893 81.02 85.3373 81.12 84.8413 81.12C83.9533 81.12 83.2653 80.848 82.7773 80.304C82.2893 79.76 82.0453 78.996 82.0453 78.012C82.0453 77.036 82.2893 76.272 82.7773 75.72C83.2733 75.16 83.9533 74.88 84.8173 74.88C85.6253 74.88 86.2573 75.156 86.7133 75.708C87.1693 76.252 87.3973 77.016 87.3973 78V78.396ZM86.4613 77.556C86.4613 76.98 86.3093 76.528 86.0053 76.2C85.7093 75.872 85.2973 75.708 84.7693 75.708C84.2733 75.708 83.8773 75.876 83.5813 76.212C83.2933 76.548 83.1253 77.024 83.0773 77.64H86.4613V77.556Z"
                                  fill="#111827"
                                />
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="103"
                                  height="99"
                                  rx="5.5"
                                  stroke="#B6BECD"
                                  strokeDasharray="8 8"
                                />
                              </svg>
                            )}
                          </Box>
                        </Box>
                        <Box
                          borderTop="1px solid"
                          py="32px"
                          borderColor="grey.100"
                        >
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="h4">{t("total")}</Typography>
                            <Typography variant="h4">
                              <Typography component="span" fontFamily="Roboto">
                                ฿
                              </Typography>
                              {intl.formatNumber(
                                props.order?.invoice?.totalPrice ?? 0,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </Typography>
                          </Box>
                        </Box>

                        {/* <Box
              borderTop="1px solid"
              py="32px"
              borderBottom="1px solid"
              borderColor="grey.100"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h4" flex="1">
                  {t("bank")}
                </Typography>
                <FormControl sx={{ flex: 1 }}>
                  <Select
                    fullWidth
                    value={bank}
                    onChange={(event) => setBank(event.target.value)}
                  >
                    <MenuItem value={"0"}>{t("chooseBank")}</MenuItem>
                    {props.banks.map((bank) => (
                      <MenuItem key={bank.id} value={bank.id.toString()}>
                        {bank.bank}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box> */}

                        <Box
                          py="32px"
                          borderBottom="1px solid"
                          borderColor="grey.100"
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography variant="h4">{t("paidAt")}</Typography>
                            <Box>
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DateTimePicker
                                  inputFormat="dd/MM/yyyy HH:mm"
                                  renderInput={(props) => (
                                    <TextField
                                      {...props}
                                      sx={{ flex: 1, width: "220px" }}
                                    />
                                  )}
                                  value={date}
                                  onChange={(newDate) => setDate(newDate)}
                                />
                              </LocalizationProvider>
                            </Box>
                          </Box>
                        </Box>
                        <Box height="24px" />
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          disableElevation
                          sx={{ py: "16px", borderRadius: "8px" }}
                          disabled={
                            date === null ||
                            watch("file") === null ||
                            watch("file") === undefined ||
                            onLoading
                          }
                        >
                          {onLoading &&
                          watch("file") !== null &&
                          watch("file") !== undefined ? (
                            <CircularProgress color="info" />
                          ) : (
                            t("uploadNow")
                          )}
                        </Button>
                        <Box
                          borderTop="1px solid"
                          borderColor="grey.100"
                          my="24px"
                        />
                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{ py: "16px", borderRadius: "8px" }}
                          disabled={
                            (onLoading &&
                              (watch("file") === null ||
                                watch("file") === undefined))
                          }
                          onClick={() => {
                            router.push(`/me/orders/${props.order.number}`);
                          }}
                        >
                          {onLoading &&
                          (watch("file") === null ||
                            watch("file") === undefined) ? (
                            <CircularProgress color="info" />
                          ) : (
                            t("uploadLater")
                          )}
                        </Button>
                      </Box>
                    </>
                  ) : isDesktop ? (
                    <Box position="relative" pt="16px" height="100%">
                      <Typography
                        variant="h3"
                        fontWeight="600"
                        textAlign="center"
                      >
                        ยอดรวมการชำระ
                      </Typography>
                      <Box
                        borderTop="1px solid"
                        borderColor="grey.100"
                        my="24px"
                      ></Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h4" fontWeight="light">
                          {t("total")}
                        </Typography>
                        <Typography variant="h3" fontWeight="light">
                          <Typography component="span" fontFamily="Roboto">
                            ฿
                          </Typography>
                          {intl.formatNumber(
                            props.order?.invoice?.totalPrice,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </Typography>
                      </Box>
                      <Box position="absolute" bottom="8px" width="100%">
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          disableElevation
                          sx={{
                            py: "16px",
                            borderRadius: "8px",
                            width: "100%",
                          }}
                          disabled={onLoading}
                        >
                          ทำรายการชำระเงิน
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disableElevation
                      sx={{ py: "16px", borderRadius: "8px", width: "100%" }}
                      disabled={onLoading}
                    >
                      ทำรายการชำระเงิน
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {props.order?.invoice?.paymentMethodType ===
                    PaymentMethodType.BANK_ACCOUNT ||
                  props.order?.invoice?.paymentMethodType ===
                    PaymentMethodType.PROMPTPAY ? (
                    <>
                      <Button
                        type="button"
                        variant="contained"
                        fullWidth
                        disableElevation
                        sx={{ py: "16px", borderRadius: "8px" }}
                        onClick={() => setOnUploadSlipMode(true)}
                      >
                        {onLoading ? (
                          <CircularProgress color="info" />
                        ) : (
                          t("uploadNow")
                        )}
                      </Button>
                      {
                        props.type !== 'link-pay' && (
                          <Box>
                            <Box
                              borderTop="1px solid"
                              borderColor="grey.100"
                              my="24px"
                            />
                            <Button
                              type="submit"
                              variant="outlined"
                              fullWidth
                              sx={{ py: "16px", borderRadius: "8px" }}
                            >
                              {onLoading ? (
                                <CircularProgress color="info" />
                              ) : (
                                t("uploadLater")
                              )}
                            </Button>
                          </Box>
                        )
                      }
                    </>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disableElevation
                      sx={{
                        py: "12px",
                        borderRadius: "8px",
                        width: "100%",
                        fontSize: "12px",
                      }}
                      disabled={onLoading}
                    >
                      ทำรายการชำระเงิน
                    </Button>
                  )}
                </>
              )}
            </Box>
          </Box>
        </>
      )}
    </DefaultLayout>
  );
};

export default PaymentDetail;
