import { ProductItem } from "src/product";
import { ProductFlashSale } from "src/product/models/productFlashSale";
import { MerchantShipmentModel } from "./MerchantShipmentModel";

export type OrderItemModel = {
  id: number;
  quantity: number;
  price: number;
  unit: string;
  // order?: Order;
  productItem?: ProductItem;
  productItemId?: number;
  productFlashSale?: ProductFlashSale;
  productItemImageUrl?: string;
};
