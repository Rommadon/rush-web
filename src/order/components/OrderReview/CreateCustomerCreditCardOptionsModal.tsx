import { Modal, Box } from "@mui/material";
import { FC, useState } from "react";

import { CustomerCreditCardModel, useResource, useToast } from "src";
import { CreditCardForm } from "../form/CreditCardForm/CreditCardForm";
import { MobileAppBar } from "src/core/components/MobileAppBar";

export type CreateCustomerCreditCardOptionsModalProps = {
  open: boolean;
  onClose: () => any;
  onFetchCustomerCreditCard: () => any;
};

export const CreateCustomerCreditCardOptionsModal: FC<CreateCustomerCreditCardOptionsModalProps> = (props) => {
  const resource = useResource();
  const toast = useToast();

  const [onLoading, setOnLoading] = useState(false);

  const onSubmit = async (customerCreditCard: CustomerCreditCardModel) => {
    setOnLoading(true);

    try {
      await resource.createResource("customer-public/customerCreditCard", {
        ...customerCreditCard,
      });

      await props.onFetchCustomerCreditCard();
      toast.openToast('การเพิ่มบัตรเครดิตสำเร็จ', 'success');
      props.onClose();
      setOnLoading(false);
    } catch (error) {
      toast.openToast("การเพิ่มบัตรเครดิตไม่สำเร็จ", "error");
      setOnLoading(false);
    }
  };

  return (
    <Modal open={props.open} onClose={() => props.onClose()} sx={{ overflowY: "scroll"}}>
      <Box bgcolor="white" height="100%" width="100%">
        <MobileAppBar title="เพิ่มบัตรเครดิตใหม่" onBackClick={props.onClose} />
        <Box px="16px" py="32px" bgcolor="white">
          <CreditCardForm
            onSubmit={(data: CustomerCreditCardModel) => onSubmit(data)}
            onLoading={onLoading}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateCustomerCreditCardOptionsModal;
