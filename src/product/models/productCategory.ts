import { ImageUpload } from ".";
import { ProductCategoryStatus } from "./enum/productCategory";

export type ProductCategory = {
  id: number;
  order: number;
  name: string;
  status: "active" | "inactive";
  logo: ImageUpload;
};
