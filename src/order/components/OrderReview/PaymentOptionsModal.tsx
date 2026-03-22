import { Modal, Box, Typography, SvgIcon } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { MerchantShopditPaymentMethodModel } from "src";
import { CustomerCreditCardModel } from "src/core";
import { MobileAppBar } from "src/core/components/MobileAppBar";
import { BankModel } from "src/order/models/BankModel";
import Image from "next/image";

import cardIcon from "public/icons/cardpayment.png"
import linepayIcon from "public/icons/line_pay.png"
import shopeepayIcon from "public/icons/shopee_pay.png"
import tmnIcon from "public/icons/truemoney.png"
import buaMobile from "public/mobile-png/bua.png"
import kmaMobile from "public/mobile-png/kma.png"
import scbMobile from "public/mobile-png/scb.png"
import scbIcon from "public/bank-png/scb.png";
import kbankIcon from "public/bank-png/kbank.png"
import bblIcon from "public/bank-png/bbl.png"
import ktbIcon from "public/bank-png/ktb.png";
import citiIcon from "public/bank-png/citi.png"
import kkIcon from "public/bank-png/kk.png"
import cimbIcon from "public/bank-png/cimb.png"
import tbankIcon from "public/bank-png/tbank.png"
import bayIcon from "public/bank-png/bay.png"
import gsbIcon from "public/bank-png/gsb.png"
import ibankIcon from "public/bank-png/ibank.png";
import icbcIcon from "public/bank-png/icbc.png"
import uobIcon from "public/bank-png/uob.png"
import tiscoIcon from "public/bank-png/tisco.png";
import tcrbIcon from "public/bank-png/tcrb.png"
import scIcon from "public/bank-png/sc.png"
import ghbIcon from "public/bank-png/ghb.png"
import lhbIcon from "public/bank-png/lhb.png"
import baacIcon from "public/bank-png/baac.png"
import ppIcon from "public/icons/promptpay.png"
import cashIcon from "public/icons/cash.jpg";

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
  getValues: any;
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
        ...props.getValues('invoiceAttributes'),
        paymentMethodType: 'omise',
        customerCreditCardId: defaultCreditCard.id,
        customerCreditCard: defaultCreditCard
      });
      props.onClose();
    }
  }

  const getImageBankPropmpt = (name: any) => {
    switch (name) {
      case "ธนาคารไทยพาณิชย์":
        return <Image src={scbIcon} alt="scb icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารกสิกรไทย":
        return <Image src={kbankIcon} alt="kbank icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารกรุงเทพ":
        return <Image src={bblIcon} alt="bbl icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารกรุงไทย":
        return <Image src={ktbIcon} alt="ktb icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารซิติแบงค์":
        return <Image src={citiIcon} alt="citi icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารเกียรตินาคิน":
        return <Image src={kkIcon} alt="kk icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารซีไอเอ็มบีไทย":
        return <Image src={cimbIcon} alt="cimb icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารทหารไทยธนชาติ":
        return <Image src={tbankIcon} alt="tbank icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารกรุงศรีอยุธยา":
        return <Image src={bayIcon} alt="bay icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารออมสิน":
        return <Image src={gsbIcon} alt="gsb icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารอิสลามแห่งประเทศไทย":
        return <Image src={ibankIcon} alt="ibank icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารไอซีบีซี":
        return <Image src={icbcIcon} alt="icbc icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารยูโอบี":
        return <Image src={uobIcon} alt="uob icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารทิสโก้":
        return <Image src={tiscoIcon} alt="tisco icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารไทยเครดิตเพื่อรายย่อย":
        return <Image src={tcrbIcon} alt="tcrb icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารแสตนดาร์ดชาร์เตอร์ไทย":
        return <Image src={scIcon} alt="sc icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารอาคารสงเคราะห์":
        return <Image src={ghbIcon} alt="ghb icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารแลนด์ แอนด์ เฮาส์":
        return <Image src={lhbIcon} alt="lhb icon" width="39px" height="39px" unoptimized={true}/>
      case "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร":
        return <Image src={baacIcon} alt="baac icon" width="39px" height="39px" unoptimized={true}/>
      default:
        return <Image src={ppIcon} alt="pp icon" width="39px" height="39px" unoptimized={true}/>
    }
  }

  // const moveCashToLast = (options: []) => {
  //   let newArr = options
  //   newArr?.push(newArr?.splice(newArr?.indexOf('cash'), 1).pop())
  // }

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
        <Box bgcolor="grey.50" height="100%" width="100%" overflow="scroll">
          <MobileAppBar title="ช่องทางการชำระเงิน" onBackClick={props.onClose} />
          {
            props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
              props.merchantShopditPaymentMethods[0].creditCardIsActive ? (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  mx="16px"
                  mb="8px"
                  py="8px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRadius="8px"
                  bgcolor="white"
                  onClick={
                    () => {
                      props.setValue('invoiceAttributes', {
                        ...props.getValues('invoiceAttributes'),
                        paymentMethodType: 'shopditpayCreditCard',
                        merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                      });
                      props.onClose();
                    }
                  }
                >
                  <Box display="flex">
                    <Box width="8px" />
                    <Image src={cardIcon} alt="scb mobile" width="39px" height="39px" unoptimized={true}/>
                    <Box width="12px" />
                    <Typography fontSize="14px" fontWeight="400" pt="8px">
                      บัตรเครดิต
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  mx="16px"
                  mb="8px"
                  py="8px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRadius="8px"
                  bgcolor="grey.100"
                >
                  <Box display="flex">
                    <Box width="8px" />
                    <Image src={cardIcon} alt="scb mobile" width="39px" height="39px" unoptimized={true}/>
                    <Box width="12px" />
                    <Typography fontSize="14px" fontWeight="400">
                      บัตรเครดิต <Typography fontSize="12px" color="red.50">ยังไม่เปิดให้บริการ</Typography>
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
                  mx="16px"
                  mb="8px"
                  py="8px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRadius="8px"
                  bgcolor="white"
                  onClick={
                    () => {
                      props.setValue('invoiceAttributes', {
                        ...props.getValues('invoiceAttributes'),
                        paymentMethodType: 'shopditpayLinepay',
                        merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                      });
                      props.onClose();
                    }
                  }
                >
                  <Box display="flex">
                    <Box width="8px" />
                    <Image src={linepayIcon} alt="scb mobile" width="39px" height="39px" unoptimized={true}/>
                    <Box width="12px" />
                    <Typography fontSize="14px" fontWeight="400" pt="8px">
                      Line Pay
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  mx="16px"
                  mb="8px"
                  py="8px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRadius="8px"
                  bgcolor="grey.100"
                >
                  <Box display="flex">
                    <Box width="8px" />
                    <Image src={linepayIcon} alt="scb mobile" width="39px" height="39px" unoptimized={true}/>
                    <Box width="12px" />
                    <Typography fontSize="14px" fontWeight="400">
                      Line Pay <Typography fontSize="12px" color="red.50">ยังไม่เปิดให้บริการ</Typography>
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
                  mx="16px"
                  mb="8px"
                  py="8px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRadius="8px"
                  bgcolor="white"
                  onClick={
                    () => {
                      props.setValue('invoiceAttributes', {
                        ...props.getValues('invoiceAttributes'),
                        paymentMethodType: 'shopditpayAirpay',
                        merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                      });
                      props.onClose();
                    }
                  }
                >
                  <Box display="flex">
                    <Box width="8px" />
                    <Image src={shopeepayIcon} alt="scb mobile" width="39px" height="39px" unoptimized={true}/>
                    <Box width="12px" />
                    <Typography fontSize="14px" fontWeight="400" pt="8px">
                      Shopee Pay
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  mx="16px"
                  mb="8px"
                  py="8px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRadius="8px"
                  bgcolor="grey.100"
                >
                  <Box display="flex">
                    <Box width="8px" />
                    <Image src={shopeepayIcon} alt="scb mobile" width="39px" height="39px" unoptimized={true}/>
                    <Box width="12px" />
                    <Typography fontSize="14px" fontWeight="400">
                      Shopee Pay <Typography fontSize="12px" color="red.50">ยังไม่เปิดให้บริการ</Typography>
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
                  mx="16px"
                  mb="8px"
                  py="8px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRadius="8px"
                  bgcolor="white"
                  onClick={
                    () => {
                      props.setValue('invoiceAttributes', {
                        ...props.getValues('invoiceAttributes'),
                        paymentMethodType: 'shopditpayTruemoney',
                        merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                      });
                      props.onClose();
                    }
                  }
                >
                  <Box display="flex">
                    <Box width="8px" />
                    <Image src={tmnIcon} alt="scb mobile" width="39px" height="39px" unoptimized={true}/>
                    <Box width="12px" />
                    <Typography fontSize="14px" fontWeight="400" pt="8px">
                      Truemoney
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  mx="16px"
                  mb="8px"
                  py="8px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRadius="8px"
                  bgcolor="grey.100"
                >
                  <Box display="flex">
                    <Box width="8px" />
                    <Image src={tmnIcon} alt="scb mobile" width="39px" height="39px" unoptimized={true}/>
                    <Box width="12px" />
                    <Typography fontSize="14px" fontWeight="400">
                      Truemoney <Typography fontSize="12px" color="red.50">ยังไม่เปิดให้บริการ</Typography>
                    </Typography>
                  </Box>
                </Box>
              )
            )
          }
          {
            props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (props.merchantShopditPaymentMethods[0].scbEasyIsActive || props.merchantShopditPaymentMethods[0].bblIsActive || props.merchantShopditPaymentMethods[0].baybankIsActive) && (
              <Box
                display="flex"
                bgcolor="grey.50"
                justifyContent="space-between"
                p="16px"
                fontWeight="600"
              >
                Mobile Banking
              </Box>
            )
          }
          {
            props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
              props.merchantShopditPaymentMethods[0].scbEasyIsActive && props.totalPrice > 500 ? (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  mx="16px"
                  mb="8px"
                  py="8px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRadius="8px"
                  bgcolor="white"
                  onClick={
                    () => {
                      props.setValue('invoiceAttributes', {
                        ...props.getValues('invoiceAttributes'),
                        paymentMethodType: 'shopditpayScbEasy',
                        merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                      });
                      props.onClose();
                    }
                  }
                >
                  <Box display="flex">
                    <Box width="8px" />
                    <Image src={scbMobile} alt="scb mobile" width="39px" height="39px" unoptimized={true}/>
                    <Box width="12px" />
                    <Typography fontSize="14px" fontWeight="400">
                      SCB EASY <Typography fontSize="12px" color="red.50">ขั้นต่ำยอดรวม 500 บาท</Typography>
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  mx="16px"
                  mb="8px"
                  py="8px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRadius="8px"
                  bgcolor="grey.100"
                >
                  <Box display="flex">
                    <Box width="8px" />
                    <Image src={scbMobile} alt="scb mobile" width="39px" height="39px" unoptimized={true}/>
                    <Box width="12px" />
                    <Typography fontSize="14px" fontWeight="400">
                      SCB EASY <Typography fontSize="12px" color="red.50">{props.totalPrice > 500 ? 'ยังไม่เปิดให้บริการ' : 'ขั้นต่ำยอดรวม 500 บาท'}</Typography>
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
                  mx="16px"
                  mb="8px"
                  py="8px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRadius="8px"
                  bgcolor="white"
                  onClick={
                    () => {
                      props.setValue('invoiceAttributes', {
                        ...props.getValues('invoiceAttributes'),
                        paymentMethodType: 'shopditpayBbl',
                        merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                      });
                      props.onClose();
                    }
                  }
                >
                  <Box display="flex">
                    <Box width="8px" />
                    <Image src={buaMobile} alt="scb mobile" width="39px" height="39px" unoptimized={true}/>
                    <Box width="12px" />
                    <Typography fontSize="14px" fontWeight="400">
                      Bualuang mBanking <Typography fontSize="12px" color="red.50">ขั้นต่ำยอดรวม 500 บาท</Typography>
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  mx="16px"
                  mb="8px"
                  py="8px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRadius="8px"
                  bgcolor="grey.100"
                >
                  <Box display="flex">
                    <Box width="8px" />
                    <Image src={buaMobile} alt="scb mobile" width="39px" height="39px" unoptimized={true}/>
                    <Box width="12px" />
                    <Typography fontSize="14px" fontWeight="400">
                      Bualuang mBanking <Typography fontSize="12px" color="red.50">{props.totalPrice > 500 ? 'ยังไม่เปิดให้บริการ' : 'ขั้นต่ำยอดรวม 500 บาท'}</Typography>
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
                  mx="16px"
                  mb="8px"
                  py="8px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRadius="8px"
                  bgcolor="white"
                  onClick={
                    () => {
                      props.setValue('invoiceAttributes', {
                        ...props.getValues('invoiceAttributes'),
                        paymentMethodType: 'shopditpayBaybank',
                        merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                      });
                      props.onClose();
                    }
                  }
                >
                  <Box display="flex">
                    <Box width="8px" />
                    <Image src={kmaMobile} alt="scb mobile" width="39px" height="39px" unoptimized={true}/>
                    <Box width="12px" />
                    <Typography fontSize="14px" fontWeight="400">
                      KMA (กรุงศรีโมบายแอป) <Typography fontSize="12px" color="red.50">ขั้นต่ำยอดรวม 500 บาท</Typography>
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={props.merchantShopditPaymentMethods[0].id}
                  display="flex"
                  justifyContent="space-between"
                  mx="16px"
                  mb="8px"
                  py="8px"
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRadius="8px"
                  bgcolor="grey.100"
                >
                  <Box display="flex">
                    <Box width="8px" />
                    <Image src={kmaMobile} alt="scb mobile" width="39px" height="39px" unoptimized={true}/>
                    <Box width="12px" />
                    <Typography fontSize="14px" fontWeight="400">
                      KMA (กรุงศรีโมบายแอป) <Typography fontSize="12px" color="red.50">{props.totalPrice > 500 ? 'ยังไม่เปิดให้บริการ' : 'ขั้นต่ำยอดรวม 500 บาท'}</Typography>
                    </Typography>
                  </Box>
                </Box>
              )
            )
          }
          {props.manualOptions?.filter((option) => option?.type !== "cash").map((option, index) => {
            if (option?.type !== "cash") {
              return (
                <Box>
                  {
                    index === 0 && (
                      <Box
                        display="flex"
                        bgcolor="grey.50"
                        justifyContent="space-between"
                        p="16px"
                        fontWeight="600"
                      >
                        โอน/ชำระผ่านบัญชีธนาคาร (แนบสลิป)
                      </Box>
                    )
                  }
                  <Box
                    key={option.id}
                    display="flex"
                    bgcolor="white"
                    justifyContent="space-between"
                    mx="16px"
                    mb="8px"
                    py="8px"
                    borderRadius="8px"
                    borderBottom="1px solid"
                    borderColor="grey.100"
                    onClick={
                      () => {
                        props.setValue('invoiceAttributes', option.type === 'bankAccount' ? {
                          paymentMethodType: 'bankAccount',
                          merchantBankAccountPaymentMethodId: option.id
                        } : {
                          paymentMethodType: 'promptpay',
                          merchantPromptpayPaymentMethodId: option.id
                        }
                        );
                        props.onClose();
                      }}
                  >
                    <Box display="flex">
                      <Box width="8px" />
                      {getImageBankPropmpt(option?.bank?.name)}
                      <Box width="12px" />
                      <Typography fontSize="14px" fontWeight="400" pt="8px">
                        {option?.type === 'bankAccount' ? `${option?.bank?.name}` : 'พร้อมเพย์' }
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )
            }
          })}
          {props.manualOptions.map(option => {
            if (option?.type === "cash") {
              return (
                <Box>
                  <Box
                    display="flex"
                    bgcolor="grey.50"
                    justifyContent="space-between"
                    p="16px"
                    fontWeight="600"
                  >
                    ชำระเงินปลายทาง
                  </Box>
                  <Box
                    key={option.id}
                    display="flex"
                    bgcolor="white"
                    justifyContent="space-between"
                    mx="16px"
                    mb="8px"
                    py="8px"
                    borderRadius="8px"
                    borderBottom="1px solid"
                    borderColor="grey.100"
                    onClick={
                      () => {
                        props.setValue('invoiceAttributes', {
                          paymentMethodType: 'cash',
                          merchantCashPaymentMethodId: option.id
                        }
                        );
                        props.onClose();
                      }}
                  >
                    <Box display="flex">
                      <Box width="8px" />
                      <Image src={cashIcon} alt="cash icon" width="39px" height="39px" unoptimized={true}/>
                      <Box width="12px" />
                      <Typography fontSize="14px" fontWeight="400" pt="8px">
                        เงินสด
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )
            }
          })}
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
