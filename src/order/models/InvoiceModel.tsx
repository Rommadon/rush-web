import { CustomerCreditCardModel } from "src/core";
import { ImageUpload } from "src/product/models/imageUpload";
import { CouponModel, MerchantBankAccountPaymentMethodModel, MerchantCashPaymentMethodModel, MerchantPromptpayPaymentMethodModel, MerchantShopditPaymentMethodModel } from ".";
import { InvoiceStatus, PaymentMethodType } from "./enum/invoice";

export type InvoiceModel = {
  id: number;
  totalPrice: number;
  productPrice: number;
  productDiscountPrice: number;
  shipmentPrice: number;
  shopditPoint: number;
  status: InvoiceStatus;
  paymentMethodType: PaymentMethodType;
  paymentAt: Date;
  timePaymentAt: string;
  isVerify: boolean;
  // order?: Order;
  merchantBankAccountPaymentMethod?: MerchantBankAccountPaymentMethodModel;
  merchantBankAccountPaymentMethodId?: number;
  merchantPromptpayPaymentMethod?: MerchantPromptpayPaymentMethodModel;
  merchantPromptpayPaymentMethodId?: number;
  merchantCashPaymentMethod?: MerchantCashPaymentMethodModel;
  merchantCashPaymentMethodId?: number;
  customerCreditCardId?: number;
  customerCreditCard?: CustomerCreditCardModel;
  merchantShopditPaymentMethodId?: number;
  merchantShopditPaymentMethod?: MerchantShopditPaymentMethodModel;
  imageUpload?: ImageUpload;
  coupon?: CouponModel;
}