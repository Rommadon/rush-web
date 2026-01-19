import { ImageUpload } from "src";

export type ArticleModel = {
  id: number;
  name: string;
  content: string;
  tag: string[] | null;
  releasedAt: string | null
  isPublished: boolean;
  titleSeo: string | null
  descriptionSeo: string | null
  urlSlug?: string | null
  keywordSeo?: string | null
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  merchant?: any | null;
  imageUpload?: ImageUpload | null;
};
