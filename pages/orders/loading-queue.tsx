import { NextPage } from "next";
import { LoadingQueue } from "src/order/components/LoadingQueue";
import { LoadingQueueProps } from "src/order/components/LoadingQueue/LoadingQueue";
import { getProps } from "utils";

const LoadingQueuePage: NextPage<LoadingQueueProps> = (props) => {
  return <LoadingQueue {...props} />;
};

export default LoadingQueuePage;

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, accessToken) => {
    try {
      const { orderQueueUuid, waitingQueue, checkTime } = context.query;

      const hasRequiredParams = orderQueueUuid && waitingQueue && checkTime;

      if (!hasRequiredParams) {
        context.res.statusCode = 302;
        context.res.setHeader("Location", "/500");
      }

      return {
        props: {
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
            ...require(`src/order/messages/${context.locale}.json`),
          },
          orderQueueUuid: orderQueueUuid || "",
          waitingQueue: Number(waitingQueue) || 0,
          checkTime: Number(checkTime) || 0,
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
