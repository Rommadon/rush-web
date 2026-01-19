import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useContext, useState } from "react";

import { OrderLayout, OrderLayoutProps } from "src/order/components";
import { LocaleInput, IOSSwitch } from "src/core/components";
import { useRouter } from "next/router";
import { AuthContext, useResource } from "src";

export type SettingProps = OrderLayoutProps & {};

export const Setting: FC<SettingProps> = (props) => {
  const router = useRouter();
  const { profile } = useContext(AuthContext);
  const resource = useResource();

  const [isEmailNotify, setIsEmailNotify] = useState(profile?.customerNotificationConfiguration?.isEmailNotify || false)
  const [isApplicationNotify, setIsApplicationNotify] = useState(profile?.customerNotificationConfiguration?.isApplicationNotify || false)
  const [isSmsNotify, setIsSmsNotify] = useState(profile?.customerNotificationConfiguration?.isSmsNotify || false)

  const handleChangeLocale = (event: SelectChangeEvent) => {
    router.push(router.pathname, router.pathname, {
      locale: event.target.value,
    });
  };

  const onChangeNotificationConfig = async (data: any) => {
    await resource.createResource('customer-notification-configuration-public', data)

    if (data?.isEmailNotify !== undefined || data?.isEmailNotify !== null) {
      setIsEmailNotify(!isEmailNotify);
    }

    if (data?.isApplicationNotify !== undefined || data?.isApplicationNotify !== null) {
      setIsApplicationNotify(!isApplicationNotify);
    }

    if (data?.isSmsNotify !== undefined || data?.isSmsNotify !== null) {
      setIsSmsNotify(!isSmsNotify);
    }
  }

  return (
    <OrderLayout {...props} title={`บัญชีของ ${profile?.fullName || profile?.tel || profile?.email}`}>
      <Box pb="72px" borderBottom="1px solid" borderColor="grey.100">
        <Typography variant="h2" fontWeight="600">
          ตั้งค่าภาษา
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="32px"
        >
          <Typography variant="h4">ภาษา</Typography>
          <FormControl>
            <Select
              value={router.locale}
              label=""
              input={<LocaleInput />}
              onChange={handleChangeLocale}
              style={{
                width: "100%",
              }}
            >
              <MenuItem value={"th"}>ไทย</MenuItem>
              <MenuItem value={"en"}>English</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="32px"
        >
          <Typography variant="h4">เวลา</Typography>
          <FormControl>
            <Select
              value={router.locale}
              label=""
              input={<LocaleInput />}
              onChange={handleChangeLocale}
              style={{
                width: "100%",
              }}
            >
              <MenuItem value={"th"}>ไทย</MenuItem>
              <MenuItem value={"en"}>English</MenuItem>
            </Select>
          </FormControl>
        </Box> */}
      </Box>

      {/* <Box py="72px" borderBottom="1px solid" borderColor="grey.100">
        <Typography variant="h2" fontWeight="600">
          ตั้งค่าการแจ้งเตือนคำสั่งซื้อ
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="32px"
        >
          <Typography variant="h4">แจ้งเตือนทางอีเมล</Typography>
          <IOSSwitch defaultChecked={isEmailNotify} onClick={() => onChangeNotificationConfig({
            isEmailNotify: !isEmailNotify
          })} />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="32px"
        >
          <Typography variant="h4">แจ้งเตือนทางแอพพลิเคชั่น</Typography>
          <IOSSwitch defaultChecked={isApplicationNotify} onClick={() => onChangeNotificationConfig({
            isApplicationNotify: !isApplicationNotify
          })} />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="32px"
        >
          <Typography variant="h4">แจ้งเตือนทาง SMS</Typography>
          <IOSSwitch defaultChecked={isSmsNotify} onClick={() => onChangeNotificationConfig({
            isSmsNotify: !isSmsNotify
          })} />
        </Box>
      </Box> */}

      {/* <Box py="72px">
        <Typography variant="h2" fontWeight="600">
          ตั้งค่าการแจ้งเตือนโปรโมชั่น
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="32px"
        >
          <Typography variant="h4">แจ้งเตือนทางอีเมล</Typography>
          <Switch />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="32px"
        >
          <Typography variant="h4">แจ้งเตือนทางแอพพลิเคชั่น</Typography>
          <Switch />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="32px"
        >
          <Typography variant="h4">แจ้งเตือนทาง SMS</Typography>
          <Switch />
        </Box>
      </Box> */}
    </OrderLayout>
  );
};
