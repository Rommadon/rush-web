import { FC, useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import NextImage from "next/image";
import { useIntl } from "next-intl";
import NextLink from "next/link";
import router from "next/router";

import {
  AuthContext,
  OrderLayout,
  OrderLayoutProps,
  routes,
  setLogout,
} from "src";

export type PersonalInfoDesktopProps = OrderLayoutProps & {};

export const PersonalInfoDesktop: FC<PersonalInfoDesktopProps> = (props) => {
  const { profile, setProfile, setIsAuth } = useContext(AuthContext);
  const [name, setName] = useState(profile?.fullName || null);
  const [gender, setGender] = useState(profile?.gender || "-");
  const [birthDate, setBirthDate] = useState(
    profile?.birthDate ? new Date(profile.user.birthDate) : null
  );
  const [email, setEmail] = useState(profile?.email || "-");
  const [tel, setTel] = useState(profile?.tel || "-");
  const [onLoading, setOnLoading] = useState(false);
  const appleConnected = false;

  const intl = useIntl();

  console.log(profile)

  useEffect(() => {
    if (profile) {
      setName(profile.fullName || null);
      setGender(profile.gender || "-");
      setBirthDate(profile.birthDate ? new Date(profile.user.birthDate) : null);
      setEmail(profile?.email || "-");
      setTel(profile?.tel || "-");
    }
  }, [profile]);

  const handleOnClickLogout = () => {
    setOnLoading(true);
    setProfile(null);
    setIsAuth(false);
    setLogout();
    router.push("/").then(() => {
      setOnLoading(false);
    });
  };

  return (
    <OrderLayout
      {...props}
      title={`บัญชีของ ${name || profile?.tel || profile?.email}`}
      subtitle="ข้อมูลส่วนตัว"
    >
      <Box
        border="1px solid"
        borderColor="grey.100"
        borderRadius="8px"
        overflow="hidden"
        mt="40px"
      >
        <Box p="16px">
          <Box
            overflow="hidden"
            borderRadius="50%"
            width="160px"
            height="160px"
            mx="auto"
          >
            <NextImage  
              src={profile?.imageUpload?.url ?? `/flash-sale-thumbnail.jpg`}
              width="160"
              height="160"
              objectPosition={"center"}
  unoptimized={true}
/>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" p="24px">
          <Typography variant="h3">ชื่อ</Typography>
          <Typography variant="h3">{name || "-"}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" p="24px">
          <Typography variant="h3">เพศ</Typography>
          <Typography variant="h3">
            {gender && gender === "male" ? 'ชาย' : gender && gender === "female" ? 'หญิง' : '-'}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" p="24px">
          <Typography variant="h3">วันเกิด</Typography>
          <Typography variant="h3">
            {birthDate ? intl.formatDateTime(birthDate) : "-"}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" p="24px">
          <Typography variant="h3">เบอร์โทรศัพท์</Typography>
          <Typography variant="h3">{tel}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" p="24px">
          <Typography variant="h3">อีเมล</Typography>
          <Typography variant="h3">{email}</Typography>
        </Box>
        {/* <Box display="flex" justifyContent="space-between" p="24px">
          <Typography variant="h3">Facebook</Typography>
          <Box
            bgcolor={facebookConnected ? "primary.main" : "grey.200"}
            color="white"
            borderRadius="24px"
            p="4px 16px"
          >
            {facebookConnected ? "เชื่อมต่อแล้ว" : "ยังไม่เเชื่อมต่อ"}
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" p="24px">
          <Typography variant="h3">Line</Typography>
          <Box
            bgcolor={lineConnected ? "primary.main" : "grey.200"}
            color="white"
            borderRadius="24px"
            p="4px 16px"
          >
            {lineConnected ? "เชื่อมต่อแล้ว" : "ยังไม่เเชื่อมต่อ"}
          </Box>
        </Box> */}
        {/* <Box display="flex" justifyContent="space-between" p="24px">
          <Typography variant="h3">Apple</Typography>
          <Box
            bgcolor={appleConnected ? "primary.main" : "grey.200"}
            color="white"
            borderRadius="24px"
            p="4px 16px"
          >
            {appleConnected ? "เชื่อมต่อแล้ว" : "ยังไม่เชื่อมต่อ"}
          </Box>
        </Box> */}
      </Box>
      <Box display="flex" mt="40px">
        <NextLink href={routes.editPersonalInfo()}>
          <Button
            variant="contained"
            fullWidth
            sx={{ py: "16px", borderRadius: "8px", mr: "8px" }}
            disableElevation
          >
            แก้ไขข้อมูลส่วนตัว
          </Button>
        </NextLink>

        <NextLink href={routes.changePassword()}>
          <Button
            variant="contained"
            fullWidth
            sx={{ py: "16px", borderRadius: "8px", ml: "8px" }}
            disableElevation
          >
            {profile?.isHavePassword ? "เปลี่ยนรหัสผ่าน" : "ตั้งรหัสผ่าน"}
          </Button>
        </NextLink>
      </Box>
      <Button
        variant="outlined"
        fullWidth
        disableElevation
        sx={{ py: "16px", borderRadius: "8px", my: "32px" }}
        onClick={() => handleOnClickLogout()}
        disabled={onLoading}
      >
        {onLoading ? <CircularProgress color="info" /> : "ออกจากระบบ"}
      </Button>
    </OrderLayout>
  );
};

export default PersonalInfoDesktop;
