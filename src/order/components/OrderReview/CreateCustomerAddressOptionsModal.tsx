import { Modal, Box, Typography, useMediaQuery } from "@mui/material";
import router from "next/router";
import { FC } from "react";
import { useIntl } from "use-intl";

import { AddressForm, CustomerAddressModel, MobileAppBar, useResource, useToast } from "src";
import { BankModel } from "src/order/models/BankModel";

export type CreateCustomerAddressOptionsModalProps = {
  open: boolean;
  onClose: () => any;
  onFetchAddress: () => any;
};

export const CreateCustomerAddressOptionsModal: FC<CreateCustomerAddressOptionsModalProps> = (props) => {
  const resource = useResource();
  const toast = useToast();

  const onSubmit = async (address: CustomerAddressModel) => {
    try {
      await resource.createResource("customer-public/customerAddress", {
        ...address,
      });

      await props.onFetchAddress();
      props.onClose();
    } catch (error) {
      toast.openToast("การสร้างที่อยู่ไม่สำเร็จ", "error");
    }
  };

  return (
    <Modal open={props.open} onClose={() => props.onClose()} sx={{ overflowY: "scroll"}}>
      <Box bgcolor="white" height="100%" width="100%">
        <MobileAppBar title="เพิ่มที่อยู่" onBackClick={props.onClose} />
        <Box px="16px" py="32px" bgcolor="white">
          <AddressForm
            onSubmit={(data: CustomerAddressModel) => onSubmit(data)}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateCustomerAddressOptionsModal;
