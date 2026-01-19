import { Product } from "./product";

export type ProductFlashSale = {
  id: number;
  quantity: number;
  soldQuantity: number;
  product: Product;
}
