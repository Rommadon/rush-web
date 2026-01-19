import { ProductItem } from "src/product/models/productItem";
import { CartModel } from ".";

export type CartItemModel = {
  id: number;
  quantity: number;
  unit: string;
  cart: CartModel;
  productItem: ProductItem;
}
