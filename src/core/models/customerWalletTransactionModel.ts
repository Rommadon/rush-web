export enum CustomerWalletTransactionType {
  INCREASE = "increase",
  DECREASE = "decrease"
}

export enum CustomerWalletTransactionValueType {
  SHOPDIT_POINT = "shopditPoint",
}

export enum CustomerWalletTransactionActionType {
  EARN_BY_ORDER = "earnByOrder",
  USE_BY_ORDER = "useByOrder",
  CANCEL_ORDER = "cancelOrder",
  EXPIRE_ORDER = "expireOrder",
}

export type CustomerWalletTransactionModel = {
  id: number;
  value: number;
  valueType: CustomerWalletTransactionValueType;
  actionType: CustomerWalletTransactionActionType;
  actionValue: string;
  type: CustomerWalletTransactionType;
  createdAt: string;
}
