import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const CloseIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...{ viewBox: '0 0 19 19', ...props }}>
      <path
        d="M18.27 1.84005L16.43 0L9.135 7.29495L1.84005 0L0 1.84005L7.29495 9.135L0 16.43L1.84005 18.27L9.135 10.975L16.43 18.27L18.27 16.43L10.975 9.135L18.27 1.84005Z"
      />
    </SvgIcon>
  );
};
