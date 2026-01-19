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

import OrderLayout, { OrderLayoutProps } from "./OrderLayout";
import { NotificationItem } from "./NotificationItem";
import { DirectNotificationModel } from "src/core/models/directNotification";
import { AuthContext, EmptyList, NotificationsIcon, useResource } from "src";
import { DirectNotificationDetailType } from "src/core/models/enum/directNotification";

export type NotificationListProps = OrderLayoutProps & {
  directNotifications: DirectNotificationModel[];
  directNotificationMeta: any;
};

export const NotificationList: FC<NotificationListProps> = (props) => {
  const { profile } = useContext(AuthContext);
  const resource = useResource();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [directNotificationsData, setDirectNotificationsData] = useState<
    DirectNotificationModel[]
  >(props.directNotifications || []);
  const [page, setPage] = useState<number>(1);
  const [isAlready, setIsAlready] = useState(false);

  const onFetchData = async () => {
    const fetchOrder = await resource.fetchResource(
      `direct-notification-public?page=${page + 1}`,
      {},
      ""
    );
    setPage(page + 1);
    setDirectNotificationsData(
      directNotificationsData.concat(fetchOrder?.data?.data)
    );
  };

  const updateBatchIsAlready = async () => {
    if (isAlready === false) {
      setIsAlready(true);
      await resource.updateResource(
        "direct-notification-public",
        "updateAlreadyBatch",
        {}
      );
    }
  };

  useEffect(() => {
    if (props.directNotifications) {
      setDirectNotificationsData(props.directNotifications);
    }
  }, [props.directNotifications]);

  const notificationType = (directNotification: DirectNotificationModel) => {
    switch (directNotification.detailType) {
      case DirectNotificationDetailType.VERIFY_ORDER:
        return "ยืนยันการชำระเงินสำเร็จแล้ว";
      case DirectNotificationDetailType.SHIPMENT_ORDER:
        return "อยู่ระหว่างการจัดส่ง";
      default:
        break;
    }
  };

  const notificationMessageType = (
    directNotification: DirectNotificationModel
  ) => {
    switch (directNotification.detailType) {
      case DirectNotificationDetailType.VERIFY_ORDER:
        return `ยืนยันการชำระเรียบร้อยของคำสั่งซื้อ ${directNotification?.order?.number || ""
          } แล้ว กรุณารอรับสินค้า`;
      case DirectNotificationDetailType.SHIPMENT_ORDER:
        return `จัดส่งโดย ${directNotification?.order?.orderShipment?.merchantShipment?.name || ""
          }\n${directNotification?.order?.orderShipment?.number &&
          `เลขพัสดุคือ : ${directNotification?.order?.orderShipment?.number}`
          }`;
      default:
        break;
    }
  };

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <OrderLayout
      {...props}
      title={`บัญชีของ ${profile?.fullName || profile?.tel || profile?.email}`}
      subtitle="แจ้งเตือน"
      subtitleComponent={
        <Box display="flex" alignItems="center">
          <Typography>
            {props.directNotificationMeta?.totalItems ?? 0} รายการ
          </Typography>
          <Box height="24px" width="1px" bgcolor="grey.100" mx="32px"></Box>
          <Button color="inherit" onClick={() => updateBatchIsAlready()}>
            <Typography sx={{ textDecoration: "underline" }}>
              อ่านทั้งหมด
            </Typography>
          </Button>
        </Box>
      }
    >
      <Box mt="40px" mb="58px" width="100%">
        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
          variant="fullWidth"
          sx={{
            marginBottom: "16px"
          }}
        >
          <Tab label="คำสั่งซื้อ" />
          <Tab label="โปรโมชั่น" />
        </Tabs>
        <SwipeableViews
          index={selectedTab}
          onChangeIndex={(index) => setSelectedTab(index)}
        >
          {
            directNotificationsData && directNotificationsData.length > 0 ? (
              <InfiniteScroll
                dataLength={directNotificationsData.length}
                next={onFetchData}
                hasMore={
                  directNotificationsData.length !==
                  props.directNotificationMeta?.totalItems
                }
                loader={
                  <p style={{ textAlign: "center" }}>
                    <CircularProgress color="info" />
                  </p>
                }
              >
                {props.directNotifications?.map((directNotification) => (
                  <NotificationItem
                    key={directNotification?.id}
                    id={directNotification?.id}
                    title={notificationType(directNotification)}
                    src={
                      directNotification.order?.orderItems[0]?.productItem?.product?.productImages?.find(
                        (image) => image.order === 0
                      )?.imageUpload?.url || ""
                    }
                    subTitle={directNotification.order}
                    body={notificationMessageType(directNotification)}
                    createdAt={new Date(directNotification.createdAt).toString()}
                    isAlready={isAlready ? isAlready : directNotification.isAlready}
                  />
                ))}
              </InfiniteScroll>
            ) : (
              <EmptyList text="ไม่พบรายการแจ้งเตือน" icon={<NotificationsIcon fontSize={isDesktop ? "65px" : "40px"} color="#6B7280" />} />
            )
          }
          {/* <InfiniteScroll
            dataLength={directNotificationsData.length}
            next={onFetchData}
            hasMore={
              directNotificationsData.length !==
              props.directNotificationMeta?.totalItems
            }
            loader={
              <p style={{ textAlign: "center" }}>
                <CircularProgress color="info" />
              </p>
            }
          >
            {props.directNotifications?.map((directNotification) => (
              <NotificationItem
                key={directNotification?.id}
                id={directNotification?.id}
                title={notificationType(directNotification)}
                src={
                  directNotification.order?.orderItems[0]?.productItem?.product?.productImages?.find(
                    (image) => image.order === 0
                  )?.imageUpload?.url || ""
                }
                subTitle={directNotification.order}
                body={notificationMessageType(directNotification)}
                createdAt={new Date(directNotification.createdAt).toString()}
                isAlready={isAlready ? isAlready : directNotification.isAlready}
              />
            ))}
          </InfiniteScroll> */}
          <EmptyList text="ไม่พบรายการแจ้งเตือน" icon={<NotificationsIcon fontSize={isDesktop ? "65px" : "40px"} color="#6B7280" />} />
        </SwipeableViews>
      </Box>
    </OrderLayout>
  );
};

export default NotificationList;
