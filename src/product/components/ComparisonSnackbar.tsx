import { FC } from "react";
import { Snackbar, Typography, Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";

import { useComparison } from "../hooks";

export const ComparisonSnackbar: FC<{}> = (props) => {
  const t = useTranslations("product.comparisonSnackbar");
  const { products, close, maximumProduct, isModalOpen, open, reset } =
    useComparison();
  // console.log(products.length, { isModalOpen })
  return (
    <Snackbar
      open={products.length > 0 && !isModalOpen}
      autoHideDuration={null}
      onClose={close}
      sx={{ width: "100%" }}
    >
      <Box
        display="flex"
        bgcolor="common.black"
        mx="auto"
        px="24px"
        py="16px"
        maxWidth="1200px"
        width="100%"
        borderRadius="8px"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Typography color="white" mr="16px">{t("compare")}</Typography>
          <Box bgcolor="common.white" py="8px" px="16px" borderRadius="24px">
            <Typography>
              {products.length}/{maximumProduct}
            </Typography>
          </Box>
        </Box>

        <Box display="flex">
          <Button variant="contained" onClick={open}>
            {t("openModal")}
          </Button>
          <Button onClick={reset}>{t("reset")}</Button>
        </Box>
      </Box>
    </Snackbar>
  );
};

export default ComparisonSnackbar;
