import { NextPage } from "next";
import { DefaultLayoutProp, OrderLayoutProps } from "src";
import VoucherDetail from "src/order/components/VoucherDetail/VoucherDetail";
import { VoucherModel } from "src/order/models/Voucher";
import { getProps } from "utils";
import { VoucherRepository } from "src";

export type VoucherDetailProps = DefaultLayoutProp & {
  voucher: VoucherModel;
};

const VoucherDetailPage: NextPage<VoucherDetailProps & OrderLayoutProps> = (props) => {
  return <VoucherDetail {...props} />;
};

export default VoucherDetailPage;

export const getServerSideProps = getProps({
  loginRequired: false,
  resolver: async (context, accessToken) => {
    try {
      const responses = await Promise.allSettled([
        // @ts-ignore
        new VoucherRepository(accessToken, context.req.headers.host).getById(context?.params?.slug),
      ]);

      // @ts-ignore
      const [voucher] = responses.map((response) => response?.value);

      return {
        props: {
          voucher: voucher?.data,
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

