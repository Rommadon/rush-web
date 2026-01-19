import { Article, Product } from ".";
import { BannerMerchantApplication } from "./bannerMerchantApplication";
import { BannerMerchantDesktop } from "./bannerMerchantDesktop";
import { BannerMerchantType } from "./enum/bannerPromotion";
import { ProductBrand } from "./productBrand";
import { ProductCategory } from "./productCategory";

export type BannerMerhchant = {
  id: number;
  type: BannerMerchantType;
  isOpenNewWindow: boolean;
  url: string;
  product: Product;
  article: Article;
  productBrand: ProductBrand;
  productCategory: ProductCategory;
  bannerMerchantDesktop: BannerMerchantDesktop;
  bannerMerchantApplication: BannerMerchantApplication;
}
