import { FC, useState, useEffect } from "react";
import NextImage from "next/image";
import { useTranslations, useIntl } from "next-intl";
import NextLink from "next/link";
import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";

import { QuantityInput } from "./QuantityInput";
import { truncateString } from "utils/truncate";
import { CartItemModel, useResource } from "src/core";
import { getProductItemPrice } from "utils/calaulate";
import { CloseIcon } from "src/core/components/CloseIcon";
import { useToast } from "src/core/hooks/useToast";

export type CartItemProps = {
  image: string;
  name?: string;
  // quantity: number;
  // handleIncrease: () => any;
  // handleDecrease: () => any;
  cartItem: CartItemModel;
  onFetch: () => any;
};

export const CartItem: FC<CartItemProps> = (props) => {
  const intl = useIntl();
  const toast = useToast();
  const t = useTranslations("product.cartItem");
  const resource = useResource();
  const itemPrice = getProductItemPrice(props?.cartItem?.productItem);
  const [quantity, setQuantity] = useState(props?.cartItem?.quantity);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity - 1 <= 0 ? null : setQuantity(quantity - 1);

  const onDelete = async () => {
    try {
      await resource.deleteResource('cart-public/cartItem', props?.cartItem?.id);
      props.onFetch();
    } catch (error: any) {
      console.log(error)
      toast.openToast(error.message, 'error');
    }
  }

  const updateCartWithQuantity = async (quantity: number) => {
    try {
      await resource.updateResource('cart-public/cartItem', props?.cartItem?.id, {
        quantity: quantity
      })
  
      props.onFetch();
    } catch (error: any) {
      console.log(error)
      toast.openToast(error.message, 'error');
    }
  }

  useEffect(() => {
    if (quantity) {
      updateCartWithQuantity(quantity);
    }
  }, [quantity])

  return (
    <Box
      display="flex"
      py="16px"
      borderBottom="1px solid"
      borderColor="grey.100"
    >
      <Box width="120px" height="auto" sx={{ cursor: 'pointer' }}>
        <NextLink href={`/products/${props?.cartItem?.productItem?.product?.slug}`}>
          <NextImage  
            src={props.image || '/new-in-placeholder.svg'}
            width="89px"
            height="89px"
  unoptimized={true}
></NextImage>
        </NextLink>
      </Box>

      <Box pl="16px" width="100%">
        <Box display="flex" width="100%" justifyContent="space-between">
          <Box pr="16px" sx={{ cursor: 'pointer' }}>
            <NextLink href={`/products/${props?.cartItem?.productItem?.product?.slug}`}>
              <Typography
                variant="h4"
                title={props.name}
                fontWeight="light"
              >
                {truncateString(props?.name || '-', 80)}
              </Typography>
            </NextLink>
          </Box>
          <Box sx={{ cursor: "pointer" }} onClick={() => onDelete()}>
            <CloseIcon viewBox="0 0 10px 12px" />
          </Box>
        </Box>
        <Box py="8px">
          <Typography variant="h4">
            หน่วย : {props?.cartItem?.unit}
            {
              props?.cartItem?.productItem?.primaryOptionsValue && `, ${props?.cartItem?.productItem?.primaryOptionsValue}`
            }
            {
              props?.cartItem?.productItem?.secondaryOptionsValue && `, ${props?.cartItem?.productItem?.secondaryOptionsValue}`
            }
          </Typography>
        </Box>
        <Box>
          <Box display="flex" justifyContent="space-between" my="12px" alignItems="center">
            <FormControl>
              {
                props?.cartItem?.productItem?.product?.bigUnit === props?.cartItem?.unit ? (
                  itemPrice?.bigUnitDiscount ? (
                    <Box display="flex">
                      <Typography variant="h3" pr="8px" color="red.50">
                        <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(
                          itemPrice?.bigUnitPriceOnDiscount,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </Typography>
                      <Typography
                        variant="h4"
                        color="grey.200"
                        sx={{ textDecoration: "line-through" }}
                      >
                        <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(
                          itemPrice?.bigUnitPrice,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Typography variant="h3" pr="8px" color="red.50">
                        <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(
                          itemPrice?.bigUnitPriceOnDiscount,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </Typography>
                    </>
                  )
                ) : (
                  itemPrice?.discount ? (
                    <Box display="flex">
                      <Typography variant="h3" pr="8px" color="red.50">
                        <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(
                          itemPrice?.priceOnDiscount,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </Typography>
                      <Typography
                        variant="h4"
                        color="grey.200"
                        sx={{ textDecoration: "line-through" }}
                      >
                        <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(
                          itemPrice?.price,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Typography variant="h3" pr="8px" color="red.50">
                        <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(
                          itemPrice?.priceOnDiscount,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </Typography>
                    </>
                  )
                )
              }
              {/* <Typography variant="h5" fontWeight="light">
                {
                  props?.cartItem?.productItem?.primaryOptionsValue && `${props?.cartItem?.productItem?.primaryOptionsValue}, `
                }
                {
                  props?.cartItem?.productItem?.secondaryOptionsValue && `${props?.cartItem?.productItem?.secondaryOptionsValue}, `
                }
                { props?.cartItem?.unit }
              </Typography> */}
              {/* <Select
                value={""}
                placeholder=""
                displayEmpty
                label=""
                onChange={() => {}}
                sx={{ height: "32px" }}
              >
                <MenuItem value={""}>{t("options")}</MenuItem>
                <MenuItem value={"th"}>ไทย</MenuItem>
                <MenuItem value={"en"}>English</MenuItem>
              </Select> */}
            </FormControl>
            <Box width="130px">
              <QuantityInput
                height={"32px"}
                onDecrease={decreaseQuantity}
                onIncrease={increaseQuantity}
                onSetQuantity={(value) => setQuantity(value)}
                quantity={quantity}
                disabledValue={props?.cartItem?.productItem?.stock?.remaining}
                onValidateDisableValue={props?.cartItem?.productItem?.stock?.onValidateStock}
                onBigUnit={props?.cartItem?.unit === props?.cartItem?.productItem?.product?.bigUnit}
                bigUnitValue={props?.cartItem?.productItem?.product?.piecePerBigUnit}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
