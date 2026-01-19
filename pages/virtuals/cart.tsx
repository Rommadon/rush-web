import { NextPage } from "next";
import Cookies from 'js-cookie';
import Axios from 'axios';

import { absoluteUrl } from "src";
import { Cart, CartProps } from "src/virtual";
import { getProps } from "../../utils/getProps";
import {
  CartRepository,
} from "../../repositories";

const CartPage: NextPage<CartProps> = (props) => {
  return <Cart {...props} />;
};

export const getServerSideProps = getProps({
  loginRequired: false,
  isVirtualShop: true,
  resolver: async (context, accessToken) => {
    try {
      const cartRepository = new CartRepository(accessToken, context.req.headers.host);
      const cart = await cartRepository.getCart();

      return {
        props: {
          cart: cart?.data,
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
            ...require(`src/product/messages/${context.locale}.json`),
          },
        },
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

export default CartPage;
