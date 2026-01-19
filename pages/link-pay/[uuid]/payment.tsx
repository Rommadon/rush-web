import { NextPage } from 'next'
import { OrderRepository } from 'repositories'
import PaymentDetail, { PaymentDetailProps } from 'src/order/components/PaymentDetail'
import { getProps } from 'utils'

const OrderPaymentDetail: NextPage<PaymentDetailProps> = (props) => {
  return (
    <PaymentDetail {...props} />
  )
}

export default OrderPaymentDetail

export const getServerSideProps = getProps({
  loginRequired: false,
  resolver: async (context, _accessToken) => {
    const responses = await Promise.allSettled([
      // @ts-ignore
      new OrderRepository(_accessToken, context.req.headers.host).getLinkPay(context.params.uuid)
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

    try {
      return {
        props: {
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
            ...require(`src/order/messages/${context.locale}.json`),
          },
          order: order,
          type: 'link-pay'
        },
      }
    } catch (error) {
      context.res.statusCode = 302;
      context.res.setHeader("Location", "/500");
      console.log(error);
      return {
        props: {},
      };
    }
  }
})