import {
  Box,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useContext } from "react";
import NextLink from 'next/link'

import { OrderLayout, OrderLayoutProps } from "src/order/components";
import { AuthContext, CustomerCreditCardModel, routes } from "src";
import { PaymentItem } from "./PaymentItem";
import router from "next/router";

export type PaymentListProps = OrderLayoutProps & {
  creditCards: CustomerCreditCardModel[];
};

export const PaymentList: FC<PaymentListProps> = (props) => {
  const { profile } = useContext(AuthContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <OrderLayout {...props} title={`บัญชีของ ${profile?.fullName || profile?.tel || profile?.email}`} subtitle="การชำระเงิน">
      <Box mt="32px" width="100%">
        <Box
          px="16px"
          pt="24px"
          pb="24px"
          borderBottom="1px solid"
          borderColor="grey.100"
        >
          <Typography variant="h4" component="h4">
            บัตรเครดิต
          </Typography>
        </Box>
        {props.creditCards?.map((creditCard: CustomerCreditCardModel, index: any) => (
          <PaymentItem
            key={creditCard.id}
            {...creditCard}
            onClick={() => { }}
            isDefault={creditCard.isDefault}
          />
        ))}
        <Box px="16px" mt="32px">
          <NextLink href={routes.newCreditCardPayment()}>
            <Button
              variant="outlined"
              disableElevation
              fullWidth
              sx={{ py: "16px", borderRadius: "8px" }}
            >
              เพิ่มบัตรเครดิตใหม่
            </Button>
          </NextLink>
        </Box>
      </Box>
    </OrderLayout>
  );
};
