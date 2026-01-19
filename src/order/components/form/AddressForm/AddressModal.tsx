import { FC } from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import { CloseIcon } from "src/core";

import { useTranslations } from "next-intl";
import { AddressForm } from './AddressForm'

export type AddressModalProps = {
  open: boolean;
  onClose: () => any;
  addresses: any[];
  onSubmit: (address: any) => any;
};

export const AddressModal: FC<AddressModalProps> = (props) => {
  const t = useTranslations("order.addressModal");
  const handleSubmit = (address: any) => {
    props.onSubmit(address);
    props.onClose();
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
          {t("title")}
        </Typography>
        <Box borderBottom="1px solid" borderColor="grey.100" mt="32px" mb="48px" />
        <AddressForm onSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
};
