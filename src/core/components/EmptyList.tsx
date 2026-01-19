import { Box, Typography, useMediaQuery } from "@mui/material";
import { FC, ReactNode } from "react";

export type EmptyListProp = {
  text?: string
  icon?: ReactNode
};

export const EmptyList: FC<EmptyListProp> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <Box bgcolor="white" py="160px" mx="auto" textAlign="center">
      {props.icon}
      <Typography variant={isDesktop ? "h3" : "h4"} color="grey.400" py="8px">{props.text}</Typography>
    </Box>
  );
};

export default EmptyList;
