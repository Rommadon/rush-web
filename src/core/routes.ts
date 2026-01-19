function buildUrl(path: string, params?: Record<string, any>, query?: Record<string, any>) {
  let result = path
  if (query) {
    result += ('?' + new URLSearchParams(query ?? {}).toString()); 
  }

  Object.entries(params ?? {}).forEach(([key, value]) => {
    result = result.replace(new RegExp(`:${key}`), value)
  })

  return result
}

function buildRoutes(routes: Record<string, any>) {
  return Object.entries(routes).reduce((prev, [key, value]) => ({
    ...prev,
    [key]: (params?: Record<string, any>, query?: Record<string, any>) => buildUrl(value, params, query),
  }));
}

const _routes = {
  home: "/",
  products: "/products",
  productCatalog: "products/catalog/:id",
  product: '/products/:slug',
  productFlashSale: '/products/flash-sale',
  orderList: '/me/orders',
  order: '/me/orders/:number',
  orderCreate: '/orders/create',
  repurchasing: '/me/repurchasing',
  coupon: '/me/coupons',
  addCoupon: '/me/coupons/add',
  voucher: '/me/vouchers',
  useVoucher: '/me/vouchers/use',
  wishlist: '/me/wishlist',
  notification: '/me/notification',
  notificationSetting: '/me/notification/setting',
  setting: '/me/setting',
  personalInfo: '/me/personal-info',
  editPersonalInfo: '/me/personal-info/edit',
  changePassword: '/me/personal-info/change-password',
  addresses: '/me/addresses',
  newAddresses: '/me/addresses/new',
  editAddresses: '/me/addresses/edit/:id',
  cart: '/cart',
  articles: '/articles',
  articleDetail: '/articles/:slug',
  aboutUs: '/terms-and-policies',
  faq: '/terms-and-policies#faq',
  privacyPolicy: '/terms-and-policies#privacy-policy',
  refundsAndReturnPolicy: '/terms-and-policies#refunds-and-return-policy',
  shippingPolicy: '/terms-and-policies#shipping-policy',
  cookiesPolicy: '/terms-and-policies#cookies-policy',
  termsOfServicePolicy: '/terms-and-policies#terms-service-policy',
  contactUs: '/terms-and-policies#contact-us',
  login: '/login',
  me: '/me',
  changeLanguage: '/me/change-language',
  aboutMerchant: '/about-us',
  contactMerchant: '/contact-us',
  termsPoliciesMerchant: '/terms-policies',
  privacyPolicyMerchant: '/terms-policies/privacy',
  refundsAndReturnPolicyMerchant: '/terms-policies/refund',
  shippingPolicyMerchant: '/terms-policies/shipping',
  cookiesPolicyMerchant: '/terms-policies/cookies',
  termsOfServicePolicyMerchant: '/terms-policies/service',
  payment: '/me/payment',
  newCreditCardPayment: '/me/payment/credit-card/new',
  editCreditCardPayment: '/me/payment/credit-card/edit/:id',
  shopditPoint: '/me/shopdit-point'
}

export const routes = buildRoutes(_routes) as unknown as Record<keyof typeof _routes, (params?: Record<string, any>, query?: Record<string, any>) => string>

export default routes;
