import { NextPage } from "next";

import { ProductRepository } from "repositories";
import { Repurchasing, RepurchasingProps } from "src/order/components";
import { getProps } from "utils";

export const RepurchasingPage: NextPage<RepurchasingProps> = (props) => {
  // @ts-ignore
  return <Repurchasing {...props} />;
};

export default RepurchasingPage;

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, accessToken) => {
    try {
      const responses = await Promise.allSettled([
        new ProductRepository(accessToken, context.req.headers.host).getProductsRePurchase(),
      ]);

      // @ts-ignore
      const [products] = responses.map((response) => response?.value);

      return {
        props: {
          products: products.data,
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
