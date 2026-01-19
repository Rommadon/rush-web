import { FC } from "react";
import { Typography, Box, Button, useMediaQuery, SvgIcon } from "@mui/material";
import NextLink from "next/link";

import { routes } from "src";

export type PaymentItemProps = {
  id: number;
  lastNumber: string;
  cardName: string;
  brand: string;
  isDefault: boolean;
  onClick: () => any;
  onHideEdit?: boolean;
};

export const PaymentItem: FC<PaymentItemProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return isDesktop ? (
    <PaymentItemDesktop {...props} />
  ) : (
    <PaymentItemMobile {...props} />
  );
};

const PaymentItemDesktop: FC<PaymentItemProps> = (props) => {
  return (
    <Box
      key={props.id}
      pt="20px"
      pb="20px"
      px="16px"
      borderBottom="1px solid"
      borderColor="grey.100"
    >
      <Box display="flex" justifyContent="space-between" pl="16px">
        <Box display="flex" alignItems="center">
          <Typography>{props.cardName}</Typography>
          {props.isDefault && (
            <Typography color="grey.200" px="8px">
              {"(ค่าเริ่มต้น)"}
            </Typography>
          )}
        </Box>
        <NextLink href={routes.editCreditCardPayment({ id: props.id })}>
          <Box display="flex" alignContent="center">
            <Typography>*** {props.lastNumber}</Typography>
            {
              !props.onHideEdit ? (
                <SvgIcon width="6" height="10" viewBox={"0 0 6px 10px"} sx={{
                  pt: "8px",
                  pl: "16px"
                }}>
                  <path
                    d="M0.333984 1.22882L1.27679 0.286011L5.99084 5.00006L1.27679 9.7141L0.333984 8.77129L4.10522 5.00006L0.333984 1.22882Z"
                    fill="black"
                  />
                </SvgIcon>
              ) : ''
            }
          </Box>
        </NextLink>
      </Box>
    </Box>
  );
};

const PaymentItemMobile: FC<PaymentItemProps> = (props) => {
  return (
    <Box
      key={props.id}
      pt="30px"
      pb="30px"
      px="16px"
      borderBottom="0.5px solid"
      borderColor="grey.100"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Box display="flex" alignContent="center">
            <Typography>{props.cardName}</Typography>
            {props.isDefault && (
              <Typography color="grey.200" px="8px">
                {"(ค่าเริ่มต้น)"}
              </Typography>
            )}
          </Box>
        </Box>
        <NextLink href={routes.editCreditCardPayment({ id: props.id })}>
          <Box display="flex" alignContent="center">
            <Typography>*** {props.lastNumber}</Typography>
            {
              !props.onHideEdit ? (
                <SvgIcon width="6" height="10" viewBox={"0 0 6px 10px"} sx={{
                  pt: "8px",
                  pl: "16px"
                }}>
                  <path
                    d="M0.333984 1.22882L1.27679 0.286011L5.99084 5.00006L1.27679 9.7141L0.333984 8.77129L4.10522 5.00006L0.333984 1.22882Z"
                    fill="black"
                  />
                </SvgIcon>
              ) : ''
            }
          </Box>
        </NextLink>
      </Box>
    </Box>
  );
};
