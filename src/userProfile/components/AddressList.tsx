import {
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import { FC, useContext } from "react";
import NextLink from 'next/link'

import { OrderLayout, OrderLayoutProps } from "src/order/components";
import { AuthContext, CustomerAddressModel, EmptyList, routes, SettingIcon } from "src";
import { AddressItem } from "./AddressItem";

export type AddressListProps = OrderLayoutProps & {
  addresses: CustomerAddressModel[];
};

export const AddressList: FC<AddressListProps> = (props) => {
  const { profile } = useContext(AuthContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <OrderLayout {...props} title={`บัญชีของ ${profile?.fullName || profile?.tel || profile?.email}`} subtitle="ที่อยู่">
      <Box mt="32px" width="100%" p={isDesktop ? '' : "16px"}>
        {props.addresses && props.addresses.length > 0 ? (
          props.addresses?.map((address: CustomerAddressModel, index: any) => (
            <AddressItem
              key={address.fullName}
              {...address}
              onClick={() => { }}
              default={index === 0}
            />
          ))
        ) : (
          <EmptyList text="ไม่พบรายการที่อยู่" icon={<SettingIcon fontSize="40px" color="#6B7280" />} />
        )}
        <NextLink href={routes.newAddresses()}>
          <Button
            variant="outlined"
            disableElevation
            fullWidth
            sx={{ py: "16px", borderRadius: "8px"}}
          >
            เพิ่มที่อยู่ใหม่
          </Button>
        </NextLink>
      </Box>
    </OrderLayout>
  );
};
