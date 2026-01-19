import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const ChevronDownIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 15" {...props}>
      <path d="M1.71772 0.427543L-0.427734 2.58512L11.5723 14.573L23.5723 2.573L21.4268 0.427543L11.5723 10.2821L1.71772 0.427543Z" />
    </SvgIcon>
  );
};

export default ChevronDownIcon;
