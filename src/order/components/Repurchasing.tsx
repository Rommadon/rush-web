import { FC, useContext } from "react";
import { useTranslations } from "next-intl";
import { Typography, Box, Button, useMediaQuery } from "@mui/material";
import NextLink from "next/link"
import Image from "next/image";
import router from "next/router";

import { Product, SummaryProductCard } from "src/product";
import { SortByIcon, routes, EmptyList, ProductsIcon } from "src/core";
import { OrderLayout, OrderLayoutProps } from './OrderLayout'
import { AuthContext } from "src";
import cartIcon from "public/icons/shopdit-icon_cart.svg";
import heartIcon from "public/icons/shopdit-icon_heart.svg";


export type RepurchasingProps = OrderLayoutProps & {
  products: Product[];
};

export const Repurchasing: FC<RepurchasingProps> = (props) => {
  const t = useTranslations();
  const { profile } = useContext(AuthContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <OrderLayout
      {...props}
      title={`บัญชีของ ${profile?.fullName || profile?.tel || profile?.email}`}
      subtitle="ซื้ออีกครั้ง"
      right={
        <Box
          display="flex"
        >
          <NextLink href={routes.wishlist()}>
            <Box paddingLeft={"16px"}>
              <Image src={heartIcon} alt="heart icon" width="24px" height="24px" />
            </Box>
          </NextLink>
          <NextLink href={routes.cart()}>
            <Box paddingLeft={"16px"}>
              <Image src={cartIcon} alt="cart icon" width="24px" height="24px" />
            </Box>
          </NextLink>
        </Box>
      }
    // subtitleComponent={
    //   <Box display="flex" alignItems="center">
    //     <Typography>{props.products?.length ?? 0} รายการ</Typography>
    //     <Box height="24px" width="1px" bgcolor="grey.100" mx="32px"></Box>
    //     <Button color="inherit">
    //       <Typography mr="8px">เรียงลำดับ</Typography>
    //       <SortByIcon />
    //     </Button>
    //   </Box>
    // }
    >
      <Box
        position="fixed"
        p={"16px"}
        width="100%"
        zIndex="90"
        bgcolor="white"
        textAlign="right"
        m="auto"
      >
        {props.products.length} รายการ
      </Box>
      {props.products && props.products.length > 0 ? (
        <Box
          display="grid"
          gridTemplateColumns={isDesktop ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)'}
          gap="32px 16px"
          py={isDesktop ? "0" : "60px"}
          px="20px"
        >
          {
            props.products?.map((product, index) => (
              // @ts-ignore
              <Box key={product.slug}>
                <SummaryProductCard
                  {...product} width={isDesktop ? 202 : 160}
                  height={isDesktop ? 202 : 160}
                  onClick={() => router.push(routes.product({ slug: product.slug }))}
                />
              </Box>
            ))
          }
        </Box>
      ) : (
        <EmptyList text="ไม่พบรายการซื้ออีกครั้ง" icon={<ProductsIcon fontSize="40px" color="#6B7280" />} />
      )}
    </OrderLayout>
  );
};
