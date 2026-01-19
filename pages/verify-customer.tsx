import { NextPage } from "next";
import { VerifyCustomer } from "src/auth";
import { getProps } from "utils";

const VerifyCustomerPage: NextPage<any> = (props) => {
  return <VerifyCustomer {...props} />;
};

export const getServerSideProps = getProps({
  loginRequired: false,
  resolver: async (context, accessToken) => {
    try {
      return {
        props: {
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
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

export default VerifyCustomerPage;
