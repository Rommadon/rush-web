import { Modal, Box, Typography, Button } from "@mui/material";
import { FC, useState } from "react";
import { MobileAppBar } from "src";
import { BankModel } from "src/order/models/BankModel";
import { useIntl } from "use-intl";
import CreateCustomerAddressOptionsModal from "./CreateCustomerAddressOptionsModal";

export type CustomerAddressOptionsModalProps = {
  open: boolean;
  onClose: () => any;
  onFetchAddress: () => any;
  addresses: any[];
  setValue: any;
};

export const CustomerAddressOptionsModal: FC<CustomerAddressOptionsModalProps> = (props) => {
  const [isCustomerAddressOptionsOpen, setCustomerAddressOptionsOpen] = useState(false);

  return (
    <>
      <CreateCustomerAddressOptionsModal
        open={isCustomerAddressOptionsOpen}
        onClose={() => setCustomerAddressOptionsOpen(false)}
        onFetchAddress={async () => await props.onFetchAddress()}
      />
      <Modal open={props.open} onClose={() => props.onClose()} sx={{ overflowY: "scroll", backgroundColor: "white"}}>
        <Box bgcolor="white" height="100%" width="100%">
          <MobileAppBar title="ที่อยู่" onBackClick={props.onClose} />
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
                props.setValue('customerAddressId', address.id);
                props.onClose();
              }}
            >
              <Box>
                <Typography>
                  {address.name}
                </Typography>
                <Typography fontWeight="light">
                  {address.fullName} ({address.tel})
                </Typography>
                <Typography fontWeight="light">
                  {[
                    address.address,
                    address.subdistrictAddress,
                    address.districtAddress,
                    address.provinceAddress,
                    address.postCodeAddress,
                  ]
                    .filter((string) => string?.length)
                    .join(", ")}
                </Typography>
              </Box>
            </Box>
          ))}
          <Box px="16px" py="32px" bgcolor="white">
            <Button
              variant="outlined"
              disableElevation
              fullWidth
              sx={{ py: "16px", borderRadius: "8px" }}
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
