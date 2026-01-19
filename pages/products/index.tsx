import type { GetServerSidePropsContext, NextPage } from "next";
import { ProductSearch, ProductSearchProps } from "src";
import { getProps } from "../../utils/getProps";
import {
  ProductRepository,
  ProductCategoryRepository,
  ProductBrandRepository,
  CatalogRepository
} from "../../repositories";

const ProductsPage: NextPage<ProductSearchProps> = (props) => {
  return <ProductSearch {...props} />;
};

export const getServerSideProps = getProps({
  loginRequired: false,
  resolver: async (context, accessToken) => {
    try {
      const productRepository = new ProductRepository(accessToken, context.req.headers.host);
      const productCategoryRepository = new ProductCategoryRepository(accessToken, context.req.headers.host);
      const productBrandRepository = new ProductBrandRepository(accessToken, context.req.headers.host);
      const catalogRepository = new CatalogRepository(accessToken, context.req.headers.host);

      const products = await productRepository.getProducts({
        page: context.query?.page || 1,
        limit: context.query?.limit || 30,
        search: context.query?.search || '',
        productCategoryIds: context.query?.productCategoryIds || '',
        productBrandIds: context.query?.productBrandIds || '',
        productCatalogIds: context.query?.productCatalogIds || '',
        orderBy: context.query?.orderBy || 'bestSeller',
        withPagination: "true"
      });
      const productCategories = await productCategoryRepository.getProductCategories({
        withPagination: 'false'
      });
      const productBrands = await productBrandRepository.getProductCategories({
        withPagination: 'false'
      });
      const catalogs = await catalogRepository.getCatalogs({
        withPagination: 'false'
      })

      return {
        props: {
          query: context.query,
          products: products.data,
          meta: products.meta,
          productCategories: productCategories.data,
          productBrands: productBrands.data,
          catalogs: catalogs.data,
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
            ...require(`src/product/messages/${context.locale}.json`),
          },
          isAuth: false,
          merchantName: "Merchant Name",
          companyName: "Dreamery Co. Ltd",
          description:
            "{{คำอธิบาย}} โอ้ยแฟร์แฟรนไชส์ แฮปปี้ แมคเคอเรลต้าอ่วย รีโมตมายาคติอุเทนมุมมอง วันเวย์โรลออน อิมพีเรียลเยนอิเลียดเปียโน พรีเมียร์ เซ็กซี่ เอาต์ทัวร์ โมเดลแบด",
          email: "support@dreamery.com",
          phoneNumbers: ["099 888 7777", "099 666 5555"],
        },
      };
    } catch (error) {
      context.res.statusCode = 302;
      context.res.setHeader("Location", "/500");
      console.log(error)
      return {
        props: {},
      };
    }
  },
});

export default ProductsPage;

