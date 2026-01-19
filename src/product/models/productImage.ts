import { ImageUpload } from "../models";

export type ProductImage = {
  id: string | number
  order: number;
  imageUpload: ImageUpload
};
