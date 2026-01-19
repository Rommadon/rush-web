// @ts-nocheck

import { FC, useState, useEffect } from "react";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Radio,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { DefaultLayout, ChevronDownIcon, useResource, MobileAppBar } from "src/core";
import { UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";
import { useToast } from "src/core/hooks/useToast";

import { ShippingForm } from "../ShippingForm";
import PaymentOptionForm from "../PaymentOptionForm";
import { OrderReviewSidebar } from "../OrderReviewSidebar";
import { CouponModal } from "../CouponModal";
import { AddressModal } from "../form/AddressForm";
import { CreditCardModal } from "../form/CreditCardForm";
import { CouponModel, Address, MerchantShipmentModel, MerchantBankAccountPaymentMethodModel, MerchantCashPaymentMethodModel, MerchantPromptpayPaymentMethodModel, MerchantShopditPaymentMethodModel } from "../../models";
import { CustomerAddressModel, CartModel } from "src/core/models";
import { OrderItemModel } from "../models/OrderItemModel";
import { getProductPriceAndProductDiscountPrice, getOrderProductDiscountPrice, getShipmentPrice } from "utils/calaulate";

export type OrderReviewDesktopProps = {
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

export const OrderReviewDesktop: FC<OrderReviewDesktopProps> = (props) => {
  const t = useTranslations("order.orderReview");
  const resource = useResource();
  const toast = useToast();

  const [shippingOptions, setShippingOptions] = useState<MerchantShipmentModel[]>([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [merchantBankAccountPaymentMethods, setMerchantBankAccountPaymentMethods] = useState([]);
  const [merchantCashPaymentMethods, setMerchantCashPaymentMethods] = useState([]);
  const [merchantPromptpayPaymentMethods, setMerchantPromptpayPaymentMethods] = useState([]);
  const [addressExpanded, setAddressExpanded] = useState(true);
  const [shippingExpanded, setShippingExpanded] = useState(true);
  const [paymentOptionExpanded, setPaymentOptionExpanded] = useState(true);
  const [productListExpanded, setProductListExpanded] = useState(true);
  const [cartPrice, setCartPrice] = useState(getProductPriceAndProductDiscountPrice(props?.cart?.cartItems));
  const [shipmentPrice, setShipmentPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<CustomerAddressModel[]>([]);
  const [customerCreditCards, setCustomerCreditCards] = useState([]);
  const [merchantShopditPaymentMethods, setMerchantShopditPaymentMethods] = useState([]);
  const [creditCardModalOpen, setCreditCardModalOpen] = useState(false);
  const [isActiveCreditCardPaymentMethod, setIsActiveCreditCardPaymentMethod] = useState(false);

  const subTotal = 19_999;
  const discount = 100;
  const totalPrice = subTotal - discount;
  const couponDiscount = 100;

  const onSelectCoupon = async (selectedCoupon: CouponModel | null) => {
    setCoupon(selectedCoupon);
    await resource.createResource(`coupon-public/${selectedCoupon?.id}/keep`, {})
    const validateData = await resource.fetchResource(`coupon-public/${selectedCoupon?.code}/validate?amount=${cartPrice.totalPrice}`, {}, null)
    if (validateData?.data) {
      props.setValue('couponId', selectedCoupon?.id);
    } else {
      props.setValue('couponId', undefined);
      setDiscountPrice(0);
    }
  }

  const onAddressSubmit = async (address) => {
    try {
      await resource.createResource('customer-public/customerAddress', {
        ...address
      })

      const { data } = await resource.fetchResource('customer-public/customerAddress', {}, null);
      setAddresses([...data?.data])
    } catch (error) {
      toast.openToast("การสร้างที่อยู่ไม่สำเร็จ", "error");
    }
  };

  const onCreditCardSubmit = async (creditCard) => {
    try {
      await resource.createResource('customer-public/customerCreditCard', {
        ...creditCard
      })
      const { data } = await resource.fetchResource('customer-public/customerCreditCard', {}, null);
      setCustomerCreditCards(data?.data);
      toast.openToast('การเพิ่มบัตรเครดิตสำเร็จ', 'success');
    } catch (error) {
      toast.openToast("การเพิ่มบัตรเครดิตไม่สำเร็จ", "error");
    }
  };

  const validateCoupon = async (code: string) => {
    resource.fetchResource(`coupon-public/${code}/validate?amount=${cartPrice.totalPrice}`, {}, null).then((data) => {
      const coupon = props.coupons?.find((coupon) => coupon.code === code)
      props.setValue('couponId', coupon?.id)
    }).catch((error) => {
      props.setValue('couponId', undefined)
    })
  }

  useEffect(() => {
    if (props?.merchantShopditPaymentMethods) {
      setMerchantShopditPaymentMethods(props?.merchantShopditPaymentMethods);
    }
  }, [props?.merchantShopditPaymentMethods])

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
    if (props?.merchantShipments) {
      setShippingOptions(props?.merchantShipments)
    }

    if (props?.customerAddresses) {
      setAddresses(props?.customerAddresses)
    }

    if (props?.merchantBankAccountPaymentMethods) {
      const merchantBankAccountPaymentMethods = props?.merchantBankAccountPaymentMethods?.map((method) => {
        return {
          ...method,
          type: "bankAccount"
        }
      })

      setMerchantBankAccountPaymentMethods(merchantBankAccountPaymentMethods || [])
    }

    if (props?.merchantCashPaymentMethods) {
      const merchantCashPaymentMethods = props?.merchantCashPaymentMethods?.map((method) => {
        return {
          ...method,
          type: "cash"
        }
      })

      setMerchantCashPaymentMethods(merchantCashPaymentMethods || [])
    }

    if (props?.merchantPromptpayPaymentMethods) {
      const merchantPromptpayPaymentMethods = props?.merchantPromptpayPaymentMethods?.map((method) => {
        return {
          ...method,
          type: "promptpay"
        }
      })

      setMerchantPromptpayPaymentMethods(merchantPromptpayPaymentMethods || [])
    }
  }, [props?.merchantShipments, props?.customerAddresses, props?.merchantBankAccountPaymentMethods, props?.merchantCashPaymentMethods, props?.merchantPromptpayPaymentMethods])

  useEffect(() => {
    setPaymentOptions([
      ...merchantBankAccountPaymentMethods,
      ...merchantCashPaymentMethods,
      ...merchantPromptpayPaymentMethods
    ])
  }, [merchantPromptpayPaymentMethods, merchantCashPaymentMethods, merchantBankAccountPaymentMethods])

  useEffect(() => {
    if (props.getValues('merchantShipmentId')) {
      props.setValue('orderShipmentAttributes', {
        merchantShipmentId: props.getValues('merchantShipmentId')
      })

      const merchantShipment = props.merchantShipments.find((shipment) => shipment.id === props.getValues('merchantShipmentId'));
      setShipmentPrice(getShipmentPrice(merchantShipment, props?.cart?.cartItems));
    }
  }, [props.watch('merchantShipmentId')])

  useEffect(() => {
    if (props?.cart?.cartItems) {
      const orderItems: OrderItemModel[] = props?.cart?.cartItems?.map((item) => {
        return {
          productItemId: item?.productItem?.id,
          unit: item?.unit,
          quantity: item?.quantity
        }
      })

      setCartPrice(getProductPriceAndProductDiscountPrice(props?.cart?.cartItems))
      props.setValue('orderItemAttributes', orderItems)
    }
  }, [props])

  useEffect(() => {
    if (props.getValues('couponId')) {
      const coupon = props.coupons?.find((coupon) => coupon.id === props.getValues('couponId'));
      setDiscountPrice(getOrderProductDiscountPrice(coupon, cartPrice.totalPrice, shipmentPrice));
    }
  }, [props.watch('couponId')])

  return (
    <>
      <AddressModal
        addresses={addresses}
        open={addressModalOpen}
        onSubmit={onAddressSubmit}
        onClose={() => setAddressModalOpen()}
      />
      <CreditCardModal
        open={creditCardModalOpen}
        onSubmit={onCreditCardSubmit}
        onClose={() => setCreditCardModalOpen(false)}
      />
      <CouponModal
        coupons={props.coupons}
        open={couponModalOpen}
        onSubmit={onSelectCoupon}
        onClose={() => setCouponModalOpen(false)}
      />
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <Box px="20px">
          <Typography variant="h1">{t("title")}</Typography>
        </Box>
        <Box display="grid" gridTemplateColumns="6fr 4fr" gap="64px" pb="48px" px="20px">
          <Box>
            <Box border="1px solid" borderColor="grey.100" borderRadius="8px" overflow="hidden">
              <Accordion
                expanded={addressExpanded}
                disableGutters
                elevation={0}
                onChange={() => setAddressExpanded(!addressExpanded)}
                sx={{
                  pb: "16px"
                }}
              >
                <AccordionSummary
                  expandIcon={<ChevronDownIcon />}
                  sx={{ py: "16px" }}
                >
                  <Typography variant="h2" fontWeight="300">
                    {t("addressTitle")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {addresses.map((address, index) => (
                    <Box
                      key={address.fullName}
                      pt="20px"
                      pb="20px"
                      px="16px"
                      border="1px solid"
                      // {...index === 0  ? { borderBottom: '1px' } : {}}
                      borderColor="grey.100"
                    >
                      <Box display="flex" alignItems="center">
                        <Radio size="small" checked={props.watch('customerAddressId') === address.id} onClick={() => props.setValue('customerAddressId', address.id)} />
                        <Typography>
                          {address.name}
                        </Typography>
                        {address.default && <Typography color="grey.200">{t("default")}</Typography>}
                      </Box>
                      <Box pl="38px">
                        <Typography>
                          {address.fullName} ({address.tel})
                        </Typography>
                        <Typography>
                          {[
                            address.address,
                            address.subdistrictAddress,
                            address.districtAddress,
                            address.provinceAddress,
                            address.postCodeAddress,
                          ]
                            .filter((string) => string?.length)
                            .join(", ")}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  <Box height="16px" />
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setAddressModalOpen(true)}
                  >
                    {t("addNewAddress")}
                  </Button>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box height="32px" />
            <Box border="1px solid" borderColor="grey.100" borderRadius="8px" overflow="hidden">
              <Accordion
                expanded={shippingExpanded}
                disableGutters
                elevation={0}
                onChange={() => setShippingExpanded(!shippingExpanded)}
              >
                <AccordionSummary
                  expandIcon={<ChevronDownIcon />}
                  sx={{ py: "16px" }}
                >
                  <Typography variant="h2" fontWeight="300">
                    {t("shipping.title")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ShippingForm
                    options={shippingOptions}
                    currentMerchantShipmentId={props.watch('merchantShipmentId')}
                    setValue={props?.setValue}
                    cartItems={props?.cart?.cartItems}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box height="32px" />
            <Box border="1px solid" borderColor="grey.100" borderRadius="8px" overflow="hidden">
              <Accordion
                expanded={paymentOptionExpanded}
                disableGutters
                elevation={0}
                onChange={() =>
                  setPaymentOptionExpanded(!paymentOptionExpanded)
                }
              >
                <AccordionSummary
                  expandIcon={<ChevronDownIcon />}
                  sx={{ py: "16px" }}
                >
                  <Typography variant="h2" fontWeight="300">
                    {t("paymentOptionTitle")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <PaymentOptionForm
                    options={paymentOptions}
                    setValue={props?.setValue}
                    currentInvoiceAttributes={props.watch('invoiceAttributes')}
                    customerCreditCards={customerCreditCards}
                    onOpenCreateCreditCard={() => setCreditCardModalOpen(true)}
                    merchantShopditPaymentMethods={merchantShopditPaymentMethods}
                    isActiveCreditCardPaymentMethod={isActiveCreditCardPaymentMethod}
                    totalPrice={cartPrice?.totalPrice - discountPrice + shipmentPrice}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>

          <Box>
            <OrderReviewSidebar
              expanded={productListExpanded}
              coupon={coupon}
              subTotal={cartPrice?.totalPrice}
              totalPrice={totalPrice}
              discount={discountPrice}
              shipmentPrice={shipmentPrice}
              cartItems={props?.cart?.cartItems}
              onChangeCoupon={() => setCouponModalOpen(true)}
              onResetCoupon={() => {
                setCoupon(null);
                props.setValue('couponId', undefined);
                setDiscountPrice(0);
              }}
              onRedeem={(couponCode: string) => validateCoupon(couponCode)}
              onExpanded={() => setProductListExpanded(!productListExpanded)}
              currentCustomerAddressId={props.watch('customerAddressId')}
              currentInvoiceAttributes={props.watch('invoiceAttributes')}
              currentOrderShipmentAttributes={props.watch('orderShipmentAttributes')}
              currentCouponId={props.watch('couponId')}
              onLoading={props.onLoading}
            />
          </Box>
        </Box>
      </form>
    </>
  );
};

export default OrderReviewDesktop;
