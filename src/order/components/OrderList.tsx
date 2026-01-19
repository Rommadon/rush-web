import { FC, useContext, SyntheticEvent, useState, useEffect } from "react";
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
  CircularProgress,
  useMediaQuery,
  MenuItem,
  Select,
  Tab,
  Tabs
} from "@mui/material";
import { useTranslations } from "next-intl";
import InfiniteScroll from "react-infinite-scroll-component";

import { DefaultLayout, DefaultLayoutProp, EmptyList, FooterMobile, MobileAppBar, OrdersIcon } from "src/core/components";

import { Sidebar } from "./Sidebar";
import { OrderItem } from "./OrderItem";
import { OrderModel } from "../models";
import { AuthContext, routes, useResource } from "src";
import { useRouter } from "next/router";
import { OrderLayout, OrderLayoutProps } from "./OrderLayout";

export type OrderListProps = OrderLayoutProps & {
  orders: OrderModel[];
  orderMeta: any;
  status: string;
};

export const OrderList: FC<OrderListProps> = (props) => {
  const t = useTranslations("order.orderList");
  const { profile } = useContext(AuthContext);
  const [value, setValue] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const resource = useResource();
  const router = useRouter();

  const [selectedStatuses, setSelectedStatuses] = useState<string>(
    props.status || "all"
  );
  const [ordersData, setOrdersData] = useState<OrderModel[]>(
    props.orders || []
  );
  const [page, setPage] = useState<number>(1);
  const [onLoading, setOnloading] = useState<boolean>(false);

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
  };

  const onFetchData = async () => {
    const fetchOrder = await resource.fetchResource(
      `order-public?status=${selectedStatuses}&page=${page + 1}`,
      {},
      ""
    );
    setPage(page + 1);
    setOrdersData(ordersData.concat(fetchOrder?.data?.data));
  };

  useEffect(() => {
    if (props.orders) {
      setOrdersData(props.orders);
    }
  }, [props.orders]);

  const onHandleStatusClick = (checkedStatus: string) =>
    handleStatusClick(checkedStatus);
  const onResetLoading = () => setOnloading(false);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        setValue(newValue)
        setPage(1);
        setOnloading(true);
        setSelectedStatuses("all");
        router.push(`/me/orders?status=all&page=1`).then(() => {
          setOnloading(false);
        })
        break;
      case 1:
        setValue(newValue)
        setPage(1);
        setOnloading(true);
        setSelectedStatuses("pendingPayment");
        router.push(`/me/orders?status=pendingPayment&page=1`).then(() => {
          setOnloading(false);
        })
        break;
      case 2:
        setValue(newValue)
        setPage(1);
        setOnloading(true);
        setSelectedStatuses("pendingVerify");
        router.push(`/me/orders?status=pendingVerify&page=1`).then(() => {
          setOnloading(false);
        })
        break;
      case 3:
        setValue(newValue)
        setPage(1);
        setOnloading(true);
        setSelectedStatuses("prepareProduct");
        router.push(`/me/orders?status=prepareProduct&page=1`).then(() => {
          setOnloading(false);
        })
        break;
      case 4:
        setValue(newValue)
        setPage(1);
        setOnloading(true);
        setSelectedStatuses("shipping");
        router.push(`/me/orders?status=shipping&page=1`).then(() => {
          setOnloading(false);
        })
        break;
      case 5:
        setValue(newValue)
        setPage(1);
        setOnloading(true);
        setSelectedStatuses("success");
        router.push(`/me/orders?status=success&page=1`).then(() => {
          setOnloading(false);
        })
        break;
      case 6:
        setValue(newValue)
        setPage(1);
        setOnloading(true);
        setSelectedStatuses("cancel");
        router.push(`/me/orders?status=cancel&page=1`).then(() => {
          setOnloading(false);
        })
        break;
      case 7:
        setValue(newValue)
        setPage(1);
        setOnloading(true);
        setSelectedStatuses("expire");
        router.push(`/me/orders?status=expire&page=1`).then(() => {
          setOnloading(false);
        })
        break;
      default:
        break;
    }
  }
    

  const onChangeStatus = (checkedStatus: string) => {
    setPage(1);
    setOnloading(true);
    setSelectedStatuses(checkedStatus);
    router.push(`/me/orders?status=${checkedStatus}&page=1`).then(() => {
      setOnloading(false);
    })
  }

  return (
    <OrderLayout
      {...props}
      onDisableLoading
      title={`${t("title")} ${profile?.user?.name || profile?.tel}`}
      sidebarProps={{ onHandleStatusClick, onResetLoading }}
      subtitle={
        isDesktop
          ? `${t("orders")}: ${t(`status.${selectedStatuses}`)}`
          : t("orders")
      }
      subtitleComponent={
        <Typography variant="h4">
          {t("items", { item: props.orderMeta?.totalItems })}
        </Typography>
      }
    >
      {
        isDesktop ? (
          <Box>
            <Box pt="16px" px={isDesktop ? "0" : "16px"} pb={isDesktop ? "16px" : "0"} position="sticky">
              <Select
                onChange={(e) => onChangeStatus(e.target.value)}
                fullWidth
                value={selectedStatuses}
                defaultValue={selectedStatuses}
              >
                {Object.keys(statuses).map((status) => (
                  <MenuItem key={status} value={status}>
                    {t(`status.${status}`)}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <List sx={{ width: "100%", pb: "48px" }}>
              {onLoading ? (
                <Box py="40px" textAlign="center">
                  <CircularProgress color="info" />
                </Box>
              ) : (
                ordersData && ordersData.length > 0 ? (
                  <InfiniteScroll
                  dataLength={ordersData.length}
                  next={onFetchData}
                  hasMore={ordersData.length !== props.orderMeta?.totalItems}
                  loader={
                    <p style={{ textAlign: "center" }}>
                      <CircularProgress color="info" />
                    </p>
                  }
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                    </p>
                  }
                >
                  {ordersData?.map((order) => (
                    <Box key={order.id} pb={isDesktop ? "16px" : "8px"} width="100%" bgcolor={ isDesktop ? "white" : "grey.100" }>
                      <OrderItem {...order} />
                    </Box>
                  ))}
                </InfiniteScroll>
                ) : (
                  <EmptyList text="ไม่พบคำสั่งซื้อ" icon={<OrdersIcon fontSize={isDesktop ? "65px" : "40px"} color="#6B7280" />} />
                )
              )}
            </List>
          </Box>
        ) : (
          <Box>
            <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons={false} textColor="inherit">
              <Tab label="ทั้งหมด" sx={{ fontSize: isDesktop ? '18px' : '12px', fontWeight: 'light' }} />
              <Tab label="รอชำระ" sx={{ fontSize: isDesktop ? '18px' : '12px', fontWeight: 'light' }} />
              <Tab label="รอตรวจสอบ" sx={{ fontSize: isDesktop ? '18px' : '12px', fontWeight: 'light' }} />
              <Tab label="เตรียมสินค้า" sx={{ fontSize: isDesktop ? '18px' : '12px', fontWeight: 'light' }} />
              <Tab label="กำลังส่ง" sx={{ fontSize: isDesktop ? '18px' : '12px', fontWeight: 'light' }} />
              <Tab label="สำเร็จ" sx={{ fontSize: isDesktop ? '18px' : '12px', fontWeight: 'light' }} />
              <Tab label="ถูกยกเลิก" sx={{ fontSize: isDesktop ? '18px' : '12px', fontWeight: 'light' }} />
              <Tab label="หมดอายุ" sx={{ fontSize: isDesktop ? '18px' : '12px', fontWeight: 'light' }} />
            </Tabs>

            <List sx={{ width: "100%", pb: "48px" }}>
              {onLoading ? (
                <Box py="40px" textAlign="center">
                  <CircularProgress color="info" />
                </Box>
              ) : (
                ordersData && ordersData.length > 0 ? (
                  <InfiniteScroll
                  dataLength={ordersData.length}
                  next={onFetchData}
                  hasMore={ordersData.length !== props.orderMeta?.totalItems}
                  loader={
                    <p style={{ textAlign: "center" }}>
                      <CircularProgress color="info" />
                    </p>
                  }
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                    </p>
                  }
                >
                  {ordersData?.map((order) => (
                    <Box key={order.id} pb={isDesktop ? "16px" : "8px"} width="100%" bgcolor={ isDesktop ? "white" : "grey.100" }>
                      <OrderItem {...order} />
                    </Box>
                  ))}
                </InfiniteScroll>
                ) : (
                  <EmptyList text="ไม่พบคำสั่งซื้อ" icon={<OrdersIcon fontSize={isDesktop ? "65px" : "40px"} color="#6B7280" />} />
                )
              )}
            </List>
          </Box>
        )
      }
      
    </OrderLayout>
  );
};

export default OrderList;
