import { FC } from "react";
import {
  useMediaQuery,
} from "@mui/material";
import dynamic from "next/dynamic";

import {
  DefaultLayoutProp,
} from "src";

import { OrderModel } from "../../models";

export type OrderDetailProps = DefaultLayoutProp & {
  order: OrderModel;
  type: string;
};

export const OrderDetail: FC<OrderDetailProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const Component = isDesktop ? dynamic(() => import('./OrderDetailDesktop')) : dynamic(() => import('./OrderDetailMobile'))

  return <Component {...props} />
};
