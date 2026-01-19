import { FC, ReactNode } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

import { useCountdown } from "../hooks";

export type FlashSaleCountDownProps = {
  endedAt: Date;
  right?: ReactNode;
  size?: "sm" | "lg";
};

export const FlashSaleCountDown: FC<FlashSaleCountDownProps> = (props) => {
  const { size = "sm" } = props;
  const isSmSize = size === "sm";
  const { formattedHour, formattedMinute, formattedSecond, formattedDay } = useCountdown(
    props.endedAt
  );
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <Box display="flex" alignItems="center">
      {
        formattedDay && +formattedDay > 0 && (
          <Typography
            variant="h5"
            color="common.black"
            mx="6px"
            {...(isSmSize
              ? {}
              : { fontWeight: "light", fontSize: "20px !important", textAlign: "center" })}
          >
            {formattedDay} วัน
          </Typography>
        )
      }
      <Box
        bgcolor="common.black"
        py={isSmSize || isDesktop ? "4px" : "12px"}
        px={isSmSize || isDesktop ? "4px" : "16px"}
        borderRadius={isSmSize || isDesktop ? "4px" : "16px"}

      // width={isDesktop ? "auto" : "80px"}
      // height={isDesktop ? "auto" : "80px"}
      >
        <Typography
          variant="h5"
          color="common.white"
          {...(isSmSize
            ? {}
            : { fontWeight: "light", fontSize: "20px !important", textAlign: "center" })}
        >
          {formattedHour}
        </Typography>
      </Box>
      <Typography variant="h5" color="common.black" mx="4px">
        :
      </Typography>
      <Box
        bgcolor="common.black"
        borderRadius={isSmSize || isDesktop ? "4px" : "16px"}
        py={isSmSize || isDesktop ? "4px" : "12px"}
        px={isSmSize || isDesktop ? "4px" : "16px"}
      >
        <Typography
          variant="h5"
          color="common.white"
          {...(isSmSize
            ? {}
            : { fontWeight: "light", fontSize: "20px !important", textAlign: "center" })}
        >
          {formattedMinute}
        </Typography>
      </Box>
      <Typography variant="h5" color="common.black" mx="4px">
        :
      </Typography>
      <Box
        bgcolor="common.black"
        borderRadius={isSmSize || isDesktop ? "4px" : "16px"}
        mr="14px"
        py={isSmSize || isDesktop ? "4px" : "12px"}
        px={isSmSize || isDesktop ? "4px" : "16px"}
      >
        <Typography
          variant="h5"
          color="common.white"
          {...(isSmSize
            ? {}
            : { fontWeight: "light", fontSize: "20px !important", textAlign: "center" })}
        >
          {formattedSecond}
        </Typography>
      </Box>
      {props.right}
    </Box>
  );
};
