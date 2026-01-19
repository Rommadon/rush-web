import { CartItemModel } from "./cartItem";
import { CustomerModel } from "./customer";

export type CartModel = {
  id: number;
  customer: CustomerModel;
  cartItems: CartItemModel[];
}
