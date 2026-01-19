import { createContext } from "react";

export type CartContextDefaultValueType = {
  cartData?: any,
  currentMerchant?: any,
  isAuth?: any,
  setCartData: (value: any) => void,
}

export const cartContextDefaultValue: CartContextDefaultValueType = {
  setCartData: (value: any) => {},
}

export const CartContext = createContext(cartContextDefaultValue);

export default CartContext;