import { FC, MouseEventHandler } from "react";
import { Typography, Box } from '@mui/material'

export const Button: FC<{ onClick: MouseEventHandler<HTMLDivElement>}> = (props) => {
  return (
    <Box
      px="12px"
      py="12px"
      onClick={props.onClick}
      border="1px solid"
      borderColor="common.white"
      borderRadius="8px"
      sx={{ cursor: 'pointer' }}
    >
      <Typography variant="h4" component="h4" color="common.white">
        {props.children}
      </Typography>
    </Box>
  );
};