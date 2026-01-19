import { CartModel } from "./cart";
import { CustomerAddressModel } from "./customerAddress";
import { CustomerStatus } from "./enum/customer";

export type CustomerModel = {
  id: number;
  fullName: string;
  countryCode: string;
  tel: string;
  email: string;
  customerLifeTimeValue: number;
  countOrderList: number;
  // lastedOrder: Order;
  tag: string[];
  notation: string;
  status: CustomerStatus;
  customerAddresses: CustomerAddressModel[];
  // orders: Order[];
  cart: CartModel;
}
