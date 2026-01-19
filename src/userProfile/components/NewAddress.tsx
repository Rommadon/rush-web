import { Typography, Box, IconButton, useMediaQuery } from "@mui/material";
import React, { FC } from "react";
import router from "next/router";
import NextLink from "next/link";

import { AddressForm } from "src/order/components";
import {
  DefaultLayoutProp,
  DefaultLayout,
  routes,
  ChevronLeftIcon,
  useResource,
  CustomerAddressModel,
  MobileAppBar,
} from "src/core";
import { useToast } from "src/core/hooks/useToast";

export type NewAddressProps = DefaultLayoutProp & {};

export const NewAddress: FC<NewAddressProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const resource = useResource();
  const toast = useToast();

  const onSubmit = async (address: CustomerAddressModel) => {
    try {
      await resource.createResource("customer-public/customerAddress", {
        ...address,
      });

      router.push(`/me/addresses`).then(() => {
        toast.openToast("การสร้างที่อยู่สำเร็จ", "success");
      });
    } catch (error) {
      toast.openToast("การสร้างที่อยู่ไม่สำเร็จ", "error");
    }
  };

  const onBack = () => {
    router.push(routes.addresses())
  }

  return (
    <DefaultLayout
      {...props}
      appBar={!isDesktop && <MobileAppBar title="เพิ่มที่อยู่" onBackClick={() => onBack()} />}
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
              เพิ่มที่อยู่ใหม่
            </Typography>
          </Box>
        )}
        <Box width={isDesktop ? "768px" : "100%"} mx={"auto"} p={isDesktop ? '0' : '16px' }>
          <AddressForm
            onSubmit={(data: CustomerAddressModel) => onSubmit(data)}
          />
        </Box>
      </Box>
    </DefaultLayout>
  );
};
