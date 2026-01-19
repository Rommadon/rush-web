import { NextPage } from "next";
import { CouponRepository } from "src";

import { AddCouponListProps, AddCouponList } from "src/order/components";
import { getProps } from "utils";

export const AddCouponPage: NextPage<AddCouponListProps> = (props) => {
  // @ts-ignore
  return <AddCouponList {...props} />;
};

export default AddCouponPage;

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, accessToken) => {
    try {
      const responses = await Promise.allSettled([
        new CouponRepository(accessToken, context.req.headers.host).allWithOutCustomerKeep(context.query?.code || ''),
      ]);

      // @ts-ignore
      const [coupons] = responses.map((response) => response?.value);

      return {
        props: {
          coupons,
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
