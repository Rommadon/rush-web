import { FC, useState } from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { CloseIcon } from "src/core";

import { CouponModel } from "../models";
import CouponItem from "./CouponItem";

export type CouponModalProps = {
  open: boolean;
  onClose: () => any;
  coupons: CouponModel[];
  onSubmit: (coupon: CouponModel | null) => any;
};

export const CouponModal: FC<CouponModalProps> = (props) => {
  const t = useTranslations("order.couponModal");
  const [selectedCoupon, setSelectedCoupon] = useState<CouponModel | null>(null)

  const handleSubmit = () => {
    props.onSubmit(selectedCoupon)
    props.onClose()
  }

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          borderRadius: "8px",
          minWidth: "720px",
          maxHeight: "90%",
          p: 4,
          overflowY: 'auto'
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
          pb="32px"
        >
          {t("title")}
        </Typography>
        <Box borderBottom="1px solid" borderColor="grey.100" />
        {(props.coupons ?? [])?.map((coupon) => (
          <Box key={coupon.id} my="8px">
            <CouponItem {...coupon} checked={selectedCoupon?.id === coupon.id} onClick={() => setSelectedCoupon(coupon)} enableDetail/>
          </Box>
        ))}
        <Box display="flex" justifyContent="center" my="32px">
          <Button variant="contained"
                  disableElevation
                  onClick={handleSubmit}
                  sx={{ width: '352px', py: '16px', borderRadius: '8px' }}>
            <Typography variant="h4">
              {t("submit")}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
