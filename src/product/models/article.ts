import { ImageUpload } from ".";

export type Article = {
  id: number;
  imageUpload: ImageUpload;
  tag: string[];
  releasedAt: number;
  name: string;
  urlSlug: string;
  content: string;
}
