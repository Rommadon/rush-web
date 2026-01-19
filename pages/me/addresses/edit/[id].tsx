import { NextPage } from "next";
import { CustomerAddressRepository } from "repositories";

import { EditAddress, EditAddressProps } from "src";
import { getProps } from "utils";


const EditAddressesPage: NextPage<EditAddressProps> = (props) => {
  return <EditAddress {...props} />
};

export default EditAddressesPage;

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, accessToken) => {
    try {
      const responses = await Promise.allSettled([
        new CustomerAddressRepository(accessToken, context.req.headers.host).getCustomerAddress(context?.params?.id),
      ]);

      // @ts-ignore
      const [customerAddress] = responses.map((response) => response?.value);

      return {
        props: {
          customerAddress: customerAddress.data || {},
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
