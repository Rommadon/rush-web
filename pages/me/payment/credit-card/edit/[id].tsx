import { NextPage } from "next";
import { CustomerCreditCardRepository } from "repositories";

import { EditCreditCard, EditCreditCardProps } from "src";
import { getProps } from "utils";


const EditCreditCardPage: NextPage<EditCreditCardProps> = (props) => {
  return <EditCreditCard {...props} />
};

export default EditCreditCardPage;

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, accessToken) => {
    try {
      const responses = await Promise.allSettled([
        new CustomerCreditCardRepository(accessToken, context.req.headers.host).getCustomerCreditCard(context?.params?.id),
      ]);

      // @ts-ignore
      const [customerCreditCard] = responses.map((response) => response?.value);

      return {
        props: {
          creditCard: customerCreditCard.data || {},
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
