import { NextPage } from "next";
import { OrderDetailProps, OrderDetail } from "src/order";
import { getProps } from "utils";
import { OrderRepository } from "repositories";

const OrderDetailPage: NextPage<OrderDetailProps> = (props) => {
  // @ts-ignore
  return <OrderDetail {...props} />;
};

export default OrderDetailPage;

export const getServerSideProps = getProps({
  loginRequired: false,
  resolver: async (context, accessToken) => {
    try {
      const responses = await Promise.allSettled([
        new OrderRepository(accessToken, context.req.headers.host).getLinkPay(
          // @ts-ignore
          context.params.uuid
        ),
      ]);

      // @ts-ignore
      const [order] = responses.map((response) => response?.value);
      if (order === undefined || order === null) {
        context.res.statusCode = 302;
        context.res.setHeader("Location", "/500");
        return {
          props: {},
        };
      }

      return {
        props: {
          order: order,
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
            ...require(`src/order/messages/${context.locale}.json`),
          },
          type: "link-pay",
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
