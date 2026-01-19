import { ProductDiscountType, ProductDiscountUnitType } from "./enum/productDiscount";

export type ProductDiscount = {
  id: number;
  type: ProductDiscountType;
  unitType: ProductDiscountUnitType;
  value: number;
};
