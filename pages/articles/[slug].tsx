import { NextPage } from "next";

import { ArticleRepository } from "repositories";
import { ArticleDetailProps, ArticleDetail } from "src/article";
import { getProps } from "utils";

const ArticleDetailPage: NextPage<ArticleDetailProps> = (props) => {
  return <ArticleDetail {...props} />;
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

      const responses = await Promise.allSettled([
        // @ts-ignore
        new ArticleRepository(accessToken, context.req.headers.host).getArticle({ slug: context.params.slug }),
      ]);

      // @ts-ignore
      const [article] = responses.map((response) => response?.value);

      console.log(article)

      return {
        props: {
          article: article.data,
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

export default ArticleDetailPage
