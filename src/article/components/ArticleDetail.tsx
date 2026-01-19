import { FC } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { DefaultLayout, DefaultLayoutProp, MobileAppBar } from "src/core";
import NextImage from "next/image";
import { useIntl } from "next-intl";

import { ArticleModel } from "../models";

export type ArticleDetailProps = DefaultLayoutProp &
  ArticleModel & {
    article: ArticleModel;
  };

export const ArticleDetail: FC<ArticleDetailProps> = (props) => {
  const intl = useIntl();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <DefaultLayout
      {...props}
      appBar={!isDesktop && <MobileAppBar title={props.article?.name} isArticle={true}/>}
      titleMeta={props.article?.name}
      descriptionMeta={props.article?.name}
      keywordsMeta={props.article?.keywordSeo || ''}
      imageUrl={props.article.imageUpload?.url}
    >
      <Box width={isDesktop ? "768px" : "100%"} mx="auto" mt="80px" mb="58px" className="article-detail">
        <Box
          position="relative"
          height={isDesktop ? "500px" : "245px"}
          width="100%"
        >
          <NextImage
            src={props.article.imageUpload?.url ?? ""}
            layout="fill"
            objectFit="contain"
            priority={true}
          />
        </Box>
        {isDesktop && <Box
          display="flex"
          justifyContent="space-between"
          color="grey.200"
          mt="32px"
        >
          <Typography>{props.article.tag?.join(" ")}</Typography>
          {props.article.releasedAt && (
            <Typography>
              {intl.formatDateTime(new Date(props.article.releasedAt))}
            </Typography>
          )}
        </Box>}
        <Box
          px={isDesktop ? "0": '32px'}
          dangerouslySetInnerHTML={{ __html: props.article.content }}
        />
      </Box>
    </DefaultLayout>
  );
};
