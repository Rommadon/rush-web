import { CustomerModel } from "./customer";

export type CustomerCreditCardModel = {
  id: number;
  cardName: string;
  lastNumber: string;
  brand: string;
  isDefault: boolean;
  customer: CustomerModel;
  name: string;
  number: string;
  expirationMonth: string;
  expirationYear: string;
  securityCode: string;
}
