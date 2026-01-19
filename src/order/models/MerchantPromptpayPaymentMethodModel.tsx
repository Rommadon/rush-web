import { ImageUpload } from "src";

export type MerchantPromptpayPaymentMethodModel = {
  id: number;
  name: string;
  number: string;
  isActive: boolean;
  qrCode?: ImageUpload;
  imageUpload?: ImageUpload;
};
