/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";
import router from "next/router";

import { DefaultLayout, DefaultLayoutProp, routes } from "src/core";
import {
  BannerMerhchant,
  BannerPromotion,
  FlashSale,
  Product,
  ProductCategory,
  Catalog,
} from "../../product/models";
import { ArticleModel } from "src/article";
import VerifyEmailModal from "src/auth/components/VerifyEmailModal";
import RegisterPhoneModal from "src/auth/components/RegisterPhoneModal";
import { useAuth } from "src/auth";
import { BannerComponent } from "../components/Banner";
import { SummaryProductComponent } from "../components/SummaryProduct";
import { BannerPromotionComponent } from "../components/BannerPromotion";
import { ArticleComponent } from "../components/Article";
import { CatalogComponent } from "../components/Catalog";
import { NewProductComponent } from "../components/NewIn";
import { BestSaleProductComponent } from "../components/BestSale";
import { FlashSaleComponent } from "../components/FlashSale";
import { CategoryComponent } from "../components/Category";

export type HomeProp = DefaultLayoutProp & {
  bannerMerchants: BannerMerhchant[];
  catalogs: Catalog[];
  productCategories: ProductCategory[];
  newProducts: Product[];
  discountProducts: Product[];
  bestSellerProducts: Product[];
  recommendProducts: Product[];
  bannerPromotions: BannerPromotion[];
  flashSale: FlashSale;
  articles: ArticleModel[];
  carousel: {
    position: number;
    src: string;
    alt: string;
  }[];
  themeWidgets: any[];
};

export const Home: FC<HomeProp> = (props) => {
  const t = useTranslations("home");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { profile } = useAuth();
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [isVerifyEmailModalOpen, setIsVerifyEmailModalOpen] = useState(false);
  const [isOpenRegisterPhoneModal, setIsOpenRegisterPhoneModal] =
    useState(false);
  const [productPush, setProductPush] = useState(null);

  useEffect(() => {
    setIsMediaLoading(false);
  }, []);

  const openRegisterPhoneModal = (product: any) => {
    if (profile) {
      router.push(routes.product({ slug: product.slug }));
    } else {
      setIsOpenRegisterPhoneModal(true);
      setProductPush(product);
    }
  };

  useEffect(() => {
    if (profile) {
      if (isDesktop) {
        if (profile?.user?.status === "pending") {
          setIsVerifyEmailModalOpen(true);
          return;
        } else {
          setIsVerifyEmailModalOpen(false);
          return;
        }
      }
      if (profile?.user?.status === "pending") {
        router.push("/verify-email");
        return;
      }
    }
  }, [profile, isDesktop]);

  const sections = [
    {
      key: "home_product_category",
      component: (
        <CategoryComponent
          productCategories={props.productCategories}
          isMediaLoading={isMediaLoading}
        />
      ),
    },
    {
      key: "home_flash_sale",
      component: <FlashSaleComponent flashSale={props.flashSale} />,
    },
    {
      key: "home_recommend_product",
      component: (
        <></>
      ),
    },
    {
      key: "home_best_sale_product",
      component: (
        <BestSaleProductComponent
          bestSellerProducts={props.bestSellerProducts}
          openRegisterPhoneModal={openRegisterPhoneModal}
        />
      ),
    },
    {
      key: "home_product_catalog",
      component: (
        <CatalogComponent
          catalogs={props.catalogs}
          isMediaLoading={isMediaLoading}
        />
      ),
    },
    {
      key: "home_interest_product",
      component: <></>,
    },
    {
      key: "home_new_product",
      component: (
        <NewProductComponent
          newProducts={props.newProducts}
          openRegisterPhoneModal={openRegisterPhoneModal}
        />
      ),
    },
    {
      key: "home_article",
      component: <ArticleComponent articles={props.articles} />,
    },
    {
      key: "home_banner_promotion",
      component: (
        <BannerPromotionComponent
          carousel={props.carousel}
          bannerPromotions={props.bannerPromotions}
        />
      ),
    },
    {
      key: "home_product_browser",
      component: (
        <SummaryProductComponent
          recommendProducts={props.recommendProducts}
          bestSellerProducts={props.bestSellerProducts}
          newProducts={props.newProducts}
          discountProducts={props.discountProducts}
          openRegisterPhoneModal={openRegisterPhoneModal}
        />
      ),
    },
  ];

  return (
    <>
      <VerifyEmailModal open={isVerifyEmailModalOpen} />
      <RegisterPhoneModal
        open={isOpenRegisterPhoneModal}
        isDesktop={isDesktop}
        product={productPush}
        handleClose={() => setIsOpenRegisterPhoneModal(false)}
      />
      <DefaultLayout {...props} isHomePage>
        <BannerComponent bannerMerchants={props.bannerMerchants} />
        {!props.themeWidgets || props.themeWidgets?.length === 0
          ? sections.map((section) => (
              <section key={section.key}>{section.component}</section>
            ))
          : props.themeWidgets.map((item) => {
              const section = sections.find(
                (section) => section.key === item?.widget?.key
              );
              if (!section) return <></>;
              return <section key={section?.key}>{section?.component}</section>;
            })}
      </DefaultLayout>
    </>
  );
};
