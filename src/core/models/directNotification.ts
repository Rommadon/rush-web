import { OrderModel } from "src/order";
import { ProductItem } from "src/product";
import { CustomerModel } from "./customer";
import { DirectNotificationDetailType, DirectNotificationReceiverType } from "./enum/directNotification";
import { GroupNotificationModel } from "./groupNotificationModel";

export type DirectNotificationModel = {
  id: number;
  detailType: DirectNotificationDetailType;
  receiverType: DirectNotificationReceiverType;
  message: string;
  isAlready: boolean;
  productItem: ProductItem;
  order: OrderModel;
  customer: CustomerModel;
  createdAt: Date;
  groupNotification: GroupNotificationModel;
}
