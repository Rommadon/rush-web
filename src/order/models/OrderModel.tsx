import { CustomerAddressModel, CustomerModel } from "src";
import { InvoiceModel } from "./InvoiceModel";
import { OrderItemModel } from "./OrderItemModel";
import { OrderShipmentModel } from "./OrderShipmentModel";
import { OrderStatus, OrderChannel } from "./enum/order"

export type OrderModel = {
  id: number;
  number: string;
  status: OrderStatus;
  channel: OrderChannel;
  orderedAt: Date;
  customer: CustomerModel;
  customerAddress: CustomerAddressModel;
  orderItems: OrderItemModel[];
  orderShipment: OrderShipmentModel;
  invoice: InvoiceModel;
  note?: string;
  publicUuid: string;
}
