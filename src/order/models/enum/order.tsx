export enum OrderChannel {
  MOBILE_WEBSITE = "mobileWebsite",
  IOS_APP = "IosApp",
  ANDROID_APP = "AndroidApp",
  DESKTOP_WEBSITE = "desktopWebsite",
  ADMIN = "admin",
}

export enum OrderStatus {
  PENDING_PAYMENT = "pendingPayment",
  PENDING_VERIFY = "pendingVerify",
  PREPARE_PROUDCT = "prepareProduct",
  SHIPPING = "shipping",
  RETURN_PRODUCT = "returnProduct",
  SUCCESS = "success",
  CANCEL = "cancel",
  EXPIRE = "expire"
}
