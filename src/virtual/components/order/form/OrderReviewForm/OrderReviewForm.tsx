import { FC } from "react";
import { Control, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";
import { CartModel, CouponModel, CustomerAddressModel, MerchantBankAccountPaymentMethodModel, MerchantCashPaymentMethodModel, MerchantOmiseIntegrationModel, MerchantPromptpayPaymentMethodModel, MerchantShipmentModel, MerchantShopditPaymentMethodModel } from "src";
import { CustomerCreditCardModel } from "src/core";
import { OrderReview } from "../..";

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
  control: Control<{}, object>;
  handleSubmit: UseFormHandleSubmit<{}>;
  register: UseFormRegister<{}>;
  watch: UseFormWatch<{}>;
  getValues: UseFormGetValues<{}>;
  setValue: any;
  errors: any;
  onSubmit: (data: any) => Promise<void>;
  onLoading: boolean;
};

const OrderReviewForm: FC<OrderReviewFormControllerProp> = ({
  control,
  handleSubmit,
  register,
  watch,
  getValues,
  setValue,
  errors,
  onSubmit,
  coupons,
  customerAddresses,
  cart,
  merchantShipments,
  merchantBankAccountPaymentMethods,
  merchantCashPaymentMethods,
  merchantPromptpayPaymentMethods,
  customerCreditCards,
  merchantOmiseIntegration,
  onLoading,
  merchantShopditPaymentMethods
}) => {
  return (
    <OrderReview
    // control={control}
    handleSubmit={handleSubmit}
    register={register}
    watch={watch}
    getValues={getValues}
    setValue={setValue}
    errors={errors}
    onSubmit={(data: any) => onSubmit(data)}
    coupons={coupons}
    customerAddresses={customerAddresses}
    cart={cart}
    merchantShipments={merchantShipments}
    merchantBankAccountPaymentMethods={merchantBankAccountPaymentMethods}
    merchantCashPaymentMethods={merchantCashPaymentMethods}
    merchantPromptpayPaymentMethods={merchantPromptpayPaymentMethods}
    customerCreditCards={customerCreditCards}
    merchantOmiseIntegration={merchantOmiseIntegration}
    merchantShopditPaymentMethods={merchantShopditPaymentMethods}
    onLoading={onLoading}
    />
  )
}

export default OrderReviewForm;
