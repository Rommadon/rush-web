import { NextPage } from "next";
import { NotificationSetting, NotificationSettingProps } from "src";

import { getProps } from "utils";

export const NotificationSettingPage: NextPage<NotificationSettingProps> = (props) => {
  return <NotificationSetting {...props} />;
};

export default NotificationSettingPage;

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, _accessToken) => {
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
