import { ImageUpload } from "../../product";

export type GroupNotificationModel = {
  id: number;
  title: string;
  message: string;
  imageUpload: ImageUpload;
}
