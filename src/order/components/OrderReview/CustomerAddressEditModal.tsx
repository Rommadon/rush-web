import { Modal, Box, Typography, useMediaQuery, Button } from "@mui/material";
import router from "next/router";
import { FC } from "react";
import { useIntl } from "use-intl";
import NextLink from 'next/link'

import { AddressForm, CustomerAddressModel, MobileAppBar, useResource, useToast, EmptyList, routes, SettingIcon} from "src";
import { BankModel } from "src/order/models/BankModel";
import { AddressItem } from "../../../userProfile/components/AddressItem";

export type CustomerAddressEditOptionsModalProps = {
  open: boolean;
  addresses: CustomerAddressModel[];
  onClose: () => any;
  onFetchAddress: () => any;
};

export const CustomerAddressEditOptionsModal: FC<CustomerAddressEditOptionsModalProps> = (props) => {
  const resource = useResource();
  const toast = useToast();

  return (
    <Modal open={props.open} onClose={() => props.onClose()} sx={{ overflowY: "scroll"}}>
      <Box bgcolor="white" height="100%" width="100%">
        <MobileAppBar title="ที่อยู่" onBackClick={props.onClose} />
        <Box px="16px" py="32px" bgcolor="white">
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
      </Box>
    </Modal>
  );
};

export default CustomerAddressEditOptionsModal;
