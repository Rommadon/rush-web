import { FC, useState } from "react";
import {
  Box,
  Typography,
  Select,
  FormControl,
  MenuItem,
  TextField,
  ButtonGroup,
  Button,
  Modal,
} from "@mui/material";
import { useTranslations } from "next-intl";
import NextImage from "next/image";

import { Product } from "..";
import { ChevronRightIcon } from "../..";
import { SummaryProductCard } from "./SummaryProductCard";

export type PackageProductDetailFormProp = {
  products: Product[];
};

export const PackageProductDetailForm: FC<PackageProductDetailFormProp> = (
  props
) => {
  const t = useTranslations("productDetail");
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () =>
    quantity - 1 <= 0 ? null : setQuantity(quantity - 1);
  return (
    <>
      <Box maxWidth="576px">
        <Box borderBottom="1px solid" borderColor="grey.100" py="32px">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h3">{t("set")}:</Typography>
            <Box display="flex">
              <Typography variant="h3" mr="16px">
                {t("item", { item: "6" })}
              </Typography>
              <Box display="flex" onClick={handleOpen}>
                <Typography variant="h3" mr="12.5px">
                  {t("more")}
                </Typography>
                <ChevronRightIcon />
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            width="100%"
            height="239px"
            overflow="scroll"
            mt="32px"
          >
            {props.products?.map((product, index) => (
              <Box key={product.id} display="flex">
                {index > 0 && (
                  <Box px="17.5px" display="flex" alignItems="center">
                    <svg
                      width="22"
                      height="21"
                      viewBox="0 0 22 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.5 12H9.5V21H12.5V12H21.5V9H12.5V0H9.5V9H0.5V12Z"
                        fill="black"
                      />
                    </svg>
                  </Box>
                )}
                <Box width="184px" height="184px">
                  <NextImage  
                    src={product?.image || ''}
                    width={184}
                    height={184}
                    alt={product.name}
  unoptimized={true}
/>
                  <Typography variant="h3" mt="16px">
                    {product.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box display="flex" py="32px" color="grey.200">
          <ButtonGroup
            variant="outlined"
            disableElevation
            sx={{ width: "100%" }}
          >
            <Button onClick={decreaseQuantity} color="inherit">
              <svg
                width="14"
                height="3"
                viewBox="0 0 14 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 2.5H14V0.5H0V2.5Z" fill="black" />
              </svg>
            </Button>
            <TextField
              type="number"
              variant="outlined"
              sx={{ borderRadius: 0, textAlign: "center" }}
              value={quantity}
            />
            <Button onClick={increaseQuantity} color="inherit">
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 8.5H6V14.5H8V8.5H14V6.5H8V0.5H6V6.5H0V8.5Z"
                  fill="black"
                />
              </svg>
            </Button>
          </ButtonGroup>

          <Box width="16px" />

          <Button
            variant="contained"
            disableElevation
            color="primary"
            sx={{ borderRadius: "8px", width: "100%" }}
          >
            <Typography color="white" variant="h4">
              {t("addToCart")}
            </Typography>
          </Button>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "common.white",
            boxShadow: 24,
            p: "32px 32px 64px 32px",
            borderRadius: "8px",
          }}
        >
          <Box display="flex" justifyContent="flex-end" mb="10px" mr="22px">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.27 1.84005L16.43 0L9.135 7.29495L1.84005 0L0 1.84005L7.29495 9.135L0 16.43L1.84005 18.27L9.135 10.975L16.43 18.27L18.27 16.43L10.975 9.135L18.27 1.84005Z"
                fill="black"
              />
            </svg>
          </Box>
          <Typography variant="h2" textAlign="center">
            {t("packageModal.title", { item: props.products.length })}
          </Typography>
          <Box borderBottom="1px solid" borderColor="grey.100" my="32px"></Box>
          <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap="32px 16px">
            {props.products.map(product => <SummaryProductCard key={product.id} {...product} />)}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
