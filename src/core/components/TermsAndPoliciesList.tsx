// @ts-nocheck
import React, { FC, useContext } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import NextLink from "next/link";

import {
  DefaultLayout,
  routes,
  ChevronRightIcon,
  DefaultLayoutProp
} from "src/core";
import { AuthContext, MobileAppBar } from "src";

export type TermsAndPoliciesListProps = DefaultLayoutProp & {};

export const TermsAndPoliciesList: FC<TermsAndPoliciesListProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { currentMerchant } = useContext(AuthContext);

  return (
    <DefaultLayout {...props}
      appBar={!isDesktop && <MobileAppBar title={"เงื่อนไขและการบริการ"} />}
    >
      <List sx={{ py: "16px" }}>
        <NextLink href={routes.refundsAndReturnPolicyMerchant()}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="นโยบายการคืนสินค้าและคืนเงิน"
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: "light",
                }}
              />
              <ListItemIcon
                sx={{ display: "flex", justifyContent: "flex-end", py: "16px" }}
              >
                <ChevronRightIcon fontSize={"5px"} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </NextLink>
        <NextLink href={routes.shippingPolicyMerchant()}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="นโยบายการจัดส่งสินค้า"
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: "light",
                }}
              />
              <ListItemIcon
                sx={{ display: "flex", justifyContent: "flex-end", py: "16px" }}
              >
                <ChevronRightIcon fontSize={"5px"} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </NextLink>
        <NextLink href={routes.cookiesPolicyMerchant()}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="นโยบายคุ้กกี้"
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: "light",
                }}
              />
              <ListItemIcon
                sx={{ display: "flex", justifyContent: "flex-end", py: "16px" }}
              >
                <ChevronRightIcon fontSize={"5px"} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </NextLink>
        <NextLink href={routes.privacyPolicyMerchant()}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="นโยบายความเป็นส่วนตัว"
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: "light",
                }}
              />
              <ListItemIcon
                sx={{ display: "flex", justifyContent: "flex-end", py: "16px" }}
              >
                <ChevronRightIcon fontSize={"5px"} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </NextLink>
        <NextLink href={routes.termsOfServicePolicyMerchant()}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="เงื่อนไขการให้บริการ"
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: "light",
                }}
              />
              <ListItemIcon
                sx={{ display: "flex", justifyContent: "flex-end", py: "16px" }}
              >
                <ChevronRightIcon fontSize={"5px"} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </NextLink>
      </List>
    </DefaultLayout>
  );
};

export default TermsAndPoliciesList;
