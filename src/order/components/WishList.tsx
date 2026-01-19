import { FC, useContext } from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import router from "next/router";

import { EmptyList, ProductsIcon, routes, SortByIcon } from 'src/core'
import { CustomerProductFavoriteModel, Product } from "src/product";
import OrderLayout, { OrderLayoutProps } from "./OrderLayout";
import { SummaryProductCard } from "src/product/components/SummaryProductCard";
import { AuthContext } from "src";

export type WishListProps = OrderLayoutProps & {
  customerProductFavorites: CustomerProductFavoriteModel[];
};

export const WishList: FC<WishListProps> = (props) => {
  const { profile } = useContext(AuthContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <OrderLayout
      {...props}
      title={`บัญชีของ ${profile?.fullName || profile?.tel || profile?.email}`}
      subtitle="สินค้าที่ชอบ"
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
        p={"16px"}
      >
        {props.customerProductFavorites.length} รายการ
      </Box>
      <Box pb="48px">
        {props.customerProductFavorites && props.customerProductFavorites.length > 0 ? (
          <Box
            display="grid"
            gridTemplateColumns={isDesktop ? "repeat(4, 1fr)" : "repeat(2, 1fr)"}
            gap="32px 4px"
            pt={"8px"}
            px="2px"
          >
            {props.customerProductFavorites?.map((customerProductFavorite, index) => (
              <Box key={customerProductFavorite.product.slug}>
                <SummaryProductCard
                  {...customerProductFavorite.product}
                  width={180} height={180}
                  onClick={() => router.push(routes.product({ slug: customerProductFavorite.product.slug }))}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <EmptyList text="ไม่พบสินค้า" icon={<ProductsIcon fontSize="40px" color="#6B7280" />} />
        )}
        {/* <Box
          display="flex"
        >
          {props.customerProductFavorites?.map((customerProductFavorite) => (
            <Box key={customerProductFavorite.product.id} flex="0 0 50%" px="16px">
              <NextLink
                key={customerProductFavorite.product.id}
                href={routes.product({ slug: customerProductFavorite.product.slug })}
              >
                <a>
                  <SummaryProductCard {...customerProductFavorite.product} width={160} height={160}/>
                </a>
              </NextLink>
            </Box>
          ))}
        </Box> */}
      </Box>
    </OrderLayout>
  );
};

export default WishList;
