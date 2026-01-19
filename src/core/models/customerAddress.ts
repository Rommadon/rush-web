import { CustomerModel } from "./customer";

export type CustomerAddressModel = {
  id: number;
  tel: string;
  name: string;
  fullName: string;
  email: string;
  address: string;
  postCodeAddress: string;
  provinceAddress: string;
  districtAddress: string;
  subdistrictAddress: string;
  customer: CustomerModel;
  default: boolean;
}
