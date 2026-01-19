import { Modal, Box, Button } from "@mui/material";
import { FC, useState } from "react";
import { CustomerCreditCardModel, PaymentItem } from "src";
import { MobileAppBar } from "src/core/components/MobileAppBar";
import CreateCustomerCreditCardOptionsModal from "./CreateCustomerCreditCardOptionsModal";

export type CustomerCreditCardOptionsModalProps = {
  open: boolean;
  onClose: () => any;
  onFetchCustomerCreditCard: () => any;
  customerCreditCards: any[];
  onSetSelectedCreditCard: (data: CustomerCreditCardModel) => any;
};

export const CustomerCreditCardOptionsModal: FC<CustomerCreditCardOptionsModalProps> = (props) => {
  const [isCustomerCreditCardOptionsOpen, setCustomerCreditCardOptionsOpen] = useState(false);

  return (
    <>
      <CreateCustomerCreditCardOptionsModal
        open={isCustomerCreditCardOptionsOpen}
        onClose={() => setCustomerCreditCardOptionsOpen(false)}
        onFetchCustomerCreditCard={async () => await props.onFetchCustomerCreditCard()}
      />
      <Modal open={props.open} onClose={() => props.onClose()} sx={{ overflowY: "scroll", backgroundColor: "white" }}>
        <Box bgcolor="white" height="100%" width="100%">
          <MobileAppBar title="บัตรเครดิต" onBackClick={props.onClose} />
          {props.customerCreditCards?.map((creditCard: CustomerCreditCardModel, index: any) => (
            <Box
              key={creditCard.id}
              onClick={() => {
                props.onSetSelectedCreditCard(creditCard);
                props.onClose();
              }}
            >
              <PaymentItem
                key={creditCard.id}
                {...creditCard}
                onClick={() => {}}
                isDefault={creditCard.isDefault}
                onHideEdit
              />
            </Box>
          ))}
          <Box px="16px" py="32px" bgcolor="white">
            <Button
              variant="outlined"
              disableElevation
              fullWidth
              sx={{ py: "16px", borderRadius: "8px" }}
              onClick={() => setCustomerCreditCardOptionsOpen(true)}
            >
              เพิ่มบัตรเครดิตใหม่
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CustomerCreditCardOptionsModal;
