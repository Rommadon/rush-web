import { FC, useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Tabs,
  Tab,
  useMediaQuery,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import SwipeableViews from "react-swipeable-views";

import { DirectNotificationModel } from "src/core/models/directNotification";
import { AuthContext, CustomerWalletTransactionActionType, CustomerWalletTransactionModel, EmptyList, NotificationsIcon, OrderLayout, OrderLayoutProps, ShopditPointItem, useResource } from "src";
import { DirectNotificationDetailType } from "src/core/models/enum/directNotification";

export type ShopditPointProps = OrderLayoutProps & {
  customerWalletTransactionsIncrease: CustomerWalletTransactionModel[];
  customerWalletTransactionsIncreaseMeta: any;
  customerWalletTransactionsDecrease: CustomerWalletTransactionModel[];
  customerWalletTransactionsDecreaseMeta: any;
};

export const ShopditPoint: FC<ShopditPointProps> = (props) => {
  const { profile, currentMerchant } = useContext(AuthContext);
  const resource = useResource();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [customerWalletTransactionsIncreaseData, setCustomerWalletTransactionsIncreaseData] = useState<
  CustomerWalletTransactionModel[]
  >(props.customerWalletTransactionsIncrease || []);
  const [customerWalletTransactionsDecreaseData, setCustomerWalletTransactionsDecreaseData] = useState<
  CustomerWalletTransactionModel[]
>(props.customerWalletTransactionsDecrease || []);
  const [customerWalletTransactionsIncreasePage, setCustomerWalletTransactionsIncreasePage] = useState<number>(1);
  const [customerWalletTransactionsDecreasePage, setCustomerWalletTransactionsDecreasePage] = useState<number>(1);

  const onFetchCustomerWalletTransactionsIncreaseData = async () => {
    const fetchData = await resource.fetchResource(
      `/customer-public/customerWallet?type=increase&page=${customerWalletTransactionsIncreasePage + 1}`,
      {},
      ""
    );
    setCustomerWalletTransactionsIncreasePage(customerWalletTransactionsIncreasePage + 1);
    setCustomerWalletTransactionsIncreaseData(
      customerWalletTransactionsIncreaseData.concat(fetchData?.data?.customerWalletTransactions?.data)
    );
  };

  const onFetchCustomerWalletTransactionsDecreaseData = async () => {
    const fetchData = await resource.fetchResource(
      `/customer-public/customerWallet?type=decrease&page=${customerWalletTransactionsDecreasePage + 1}`,
      {},
      ""
    );
    setCustomerWalletTransactionsDecreasePage(customerWalletTransactionsDecreasePage + 1);
    setCustomerWalletTransactionsDecreaseData(
      customerWalletTransactionsDecreaseData.concat(fetchData?.data?.customerWalletTransactions?.data)
    );
  };

  useEffect(() => {
    if (props.customerWalletTransactionsIncrease) {
      setCustomerWalletTransactionsIncreaseData(props.customerWalletTransactionsIncrease);
    }
  }, [props.customerWalletTransactionsIncrease]);

  useEffect(() => {
    if (props.customerWalletTransactionsDecrease) {
      setCustomerWalletTransactionsDecreaseData(props.customerWalletTransactionsDecrease);
    }
  }, [props.customerWalletTransactionsDecrease]);

  const getTitle = (customerWalletTransaction: CustomerWalletTransactionModel) => {
    switch (customerWalletTransaction.actionType) {
      case CustomerWalletTransactionActionType.EARN_BY_ORDER:
        return `ได้รับแต้มจากคำสั่งซื้อ ${customerWalletTransaction.actionValue}`;
      case CustomerWalletTransactionActionType.USE_BY_ORDER:
        return `ใช้แต้มจากคำสั่งซื้อ ${customerWalletTransaction.actionValue}`;
      case CustomerWalletTransactionActionType.CANCEL_ORDER:
        return `คืนแต้มจากการยกเลิกคำสั่งซื้อ ${customerWalletTransaction.actionValue}`;
      case CustomerWalletTransactionActionType.EXPIRE_ORDER:
        return `คืนแต้มจากการคำสั่งซื้อ ${customerWalletTransaction.actionValue} หมดอายุ`;
    }
  };

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <OrderLayout
      {...props}
      title={`บัญชีของ ${profile?.fullName || profile?.tel || profile?.email}`}
    >
      <Box mt="40px" mb="58px" width="100%">
        <Box py="30px" bgcolor="grey.100" display="flex" alignItems="center" justifyContent="center">
          <Box width="30px" height="30px" color="white" bgcolor={"#00B900"} borderRadius="50%" textAlign="center" display="flex" alignItems="center" justifyContent="center">
            <Typography component="h2" variant="h2">
              P
            </Typography>
          </Box>
          <Typography component="h1" variant="h1" px="8px">
            {profile?.customerWallet?.shopditPoint}
          </Typography>
        </Box>
        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
          variant="fullWidth"
          sx={{
            marginBottom: "16px"
          }}
        >
          <Tab label="ได้รับ" />
          <Tab label="ใช้แล้ว" />
        </Tabs>
        <SwipeableViews
          index={selectedTab}
          onChangeIndex={(index) => setSelectedTab(index)}
        >
          {
            customerWalletTransactionsIncreaseData && customerWalletTransactionsIncreaseData.length > 0 ? (
              <InfiniteScroll
                dataLength={customerWalletTransactionsIncreaseData.length}
                next={onFetchCustomerWalletTransactionsIncreaseData}
                hasMore={
                  customerWalletTransactionsIncreaseData.length !==
                  props.customerWalletTransactionsIncreaseMeta?.totalItems
                }
                loader={
                  <p style={{ textAlign: "center" }}>
                    <CircularProgress color="info" />
                  </p>
                }
              >
                {customerWalletTransactionsIncreaseData?.map((customerWalletTransactionsIncrease) => (
                  <ShopditPointItem
                    key={customerWalletTransactionsIncrease.id}
                    title={getTitle(customerWalletTransactionsIncrease)}
                    createdAt={customerWalletTransactionsIncrease.createdAt}
                    point={customerWalletTransactionsIncrease.value}
                    type={customerWalletTransactionsIncrease.type}
                  />
                ))}
              </InfiniteScroll>
            ) : (
              <EmptyList text="ไม่พบรายการได้รับพอยท์" icon={<NotificationsIcon fontSize={isDesktop ? "65px" : "40px"} color="#6B7280" />} />
            )
          }
          {
            customerWalletTransactionsDecreaseData && customerWalletTransactionsDecreaseData.length > 0 ? (
              <InfiniteScroll
                dataLength={customerWalletTransactionsDecreaseData.length}
                next={onFetchCustomerWalletTransactionsDecreaseData}
                hasMore={
                  customerWalletTransactionsDecreaseData.length !==
                  props.customerWalletTransactionsDecreaseMeta?.totalItems
                }
                loader={
                  <p style={{ textAlign: "center" }}>
                    <CircularProgress color="info" />
                  </p>
                }
              >
                {customerWalletTransactionsDecreaseData?.map((customerWalletTransactionsDecrease) => (
                  <ShopditPointItem
                    key={customerWalletTransactionsDecrease.id}
                    title={getTitle(customerWalletTransactionsDecrease)}
                    createdAt={customerWalletTransactionsDecrease.createdAt}
                    point={customerWalletTransactionsDecrease.value}
                    type={customerWalletTransactionsDecrease.type}
                  />
                ))}
              </InfiniteScroll>
            ) : (
              <EmptyList text="ไม่พบรายการได้รับพอยท์" icon={<NotificationsIcon fontSize={isDesktop ? "65px" : "40px"} color="#6B7280" />} />
            )
          }
        </SwipeableViews>
      </Box>
    </OrderLayout>
  );
};

export default ShopditPoint;
