import { NextPage } from "next";

import { ArticleRepository } from "repositories";
import { ArticleListProps, ArticleList } from "src/article";
import { getProps } from "utils";

const ArticleListPage: NextPage<ArticleListProps> = (props) => {
  return (
    <ArticleList {...props} />
  )
}

export const getServerSideProps = getProps({
  loginRequired: false,
  resolver: async (context, accessToken) => {
    try {
      // Enable edge caching: cache for 60s, serve stale while revalidating for 5mins
      context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=300'
      );

      const responses = await Promise.allSettled([
        // @ts-ignore
        new ArticleRepository(accessToken, context.req.headers.host).getArticles({ page: context?.query?.page ? context?.query?.page : 1, limit: context?.query?.limit ? context?.query?.limit : 10, withPagination: "true", tag: context?.query?.tag ? context?.query?.tag : ''}),
        // @ts-ignore
        new ArticleRepository(accessToken, context.req.headers.host).getArticles({ page: context?.query?.page ? context?.query?.page : 1, limit: context?.query?.limit ? context?.query?.limit : 10, withPagination: "false" }),
      ]);

      // @ts-ignore
      const [articles, allArticle] = responses.map((response) => response?.value);

      return {
        props: {
          articles: articles.data,
          articleMeta: articles.meta,
          allArticle: allArticle.data,
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
          },
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


export default ArticleListPage
