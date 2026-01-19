import { FC, useState, useEffect, useContext } from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useTranslations } from "next-intl";

import { routes } from "src/core/routes";
import {
  HomeIcon,
  ProductsIcon,
  OrdersIcon,
  NotificationsIcon,
  MyProfileIcon,
} from ".";
import { useRouter } from "next/router";
import { AuthContext, useAuth } from "src";

export const FooterMobile: FC<{}> = (props) => {
  const t = useTranslations("footerMobile");
  const { currentMerchant } = useContext(AuthContext);
  const { isAuth } = useAuth();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const _routes = [
    "/",
    routes.products(),
    isAuth ? routes.orderList() : routes.login(),
    isAuth ? routes.notification() : routes.login(),
    isAuth ? routes.me() : routes.login(),
  ];

  useEffect(() => {
    if (router.asPath !== "/") {
      const foundAt = _routes
        .slice(1)
        .findIndex((r) => router.asPath.split("?")[0] === r);
      setIndex(foundAt > -1 ? foundAt + 1 : foundAt);
    }
  }, []);

  if (index < 0) {
    return null;
  }

  return index >= 0 ? (
    <>
      {!currentMerchant?.data?.shopditProductWhitelists?.includes(
        "verifyMerchant"
      ) && (
        <Box
          sx={{
            backgroundColor: "#EF4423",
            textAlign: "center",
            padding: "10px",
            fontSize: "14px",
            color: "white",
          }}
        >
          ร้านนี้ยังไม่ได้ยืนยันตัวตน
        </Box>
      )}
      <BottomNavigation
        showLabels
        sx={{ width: "100%" }}
        value={index}
        onChange={(event, newValue) => {
          setIndex(newValue);
          router.push(_routes[newValue]);
        }}
      >
        <BottomNavigationAction label={t("home")} icon={<HomeIcon />} />
        <BottomNavigationAction label={t("products")} icon={<ProductsIcon />} />
        <BottomNavigationAction label={t("orders")} icon={<OrdersIcon />} />
        <BottomNavigationAction
          label={t("notifications")}
          icon={<NotificationsIcon />}
        />
        <BottomNavigationAction
          label={t("myProfile")}
          icon={<MyProfileIcon />}
        />
      </BottomNavigation>
    </>
  ) : null;
};
