import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const ArrowLeftIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox={"0 0 18 12"} {...props}>
      <path
        d="M17.3282 4.99999V6.99999L4.49993 6.99999L7.74245 10.2425L6.32824 11.6567L0.671387 5.99987L6.32824 0.343018L7.74245 1.75723L4.4997 4.99999L17.3282 4.99999Z"
      />
    </SvgIcon>
  );
};

export default ArrowLeftIcon;
