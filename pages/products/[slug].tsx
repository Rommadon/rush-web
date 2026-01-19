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
      let cart = {
        data: []
      }
      let customerProductFavorite = {
        data: []
      }
      const productRepository = new ProductRepository(accessToken, context.req.headers.host);
      const cartRepository = new CartRepository(accessToken, context.req.headers.host);
      const customerProductFavoriteRepository = new CustomerProductFavoriteRepository(accessToken, context.req.headers.host);

      const product = await productRepository.getProduct(context?.params?.slug);
      const productsRelation = await productRepository.getProductsRelation(context?.params?.slug);

      if (accessToken && accessToken !== '') {
        cart = await cartRepository.getCart();
        customerProductFavorite = await customerProductFavoriteRepository.getCustomerProductFavorites();
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
