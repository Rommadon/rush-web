import { Typography, Box, IconButton, TextField, Button, CircularProgress, useMediaQuery } from "@mui/material";
import { FC, useState, useEffect } from "react";
import NextLink from "next/link";

import {
  DefaultLayoutProp,
  DefaultLayout,
  ChevronLeftIcon,
  routes,
  useResource,
  MobileAppBar
} from "src/core";
import { CouponModel } from "../models";
import { CouponItem } from "./CouponItem";
import Router from "next/router";

export type AddCouponListProps = DefaultLayoutProp & {
  coupons: CouponModel[];
};

export const AddCouponList: FC<AddCouponListProps> = (props) => {
  const [coupons, setCoupons] = useState(props.coupons || []);
  const [code, setCode] = useState('');
  const [onLoading, setOnLoading] = useState(false);
  const resource = useResource();

  useEffect(() => {
    if (props.coupons) {
      setCoupons(props.coupons);
    }
  }, [props])

  const onSearch = () => {
    setOnLoading(true);
    Router.push(`/me/coupons/add?code=${code}`).then(() => {
      setOnLoading(false);
    })
  }

  const onKeyPressSearch = (e: any) => {
    if(e.keyCode === 13){
      setOnLoading(true);
      Router.push(`/me/coupons/add?code=${code}`).then(() => {
        setOnLoading(false);
      })
    }
  }

  const onFetch = async () => {
    const fetchData = await resource.fetchResource(`/coupon-public/getAllWithOutCustomerKeep?code=${code || ''}`, {}, '');
    setCoupons(fetchData?.data);
  }

  const isDesktop = useMediaQuery("(min-width: 1024px)");


  return (
    <DefaultLayout {...props}
          appBar={!isDesktop && <MobileAppBar title="เก็บคูปองเพิ่ม" />}
    >
      <Box mt="80px" mb="58px">
        {isDesktop && <Box display="flex">
          <NextLink href={routes.coupon()}>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </NextLink>
          <Typography variant="h1" component="h1" pl="8px">
            เก็บคูปองเพิ่ม
          </Typography>
        </Box>}
        <Box maxWidth="720px" mx="auto" mt="48px" p="20px" pr="35px">
          <Box display="flex" pl="15px">
            <TextField
              placeholder="ค้นหา"
              sx={{ flex: 1 }}
              value={code}
              onChange={(code: any) => setCode(code.target.value)}
              onKeyDown={(e) => onKeyPressSearch(e)}
            />
            <Button
              variant="contained"
              disableElevation
              sx={{
                p: "12px",
                ml: "-8px",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0"
              }}
              onClick={() => onSearch()}
            >
              ค้นหา
            </Button>
          </Box>

          <Box mb="24px" mt="32px" width="100%">
            {!onLoading ?
              coupons?.map((coupon) => (
                <Box py="12px" key={coupon.id} width="100%">
                  <CouponItem
                    {...coupon}
                    disableCheckbox
                    enableDetail
                    onClick={() => null}
                    onKeep
                    onFetch={() => onFetch()}
                  />
                </Box>
              )) : (
                <Box textAlign="center">
                  <CircularProgress color="info" />
                </Box>
              )
            }
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default AddCouponList;
