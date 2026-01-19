import {
  Radio,
  Box,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
} from "@mui/material";
import { FC, useState } from "react";
import { useTranslations, useIntl } from "next-intl";

import { CouponModel } from "../models";
import { ChevronDownIcon } from "src/core/components";
import { useResource } from "src";
import { useToast } from "src/core/hooks/useToast";

export type CouponItemProps = CouponModel & {
  onClick?: () => any;
  checked?: boolean;
  disableCheckbox?: boolean;
  enableDetail?: boolean;
  inactive?: boolean;
  onKeep?: boolean;
  onFetch?: () => any;
};

export const CouponItem: FC<CouponItemProps> = (props) => {
  const t = useTranslations("order.couponItem");
  const intl = useIntl();
  const resource = useResource();
  const toast = useToast();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const keepCoupon = async () => {
    try {
      await resource.createResource(`coupon-public/${props.id}/keep`, {});
      if (props.onFetch) {
        props.onFetch();
      }
      toast.openToast('เก็บคูปองเรียบร้อยแล้ว', 'success');
    } catch (error: any) {
      toast.openToast(error.message, 'error');
    }
  }

  return (
    <Box>
      <Box display="flex" width="100%">
        {!props.disableCheckbox && (
          <ListItemIcon>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Radio
                checked={props.checked}
                disableRipple
                disableTouchRipple
                disableFocusRipple
                onClick={props.onClick}
              />
            </Box>
          </ListItemIcon>
        )}
        <Box maxHeight="115px" width={isDesktop ? "15%" : "25%"} position="relative" onClick={props.onClick}>
          <Box
            bgcolor={props.inactive ? 'grey.200' : 'primary.main'}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="8px"
            width="100%"
            height="100%"
            boxShadow="0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
          >
            {props.type === "freeShipping" ? (
              <Typography variant="h2" color="white" textAlign="center">
                Free Shipping
                <br />
              </Typography>
            ) : (
              <Typography variant="h2" color="white" textAlign="center">
                <Typography component="span" fontFamily="Roboto">
                  {props.value} {props.valueType === "percent" ? "%" : "฿"}
                </Typography>
                <br />
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          p="16px"
          pr="0"
          ml="8px"
          flex="5"
          boxShadow="0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {!props.enableDetail && (
            <>
              <Typography variant="h4">{props.name}</Typography>
              <Typography variant="h5" color="grey.400">
                {t("endDate")} {intl.formatDateTime(new Date(props.endDate))}
              </Typography>
            </>
          )}
          {props.enableDetail && (
            <Accordion disableGutters elevation={0}>
              <AccordionSummary expandIcon={<ChevronDownIcon />} sx={{ px: isDesktop ? "16px" : "8px" }}>
                <Box width="100%" onClick={props.onClick} mr={isDesktop ? "16px" : "8px"} pr={isDesktop ? "16px" : "8px"} borderRight="1px solid #F0F3F9">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography variant="h4" pr="8px">{props.name}</Typography>
                    <Box
                      bgcolor={props.inactive ? 'grey.200' : 'primary.main'}
                      textAlign="center"
                      borderRadius="16px"
                      p="4px 8px"
                      height="24px"
                    >
                      <Typography
                        color="white"
                        fontSize="10px"
                        textAlign="center"
                      >
                        {
                          props.inactive ? 'หมดอายุ' : 'ใช้ได้'
                        }
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                    mt="20px"
                  >
                    <Typography variant="h5" color="grey.400">
                      {t("endDate")}{" "}
                      {intl.formatDateTime(new Date(props.endDate))}
                    </Typography>
                    {
                      props.onKeep ? (
                        <Box
                          bgcolor={props.inactive ? 'grey.200' : 'primary.main'}
                          textAlign="center"
                          borderRadius="16px"
                          p="4px 8px"
                          onClick={() => keepCoupon()}
                        >
                          <Typography
                            color="white"
                            fontSize="10px"
                            textAlign="center"
                          >
                            เก็บคูปอง
                          </Typography>
                        </Box>
                      ) : (
                        ''
                      )
                    }
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: "8px" }}>
                <Box
                  m="0px 0 16px 0"
                  height="1px"
                  width="100%"
                  bgcolor="grey.400"
                ></Box>

                <Typography
                  component="div"
                  color="grey.400"
                  dangerouslySetInnerHTML={{ __html: props.description }}
                />
                <Typography variant="h5" color="grey.400">
                  {t("startDate")}{" "}
                  {intl.formatDateTime(new Date(props.startDate))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CouponItem;
