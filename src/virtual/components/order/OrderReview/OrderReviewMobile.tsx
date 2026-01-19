// @ts-nocheck
import { FC, useState, useEffect } from "react";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import {
  DefaultLayout,
  useResource,
  MobileAppBar,
  ChevronRightIcon,
} from "src/core";
import {
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { useIntl } from "next-intl";
import { OrderItemSidebar } from "../OrderItemSidebar";

import {
  CouponModel,
  MerchantShipmentModel,
  MerchantBankAccountPaymentMethodModel,
  MerchantCashPaymentMethodModel,
  MerchantPromptpayPaymentMethodModel,
} from "../../models";
import { CustomerAddressModel, CartModel, routes } from "src/core";
import { OrderItemModel } from "../../models/OrderItemModel";
import {
  getProductPriceAndProductDiscountPrice,
  getOrderProductDiscountPrice,
  getShipmentPrice
} from "utils/calaulate";
import PaymentOptionModal from "./PaymentOptionsModal";
import ShippingOptionModal from "./ShippingOptionsModal";
import CustomerAddressOptionsModal from './CustomerAddressOptionsModal';
import CouponOptionsModal from './CouponOptionsModal';

export type OrderReviewMobileProps = {
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

export const OrderReviewMobile: FC<OrderReviewMobileProps> = (props) => {
  const t = useTranslations("order.orderReview");
  const resource = useResource();
  const intl = useIntl();

  const [shippingOptions, setShippingOptions] = useState<
    MerchantShipmentModel[]
  >([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [
    merchantBankAccountPaymentMethods,
    setMerchantBankAccountPaymentMethods,
  ] = useState([]);
  const [merchantCashPaymentMethods, setMerchantCashPaymentMethods] = useState(
    []
  );
  const [merchantPromptpayPaymentMethods, setMerchantPromptpayPaymentMethods] = useState([]);
  const [cartPrice, setCartPrice] = useState(
    getProductPriceAndProductDiscountPrice(props?.cart?.cartItems)
  );
  const [customerCreditCards, setCustomerCreditCards] = useState([]);
  const [shipmentPrice, setShipmentPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [addresses, setAddresses] = useState<CustomerAddressModel[]>([]);
  const [selectedMerchantShipment, setSelectedMerchantShipment] = useState(null);
  const [isPaymentOptionsOpen, setIsPaymentOptionsOpen] = useState(false);
  const [isShippingOptionsOpen, setIsShippingOptionsOpen] = useState(false);
  const [isCustomerAddressOptionsOpen, setCustomerAddressOptionsOpen] = useState(false);
  const [isCouponOptionsOpen, setCouponOptionsOpen] = useState(false);
  const [selectedCustomerAddress, setSelectedCustomerAddress] = useState(null);
  const [isActiveCreditCardPaymentMethod, setIsActiveCreditCardPaymentMethod] = useState(false);
  const [merchantShopditPaymentMethods, setMerchantShopditPaymentMethods] = useState([]);

  useEffect(() => {
    if (props?.merchantOmiseIntegration) {
      setIsActiveCreditCardPaymentMethod(true);
    }
  }, [props?.merchantOmiseIntegration])

  useEffect(() => {
    if (props?.customerCreditCards) {
      setCustomerCreditCards(props?.customerCreditCards);
    }
  }, [props?.customerCreditCards])

  useEffect(() => {
    if (props?.merchantShopditPaymentMethods) {
      setMerchantShopditPaymentMethods(props?.merchantShopditPaymentMethods);
    }
  }, [props?.merchantShopditPaymentMethods])

  useEffect(() => {
    if (props?.merchantShipments) {
      setShippingOptions(props?.merchantShipments);
    }

    if (props?.customerAddresses) {
      setAddresses(props?.customerAddresses);
    }

    if (props?.merchantBankAccountPaymentMethods) {
      const merchantBankAccountPaymentMethods =
        props?.merchantBankAccountPaymentMethods?.map((method) => {
          return {
            ...method,
            type: "bankAccount",
          };
        });

      setMerchantBankAccountPaymentMethods(
        merchantBankAccountPaymentMethods || []
      );
    }

    if (props?.merchantCashPaymentMethods) {
      const merchantCashPaymentMethods = props?.merchantCashPaymentMethods?.map(
        (method) => {
          return {
            ...method,
            type: "cash",
          };
        }
      );

      setMerchantCashPaymentMethods(merchantCashPaymentMethods || []);
    }

    if (props?.merchantPromptpayPaymentMethods) {
      const merchantPromptpayPaymentMethods =
        props?.merchantPromptpayPaymentMethods?.map((method) => {
          return {
            ...method,
            type: "promptpay",
          };
        });

      setMerchantPromptpayPaymentMethods(merchantPromptpayPaymentMethods || []);
    }
  }, [props?.customerAddresses, props?.merchantBankAccountPaymentMethods, props?.merchantCashPaymentMethods, props?.merchantPromptpayPaymentMethods, props?.merchantShipments]);

  useEffect(() => {
    setPaymentOptions([
      ...merchantBankAccountPaymentMethods,
      ...merchantCashPaymentMethods,
      ...merchantPromptpayPaymentMethods,
    ]);
  }, [
    merchantPromptpayPaymentMethods,
    merchantCashPaymentMethods,
    merchantBankAccountPaymentMethods,
  ]);

  useEffect(() => {
    if (props.getValues("merchantShipmentId")) {
      props.setValue("orderShipmentAttributes", {
        merchantShipmentId: props.getValues("merchantShipmentId"),
      });

      const merchantShipment = props.merchantShipments.find(
        (shipment) => shipment.id === props.getValues("merchantShipmentId")
      );
      setSelectedMerchantShipment(merchantShipment);
      setShipmentPrice(
        getShipmentPrice(merchantShipment, props?.cart?.cartItems)
      );
    }
  }, [props.watch("merchantShipmentId")]);

  useEffect(() => {
    if (props?.cart?.cartItems) {
      const orderItems: OrderItemModel[] = props?.cart?.cartItems?.map(
        (item) => {
          return {
            productItemId: item?.productItem?.id,
            unit: item?.unit,
            quantity: item?.quantity,
          };
        }
      );

      setCartPrice(
        getProductPriceAndProductDiscountPrice(props?.cart?.cartItems)
      );
      props.setValue("orderItemAttributes", orderItems);
    }
  }, []);

  useEffect(() => {
    if (props.getValues("couponId")) {
      const coupon = props.coupons?.find(
        (coupon) => coupon.id === props.getValues("couponId")
      );
      setCoupon(coupon);
      setDiscountPrice(
        getOrderProductDiscountPrice(
          coupon,
          cartPrice.totalPrice,
          shipmentPrice
        )
      );
    }
  }, [props.watch("couponId")]);

  useEffect(() => {
    if (props.getValues("customerAddressId")) {
      const selectedAddress = addresses?.find((address) => address.id === props.getValues("customerAddressId"));
      setSelectedCustomerAddress(selectedAddress);
    }
  }, [props.watch("customerAddressId")]);

  const onSelectCoupon = async (selectedCoupon: CouponModel | null) => {
    setSelectedCoupon(selectedCoupon);
    await resource.createResource(`coupon-public/${selectedCoupon?.id}/keep`, {})
    await validateCoupon(selectedCoupon?.code);
  }

  const onFetchAddressSubmit = async () => {
    const { data } = await resource.fetchResource('customer-public/customerAddress', {}, null);
    setAddresses(data?.data);
  };

  const onFetchCustomerCreditCardSubmit = async () => {
    const { data } = await resource.fetchResource('customer-public/customerCreditCard', {}, null);
    setCustomerCreditCards(data?.data);
  };

  const validateCoupon = async (code: string) => {
    try {
      const result = await resource.fetchResource(`coupon-public/${code}/validate?amount=${cartPrice.totalPrice}`, {}, null);
      if (result?.status !== 200) {
        props.setValue('couponId', undefined)
      }
    } catch (error) {
      props.setValue('couponId', undefined)
    }
  }

  return (
    <>
      <ShippingOptionModal
        open={isShippingOptionsOpen}
        onClose={() => setIsShippingOptionsOpen(false)}
        options={shippingOptions}
        cartItems={props?.cart?.cartItems}
        setValue={props?.setValue}
      />
      <PaymentOptionModal
        open={isPaymentOptionsOpen}
        manualOptions={paymentOptions}
        creditCardOptions={customerCreditCards}
        onFetchCustomerCreditCard={() => onFetchCustomerCreditCardSubmit()}
        merchantShopditPaymentMethods={merchantShopditPaymentMethods}
        totalPrice={cartPrice?.totalPrice + shipmentPrice - discountPrice}
        setValue={props?.setValue}
        isActiveCreditCardPaymentMethod={isActiveCreditCardPaymentMethod}
        onClose={() => setIsPaymentOptionsOpen(false)}
      />
      <CustomerAddressOptionsModal
        open={isCustomerAddressOptionsOpen}
        addresses={addresses}
        setValue={props?.setValue}
        onFetchAddress={() => onFetchAddressSubmit()}
        onClose={() => setCustomerAddressOptionsOpen(false)}
      />
      <CouponOptionsModal
        open={isCouponOptionsOpen}
        coupons={props.coupons}
        couponsInActive={props.coupons}
        setValue={props?.setValue}
        onClose={() => setCouponOptionsOpen(false)}
        onSubmit={(selectedCoupon: CouponModel) => onSelectCoupon(selectedCoupon)}
      />
      <MobileAppBar title={t("title")} />
      <Box>
        <Box>
          <Box borderBottom="1px solid" borderColor="grey.100">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="16px"
            >
              <Box>
                <Typography fontSize="14px">{t("addressTitle")}</Typography>
                {
                  props.watch('customerAddressId') && selectedCustomerAddress ? (
                    <>
                      <Typography fontWeight="light" fontSize="14px" mt="16px">
                        {selectedCustomerAddress.name}
                      </Typography>
                      <Typography fontWeight="light" fontSize="14px">
                        {selectedCustomerAddress.fullName} ({selectedCustomerAddress.tel})
                      </Typography>
                      <Typography fontWeight="light" fontSize="14px">
                        {[
                          selectedCustomerAddress.address,
                          selectedCustomerAddress.subdistrictAddress,
                          selectedCustomerAddress.districtAddress,
                          selectedCustomerAddress.provinceAddress,
                          selectedCustomerAddress.postCodeAddress,
                        ]
                          .filter((string) => string?.length)
                          .join(", ")}
                      </Typography>
                    </>
                  ) : (
                    <Typography fontSize="14px" color="grey.200" mt="8px">
                      เพิ่มที่ข้อมูลอยู่
                    </Typography>
                  )
                }
              </Box>
              <Box onClick={() => setCustomerAddressOptionsOpen(true)}>
                <a>
                  <ChevronRightIcon sx={{ fontSize: "14px" }} />
                </a>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box p="16px">
          <Box display="flex" justifyContent="space-between">
            <Typography fontSize="14px">รายการสินค้า</Typography>
            <Typography fontSize="14px">
              <Typography component="span" color="primary">
                {props.cart?.cartItems?.length ?? 0}
              </Typography>{" "}
              รายการ
            </Typography>
          </Box>
          <Box>
            {props.cart?.cartItems.map((cartItem) => (
              <OrderItemSidebar
                key={cartItem.id}
                name={cartItem?.productItem?.product?.name}
                price={19_999}
                fullPrice={20_000}
                quantity={cartItem?.quantity}
                cartItem={cartItem}
                imageSrc={
                  cartItem?.productItem?.imageUpload?.url ||
                  cartItem?.productItem?.product?.productImages?.find((image) => image.order === 0)
                    ?.imageUpload?.url ||
                  "/new-in-placeholder.svg"
                }
              />
            ))}
          </Box>
        </Box>
        <Box borderBottom="1px solid" borderColor="grey.100">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="16px"
          >
            <Box>
              <Typography fontSize="14px">
                {t("paymentOptionTitle")}
              </Typography>
              {
                props.watch('invoiceAttributes') ? (
                  <Typography fontSize="14px" mt="8px" fontWeight="light">
                    {
                      (
                        props.watch('invoiceAttributes')?.merchantBankAccountPaymentMethodId && `โอนผ่านบัญชีธนาคาร ${merchantBankAccountPaymentMethods.find((methood) => methood.id === props.watch('invoiceAttributes')?.merchantBankAccountPaymentMethodId)?.bank?.name}`
                      ) || (
                        props.watch('invoiceAttributes')?.merchantPromptpayPaymentMethodId && 'พร้อมเพย์'
                      ) || (
                        props.watch('invoiceAttributes')?.merchantCashPaymentMethodId && 'เงินสด'
                      ) || (
                        props.watch('invoiceAttributes')?.customerCreditCardId && `บัตรเครดิต *** ${props.watch('invoiceAttributes')?.customerCreditCard.lastNumber}`
                      ) || (
                        props.watch('invoiceAttributes')?.paymentMethodType === 'shopditpayCreditCard' && `บัตรเครดิต`
                      ) || (
                        props.watch('invoiceAttributes')?.paymentMethodType === 'shopditpayLinepay' && `Line Pay`
                      ) || (
                        props.watch('invoiceAttributes')?.paymentMethodType === 'shopditpayAirpay' && `Shopee Pay`
                      ) || (
                        props.watch('invoiceAttributes')?.paymentMethodType === 'shopditpayTruemoney' && `Truemoney`
                      ) || (
                        props.watch('invoiceAttributes')?.paymentMethodType === 'shopditpayScbEasy' && `SCB EASY`
                      ) || (
                        props.watch('invoiceAttributes')?.paymentMethodType === 'shopditpayBbl' && `Bualuang mBanking`
                      ) || (
                        props.watch('invoiceAttributes')?.paymentMethodType === 'shopditpayBaybank' && `KMA (กรุงศรีโมบายแอป)`
                      )
                    }
                  </Typography>
                ) : (
                  <Typography fontSize="14px" color="grey.200" mt="8px">
                    เลือกช่องทางการชำระเงิน
                  </Typography>
                )
              }
            </Box>
            <Box onClick={() => setIsPaymentOptionsOpen(true)}>
              <ChevronRightIcon sx={{ fontSize: "14px" }} />
            </Box>
          </Box>
        </Box>
        <Box borderBottom="1px solid" borderColor="grey.100">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="16px"
          >
            <Box>
              <Typography fontSize="14px">{t("shipping.title")}</Typography>
              {
                props.watch("merchantShipmentId") ? (
                  <Typography fontSize="14px" mt="8px" fontWeight="light">
                    {selectedMerchantShipment && selectedMerchantShipment.name}
                  </Typography>
                ) : (
                  <Typography fontSize="14px" mt="8px" color="grey.200">
                    เลือกช่องทางการจัดส่ง
                  </Typography>
                )
              }
            </Box>
            <Box onClick={() => setIsShippingOptionsOpen(true)}>
              <ChevronRightIcon sx={{ fontSize: "14px" }} />
            </Box>
          </Box>
        </Box>
        <Box borderBottom="1px solid" borderColor="grey.100">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="16px"
          >
            <Box>
              <Typography fontSize="14px">คูปอง</Typography>
              {
                coupon && (
                  <Typography fontSize="14px" mt="8px">
                    {
                      coupon?.name
                    }
                  </Typography>
                )
              }
              {
                coupon && props.watch('couponId') === undefined && (
                  <Typography fontSize="12px" mt="8px" color="red.100" fontWeight="light">
                    ไม่สามารถใช้คูปองนี้ได้
                  </Typography>
                )
              }
            </Box>
            <a>
              <ChevronRightIcon sx={{ fontSize: "14px" }} onClick={() => setCouponOptionsOpen(true)} />
            </a>
          </Box>
        </Box>
      </Box>
      <Box
        position="sticky"
        bottom="0"
        bgcolor="white"
        border="1px solid"
        borderColor="grey.100"
      >
        <Box p="16px" py="0">
          <Box display="flex" justifyContent="space-between" py="24px">
            <Typography variant="h4">ราคาสินค้ารวม</Typography>
            <Typography variant="h4">
              {intl.formatNumber(cartPrice?.totalPrice)} ฿
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" py="24px">
            <Typography variant="h4">ค่าจัดส่ง</Typography>
            <Typography variant="h4">
              {intl.formatNumber(shipmentPrice)} ฿
            </Typography>
          </Box>
          {
            props.watch('couponId') && discountPrice > 0 && (
              <Box display="flex" justifyContent="space-between" py="24px">
                <Typography variant="h4">ส่วนลด</Typography>
                <Typography variant="h4" color="red.50">
                  -{intl.formatNumber(discountPrice)} ฿
                </Typography>
              </Box>
            )
          }
          <Box display="flex" justifyContent="space-between" py="24px">
            <Typography variant="h2" fontWeight="600">
              ราคารวมทั้งหมด
            </Typography>
            <Typography variant="h2" fontWeight="600">
              <Typography component="span" fontFamily="Roboto">
                ฿
              </Typography>
              {props.watch('couponId') && discountPrice > 0 ? `${intl.formatNumber(cartPrice?.totalPrice + shipmentPrice - discountPrice)}` : `${intl.formatNumber(cartPrice?.totalPrice + shipmentPrice)}`}
            </Typography>
          </Box>
        </Box>
        <form onSubmit={props.handleSubmit(props.onSubmit)}>
          <Box p="16px" pt="0">
            <Button
              variant="contained"
              disableElevation
              fullWidth
              type="submit"
              disabled={!(props.getValues('customerAddressId') && props.getValues('invoiceAttributes') && props.getValues('orderShipmentAttributes')) || props.onLoading}
              sx={{ py: "16px", borderRadius: "8px" }}
            >
              {
                props.onLoading ? (
                  <CircularProgress color="info" />
                ) : (
                  <Typography variant="h4">
                    {
                      coupon && props.watch('couponId') === undefined ?
                        "ยืนยันคำสั่งซื้อ (ไม่มีคูปอง)" :
                        "ยืนยันคำสั่งซื้อ"
                    }
                  </Typography>
                )
              }
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default OrderReviewMobile;
