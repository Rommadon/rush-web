import { IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { Box } from "@mui/material";
import NextImage from "next/image";
import { useIntl, useTranslations } from "next-intl";

import { truncateString } from "utils/truncate";
import { getProductItemPrice, getProductPriceAndProductDiscountPrice } from "utils/calaulate";
import { CartItemModel } from "src/core";

export type OrderItemProps = {
  name?: string;
  imageSrc: string;
  price: number;
  fullPrice?: number;
  quantity: number;
  cartItem: CartItemModel;
};

export const OrderItemSidebar: FC<OrderItemProps> = (props) => {
  const intl = useIntl();
  const t = useTranslations('order.orderItemSidebar');
  const items = [];
  items.push(props?.cartItem);
  const itemPrice = getProductItemPrice(props?.cartItem?.productItem);
  const itemTotalPrice = getProductPriceAndProductDiscountPrice(items);

  return (
    <Box display="flex" py="8px">
      <Box
        width="100px"
        height="100px"
        borderRadius="8px"
        overflow="hidden"
      >
        <NextImage src={props.imageSrc} width={100} height={100} priority={true} unoptimized={true}/>
      </Box>
      <Box flex="1" ml="16px" display="flex" flexDirection="column" justifyContent="space-between">
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          alignItems="start"
        >
          <Box
            title={props.name}
          >
            <Typography
              variant="h5"
              fontWeight="light"
              sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
            >
              {truncateString(props?.name || '-', 60)}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          paddingTop="8px"
        >
          {
            props?.cartItem?.unit === props?.cartItem?.productItem?.product?.bigUnit ? (
              itemPrice?.bigUnitDiscount ? (
                <>
                  <Typography variant="h4" pr="8px" color="red.50">
                    ฿{intl.formatNumber(itemPrice?.bigUnitPriceOnDiscount)}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="grey.200"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ฿{intl.formatNumber(itemPrice?.bigUnitPrice)}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h4" pr="8px" color="red.50">
                    ฿{intl.formatNumber(itemPrice?.bigUnitPriceOnDiscount)}
                  </Typography>
                </>
              )
            ) : (
              itemPrice?.discount ? (
                <>
                  <Typography variant="h4" pr="8px" color="red.50">
                    ฿{intl.formatNumber(itemPrice?.priceOnDiscount)}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="grey.200"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ฿{intl.formatNumber(itemPrice?.price)}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h4" pr="8px" color="red.50">
                    ฿{intl.formatNumber(itemPrice?.priceOnDiscount)}
                  </Typography>
                </>
              )
            )
          }
        </Box>
        <Typography variant="h3" textAlign="right">
          x {props.quantity}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontWeight="light">
            {
              props?.cartItem?.productItem?.primaryOptionsValue && `${props?.cartItem?.productItem?.primaryOptionsValue}, `
            }
            {
              props?.cartItem?.productItem?.secondaryOptionsValue && `${props?.cartItem?.productItem?.secondaryOptionsValue}, `
            }
            หน่วย: {props?.cartItem?.unit}
          </Typography>
          <Box>
            <Typography variant="h6" color="grey.200" textAlign="end">{t("subtotal")}</Typography>
            <Typography variant="h3" color="red.50">{intl.formatNumber(itemTotalPrice.totalPrice)} ฿</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderItemSidebar;
