import { Typography, Box, IconButton, useMediaQuery } from "@mui/material";
import React, { FC } from "react";
import NextLink from "next/link";

import { AddressForm } from "src/order/components";
import {
  DefaultLayoutProp,
  DefaultLayout,
  routes,
  ChevronLeftIcon,
  CustomerAddressModel,
  useResource,
  MobileAppBar,
} from "src/core";
import router from "next/router";
import { useToast } from "src/core/hooks/useToast";

export type EditAddressProps = DefaultLayoutProp & {
  customerAddress: CustomerAddressModel;
};

export const EditAddress: FC<EditAddressProps> = (props) => {
  const resource = useResource();
  const toast = useToast();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const onSubmit = async (address: CustomerAddressModel) => {
    try {
      await resource.updateResource(
        "customer-public/customerAddress",
        props.customerAddress.id,
        {
          ...address,
        }
      );

      router.push(routes.addresses()).then(() => {
        toast.openToast("การแก้ไขที่อยู่สำเร็จ", "success");
      });
    } catch (error) {
      toast.openToast("การแก้ไขที่อยู่ไม่สำเร็จ", "error");
    }
  };

  const onDelete = async (id: number) => {
    try {
      await resource.deleteResource("customer-public/customerAddress", id);

      router.push(routes.addresses()).then(() => {
        toast.openToast("การลบที่อยู่สำเร็จ", "success");
      });
    } catch (error) {
      toast.openToast("การลบไม่สำเร็จ", "error");
    }
  };

  return (
    <DefaultLayout
      {...props}
      appBar={isDesktop ? null : <MobileAppBar title="แก้ไขที่อยู่" />}
      disableFooterMobile
    >
      <Box mt="58px" width="100%">
        {isDesktop && (
          <Box display="flex" mb="40px">
            <NextLink href={routes.addresses()}>
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
            </NextLink>
            <Typography variant="h1" component="h1" pl="8px">
              แก้ไขที่อยู่
            </Typography>
          </Box>
        )}
        <Box
          width={isDesktop ? "768px" : "100%"}
          mx="auto"
          pt={isDesktop ? 0 : "32px"}
          px={isDesktop ? 0 : "16px"}
        >
          <AddressForm
            onSubmit={(data: CustomerAddressModel) => onSubmit(data)}
            enableDelete
            onDelete={(id: number) => onDelete(id)}
            customerAddress={props.customerAddress}
          />
        </Box>
      </Box>
    </DefaultLayout>
  );
};
