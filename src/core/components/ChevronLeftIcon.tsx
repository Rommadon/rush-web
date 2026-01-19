import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const ChevronLeftIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M24 10.5H5.745L14.13 2.115L12 0L0 12L12 24L14.115 21.885L5.745 13.5H24V10.5Z" />
    </SvgIcon>
  );
};

export default ChevronLeftIcon
