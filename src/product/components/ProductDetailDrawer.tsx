import { FC, useState, useEffect } from "react";
import {
  SwipeableDrawer,
  Box,
  SwipeableDrawerProps,
  Typography,
} from "@mui/material";
import NextImage from "next/image";

import { CartModel, useResource } from "src/core";
import { Product, ProductItem } from "../models";
import { SingleProductDetailFormController } from "./form/SingleProductDetailForm";
import { useIntl } from "next-intl";
import { getProductItemPrice } from "utils/calaulate";

export type ProductDetailDrawerProps = SwipeableDrawerProps & {
  product: Product;
  cart: CartModel;
};

export const ProductDetailDrawer: FC<ProductDetailDrawerProps> = (props) => {
  const intl = useIntl();
  const [itemPrice, setItemPrice] = useState(getProductItemPrice(props?.product?.productItems[0]))
  const [selectedItem, setSelectedItem] = useState(props?.product?.productItems[0]);
  const [selectedUnit, setSelectedUnit] = useState(props?.product?.unit);

  useEffect(() => {
    if (selectedItem) {
      setItemPrice(getProductItemPrice(selectedItem));
    }
  }, [selectedItem])

  const onChangeUnit = (unit: string) => {
    setSelectedUnit(unit);
  }

  return (
    <SwipeableDrawer {...props} anchor={"bottom"}>
      <Box
        sx={{
          width: "100%",
        }}
        role="presentation"
        onClick={() => { }}
        onKeyDown={() => { }}
        p="16px"
      >
        <Box display="flex" alignItems="center" borderBottom="1px solid" borderColor="grey.100" pb="16px">
          <NextImage
            src={selectedItem?.imageUpload?.url || props.product?.productImages?.find((image) => image.order === 0)?.imageUpload?.url || '/new-in-placeholder.svg'}
            width="96"
            height="96"
            alt={props.product?.name}
          />
          <Box ml={'16px'}>
            <Box display="flex" alignItems="center">
              {
                selectedUnit === props?.product?.bigUnit ? (
                  <>
                    <Typography variant="h4" fontWeight={400} color="red.50">                          
                      <Typography component="span" fontFamily="Roboto" fontSize={14}>
                        ฿
                      </Typography>
                      {intl.formatNumber(itemPrice.bigUnitPriceOnDiscount)}
                    </Typography>
                    {
                      itemPrice.discount ? (
                        <Typography ml="8px" color="grey.200" sx={{ textDecoration: 'line-through' }}>                          <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                          {intl.formatNumber(itemPrice.bigUnitPrice)}</Typography>
                      ) : ''
                    }
                    <Typography variant="h5" fontWeight="light" color="grey.200" sx={{ px: "8px" }}>{`(${props?.product?.piecePerBigUnit} ${props?.product?.unit} / ${props?.product?.bigUnit})`}</Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h4" fontWeight={400} color="red.50">
                      <Typography component="span" fontFamily="Roboto" fontSize={14}>
                        ฿
                      </Typography>
                      {intl.formatNumber(itemPrice.priceOnDiscount)}</Typography>
                    {
                      itemPrice.discount ? (
                        <Typography ml="8px" color="grey.200" sx={{ textDecoration: 'line-through' }}>                          <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                          {intl.formatNumber(itemPrice.price)}</Typography>
                      ) : ''
                    }
                  </>
                )
              }
            </Box>
            <Typography fontSize="14px">คงเหลือ {selectedItem?.stock?.remaining > 0 ? selectedItem?.stock?.remaining : "0"} {props?.product?.unit}</Typography>
          </Box>
        </Box>
        <SingleProductDetailFormController
          productPrimaryOption={props.product?.productPrimaryOption}
          productSecondaryOption={props.product?.productSecondaryOption}
          units={[props.product?.unit, props.product?.bigUnit]}
          product={props.product}
          cart={props.cart}
          onSelectedProductItem={(data: ProductItem) => setSelectedItem(data)}
          onClose={props.onClose}
          onChangeUnit={(unit: string) => onChangeUnit(unit)}
        />
      </Box>
    </SwipeableDrawer>
  );
};
