import { useMediaQuery } from "@mui/material";
import router from "next/router";
import { FC, useContext, useEffect, useState } from "react";
// import Router from 'next/router';
import {
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
// import * as yup from "yup";

import {
  CartContext,
  CouponModel,
  MerchantBankAccountPaymentMethodModel,
  MerchantCashPaymentMethodModel,
  MerchantOmiseIntegrationModel,
  MerchantPromptpayPaymentMethodModel,
  MerchantShipmentModel,
  MerchantShopditPaymentMethodModel,
} from "src";
import {
  CartModel,
  CustomerAddressModel,
  CustomerCreditCardModel,
  useResource,
} from "src/core";
import { useToast } from "src/core/hooks/useToast";
import OrderReviewForm from "./OrderReviewForm";
import { PaymentMethodType } from "src/order/models/enum/invoice";

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
};

export const OrderReviewFormController: FC<OrderReviewFormControllerProp> = (
  props
) => {
  const resource = useResource();
  const toast = useToast();
  const { setCartData } = useContext(CartContext);
  const [onLoading, setOnLoading] = useState(false);
  const [filteredMerchantShipment, setFilteredMerchantShipment] = useState<
    MerchantShipmentModel[]
  >([]);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (props.cart && props.merchantShipments) {
      const filterCartItem = props.cart?.cartItems?.filter((cartItem) => {
        return cartItem.productItem.product?.kind === "service";
      });
      if (filterCartItem.length === props.cart?.cartItems?.length) {
        const filteredMerchantShipments = props.merchantShipments?.filter(
          (merchantShipment) => merchantShipment.shipmentType === "online"
        );
        setFilteredMerchantShipment(filteredMerchantShipments);
      } else if (filterCartItem.length !== props.cart?.cartItems?.length) {
        const filteredMerchantShipments = props.merchantShipments?.filter(
          (merchantShipment) => merchantShipment.shipmentType !== "online"
        );
        setFilteredMerchantShipment(filteredMerchantShipments);
      }
    }
  }, [props.cart, props.merchantShipments]);

  // const schema = yup.object().shape({
  // });

  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
    // defaultValues: {
    // }
  });

  const onSubmit = async (data: any) => {
    setOnLoading(true);

    try {
      const order = await resource.createResource("order-public", {
        channel: isDesktop ? "desktopWebsite" : "mobileWebsite",
        customerAddressId: data?.customerAddressId,
        couponId: data?.couponId,
        orderItemAttributes: data?.orderItemAttributes,
        orderShipmentAttributes: data?.orderShipmentAttributes,
        invoiceAttributes: data?.invoiceAttributes,
        note: data?.note,
      });

      console.log("check condition", "orderQueueUuid" in order?.data);

      console.log("order", order?.data);

      if (!("orderQueueUuid" in order?.data)) {
        const fetchCart = await resource.fetchResource("cart-public", {}, "");
        setCartData(fetchCart?.data?.data);
        if (
          order?.data?.invoice?.totalPrice === 0 ||
          order?.data?.invoice?.paymentMethodType === PaymentMethodType.CASH
        ) {
          router.push(`/me/orders/${order.data?.number}`).then(() => {
            setOnLoading(false);
            toast.openToast("สร้างคำสั่งซื้อสำเร็จ", "success");
          });
        } else {
          router.push(`/me/orders/${order.data?.number}/payment`).then(() => {
            setOnLoading(false);
            toast.openToast("สร้างคำสั่งซื้อสำเร็จ", "success");
          });
        }
      } else {
        const queryString = new URLSearchParams(order?.data).toString();
        router.push(`/orders/loading-queue?${queryString}`);
      }
    } catch (error) {
      console.log(error);
      setOnLoading(false);
      toast.openToast("สร้างคำสั่งซื้อไม่สำเร็จ", "error");
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
        merchantShipments={filteredMerchantShipment}
        merchantBankAccountPaymentMethods={
          props.merchantBankAccountPaymentMethods
        }
        merchantCashPaymentMethods={props.merchantCashPaymentMethods}
        merchantPromptpayPaymentMethods={props.merchantPromptpayPaymentMethods}
        customerCreditCards={props.customerCreditCards}
        merchantOmiseIntegration={props.merchantOmiseIntegration}
        merchantShopditPaymentMethods={props.merchantShopditPaymentMethods}
        onLoading={onLoading}
      />
    </>
  );
};

export default OrderReviewFormController;
