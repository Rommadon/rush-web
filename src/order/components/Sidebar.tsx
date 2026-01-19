import { FC, useContext, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Box,
  Typography,
  ListItem,
  List,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Radio,
} from "@mui/material";
import NextLink from "next/link";
import { ChevronDownIcon } from "src/core/components";
import { AuthContext, routes } from "src";
import Router, { useRouter } from "next/router";

export type SidebarProps = {
  onHandleStatusClick?: any;
  onResetLoading?: any;
};

export const Sidebar: FC<SidebarProps> = (props) => {
  const router = useRouter();
  const t = useTranslations("order.orderList");
  const [selectedStatuses, setSelectedStatuses] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [onLoading, setOnloading] = useState<boolean>(false);
  const { currentMerchant } = useContext(AuthContext);

  const statuses: Record<string, string> = {
    all: "all",
    pendingPayment: "pendingPayment",
    pendingVerify: "pendingVerify",
    prepareProduct: "prepareProduct",
    shipping: "shipping",
    success: "success",
    cancel: "cancel",
    expire: "expire",
  };

  const handleStatusClick = (checkedStatus: string) => {
    setSelectedStatuses(checkedStatus);
    setPage(1);
    setOnloading(true);
    onChangeStatusOrder(checkedStatus);

    if (props.onHandleStatusClick) {
      props.onHandleStatusClick(checkedStatus);
    }
  };

  const shouldStatusChecked = (status: string) => {
    return selectedStatuses === status;
  };

  const onChangeStatusOrder = (filterStatus: string) => {
    Router.push(`/me/orders?page=1&status=${filterStatus}`).then(() => {
      setOnloading(false);

      if (props.onResetLoading) {
        props.onResetLoading();
      }
    });
  };

  return (
    <Box mt="48px">
      <Box borderBottom="1px solid" borderColor="grey.100" pb="48px">
        <Typography variant="h2" fontWeight="600">
          {t("service")}
        </Typography>
        {/* <Accordion elevation={0}>
          <AccordionSummary
            sx={{ pt: "20px", pb: "10px", px: "0" }}
            expandIcon={<ChevronDownIcon />}
          >
            <Typography
              color={
                routes.orderList().includes(router.pathname)
                  ? "primary"
                  : "inherit"
              }
              pl="16px"
            >
              {t("orders")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pb: "20px" }}>
            <List
              sx={{
                padding: 0,
                width: "100%",
                bgcolor: "#FAFAFB",
                borderRadius: "8px",
              }}
            >
              {Object.entries(statuses).map(([key, value]) => (
                <ListItem key={key} sx={{ width: "100%", p: 0 }}>
                  <ListItemButton
                    sx={{ width: "100%", p: "8px 16px" }}
                    onClick={() => handleStatusClick(key)}
                  >
                    <ListItemIcon>
                      <Radio
                        checked={shouldStatusChecked(key)}
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                      />
                    </ListItemIcon>
                    <ListItemText>{t(`status.${key}`)}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion> */}
        <NextLink href={routes.orderList()}>
          <Button
            variant="text"
            color="inherit"
            fullWidth
            sx={{ justifyContent: "start", py: "16px", pl: 0, mt: "16px" }}
          >
            <Typography
              variant="h4"
              textAlign="left"
              color={
                routes.orderList().includes(router.pathname)
                  ? "primary"
                  : "inherit"
              }
              pl="16px"
            >
              {t("orders")}
            </Typography>
          </Button>
        </NextLink>
        <NextLink href={routes.repurchasing()}>
          <Button
            variant="text"
            color="inherit"
            fullWidth
            sx={{ justifyContent: "start", py: "16px", pl: 0 }}
          >
            <Typography
              variant="h4"
              textAlign="left"
              color={
                routes.repurchasing().includes(router.pathname)
                  ? "primary"
                  : "inherit"
              }
              pl="16px"
            >
              {t("orderAgain")}
            </Typography>
          </Button>
        </NextLink>

        <NextLink href={routes.shopditPoint()}>
          <Button
            variant="text"
            color="inherit"
            fullWidth
            sx={{ justifyContent: "start", py: "16px", pl: 0 }}
          >
            <Typography
              variant="h4"
              textAlign="left"
              color={
                routes.wishlist().includes(router.pathname)
                  ? "primary"
                  : "inherit"
              }
              pl="16px"
            >
              {currentMerchant?.data?.slug} POINT
            </Typography>
          </Button>
        </NextLink>

        <NextLink href={routes.coupon()}>
          <Button
            variant="text"
            color="inherit"
            fullWidth
            sx={{ justifyContent: "start", py: "16px", pl: 0 }}
          >
            <Typography
              variant="h4"
              textAlign="left"
              color={
                routes.coupon().includes(router.pathname)
                  ? "primary"
                  : "inherit"
              }
              pl="16px"
            >
              {t("coupon")}
            </Typography>
          </Button>
        </NextLink>

        <NextLink href={routes.wishlist()}>
          <Button
            variant="text"
            color="inherit"
            fullWidth
            sx={{ justifyContent: "start", py: "16px", pl: 0 }}
          >
            <Typography
              variant="h4"
              textAlign="left"
              color={
                routes.wishlist().includes(router.pathname)
                  ? "primary"
                  : "inherit"
              }
              pl="16px"
            >
              {t("wishlist")}
            </Typography>
          </Button>
        </NextLink>
        {/* 
      <Button
        variant="text"
        color="inherit"
        fullWidth
        sx={{ justifyContent: "start", py: "16px", pl: 0 }}
      >
        <Typography variant="h4" textAlign="left">
          {t("promotion")}
        </Typography>
      </Button> */}

        <NextLink href={routes.notification()}>
          <Button
            variant="text"
            color="inherit"
            fullWidth
            sx={{ justifyContent: "start", py: "16px", pl: 0 }}
          >
            <Typography
              variant="h4"
              textAlign="left"
              color={
                routes.notification().includes(router.pathname)
                  ? "primary"
                  : "inherit"
              }
              pl="16px"
            >
              {t("notification")}
            </Typography>
          </Button>
        </NextLink>
        <NextLink href={routes.voucher()}>
          <Button
            variant="text"
            color="inherit"
            fullWidth
            sx={{ justifyContent: "start", py: "16px", pl: 0 }}
          >
            <Typography
              variant="h4"
              textAlign="left"
              color={
                routes.notification().includes(router.pathname)
                  ? "primary"
                  : "inherit"
              }
              pl="16px"
            >
              บัตรกำนัล
            </Typography>
          </Button>
        </NextLink>
      </Box>
      <Box borderBottom="1px solid" borderColor="grey.100" py="48px">
        <Typography variant="h2" fontWeight="600" mb="16px">
          บัญชีของฉัน
        </Typography>

        <NextLink href={routes.personalInfo()}>
          <Button
            variant="text"
            color="inherit"
            fullWidth
            sx={{ justifyContent: "start", py: "16px", pl: 0 }}
          >
            <Typography
              variant="h4"
              textAlign="left"
              color={
                routes.personalInfo().includes(router.pathname)
                  ? "primary"
                  : "inherit"
              }
              pl="16px"
            >
              ข้อมูลส่วนตัว
            </Typography>
          </Button>
        </NextLink>

        <NextLink href={routes.addresses()}>
          <Button
            variant="text"
            color="inherit"
            fullWidth
            sx={{ justifyContent: "start", py: "16px", pl: 0 }}
          >
            <Typography
              variant="h4"
              textAlign="left"
              color={
                routes.addresses().includes(router.pathname)
                  ? "primary"
                  : "inherit"
              }
              pl="16px"
            >
              จัดการที่อยู่
            </Typography>
          </Button>
        </NextLink>
        {/* <NextLink href={routes.payment()}>
          <Button
            variant="text"
            color="inherit"
            fullWidth
            sx={{ justifyContent: "start", py: "16px", pl: 0 }}
          >
            <Typography
              variant="h4"
              textAlign="left"
              color={
                routes.payment().includes(router.pathname)
                  ? "primary"
                  : "inherit"
              }
              pl="16px"
            >
              การชำระเงิน
            </Typography>
          </Button>
        </NextLink> */}
        <NextLink href={routes.setting()}>
          <Button
            variant="text"
            color="inherit"
            fullWidth
            sx={{ justifyContent: "start", py: "16px", pl: 0 }}
          >
            <Typography
              variant="h4"
              textAlign="left"
              color={
                routes.setting().includes(router.pathname)
                  ? "primary"
                  : "inherit"
              }
              pl="16px"
            >
              ตั้งค่า
            </Typography>
          </Button>
        </NextLink>
      </Box>
    </Box>
  );
};
