import { GetServerSidePropsContext, NextPage } from "next";
import { CatalogComponent, CatalogProps } from "src";
import { getProps } from "../../../utils/getProps";
import {
  CatalogRepository
} from "../../../repositories";

export const CatalogPage: NextPage<CatalogProps> = (props) => {
  return <CatalogComponent {...props} />;
};

export const getServerSideProps = getProps({
  loginRequired: false,
  resolver: async (context, accessToken) => {
    try {
      const catalogRepository = new CatalogRepository(accessToken, context.req.headers.host);
      const catalog = await catalogRepository.getCatalog({
        id: context?.params?.id,
        page: context.query?.page || 1,
        limit: context.query?.limit || 30,
        orderBy: context.query?.orderBy || 'bestSeller',
      });

      return {
        props: {
          catalog: catalog.data,
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
            ...require(`src/product/messages/${context.locale}.json`),
          },
        }
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

export default CatalogPage;
