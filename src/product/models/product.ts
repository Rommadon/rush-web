import { ProductImage, ProductItem } from "../models";
import { ProductKind } from "./enum/product";
import { PackageProductModel } from "./packageProduct";
import { ProductCategory } from "./productCategory";
import { ProductPrimaryOption } from "./productPrimaryOption";
import { ProductSecondaryOption } from "./productSecondaryOption";

export type Product = {
  id: string | number
  sku?: string;
  slug?: string | null
  name: string;
  productImages: ProductImage[];
  productItems: ProductItem[];
  image?: string;
  images?: string[];
  price: number;
  fullPrice: number;
  isLike: boolean;
  soldQuantity: number;
  remaining: number;
  position: number;
  category?: string;
  unit: string;
  weight: string | number;
  size: string[];
  color: string;
  detail: string
  set: Product[];
  highlight: string;
  description: string;
  productCategory: ProductCategory;
  bigUnit: string;
  piecePerBigUnit: number;
  weightSize: number;
  widthSize: number;
  lengthSize: number;
  heightSize: number;
  kind: ProductKind;
  productPrimaryOption?: ProductPrimaryOption;
  productSecondaryOption?: ProductSecondaryOption;
  packageProducts?: PackageProductModel[];
  isRecommend: boolean;
  isPopular: boolean;
  isNew: boolean;
};
