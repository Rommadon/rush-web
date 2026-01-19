import { NextPage } from "next";
import { ShopditPoint, ShopditPointProps } from "src";
import { CustomerRepository } from 'repositories'

// import { CouponListProps, CouponList } from "src/order/components/CouponList";
import { getProps } from "utils";

export const ShopditPointPage: NextPage<ShopditPointProps> = (props) => {
  return <ShopditPoint {...props} />;
};

export default ShopditPointPage;

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, _accessToken) => {
    try {
      const responses = await Promise.allSettled([
        // @ts-ignore
        new CustomerRepository(_accessToken, context.req.headers.host).getCustomerWallet({ page: context.query?.page || 1, limit: context.query?.limit || 10, withPagination: "true", type: 'increase' }),
        // @ts-ignore
        new CustomerRepository(_accessToken, context.req.headers.host).getCustomerWallet({ page: context.query?.page || 1, limit: context.query?.limit || 10, withPagination: "true", type: 'decrease' })
      ]);
  
      // @ts-ignore
      const [customerWalletTransactionsIncrease, customerWalletTransactionsDecrease] = responses.map((response) => response?.value);

      return {
        props: {
          customerWalletTransactionsIncrease: customerWalletTransactionsIncrease?.customerWalletTransactions?.data,
          customerWalletTransactionsIncreaseMeta: customerWalletTransactionsIncrease?.customerWalletTransactions?.meta,
          customerWalletTransactionsDecrease: customerWalletTransactionsDecrease?.customerWalletTransactions?.data,
          customerWalletTransactionsDecreaseMeta: customerWalletTransactionsDecrease?.customerWalletTransactions?.meta,
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
