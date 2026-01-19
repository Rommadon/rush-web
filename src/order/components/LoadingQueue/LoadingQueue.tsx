import { FC } from "react";
import { useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";

import { DefaultLayoutProp } from "src";

export type LoadingQueueProps = DefaultLayoutProp & {
  orderQueueUuid: string;
  waitingQueue: number;
  checkTime: number;
};

export const LoadingQueue: FC<LoadingQueueProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const Component = isDesktop
    ? dynamic(() => import("./LoadingQueueDesktop"))
    : dynamic(() => import("./LoadingQueueMobile"));

  return <Component {...props} />;
};
