import { FC, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import NextImage from "next/image";
import { useIntl } from "next-intl";
import NextLink from "next/link";

import { routes, useResource } from "src";
import { OrderModel } from "src/order/models";

export type NotificationProps = {
  id: number;
  src?: string | null;
  title?: string;
  subTitle?: OrderModel;
  body?: string;
  createdAt?: string;
  isAlready?: boolean;
};

export const NotificationItem: FC<NotificationProps> = (props) => {
  const intl = useIntl();
  const resource = useResource();
  const [isAlready, setIsAlready] = useState(props.isAlready || false)

  const updateIsAlready = async () => {
    if (isAlready === false) {
      setIsAlready(true);
      await resource.updateResource('direct-notification-public', props.id, {
        isAlready: true
      });
    }
  }

  useEffect(() => {
    if (props && props.isAlready !== undefined) {
      setIsAlready(props.isAlready)
    }
  }, [props])

  return (
    <Box display="flex" width="100%" bgcolor={`${isAlready ? 'white' : 'grey.50'}`} p="16px" borderBottom="1px solid" borderColor="grey.100" onClick={() => updateIsAlready()}>
      <Box width="140px" height="140px" borderRadius="8px" overflow="hidden">
        <NextImage src={props.src ?? ""} width={140} height={140} />
      </Box>
      <Box p="8px" flex="1">
        <Box display="flex" justifyContent="space-between">
          {props.title && <Typography variant="h3">{props.title}</Typography>}
          {/* {props.createdAt && (
            <Typography variant="h4" color="grey.200" fontWeight="light">
              {intl.formatDateTime(new Date(props.createdAt))}
            </Typography>
          )} */}
        </Box>
        <Box mt="8px">
          {props.subTitle && <Typography variant="h4" fontWeight="light" py="4px" pb="8px">คำสั่งซื้อ
            <Box component="span" px="4px" color="red.50">
              <NextLink href={routes.order({ number: props.subTitle.number })}>
                {props.subTitle.number}
              </NextLink>
            </Box>
          </Typography>}
          {props.body && <Typography variant="h4" fontWeight="light" sx={{ wordBreak: "break-word"}}>{props.body}</Typography>}
          {props.createdAt && (
            <Typography variant="h6" color="grey.200" fontWeight="light" py="8px">
              {intl.formatDateTime(new Date(props.createdAt))}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
