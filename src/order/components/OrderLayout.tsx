import { FC, ReactNode } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

import {
  DefaultLayout,
  DefaultLayoutProp,
  MobileAppBar,
} from "src/core/components";
import { Sidebar } from "./Sidebar";

export type OrderLayoutProps = DefaultLayoutProp & {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  subtitleComponent?: ReactNode;
  sidebarProps: {
    onHandleStatusClick: (checkedStatus: string) => any;
    onResetLoading: () => any;
  };
  footer?: ReactNode;
};

export const OrderLayout: FC<OrderLayoutProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      {isDesktop && (
        <DefaultLayout {...props} titleMeta={props.subtitle}>
          <Box my="80px">
            <Typography variant="h1" fontWeight="300" px="32px">
              {props.title}
            </Typography>
            <Box display="flex" gridTemplateColumns="3fr 9fr" gap="32px">
              <Box></Box>
              <Sidebar {...props.sidebarProps} />
              <Box mt="48px" width="100%">
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h2" fontWeight="600">
                    {props.subtitle}
                  </Typography>
                  {props.subtitleComponent}
                </Box>
                {props.children}
              </Box>
            </Box>
          </Box>
        </DefaultLayout>
      )}
      {!isDesktop && (
        <DefaultLayout
          {...props}
          appBar={<MobileAppBar title={props.subtitle ?? ""} right={props.right} />}
        />
      )}
    </>
  );
};

export default OrderLayout;
