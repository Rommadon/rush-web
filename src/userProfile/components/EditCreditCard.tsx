import { Typography, Box, IconButton, useMediaQuery } from "@mui/material";
import React, { FC } from "react";
import NextLink from "next/link";

import {
  routes,
  CustomerCreditCardModel,
  useResource,
} from "src/core";
import router from "next/router";
import { useToast } from "src/core/hooks/useToast";
import { CreditCardForm } from "src/order/components/form/CreditCardForm/CreditCardForm";
import { DefaultLayout, DefaultLayoutProp } from "src/core/components/DefaultLayout";
import ChevronLeftIcon from "src/core/components/ChevronLeftIcon";
import { MobileAppBar } from "src/core/components/MobileAppBar";

export type EditCreditCardProps = DefaultLayoutProp & {
  creditCard: CustomerCreditCardModel;
};

export const EditCreditCard: FC<EditCreditCardProps> = (props) => {
  const resource = useResource();
  const toast = useToast();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const onSubmit = async (creditCard: CustomerCreditCardModel) => {
    try {
      await resource.updateResource(
        "customer-public/customerCreditCard",
        props.creditCard.id,
        {
          ...creditCard,
        }
      );

      router.push(routes.payment()).then(() => {
        toast.openToast("การแก้ไขบัตรสำเร็จ", "success");
      });
    } catch (error) {
      toast.openToast("การแก้ไขบัตรไม่สำเร็จ", "error");
    }
  };

  const onDelete = async (id: number) => {
    try {
      await resource.deleteResource("customer-public/customerCreditCard", id);

      router.push(routes.payment()).then(() => {
        toast.openToast("การลบบัตรสำเร็จ", "success");
      });
    } catch (error) {
      toast.openToast("การลบบัตรสำเร็จ", "error");
    }
  };

  return (
    <DefaultLayout
      {...props}
      appBar={isDesktop ? null : <MobileAppBar title="แก้ไขบัตรเครดิต" />}
      disableFooterMobile
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
              แก้ไขบัตร
            </Typography>
          </Box>
        )}
        <Box
          width={isDesktop ? "768px" : "100%"}
          mx="auto"
          pt={isDesktop ? 0 : "32px"}
          px={isDesktop ? 0 : "16px"}
        >
          <CreditCardForm
            onSubmit={(data: CustomerCreditCardModel) => onSubmit(data)}
            enableDelete
            onEdit
            onDelete={(id: number) => onDelete(id)}
            creditCard={props.creditCard}
          />
        </Box>
      </Box>
    </DefaultLayout>
  );
};
