import { FC, useState } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";

import { CreditCardForm } from './CreditCardForm'
import { CloseIcon } from "src/core/components/CloseIcon";

export type CreditCardModalProps = {
  open: boolean;
  onClose: () => any;
  onSubmit: (address: any) => any;
};

export const CreditCardModal: FC<CreditCardModalProps> = (props) => {
  const [onLoading, setOnLoading] = useState(false);

  const handleSubmit = async (creditCard: any) => {
    setOnLoading(true);
    await props.onSubmit(creditCard);
    props.onClose();
    setOnLoading(false);
  };

  return (
    <Modal open={props.open} onClose={props.onClose} sx={{ padding: "30px" }}>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          display: "flex",
          height: "100%",
          maxWidth: "725px",
          margin: "0 auto",
          bgcolor: "common.white",
          boxShadow: 24,
          borderRadius: "8px",
          overflowY: "scroll",
          padding: "30px"
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography
          id="modal-modal-title"
          variant="h2"
          textAlign="center"
          pt="10px"
          pb="10px"
        >
          เพิ่มบัตรเครดิตใหม่
        </Typography>
        <Box borderBottom="1px solid" borderColor="grey.100" mt="32px" mb="48px" />
        <CreditCardForm onSubmit={handleSubmit} onLoading={onLoading} />
      </Box>
    </Modal>
  );
};
