import { MerchantShipmentModel } from "./MerchantShipmentModel";

export type ShipmentCompanyModel = {
  id: number;
  name: string;
  slug: string;
  merchantShipments: MerchantShipmentModel[];
};
