import { MerchantShipmentModel } from "./MerchantShipmentModel";

export type MerchantWarehouseModel = {
  id: number;
  name: string;
  address?: string;
  postCodeAddress?: string;
  provinceAddress?: string;
  districtAddress?: string;
  subdistrictAddress?: string;
  tel: string;
  availableTime: string;
  isDefault: boolean;
  merchantShipments: MerchantShipmentModel[];
};
