import { BankModel } from "./BankModel";

export type MerchantBankAccountPaymentMethodModel = {
  id: number;
  name: string;
  number: string;
  type: string;
  branch: string;
  isActive: boolean;
  bank: BankModel;
};
