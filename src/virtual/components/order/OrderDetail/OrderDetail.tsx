import { FC } from "react";
import {
  useMediaQuery,
} from "@mui/material";
import dynamic from "next/dynamic";

import {
  DefaultLayoutProp,
} from "src";

import { OrderModel } from "src/order/models";
import OrderDetailDesktop from './OrderDetailDesktop';

export type OrderDetailProps = DefaultLayoutProp & {
  order: OrderModel;
};

export const OrderDetail: FC<OrderDetailProps> = (props) => {
  return <OrderDetailDesktop {...props} />
};
