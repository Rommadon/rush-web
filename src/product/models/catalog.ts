import { ImageUpload } from ".";

import { Product } from "./product";

export type Catalog = {
  id: number;
  order: number;
  name: string;
  status: "active" | "inactive";
  image: ImageUpload;
  product: Product[]
};
