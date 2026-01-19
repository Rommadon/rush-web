import { NextPage } from "next";

import { NewAddress, NewAddressProps } from "src";
import { getProps } from "utils";


const NewAddressesPage: NextPage<NewAddressProps> = (props) => {
  return <NewAddress {...props} />
};

export default NewAddressesPage;

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