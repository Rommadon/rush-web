import { FC, useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  FormControl,
  MenuItem,
  Button,
  SelectChangeEvent,
  CircularProgress,
  useMediaQuery,
  SwipeableDrawer,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { ProductPrimaryOption } from "../../../models/productPrimaryOption";
import { ProductSecondaryOption } from "../../../models/productSecondaryOption";
import { QuantityInput } from "../../QuantityInput";
import { Product } from "src/product/models";
import {
  Control,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormGetValues,
} from "react-hook-form";
import { AuthContext } from "src";
import Image from "next/image";
import phoneIcon from "public/icons/phone.svg";
import chatIcon from "public/icons/chat.svg";

export type SingleProductDetailFormProp = {
  productPrimaryOption?: ProductPrimaryOption;
  productSecondaryOption?: ProductSecondaryOption;
  units: string[];
  product: Product;
  control: Control<{}, object>;
  handleSubmit: UseFormHandleSubmit<{}>;
  register: UseFormRegister<{}>;
  watch: any;
  getValues: UseFormGetValues<{}>;
  setValue: any;
  errors: any;
  onSubmit: (data: any) => Promise<void>;
  onLoading: boolean;
  onSelectedProductItem?: (data: any) => any;
  onChangeUnit?: (unit: any) => any;
};

export const SingleProductDetailForm: FC<SingleProductDetailFormProp> = (
  props
) => {
  const t = useTranslations("productDetail");
  const { currentMerchant } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState(props.product?.unit);
  const [productPrimaryOptionValue, setProductPrimaryOptionValue] = useState(
    props?.product?.productPrimaryOption?.options[0] || null
  );
  const [productSecondaryOptionValue, setProductSecondaryOptionValue] =
    useState(props?.product?.productSecondaryOption?.options[0] || null);
  const [productItem, setProducItem] = useState(
    props?.product?.productItems ? props?.product?.productItems[0] : null
  );
  const [isShowContact, setIsShowContact] = useState(false);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () =>
    quantity - 1 <= 0 ? null : setQuantity(quantity - 1);

  const handleChangeUnit = (event: SelectChangeEvent) => {
    setUnit(event.target.value);
  };

  const handleChangeProductPrimaryOptionValue = (value: string) => {
    setProductPrimaryOptionValue(value);
  };

  const handleChangeProductSecondaryOptionValue = (value: string) => {
    setProductSecondaryOptionValue(value);
  };

  useEffect(() => {
    if (quantity) {
      props.setValue("quantity", quantity);
    }
  }, [props, quantity]);

  useEffect(() => {
    if (unit) {
      props.setValue("unit", unit);

      if (props.onChangeUnit) {
        props.onChangeUnit(unit);
      }
    }
  }, [props, unit]);

  useEffect(() => {
    if (productItem && props.onSelectedProductItem) {
      const item = props.product?.productItems?.find(
        (item) => item.id === productItem.id
      );
      props.onSelectedProductItem(item);
    }
  }, [productItem]);

  useEffect(() => {
    if (productPrimaryOptionValue || productSecondaryOptionValue) {
      const productItem = props.product?.productItems?.find(
        (item) =>
          productPrimaryOptionValue === item.primaryOptionsValue &&
          productSecondaryOptionValue === item.secondaryOptionsValue
      );
      setProducItem(productItem || null);
      props.setValue("productItemId", productItem?.id);
    } else {
      const productItem = props.product?.productItems?.find(
        (item) =>
          productPrimaryOptionValue === item.primaryOptionsValue &&
          productSecondaryOptionValue === item.secondaryOptionsValue
      );
      setProducItem(productItem || null);
      props.setValue("productItemId", productItem?.id);
    }
  }, [productPrimaryOptionValue, productSecondaryOptionValue]);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
      {props?.productPrimaryOption && (
        <Box
          borderBottom="1px solid"
          borderColor="grey.100"
          py={isDesktop ? "32px" : "16px"}
        >
          <Typography variant="h3">
            {props.productPrimaryOption?.name}
          </Typography>
          <Box
            display="flex"
            mt={isDesktop ? "24px" : "12px"}
            color="grey.100"
            overflow="auto"
            sx={{
              overflowX: "scroll",
              overflowY: "hidden",
              scrollSnapType: "x mandatory",
              maxWidth: "576px",
            }}
          >
            {props.productPrimaryOption?.options?.map((value) => {
              if (value !== "") {
                return (
                  <Button
                    type="button"
                    color="inherit"
                    variant="outlined"
                    key={value}
                    sx={{
                      mr: "24px",
                      border:
                        value === productPrimaryOptionValue
                          ? "1px solid #DE005E"
                          : "",
                      minWidth: "auto",
                      scrollSnapAlign: "start",
                    }}
                    onClick={() => handleChangeProductPrimaryOptionValue(value)}
                  >
                    <Typography
                      color="black"
                      whiteSpace="nowrap"
                      fontWeight="light"
                      variant="h4"
                    >
                      {value}
                    </Typography>
                  </Button>
                );
              }
            })}
          </Box>
        </Box>
      )}
      {props?.productSecondaryOption && (
        <Box borderBottom="1px solid" borderColor="grey.100" py="32px">
          <Typography variant="h3">
            {props.productSecondaryOption?.name}
          </Typography>
          <Box
            display="flex"
            mt={isDesktop ? "24px" : "12px"}
            color="grey.100"
            sx={{
              overflowX: "scroll",
              overflowY: "hidden",
              scrollSnapType: "x mandatory",
              maxWidth: "576px",
            }}
          >
            {props.productSecondaryOption?.options?.map((value) => (
              <>
                <Button
                  type="button"
                  color="inherit"
                  variant="outlined"
                  key={value}
                  sx={{
                    mr: "24px",
                    border:
                      value === productSecondaryOptionValue
                        ? "1px solid #DE005E"
                        : "",
                    minWidth: "auto",
                  }}
                  onClick={() => handleChangeProductSecondaryOptionValue(value)}
                >
                  <Typography color="black" fontWeight="light" variant="h4">
                    {value}
                  </Typography>
                </Button>
                <Box width="24px" />
              </>
            ))}
          </Box>
        </Box>
      )}
      {isDesktop && (
        <Box
          key="stock"
          my="8px"
          borderBottom="1px solid"
          borderColor="grey.100"
        >
          {productItem?.stock?.remaining &&
          productItem?.stock?.remaining > 0 ? (
            <>
              <Typography variant="h3" mt={isDesktop ? "24px" : "12px"}>
                {t("stockRemaining")}
              </Typography>
              <Box width="100%" my={isDesktop ? "24px" : "12px"}>
                <Typography variant="h4">
                  {productItem?.stock?.remaining} {props?.product?.unit}
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h3" mt={isDesktop ? "24px" : "12px"}>
                {t("stockRemaining")}
              </Typography>
              <Box width="100%" my={isDesktop ? "24px" : "12px"}>
                <Typography variant="h4" color="red.100">
                  สินค้าหมด
                </Typography>
              </Box>
            </>
          )}
        </Box>
      )}
      {isDesktop && (
        <Box display="flex" py="32px" color="grey.200">
          <QuantityInput
            onDecrease={decreaseQuantity}
            onIncrease={increaseQuantity}
            onSetQuantity={(value) => setQuantity(value)}
            quantity={quantity}
            disabledValue={productItem?.stock?.remaining}
            onValidateDisableValue={productItem?.stock?.onValidateStock}
            onBigUnit={unit === props?.product?.bigUnit}
            bigUnitValue={props?.product?.piecePerBigUnit}
          />

          <Box width="16px" />

          <FormControl fullWidth>
            <Select onChange={handleChangeUnit} value={unit}>
              {props.units?.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box width="16px" />

          {productItem?.stock?.remaining !== undefined &&
          productItem?.stock?.remaining < 1 ? (
            <Button
              variant="contained"
              disableElevation
              color="info"
              type="button"
              disabled={props.onLoading}
              onClick={() => setIsShowContact(true)}
              sx={{ borderRadius: "8px", width: "100%" }}
            >
              {props.onLoading ? (
                <CircularProgress color="info" />
              ) : (
                <Typography color="white" variant="h4">
                  ติดต่อเรา
                </Typography>
              )}
            </Button>
          ) : (
            <Button
              variant="contained"
              disableElevation
              color="primary"
              type="submit"
              disabled={
                props.onLoading ||
                (productItem?.stock?.remaining !== undefined &&
                  productItem?.stock?.remaining < 1) ||
                false
              }
              sx={{ borderRadius: "8px", width: "100%" }}
            >
              {props.onLoading ? (
                <CircularProgress color="info" />
              ) : (
                <Typography color="white" variant="h4">
                  {productItem?.stock?.remaining !== undefined &&
                  productItem?.stock?.remaining < 1
                    ? t("outOfStock")
                    : t("addToCart")}
                </Typography>
              )}
            </Button>
          )}
        </Box>
      )}
      {!isDesktop && (
        <>
          <Box display="flex" py="16px" color="grey.200" alignItems="center">
            <Box flex="3">
              <Typography color="black">หน่วย</Typography>
            </Box>
            <Box display="flex" flex="1">
              <FormControl fullWidth>
                <Select
                  onChange={handleChangeUnit}
                  value={unit}
                  disabled={props.units && props.units.length === 1}
                  sx={{ height: "35px" }}
                >
                  {props.units?.map((unit) => {
                    if (unit !== "") {
                      return (
                        <MenuItem key={unit} value={unit}>
                          <Typography fontWeight="light">{unit}</Typography>
                        </MenuItem>
                      );
                    }
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box display="flex" py="16px" color="grey.200" alignItems="center">
            <Box flex="3">
              <Typography color="black">จำนวน</Typography>
            </Box>
            <Box display="flex" flex="1">
              <QuantityInput
                onDecrease={decreaseQuantity}
                onIncrease={increaseQuantity}
                onSetQuantity={(value) => setQuantity(value)}
                quantity={quantity}
                disabledValue={productItem?.stock?.remaining}
                onValidateDisableValue={productItem?.stock?.onValidateStock}
                onBigUnit={unit === props?.product?.bigUnit}
                bigUnitValue={props?.product?.piecePerBigUnit}
                height="35px"
              />
            </Box>
          </Box>
          {productItem?.stock?.remaining !== undefined &&
          productItem?.stock?.remaining <= 0 ? (
            <Button
              variant="contained"
              disableElevation
              color="info"
              type="button"
              onClick={() => setIsShowContact(true)}
              disabled={props.onLoading}
              fullWidth
              sx={{ borderRadius: "8px", py: "16px" }}
            >
              {props.onLoading ? (
                <CircularProgress color="info" />
              ) : (
                <Typography color="white" variant="h4">
                  ติดต่อเรา
                </Typography>
              )}
            </Button>
          ) : (
            <Button
              variant="contained"
              disableElevation
              color="primary"
              type="submit"
              disabled={
                props.onLoading ||
                (productItem?.stock?.remaining !== undefined &&
                  productItem?.stock?.remaining <= 0) ||
                false
              }
              fullWidth
              sx={{ borderRadius: "8px", py: "16px" }}
            >
              {props.onLoading ? (
                <CircularProgress color="info" />
              ) : (
                <Typography color="white" variant="h4">
                  {productItem?.stock?.remaining !== undefined &&
                  productItem?.stock?.remaining <= 0
                    ? t("outOfStock")
                    : t("addToCart")}
                </Typography>
              )}
            </Button>
          )}
        </>
      )}
      <SwipeableDrawer
        anchor={"bottom"}
        open={isShowContact}
        onClose={() => setIsShowContact(false)}
        onOpen={() => setIsShowContact(true)}
      >
        <Box
          textAlign="center"
          display={"flex"}
          alignItems={"center"}
          margin={3}
          marginBottom={5}
          flexDirection={"column"}
        >
          <Typography variant="h3" marginBottom={4}>
            ติดต่อเรา
          </Typography>
          {currentMerchant?.data?.tel && (
            <Box
              border={"1px solid #000000"}
              borderRadius="16px"
              width={"70%"}
              p="8px 16px"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              marginBottom={2}
              onClick={() => {
                window.open(
                  `tel: +66${currentMerchant?.data?.tel
                    .slice(1)
                    .split(" ")
                    .join("")}`,
                  "_blank"
                );
              }}
              sx={{ cursor: "pointer" }}
            >
              <Box>
                <Image src={phoneIcon} alt="chat icon" />
              </Box>
              <Typography variant="h4">{currentMerchant?.data?.tel}</Typography>
              <Box></Box>
            </Box>
          )}
          {currentMerchant?.data?.chatContract && (
            <Box
              border={"1px solid #000000"}
              borderRadius="16px"
              width={"70%"}
              p="8px 16px"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              onClick={() => {
                window.open(
                  "https://" +
                    currentMerchant?.data?.chatContract
                      .replace("https://", "")
                      .replace("http://", ""),
                  "_blank"
                );
              }}
              sx={{ cursor: "pointer" }}
            >
              <Box>
                <Image src={chatIcon} alt="phone icon" />
              </Box>
              <Typography variant="h4">Chat</Typography>
              <Box></Box>
            </Box>
          )}
        </Box>
      </SwipeableDrawer>
    </form>
  );
};
