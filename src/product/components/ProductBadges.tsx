import { FC } from "react";
import { Box, Typography } from '@mui/material'

import { defaultTheme as theme } from 'src';

export type ProductBadgesProps = {
  badgeLeftText?: string;
  badgeRightText?: string;
};

export const ProductBadges: FC<ProductBadgesProps> = (props) => {
  const { badgeLeftText = "ขายดี", badgeRightText = "ลด 10%" } = props;

  return (
    <>
      {badgeLeftText && badgeLeftText !== "" && (
        <Box position={"absolute"} zIndex={3} top="4px" left="-8px">
          <Box position={"relative"}>
            <svg
              width="49"
              height="22"
              viewBox="0 0 49 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="49" height="18" fill={theme().palette.primary.main} />
              <path d="M0 18H8V22L3 19.5L0 18Z" fill={theme().palette.primary.main} />
              <path opacity="0.3" d="M0 18H8V22L3 19.5L0 18Z" fill="black" />
            </svg>
            <Typography
              color="white"
              position="absolute"
              top="0"
              left="0"
              m="2px 13px"
              fontSize="10px"
            >
              {badgeLeftText}
            </Typography>
          </Box>
        </Box>
      )}
      {badgeRightText && (
        <Box position={"absolute"} zIndex={3} top="0" right="9px">
          <Box position={"relative"}>
            <svg
              width="32"
              height="35"
              viewBox="0 0 32 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 30H0V35L10 31.875L16 30Z" fill="#EF4423" />
              <path d="M16 30H32V35L22 31.875L16 30Z" fill="#EF4423" />
              <rect width="32" height="30" fill="#EF4423" />
            </svg>

            <Typography
              color="white"
              position="absolute"
              top="0"
              left="0"
              m="0px 6px"
              textAlign="center"
              fontSize="10px"
            >
              {badgeRightText}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};
