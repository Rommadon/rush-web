import { MerchantShipmentModel } from "./MerchantShipmentModel";

export enum CalulateShipmentMethodType {
  WEIGHT = "weight",
  SIZE = "size"
}

export type CalulateShipmentMethodModel = {
  id: number;
  type: CalulateShipmentMethodType;
  from: number;
  to: number;
  price: number;
  merchantShipments: MerchantShipmentModel[];
};
