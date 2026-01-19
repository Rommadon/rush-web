import { NextPage } from "next";
import { CartRepository, CustomerAddressRepository, MerchantBankAccountPaymentMethodRepository, MerchantCashPaymentMethodRepository, MerchantPromptpayPaymentMethodRepository, MerchantShipmentRepository } from "repositories";
import { CouponRepository } from "src/order";
import { OrderReviewFormController } from "src/order/components/form/OrderReviewForm";
import OrderReviewForm, { OrderReviewFormControllerProp } from "src/order/components/form/OrderReviewForm/OrderReviewForm";
import { getProps } from "utils";

const OrderReviewPage: NextPage<OrderReviewFormControllerProp> = (props) => {
  return <OrderReviewFormController {...props} />;
};

export default OrderReviewPage;

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, accessToken) => {
    try {
      const responses = await Promise.allSettled([
        new CouponRepository(accessToken, context.req.headers.host).all(),
        new CustomerAddressRepository(accessToken, context.req.headers.host).getCustomerAddresses(),
        new CartRepository(accessToken, context.req.headers.host).getCart(),
        new MerchantShipmentRepository(accessToken, context.req.headers.host).getMerchantShipments(),
        new MerchantBankAccountPaymentMethodRepository(accessToken, context.req.headers.host).getMerchantBankAccountPaymentMethods(),
        new MerchantCashPaymentMethodRepository(accessToken, context.req.headers.host).getMerchantCashPaymentMethods(),
        new MerchantPromptpayPaymentMethodRepository(accessToken, context.req.headers.host).getMerchantPromptpayPaymentMethods(),
      ]);

      // @ts-ignore
      const [coupons, customerAddresses, cart, merchantShipments, merchantBankAccountPaymentMethods, merchantCashPaymentMethods, merchantPromptpayPaymentMethods] = responses.map((response) => response?.value);

      return {
        props: {
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
            ...require(`src/order/messages/${context.locale}.json`),
          },
          coupons: coupons,
          customerAddresses: customerAddresses?.data,
          cart: cart?.data,
          merchantShipments: merchantShipments?.data,
          merchantBankAccountPaymentMethods: merchantBankAccountPaymentMethods?.data,
          merchantCashPaymentMethods: merchantCashPaymentMethods?.data,
          merchantPromptpayPaymentMethods: merchantPromptpayPaymentMethods?.data,
        },
      };
    } catch (error) {
      context.res.statusCode = 302;
      context.res.setHeader("Location", "/500");
      console.log(error);
      return {
        props: {},
      };
    }
  },
});
