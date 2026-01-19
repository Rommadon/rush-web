import { FC, useEffect, useState } from "react";

import { CartModel, useResource } from "src/core";
import { cartContextDefaultValue, CartContext } from "../contexts";

export type CartProviderProp = Partial<typeof cartContextDefaultValue>;

export const CartProvider: FC<CartProviderProp> = (props) => {
  const resource = useResource();
  const [cartData, setCartData] = useState<CartModel>(props?.cartData ?? null);

  useEffect(() => {
    if (cartData === null && props.isAuth) {
      const fetchCart = async () => {
        const fetchCart = await resource.fetchResource("cart-public", {}, "");
        setCartData(fetchCart?.data?.data);
      }

      fetchCart();
    }
  }, [cartData, props.isAuth])

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData: (value: any) => setCartData(value),
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
