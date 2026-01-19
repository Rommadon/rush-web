import { NextPage } from "next";
import { RefundPolicy, RefundPolicyProps } from "src/core";
import { getProps } from "utils";

const RefundPolicyPage: NextPage<RefundPolicyProps> = (props) => {
  return <RefundPolicy {...props} />;
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
      console.log(error)
      return {
        props: {},
      };
    }
  },
});

export default RefundPolicyPage;
