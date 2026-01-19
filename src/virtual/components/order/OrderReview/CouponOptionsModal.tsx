import { FC, useState, useEffect, useContext, SyntheticEvent } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Tab,
  Tabs,
  Modal,
} from "@mui/material";
import NextLink from "next/link";
import SwipeableViews from "react-swipeable-views";

import { AuthContext, CouponModel, MobileAppBar, OrderLayoutProps, routes } from "src";
import { CustomerCouponModel } from "src/order/models/CustomerCoupon";
import CouponItem from "../CouponItem";

export type CouponListProps = OrderLayoutProps & {
  coupons: CouponModel[];
  couponsInActive: CouponModel[];
  open: boolean;
  onClose: () => any;
  setValue: any;
  onSubmit: (coupon: CouponModel | null) => any;
};

export const CouponOptionsModal: FC<CouponListProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { profile } = useContext(AuthContext);
  const [activeCoupons, setActiveCoupons] = useState(props.coupons);
  const [inactiveCoupons, setInactiveCoupons] = useState(props.couponsInActive);
  const handleChange = (_: SyntheticEvent, newValue: number) =>
    setValue(newValue);
  const [value, setValue] = useState(0);
  const handleChangeIndex = setValue;

  useEffect(() => {
    if (props.coupons) {
      setActiveCoupons(props.coupons);
    }

    if (props.couponsInActive) {
      setInactiveCoupons(props.couponsInActive);
    }
  }, [props]);

  const onSelectedCoupon = (coupon: CouponModel) => {
    props.setValue('couponId', coupon?.id)
    props.onSubmit(coupon);
    props.onClose();
  }

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box bgcolor="white" height="100%" width="100%" overflow="scroll">
        <MobileAppBar title="คูปอง" onBackClick={props.onClose} />
        {!isDesktop && (
          <>
            <Box mb="24px" mt="32px" overflow="scroll">
              {activeCoupons?.map((coupon) => (
                <Box py="12px" px="20px" key={coupon.id}>
                  <CouponItem
                    {...coupon}
                    disableCheckbox
                    enableDetail
                    onClick={() => onSelectedCoupon(coupon)}
                  />
                </Box>
              ))}
            </Box>
          </>
        )}
        <Box position="sticky" bottom="0" m="auto" p="16px" border="1px solid" borderColor="grey.100" bgcolor="white" borderBottom="none" pb="0">
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
      </Box>
    </Modal>
  );
};

export default CouponOptionsModal;
