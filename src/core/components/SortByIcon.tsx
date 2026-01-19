import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const SortByIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path
      d="M2.9616 2.5H12.9616L7.9516 8.8L2.9616 2.5ZM0.211604 2.11C2.2316 4.7 5.9616 9.5 5.9616 9.5V15.5C5.9616 16.05 6.4116 16.5 6.9616 16.5H8.9616C9.5116 16.5 9.9616 16.05 9.9616 15.5V9.5C9.9616 9.5 13.6816 4.7 15.7016 2.11C16.2116 1.45 15.7416 0.5 14.9116 0.5H1.0016C0.171604 0.5 -0.298396 1.45 0.211604 2.11Z"
    />
  </SvgIcon>
);

export default SortByIcon;
