import { MerchantBankAccountPaymentMethodModel } from "./MerchantBankAccountPaymentMethodModel";

export type BankModel = {
  id: number;
  name: string;
  slug: string;
  merchantBankAccountPaymentMethods: MerchantBankAccountPaymentMethodModel[];
};
