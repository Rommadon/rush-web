// @ts-nocheck

import type { NextPage } from "next";

import { Home, HomeProp } from "src";
import { getProps } from "../utils/getProps";
import {
  ProductRepository,
  BannerMerchantRepository,
  ProductCategoryRepository,
  CatalogRepository,
  ArticleRepository,
  MerchantRepository,
  BannerPromotionRepository,
  FlashSaleRepository,
  ProductBrandRepository,
} from "../repositories";
import ThemeWidgetRepository from "repositories/themeWidgetRepository";

const HomePage: NextPage<HomeProp & { message: any }> = (props) => {
  return <Home {...props} />;
};

export const getServerSideProps = getProps({
  loginRequired: false,
  resolver: async (context, accessToken) => {
    try {
      // Enable edge caching: cache for 60s, serve stale while revalidating for 5mins
      context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=300'
      );

      const merchantRepository = new MerchantRepository(
        accessToken,
        context.req.headers.host
      );
      const productRepository = new ProductRepository(
        accessToken,
        context.req.headers.host
      );
      const bannerMerchantRepository = new BannerMerchantRepository(
        accessToken,
        context.req.headers.host
      );
      const catalogRepository = new CatalogRepository(
        accessToken,
        context.req.headers.host
      );
      const productCategoryRepository = new ProductCategoryRepository(
        accessToken,
        context.req.headers.host
      );
      const articleRepository = new ArticleRepository(
        accessToken,
        context.req.headers.host
      );
      const bannerPromotionRepository = new BannerPromotionRepository(
        accessToken,
        context.req.headers.host
      );
      const flashSaleRepository = new FlashSaleRepository(
        accessToken,
        context.req.headers.host
      );
      const themeWidgetRepository = new ThemeWidgetRepository(
        accessToken,
        context.req.headers.host
      );
      const productBrandRepository = new ProductBrandRepository(
        accessToken,
        context.req.headers.host
      );

      const responses = await Promise.allSettled([
        productRepository.getBestSellerProducts({ limit: 12 }),
        productRepository.getRecommendProducts({ limit: 12 }),
        productRepository.getNewProducts({ limit: 12 }),
        productRepository.getDiscountProducts({}),
        articleRepository.getArticles({ limit: 9 }),
        flashSaleRepository.getFlashSales(),
        bannerMerchantRepository.getBannerMerchants(),
        bannerPromotionRepository.getBannerPromotions(),
        productCategoryRepository.getProductCategories({
          withPagination: "false",
        }),
        catalogRepository.getCatalogs({
          withPagination: "false"
        }),
        merchantRepository.getMerchant(),
        themeWidgetRepository.getThemeWidget(),
        productBrandRepository.getProductBrands({
          withPagination: "false",
        }),
      ]).then((responses) => responses.map((response) => response.value));

      const [
        bestSellerProducts,
        recommendProducts,
        newProducts,
        discountProducts,
        articles,
        flashSale,
        bannerMerchants,
        bannerPromotions,
        productCategories,
        catalogs,
        merchant,
        theme,
        productBrands,
      ] = responses;

      return {
        props: {
          bannerMerchants: bannerMerchants?.data,
          productCategories: productCategories?.data,
          productBrands: productBrands?.data,
          catalogs: catalogs?.data,
          bestSellerProducts: bestSellerProducts?.data,
          recommendProducts: recommendProducts?.data,
          newProducts: newProducts?.data,
          discountProducts: discountProducts?.data,
          articles: articles?.data,
          bannerPromotions: bannerPromotions?.data,
          messages: {
            ...require(`../src/core/messages/${context.locale}.json`),
            ...require(`../src/auth/messages/${context.locale}.json`),
            ...require(`../src/product/messages/${context.locale}.json`),
          },
          isAuth: false,
          merchantName: "Merchant Name",
          companyName: "Dreamery Co. Ltd",
          description: merchant?.data?.data?.description || '',
          email: "support@dreamery.com",
          phoneNumbers: ["099 888 7777", "099 666 5555"],
          flashSale: flashSale?.data || [],
          carousel: bannerPromotions?.data?.map((data: any, index: any) => ({
            position: index + 1,
            src: data?.imageUpload?.url || "/home-carousel-placeholder.svg",
            alt: "promotion",
          })),
          themeWidgets: theme?.data?.themeWidgets ?? []
        },
      };
    } catch (error) {
      context.res.statusCode = 302;
      context.res.setHeader("Location", "/500");
      console.log(error);
      return {
        props: {},
      };
    }
  },
});

export default HomePage;
