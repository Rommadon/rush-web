import { NextPage } from "next";
import { CouponRepository } from "src";

import { CouponListProps, CouponList } from "src/order/components/CouponList";
import { getProps } from "utils";

export const CouponListPage: NextPage<CouponListProps> = (props) => {
  // @ts-ignore
  return <CouponList {...props} />;
};

export default CouponListPage;

export const getServerSideProps = getProps({
  loginRequired: false,
  resolver: async (context, accessToken) => {
    try {
      const responses = await Promise.allSettled([
        new CouponRepository(accessToken, context.req.headers.host).allActive(),
        new CouponRepository(accessToken, context.req.headers.host).allInActive()
      ]);

      // @ts-ignore
      const [coupons, couponsInActive] = responses.map((response) => response?.value);

      return {
        props: {
          coupons: coupons,
          couponsInActive: couponsInActive,
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
