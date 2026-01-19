import { FC, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import NextImage from "next/image";
import { useIntl } from "next-intl";
import NextLink from "next/link";

import { routes, useResource } from "src";

export type ShopditPointItemProps = {
  key: string | number;
  title?: string;
  createdAt?: string;
  point?: number;
  type: string;
};

export const ShopditPointItem: FC<ShopditPointItemProps> = (props) => {
  const intl = useIntl();
  const resource = useResource();

  return (
    <Box display="flex" width="100%" p="16px" borderBottom="1px solid" borderColor="grey.100" key={props.key}>
      <Box p="8px" flex="1">
        <Box display="flex" justifyContent="space-between">
          <Box>
            {props.title && <Typography variant="h3">{props.title}</Typography>}
            {props.createdAt && (
              <Typography variant="h4" color="grey.200" fontWeight="light" py={2}>
                {intl.formatDateTime(new Date(props.createdAt))}
              </Typography>
            )}
          </Box>
          <Box display="flex">
            <Box width="24px" height="24px" color="white" bgcolor={props.type === 'increase' ? "#00B900" : "grey.200"} borderRadius="50%" textAlign="center" display="flex" alignItems="center" justifyContent="center">
              <Box>
                P
              </Box>
            </Box>
            {props.type === 'increase' ? (
              <Box px="8px">
                {props.point}
              </Box>
            ) : (
              <Box px="8px" color="red.50">
                - {props.point}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
