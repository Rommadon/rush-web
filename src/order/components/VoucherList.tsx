import { FC, useState, useEffect, useContext, SyntheticEvent } from "react";
import { Box, Typography, useMediaQuery, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import SwipeableViews from "react-swipeable-views";

import OrderLayout, { OrderLayoutProps } from "./OrderLayout";
import { AuthContext, EmptyList, useResource } from "src";
import { VoucherModel } from "../models/Voucher";
import VoucherItem from "./VoucherItem";
import chatIcon from "public/icons/chat.svg";
import phoneIcon from "public/icons/phone.svg";
import { VoucherIcon } from "src/core/components/VoucherIcon";

export type VoucherListProps = OrderLayoutProps & {
  vouchers: VoucherModel[];
  vouchersInActive: VoucherModel[];
};

export const VoucherList: FC<VoucherListProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const resource = useResource();

  const { profile, currentMerchant } = useContext(AuthContext);
  const [activeVouchers, setActiveVouchers] = useState(props.vouchers);
  const [inactiveVouchers, setInactiveVouchers] = useState(
    props.vouchersInActive
  );

  useEffect(() => {
    if (props.vouchers) {
      setActiveVouchers(props.vouchers);
    }

    if (props.vouchersInActive) {
      setInactiveVouchers(props.vouchersInActive);
    }
  }, [props]);

  const handleChange = (_: SyntheticEvent, newValue: number) =>
    setValue(newValue);

  const [value, setValue] = useState(0);

  const handleChangeIndex = setValue;

  const onFetch = async () => {
    const activeVouchers = await resource.fetchResource(
      "voucher-public?status=pending,prepare",
      {},
      ""
    );
    setActiveVouchers(activeVouchers?.data?.data);

    const inactiveVouchers = await resource.fetchResource(
      `voucher-public?status=completed,expired,cancelled`,
      {},
      ""
    );
    setInactiveVouchers(inactiveVouchers?.data?.data);
  };

  return (
    <OrderLayout
      {...props}
      title={`บัญชีของ ${profile?.fullName || profile?.tel || profile?.email}`}
      subtitle="บัตรกำนัล"
      right={
        <Box display="flex" justifyContent="flex-end" paddingTop="4px">
          {currentMerchant?.data?.chatContract && (
            <a
              href={
                "https://" +
                currentMerchant?.data?.chatContract
                  .replace("https://", "")
                  .replace("http://", "")
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Box paddingLeft="16px">
                <Image
                  src={chatIcon}
                  alt="chat icon"
                  width="24px"
                  height="24px"
                />
              </Box>
            </a>
          )}
          <a
            href={`tel: +66${currentMerchant?.data?.tel
              .slice(1)
              .split(" ")
              .join("")}`}
          >
            <Box paddingLeft="24px">
              <Image
                src={phoneIcon}
                alt="phone icon"
                width="24px"
                height="24px"
              />
            </Box>
          </a>
        </Box>
      }
    >
      {isDesktop && (
        <>
          <Box mb="24px" mt="32px">
            {activeVouchers && activeVouchers.length > 0 ? (
              activeVouchers.map((voucher) => (
                <Box py="12px" key={voucher.id}>
                  <VoucherItem
                    {...voucher}
                    disableCheckbox
                    enableDetail
                    onClick={() => null}
                    onFetch={onFetch}
                  />
                </Box>
              ))
            ) : (
              <EmptyList
                text="ไม่พบบัตรกำนัล"
                icon={<VoucherIcon fontSize="40px" color="#6B7280" />}
              />
            )}
          </Box>
          {inactiveVouchers && inactiveVouchers.length > 0 && (
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
              {inactiveVouchers && inactiveVouchers.length > 0 ? (
                inactiveVouchers.map((voucher) => (
                  <Box py="12px" key={voucher.id}>
                    <VoucherItem
                      {...voucher}
                      disableCheckbox
                      enableDetail
                      inactive
                      onClick={() => null}
                      onFetch={onFetch}
                    />
                  </Box>
                ))
              ) : (
                <EmptyList
                  text="ไม่พบบัตรกำนัล"
                  icon={<VoucherIcon fontSize="40px" color="#6B7280" />}
                />
              )}
            </Box>
          )}
        </>
      )}
      {!isDesktop && (
        <>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label={"บัตรกำนัลที่ใช้ได้"} />
            <Tab label={"ใช้แล้ว / หมดอายุ"} />
          </Tabs>
          <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
            {activeVouchers && activeVouchers.length > 0 ? (
              <Box mb="24px" mt="32px">
                {activeVouchers.map((voucher) => (
                  <Box py="12px" px="20px" key={voucher.id}>
                    <VoucherItem
                      {...voucher}
                      disableCheckbox
                      enableDetail
                      onClick={() => null}
                      onFetch={onFetch}
                    />
                  </Box>
                ))}
              </Box>
            ) : (
              <EmptyList
                text="ไม่พบบัตรกำนัล"
                icon={<VoucherIcon fontSize="40px" color="#6B7280" />}
              />
            )}
            {inactiveVouchers && inactiveVouchers.length > 0 ? (
              <Box mb="24px" mt="32px">
                {inactiveVouchers &&
                  inactiveVouchers.length > 0 &&
                  inactiveVouchers.map((voucher) => (
                    <Box p="12px" key={voucher.id}>
                      <VoucherItem
                        {...voucher}
                        disableCheckbox
                        enableDetail
                        inactive
                        onClick={() => null}
                        onFetch={onFetch}
                      />
                    </Box>
                  ))}
              </Box>
            ) : (
              <EmptyList
                text="ไม่พบบัตรกำนัล"
                icon={<VoucherIcon fontSize="40px" color="#6B7280" />}
              />
            )}
          </SwipeableViews>
        </>
      )}
    </OrderLayout>
  );
};

export default VoucherList;
