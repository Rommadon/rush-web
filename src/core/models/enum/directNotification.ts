export enum DirectNotificationDetailType {
  NEW_ORDER = "newOrder",
  PAYMENT = "payment",
  SHIPMENT_ORDER = "shipmentOrder",
  COMPLETE_ORDER = "completeOrder",
  CANCEL_ORDER = "cancelOrder",
  PRODUCT_OUT_OF_STOCK = "productOutOfStock",
  VERIFY_ORDER = "verifyOrder"
}

export enum DirectNotificationReceiverType {
  MERCHANT = "merchant",
  CUSTOMER = "csutomer",
}
