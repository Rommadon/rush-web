import { NextPage } from "next";
import { CustomerCreditCardRepository } from "repositories";
import { PaymentList, PaymentListProps } from "src";
import { getProps } from "utils";

const PaymentPage: NextPage<PaymentListProps> = (props) => {
  return <PaymentList {...props} />
}

export default PaymentPage

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, accessToken) => {
    try {
      const responses = await Promise.allSettled([
        new CustomerCreditCardRepository(accessToken, context.req.headers.host).getCustomerCreditCards(),
      ]);

      // @ts-ignore
      const [customerCreditCards] = responses.map((response) => response?.value);
      return {
        props: {
          creditCards: customerCreditCards?.data || [],
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