import { FC, useState, useEffect } from "react";
import {
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import NextLink from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  DefaultLayout,
  DefaultLayoutProp,
  routes,
  useResource,
  MobileAppBar,
  EmptyList,
  SettingIcon,
  ProductsIcon,
} from "src/core";
import { ArticleModel } from "../models";
import { ArticleItem } from "./ArticleItem";
import router from "next/router";

export type ArticleListProps = DefaultLayoutProp & {
  articles: ArticleModel[];
  allArticle: ArticleModel[];
  articleMeta: any;
};

export const ArticleList: FC<ArticleListProps> = (props) => {
  const resource = useResource();

  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState<any[]>([]);
  const [onLoading, setOnLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [articleData, setArticleData] = useState<ArticleModel[]>([]);

  const isChecked = (key: string) => selectedTag === key && selectedTag !== "";

  const onCheck = (tag: string) => {
    setOnLoading(true);
    setSelectedTag(tag);
    router.push(`articles?tag=${tag}`).then(() => {
      setOnLoading(false);
    });
  };

  const onFetchData = async () => {
    const fetchArticle = await resource.fetchResource(
      `article-public?tag=${selectedTag || ""}&page=${page + 1}`,
      {},
      ""
    );
    setPage(page + 1);
    setArticleData(articleData.concat(fetchArticle?.data?.data));
  };

  useEffect(() => {
    if (props.articles) {
      setArticleData(props.articles);
    }
  }, [props.articles]);

  useEffect(() => {
    if (props.allArticle && props.allArticle.length > 0) {
      const tags: any[] = [];
      props.allArticle?.forEach((article) => {
        article?.tag?.forEach((tag) => {
          tags.push(tag);
        });
      });
      setTags(tags);
    }
  }, [props]);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <DefaultLayout
      {...props}
      appBar={isDesktop ? null : <MobileAppBar title={"บทความ"} />}
      titleMeta="บทความ"
    >
      {isDesktop && (
        <Typography
          variant="h1"
          component="h1"
          fontWeight="300"
          mt="80px"
          mb="88px"
        >
          บทความ
        </Typography>
      )}
      <Box
        display="grid"
        gridTemplateColumns={isDesktop ? "1fr 3fr" : "1fr"}
        mb="58px"
        gap="40px"
        p={isDesktop ? "0px" : "16px"}
      >
        {isDesktop && (
          <Box>
            <Typography variant="h2" fontWeight="600">
              ตัวกรองบทความ
            </Typography>
            {
              tags?.length > 0 ? (
                <Box
                  py="32px"
                  borderTop="1px solid"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  mt="40px"
                >
                  {tags.filter((value, index) => tags.indexOf(value) === index).map((tag) => (
                    <Box key={tag} px="16px">
                      <FormGroup>
                        {console.log(tag)}
                        <FormControlLabel
                          onClick={() => onCheck(tag)}
                          control={<Radio checked={isChecked(tag)} />}
                          label={tag}
                        />
                      </FormGroup>
                    </Box>
                  ))}
                </Box>
              ) : ''
            }
          </Box>
        )}
        <Box width="100%">
          {isDesktop && (
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h2" fontWeight="600">
                ผลการค้นหา
              </Typography>
              <Typography variant="h4">
                {props.articleMeta?.totalItems} รายการ
              </Typography>
            </Box>
          )}
          <Box mt={isDesktop ? "28px" : "0"}>
            {onLoading ? (
              <Box py="40px" textAlign="center">
                <CircularProgress color="info" />
              </Box>
            ) : (
              <InfiniteScroll
                dataLength={articleData.length}
                next={onFetchData}
                hasMore={articleData.length !== props.articleMeta?.totalItems}
                loader={
                  <p style={{ textAlign: "center" }}>
                    <CircularProgress color="info" />
                  </p>
                }
                endMessage={<Box height="1px" bgcolor="grey.50" mt="16px" />}
              >
              {
                articleData?.length > 0 ? (
                  articleData?.map((article) => (
                    <NextLink
                      key={article.id}
                      href={routes.articleDetail({ slug: article.urlSlug || article.id })}
                    >
                      <Box py="12px" sx={{ cursor: "pointer" }}>
                        <ArticleItem
                          article={article}
                          title={article.name ?? ""}
                          tags={article.tag}
                          body={article.descriptionSeo ?? ""}
                          imgSrc={article.imageUpload?.url}
                          publishedAt={article.releasedAt || ""}
                        />
                      </Box>
                    </NextLink>
                  ))
                ) : (
                  <EmptyList text="ไม่พบทความ" icon={<ProductsIcon fontSize="40px" color="#6B7280" />} />
                )
              }
              </InfiniteScroll>
            )}
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};
