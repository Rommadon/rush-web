import { Modal, Box, Typography, SvgIcon } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { MerchantShopditPaymentMethodModel } from "src";
import { CustomerCreditCardModel } from "src/core";
import { MobileAppBar } from "src/core/components/MobileAppBar";
import { BankModel } from "src/order/models/BankModel";
import CustomerCreditCardOptionsModal from "./CustomerCreditCardOptionsModal";

export type PaymentOptionModalProps = {
  open: boolean;
  onClose: () => any;
  onFetchCustomerCreditCard: () => any;
  manualOptions: {
    id: number;
    name: string;
    type: string;
    checked?: boolean;
    bank?: BankModel;
    number: string;
  }[];
  creditCardOptions: CustomerCreditCardModel[];
  isActiveCreditCardPaymentMethod: boolean;
  merchantShopditPaymentMethods: MerchantShopditPaymentMethodModel[];
  totalPrice: number;
  setValue: any;
};

export const PaymentOptionModal: FC<PaymentOptionModalProps> = (props) => {
  const ccFormat = (value: string) => {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length > 6)
      v = [v.slice(0, 3), '-', v.slice(3, 9), '-', v.slice(9, 10)].join('');
    return v;
  }
  const [defaultCreditCard, setDefaultCreditCard] = useState<CustomerCreditCardModel | null>(null);
  const [isCustomerCreditCardOptionsOpen, setCustomerCreditCardOptionsOpen] = useState(false);

  useEffect(() => {
    const creditCard = props.creditCardOptions.find((creditCard) => creditCard.isDefault === true) || null;

    if (creditCard) {
      setDefaultCreditCard(creditCard)
    }
  }, [props.creditCardOptions])

  const onSelectCreditCard = () => {
    if (defaultCreditCard) {
      props.setValue('invoiceAttributes', {
        paymentMethodType: 'omise',
        customerCreditCardId: defaultCreditCard.id,
        customerCreditCard: defaultCreditCard
      });
      props.onClose();
    }
  }

  return (
    <>
      <CustomerCreditCardOptionsModal
        open={isCustomerCreditCardOptionsOpen}
        onClose={() => setCustomerCreditCardOptionsOpen(false)}
        onFetchCustomerCreditCard={async () => await props.onFetchCustomerCreditCard()}
        customerCreditCards={props.creditCardOptions}
        onSetSelectedCreditCard={(data: CustomerCreditCardModel) => setDefaultCreditCard(data)}
      />
      <Modal open={props.open} onClose={props.onClose}>
        <Box bgcolor="white" height="100%" width="100%" overflow="scroll">
          <MobileAppBar title="ช่องทางการชำระเงิน" onBackClick={props.onClose} />
          {
            props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
              props.merchantShopditPaymentMethods[0].creditCardIsActive ? (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  p="32px 16px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  onClick={
                    () => {
                      props.setValue('invoiceAttributes', {
                        paymentMethodType: 'shopditpayCreditCard',
                        merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                      });
                      props.onClose();
                    }
                  }
                >
                  <Box>
                    <Typography fontSize="14px" fontWeight="600">
                      บัตรเครดิต
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  p="32px 16px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  bgcolor="grey.100"
                >
                  <Box>
                    <Typography fontSize="14px" fontWeight="600">
                      บัตรเครดิต <Typography fontSize="12px" py="8px" color="red.50">(ยังไม่เปิดให้บริการ)</Typography>
                    </Typography>
                  </Box>
                </Box>
              )
            )
          }
          {
            props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
              props.merchantShopditPaymentMethods[0].linepayIsActive ? (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  p="32px 16px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  onClick={
                    () => {
                      props.setValue('invoiceAttributes', {
                        paymentMethodType: 'shopditpayLinepay',
                        merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                      });
                      props.onClose();
                    }
                  }
                >
                  <Box>
                    <Typography fontSize="14px" fontWeight="600">
                      Line Pay
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  p="32px 16px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  bgcolor="grey.100"
                >
                  <Box>
                    <Typography fontSize="14px" fontWeight="600">
                      Line Pay <Typography fontSize="12px" py="8px" color="red.50">(ยังไม่เปิดให้บริการ)</Typography>
                    </Typography>
                  </Box>
                </Box>
              )
            )
          }
          {
            props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
              props.merchantShopditPaymentMethods[0].airpayIsActive ? (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  p="32px 16px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  onClick={
                    () => {
                      props.setValue('invoiceAttributes', {
                        paymentMethodType: 'shopditpayAirpay',
                        merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                      });
                      props.onClose();
                    }
                  }
                >
                  <Box>
                    <Typography fontSize="14px" fontWeight="600">
                      Shopee Pay
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  p="32px 16px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  bgcolor="grey.100"
                >
                  <Box>
                    <Typography fontSize="14px" fontWeight="600">
                      Shopee Pay <Typography fontSize="12px" py="8px" color="red.50">(ยังไม่เปิดให้บริการ)</Typography>
                    </Typography>
                  </Box>
                </Box>
              )
            )
          }
          {
            props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
              props.merchantShopditPaymentMethods[0].truemoneyIsActive ? (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  p="32px 16px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  onClick={
                    () => {
                      props.setValue('invoiceAttributes', {
                        paymentMethodType: 'shopditpayTruemoney',
                        merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                      });
                      props.onClose();
                    }
                  }
                >
                  <Box>
                    <Typography fontSize="14px" fontWeight="600">
                      Truemoney
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  p="32px 16px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  bgcolor="grey.100"
                >
                  <Box>
                    <Typography fontSize="14px" fontWeight="600">
                      Truemoney <Typography fontSize="12px" py="8px" color="red.50">(ยังไม่เปิดให้บริการ)</Typography>
                    </Typography>
                  </Box>
                </Box>
              )
            )
          }
          {
            props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
              props.merchantShopditPaymentMethods[0].scbEasyIsActive && props.totalPrice > 500 ? (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  p="32px 16px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  onClick={
                    () => {
                      props.setValue('invoiceAttributes', {
                        paymentMethodType: 'shopditpayScbEasy',
                        merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                      });
                      props.onClose();
                    }
                  }
                >
                  <Box>
                    <Typography fontSize="14px" fontWeight="600">
                      SCB EASY
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  p="32px 16px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  bgcolor="grey.100"
                >
                  <Box>
                    <Typography fontSize="14px" fontWeight="600">
                      SCB EASY <Typography fontSize="12px" py="8px" color="red.50">{props.totalPrice > 500 ? '(ยังไม่เปิดให้บริการ)' : '(ขั้นต่ำยอดรวม 500 บาท)'}</Typography>
                    </Typography>
                  </Box>
                </Box>
              )
            )
          }
          {
            props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
              props.merchantShopditPaymentMethods[0].bblIsActive && props.totalPrice > 500 ? (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  p="32px 16px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  onClick={
                    () => {
                      props.setValue('invoiceAttributes', {
                        paymentMethodType: 'shopditpayBbl',
                        merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                      });
                      props.onClose();
                    }
                  }
                >
                  <Box>
                    <Typography fontSize="14px" fontWeight="600">
                      Bualuang mBanking
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  p="32px 16px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  bgcolor="grey.100"
                >
                  <Box>
                    <Typography fontSize="14px" fontWeight="600">
                      Bualuang mBanking <Typography fontSize="12px" py="8px" color="red.50">{props.totalPrice > 500 ? '(ยังไม่เปิดให้บริการ)' : '(ขั้นต่ำยอดรวม 500 บาท)'}</Typography>
                    </Typography>
                  </Box>
                </Box>
              )
            )
          }
          {
            props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
              props.merchantShopditPaymentMethods[0].baybankIsActive && props.totalPrice > 500 ? (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  p="32px 16px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  onClick={
                    () => {
                      props.setValue('invoiceAttributes', {
                        paymentMethodType: 'shopditpayBaybank',
                        merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                      });
                      props.onClose();
                    }
                  }
                >
                  <Box>
                    <Typography fontSize="14px" fontWeight="600">
                      KMA (กรุงศรีโมบายแอป)
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  p="32px 16px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  bgcolor="grey.100"
                >
                  <Box>
                    <Typography fontSize="14px" fontWeight="600">
                      KMA (กรุงศรีโมบายแอป) <Typography fontSize="12px" py="8px" color="red.50">{props.totalPrice > 500 ? '(ยังไม่เปิดให้บริการ)' : '(ขั้นต่ำยอดรวม 500 บาท)'}</Typography>
                    </Typography>
                  </Box>
                </Box>
              )
            )
          }
          {props.manualOptions.map((option) => (
            <Box
              key={option.id}
              display="flex"
              justifyContent="space-between"
              p="32px 16px"
              borderBottom="1px solid"
              borderColor="grey.100"
              onClick={
                () => {
                  props.setValue('invoiceAttributes', option.type === 'bankAccount' ? {
                    paymentMethodType: 'bankAccount',
                    merchantBankAccountPaymentMethodId: option.id
                  } : option.type === 'promptpay' ? {
                    paymentMethodType: 'promptpay',
                    merchantPromptpayPaymentMethodId: option.id
                  } : {
                    paymentMethodType: 'cash',
                    merchantCashPaymentMethodId: option.id
                  }
                  );
                  props.onClose();
                }}
            >
              <Box>
                <Typography fontSize="14px" fontWeight="600">
                  {option?.type === 'bankAccount' ? `${option?.bank?.name} (${ccFormat(option?.number)})` : (option?.type === 'promptpay' ? 'พร้อมเพย์' : 'เงินสด')}
                </Typography>
              </Box>
            </Box>
          ))}
          {/* {
            props.isActiveCreditCardPaymentMethod && (
              <Box
                display="flex"
                justifyContent="space-between"
                p="32px 16px"
                borderBottom="1px solid"
                borderColor="grey.100"
              >
                <Box
                  onClick={() => onSelectCreditCard()}
                >
                  <Typography fontSize="14px" fontWeight="600">
                    บัตรเครดิต
                  </Typography>
                </Box>
                <Box display="flex" alignContent="center" onClick={() => setCustomerCreditCardOptionsOpen(true)}>
                  {
                    defaultCreditCard ? (
                      <>
                        <Typography>*** {defaultCreditCard.lastNumber}</Typography>
                        <SvgIcon width="6" height="10" viewBox={"0 0 6px 10px"} sx={{
                          pt: "8px",
                          pl: "16px"
                        }}>
                          <path
                            d="M0.333984 1.22882L1.27679 0.286011L5.99084 5.00006L1.27679 9.7141L0.333984 8.77129L4.10522 5.00006L0.333984 1.22882Z"
                            fill="black"
                          />
                        </SvgIcon>
                      </>
                    ) : (
                      <>
                        <Typography color="grey.100">เพิ่มบัตรเครดิต</Typography>
                        <SvgIcon width="6" height="10" viewBox={"0 0 6px 10px"} sx={{
                          pt: "8px",
                          pl: "16px"
                        }}>
                          <path
                            d="M0.333984 1.22882L1.27679 0.286011L5.99084 5.00006L1.27679 9.7141L0.333984 8.77129L4.10522 5.00006L0.333984 1.22882Z"
                            fill="black"
                          />
                        </SvgIcon>
                      </>
                    )
                  }
                </Box>
              </Box>
            )
          } */}
        </Box>
      </Modal>
    </>
  );
};

export default PaymentOptionModal;
