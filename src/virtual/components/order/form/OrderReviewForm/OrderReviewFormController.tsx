import { useMediaQuery } from "@mui/material";
import router from "next/router";
import { FC, useContext, useState } from "react";
import { useForm, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";

import { CartContext, CouponModel, MerchantBankAccountPaymentMethodModel, MerchantCashPaymentMethodModel, MerchantOmiseIntegrationModel, MerchantPromptpayPaymentMethodModel, MerchantShipmentModel, MerchantShopditPaymentMethodModel } from "src";
import { CartModel, CustomerAddressModel, CustomerCreditCardModel, useResource } from "src/core";
import { useToast } from "src/core/hooks/useToast";
import OrderReviewForm from "./OrderReviewForm";

export type OrderReviewFormControllerProp = {
  coupons: CouponModel[];
  customerAddresses: CustomerAddressModel[];
  cart: CartModel;
  merchantShipments: MerchantShipmentModel[];
  merchantBankAccountPaymentMethods: MerchantBankAccountPaymentMethodModel[];
  merchantCashPaymentMethods: MerchantCashPaymentMethodModel[];
  merchantPromptpayPaymentMethods: MerchantPromptpayPaymentMethodModel[];
  customerCreditCards: CustomerCreditCardModel[];
  merchantOmiseIntegration: MerchantOmiseIntegrationModel;
  merchantShopditPaymentMethods: MerchantShopditPaymentMethodModel[];
  handleSubmit?: UseFormHandleSubmit<{}>;
  register?: UseFormRegister<{}>;
  watch?: UseFormWatch<{}>;
  getValues?: UseFormGetValues<{}>;
  setValue?: any;
  errors?: any;
  onSubmit?: (data: any) => Promise<void>;
  token?: String;
};

export const OrderReviewFormController: FC<OrderReviewFormControllerProp> = (props) => {
  const resource = useResource();
  const toast = useToast();
  const { setCartData } = useContext(CartContext);
  const [onLoading, setOnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    setValue,
    formState:{ errors }
  } = useForm();

  const onSubmit = async (data: any) => {
    setOnLoading(true);

    try {
      const order = await resource.createResource('order-public', {
        channel: 'desktopWebsite',
        customerAddressId: data?.customerAddressId,
        couponId: data?.couponId,
        orderItemAttributes: data?.orderItemAttributes,
        orderShipmentAttributes: data?.orderShipmentAttributes,
        invoiceAttributes: data?.invoiceAttributes
      })

      const fetchCart = await resource.fetchResource('cart-public', {}, '');
      setCartData(fetchCart?.data?.data);
      router.push(
        `/virtuals/me/orders/${order.data?.number}/payment?accessToken=${props?.token}`
      ).then(() => {
        setOnLoading(false);
        toast.openToast('สร้างคำสั่งซื้อสำเร็จ', 'success');
      })
    } catch (error) {
      console.log(error)
      setOnLoading(false);
      toast.openToast('สร้างคำสั่งซื้อไม่สำเร็จ', 'error');
    }
  };

  return (
    <>
      <OrderReviewForm
        {...props}
        control={control}
        handleSubmit={handleSubmit}
        register={register}
        watch={watch}
        getValues={getValues}
        setValue={setValue}
        errors={errors}
        onSubmit={(data: any) => onSubmit(data)}
        coupons={props.coupons}
        customerAddresses={props.customerAddresses}
        cart={props.cart}
        merchantShipments={props.merchantShipments}
        merchantBankAccountPaymentMethods={props.merchantBankAccountPaymentMethods}
        merchantCashPaymentMethods={props.merchantCashPaymentMethods}
        merchantPromptpayPaymentMethods={props.merchantPromptpayPaymentMethods}
        customerCreditCards={props.customerCreditCards}
        merchantOmiseIntegration={props.merchantOmiseIntegration}
        merchantShopditPaymentMethods={props.merchantShopditPaymentMethods}
        onLoading={onLoading}
      />
    </>
  )
}

export default OrderReviewFormController;
