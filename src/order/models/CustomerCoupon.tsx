import { CustomerModel } from "src";
import { CouponModel } from ".";
import { CustomerCouponStatus } from "./enum/customerCoupon";

export type CustomerCouponModel = {
  id: number;
  status: CustomerCouponStatus;
  usedQuantity: number;
  customer: CustomerModel;
  coupon: CouponModel;
}
