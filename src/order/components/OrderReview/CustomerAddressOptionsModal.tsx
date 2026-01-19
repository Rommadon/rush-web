import { Modal, Box, Typography, Button } from "@mui/material";
import { FC, useState } from "react";
import { MobileAppBar } from "src";
import { BankModel } from "src/order/models/BankModel";
import { useIntl } from "use-intl";
import NextLink from "next/link";
import { routes } from "src/core";
import CreateCustomerAddressOptionsModal from "./CreateCustomerAddressOptionsModal";
import CustomerAddressEditModal from "./CustomerAddressEditModal";

export type CustomerAddressOptionsModalProps = {
  open: boolean;
  onClose: () => any;
  onFetchAddress: () => any;
  addresses: any[];
  setValue: any;
};

export const CustomerAddressOptionsModal: FC<
  CustomerAddressOptionsModalProps
> = (props) => {
  const [isCustomerAddressOptionsOpen, setCustomerAddressOptionsOpen] =
    useState(false);
  const [isCustomerAddressEditOptionsOpen, setCustomerAddressEditOptionsOpen] =
    useState(false);

  const getTel = (tel: string) => {
    return "(+66) " + tel.substring(1, tel.length);
  };
  return (
    <>
      <CreateCustomerAddressOptionsModal
        open={isCustomerAddressOptionsOpen}
        onClose={() => setCustomerAddressOptionsOpen(false)}
        onFetchAddress={async () => await props.onFetchAddress()}
      />
      <CustomerAddressEditModal
        open={isCustomerAddressEditOptionsOpen}
        addresses={props.addresses}
        onClose={() => setCustomerAddressEditOptionsOpen(false)}
        onFetchAddress={async () => await props.onFetchAddress()}
      />
      <Modal
        open={props.open}
        onClose={() => props.onClose()}
        sx={{ overflowY: "scroll", backgroundColor: "white" }}
      >
        <Box bgcolor="white" height="100%" width="100%">
          <MobileAppBar
            title="เลือกที่อยู่"
            onBackClick={props.onClose}
            right={
              <Box
                flex="1"
                display="flex"
                justifyContent="flex-end"
                color="red.50"
                onClick={() => setCustomerAddressEditOptionsOpen(true)}
              >
                แก้ไข
              </Box>
            }
          />
          {props.addresses?.map((address) => (
            <Box
              key={address.id}
              display="flex"
              justifyContent="space-between"
              p="32px 16px"
              borderBottom="1px solid"
              borderColor="grey.100"
              bgcolor="white"
              onClick={() => {
                props.setValue("customerAddressId", address.id);
                props.onClose();
              }}
            >
              <Box>
                <Typography>{address.fullName}</Typography>
                <Typography fontWeight="light">
                  {getTel(address.tel)}
                </Typography>
                <Typography fontWeight="light">{address.address}</Typography>
                <Typography fontWeight="light">
                  {[
                    address.subdistrictAddress,
                    address.districtAddress,
                    address.provinceAddress,
                    address.postCodeAddress,
                  ]
                    .filter((string) => string?.length)
                    .join(", ")}
                </Typography>
                <Box display="block" my={"12px"}>
                  <Typography
                    component={"span"}
                    px={"8px"}
                    py={"6px"}
                    bgcolor="primary.main"
                    color="white"
                    borderRadius="4px"
                  >
                    {address.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
          <Box
            px="16px"
            py="32px"
            position="fixed"
            width="100%"
            bottom="0"
            bgcolor="white"
          >
            <Button
              variant="contained"
              disableElevation
              fullWidth
              sx={{ py: "16px", borderRadius: "8px", color: "white" }}
              onClick={() => setCustomerAddressOptionsOpen(true)}
            >
              เพิ่มที่อยู่ใหม่
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CustomerAddressOptionsModal;
