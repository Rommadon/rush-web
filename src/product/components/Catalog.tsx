// @ts-nocheck

import {
  Box,
  SvgIcon,
  Typography,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  Select,
  MenuItem,
  AppBar,
  IconButton,
  Tabs,
  Tab,
  SwipeableDrawer,
  ListItem,
  List,
  ListItemText,
  CircularProgress,
  ListSubheader,
} from "@mui/material";
import React, { FC, useEffect, useState, useContext } from "react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import Router from "next/router";
import SwipeableViews from "react-swipeable-views";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  DefaultLayout,
  DefaultLayoutProp,
  routes,
  SearchIcon,
  CartIcon,
  HeartOutlineIcon,
  EmptyList,
  ProductsIcon
} from "src/core";
import { ProductBrand, Product, ProductCategory, Catalog } from "../models";
// import { ProductSearchAccordion } from "./ProductSearchAccordion";
import { SummaryProductCard } from "./SummaryProductCard";
// import { ProductSearchModal } from "./ProductSearchModal";
import { useResource, SearchInput, useAuth, CartContext } from "src";

export type CatalogProps = DefaultLayoutProp & {
  catalog: Catalog;
  products: Product[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  query: {
    orderBy: string;
    catalogIds: string;
    page: number | string;
    limit: number | string;
    tap?: number;
  };
};

export const CatalogComponent: FC<CatalogProps> = (props) => {
  const t = useTranslations("productSearch");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const resource = useResource();
  const { isAuth } = useAuth();
  const { cartData } = useContext(CartContext);

  const [orderBy, setOrderBy] = useState(props?.query?.orderBy);
  const [mode, setMode] = useState('category');
  const [productsData, setProductsData] = useState<Product[]>(
    props.products || []
  );
  const [page, setPage] = useState<number>(1);
  const [catalogId, setCatalogId] = useState(0);
  const [onLoading, setOnloading] = useState<boolean>(false);
  const [sortByMobileOpen, setSortByMobileOpen] = useState(false);
  const [onDisableLoading, setOnDisableLoading] = useState(props?.onDisableLoading || false);

  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (data: any) => console.log(data);

  console.log('Props', props)

  const onFetchData = async () => {
    const fetchProduct = await resource.fetchResource(
      `product-catalog-public?page=${page + 1 || props.query?.page || 1}&limit=${props.query?.limit || 10}&orderBy=${props?.query?.orderBy || "bestSeller"}`,
      {},
      ""
    );
    setPage(page + 1);
    setProductsData(productsData.concat(fetchProduct?.data?.productData?.product));
  };

  const handleChangeOrderby = (event: any) => {
    setOrderBy(event?.target?.value || event);
    setOnloading(true);
    setSortByMobileOpen(false);
    setOnDisableLoading(true);
    Router.push(
      `/products/catalog/${catalogId}?page=${props.query?.page || 1}&limit=${props.query?.limit || 10}&orderBy=${event?.target?.value || event || "bestSeller"}`
    ).then(() => {
      setOnloading(false);
      setOnDisableLoading(false);
    })
  };

  useEffect(() => {
    if (props.catalog) {
      setProductsData(props.catalog.productData.product.data);
      setCatalogId(props.catalog.productCatalogData.id)
    }
  }, [props.catalog]);

  const openSortByMobile = () => setSortByMobileOpen(true);
  const closeSortByMobile = () => setSortByMobileOpen(false);

  return (
    <DefaultLayout
      {...props}
      titleMeta="สินค้า"
      onDisableLoading
      appBar={
        <AppBar elevation={0} color="transparent">
          <Box
            display="flex"
            p="16px"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="white"
          >
            <Box flex="1">
              <IconButton
                sx={{ mr: "16px" }}
                onClick={() => Router.push('/')}
              >
                <SvgIcon viewBox={"0 0 18 12"}>
                  <path d="M17.3282 4.99999V6.99999L4.49993 6.99999L7.74245 10.2425L6.32824 11.6567L0.671387 5.99987L6.32824 0.343018L7.74245 1.75723L4.4997 4.99999L17.3282 4.99999Z" />
                </SvgIcon>
              </IconButton>
            </Box>
            <Typography textAlign="center">{props.catalog?.productCatalogData?.name}</Typography>
            <Box flex="1" display="flex" justifyContent="flex-end" ml="8px">
              <NextLink href={isAuth ? routes.wishlist() : routes.login()}>
                <IconButton>
                  <HeartOutlineIcon sx={{ fontSize: "20px" }} color={"black"} />
                </IconButton>
              </NextLink>
              <NextLink href={isAuth ? routes.cart() : routes.login()}>
                <IconButton>
                  <CartIcon sx={{ fontSize: "20px" }} color={"black"} />
                </IconButton>
              </NextLink>
              {
                cartData?.cartItems?.length > 0 && (
                  <Box height="7px" width="7px" bgcolor="red.100" position="absolute" borderRadius="50%" right="22px" top="26px" border="1px solid #ffffff" />
                )
              }
            </Box>
          </Box>
        </AppBar>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box pt={isDesktop ? "58px" : "50px"} sx={{
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          py="58px"
          {...(isDesktop ? {} : { pt: "20px" })}
        >
          <Box width="100%" px={isDesktop ? "24px" : "0"}>
            {isDesktop && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h2">{t("searchResult")}</Typography>
                <Box display="flex" alignItems="center">
                  <Typography component="h3" variant="h3" fontWeight="light">
                    {t("foundItems", { result: props?.catalog.productData.product.data.length })}
                  </Typography>
                  <Box
                    borderRight="1px solid"
                    borderColor="grey.100"
                    height="24px"
                    mx="32px"
                  ></Box>
                  <Box>
                    <Box display="flex">
                      <Typography mr="8px" fontSize="15px" fontWeight="light">
                        {t("sortBy")}
                      </Typography>
                      {/* <SortIcon /> */}
                    </Box>

                    <FormControl fullWidth>
                      <Select
                        onChange={handleChangeOrderby}
                        value={orderBy || "bestSeller"}
                        sx={{
                          height: "30px",
                          width: "150px",
                          fontSize: "15px",
                          fontWeight: "light",
                          marginTop: "4px",
                        }}
                      >
                        <MenuItem
                          key="bestSeller"
                          value="bestSeller"
                          sx={{
                            fontSize: "15px",
                            fontWeight: "light",
                          }}
                        >
                          สินค้าขายดี
                        </MenuItem>
                        <MenuItem
                          key="lasted"
                          value="lasted"
                          sx={{
                            fontSize: "15px",
                            fontWeight: "light",
                          }}
                        >
                          ล่าสุด
                        </MenuItem>
                        <MenuItem
                          key="default"
                          value="default"
                          sx={{
                            fontSize: "15px",
                            fontWeight: "light",
                          }}
                        >
                          เก่าไปใหม่
                        </MenuItem>
                        <MenuItem
                          key="lowPriceToHighPrice"
                          value="lowPriceToHighPrice"
                          sx={{
                            fontSize: "15px",
                            fontWeight: "light",
                          }}
                        >
                          ราคาต่ำไปสูง
                        </MenuItem>
                        <MenuItem
                          key="highPriceToLowPrice"
                          value="highPriceToLowPrice"
                          sx={{
                            fontSize: "15px",
                            fontWeight: "light",
                          }}
                        >
                          ราคาสูงไปต่ำ
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            )}

            {!isDesktop && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px="16px"
              // mt={props.query.search ? "36px" : "0px"}
              >
                <Box flex="1">
                  <Typography
                    fontWeight="light"
                    color="grey.400"
                    component="h4"
                    variant="h4"
                  >
                    {t("foundItems", { result: props?.catalog.productData.product.data.length })}
                  </Typography>
                </Box>
                <Box display="flex" flex="1" justifyContent="flex-end">
                  <Box
                    display="flex"
                    color="grey.400"
                    onClick={openSortByMobile}
                    justifyContent="flex-end"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M6.90365714,19.8034496 C6.81268627,19.9276666 6.66576323,20.008331 6.5,20.008331 C6.33423677,20.008331 6.18731373,19.9276666 6.09634286,19.8034496 L3.14644661,16.8535534 C2.95118446,16.6582912 2.95118446,16.3417088 3.14644661,16.1464466 C3.34170876,15.9511845 3.65829124,15.9511845 3.85355339,16.1464466 L6,18.2928932 L6,4.5 C6,4.22385763 6.22385763,4 6.5,4 C6.77614237,4 7,4.22385763 7,4.5 L7,18.2928932 L9.14644661,16.1464466 C9.34170876,15.9511845 9.65829124,15.9511845 9.85355339,16.1464466 C10.0488155,16.3417088 10.0488155,16.6582912 9.85355339,16.8535534 L6.90365714,19.8034496 L6.90365714,19.8034496 Z M12.5,6 C12.2238576,6 12,5.77614237 12,5.5 C12,5.22385763 12.2238576,5 12.5,5 L20.5,5 C20.7761424,5 21,5.22385763 21,5.5 C21,5.77614237 20.7761424,6 20.5,6 L12.5,6 Z M12.5,10 C12.2238576,10 12,9.77614237 12,9.5 C12,9.22385763 12.2238576,9 12.5,9 L18.5,9 C18.7761424,9 19,9.22385763 19,9.5 C19,9.77614237 18.7761424,10 18.5,10 L12.5,10 Z M12.5,14 C12.2238576,14 12,13.7761424 12,13.5 C12,13.2238576 12.2238576,13 12.5,13 L16.5,13 C16.7761424,13 17,13.2238576 17,13.5 C17,13.7761424 16.7761424,14 16.5,14 L12.5,14 Z M12.5,18 C12.2238576,18 12,17.7761424 12,17.5 C12,17.2238576 12.2238576,17 12.5,17 L14.5,17 C14.7761424,17 15,17.2238576 15,17.5 C15,17.7761424 14.7761424,18 14.5,18 L12.5,18 Z" />
                    </svg>
                    <Typography ml="4px" component="h4" variant="h4" fontWeight="light" lineHeight="24px">
                      {t("sortBy")}
                    </Typography>
                  </Box>
                  <SwipeableDrawer
                    anchor={"bottom"}
                    open={sortByMobileOpen}
                    onClose={closeSortByMobile}
                    onOpen={openSortByMobile}
                  >
                    <Box
                      sx={{
                        width: "auto",
                      }}
                      role="presentation"
                      onClick={() => { }}
                      onKeyDown={() => { }}
                    >
                      <List subheader={<ListSubheader>เรียงตาม</ListSubheader>}>
                        {[
                          { text: "สินค้าขายดี", value: "bestSeller" },
                          { text: "ล่าสุด", value: "lasted" },
                          { text: "เก่าไปใหม่", value: "default" },
                          {
                            text: "ราคาต่ำไปสูง",
                            value: "lowPriceToHighPrice",
                          },
                          {
                            text: "ราคาสูงไปต่ำ",
                            value: "highPriceToLowPrice",
                          },
                        ].map((text, index) => (
                          <ListItem
                            key={text.text}
                            onClick={() => handleChangeOrderby(text.value)}
                            value={text.value}
                          >
                            <ListItemText primary={text.text} sx={{
                              fontWeight: 'light'
                            }} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </SwipeableDrawer>

                  {/* <FormControl fullWidth>
                    <Select
                      onChange={handleChangeOrderby}
                      value={orderBy || "lasted"}
                      sx={{
                        height: "30px",
                        width: "150px",
                        fontSize: "15px",
                        fontWeight: "light",
                        marginTop: "4px",
                      }}
                    >
                      <MenuItem
                        key="lasted"
                        value="lasted"
                        sx={{
                          fontSize: "15px",
                          fontWeight: "light",
                        }}
                      >
                        ล่าสุด
                      </MenuItem>
                      <MenuItem
                        key="lowPriceToHighPrice"
                        value="lowPriceToHighPrice"
                        sx={{
                          fontSize: "15px",
                          fontWeight: "light",
                        }}
                      >
                        ราคาต่ำไปสูง
                      </MenuItem>
                      <MenuItem
                        key="highPriceToLowPrice"
                        value="highPriceToLowPrice"
                        sx={{
                          fontSize: "15px",
                          fontWeight: "light",
                        }}
                      >
                        ราคาสูงไปต่ำ
                      </MenuItem>
                    </Select>
                  </FormControl> */}
                </Box>
              </Box>
            )}
            {isDesktop && (
              onLoading ? (
                <Box py="40px" textAlign="center" >
                  <CircularProgress />
                </Box>
              ) : (
                productsData && productsData.length > 0 ? (
                  <InfiniteScroll
                    dataLength={productsData.length}
                    next={onFetchData}
                    hasMore={productsData.length !== props.catalog.productData.product.meta?.totalItems}
                    loader={
                      <p style={{ textAlign: "center" }}>
                        <CircularProgress />
                      </p>
                    }
                  >
                    <Box
                      display="grid"
                      gridTemplateColumns={
                        isDesktop ? "repeat(4, 1fr)" : "repeat(2, 45.5%)"
                      }
                      gap="32px 16px"
                      pt={isDesktop ? "40px" : "32px"}
                      px="16px"
                    >
                      {(productsData ?? []).map((product) => (
                        <NextLink
                          key={product.id}
                          href={routes.product({ slug: product.slug })}
                        >
                          <a>
                            <SummaryProductCard
                              key={product.id}
                              {...product}
                              width={163}
                              height={163}
                            />
                          </a>
                        </NextLink>
                      ))}
                    </Box>
                  </InfiniteScroll>
                ) : (
                  <EmptyList text="ไม่พบสินค้า" icon={<ProductsIcon fontSize="65px" color="#6B7280" />} />
                )
              )
            )}
            {!isDesktop && (
              <SwipeableViews
                style={{ padding: "0 0 48px 0" }}
              >
                {onLoading ? (
                  <Box py="40px" textAlign="center">
                    <CircularProgress />
                  </Box>
                ) : (
                  productsData && productsData.length > 0 ? (
                    <InfiniteScroll
                      dataLength={productsData.length}
                      next={onFetchData}
                      hasMore={productsData.length !== props.catalog.productData.product.meta?.totalItems}
                      loader={
                        <p style={{ textAlign: "center" }}>
                          <CircularProgress />
                        </p>
                      }
                    >
                      <Box
                        display="grid"
                        gridTemplateColumns={"repeat(2, 45.5%)"}
                        gap="32px 16px"
                        pt={"32px"}
                        px="16px"
                        justifyContent="space-between"
                      >
                        {(productsData ?? []).map((product) => (
                          <SummaryProductCard
                            key={product.id}
                            {...product}
                            width="100%"
                            height={163}
                            onClick={() => Router.push(routes.product({ slug: product.slug }))}
                          />
                        ))}
                      </Box>
                    </InfiniteScroll>
                  ) : (
                    <EmptyList text="ไม่พบสินค้า" icon={<ProductsIcon fontSize="40px" color="#6B7280" />} />
                  )
                )}
                {/* {onLoading ? (
                  <Box py="40px" textAlign="center">
                    <CircularProgress />
                  </Box>
                ) : (
                  productsData && productsData.length > 0 ? (
                    <InfiniteScroll
                      dataLength={productsData.length}
                      next={onFetchData}
                      hasMore={productsData.length !== props.meta?.totalItems}
                      loader={
                        <p style={{ textAlign: "center" }}>
                          <CircularProgress />
                        </p>
                      }
                    >
                      <Box
                        display="grid"
                        gridTemplateColumns={"repeat(2, 45.5%)"}
                        gap="32px 16px"
                        pt={"32px"}
                        px="16px"
                        justifyContent="space-between"
                      >
                        {(productsData ?? []).map((product) => (
                          <SummaryProductCard
                            key={product.id}
                            {...product}
                            width="100%"
                            height={163}
                            onClick={() => Router.push(routes.product({ slug: product.slug }))}
                          />
                        ))}
                      </Box>
                    </InfiniteScroll>
                  ) : (
                    <EmptyList text="ไม่พบสินค้า" icon={<ProductsIcon fontSize="40px" color="#6B7280" />} />
                  )
                )} */}
              </SwipeableViews>
            )}
          </Box>
        </Box>
      </form>
    </DefaultLayout >
  );
};
