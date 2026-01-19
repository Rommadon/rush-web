import { FC } from "react";
import {
  Radio,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  Typography,
  Box,
  Button
} from "@mui/material";
import { BankModel } from "src/order/models/BankModel";
import { InvoiceModel } from "src/order/models/InvoiceModel";
import ChevronDownIcon from "src/core/components/ChevronDownIcon";
import { CustomerCreditCardModel } from "src/core";
import { MerchantShopditPaymentMethodModel } from "src/order/models";

export type PaymentOptionFormProps = {
  options: {
    id: number;
    name: string;
    type: string;
    checked?: boolean;
    bank?: BankModel;
    number: string;
  }[];
  setValue: any;
  currentInvoiceAttributes: InvoiceModel;
  customerCreditCards?: CustomerCreditCardModel[];
  isActiveCreditCardPaymentMethod: boolean;
  merchantShopditPaymentMethods: MerchantShopditPaymentMethodModel[];
  totalPrice: number;
  onOpenCreateCreditCard: () => any;
};

export const PaymentOptionForm: FC<PaymentOptionFormProps> = (props) => {
  const ccFormat = (value: string) => {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length > 6)
      v = [v.slice(0, 3), '-', v.slice(3, 9), '-', v.slice(9, 10)].join('');
    return v;
  }

  return (
    <List sx={{ width: "100%" }}>
      {props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
        props.merchantShopditPaymentMethods[0].creditCardIsActive ? (
          <>
            <ListItem
              dense
              disablePadding
            >
              <Typography variant="h3" fontWeight="300" p="16px">
                บัตรเครดิต
              </Typography>
            </ListItem>
            <ListItem
              key={'creditCard'}
              dense
              disablePadding
              sx={{
                border: "1px solid",
                // borderBottom: index === props.options?.length - 1 ? 1 : 0,
                borderColor: "grey.100",
              }}
            >
              <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                <ListItemIcon>
                  <Radio
                    checked={
                      (
                        props?.currentInvoiceAttributes?.paymentMethodType === 'shopditpayCreditCard'
                      )
                    }
                    disableRipple
                    onClick={
                      () => {
                        props.setValue('invoiceAttributes', {
                          paymentMethodType: 'shopditpayCreditCard',
                          merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                        });
                      }
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary='บัตรเครดิต'
                  primaryTypographyProps={{ variant: "h4" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              dense
              disablePadding
            >
              <Typography variant="h3" fontWeight="300" p="16px">
                บัตรเครดิต
              </Typography>
            </ListItem>
            <ListItem
              key={'creditCard'}
              dense
              disablePadding
              sx={{
                border: "1px solid",
                // borderBottom: index === props.options?.length - 1 ? 1 : 0,
                borderColor: "grey.100",
                bgcolor: "grey.50"
              }}
            >
              <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                <ListItemIcon>
                  <Radio
                    checked={
                      (
                        props?.currentInvoiceAttributes?.paymentMethodType === 'shopditpayCreditCard'
                      )
                    }
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary='บัตรเครดิต'
                  primaryTypographyProps={{ variant: "h4" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )
      )}
      {props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
        props.merchantShopditPaymentMethods[0].linepayIsActive ? (
          <>
            <ListItem
              dense
              disablePadding
            >
              <Typography variant="h3" fontWeight="300" p="16px">
                E-wallet
              </Typography>
            </ListItem>
            <ListItem
              key={'shopditpayLinepay'}
              dense
              disablePadding
              sx={{
                border: "1px solid",
                // borderBottom: index === props.options?.length - 1 ? 1 : 0,
                borderColor: "grey.100",
              }}
            >
              <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                <ListItemIcon>
                  <Radio
                    checked={
                      (
                        props?.currentInvoiceAttributes?.paymentMethodType === 'shopditpayLinepay'
                      )
                    }
                    disableRipple
                    onClick={
                      () => {
                        props.setValue('invoiceAttributes', {
                          paymentMethodType: 'shopditpayLinepay',
                          merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                        });
                      }
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary='Line Pay'
                  primaryTypographyProps={{ variant: "h4" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              dense
              disablePadding
            >
              <Typography variant="h3" fontWeight="300" p="16px">
                E-wallet
              </Typography>
            </ListItem>
            <ListItem
              key={'shopditpayLinepay'}
              dense
              disablePadding
              sx={{
                border: "1px solid",
                // borderBottom: index === props.options?.length - 1 ? 1 : 0,
                borderColor: "grey.100",
                bgcolor: "grey.50"
              }}
            >
              <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                <ListItemIcon>
                  <Radio
                    checked={
                      (
                        props?.currentInvoiceAttributes?.paymentMethodType === 'shopditpayLinepay'
                      )
                    }
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary='Line Pay'
                  primaryTypographyProps={{ variant: "h4" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )
      )}
      {props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
        props.merchantShopditPaymentMethods[0].airpayIsActive ? (
          <>
            <ListItem
              key={'shopditpayAirpay'}
              dense
              disablePadding
              sx={{
                border: "1px solid",
                // borderBottom: index === props.options?.length - 1 ? 1 : 0,
                borderColor: "grey.100",
              }}
            >
              <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                <ListItemIcon>
                  <Radio
                    checked={
                      (
                        props?.currentInvoiceAttributes?.paymentMethodType === 'shopditpayAirpay'
                      )
                    }
                    disableRipple
                    onClick={
                      () => {
                        props.setValue('invoiceAttributes', {
                          paymentMethodType: 'shopditpayAirpay',
                          merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                        });
                      }
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary='Shopee Pay'
                  primaryTypographyProps={{ variant: "h4" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              key={'shopditpayAirpay'}
              dense
              disablePadding
              sx={{
                border: "1px solid",
                // borderBottom: index === props.options?.length - 1 ? 1 : 0,
                borderColor: "grey.100",
                bgcolor: "grey.50"
              }}
            >
              <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                <ListItemIcon>
                  <Radio
                    checked={
                      (
                        props?.currentInvoiceAttributes?.paymentMethodType === 'shopditpayAirpay'
                      )
                    }
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary='Shopee Pay'
                  primaryTypographyProps={{ variant: "h4" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )
      )}
      {props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
        props.merchantShopditPaymentMethods[0].truemoneyIsActive ? (
          <>
            <ListItem
              key={'shopditpayTruemoney'}
              dense
              disablePadding
              sx={{
                border: "1px solid",
                // borderBottom: index === props.options?.length - 1 ? 1 : 0,
                borderColor: "grey.100",
              }}
            >
              <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                <ListItemIcon>
                  <Radio
                    checked={
                      (
                        props?.currentInvoiceAttributes?.paymentMethodType === 'shopditpayTruemoney'
                      )
                    }
                    disableRipple
                    onClick={
                      () => {
                        props.setValue('invoiceAttributes', {
                          paymentMethodType: 'shopditpayTruemoney',
                          merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                        });
                      }
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary='Truemoney'
                  primaryTypographyProps={{ variant: "h4" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              key={'shopditpayTruemoney'}
              dense
              disablePadding
              sx={{
                border: "1px solid",
                // borderBottom: index === props.options?.length - 1 ? 1 : 0,
                borderColor: "grey.100",
                bgcolor: "grey.50"
              }}
            >
              <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                <ListItemIcon>
                  <Radio
                    checked={
                      (
                        props?.currentInvoiceAttributes?.paymentMethodType === 'shopditpayTruemoney'
                      )
                    }
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary='Truemoney'
                  primaryTypographyProps={{ variant: "h4" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )
      )}
      {props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
        props.merchantShopditPaymentMethods[0].scbEasyIsActive && props.totalPrice > 500 ? (
          <>
            <ListItem
              dense
              disablePadding
            >
              <Typography variant="h3" fontWeight="300" p="16px">
                Mobile Banking
              </Typography>
            </ListItem>
            <ListItem
              key={'shopditpayScbEasy'}
              dense
              disablePadding
              sx={{
                border: "1px solid",
                // borderBottom: index === props.options?.length - 1 ? 1 : 0,
                borderColor: "grey.100",
              }}
            >
              <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                <ListItemIcon>
                  <Radio
                    checked={
                      (
                        props?.currentInvoiceAttributes?.paymentMethodType === 'shopditpayScbEasy'
                      )
                    }
                    disableRipple
                    onClick={
                      () => {
                        props.setValue('invoiceAttributes', {
                          paymentMethodType: 'shopditpayScbEasy',
                          merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                        });
                      }
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`SCB EASY`}
                  primaryTypographyProps={{ variant: "h4" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              dense
              disablePadding
            >
              <Typography variant="h3" fontWeight="300" p="16px">
                Mobile Banking
              </Typography>
            </ListItem>
            <ListItem
              key={'shopditpayScbEasy'}
              dense
              disablePadding
              sx={{
                border: "1px solid",
                // borderBottom: index === props.options?.length - 1 ? 1 : 0,
                borderColor: "grey.100",
                bgcolor: "grey.50"
              }}
            >
              <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                <ListItemIcon>
                  <Radio
                    checked={
                      (
                        props?.currentInvoiceAttributes?.paymentMethodType === 'shopditpayScbEasy'
                      )
                    }
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`SCB EASY ${props.totalPrice > 500 ? '(ยังไม่เปิดให้บริการ)' : '(ขั้นต่ำยอดรวม 500 บาท)'}`}
                  primaryTypographyProps={{ variant: "h4" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )
      )}
      {props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
        props.merchantShopditPaymentMethods[0].bblIsActive && props.totalPrice > 500 ? (
          <>
            <ListItem
              key={'shopditpayBbl'}
              dense
              disablePadding
              sx={{
                border: "1px solid",
                // borderBottom: index === props.options?.length - 1 ? 1 : 0,
                borderColor: "grey.100",
              }}
            >
              <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                <ListItemIcon>
                  <Radio
                    checked={
                      (
                        props?.currentInvoiceAttributes?.paymentMethodType === 'shopditpayBbl'
                      )
                    }
                    disableRipple
                    onClick={
                      () => {
                        props.setValue('invoiceAttributes', {
                          paymentMethodType: 'shopditpayBbl',
                          merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                        });
                      }
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`Bualuang mBanking`}
                  primaryTypographyProps={{ variant: "h4" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              key={'shopditpayBbl'}
              dense
              disablePadding
              sx={{
                border: "1px solid",
                // borderBottom: index === props.options?.length - 1 ? 1 : 0,
                borderColor: "grey.100",
                bgcolor: "grey.50"
              }}
            >
              <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                <ListItemIcon>
                  <Radio
                    checked={
                      (
                        props?.currentInvoiceAttributes?.paymentMethodType === 'shopditpayBbl'
                      )
                    }
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`Bualuang mBanking ${props.totalPrice > 500 ? '(ยังไม่เปิดให้บริการ)' : '(ขั้นต่ำยอดรวม 500 บาท)'}`}
                  primaryTypographyProps={{ variant: "h4" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )
      )}
      {props.merchantShopditPaymentMethods && props.merchantShopditPaymentMethods[0] && (
        props.merchantShopditPaymentMethods[0].baybankIsActive && props.totalPrice > 500 ? (
          <>
            <ListItem
              key={'shopditpayBaybank'}
              dense
              disablePadding
              sx={{
                border: "1px solid",
                // borderBottom: index === props.options?.length - 1 ? 1 : 0,
                borderColor: "grey.100",
              }}
            >
              <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                <ListItemIcon>
                  <Radio
                    checked={
                      (
                        props?.currentInvoiceAttributes?.paymentMethodType === 'shopditpayBaybank'
                      )
                    }
                    disableRipple
                    onClick={
                      () => {
                        props.setValue('invoiceAttributes', {
                          paymentMethodType: 'shopditpayBaybank',
                          merchantShopditPaymentMethodId: props.merchantShopditPaymentMethods[0].id
                        });
                      }
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`KMA (กรุงศรีโมบายแอป)`}
                  primaryTypographyProps={{ variant: "h4" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              key={'shopditpayBaybank'}
              dense
              disablePadding
              sx={{
                border: "1px solid",
                // borderBottom: index === props.options?.length - 1 ? 1 : 0,
                borderColor: "grey.100",
                bgcolor: "grey.50"
              }}
            >
              <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                <ListItemIcon>
                  <Radio
                    checked={
                      (
                        props?.currentInvoiceAttributes?.paymentMethodType === 'shopditpayBaybank'
                      )
                    }
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`KMA (กรุงศรีโมบายแอป) ${props.totalPrice > 500 ? '(ยังไม่เปิดให้บริการ)' : '(ขั้นต่ำยอดรวม 500 บาท)'}`}
                  primaryTypographyProps={{ variant: "h4" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )
      )}
      {
        props.options && props.options.length > 0 && (
          <ListItem
            dense
            disablePadding
          >
            <Typography variant="h3" fontWeight="300" p="16px">
              โอนเงินผ่านสลิป
            </Typography>
          </ListItem>
        )
      }
      {props.options?.map((option, index) => (
        <ListItem
          key={option.id}
          dense
          disablePadding
          sx={{
            border: "1px solid",
            borderBottom: index === props.options?.length - 1 ? 1 : 0,
            borderColor: "grey.100",
          }}
        >
          <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
            <ListItemIcon>
              <Radio
                checked={
                  (
                    option.type === 'bankAccount' &&
                    props?.currentInvoiceAttributes?.merchantBankAccountPaymentMethodId === option.id
                  ) || (
                    option.type === 'promptpay' &&
                    props?.currentInvoiceAttributes?.merchantPromptpayPaymentMethodId === option.id
                  ) || (
                    option.type === 'cash' &&
                    props?.currentInvoiceAttributes?.merchantCashPaymentMethodId === option.id
                  )
                }
                disableRipple
                onClick={
                  () => props.setValue('invoiceAttributes', option.type === 'bankAccount' ? {
                    paymentMethodType: 'bankAccount',
                    merchantBankAccountPaymentMethodId: option.id
                  } : option.type === 'promptpay' ? {
                    paymentMethodType: 'promptpay',
                    merchantPromptpayPaymentMethodId: option.id
                  } : {
                    paymentMethodType: 'cash',
                    merchantCashPaymentMethodId: option.id
                  }
                  )
                }
              />
            </ListItemIcon>
            <ListItemText
              primary={option?.type === 'bankAccount' ? `${option?.bank?.name} (${ccFormat(option?.number)})` : (option?.type === 'promptpay' ? 'พร้อมเพย์' : 'เงินสด')}
              primaryTypographyProps={{ variant: "h4" }}
            />
          </ListItemButton>
        </ListItem>
      ))}
      {/* {
        props?.isActiveCreditCardPaymentMethod && (
          <ListItem
            dense
            disablePadding
          >
            <List sx={{ width: "100%" }}>
              <ListItem
                dense
                disablePadding
              >
                <Typography variant="h3" fontWeight="300" p="16px">
                  บัตรเครดิต
                </Typography>
              </ListItem>
              {props.customerCreditCards?.map((creditCard, index) => (
                <ListItem
                  key={creditCard.id}
                  dense
                  disablePadding
                  sx={{
                    border: "1px solid",
                    borderColor: "grey.100",
                  }}
                >
                  <ListItemButton disableGutters disableRipple sx={{ padding: "16px" }}>
                    <ListItemIcon>
                      <Radio
                        checked={(props?.currentInvoiceAttributes?.customerCreditCardId === creditCard.id)}
                        disableRipple
                        onClick={
                          () => props.setValue('invoiceAttributes', {
                            paymentMethodType: 'omise',
                            customerCreditCardId: creditCard.id
                          })
                        }
                      />
                    </ListItemIcon>
                    <ListItemText>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h3" fontWeight="300">
                          {creditCard.cardName}
                        </Typography>
                        <Typography variant="h3" fontWeight="300">
                          *** {creditCard.lastNumber}
                        </Typography>
                      </Box>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem
                dense
                disablePadding
              >
                <Box py="16px" width="100%">
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => props.onOpenCreateCreditCard()}
                  >
                    เพิ่มบัตรใหม่
                  </Button>
                </Box>
              </ListItem>
            </List>
          </ListItem>
        )
      } */}
    </List>
  );
};

export default PaymentOptionForm;
