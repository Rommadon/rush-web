import { Typography, Box, useMediaQuery, IconButton } from "@mui/material";
import React, { FC } from "react";
import router from "next/router";
import NextLink from "next/link";

import {
  routes,
  useResource,
  CustomerCreditCardModel,
} from "src/core";
import { useToast } from "src/core/hooks/useToast";
import { CreditCardForm } from "src/order/components/form/CreditCardForm/CreditCardForm";
import { DefaultLayout, DefaultLayoutProp } from "src/core/components/DefaultLayout";
import { MobileAppBar } from "src/core/components/MobileAppBar";
import ChevronLeftIcon from "src/core/components/ChevronLeftIcon";

export type NewPaymentProps = DefaultLayoutProp & {};

export const NewPayment: FC<NewPaymentProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const resource = useResource();
  const toast = useToast();

  const onSubmit = async (creditCard: CustomerCreditCardModel) => {
    try {
      await resource.createResource("customer-public/customerCreditCard", {
        ...creditCard,
      });

      router.push(`/me/payment`).then(() => {
        toast.openToast("การเพิ่มบัตรใหม่สำเร็จ", "success");
      });
    } catch (error) {
      toast.openToast("การเพิ่มบัตรใหม่ไม่สำเร็จ", "error");
    }
  };

  const onBack = () => {
    router.push(routes.payment())
  }

  return (
    <DefaultLayout
      {...props}
      appBar={!isDesktop && <MobileAppBar title="เพิ่มบัตรเครดิตใหม่" onBackClick={() => onBack()} />}
    >
      <Box mt="58px" width="100%">
        {isDesktop && (
          <Box display="flex" mb="40px">
            <NextLink href={routes.payment()}>
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
            </NextLink>
            <Typography variant="h1" component="h1" pl="8px">
              เพิ่มบัตรเครดิตใหม่
            </Typography>
            
          </Box>
        )}
        <Box width={isDesktop ? "768px" : "100%"} mx={"auto"} p={isDesktop ? '0' : '16px' }>
          <CreditCardForm
            onSubmit={(data: CustomerCreditCardModel) => onSubmit(data)}
          />
        </Box>
      </Box>
    </DefaultLayout>
  );
};
