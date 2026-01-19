export type StockModel = {
  id: number;
  remaining: number;
  isServiceProduct: boolean;
  onValidateStock: boolean;
  createdAt?: string | null
  updatedAt?: string | null
  deletedAt?: string | null
}
