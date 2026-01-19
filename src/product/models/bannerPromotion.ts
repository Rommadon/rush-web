import { ImageUpload } from ".";
import { BannerMerchantType } from "./enum/bannerPromotion";
import { Article, Product } from ".";
import { ProductBrand } from "./productBrand";
import { ProductCategory } from "./productCategory";

export type BannerPromotion = {
  id: number;
  type: BannerMerchantType;
  isOpenNewWindow: boolean;
  url: string;
  imageUpload: ImageUpload;
  product: Product;
  article: Article;
  productBrand: ProductBrand;
  productCategory: ProductCategory;
}
