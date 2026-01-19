// @ts-nocheck

import { FC } from "react";
import {
  useMediaQuery
} from "@mui/material";
import { UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";
// import dynamic from 'next/dynamic'

import { CouponModel, MerchantShipmentModel, MerchantBankAccountPaymentMethodModel, MerchantCashPaymentMethodModel, MerchantPromptpayPaymentMethodModel } from "../models";
import { CustomerAddressModel, CartModel, CustomerCreditCardModel } from "src/core/models";
import { OrderReviewDesktop } from './OrderReviewDesktop';
import { OrderReviewMobile } from './OrderReviewMobile';

export type OrderReviewProps = {
  order?: {};
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
  handleSubmit: UseFormHandleSubmit<{}>;
  register: UseFormRegister<{}>;
  watch: UseFormWatch<{}>;
  getValues: UseFormGetValues<{}>;
  setValue: any;
  errors: any;
  onSubmit: (data: any) => Promise<void>;
  onLoading: boolean;
};


export const OrderReview: FC<OrderReviewProps> = (props) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // const Component = isDesktop ? dynamic(() => import('./OrderReviewDesktop')) : dynamic(() => import('./OrderReviewMobile'))

  return isDesktop ? <OrderReviewDesktop {...props} /> : <OrderReviewMobile {...props} />;
};

export default OrderReview;
