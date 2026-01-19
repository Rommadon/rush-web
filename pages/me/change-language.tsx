import { NextPage } from "next";
import { ChangeLanguageProps } from "src/userProfile/components/ChangeLanguage";
import { ChangeLanguage } from "src";

import { getProps } from "utils";

export const ChangeLanguagePage: NextPage<ChangeLanguageProps> = (props) => {
  // @ts-ignore
  return <ChangeLanguage {...props} />;
};

export default ChangeLanguagePage;

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
