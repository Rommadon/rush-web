import { NextPage } from "next";
import { CustomerProductFavoriteRepository } from "repositories";

import { WishList, WishListProps } from "src/order/components";
import { getProps } from "utils";

export const WishListPage: NextPage<WishListProps> = (props) => {
  // @ts-ignore
  return <WishList {...props} />;
};



export default WishListPage;

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, accessToken) => {
    try {
      const customerProductFavoriteRepository = new CustomerProductFavoriteRepository(accessToken, context.req.headers.host);
      const customerProductFavorite = await customerProductFavoriteRepository.getCustomerProductFavorites();
      return {
        props: {
          customerProductFavorites: customerProductFavorite?.data || [],
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
