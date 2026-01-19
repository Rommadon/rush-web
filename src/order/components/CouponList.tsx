import { FC, useState, useEffect, useContext, SyntheticEvent } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Tab,
  Tabs,
} from "@mui/material";
import NextLink from "next/link";
import SwipeableViews from "react-swipeable-views";

import CouponItem from "./CouponItem";
import OrderLayout, { OrderLayoutProps } from "./OrderLayout";
import { AuthContext, CouponIcon, EmptyList, routes } from "src";
import { CustomerCouponModel } from "../models/CustomerCoupon";

export type CouponListProps = OrderLayoutProps & {
  coupons: CustomerCouponModel[];
  couponsInActive: CustomerCouponModel[];
};

export const CouponList: FC<CouponListProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { profile } = useContext(AuthContext);
  const [activeCoupons, setActiveCoupons] = useState(props.coupons);
  const [inactiveCoupons, setInactiveCoupons] = useState(props.couponsInActive);

  useEffect(() => {
    if (props.coupons) {
      setActiveCoupons(props.coupons);
    }

    if (props.couponsInActive) {
      setInactiveCoupons(props.couponsInActive);
    }
  }, [props]);

  const handleChange = (_: SyntheticEvent, newValue: number) =>
    setValue(newValue);

  const [value, setValue] = useState(0);

  const handleChangeIndex = setValue;

  return (
    <OrderLayout
      {...props}
      title={`บัญชีของ ${profile?.fullName || profile?.tel | profile?.email}`}
      subtitle="คูปองที่ใช้ได้"
      footer={
        !isDesktop && (
          <Box position="sticky" bottom="0" m="auto" p="16px" border="1px solid" borderColor="grey.100" bgcolor="white">
            <NextLink href={routes.addCoupon()}>
              <Button
                variant="outlined"
                fullWidth
                sx={{ py: "16px", borderRadius: "8px" }}
              >
                <Typography variant="h4">เก็บคูปองเพิ่ม</Typography>
              </Button>
            </NextLink>
          </Box>
        )
      }
    >
      {isDesktop && (
        <>
          <Box mb="24px" mt="32px">
            {activeCoupons && activeCoupons.length > 0 ? (
              activeCoupons.map((coupon) => (
                <Box py="12px" key={coupon.coupon.id}>
                  <CouponItem
                    {...coupon.coupon}
                    disableCheckbox
                    enableDetail
                    onClick={() => null}
                  />
                </Box>
              ))
            ) : (
              <EmptyList text="ไม่พบคูปอง" icon={<CouponIcon fontSize="40px" color="#6B7280" />} />
            )}
          </Box>
          <NextLink href={routes.addCoupon()}>
            <Button
              variant="outlined"
              fullWidth
              sx={{ py: "16px", borderRadius: "8px", mb: "32px" }}
            >
              <Typography variant="h4">เก็บคูปองเพิ่ม</Typography>
            </Button>
          </NextLink>
          {inactiveCoupons && inactiveCoupons.length > 0 && (
            <Box
              mt="64px"
              mb="58px"
              pt="64px"
              borderTop="1px solid"
              borderColor="grey.100"
            >
              <Typography variant="h2" fontWeight="600" mb="32px">
                คูปองที่หมดอายุ
              </Typography>
              {inactiveCoupons && inactiveCoupons.length > 0 ? (
                inactiveCoupons.map((coupon) => (
                  <Box py="12px" key={coupon.coupon.id}>
                    <CouponItem
                      {...coupon.coupon}
                      disableCheckbox
                      enableDetail
                      inactive
                      onClick={() => null}
                    />
                  </Box>
                ))
              ) : (
                <EmptyList text="ไม่พบคูปอง" icon={<CouponIcon fontSize="40px" color="#6B7280" />} />
              )}
            </Box>
          )}
        </>
      )}
      {!isDesktop && (
        <>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label={"คูปองที่ใข้ได้"} />
            <Tab label={"ใช้แล้ว / หมดอายุ"} />
          </Tabs>
          <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
            {activeCoupons && activeCoupons.length > 0 ? (
              <Box mb="24px" mt="32px">
                {activeCoupons.map((coupon) => (
                  <Box py="12px" px="20px" key={coupon.coupon.id}>
                    <CouponItem
                      {...coupon.coupon}
                      disableCheckbox
                      enableDetail
                      onClick={() => null}
                    />
                  </Box>
                ))}
              </Box>
            ) : (
              <EmptyList text="ไม่พบคูปอง" icon={<CouponIcon fontSize="40px" color="#6B7280" />} />
            )}
            {inactiveCoupons && inactiveCoupons.length > 0 ? (
              <Box mb="24px" mt="32px">
                {inactiveCoupons &&
                  inactiveCoupons.length > 0 &&
                  inactiveCoupons.map((coupon) => (
                    <Box p="12px" key={coupon.coupon.id}>
                      <CouponItem
                        {...coupon.coupon}
                        disableCheckbox
                        enableDetail
                        inactive
                        onClick={() => null}
                      />
                    </Box>
                  ))}
              </Box>
            ) : (
              <EmptyList text="ไม่พบคูปอง" icon={<CouponIcon fontSize="40px" color="#6B7280" />} />
            )}
          </SwipeableViews>
        </>
      )}
    </OrderLayout>
  );
};

export default CouponList;
