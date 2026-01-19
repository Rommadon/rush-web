import { OrderItemModel } from "./OrderItemModel";

export type VoucherModel = {
  id: number;
  name: string;
  description?: string;
  code: string;
  bookingStartDate: string | Date;
  bookingEndDate: string | Date;
  voucherExpiredDate: string | Date;
  type: string;
  status: VoucherStatus;
  quantity: number;
  usedQuantity?: number;
  orderItem: OrderItemModel;
  voucherUsageHistories: VoucherUsageHistories[];
};

export type VoucherUsageHistories = {
  id: number;
  code: string;
  usageDate: string | Date;
};

export enum VoucherStatus {
  PENDING = "pending",
  PREPARE = "prepare",
  COMPLETED = "completed",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
}
