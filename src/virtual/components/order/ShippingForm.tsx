import { FC } from "react";
import {
  Radio,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useIntl } from "next-intl";
import { getShipmentPrice } from "utils/calaulate";
import { MerchantShipmentModel } from "src/order/models";
import { CartItemModel } from "src/core";

export type ShippingFormProps = {
  options: MerchantShipmentModel[];
  currentMerchantShipmentId?: number | string;
  setValue: any;
  cartItems: CartItemModel[]
};

export const ShippingForm: FC<ShippingFormProps> = (props) => {
  const intl = useIntl();
  return (
    <List sx={{ width: "100%" }}>
      {props.options?.map((option, index) => (
        <ListItem
          key={option.id}
          dense
          disablePadding
          sx={{
            border: "1px solid",
            borderBottom: (index === props.options?.length-1) ? 1 : 0,
            borderColor: "grey.100",
          }}
        >
          <ListItemButton disableGutters disableRipple sx={{ padding: '16px'}}>
            <ListItemIcon>
              <Radio
                checked={props.currentMerchantShipmentId === option.id}
                disableRipple
                onClick={() => props.setValue('merchantShipmentId', option.id)}
              />
            </ListItemIcon>
            <ListItemText
              primary={option.name}
              primaryTypographyProps={{ variant: 'h4', pb: '8px' }}
              secondary={option.description}
              secondaryTypographyProps={{ color: 'grey.400', variant: 'h5', lineHeight: '23px', whiteSpace: 'pre-wrap' }}
            />
            <Typography variant="h4" pr="16px" minWidth="60px" textAlign="right">
              {intl.formatNumber(getShipmentPrice(option, props.cartItems))} ฿
            </Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
