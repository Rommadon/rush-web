import { NextPage } from 'next'
import { OrderSuccess } from 'src/virtual/components/order/OrderSuccess'
import { getProps } from 'utils'

const OrderSuccessPage: NextPage<any> = (props) => {
  return (
    <OrderSuccess {...props} />
  )
}

export default OrderSuccessPage

export const getServerSideProps = getProps({
  loginRequired: false,
  isVirtualShop: true,
  resolver: async (context, accessToken) => {
    try {
      return {
        props: {
          messages: {
            ...require(`src/virtual/messages/${context.locale}.json`),
          },
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
