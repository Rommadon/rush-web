import {
  Modal,
  Box,
  TextField,
  IconButton,
  SvgIcon,
  InputAdornment,
  Typography,
  Slide,
} from "@mui/material";
import { FC, FormEventHandler, useState } from "react";
import NextImage from "next/image";
import NextLink from "next/link";
import router from "next/router";

import { ProductCategory, routes, SearchIcon, SearchInput } from "src";

export type ProductSearchModalProps = {
  open: boolean;
  onClose: () => any;
  historyKeywords: string[];
  onHistoryDelete: (keyword: string) => any;
  onHistoryDeleteAll: () => any;
  suggestedKeywords: string[];
  categories: ProductCategory[];
  onSubmit: (keyword: string) => any;
  onLoading: (value: boolean) => any;
};

export const ProductSearchModal: FC<ProductSearchModalProps> = (props) => {
  const [expand, setExpand] = useState(false);
  const [keyword, setKeyword] = useState('')

  const historyKeywords = expand
    ? props.historyKeywords
    : props.historyKeywords.slice(0, 3);

  const handleChange = (data: Record<string, any>) => {
    props.onClose();
    props.onLoading(true);
    props.onSubmit(data.search);
  }

  const onSelectCategory = (id: number) => {
    props.onClose();
    props.onLoading(true);
    router.push(routes.products({}, { productCategoryIds: id, selectedProductCategoryId: id })).then(() => {
      props.onLoading(false);
    })
  }

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      sx={{ padding: "50px" }}
      hideBackdrop
    >
      <Slide in={props.open} direction="right">
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            height: "100vh",
            width: "100vw",
            bgcolor: "common.white",
            overflowY: "scroll",
          }}
        >
          <Box display="flex" p="16px">
            <IconButton sx={{ mr: "16px" }} onClick={props.onClose}>
              <SvgIcon viewBox={"0 0 18 12"}>
                <path
                  d="M17.3282 4.99999V6.99999L4.49993 6.99999L7.74245 10.2425L6.32824 11.6567L0.671387 5.99987L6.32824 0.343018L7.74245 1.75723L4.4997 4.99999L17.3282 4.99999Z"
                />
              </SvgIcon>
            </IconButton>
            <SearchInput onSubmit={handleChange} value={keyword} shadow />
            {/* <IconButton sx={{ mr: "16px" }} onClick={props.onClose}>
              <SvgIcon viewBox={"0 0 18 12"}>
                <path
                  d="M17.3282 4.99999V6.99999L4.49993 6.99999L7.74245 10.2425L6.32824 11.6567L0.671387 5.99987L6.32824 0.343018L7.74245 1.75723L4.4997 4.99999L17.3282 4.99999Z"
                />
              </SvgIcon>
            </IconButton>

            <TextField
              fullWidth
              placeholder="ค้นหา"
              value={keyword}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-input': {
                  borderRadius: '8px'
                }
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
          {/* <Box display="flex" justifyContent="space-between" mt="16px" p="16px">
            <Typography fontSize="14px" fontWeight="600">
              ประวัติการค้นหา
            </Typography>
            <Typography
              fontSize="14px"
              color="grey.400"
              onClick={props.onHistoryDeleteAll}
            >
              ลบทั้งหมด
            </Typography>
          </Box>

          {historyKeywords.map((historyKeyword) => (
            <Box
              key={historyKeyword}
              display="flex"
              justifyContent="space-between"
              p="16px"
            >
              <Typography fontSize="14px" color="grey.400" onClick={() => props.onSubmit(historyKeyword)}>
                {historyKeyword}
              </Typography>
              <IconButton onClick={() => props.onHistoryDelete(historyKeyword)}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.15028 0.207469C0.889929 -0.0528803 0.467819 -0.0528803 0.207469 0.207469C-0.0528803 0.467819 -0.0528803 0.889929 0.207469 1.15028L4.05729 5.0001L0.207509 8.84988C-0.0528403 9.11023 -0.0528406 9.53234 0.207509 9.79269C0.467858 10.053 0.889969 10.053 1.15032 9.79269L5.0001 5.94291L8.84988 9.79269C9.11023 10.053 9.53234 10.053 9.79269 9.79269C10.053 9.53234 10.053 9.11023 9.79269 8.84988L5.94291 5.0001L9.79273 1.15028C10.0531 0.889929 10.0531 0.467819 9.79273 0.207469C9.53238 -0.0528803 9.11027 -0.0528803 8.84993 0.207469L5.0001 4.05729L1.15028 0.207469Z"
                    fill="#6B7280"
                  />
                </svg>
              </IconButton>
            </Box>
          ))} */}
          {/* {!expand && (
          <Typography
            fontSize="12px"
            textAlign="center"
            onClick={() => setExpand(true)}
            sx={{ textDecoration: "underline" }}
          >
            ดูเพิ่มเติม
          </Typography>
        )} */}
          {/* <Box
          pt="32px"
          px="16px"
          mt="16px"
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor="grey.100"
        >
          <Typography fontWeight="600" fontSize="14px">
            คำค้นหาแนะนำ
          </Typography>
          <Box display="flex" flexWrap="wrap" mt="32px">
            {props.suggestedKeywords.map((suggestedKeyword) => (
              <Box
                key={suggestedKeyword}
                p="8px 16px"
                bgcolor="#F0F3F9"
                mr="16px"
                mb="32px"
                borderRadius="24px"
              >
                <Typography fontSize="12px" onClick={() => props.onSubmit(suggestedKeyword)}>{suggestedKeyword}</Typography>
              </Box>
            ))}
          </Box>
        </Box> */}
          <Box p="16px">
            <Typography fontWeight="600">หมวดหมู่</Typography>
          </Box>
          <Box display="grid" gridTemplateColumns="1fr 1fr">
            {props.categories?.map((category, index) => (
              <Box
                key={category.id}
                display="flex"
                alignItems="center"
                p="16px"
                onClick={() => onSelectCategory(category.id)}
              >
                <Box
                  width="40px"
                  height="40px"
                  overflow="hidden"
                  borderRadius="8px"
                  mr="16px"
                >
                  <NextImage
                    src={category?.logo?.url ?? ""}
                    alt={category.name}
                    width={40}
                    height={40}
                  />
                </Box>

                <Typography fontSize="14px">{category.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};
