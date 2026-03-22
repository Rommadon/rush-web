import {
  Box,
  SvgIcon,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import { useTranslations, useIntl } from "next-intl";
import NextImage from "next/image";
import QRCode from "react-qr-code";

import { useResource, AuthContext } from "src";
import { useToast } from "src/core/hooks/useToast";
import { VoucherModel, VoucherStatus } from "../models/Voucher";
import router from "next/router";
import chatIcon from "public/icons/chat.svg";
import Image from "next/image";
import phoneIcon from "public/icons/phone.svg";

export type VoucherItemProps = VoucherModel & {
  onClick?: () => any;
  checked?: boolean;
  disableCheckbox?: boolean;
  enableDetail?: boolean;
  inactive?: boolean;
  onKeep?: boolean;
  onFetch: () => any;
};

export const VoucherItem: FC<VoucherItemProps> = (props) => {
  const t = useTranslations("order.voucherItem");
  const resource = useResource();
  const toast = useToast();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { currentMerchant } = useContext(AuthContext);

  const [sortByMobileOpen, setSortByMobileOpen] = useState(false);
  const [isShowContact, setIsShowContact] = useState(false);

  const prepareVoucher = async () => {
    if (props.status === VoucherStatus.PENDING) {
      try {
        await resource.createResource(
          `voucher-public/${props.id}/prepared`,
          {}
        );
        if (props.onFetch) {
          await props.onFetch();
          setSortByMobileOpen(true);
        }
      } catch (error: any) {
        toast.openToast(error.message, "error");
      }
    } else {
      setSortByMobileOpen(true);
    }
  };

  const goToDetail = () => {
    router.push(`/me/vouchers/${props.id}`);
  };

  return (
    <Box>
      <Box display="flex" width="100%" bgcolor={"white"}>
        <Box
          width={isDesktop ? "15%" : "33%"}
          position="relative"
          onClick={() => goToDetail()}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <NextImage  
              src={props.orderItem.productItemImageUrl || ""}
              width={110}
              height={110}
              blurDataURL={"/popular-product-thumbnail.jpg"}
              quality={70}
              alt={`${props?.name}`}
              objectFit="cover"
  unoptimized={true}
/>
          </Box>
          <Box
            bgcolor={
              props.status === VoucherStatus.COMPLETED
                ? "grey.200"
                : props.status === VoucherStatus.EXPIRED
                ? "grey.200"
                : props.status === VoucherStatus.PENDING
                ? "orange.main"
                : "line.main"
            }
            textAlign="center"
            p="4px 8px"
          >
            <Typography color="white" fontSize="10px" textAlign="center">
              {props.status === VoucherStatus.PENDING && "รอใช้งาน"}
              {props.status === VoucherStatus.PREPARE && "รอตรวจสอบ"}
              {props.status === VoucherStatus.COMPLETED && "ใช้งานแล้ว"}
              {props.status === VoucherStatus.EXPIRED && "หมดอายุ"}
            </Typography>
          </Box>
        </Box>
        <Box
          p={isDesktop ? "16px" : "8px"}
          ml="8px"
          flex="1"
          boxShadow="0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box width="65%" onClick={() => goToDetail()}>
              <Typography variant="h4" pr="8px">
                {props.quantity > 1 &&
                  `(${props.usedQuantity || 0}/${props.quantity}) `}
                {props.name}
              </Typography>
            </Box>
            <Box textAlign={"center"} onClick={() => setIsShowContact(true)}>
              <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  fill="#64B5F6"
                  d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192zm176 40c-13.3 0-24 10.7-24 24v48H152c-13.3 0-24 10.7-24 24s10.7 24 24 24h48v48c0 13.3 10.7 24 24 24s24-10.7 24-24V352h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V256c0-13.3-10.7-24-24-24z"
                />
              </SvgIcon>
              <Typography variant="h6" color="#64B5F6">
                {t("booking")}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box>
              <Typography variant="h6" color="grey.400">
                {t("endDate")}{" "}
                {props.voucherExpiredDate
                  ? new Date(props.voucherExpiredDate).toLocaleDateString(
                      "th-TH",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "ไม่มีวันหมดอายุ"}
              </Typography>
            </Box>
            <Box>
              {props.status !== VoucherStatus.COMPLETED &&
                props.status !== VoucherStatus.EXPIRED && (
                  <Box
                    textAlign="center"
                    borderRadius="16px"
                    p="4px 8px"
                    height="24px"
                    border="1px solid #EF4423"
                    onClick={() => prepareVoucher()}
                  >
                    <Typography
                      color="red.50"
                      fontSize="10px"
                      textAlign="center"
                    >
                      {props.code ? "แสดงโค้ด" : "แลกโค้ด"}
                    </Typography>
                  </Box>
                )}
            </Box>
          </Box>
        </Box>
      </Box>
      <SwipeableDrawer
        anchor={"bottom"}
        open={sortByMobileOpen}
        onClose={() => setSortByMobileOpen(false)}
        onOpen={() => setSortByMobileOpen(true)}
      >
        {props.code && (
          <Box textAlign="center" margin={3} marginBottom={5}>
            <Typography variant="h3" marginBottom={2}>
              {props.name}
            </Typography>
            <Typography variant="h2" fontWeight={600} marginBottom={2}>
              CODE : {props.code}
            </Typography>
            <Box
              style={{
                height: "auto",
                margin: "0 auto",
                maxWidth: 150,
                width: "100%",
              }}
            >
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={props.code}
                viewBox={`0 0 256 256`}
              />
            </Box>
          </Box>
        )}
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor={"bottom"}
        open={isShowContact}
        onClose={() => setIsShowContact(false)}
        onOpen={() => setIsShowContact(true)}
      >
        <Box
          textAlign="center"
          display={"flex"}
          alignItems={"center"}
          margin={3}
          marginBottom={5}
          flexDirection={"column"}
        >
          <Typography variant="h3" marginBottom={4}>
            {t("contactInfo")}
          </Typography>
          {currentMerchant?.data?.tel && (
            <Box
              border={"1px solid #000000"}
              borderRadius="16px"
              width={"70%"}
              p="8px 16px"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              marginBottom={2}
              onClick={() => {
                window.open(
                  `tel: +66${currentMerchant?.data?.tel
                    .slice(1)
                    .split(" ")
                    .join("")}`,
                  "_blank"
                );
              }}
              sx={{ cursor: "pointer" }}
            >
              <Box>
                <Image src={phoneIcon} alt="chat icon" />
              </Box>
              <Typography variant="h4">{currentMerchant?.data?.tel}</Typography>
              <Box></Box>
            </Box>
          )}
          {currentMerchant?.data?.chatContract && (
            <Box
              border={"1px solid #000000"}
              borderRadius="16px"
              width={"70%"}
              p="8px 16px"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              onClick={() => {
                window.open(
                  "https://" +
                    currentMerchant?.data?.chatContract
                      .replace("https://", "")
                      .replace("http://", ""),
                  "_blank"
                );
              }}
              sx={{ cursor: "pointer" }}
            >
              <Box>
                <Image src={chatIcon} alt="phone icon" />
              </Box>
              <Typography variant="h4">Chat</Typography>
              <Box></Box>
            </Box>
          )}
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default VoucherItem;
