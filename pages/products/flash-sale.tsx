import { GetServerSidePropsContext, NextPage } from "next";
import { FlashSaleComponent, FlashSaleProps } from "src";
import { getProps } from "../../utils/getProps";
import {
  FlashSaleRepository
} from "../../repositories";

export const FlashSalePage: NextPage<FlashSaleProps> = (props) => {
  return <FlashSaleComponent {...props} />;
};

export const getServerSideProps = getProps({
  loginRequired: false,
  resolver: async (context, accessToken) => {
    try {
      // Enable edge caching: cache for 60s, serve stale while revalidating for 5mins
      context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=300'
      );

      const flashSaleRepository = new FlashSaleRepository(accessToken, context.req.headers.host);
      const flashSale = await flashSaleRepository.getFlashSales();
      return {
        props: {
          flashSale: flashSale.data,
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
            ...require(`src/product/messages/${context.locale}.json`),
          },
        }
      };
    } catch (error) {
      context.res.statusCode = 302;
      context.res.setHeader("Location", "/500");
      console.log(error)
      return {
        props: {},
      };
    }
  },
});

export default FlashSalePage;
