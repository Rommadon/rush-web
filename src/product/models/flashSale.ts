import { FlashSaleStatus } from "./enum/flashSale";
import { ProductFlashSale } from "./productFlashSale";

export type FlashSale = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status: FlashSaleStatus;
  productFlashSales: ProductFlashSale[];
}
