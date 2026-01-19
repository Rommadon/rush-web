import {
  Modal,
  Box,
  IconButton,
  Typography,
  Divider,
  Button,
  Link,
} from "@mui/material";
import { FC } from "react";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import NextLink from 'next/link'
import Router from "next/router";

import { useComparison } from "../hooks";
import { CloseIcon, HeartOutlineIcon, routes } from "src/core";
import { truncateString } from "utils/truncate";
import { getProductItemsPrice } from "utils/calaulate";

const numbers = [0, 1, 2, 3];

export const ComparisonModal: FC<{}> = (props) => {
  const { isModalOpen, close, products } = useComparison();
  const t = useTranslations("product.comparisonModal");

  const onBuyClickProduct = (slug?: string) => {
    close();
    Router.push(`/products/${slug}`);
  }

  return (
    <Modal open={isModalOpen} onClose={close} sx={{ padding: "50px" }}>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          display: "flex",
          height: "100%",
          maxWidth: "1032 px",
          margin: "0 auto",
          bgcolor: "common.white",
          boxShadow: 24,
          borderRadius: "8px",
          overflowY: "scroll",
          padding: "20px"
        }}
      >
        <Box display="flex" justifyContent={"flex-end"}>
          <IconButton onClick={close}>
            <CloseIcon fill="common.black" />
          </IconButton>
        </Box>
        <Typography variant="h2" component="h2" textAlign="center">
          {t("title")}
        </Typography>
        <Divider sx={{ my: "32px" }} />
        <Box display="grid" gridTemplateColumns="repeat(5, 1fr)">
          <Box />
          {products?.map((product) => (
            <Box key={product.id} width="168px">
              <NextImage src={product?.productImages?.find((image) => image.order === 0)?.imageUpload?.url ?? ''} alt={product?.name ?? ''} width={336} height={336} />
              <Typography variant="h6" mt="16px">
                {truncateString(product?.name, 60)}
              </Typography>
              <Box display="flex" justifyContent="space-between" mt="16px">
                <Button
                  variant="contained"
                  disableElevation
                  sx={{ textTransform: "initial", width: "100%" }}
                  onClick={() => product?.slug && onBuyClickProduct(product?.slug)}
                >
                  {t("shopNow")}
                </Button>
              {/* <IconButton>
                  <HeartOutlineIcon color="primary" />
                </IconButton> */}
            </Box>
            </Box>
          ))}
      </Box>
      <Box
        mt="32px"
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)"
        p="32px"
        gap="16px"
        borderRadius="8px"
        bgcolor="rgba(229, 231, 235, 0.2)"
      >
        <Typography key="dqw" variant="h6">
          <Typography key="dqw" variant="h6" py="8px">
            {t('sku')}
          </Typography>
          <Typography key="dqw" variant="h6" py="8px">
            {t('price')}
          </Typography>
          <Typography key="dqw" variant="h6" py="8px">
            {t('category')}
          </Typography>
          <Typography key="dqw" variant="h6" py="8px">
            {t('unit')}
          </Typography>
          <Typography key="dqw" variant="h6" py="8px">
            {t('weight')}
          </Typography>
          <Typography key="dqw" variant="h6" py="8px">
            {t('dimension')}
          </Typography>
          <Typography key="dqw" variant="h6" py="8px">
            {t('set')}
          </Typography>
        </Typography>
        {
          products?.map((product) => (
            <Typography key="dqw" variant="h6">
              <Typography key="dqw" variant="h6" py="8px">
                {product?.slug ?? "-"}
              </Typography>
              <Typography key="dqw" variant="h6" py="8px">
                {getProductItemsPrice(product?.productItems)?.maxPrice?.priceOnDiscount === getProductItemsPrice(product?.productItems)?.minPrice?.priceOnDiscount ? (
                  `฿${getProductItemsPrice(product?.productItems)?.maxPrice?.priceOnDiscount}`
                ) : (
                  `฿${getProductItemsPrice(product?.productItems)?.minPrice?.priceOnDiscount} - ฿${getProductItemsPrice(product?.productItems)?.maxPrice?.priceOnDiscount}`
                ) ?? "-"
                }
              </Typography>
              <Typography key="dqw" variant="h6" py="8px">
                {product?.productCategory?.name ?? "-"}
              </Typography>
              <Typography key="dqw" variant="h6" py="8px">
                {product?.unit ?? "-"}
              </Typography>
              <Typography key="dqw" variant="h6" py="8px">
                {`${product?.weightSize} g.` ?? "-"}
              </Typography>
              <Typography key="dqw" variant="h6" py="8px">
                {`${product?.widthSize} cm x ${product?.lengthSize} cm x ${product?.heightSize} cm` ?? "-"}
              </Typography>
              {
                product?.packageProducts && product?.packageProducts?.length > 0 ? (
                  product?.packageProducts?.map((packageProduct, index) => (
                    <Box key={index}>
                      <Box
                        display="grid"
                        gap="8px"
                        gridTemplateColumns="repeat(3, 1fr)"
                      >
                        <NextImage
                          key={packageProduct?.product.id}
                          src={packageProduct?.product?.productImages?.find((image) => image.order === 0)?.imageUpload?.url ?? ""}
                          alt={packageProduct?.product?.name ?? ""}
                          width={50}
                          height={50}
                        />
                      </Box>
                      <Box display="flex" justifyContent="space-between" alignItems="end">
                        <Typography variant="h6">
                          {t('total')} <Typography component="span" variant="h6" color="primary">{products.length}</Typography> {t('item')}
                        </Typography>
                        <NextLink href={routes.product({ slug: packageProduct?.product?.name })}>
                          <a>
                            <Link fontSize="12px" color="common.black">{t('more')}</Link>
                          </a>
                        </NextLink>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography variant="h6" py="8px">
                    -
                  </Typography>
                )
              }
            </Typography>
          ))
        }
        {/* {[
            "sku",
            "price",
            "category",
            "unit",
            "weight",
            "dimension",
            "sizes",
            "color",
            "detail",
            "set",
          ].map((attr) => (
            <>
              <Typography variant="h6">{t(attr)}:</Typography>
              {numbers.map((n) => {
                // @ts-ignore
                let value = products?.[n]?.[attr];
                if (attr === "set") {
                  if (!value) {
                    return (
                      <Typography key={n} variant="h6">
                        -
                      </Typography>
                    );
                  }

                  return (
                    <Box key={n}>
                      <Box
                        display="grid"
                        gap="8px"
                        gridTemplateColumns="repeat(3, 1fr)"
                      >
                        {value?.map((product: Product) => (
                          <NextImage
                            key={product.id}
                            src={product?.image ?? ""}
                            alt={product?.name ?? ""}
                            width={50}
                            height={50}
                          />
                        ))}
                      </Box>
                      <Box display="flex" justifyContent="space-between" alignItems="end">
                        <Typography variant="h6">
                          {t('total')} <Typography component="span" variant="h6" color="primary">{products.length}</Typography> {t('item')}
                        </Typography>
                        <NextLink href={routes.product({ slug: products[n]?.name })}>
                          <a>
                            <Link fontSize="12px" color="common.black">{t('more')}</Link>
                          </a>
                        </NextLink>
                      </Box>
                    </Box>
                  );
                }

                if (Array.isArray(value)) {
                  value = value.join(", ");
                }

                return (
                  <Typography key={n} variant="h6">
                    {value ?? "-"}
                  </Typography>
                );
              })}
            </>
          ))} */}
      </Box>
    </Box>
    </Modal >
  );
};

export default ComparisonModal;
