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
import { getProductStock } from "../../../utils/calaulate";
import { FC, useEffect, useState, useContext } from "react";
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
  ProductsIcon,
} from "src/core";
import { ProductBrand, Product, ProductCategory } from "../models";
import { ProductSearchAccordion } from "./ProductSearchAccordion";
import { SummaryProductCard } from "./SummaryProductCard";
import { ProductSearchModal } from "./ProductSearchModal";
import { useResource, SearchInput, useAuth, CartContext } from "src";

export type ProductSearchProps = DefaultLayoutProp & {
  productCategories: ProductCategory[];
  productBrands: ProductBrand[];
  products: Product[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  query: {
    search: string;
    orderBy: string;
    productCategoryIds: string;
    productBrandIds: string;
    productCatalogIds: string;
    page: number | string;
    limit: number | string;
    tap?: number;
  };
};

export const ProductSearch: FC<ProductSearchProps> = (props) => {
  const t = useTranslations("productSearch");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const resource = useResource();
  const { isAuth } = useAuth();
  const { cartData } = useContext(CartContext);

  const [productCategoryIds, setProductCategoryIds] = useState([""]);
  const [productBrandIds, setProductBrandIds] = useState([""]);
  const [productCatalogIds, setProductCatalogIds] = useState([""]);
  const [orderBy, setOrderBy] = useState(props?.query?.orderBy);
  const [mode, setMode] = useState("category");
  const [productsData, setProductsData] = useState<Product[]>(
    props.products || []
  );
  const [page, setPage] = useState<number>(1);
  const [onLoading, setOnloading] = useState<boolean>(false);
  const [querySearch, setQuerySearch] = useState(props?.query?.search);
  const [sortByMobileOpen, setSortByMobileOpen] = useState(false);
  const [onDisableLoading, setOnDisableLoading] = useState(
    props?.onDisableLoading || false
  );

  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const onFetchData = async () => {
    const fetchProduct = await resource.fetchResource(
      `product-public?page=${page + 1 || props.query?.page || 1}&limit=${
        props.query?.limit || 10
      }${
        props.query?.productBrandIds
          ? `&productBrandIds=${props.query?.productBrandIds}`
          : ""
      }${
        props.query?.productCategoryIds
          ? `&productCategoryIds=${props.query?.productCategoryIds}`
          : ""
      }${
        props.query?.productCatalogIds
          ? `&productCatalogIds=${props.query?.productCatalogIds}`
          : ""
      }&search=${props?.query?.search || ""}&orderBy=${
        props?.query?.orderBy || "bestSeller"
      }`,
      {},
      ""
    );
    setPage(page + 1);
    setProductsData(productsData.concat(fetchProduct?.data?.data));
  };

  const handleChangeOrderby = (event: any) => {
    setOrderBy(event?.target?.value || event);
    setOnloading(true);
    setSortByMobileOpen(false);
    setOnDisableLoading(true);
    Router.push(
      `/products?page=${props.query?.page || 1}&limit=${
        props.query?.limit || 10
      }${
        props.query?.productBrandIds
          ? `&productBrandIds=${props.query?.productBrandIds || ""}`
          : ""
      }${
        props.query?.productCategoryIds !== ""
          ? `&productCategoryIds=${props.query?.productCategoryIds || ""}`
          : ""
      }${
        props.query?.productCatalogIds
          ? `&productCatalogIds=${props.query?.productCatalogIds}`
          : ""
      }${
        props.query?.selectedProductCategoryId
          ? `&selectedProductCategoryId=${props.query?.selectedProductCategoryId}`
          : ""
      }&search=${props?.query?.search || ""}&orderBy=${
        event?.target?.value || event || "bestSeller"
      }`
    ).then(() => {
      setOnloading(false);
      setOnDisableLoading(false);
    });
  };

  const onSelectProductCategory = (id: number) => {
    setOnloading(true);
    setOnDisableLoading(true);

    const productCategoryIdsData =
      productCategoryIds.filter((id) => id !== "") || [];

    if (
      productCategoryIdsData &&
      productCategoryIdsData.includes(id?.toString())
    ) {
      const index = productCategoryIdsData.indexOf(id?.toString());

      if (index > -1) {
        productCategoryIdsData.splice(index, 1);
      }

      setProductCategoryIds([...productCategoryIdsData]);
      const queryProductCategoryIds = productCategoryIdsData.join();

      Router.push(
        `/products?page=${props.query?.page || 1}&limit=${
          props.query?.limit || 10
        }${
          props.query?.productBrandIds
            ? `&productBrandIds=${props.query?.productBrandIds}`
            : ""
        }${
          queryProductCategoryIds !== ""
            ? `&productCategoryIds=${queryProductCategoryIds}`
            : ""
        }${
          props.query?.productCatalogIds
            ? `&productCatalogIds=${props.query?.productCatalogIds}`
            : ""
        }&search=${props?.query?.search || ""}&orderBy=${
          props?.query?.orderBy || "bestSeller"
        }`
      ).then(() => {
        setOnloading(false);
        setOnDisableLoading(false);
      });
    } else {
      productCategoryIdsData.push(id?.toString());
      setProductCategoryIds([...productCategoryIdsData]);
      const queryProductCategoryIds = productCategoryIdsData.join();

      Router.push(
        `/products?page=${props.query?.page || 1}&limit=${
          props.query?.limit || 10
        }${
          props.query?.productBrandIds
            ? `&productBrandIds=${props.query?.productBrandIds}`
            : ""
        }${
          queryProductCategoryIds !== ""
            ? `&productCategoryIds=${queryProductCategoryIds}`
            : ""
        }${
          props.query?.productCatalogIds
            ? `&productCatalogIds=${props.query?.productCatalogIds}`
            : ""
        }&search=${props?.query?.search || ""}&orderBy=${
          props?.query?.orderBy || "bestSeller"
        }`
      ).then(() => {
        setOnloading(false);
      });
    }
  };

  const onSelectProductBrand = (id: number) => {
    setOnloading(true);
    setOnDisableLoading(true);
    const productBrandIdsData = productBrandIds.filter((id) => id !== "") || [];

    if (productBrandIdsData && productBrandIdsData.includes(id?.toString())) {
      const index = productBrandIdsData.indexOf(id?.toString());

      if (index > -1) {
        productBrandIdsData.splice(index, 1);
      }

      setProductBrandIds([...productBrandIdsData]);
      const queryProductBrandIds = productBrandIdsData.join();

      Router.push(
        `/products?page=${props.query?.page || 1}&limit=${
          props.query?.limit || 10
        }${
          props.query?.productCategoryIds
            ? `&productCategoryIds=${props.query?.productCategoryIds}`
            : ""
        }${
          queryProductBrandIds !== ""
            ? `&productBrandIds=${queryProductBrandIds}`
            : ""
        }${
          props.query?.productCatalogIds
            ? `&productCatalogIds=${props.query?.productCatalogIds}`
            : ""
        }&search=${props?.query?.search || ""}&orderBy=${
          props?.query?.orderBy || "bestSeller"
        }`
      ).then(() => {
        setOnloading(false);
        setOnDisableLoading(false);
      });
    } else {
      productBrandIdsData.push(id?.toString());
      setProductBrandIds([...productBrandIdsData]);
      const queryProductBrandIds = productBrandIdsData.join();

      Router.push(
        `/products?page=${props.query?.page || 1}&limit=${
          props.query?.limit || 10
        }${
          props.query?.productCategoryIds
            ? `&productCategoryIds=${props.query?.productCategoryIds}`
            : ""
        }${
          queryProductBrandIds !== ""
            ? `&productBrandIds=${queryProductBrandIds}`
            : ""
        }${
          props.query?.productCatalogIds
            ? `&productCatalogIds=${props.query?.productCatalogIds}`
            : ""
        }&search=${props?.query?.search || ""}&orderBy=${
          props?.query?.orderBy || "bestSeller"
        }`
      ).then(() => {
        setOnloading(false);
        setOnDisableLoading(false);
      });
    }
  };

  const onSelectProductCatalog = (id: number) => {
    setOnloading(true);
    setOnDisableLoading(true);

    const productCatalogIdsData =
      productCatalogIds.filter((id) => id !== "") || [];

    if (
      productCatalogIdsData &&
      productCatalogIdsData.includes(id?.toString())
    ) {
      const index = productCatalogIdsData.indexOf(id?.toString());

      if (index > -1) {
        productCatalogIdsData.splice(index, 1);
      }

      setProductCatalogIds([...productCatalogIdsData]);
      const queryProductCatalogIds = productCatalogIdsData.join();

      Router.push(
        `/products?page=${props.query?.page || 1}&limit=${
          props.query?.limit || 10
        }${
          props.query?.productBrandIds
            ? `&productBrandIds=${props.query?.productBrandIds}`
            : ""
        }${
          props.query?.productCategoryIds
            ? `&productCategoryIds=${props.query?.productCategoryIds}`
            : ""
        }${
          queryProductCatalogIds !== ""
            ? `&productCatalogIds=${queryProductCatalogIds}`
            : ""
        }&search=${props?.query?.search || ""}&orderBy=${
          props?.query?.orderBy || "bestSeller"
        }`
      ).then(() => {
        setOnloading(false);
        setOnDisableLoading(false);
      });
    } else {
      productCatalogIdsData.push(id?.toString());
      setProductCatalogIds([...productCatalogIdsData]);
      const queryProductCatalogIds = productCatalogIdsData.join();

      Router.push(
        `/products?page=${props.query?.page || 1}&limit=${
          props.query?.limit || 10
        }${
          props.query?.productBrandIds
            ? `&productBrandIds=${props.query?.productBrandIds}`
            : ""
        }${
          props.query?.productCategoryIds
            ? `&productCategoryIds=${props.query?.productCategoryIds}`
            : ""
        }${
          queryProductCatalogIds !== ""
            ? `&productCatalogIds=${queryProductCatalogIds}`
            : ""
        }&search=${props?.query?.search || ""}&orderBy=${
          props?.query?.orderBy || "bestSeller"
        }`
      ).then(() => {
        setOnloading(false);
      });
    }
  };

  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (event: any, newCurrentTab: number) =>
    setCurrentTab(newCurrentTab);

  const [productSearchModalOpen, setProductSearchModalOpen] = useState(false);
  const [historyKeyword, setHistoryKeyword] = useState([
    "เดรสลูกไม้",
    "เสื้อแขนกุด",
    "ยีนส์",
    "กระโปรงเทนนิส",
    "รองเท้าแตะรัดส้น",
    "ยางรัดผม",
    "เครื่องประดับ",
  ]);

  const suggestedKeywords = [
    "เสื้อแขนกุด",
    "เดรส",
    "เสื้อคลุม",
    "ถุงเท้า",
    "เสื้อยืด",
    "กระโปรงเทนนิส",
    "รองเท้าแตะรัดส้น",
    "ยางรัดผม",
    "เครื่องประดับ",
    "กางเกงขาสั้น",
  ];

  const closeProductSearchModal = () => setProductSearchModalOpen(false);
  const openProductSearchModal = () => setProductSearchModalOpen(true);

  const deleteHistoryKeyword = (targetKeyword: string) =>
    setHistoryKeyword(
      historyKeyword.filter((keyword) => keyword !== targetKeyword)
    );
  const clearHistoryKeywords = () => setHistoryKeyword([]);

  const searchProducts = (keyword: string) => {
    closeProductSearchModal();
    setQuerySearch(keyword);
    Router.push(routes.products({}, { search: keyword })).then(() => {
      setOnloading(false);
    });
  };

  const searchProductsWithData = (data: Record<string, any>) => {
    setOnloading(true);
    setOnDisableLoading(true);
    setQuerySearch(data.search);
    Router.push(routes.products({}, { search: data.search })).then(() => {
      setOnloading(false);
      setOnDisableLoading(false);
    });
  };

  const openSortByMobile = () => setSortByMobileOpen(true);
  const closeSortByMobile = () => setSortByMobileOpen(false);

  useEffect(() => {
    if (props.query?.productCategoryIds) {
      const queryProductCategoryIds: string[] =
        props.query?.productCategoryIds?.split(",") || [];
      setProductCategoryIds([...queryProductCategoryIds]);
    }
  }, [props]);

  useEffect(() => {
    if (props.query?.productBrandIds) {
      const queryProductBrandIds: string[] =
        props.query?.productBrandIds?.split(",") || [];
      setProductBrandIds([...queryProductBrandIds]);
    }
  }, [props]);

  useEffect(() => {
    if (props.query?.productCatalogIds) {
      const queryProductCatalogIds: string[] =
        props.query?.productCatalogIds?.split(",") || [];
      setProductCatalogIds([...queryProductCatalogIds]);
    }
  }, [props]);

  useEffect(() => {
    if (props.products) {
      setProductsData(props.products);
    }
  }, [props.products]);

  useEffect(() => {
    if (props?.query?.tap && parseInt(props.query.tap) > 0) {
      setCurrentTab(parseInt(props.query.tap));

      if (parseInt(props.query.tap) === 1) {
        setMode("brand");
      }
    }
  }, [props?.query?.tap]);

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
            {props?.query?.search ? (
              <Box display="flex">
                <IconButton
                  sx={{ mr: "16px" }}
                  onClick={() => Router.push(routes.products())}
                >
                  <SvgIcon viewBox={"0 0 18 12"}>
                    <path d="M17.3282 4.99999V6.99999L4.49993 6.99999L7.74245 10.2425L6.32824 11.6567L0.671387 5.99987L6.32824 0.343018L7.74245 1.75723L4.4997 4.99999L17.3282 4.99999Z" />
                  </SvgIcon>
                </IconButton>
                <SearchInput
                  onSubmit={searchProductsWithData}
                  value={querySearch}
                  shadow
                />
                {/* <TextField
                  fullWidth
                  placeholder="ค้นหา"
                  value={querySearch}
                  onChange={(event) => setQuerySearch(event.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      borderRadius: "8px",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon color={"primary"} />
                      </InputAdornment>
                    ),
                  }}
                /> */}
              </Box>
            ) : props?.query?.selectedProductCategoryId ? (
              <>
                <Box flex="1">
                  <IconButton
                    sx={{ mr: "16px" }}
                    onClick={() => Router.push(routes.products())}
                  >
                    <SvgIcon viewBox={"0 0 18 12"}>
                      <path d="M17.3282 4.99999V6.99999L4.49993 6.99999L7.74245 10.2425L6.32824 11.6567L0.671387 5.99987L6.32824 0.343018L7.74245 1.75723L4.4997 4.99999L17.3282 4.99999Z" />
                    </SvgIcon>
                  </IconButton>
                </Box>
                <Typography textAlign="center">
                  {props.productCategories.find(
                    (category) =>
                      category.id === +props?.query?.selectedProductCategoryId
                  )?.name || "-"}
                </Typography>
              </>
            ) : (
              <>
                <Box flex="1">
                  <IconButton onClick={openProductSearchModal}>
                    <SearchIcon color={"black"} />
                  </IconButton>
                </Box>
                <Typography textAlign="center">สินค้าทั้งหมด</Typography>
              </>
            )}
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
              {cartData?.cartItems?.length > 0 && (
                <Box
                  height="7px"
                  width="7px"
                  bgcolor="red.100"
                  position="absolute"
                  borderRadius="50%"
                  right="22px"
                  top="26px"
                  border="1px solid #ffffff"
                />
              )}
            </Box>
          </Box>
        </AppBar>
      }
    >
      <ProductSearchModal
        open={productSearchModalOpen}
        historyKeywords={historyKeyword}
        suggestedKeywords={suggestedKeywords}
        onHistoryDelete={deleteHistoryKeyword}
        onHistoryDeleteAll={clearHistoryKeywords}
        onClose={closeProductSearchModal}
        categories={props.productCategories}
        onSubmit={searchProducts}
        onLoading={(value: boolean) => setOnloading(value)}
      />
      {!isDesktop &&
        !props?.query?.search &&
        props?.query?.selectedProductCategoryId === undefined && (
          <Box sx={{ borderBottom: 1, borderColor: "divider", pt: "73px" }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="inherit"
            >
              <Tab label="หมวดหมู่" onClick={() => setMode("category")} />
              <Tab label="แบรนด์" onClick={() => setMode("brand")} />
            </Tabs>
          </Box>
        )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          pt={isDesktop ? "0" : "32px"}
          sx={{
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {!isDesktop && (
            <>
              {mode === "category"
                ? (props.productCategories ?? []).map((category) => (
                    <Box
                      key={category.name}
                      bgcolor={
                        productCategoryIds &&
                        productCategoryIds.includes(category?.id?.toString())
                          ? "red.50"
                          : "grey.50"
                      }
                      borderRadius="24px"
                      mx="8px"
                      py={isDesktop ? "16px" : "8px"}
                      px={isDesktop ? "26.5px" : "16px"}
                      sx={{ cursor: "pointer", display: "inline-block" }}
                      onClick={() => onSelectProductCategory(category?.id)}
                    >
                      <Typography
                        variant="h3"
                        {...(isDesktop
                          ? {}
                          : {
                              fontSize: "12px !important",
                              fontWeight: "light",
                            })}
                        color={
                          productCategoryIds &&
                          productCategoryIds.includes(category?.id?.toString())
                            ? "whiteText.main"
                            : "blackText.main"
                        }
                      >
                        {category.name}
                      </Typography>
                    </Box>
                  ))
                : (props.productBrands ?? []).map((brand) => (
                    <Box
                      key={brand.name}
                      bgcolor={
                        productBrandIds &&
                        productBrandIds.includes(brand?.id?.toString())
                          ? "red.50"
                          : "grey.50"
                      }
                      borderRadius="24px"
                      mx="8px"
                      py={isDesktop ? "16px" : "8px"}
                      px={isDesktop ? "26.5px" : "16px"}
                      sx={{ cursor: "pointer", display: "inline-block" }}
                      onClick={() => onSelectProductBrand(brand?.id)}
                    >
                      <Typography
                        variant="h3"
                        {...(isDesktop
                          ? {}
                          : {
                              fontSize: "12px !important",
                              fontWeight: "light",
                            })}
                        color={
                          productBrandIds &&
                          productBrandIds.includes(brand?.id?.toString())
                            ? "whiteText.main"
                            : "blackText.main"
                        }
                      >
                        {brand.name}
                      </Typography>
                    </Box>
                  ))}
            </>
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          py="58px"
          {...(isDesktop ? {} : { pt: "20px" })}
        >
          {isDesktop && (
            <Box width="375px">
              <Typography variant="h2">{t("filter")}</Typography>
              <Box
                borderBottom="1px solid"
                borderColor="grey.100"
                height="40px"
              />
              <div>
                <ProductSearchAccordion summary={t("category")}>
                  <FormGroup>
                    {props.productCategories?.map((category) => (
                      <FormControlLabel
                        key={category.id}
                        control={
                          <Checkbox
                            checked={
                              productCategoryIds &&
                              productCategoryIds.includes(
                                category?.id?.toString()
                              )
                            }
                          />
                        }
                        label={category.name}
                        onChange={() => onSelectProductCategory(category.id)}
                      />
                    ))}
                  </FormGroup>
                </ProductSearchAccordion>
                <ProductSearchAccordion summary="แค็ตตาล็อก">
                  <FormGroup>
                    {props.catalogs?.map((productCatalog) => (
                      <FormControlLabel
                        key={productCatalog.id}
                        control={
                          <Checkbox
                            checked={
                              productCatalogIds &&
                              productCatalogIds.includes(
                                productCatalog?.id?.toString()
                              )
                            }
                          />
                        }
                        label={productCatalog.name}
                        onChange={() =>
                          onSelectProductCatalog(productCatalog.id)
                        }
                      />
                    ))}
                  </FormGroup>
                </ProductSearchAccordion>
                <ProductSearchAccordion summary={t("brand")}>
                  <FormGroup>
                    {props.productBrands?.map((brand) => (
                      <FormControlLabel
                        key={brand.id}
                        control={
                          <Checkbox
                            checked={
                              productBrandIds &&
                              productBrandIds.includes(brand?.id?.toString())
                            }
                          />
                        }
                        label={brand.name}
                        onChange={() => onSelectProductBrand(brand.id)}
                      />
                    ))}
                  </FormGroup>
                </ProductSearchAccordion>
              </div>
            </Box>
          )}
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
                    {t("foundItems", { result: props?.meta?.totalItems })}
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
                    {t("foundItems", { result: props?.meta?.totalItems })}
                  </Typography>
                </Box>
                <Box display="flex" flex="1" justifyContent="flex-end">
                  <Box
                    display="flex"
                    color="grey.400"
                    onClick={openSortByMobile}
                    justifyContent="flex-end"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.90365714,19.8034496 C6.81268627,19.9276666 6.66576323,20.008331 6.5,20.008331 C6.33423677,20.008331 6.18731373,19.9276666 6.09634286,19.8034496 L3.14644661,16.8535534 C2.95118446,16.6582912 2.95118446,16.3417088 3.14644661,16.1464466 C3.34170876,15.9511845 3.65829124,15.9511845 3.85355339,16.1464466 L6,18.2928932 L6,4.5 C6,4.22385763 6.22385763,4 6.5,4 C6.77614237,4 7,4.22385763 7,4.5 L7,18.2928932 L9.14644661,16.1464466 C9.34170876,15.9511845 9.65829124,15.9511845 9.85355339,16.1464466 C10.0488155,16.3417088 10.0488155,16.6582912 9.85355339,16.8535534 L6.90365714,19.8034496 L6.90365714,19.8034496 Z M12.5,6 C12.2238576,6 12,5.77614237 12,5.5 C12,5.22385763 12.2238576,5 12.5,5 L20.5,5 C20.7761424,5 21,5.22385763 21,5.5 C21,5.77614237 20.7761424,6 20.5,6 L12.5,6 Z M12.5,10 C12.2238576,10 12,9.77614237 12,9.5 C12,9.22385763 12.2238576,9 12.5,9 L18.5,9 C18.7761424,9 19,9.22385763 19,9.5 C19,9.77614237 18.7761424,10 18.5,10 L12.5,10 Z M12.5,14 C12.2238576,14 12,13.7761424 12,13.5 C12,13.2238576 12.2238576,13 12.5,13 L16.5,13 C16.7761424,13 17,13.2238576 17,13.5 C17,13.7761424 16.7761424,14 16.5,14 L12.5,14 Z M12.5,18 C12.2238576,18 12,17.7761424 12,17.5 C12,17.2238576 12.2238576,17 12.5,17 L14.5,17 C14.7761424,17 15,17.2238576 15,17.5 C15,17.7761424 14.7761424,18 14.5,18 L12.5,18 Z" />
                    </svg>
                    <Typography
                      ml="4px"
                      component="h4"
                      variant="h4"
                      fontWeight="light"
                      lineHeight="24px"
                    >
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
                      onClick={() => {}}
                      onKeyDown={() => {}}
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
                            <ListItemText
                              primary={text.text}
                              sx={{
                                fontWeight: "light",
                              }}
                            />
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
            {isDesktop &&
              (onLoading ? (
                <Box py="40px" textAlign="center">
                  <CircularProgress />
                </Box>
              ) : productsData && productsData.length > 0 ? (
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
                    gridTemplateColumns={
                      isDesktop ? "repeat(4, 1fr)" : "repeat(2, 45.5%)"
                    }
                    gap="32px 16px"
                    pt={isDesktop ? "40px" : "32px"}
                    px="16px"
                  >
                    {(productsData ?? []).map((product) => (
                      <>
                        {getProductStock(product.productItems) > 0 ? (
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
                        ) : (
                          <a onClick={() => Router.push(routes.product({ slug: product.slug }))}>
                            <SummaryProductCard
                              key={product.id}
                              {...product}
                              width={163}
                              height={163}
                            />
                          </a>
                        )}
                      </>
                    ))}
                  </Box>
                </InfiniteScroll>
              ) : (
                <EmptyList
                  text="ไม่พบสินค้า"
                  icon={<ProductsIcon fontSize="65px" color="#6B7280" />}
                />
              ))}
            {!isDesktop && (
              <SwipeableViews
                style={{ padding: "0 0 48px 0" }}
                index={currentTab}
                onChangeIndex={handleTabChange}
              >
                {onLoading ? (
                  <Box py="40px" textAlign="center">
                    <CircularProgress />
                  </Box>
                ) : productsData && productsData.length > 0 ? (
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
                          onClick={
                            getProductStock(product.productItems) > 0
                              ? () =>
                                  Router.push(
                                    routes.product({ slug: product.slug })
                                  )
                              : () => openRegisterPhoneModal(product)
                          }
                        />
                      ))}
                    </Box>
                  </InfiniteScroll>
                ) : (
                  <EmptyList
                    text="ไม่พบสินค้า"
                    icon={<ProductsIcon fontSize="40px" color="#6B7280" />}
                  />
                )}
                {onLoading ? (
                  <Box py="40px" textAlign="center">
                    <CircularProgress />
                  </Box>
                ) : productsData && productsData.length > 0 ? (
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
                          onClick={
                            getProductStock(product.productItems) > 0
                              ? () =>
                                  Router.push(
                                    routes.product({ slug: product.slug })
                                  )
                              : () => openRegisterPhoneModal(product)
                          }
                        />
                      ))}
                    </Box>
                  </InfiniteScroll>
                ) : (
                  <EmptyList
                    text="ไม่พบสินค้า"
                    icon={<ProductsIcon fontSize="40px" color="#6B7280" />}
                  />
                )}
              </SwipeableViews>
            )}
          </Box>
        </Box>
      </form>
    </DefaultLayout>
  );
};
