import { MerchantShipmentModel } from ".";
import { OrderShipmentStatus } from "./enum/orderShipment";

export type OrderShipmentModel = {
  id: number;
  status: OrderShipmentStatus;
  shipedAt: Date;
  number: string;
  // order: Order;
  merchantShipment: MerchantShipmentModel;
  merchantShipmentId: number;
}
