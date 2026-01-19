import { CustomerModel, Product } from "src";
import { CustomerProductFavoriteStatus } from "./enum/customerProductFavorite";

export type CustomerProductFavoriteModel = {
  id: number;
  status: CustomerProductFavoriteStatus;
  customer: CustomerModel;
  product: Product;
}
