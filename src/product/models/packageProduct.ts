import { Product } from "./product";

export type PackageProductModel = {
  id: string | number
  quality: number;
  product: Product;
};
