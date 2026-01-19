import { NextPage } from "next";
import { CartRepository, CustomerAddressRepository, CustomerCreditCardRepository, MerchantBankAccountPaymentMethodRepository, MerchantCashPaymentMethodRepository, MerchantOmiseIntegrationRepository, MerchantPromptpayPaymentMethodRepository, MerchantShipmentRepository, MerchantShopditPaymentMethodRepository, OrderRepository } from "repositories";
import { CouponRepository } from "src/order";
import { OrderReviewFormController } from "src/order/components/form/OrderReviewForm";
import OrderReviewForm, { OrderReviewFormControllerProp } from "src/order/components/form/OrderReviewForm/OrderReviewForm";
import { OrderItemModel } from "src/order/models/OrderItemModel";
import { getProps } from "utils";

const OrderDetailPage: NextPage<OrderReviewFormControllerProp> = (props) => {
  return <OrderReviewFormController {...props} />;
};

export default OrderDetailPage;

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
        new CustomerCreditCardRepository(accessToken, context.req.headers.host).getCustomerCreditCards(),
        new MerchantOmiseIntegrationRepository(accessToken, context.req.headers.host).getMerchantOmiseIntegration(),
        new MerchantShopditPaymentMethodRepository(accessToken, context.req.headers.host).getMerchantShopditPaymentMethods(),
      ]);
      let cartData = null;

      // @ts-ignore
      const [coupons, customerAddresses, cart, merchantShipments, merchantBankAccountPaymentMethods, merchantCashPaymentMethods, merchantPromptpayPaymentMethods, customerCreditCards, merchantOmiseIntegration, merchantShopditPaymentMethods] = responses.map((response) => response?.value);

      if (context.query.orderSlug) {
        const responses = await Promise.allSettled([
          new OrderRepository(accessToken, context.req.headers.host).getOrder(context.query.orderSlug)
        ]);

        // @ts-ignore
        const [order] = responses.map((response) => response?.value);
        const cartItems = order.orderItems?.map((item: OrderItemModel) => ({
          quantity: item.quantity,
          unit: item.unit,
          productItem: item.productItem
        }))
        cartData = {
          cartItems: cartItems
        }
      }

      return {
        props: {
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
            ...require(`src/order/messages/${context.locale}.json`),
          },
          coupons: coupons,
          customerAddresses: customerAddresses?.data,
          cart: cartData || cart?.data,
          merchantShipments: merchantShipments?.data,
          merchantBankAccountPaymentMethods: merchantBankAccountPaymentMethods?.data,
          merchantCashPaymentMethods: merchantCashPaymentMethods?.data,
          merchantShopditPaymentMethods: merchantShopditPaymentMethods?.data,
          merchantPromptpayPaymentMethods: merchantPromptpayPaymentMethods?.data,
          customerCreditCards: customerCreditCards?.data || [],
          merchantOmiseIntegration: merchantOmiseIntegration?.data
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
