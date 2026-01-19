import { CalculateShipmentType, PaymentShipmentType, ShipmentType } from "./enum/merchantShipment";
import { MerchantWarehouseModel } from "./MerchantWarehouseModel";
import { ShipmentCompanyModel } from "./ShipmentCompanyModel";
import { CalulateShipmentMethodModel } from "./CalulateShipmentMethodModel"

export type MerchantShipmentModel = {
  id: number;
  name: string;
  description: string;
  shipmentType: ShipmentType;
  paymentShipmentType: PaymentShipmentType;
  duration: string;
  calculateShipmentType: CalculateShipmentType;
  fixedPrice: number;
  isActive: boolean;
  merchantWarehouse: MerchantWarehouseModel;
  shipmentCompany: ShipmentCompanyModel;
  calulateShipmentMethods: CalulateShipmentMethodModel[];
};
