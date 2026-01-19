import { NextPage } from "next";
import OrderList, { OrderListProps } from "src/order/components/OrderList";
import { getProps } from "utils/getProps";
import { OrderRepository } from 'repositories'

const OrderListPage: NextPage<OrderListProps> = (props) => {
  // @ts-ignore  
  return <OrderList {...props} />;
};

export default OrderListPage;

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, _accessToken) => {
    try {
      const responses = await Promise.allSettled([
        // @ts-ignore
        new OrderRepository(_accessToken, context.req.headers.host).getOrders({ page: context.query?.page || 1, limit: context.query?.limit || 10, withPagination: "true", number: context.query?.number || '', status: context.query?.status || 'all' })
      ]);
  
      // @ts-ignore
      const [orders] = responses.map((response) => response?.value);

      return {
        props: {
          orders: orders.data,
          orderMeta: orders.meta,
          status: context.query?.status || 'all',
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

