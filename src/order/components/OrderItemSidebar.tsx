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
  index: number;
  sku?: any;
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
    <Box display="flex" py="16px" borderTop={props?.index !== 0 ? '1px solid' : 'none'}
    borderColor="grey.100">
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
          {console.log('props', props)}
          <Box
            title={props.name}
          >
            <Typography
              variant="h3"
              fontWeight="light"
              sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
            >
              ({props?.sku}) - {truncateString(props?.name || '-', 60)}
            </Typography>
          </Box>
        </Box>
        {/* <Box
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
                    <Typography component="span" fontFamily="Roboto">
                      ฿
                    </Typography>
                    {intl.formatNumber(itemPrice?.bigUnitPriceOnDiscount)}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="grey.200"
                    sx={{ textDecoration: "line-through" }}
                  >
                    <Typography component="span" fontFamily="Roboto">
                      ฿
                    </Typography>
                    {intl.formatNumber(itemPrice?.bigUnitPrice)}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h4" pr="8px" color="red.50">
                    <Typography component="span" fontFamily="Roboto">
                      ฿
                    </Typography>
                    {intl.formatNumber(itemPrice?.bigUnitPriceOnDiscount)}
                  </Typography>
                </>
              )
            ) : (
              itemPrice?.discount ? (
                <>
                  <Typography variant="h4" pr="8px" color="red.50">
                    <Typography component="span" fontFamily="Roboto">
                      ฿
                    </Typography>
                    {intl.formatNumber(itemPrice?.priceOnDiscount)}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="grey.200"
                    sx={{ textDecoration: "line-through" }}
                  >
                    <Typography component="span" fontFamily="Roboto">
                      ฿
                    </Typography>
                    {intl.formatNumber(itemPrice?.price)}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h4" pr="8px" color="red.50">
                    <Typography component="span" fontFamily="Roboto">
                      ฿
                    </Typography>
                    {intl.formatNumber(itemPrice?.priceOnDiscount)}
                  </Typography>
                </>
              )
            )
          }
        </Box> */}
        <Box>
          <Typography variant="h4" fontWeight="light" mb="8px">
            หน่วย: {props?.cartItem?.unit}
            {
              props?.cartItem?.productItem?.primaryOptionsValue && `, ${props?.cartItem?.productItem?.product?.productPrimaryOption?.name}: ${props?.cartItem?.productItem?.primaryOptionsValue}`
            }
            {
              props?.cartItem?.productItem?.secondaryOptionsValue && `, ${props?.cartItem?.productItem?.product?.productSecondaryOption?.name}: ${props?.cartItem?.productItem?.secondaryOptionsValue}`
            }
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h3" color="red.50">
                <Typography component="span" fontFamily="Roboto">
                  ฿
                </Typography>
                {intl.formatNumber(
                  itemTotalPrice.totalPrice,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}</Typography>
            </Box>
            <Typography variant="h3" textAlign="right">
              x {props.quantity}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderItemSidebar;
