import { Modal, Box, Typography } from "@mui/material";
import { FC } from "react";
import { CartItemModel, MerchantShipmentModel, MobileAppBar } from "src";
import { useIntl } from "use-intl";
import { getShipmentPrice } from "utils/calaulate";

export type ShippingOptionModalProps = {
  open: boolean;
  onClose: () => any;
  options: MerchantShipmentModel[];
  cartItems: CartItemModel[]
  setValue: any;
};

export const ShippingOptionModal: FC<ShippingOptionModalProps> = (props) => {
  const intl = useIntl()
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box bgcolor="white" height="100%" width="100%" overflow="scroll">
        <MobileAppBar title="ช่องทางการจัดส่ง" onBackClick={props.onClose} />
        {props.options.map((i) => (
          <Box
            key={i.id}
            display="flex"
            justifyContent="space-between"
            p="32px 16px"
            borderBottom="1px solid"
            borderColor="grey.100"
            onClick={() => {
              props.setValue('merchantShipmentId', i.id);
              props.onClose();
            }}
          >
            <Box>
              <Typography fontSize="14px" fontWeight="600">{i.name}</Typography>
              <Typography fontSize="14px" mt="8px" color="grey.400" sx={{
                whiteSpace: 'pre-wrap'
              }}>
                {i.description}
              </Typography>
            </Box>
            <Typography fontSize="14px" minWidth="60px" textAlign="right" fontWeight="600" color="red.50">
              <Typography fontSize="14px" component="span" fontFamily="Roboto">
                ฿
              </Typography>
              {getShipmentPrice(i, props.cartItems) === 0 ? '0.00' : intl.formatNumber(getShipmentPrice(i, props.cartItems))}
            </Typography>
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export default ShippingOptionModal;
