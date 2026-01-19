import { ImageUpload, Product, ProductDiscount, StockModel } from "../models";

export type ProductItem = {
  id: string | number;
  slug: string | null;
  primaryOptionsValue?: string | null;
  secondaryOptionsValue?: string | null;
  price: number;
  cost: number;
  soldQuantity: number;
  imageUpload?: ImageUpload;
  productDiscount: ProductDiscount | null;
  product?: Product | null;
  stock: StockModel;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
};
