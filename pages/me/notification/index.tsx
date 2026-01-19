import { NextPage } from "next";
import { NotificationList, NotificationListProps } from "src";
import { DirectNotificationRepository } from 'repositories'

// import { CouponListProps, CouponList } from "src/order/components/CouponList";
import { getProps } from "utils";

export const NotificationPage: NextPage<NotificationListProps> = (props) => {
  return <NotificationList {...props} />;
};

export default NotificationPage;

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, _accessToken) => {
    try {
      const responses = await Promise.allSettled([
        // @ts-ignore
        new DirectNotificationRepository(_accessToken, context.req.headers.host).getDirectNotifications({ page: context.query?.page || 1, limit: context.query?.limit || 10, withPagination: "true", detailType: context.query?.detailType || '' }),
        // @ts-ignore
        new DirectNotificationRepository(_accessToken, context.req.headers.host).getDirectNotificationBroadcasts({ page: context.query?.page || 1, limit: context.query?.limit || 10, withPagination: "true" })
      ]);
  
      // @ts-ignore
      const [directNotifications, directNotificationBroadcasts] = responses.map((response) => response?.value);

      console.log(directNotifications, directNotificationBroadcasts);

      return {
        props: {
          directNotifications: directNotifications.data,
          directNotificationMeta: directNotifications.meta,
          directNotificationBroadcasts: directNotificationBroadcasts.data,
          directNotificationBroadcastMeta: directNotificationBroadcasts.meta,
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
            ...require(`src/order/messages/${context.locale}.json`),
          },
        },
      };
    } catch (error) {
      context.res.statusCode = 302;
      context.res.setHeader("Location", "/500");
      console.log(error);
      return {
        props: {},
      };
    }
  },
});
