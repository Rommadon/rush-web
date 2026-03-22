import { FC } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import NextImage from "next/image";
import { useIntl } from "next-intl";

import { Text } from "../../core/components";
import image from "next/image";

export type BestSellerCardMockType = {
  image: string;
};

export const BestSellerCardMock: FC<BestSellerCardMockType> = (props) => {
  const intl = useIntl();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <Box
      width={isDesktop ? "200px" : "155px"}
      maxHeight={isDesktop ? "320px" : "280px"}
      sx={{ cursor: "pointer" }}
    >
      <Box
        height={isDesktop ? "200px" : "155px"}
        width={isDesktop ? "200px" : "155px"}
        borderRadius={isDesktop ? "0" : "8px"}
        position="relative"
      >
        <NextImage  
          className={isDesktop ? "" : "rounded-2"}
          src={props.image}
          width={272}
          height={272}
          blurDataURL={"/popular-product-thumbnail.jpg"}
          quality={70}
          objectFit="cover"
  unoptimized={true}
/>
      </Box>
      <Box pt="8px">
        <Text lineClamp="2">
          <Typography
            component="h2"
            variant={isDesktop ? "h5" : "h4"}
            fontWeight="light"
            lineHeight="22px"
            sx={{ lineClamp: 2 }}
          >
            สินค้าตัวอย่าง
          </Typography>
        </Text>
      </Box>
      <Box margin="auto">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box alignSelf="baseline">
              <Box display="flex">
                <Typography variant="h4" color="red.100" mr="8px">
                  <Typography component="span" fontFamily="Roboto">
                    ฿
                  </Typography>
                  {intl.formatNumber(200, {})}
                </Typography>
              </Box>
            </Box>
            <Box alignSelf="baseline">
              <Typography variant="h4" color="grey.400">
                <Typography component="span" fontSize="12px">
                  ขายได้ 100 ชิ้น
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
