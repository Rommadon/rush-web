import { FC } from 'react'
import { Typography, styled, TypographyProps } from "@mui/material";

const TypographyWithLineClamp: FC<TypographyProps & { lineClamp?: string, lineHeight?: string }> = (props) => <Typography {...props} />

export const Text = styled(TypographyWithLineClamp)((props) => ({
  overflow: "hidden",
  display: "-webkit-box",
  "-webkit-line-clamp": props.lineClamp ?? '1',
  "-webkit-box-orient": "vertical",
  "word-wrap": "break-word",
  "text-overflow":
    "ellipsis" /* It will end with ellipsis when text-overflow: ellipsis is included */,
  position: "relative",
  visibility: "visible",
  lineHeight: props.lineHeight ? props.lineHeight : "20px"
}));

export default Text;
