import { InvoiceModel } from "./InvoiceModel";
import { OrderItemModel } from "./OrderItemModel";
import { OrderShipmentModel } from "./OrderShipmentModel";

export type Order = {
  id: number;
  number: string;
  status: string;
  channel: string;
  orderedAt: string;
  merchant: any;
  customer: any
  customerAddress: any;
  orderItems: OrderItemModel[];
  orderShipment: OrderShipmentModel
  invoice: InvoiceModel
};
