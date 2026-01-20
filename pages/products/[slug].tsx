import type { GetServerSidePropsContext, NextPage } from "next";

import { ProductDetailProps, ProductDetail } from "src";
import { getProps } from "../../utils/getProps";
import {
  ProductRepository,
  CartRepository,
  CustomerProductFavoriteRepository
} from "../../repositories";

const ProductDetailPage: NextPage<ProductDetailProps> = (props) => {
  return <ProductDetail {...props} />;
};

export default ProductDetailPage;

export const getServerSideProps = getProps({
  loginRequired: false,
  resolver: async (context, accessToken) => {
    try {
      // Enable edge caching: cache for 60s, serve stale while revalidating for 5mins
      context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=300'
      );

      let cart = {
        data: []
      }
      let customerProductFavorite = {
        data: []
      }
      const productRepository = new ProductRepository(accessToken, context.req.headers.host);
      const cartRepository = new CartRepository(accessToken, context.req.headers.host);
      const customerProductFavoriteRepository = new CustomerProductFavoriteRepository(accessToken, context.req.headers.host);

      // Parallelize API calls for faster response
      const apiCalls = [
        productRepository.getProduct(context?.params?.slug),
        productRepository.getProductsRelation(context?.params?.slug)
      ];

      // Add authenticated calls if user is logged in
      if (accessToken && accessToken !== '') {
        apiCalls.push(
          cartRepository.getCart(),
          customerProductFavoriteRepository.getCustomerProductFavorites()
        );
      }

      const results = await Promise.allSettled(apiCalls);
      const product = results[0].status === 'fulfilled' ? results[0].value : { data: null };
      const productsRelation = results[1].status === 'fulfilled' ? results[1].value : { data: [] };

      if (accessToken && accessToken !== '') {
        cart = results[2]?.status === 'fulfilled' ? results[2].value : { data: [] };
        customerProductFavorite = results[3]?.status === 'fulfilled' ? results[3].value : { data: [] };
      }

      return {
        props: {
          product: product.data,
          productsRelation: productsRelation.data,
          cart: cart.data,
          customerProductFavorite: customerProductFavorite.data,
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
            ...require(`src/product/messages/${context.locale}.json`),
          },
          isAuth: false,
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
