import { ImageUpload } from ".";
import { ProductBrandStatus } from "./enum/productBrand";

export type ProductBrand = {
  id: number;
  order: number;
  name: string;
  status: ProductBrandStatus;
  logo: ImageUpload;
};
