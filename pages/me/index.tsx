import { NextPage } from "next";
import { MeProps, Me } from "src/userProfile";
import { getProps } from "utils";

const MePage: NextPage<MeProps> =(props: any) => {
  return <Me {...props} />
}

export default MePage

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