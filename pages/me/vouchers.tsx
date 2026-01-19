import { NextPage } from "next";
import { VoucherRepository } from "src";
import VoucherList, { VoucherListProps } from "src/order/components/VoucherList";

import { getProps } from "utils";

export const VoucherListPage: NextPage<VoucherListProps> = (props) => {
  return <VoucherList {...props} />;
};

export default VoucherListPage;

export const getServerSideProps = getProps({
  loginRequired: false,
  resolver: async (context, accessToken) => {
    try {
      const responses = await Promise.allSettled([
        new VoucherRepository(accessToken, context.req.headers.host).allActive(),
        new VoucherRepository(accessToken, context.req.headers.host).allInActive(),
      ]);

      // @ts-ignore
      const [vouchers, vouchersInActive ] = responses.map((response) => response?.value);

      console.log(vouchers, vouchersInActive )
      return {
        props: {
          vouchers: vouchers?.data,
          vouchersInActive: vouchersInActive?.data,
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
