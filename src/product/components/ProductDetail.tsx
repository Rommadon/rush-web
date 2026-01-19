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
import { SummaryProductCard } from "./SummaryProductCard";
import { CustomerProductFavoriteModel, Product } from "../models";
import { SingleProductDetailFormController } from "./form/SingleProductDetailForm";
import { ProductDetailGallery } from "./ProductDetailGallery";
import { CompareButton } from "./CompareButton";
import { useComparison } from "../hooks";
import { getProductItemPrice, getProductItemsPrice } from "utils/calaulate";
import heartFillIcon from "public/icons/shopdit-icon_heart-fill.svg";
import { CartContext, useAuth } from "src";
import { ProductDetailDrawer } from "./ProductDetailDrawer";
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
  const { openAuthModal, isAuth } = useAuth();
  const { products, addProduct, isInComparison, removeProduct } =
    useComparison();
  const intl = useIntl();
  const { cartData } = useContext(CartContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { product } = props;

  const [seeMore, setSeeMore] = useState(false);
  const [openOptionDrawer, setOpenOptionDrawer] = useState(false);
  const [customerProductFavoriteData, setCustomerProductFavoriteData] = useState(props?.customerProductFavorite);
  const [unit, setUnit] = useState(product?.unit);

  const productPrice = getProductItemsPrice(product?.productItems);

  const handleClickCompareBtn = () => {
    if (isInComparison(product)) {
      return removeProduct(product);
    }

    return addProduct(product);
  };

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
    if (!isAuth) {
      if (isDesktop) {
        openAuthModal();
      } else {
        router.push(routes.login());
      }
    } else {
      await resource.createResource("customer-product-favorite-public", {
        productId,
        status,
      });
      onFetchProductFavorite();
    }
  };

  const setOpenOptionDrawerOrLogin = () => {
    if (isAuth) {
      if (isDesktop) {
        router.push(routes.product({ slug: props.product.slug }));
      } else {
        setOpenOptionDrawer(true);
      }
    } else {
      if (isDesktop) {
        openAuthModal();
      } else {
        router.push(routes.login());
      }
    }
  }

  useEffect(() => {
    if (props?.customerProductFavorite) {
      setCustomerProductFavoriteData(props?.customerProductFavorite);
    }
  }, [props]);

  return (
    <DefaultLayout
      {...props}
      titleMeta={props.product?.name}
      descriptionMeta={props.product?.highlight}
      imageUrl={props.product?.productImages?.find((image) => image.order === 0)?.imageUpload?.url}
      onDisableLoading
      appBar={
        !isDesktop && (
          <MobileAppBar
            title={
              <Typography
                whiteSpace="nowrap"
                width="200px"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {props.product?.name}
              </Typography>
            }
            right={
              !isDesktop && <>
                <NextLink href={routes.cart()}>
                  <IconButton>
                    <CartIcon color="inherit" />
                  </IconButton>
                </NextLink>
                {
                  cartData?.cartItems?.length > 0 && (
                    <Box height="7px" width="7px" bgcolor="red.50" position="absolute" borderRadius="50%" right="26px" top="26px" />
                  )
                }
              </>
            }
          />
        )
      }
      footer={
        !isDesktop && (
          <Box
            p="16px"
            position="sticky"
            borderTop="1px solid"
            borderColor="grey.100"
            bottom="0"
            bgcolor="white"
          >
            <Button
              variant="contained"
              fullWidth
              disableElevation
              sx={{ py: "16px", borderRadius: "8px" }}
              onClick={() => setOpenOptionDrawerOrLogin()}
            >
              เพิ่มลงตระกร้า
            </Button>
          </Box>
        )}
    >
      <ProductDetailDrawer
        open={openOptionDrawer}
        onClose={() => setOpenOptionDrawer(false)}
        onOpen={() => setOpenOptionDrawer(true)}
        product={props.product}
        cart={props.cart}
      />
      <Box
        {...(isDesktop
          ? {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            mt: "80px",
            px: "8px",
            gap: "32px",
          }
          : {})}
      >
        <Box width={isDesktop ? "576px" : "100%"} pb="32px">
          <ProductDetailGallery images={props.product?.productImages} />
        </Box>

        <Box>
          <Typography variant="h1" component="h1" px={isDesktop ? "0" : "16px"} lineHeight={isDesktop ? "40px" : "30px"}>
            {props.product?.name}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            mt="12px"
            px={isDesktop ? "0" : "16px"}
          >
            {
              unit === product?.bigUnit ? (
                <Box display="flex" alignItems="center">
                  <Typography variant="h1" color="red.50" mr="8px">
                    <Typography variant="h1" component="span" fontFamily="Roboto">
                      ฿
                    </Typography>
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
                        <Typography variant="h1" component="span" fontFamily="Roboto">
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
                        <Typography variant="h1" component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(
                          productPrice?.minPrice?.priceOnDiscount,
                          {}
                        )}
                      </Typography>
                    )}
                  {
                    productPrice?.minPrice?.priceOnDiscount ===
                    productPrice?.maxPrice?.priceOnDiscount &&
                    productPrice?.minPrice?.discount &&
                    productPrice?.maxPrice?.discount ?
                      <Typography
                        variant="h1"
                        color="grey.100"
                        sx={{ textDecoration: "line-through" }}
                      >
                        <Typography variant="h1" component="span" fontFamily="Roboto">
                          ฿
                        </Typography>
                        {intl.formatNumber(productPrice?.minPrice?.price, {})}
                      </Typography>
                    : <></>
                  }
                  {productPrice?.minPrice?.priceOnDiscount !==
                    productPrice?.maxPrice?.priceOnDiscount && (
                      <Typography variant="h1" color="red.50" mr="8px">
                        <Typography variant="h1" component="span" fontFamily="Roboto">
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
              {isDesktop && (
                <CompareButton
                  active={isInComparison(product)}
                  onClick={handleClickCompareBtn}
                />
              )}
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
            px={isDesktop ? "0" : "16px"}
          >
            <Typography fontWeight="light" variant="h3" lineHeight="25px" sx={{
              whiteSpace: 'pre-wrap'
            }}>{props.product?.highlight}</Typography>
          </Box>
          {props?.product?.kind !== "set" && isDesktop && (
            <SingleProductDetailFormController
              productPrimaryOption={props.product?.productPrimaryOption}
              productSecondaryOption={props.product?.productSecondaryOption}
              units={[props.product?.unit, props.product?.bigUnit]}
              product={props.product}
              cart={props.cart}
              onChangeUnit={(unit: string) => setUnit(unit)}
            />
          )}
          {/* {props.product.isPackage && (
            <PackageProductDetailForm products={props.product.package} />
          )} */}
        </Box>
      </Box>
      {
        isDesktop ? (
          <Box
            py="40px"
            borderTop="1px solid"
            borderColor="grey.100"
            px={isDesktop ? "8px" : "16px"}
          >
            <Typography variant="h1" component="h2" pb="32px">
              {t("detail")}
            </Typography>
            <Box
              dangerouslySetInnerHTML={{
                __html: props.product?.description ?? "",
              }}
            ></Box>
          </Box>
        ) : (
          <>
            {seeMore && (
              <Box
                py="40px"
                borderTop="1px solid"
                borderColor="grey.100"
                px={isDesktop ? "8px" : "16px"}
              >
                <Typography variant="h1" component="h2" pb="32px">
                  {t("detail")}
                </Typography>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: props.product?.description ?? "",
                  }}
                ></Box>
              </Box>
            )}
            <Box
              display="flex"
              justifyContent="center"
              onClick={() => setSeeMore(!seeMore)}
              borderTop="1px solid"
              borderColor="grey.100"
            >
              <Box
                display="flex"
                alignItems="center"
                mx="auto"
                py="16px"
                color="primary.main"
              >
                <Typography mr="8px">
                  {!seeMore ? "ดูเพิ่มเติม" : "ดูน้อยลง"}
                </Typography>

                <ChevronDownIcon
                  sx={
                    seeMore
                      ? { transform: "rotate(180deg);", fontSize: "5px" }
                      : { fontSize: "5px" }
                  }
                />
              </Box>
            </Box>
          </>
        )
      }
      {props?.productsRelation &&
        props?.productsRelation?.length > 0 && (
          <Box py="40px" borderTop="1px solid" borderColor="grey.100" px="16px">
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h1" component="h2">
                {t("similarProducts")}
              </Typography>
            </Box>
            <Box display="flex" width="100%" overflow="scroll" mt="32px">
              {props.productsRelation?.map((product) => (
                <Box key={product.id} mr="32px">
                  <SummaryProductCard
                    height={isDesktop ? 240 : 168}
                    width={isDesktop ? 240 : 168}
                    {...product}
                    onClick={() => router.push(routes.product({ slug: product.slug }))}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
    </DefaultLayout>
  );
};
