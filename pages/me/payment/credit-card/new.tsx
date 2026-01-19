import { NextPage } from "next";
import { getProps } from "utils";

import { NewPayment, NewPaymentProps } from "src/userProfile/components/NewPayment";

const NewPayemntPage: NextPage<NewPaymentProps> = (props) => {
  return <NewPayment {...props} />
};

export default NewPayemntPage;

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, accessToken) => {
    try {
      return {
        props: {
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
