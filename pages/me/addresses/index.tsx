import { NextPage } from "next";
import { CustomerAddressRepository } from "repositories";
import { AddressList, AddressListProps, CustomerAddressModel } from "src"
import { getProps } from "utils";

const AddressesPage: NextPage<AddressListProps> = (props) => {
  return <AddressList {...props} />
}

export default AddressesPage

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, accessToken) => {
    try {
      const responses = await Promise.allSettled([
        new CustomerAddressRepository(accessToken, context.req.headers.host).getCustomerAddresses(),
      ]);

      // @ts-ignore
      const [customerAddresses] = responses.map((response) => response?.value);
      return {
        props: {
          addresses: customerAddresses?.data || [],
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