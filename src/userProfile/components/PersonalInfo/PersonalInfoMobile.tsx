import { FC, useContext, useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import NextImage from "next/image";
import { useIntl } from "next-intl";
import router from "next/router";

import {
  AuthContext,
  OrderLayout,
  OrderLayoutProps,
  setLogout,
  ChevronRightIcon,

  useResource,
  MyProfileIcon
} from "src";

import { EditInfoModal } from "./EditInfoModal";

export type PersonalInfoMobileProps = OrderLayoutProps & { mode?: string };

export const PersonalInfoMobile: FC<PersonalInfoMobileProps> = (props) => {
  const { profile, setProfile, setIsAuth } = useContext(AuthContext);
  const intl = useIntl();
  const resource = useResource();

  const [name, setName] = useState(profile?.fullName || null);
  const [gender, setGender] = useState(profile?.gender || "");
  const [birthDate, setBirthDate] = useState(
    profile?.birthDate ? new Date(profile.user.birthDate) : null
  );
  const [email, setEmail] = useState(profile?.email || "");
  const [tel, setTel] = useState(profile?.tel || "");
  const [onLoading, setOnLoading] = useState(false);
  const [file, setFile] = useState(null);

  const appleConnected = false;

  useEffect(() => {
    if (profile) {
      setName(profile.fullName || null);
      setGender(profile.gender || "");
      setBirthDate(profile.birthDate ? new Date(profile.user.birthDate) : null);
      setEmail(profile?.email || "");
      setTel(profile?.tel || "");
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

  const profileImageRef = useRef(null);
  const onProfileImageClick = () => {
    // @ts-ignore
    profileImageRef?.current?.click?.();
  };

  const [editInfoOpen, setEditInfoOpen] = useState(false);
  const [editInfoMode, setEditInfoMode] = useState("name");

  const onInfoItemClick = (key: string) => () => {
    setEditInfoMode(key)
    setEditInfoOpen(true)
  }

  const onSubmitEditCustomer = async () => {
    let fd = await new FormData();

    if (file && typeof file === "object") {
      await fd.append('file', file, `${name}-profile-${new Date().toDateString}`);
    }

    try {
      await resource.updateResourceWithFormDataWithoutId('customer-public', fd);
      const customerProfile = await resource.fetchResource('customer-public', {}, '');
      const dataProfile = customerProfile?.data ? customerProfile?.data?.data : {}

      setProfile({
        ...profile,
        ...dataProfile
      });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (props.mode) {
      setEditInfoOpen(true);
      setEditInfoMode(props.mode);
    }
  }, [props.mode])

  useEffect(() => {
    if (file) {
      onSubmitEditCustomer();
    }
  }, [file]);

  return (
    <OrderLayout
      {...props}
      title={`บัญชีของ ${name || profile?.tel || profile?.email}`}
      subtitle="ข้อมูลส่วนตัว"
    >
      <EditInfoModal
        open={editInfoOpen}
        onClose={() => setEditInfoOpen(false)}
        mode={editInfoMode}
      />
      <Box
        border="1px solid"
        borderColor="grey.100"
        overflow="hidden"
        mt="40px"
      >
        <Box onClick={onProfileImageClick} pr="16px" mt="32px" mb="16px">
          <input hidden type="file" name="profileImage" ref={profileImageRef} onChange={(e: any) => setFile(e.target.files[0])} />
          <Box
            overflow="hidden"
            borderRadius="50%"
            width="100px"
            height="100px"
            mx="auto"
            position="relative"
          >
            {
              file ? (
                typeof file !== "object" ?
                  <NextImage
                    src={profile?.imageUpload?.url}
                    width="100"
                    height="100"
                    objectPosition={"center"}
                    priority={true}
                    objectFit="cover"
                  />
                  :
                  <NextImage
                    src={URL.createObjectURL(file)}
                    width="100"
                    height="100"
                    objectPosition={"center"}
                    priority={true}
                    objectFit="cover"
                  />
              ) : (
                <>
                  {
                    profile?.imageUpload?.url ? (
                      <NextImage
                        src={
                          profile?.imageUpload?.url
                            ? profile?.imageUpload?.url
                            : `/flash-sale-thumbnail.jpg`
                        }
                        width="100"
                        height="100"
                        objectPosition={"center"}
                      />
                    ) : (
                      <Box
                        width="100px"
                        height="100px"
                        bgcolor="rgba(0,0,0,0.5)"
                        textAlign="center"
                        fontSize="55px"
                      >
                        <MyProfileIcon width="50px" height="50px" colorIcon="white" />
                      </Box>
                    )
                  }
                  <Box
                    bgcolor="rgba(0,0,0,0.5)"
                    color="white"
                    height="24px"
                    position="absolute"
                    bottom="0"
                    width="100%"
                    fontSize="10px"
                    textAlign="center"
                    pt="4px"
                  >
                    เปลี่ยน
                  </Box>
                </>
              )
            }
          </Box>
        </Box>
        <List disablePadding>
          <ListItem disablePadding onClick={onInfoItemClick('name')}>
            <ListItemButton
              sx={{
                p: "24px",
                borderBottom: "1px solid",
                borderColor: "grey.100",
              }}
            >
              <ListItemText primary="ชื่อ" />
              <Typography variant="h3" mr="12px">
                {name}
              </Typography>
              <ChevronRightIcon sx={{ fontSize: "10px" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={onInfoItemClick('gender')}>
            <ListItemButton
              sx={{
                p: "24px",
                borderBottom: "1px solid",
                borderColor: "grey.100",
              }}
            >
              <ListItemText primary="เพศ" />
              <Typography variant="h3" mr="12px">
                {gender && gender === "male" ? 'ชาย' : gender && gender === "female" ? 'หญิง' : ''}
              </Typography>
              <ChevronRightIcon sx={{ fontSize: "10px" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={onInfoItemClick('birthDate')}>
            <ListItemButton
              sx={{
                p: "24px",
                borderBottom: "1px solid",
                borderColor: "grey.100",
              }}
            >
              <ListItemText primary="วันเกิด" />
              <Typography variant="h3" mr="12px">
                {birthDate ? intl.formatDateTime(birthDate) : ""}
              </Typography>
              <ChevronRightIcon sx={{ fontSize: "10px" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={onInfoItemClick('email')}>
            <ListItemButton
              sx={{
                p: "24px",
                borderBottom: "1px solid",
                borderColor: "grey.100",
              }}
            >
              <ListItemText primary="อีเมล" />
              <Typography variant="h3" mr="12px">
                {email}
              </Typography>
              <ChevronRightIcon sx={{ fontSize: "10px" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={onInfoItemClick('password')}>
            <ListItemButton
              sx={{
                p: "24px",
                borderBottom: "1px solid",
                borderColor: "grey.100",
              }}
            >
              <ListItemText primary="รหัสผ่าน" />
              <Typography variant="h3" mr="12px">
                ตั้งรหัสผ่าน
              </Typography>
              <ChevronRightIcon sx={{ fontSize: "10px" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={onInfoItemClick('tel')}>
            <ListItemButton
              sx={{
                p: "24px",
                borderBottom: "1px solid",
                borderColor: "grey.100",
              }}
            >
              <ListItemText primary="เบอร์โทรศัพท์" />
              <Typography variant="h3" mr="12px">
                {tel}
              </Typography>
              <ChevronRightIcon sx={{ fontSize: "10px" }} />
            </ListItemButton>
          </ListItem>
        </List>

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

      <Box px="16px">
        <Button
          variant="outlined"
          fullWidth
          disableElevation
          sx={{ py: "16px", borderRadius: "8px", my: "32px", color: "red.50", borderColor: "red.50" }}
          onClick={() => handleOnClickLogout()}
          disabled={onLoading}
        >
          {onLoading ? <CircularProgress color="info" /> : "ออกจากระบบ"}
        </Button>
      </Box>
    </OrderLayout>
  );
};

export default PersonalInfoMobile;
