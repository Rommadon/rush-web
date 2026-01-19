import { NextPage } from "next"

import { SettingProps, Setting } from "src/userProfile"
import { getProps } from "utils"

const SettingPage: NextPage<SettingProps> = (props) => {
  return <Setting {...props} />
}

export default SettingPage

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