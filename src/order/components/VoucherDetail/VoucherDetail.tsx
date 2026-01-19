import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import Image from "next/image";
import { FC, useContext } from "react";
import { VoucherDetailProps } from "pages/me/vouchers/[slug]";
import OrderLayout, { OrderLayoutProps } from "../OrderLayout";
import { AuthContext } from "src/auth";
import { EmptyList } from "src/core";
import chatIcon from "public/icons/chat.svg";
import phoneIcon from "public/icons/phone.svg";
import { VoucherIcon } from "src/core/components/VoucherIcon";
import VoucherItem from "../VoucherItem";

export const VoucherDetail: FC<VoucherDetailProps & OrderLayoutProps> = (
  props
) => {
  const { profile, currentMerchant } = useContext(AuthContext);

  return (
    <OrderLayout
      {...props}
      title={`บัญชีของ ${profile?.fullName || profile?.tel || profile?.email}`}
      subtitle="ประวัติการใช้งาน"
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
      <Box pt="24px" pb="12px" px="24px">
        <VoucherItem
          {...props.voucher}
          disableCheckbox
          enableDetail
          onClick={() => null}
          onFetch={() => null}
        />
      </Box>
      {props.voucher.voucherUsageHistories?.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ครั้งที่</TableCell>
                <TableCell align="center">โค้ด</TableCell>
                <TableCell align="right">วันที่ใช้งาน</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.voucher.voucherUsageHistories?.map(
                (voucherUsage, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="center">
                      {voucherUsage.code || ""}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(voucherUsage.usageDate).toLocaleDateString(
                        "th-TH",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyList
          text="ไม่พบประวัติการใช้งาน"
          icon={<VoucherIcon fontSize="40px" color="#6B7280" />}
        />
      )}
    </OrderLayout>
  );
};

export default VoucherDetail;
