import { FC, useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import NextLink from "next/link";
import { useIntl, useTranslations } from "next-intl";
import Image from "next/image";

import {
  routes,
  CartModel,
  useResource,
} from "src/core";
import { SummaryProductCard } from "src/product/components/SummaryProductCard";
import { CustomerProductFavoriteModel, Product } from "src/product/models";
import { SingleProductDetailFormController } from "src/product/components/form/SingleProductDetailForm";
import { ProductDetailGallery } from "./ProductDetailGallery";
import { getProductItemPrice, getProductItemsPrice } from "utils/calaulate";
import heartFillIcon from "public/icons/shopdit-icon_heart-fill.svg";
import { CartContext, useAuth } from "src";
import { ProductDetailDrawer } from "src/product/components/ProductDetailDrawer";
import router from "next/router";
import { DefaultLayout, DefaultLayoutProp } from "src/core/components/DefaultLayout";
import CartIcon from "src/core/components/CartIcon";
import { MobileAppBar } from "src/core/components/MobileAppBar";
import { HeartOutlineIcon } from "src/core/components/HeartOutlineIcon";
import ChevronDownIcon from "src/core/components/ChevronDownIcon";

export type ProductDetailProps = DefaultLayoutProp & {
  product: Product;
  productsRelation: Product[];
  cart: CartModel;
  customerProductFavorite: CustomerProductFavoriteModel[];
};

export const ProductDetail: FC<ProductDetailProps> = (props) => {
  const t = useTranslations("productDetail");
  const resource = useResource();
  const intl = useIntl();
  const { cartData } = useContext(CartContext);
  const { product } = props;

  const [seeMore, setSeeMore] = useState(false);
  const [openOptionDrawer, setOpenOptionDrawer] = useState(false);
  const [customerProductFavoriteData, setCustomerProductFavoriteData] = useState(props?.customerProductFavorite);
  const [unit, setUnit] = useState(product?.unit);

  const productPrice = getProductItemsPrice(product?.productItems);

  const onFetchProductFavorite = async () => {
    const fetchCustomerProductFavorite = await resource.fetchResource(
      "customer-product-favorite-public",
      {},
      ""
    );
    setCustomerProductFavoriteData(fetchCustomerProductFavorite?.data?.data);
  };

  const onUpdateProductFavorite = async (
    productId: number | string,
    status: string
  ) => {
    await resource.createResource("customer-product-favorite-public", {
      productId,
      status,
    });
    onFetchProductFavorite();
  };

  useEffect(() => {
    if (props?.customerProductFavorite) {
      setCustomerProductFavoriteData(props?.customerProductFavorite);
    }
  }, [props]);

  return (
    <>
      <Box
        {...({
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          px: "8px",
          gap: "32px",
        })
        }
      >
        <Box width={"576px"} pb="32px">
          <ProductDetailGallery images={props.product?.productImages} />
        </Box>

        <Box>
          <Typography variant="h1" component="h1" lineHeight={"40px"}>
            {props.product?.name}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            mt="12px"
          >
            {
              unit === product.bigUnit ? (
                <Box display="flex" alignItems="center">
                  <Typography variant="h1" color="red.50" mr="8px">
                    ฿
                    {intl.formatNumber(getProductItemPrice(props.product?.productItems[0]).bigUnitPriceOnDiscount)}
                  </Typography>
                  {productPrice?.minPrice?.priceOnDiscount ===
                    productPrice?.maxPrice?.priceOnDiscount &&
                    productPrice?.minPrice?.discount &&
                    productPrice?.maxPrice?.discount && (
                      <Typography
                        variant="h1"
                        color="grey.100"
                        sx={{ textDecoration: "line-through" }}
                      >
                        <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(getProductItemPrice(props.product?.productItems[0]).bigUnitPrice)}
                      </Typography>
                    )}
                </Box>
              ) : (
                <Box display="flex" alignItems="center">
                  {productPrice?.minPrice?.priceOnDiscount ===
                    productPrice?.maxPrice?.priceOnDiscount && (
                      <Typography variant="h1" color="red.50" mr="8px">
                        <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(
                          productPrice?.minPrice?.priceOnDiscount,
                          {}
                        )}
                      </Typography>
                    )}
                  {productPrice?.minPrice?.priceOnDiscount ===
                    productPrice?.maxPrice?.priceOnDiscount &&
                    productPrice?.minPrice?.discount &&
                    productPrice?.maxPrice?.discount && (
                      <Typography
                        variant="h1"
                        color="grey.100"
                        sx={{ textDecoration: "line-through" }}
                      >
                        <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(productPrice?.minPrice?.price, {})}
                      </Typography>
                    )}
                  {productPrice?.minPrice?.priceOnDiscount !==
                    productPrice?.maxPrice?.priceOnDiscount && (
                      <Typography variant="h1" color="red.50" mr="8px">
                        <Typography component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(
                          productPrice?.minPrice?.priceOnDiscount,
                          {}
                        )}{" "}
                        -{" "}
                        {intl.formatNumber(
                          productPrice?.maxPrice?.priceOnDiscount,
                          {}
                        )}
                      </Typography>
                    )}
                </Box>
              )
            }
            <Box display="flex" alignItems="center">
              <Box
                mx="8px"
                width="24px"
                height="24px"
                position="relative"
                sx={{ cursor: "pointer" }}
              >
                {customerProductFavoriteData?.find(
                  (productFavorite: any) =>
                    productFavorite?.product?.id === product?.id
                ) ? (
                  <Image
                    className="heart-fill"
                    src={heartFillIcon}
                    alt="profile logo"
                    layout="fill"
                    objectFit="contain"
                    unoptimized={true}
                    onClick={() =>
                      onUpdateProductFavorite(product?.id, "inActive")
                    }
                  />
                ) : (
                  <HeartOutlineIcon
                    color="primary"
                    onClick={() =>
                      onUpdateProductFavorite(product?.id, "active")
                    }
                  />
                )}
              </Box>
              {/* <ShareIcon /> */}
            </Box>
          </Box>
          <Box
            bgcolor="rgba(229, 231, 235, 0.2)"
            p="32px"
            borderRadius="8px"
            mt="32px"
          >
            <Typography variant="h3">{t("detail")}</Typography>
            <Box
              key="sku"
              display="flex"
              justifyContent="space-between"
              my="8px"
            >
              <Box width="109px">
                <Typography variant="h4">{t("sku")}:</Typography>
              </Box>
              <Box width="100%">
                <Typography variant="h4">{props?.product?.slug}</Typography>
              </Box>
            </Box>
            <Box
              key="category"
              display="flex"
              justifyContent="space-between"
              my="8px"
            >
              <Box width="109px">
                <Typography variant="h4">{t("category")}:</Typography>
              </Box>
              <Box width="100%">
                <Typography variant="h4">
                  {props?.product?.productCategory?.name}
                </Typography>
              </Box>
            </Box>
            <Box
              key="unit"
              display="flex"
              justifyContent="space-between"
              my="8px"
            >
              <Box width="109px">
                <Typography variant="h4">{t("unit")}:</Typography>
              </Box>
              <Box width="100%">
                <Typography variant="h4">
                  {props?.product?.unit}{" "}
                  {props?.product?.bigUnit &&
                    `(${props?.product?.piecePerBigUnit} ${props?.product?.unit} / ${props?.product?.bigUnit})`}
                </Typography>
              </Box>
            </Box>
            <Box
              key="weight"
              display="flex"
              justifyContent="space-between"
              my="8px"
            >
              <Box width="109px">
                <Typography variant="h4">{t("weight")}:</Typography>
              </Box>
              <Box width="100%">
                <Typography variant="h4">
                  {props?.product?.weightSize} g.
                </Typography>
              </Box>
            </Box>
            <Box
              key="dimension"
              display="flex"
              justifyContent="space-between"
              my="8px"
            >
              <Box width="109px">
                <Typography variant="h4">{t("dimension")}:</Typography>
              </Box>
              <Box width="100%">
                <Typography variant="h4">
                  {props?.product?.widthSize} x {props?.product?.lengthSize} x{" "}
                  {props?.product?.heightSize} cm.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            py="32px"
            borderBottom="1px solid"
            borderColor="grey.100"
          >
            <Typography fontWeight="light" variant="h3" lineHeight="25px" sx={{
              whiteSpace: 'pre-wrap'
            }}>{props.product?.highlight}</Typography>
          </Box>
          {props?.product?.kind !== "set" && (
            <SingleProductDetailFormController
              productPrimaryOption={props.product?.productPrimaryOption}
              productSecondaryOption={props.product?.productSecondaryOption}
              units={[props.product?.unit, props.product?.bigUnit]}
              product={props.product}
              cart={props.cart}
              onChangeUnit={(unit: string) => setUnit(unit)}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
