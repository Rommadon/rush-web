/* eslint-disable react/no-unknown-property */
// @ts-nocheck
import { FC, useState, useEffect, useContext } from "react";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  SwipeableDrawer,
  SvgIcon,
} from "@mui/material";
import NextImage from "next/image";
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
import { AuthContext } from "src";

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
  getShipmentPrice,
} from "utils/calaulate";
import PaymentOptionModal from "./PaymentOptionsModal";
import ShippingOptionModal from "./ShippingOptionsModal";
import CustomerAddressOptionsModal from "./CustomerAddressOptionsModal";
import CouponOptionsModal from "./CouponOptionsModal";
import PointMobileModal from "./PointMobileModal";
import NoteMobileModal from "./NoteMobileModal";

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
  const { currentMerchant, profile } = useContext(AuthContext);

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
  const [merchantPromptpayPaymentMethods, setMerchantPromptpayPaymentMethods] =
    useState([]);
  const [cartPrice, setCartPrice] = useState(
    getProductPriceAndProductDiscountPrice(props?.cart?.cartItems)
  );
  const [customerCreditCards, setCustomerCreditCards] = useState([]);
  const [shipmentPrice, setShipmentPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [addresses, setAddresses] = useState<CustomerAddressModel[]>([]);
  const [selectedMerchantShipment, setSelectedMerchantShipment] =
    useState(null);
  const [isPaymentOptionsOpen, setIsPaymentOptionsOpen] = useState(false);
  const [isShippingOptionsOpen, setIsShippingOptionsOpen] = useState(false);
  const [isCustomerAddressOptionsOpen, setCustomerAddressOptionsOpen] =
    useState(false);
  const [isCouponOptionsOpen, setCouponOptionsOpen] = useState(false);
  const [selectedCustomerAddress, setSelectedCustomerAddress] = useState(null);
  const [isActiveCreditCardPaymentMethod, setIsActiveCreditCardPaymentMethod] =
    useState(false);
  const [merchantShopditPaymentMethods, setMerchantShopditPaymentMethods] =
    useState([]);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (props?.merchantOmiseIntegration) {
      setIsActiveCreditCardPaymentMethod(true);
    }
  }, [props?.merchantOmiseIntegration]);

  useEffect(() => {
    if (props?.customerCreditCards) {
      setCustomerCreditCards(props?.customerCreditCards);
    }
  }, [props?.customerCreditCards]);

  useEffect(() => {
    if (props?.merchantShopditPaymentMethods) {
      setMerchantShopditPaymentMethods(props?.merchantShopditPaymentMethods);
    }
  }, [props?.merchantShopditPaymentMethods]);

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
  }, [
    props?.customerAddresses,
    props?.merchantBankAccountPaymentMethods,
    props?.merchantCashPaymentMethods,
    props?.merchantPromptpayPaymentMethods,
    props?.merchantShipments,
  ]);

  useEffect(() => {
    if (addresses) {
      props.setValue("customerAddressId", addresses[0]?.id);
    }
  }, [addresses]);

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
      const selectedAddress = addresses?.find(
        (address) => address.id === props.getValues("customerAddressId")
      );
      setSelectedCustomerAddress(selectedAddress);
    }
  }, [props.watch("customerAddressId")]);

  useEffect(() => {
    if (
      cartPrice?.totalPrice +
        (shipmentPrice || 0) -
        (discountPrice || 0) -
        +props.watch("shopditPoint") >=
      0
    ) {
      props.setValue("invoiceAttributes", {
        ...props.getValues("invoiceAttributes"),
        shopditPoint: props.getValues("shopditPoint"),
      });
    } else if (props.getValues("shopditPoint")) {
      const updatedPoint =
        cartPrice?.totalPrice + (shipmentPrice || 0) - (discountPrice || 0);
      props.setValue("shopditPoint", updatedPoint);
      props.setValue("invoiceAttributes", {
        ...props.getValues("invoiceAttributes"),
        shopditPoint: updatedPoint,
      });
    }
  }, [props.watch("shopditPoint")]);

  const onSelectCoupon = async (selectedCoupon: CouponModel | null) => {
    setSelectedCoupon(selectedCoupon);
    await resource.createResource(
      `coupon-public/${selectedCoupon?.id}/keep`,
      {}
    );
    await validateCoupon(selectedCoupon?.code);
  };

  const onFetchAddressSubmit = async () => {
    const { data } = await resource.fetchResource(
      "customer-public/customerAddress",
      {},
      null
    );
    setAddresses(data?.data);
  };

  const onFetchCustomerCreditCardSubmit = async () => {
    const { data } = await resource.fetchResource(
      "customer-public/customerCreditCard",
      {},
      null
    );
    setCustomerCreditCards(data?.data);
  };

  const validateCoupon = async (code: string) => {
    try {
      const result = await resource.fetchResource(
        `coupon-public/${code}/validate?amount=${cartPrice.totalPrice}`,
        {},
        null
      );
      if (result?.status !== 200) {
        props.setValue("couponId", undefined);
      }
    } catch (error) {
      props.setValue("couponId", undefined);
    }
  };

  const getQuantity = (cartItem) => {
    let quantity = 0;
    cartItem.map((item) => {
      quantity += item.quantity;
    });
    return quantity;
  };

  console.log(props.watch("invoiceAttributes"));

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
        getValues={props?.getValues}
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
        onSubmit={(selectedCoupon: CouponModel) =>
          onSelectCoupon(selectedCoupon)
        }
      />
      <PointMobileModal
        open={isPointModalOpen}
        onClose={() => setIsPointModalOpen(false)}
        customerWallet={profile?.customerWallet}
        setValue={props?.setValue}
        point={props.watch("shopditPoint")}
      />
      <NoteMobileModal
        open={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        setValue={props?.setValue}
        note={props.watch("note")}
      />
      <MobileAppBar
        title={t("title")}
        right={
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <Box
              width="20px"
              height="20px"
              color="white"
              bgcolor={"#00B900"}
              borderRadius="50%"
              textAlign="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography component="h2" variant="h5">
                P
              </Typography>
            </Box>
            <Typography component="h2" variant="h5" px="8px">
              {profile?.customerWallet?.shopditPoint || 0}
            </Typography>
          </Box>
        }
      />
      <Box>
        <Box>
          <Box borderBottom="5px solid" borderColor="grey.100">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="16px"
            >
              <Box>
                <Typography fontSize="14px">
                  {t("addressTitle")}
                  <Typography component="span" ml="2px" color="red.50">
                    *
                  </Typography>
                </Typography>
                {props.watch("customerAddressId") && selectedCustomerAddress ? (
                  <>
                    <Typography fontWeight="light" fontSize="14px" mt="16px">
                      {selectedCustomerAddress.name}
                    </Typography>
                    <Typography fontWeight="light" fontSize="14px">
                      {selectedCustomerAddress.fullName} (
                      {selectedCustomerAddress.tel})
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
                    เพิ่มข้อมูลที่อยู่
                  </Typography>
                )}
              </Box>
              <Box onClick={() => setCustomerAddressOptionsOpen(true)}>
                <a>
                  <ChevronRightIcon sx={{ fontSize: "14px" }} />
                </a>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box p="16px" borderBottom="5px solid" borderColor="grey.100">
          <Box display="flex" justifyContent="space-between" pb="16px">
            <Typography fontSize="14px">รายการสินค้า</Typography>
            <Typography fontSize="14px">
              <Typography component="span" color="primary">
                {props.cart?.cartItems?.length ?? 0}
                {console.log("Prop", props.cart?.cartItems)}
              </Typography>{" "}
              รายการ
            </Typography>
          </Box>
          <Box>
            {props.cart?.cartItems.map((cartItem, index) => (
              <OrderItemSidebar
                key={cartItem.id}
                index={index}
                name={cartItem?.productItem?.product?.name}
                sku={cartItem?.productItem?.product?.slug}
                price={19_999}
                fullPrice={20_000}
                quantity={cartItem?.quantity}
                cartItem={cartItem}
                imageSrc={
                  cartItem?.productItem?.imageUpload?.url ||
                  cartItem?.productItem?.product?.productImages?.find(
                    (image) => image.order === 0
                  )?.imageUpload?.url ||
                  "/new-in-placeholder.svg"
                }
              />
            ))}
          </Box>
        </Box>
        <Box borderBottom="5px solid" borderColor="grey.100">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="16px"
          >
            <Box>
              <Typography fontSize="14px">{t("shipping.title")}</Typography>
              {props.watch("merchantShipmentId") ? (
                <Typography fontSize="14px" mt="8px" fontWeight="light">
                  {selectedMerchantShipment && selectedMerchantShipment.name}
                </Typography>
              ) : (
                <Typography fontSize="14px" mt="8px" color="grey.200">
                  เลือกช่องทางการจัดส่ง
                </Typography>
              )}
            </Box>
            <Box onClick={() => setIsShippingOptionsOpen(true)}>
              <ChevronRightIcon sx={{ fontSize: "14px" }} />
            </Box>
          </Box>
        </Box>
        <Box borderBottom="5px solid" borderColor="grey.100">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="16px"
          >
            <Box>
              <Typography fontSize="14px">โค้ดส่วนลด</Typography>
              {/* {coupon && (
                <Typography fontSize="14px" mt="8px">
                  {coupon?.name}
                </Typography>
              )}
              {coupon && props.watch("couponId") === undefined && (
                <Typography
                  fontSize="12px"
                  mt="8px"
                  color="red.100"
                  fontWeight="light"
                >
                  ไม่สามารถใช้โค้ดส่วนลดนี้ได้
                </Typography>
              )} */}
            </Box>
            <a>
              <Box display="flex" alignItems="center">
                {(coupon === null || coupon === undefined) &&
                props.watch("couponId") === undefined ? (
                  <Box mr="8px">
                    <Typography component="h2" variant="h5" color="grey.200">
                      เลือกโค้ดส่วนลด
                    </Typography>
                  </Box>
                ) : (
                  <Box mr="8px">
                    {coupon && (
                      <Box display={"flex"} alignItems={"center"}>
                        {coupon && props.watch("couponId") === undefined && (
                          <Box
                            component={"span"}
                            borderRadius={"50%"}
                            px={"4px"}
                            width="20px"
                            height="13px"
                            lineHeight={"14px"}
                            textAlign="center"
                            mr="4px"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              data-name="Layer 1"
                              viewBox="0 0 64 64"
                              id="error"
                            >
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                fill="none"
                                stroke="#EF4423"
                                stroke-miterlimit="10"
                                stroke-width="4"
                              ></circle>
                              <line
                                x1="32"
                                x2="32"
                                y1="18"
                                y2="38"
                                fill="none"
                                stroke="#EF4423"
                                stroke-miterlimit="10"
                                stroke-width="4"
                              ></line>
                              <line
                                x1="32"
                                x2="32"
                                y1="42"
                                y2="46"
                                fill="none"
                                stroke="#EF4423"
                                stroke-miterlimit="10"
                                stroke-width="4"
                              ></line>
                            </svg>
                          </Box>
                        )}

                        <Typography component="h2" fontSize="14px">
                          {coupon?.code}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
                <ChevronRightIcon
                  sx={{ fontSize: "14px" }}
                  onClick={() => setCouponOptionsOpen(true)}
                />
              </Box>
            </a>
          </Box>
        </Box>
        <Box borderBottom="5px solid" borderColor="grey.100">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="16px"
          >
            <Box>
              <Typography
                fontSize="14px"
                sx={{
                  textTransform: "uppercase",
                }}
              >
                {currentMerchant?.data?.slug} POINT
              </Typography>
            </Box>
            <a>
              <Box display="flex" alignItems="center">
                {props.watch("invoiceAttributes") &&
                props.watch("invoiceAttributes")?.shopditPoint ? (
                  <Box display="flex" alignItems="center" mr="8px">
                    <Box
                      width="20px"
                      height="20px"
                      color="white"
                      bgcolor={"#00B900"}
                      borderRadius="50%"
                      textAlign="center"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography component="h2" variant="h5">
                        P
                      </Typography>
                    </Box>
                    <Typography component="h1" variant="h4" px="4px">
                      {props.watch("invoiceAttributes")?.shopditPoint}
                    </Typography>
                  </Box>
                ) : (
                  <Box mr="8px">
                    <Typography component="h2" variant="h5" color="grey.200">
                      ใช้พอยท์ส่วนลด
                    </Typography>
                  </Box>
                )}
                <ChevronRightIcon
                  sx={{ fontSize: "14px" }}
                  onClick={() => setIsPointModalOpen(true)}
                />
              </Box>
            </a>
          </Box>
        </Box>
        <Box borderBottom="5px solid" borderColor="grey.100">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="16px"
          >
            <Box>
              <Typography fontSize="14px">
                {t("paymentOptionTitle")}
                <Typography component="span" ml="2px" color="red.50">
                  *
                </Typography>
              </Typography>
              {props.watch("invoiceAttributes") ? (
                <Typography fontSize="14px" mt="8px" fontWeight="light">
                  {(props.watch("invoiceAttributes")
                    ?.merchantBankAccountPaymentMethodId &&
                    `โอน/ชำระผ่านบัญชีธนาคาร (แนบสลิป)`) ||
                    (props.watch("invoiceAttributes")
                      ?.merchantPromptpayPaymentMethodId &&
                      "พร้อมเพย์") ||
                    (props.watch("invoiceAttributes")
                      ?.merchantCashPaymentMethodId &&
                      "เงินสด") ||
                    (props.watch("invoiceAttributes")?.customerCreditCardId &&
                      `บัตรเครดิต *** ${
                        props.watch("invoiceAttributes")?.customerCreditCard
                          .lastNumber
                      }`) ||
                    (props.watch("invoiceAttributes")?.paymentMethodType ===
                      "shopditpayCreditCard" &&
                      `บัตรเครดิต`) ||
                    (props.watch("invoiceAttributes")?.paymentMethodType ===
                      "shopditpayLinepay" &&
                      `Line Pay`) ||
                    (props.watch("invoiceAttributes")?.paymentMethodType ===
                      "shopditpayAirpay" &&
                      `ShopeePay`) ||
                    (props.watch("invoiceAttributes")?.paymentMethodType ===
                      "shopditpayTruemoney" &&
                      `TrueMoney`) ||
                    (props.watch("invoiceAttributes")?.paymentMethodType ===
                      "shopditpayScbEasy" &&
                      `SCB EASY`) ||
                    (props.watch("invoiceAttributes")?.paymentMethodType ===
                      "shopditpayBbl" &&
                      `Bualuang mBanking`) ||
                    (props.watch("invoiceAttributes")?.paymentMethodType ===
                      "shopditpayBaybank" &&
                      `KMA (กรุงศรีโมบายแอป)`)}
                  {(props.watch("invoiceAttributes")?.paymentMethodType ===
                    "shopditpayScbEasy" ||
                    props.watch("invoiceAttributes")?.paymentMethodType ===
                      "shopditpayBbl" ||
                    props.watch("invoiceAttributes")?.paymentMethodType ===
                      "shopditpayBaybank") && (
                    <Typography
                      component="span"
                      fontSize="12px"
                      color="grey.50"
                    >
                      (ขั้นต่ำ ฿500)
                    </Typography>
                  )}
                </Typography>
              ) : (
                <Typography fontSize="14px" color="grey.400" mt="8px">
                  เลือกช่องทางชำระเงิน
                </Typography>
              )}
            </Box>
            <Box onClick={() => setIsPaymentOptionsOpen(true)}>
              <ChevronRightIcon sx={{ fontSize: "14px" }} />
            </Box>
          </Box>
        </Box>
        <Box borderBottom="5px solid" borderColor="grey.100">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="16px"
          >
            <Box>
              <Typography
                fontSize="14px"
                sx={{
                  textTransform: "uppercase",
                }}
              >
                หมายเหตุถึงร้านค้า
              </Typography>
            </Box>
            <a>
              <Box display="flex" alignItems="center">
                {props.watch("note") ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    mr="8px"
                    style={{ maxWidth: "190px" }}
                  >
                    <Typography
                      component="h1"
                      variant="h4"
                      px="4px"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {props.watch("note")}
                    </Typography>
                  </Box>
                ) : (
                  <Box mr="8px">
                    <Typography component="h2" variant="h5" color="grey.200">
                      ระบุหมายเหตุถึงร้านค้า
                    </Typography>
                  </Box>
                )}
                <ChevronRightIcon
                  sx={{ fontSize: "14px" }}
                  onClick={() => setIsNoteModalOpen(true)}
                />
              </Box>
            </a>
          </Box>
        </Box>
        <Box borderBottom="1px solid" borderColor="grey.100">
          <Box p="16px" py="0">
            <Box display="flex" justifyContent="space-between" pt="12px">
              <Typography variant="h4">
                รวมการสั่งซื้อ ({getQuantity(props.cart?.cartItems)} ชิ้น)
              </Typography>
              <Typography variant="h4" color="grey.400">
                <Typography component="span" fontFamily="Roboto">
                  ฿
                </Typography>
                {(cartPrice?.totalPrice).toFixed(2)}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h4">การจัดส่ง</Typography>
              <Typography variant="h4" color="grey.400">
                <Typography component="span" fontFamily="Roboto">
                  ฿
                </Typography>
                {shipmentPrice.toFixed(2)}
              </Typography>
            </Box>
            {props.watch("couponId") && discountPrice > 0 ? (
              <Box display="flex" justifyContent="space-between" py="12px">
                <Typography variant="h4">ส่วนลด</Typography>
                <Typography variant="h4" color="red.50">
                  -
                  <Typography component="span" fontFamily="Roboto">
                    ฿
                  </Typography>
                  {intl.formatNumber(discountPrice)}
                </Typography>
              </Box>
            ) : (
              ""
            )}
            {props.watch("shopditPoint") && props.watch("shopditPoint") > 0 ? (
              <Box display="flex" justifyContent="space-between">
                <Typography
                  variant="h4"
                  sx={{
                    textTransform: "uppercase",
                  }}
                >
                  พอยท์ส่วนลด
                </Typography>
                <Typography variant="h4" color="grey.400">
                  -
                  <Typography component="span" fontFamily="Roboto">
                    ฿
                  </Typography>
                  {props.watch("shopditPoint").toFixed(2)}
                </Typography>
              </Box>
            ) : (
              ""
            )}
            <Box display="flex" justifyContent="space-between" pt="6px">
              <Typography variant="h3" fontWeight="600">
                ยอดชำระทั้งหมด
              </Typography>
              <Typography
                variant="h4"
                fontWeight="400"
                color="red.50"
                pb="16px"
              >
                <Typography
                  variant="h4"
                  component="span"
                  fontFamily="Roboto"
                  pr="2px"
                >
                  ฿
                </Typography>
                {props.watch("couponId") && discountPrice > 0
                  ? `${(
                      cartPrice?.totalPrice +
                      shipmentPrice -
                      discountPrice -
                      (+props.watch("shopditPoint") || 0)
                    ).toFixed(2)}`
                  : `${(
                      cartPrice?.totalPrice +
                      shipmentPrice -
                      (+props.watch("shopditPoint") || 0)
                    ).toFixed(2)}`}
              </Typography>
            </Box>
          </Box>
          <Box
            position="sticky"
            pt="16px"
            bottom="0"
            bgcolor="white"
            border="1px solid"
            borderColor="grey.100"
          >
            <Box display="flex" justifyContent="space-between" px="16px">
              <Typography variant="h4" fontWeight="400">
                รวมทั้งหมด
              </Typography>
              <Typography
                variant="h4"
                fontWeight="400"
                color="red.50"
                pb="16px"
              >
                <Typography
                  variant="h4"
                  component="span"
                  fontFamily="Roboto"
                  pr="2px"
                >
                  ฿
                </Typography>
                {props.watch("couponId") && discountPrice > 0
                  ? `${(
                      cartPrice?.totalPrice +
                      shipmentPrice -
                      discountPrice -
                      (+props.watch("shopditPoint") || 0)
                    ).toFixed(2)}`
                  : `${(
                      cartPrice?.totalPrice +
                      shipmentPrice -
                      (+props.watch("shopditPoint") || 0)
                    ).toFixed(2)}`}
              </Typography>
            </Box>
            <form id="hook-form" onSubmit={props.handleSubmit(props.onSubmit)}>
              <SwipeableDrawer
                anchor={"bottom"}
                open={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onOpen={() => setIsConfirmModalOpen(true)}
                sx={{
                  "& .MuiPaper-root": {
                    borderTopRightRadius: "8px",
                    borderTopLeftRadius: "8px",
                    p: "16px",
                  },
                }}
              >
                <Typography fontSize={"14px"} textAlign={"center"} pb="24px">
                  ยืนยันคำสั่งซื้อ
                </Typography>
                {selectedCustomerAddress ? (
                  <Box
                    borderBottom={"1px solid"}
                    borderColor={"grey.50"}
                    mb="16px"
                  >
                    <Box display={"flex"} alignItems={"center"} mb="8px">
                      <Box
                        component={"span"}
                        borderRadius={"50%"}
                        px={"4px"}
                        bgcolor="grey.50"
                        width="24px"
                        height="24px"
                        textAlign="center"
                        mr="8px"
                      >
                        <NextImage  
                          src={"/location.svg"}
                          alt="heart icon"
                          width={"12px"}
                          height={"12px"}
  unoptimized={true}
/>
                      </Box>
                      <Typography fontWeight="light" fontSize={"14px"}>
                        {[
                          selectedCustomerAddress?.address,
                          selectedCustomerAddress?.subdistrictAddress,
                          selectedCustomerAddress?.districtAddress,
                          selectedCustomerAddress?.provinceAddress,
                          selectedCustomerAddress?.postCodeAddress,
                        ]
                          .filter((string) => string?.length)
                          .join(" ")}
                      </Typography>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} mb="8px">
                      <Box
                        component={"span"}
                        borderRadius={"50%"}
                        px={"4px"}
                        bgcolor="grey.50"
                        width="24px"
                        height="24px"
                        textAlign="center"
                        mr="8px"
                      >
                        <NextImage  
                          src={"/profile.svg"}
                          alt="heart icon"
                          width={"12px"}
                          height={"12px"}
  unoptimized={true}
/>
                      </Box>
                      <Typography fontWeight="light" fontSize={"14px"}>
                        {selectedCustomerAddress?.name}
                      </Typography>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} mb="16px">
                      <Box
                        component={"span"}
                        borderRadius={"50%"}
                        px={"4px"}
                        bgcolor="grey.50"
                        width="24px"
                        height="24px"
                        textAlign="center"
                        mr="8px"
                      >
                        <NextImage  
                          src={"/phone.svg"}
                          alt="heart icon"
                          width={"12px"}
                          height={"12px"}
  unoptimized={true}
/>
                      </Box>
                      <Typography fontWeight="light" fontSize={"14px"}>
                        {selectedCustomerAddress?.tel}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <></>
                )}
                <Box display="flex" justifyContent="space-between" py="12px">
                  <Typography fontSize={"14px"}>ยอดชำระทั้งหมด</Typography>
                  <Typography fontSize={"14px"}>
                    <Typography
                      component="span"
                      fontFamily="Roboto"
                      fontSize={"14px"}
                    >
                      ฿
                    </Typography>
                    {props.watch("couponId") && discountPrice > 0
                      ? `${intl.formatNumber(
                          cartPrice?.totalPrice +
                            shipmentPrice -
                            discountPrice -
                            (+props.watch("shopditPoint") || 0)
                        )}`
                      : `${intl.formatNumber(
                          cartPrice?.totalPrice +
                            shipmentPrice -
                            (+props.watch("shopditPoint") || 0)
                        )}`}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" py="12px">
                  <Typography fontSize={"14px"}>โค้ดส่วนลด</Typography>
                  <Box display="flex" alignItems={"center"}>
                    {coupon && props.watch("couponId") === undefined ? (
                      <Typography
                        component={"span"}
                        px="8px"
                        color="red.100"
                        fontSize={"14px"}
                      >
                        <Box display={"flex"} alignItems={"center"}>
                          <Box
                            component={"span"}
                            borderRadius={"50%"}
                            px={"4px"}
                            width="20px"
                            height="13px"
                            lineHeight={"14px"}
                            textAlign="center"
                            mr="4px"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              data-name="Layer 1"
                              viewBox="0 0 64 64"
                              id="error"
                            >
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                fill="none"
                                stroke="#EF4423"
                                stroke-miterlimit="10"
                                stroke-width="4"
                              ></circle>
                              <line
                                x1="32"
                                x2="32"
                                y1="18"
                                y2="38"
                                fill="none"
                                stroke="#EF4423"
                                stroke-miterlimit="10"
                                stroke-width="4"
                              ></line>
                              <line
                                x1="32"
                                x2="32"
                                y1="42"
                                y2="46"
                                fill="none"
                                stroke="#EF4423"
                                stroke-miterlimit="10"
                                stroke-width="4"
                              ></line>
                            </svg>
                          </Box>
                          <Typography
                            fontWeight="light"
                            component={"span"}
                            px="2px"
                            color="red.100"
                            fontSize={"12px"}
                          >
                            ไม่สามารถใช้งานได้
                          </Typography>
                        </Box>
                      </Typography>
                    ) : (
                      <></>
                    )}
                    <Typography fontSize={"14px"}>
                      {coupon?.name || "-"}
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between" py="12px">
                  <Typography fontSize={"14px"}>ชำระโดย</Typography>
                  <Typography fontSize={"14px"}>
                    {(props.watch("invoiceAttributes")
                      ?.merchantBankAccountPaymentMethodId &&
                      `โอนผ่านบัญชีธนาคาร ${
                        merchantBankAccountPaymentMethods.find(
                          (methood) =>
                            methood.id ===
                            props.watch("invoiceAttributes")
                              ?.merchantBankAccountPaymentMethodId
                        )?.bank?.name
                      }`) ||
                      (props.watch("invoiceAttributes")
                        ?.merchantPromptpayPaymentMethodId &&
                        "พร้อมเพย์") ||
                      (props.watch("invoiceAttributes")
                        ?.merchantCashPaymentMethodId &&
                        "เงินสด") ||
                      (props.watch("invoiceAttributes")?.customerCreditCardId &&
                        `บัตรเครดิต *** ${
                          props.watch("invoiceAttributes")?.customerCreditCard
                            .lastNumber
                        }`) ||
                      (props.watch("invoiceAttributes")?.paymentMethodType ===
                        "shopditpayCreditCard" &&
                        `บัตรเครดิต`) ||
                      (props.watch("invoiceAttributes")?.paymentMethodType ===
                        "shopditpayLinepay" &&
                        `Line Pay`) ||
                      (props.watch("invoiceAttributes")?.paymentMethodType ===
                        "shopditpayAirpay" &&
                        `Shopee Pay`) ||
                      (props.watch("invoiceAttributes")?.paymentMethodType ===
                        "shopditpayTruemoney" &&
                        `Truemoney`) ||
                      (props.watch("invoiceAttributes")?.paymentMethodType ===
                        "shopditpayScbEasy" &&
                        `SCB EASY`) ||
                      (props.watch("invoiceAttributes")?.paymentMethodType ===
                        "shopditpayBbl" &&
                        `Bualuang mBanking`) ||
                      (props.watch("invoiceAttributes")?.paymentMethodType ===
                        "shopditpayBaybank" &&
                        `KMA (กรุงศรีโมบายแอป)`)}
                  </Typography>
                </Box>
                <Box pt="16px">
                  <Button
                    variant="contained"
                    disableElevation
                    fullWidth
                    type="submit"
                    form="hook-form"
                    sx={{ py: "12px", borderRadius: "8px" }}
                    disabled={props.onLoading}
                  >
                    {props.onLoading ? (
                      <CircularProgress color="info" />
                    ) : (
                      <Typography fontSize={"14px"}>
                        {coupon && props.watch("couponId") === undefined
                          ? "ยืนยัน (ไม่มีโค้ดส่วนลด)"
                          : "ยืนยัน"}
                      </Typography>
                    )}
                  </Button>
                </Box>
                <Box pt="8px">
                  <Button
                    variant="outlined"
                    disableElevation
                    fullWidth
                    type="button"
                    onClick={() => setIsConfirmModalOpen(false)}
                    sx={{ py: "12px", borderRadius: "8px" }}
                  >
                    <Typography fontSize={"14px"}>ยกเลิก</Typography>
                  </Button>
                </Box>
              </SwipeableDrawer>
              <Box p="16px" pt="0">
                <Button
                  variant="contained"
                  disableElevation
                  fullWidth
                  // type="submit"
                  type="button"
                  onClick={() => setIsConfirmModalOpen(true)}
                  disabled={
                    !(
                      props.getValues("customerAddressId") &&
                      props.getValues("invoiceAttributes") &&
                      props.getValues("orderShipmentAttributes")
                    ) || props.onLoading
                  }
                  sx={{ py: "16px", borderRadius: "8px" }}
                >
                  {props.onLoading ? (
                    <CircularProgress color="info" />
                  ) : (
                    <Typography variant="h4">
                      {coupon && props.watch("couponId") === undefined
                        ? "ยืนยันคำสั่งซื้อ (ไม่มีโค้ดส่วนลด)"
                        : "ยืนยันคำสั่งซื้อ"}
                    </Typography>
                  )}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OrderReviewMobile;
