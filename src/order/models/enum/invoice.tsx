export enum PaymentMethodType {
  BANK_ACCOUNT = "bankAccount",
  PROMPTPAY = "promptpay",
  CASH = "cash",
  OMISE = "omise",
  PAYPAL = "paypal",
  SHOPDITPAY_CREDIT_CARD = "shopditpayCreditCard",
  SHOPDITPAY_LINEPAY = "shopditpayLinepay",
  SHOPDITPAY_AIRPAY = "shopditpayAirpay",
  SHOPDITPAY_SCB_EASY = "shopditpayScbEasy",
  SHOPDITPAY_BBL = "shopditpayBbl",
  SHOPDITPAY_BAYBANK = "shopditpayBaybank",
  SHOPDITPAY_TRUEMONEY = "shopditpayTruemoney",
}

export enum InvoiceStatus {
  PROCESSING = "processing",
  PROCESSED = "processed",
  CANCEL = "cancel",
  EXPIRE = "expire"
}
