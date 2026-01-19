// @ts-nocheck
import React, { FC, useContext, useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import NextImage from "next/image";
import NextLink from "next/link";
import router from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket } from '@fortawesome/free-solid-svg-icons'

import {
  DefaultLayout,
  DefaultLayoutProp,
  routes,
  ChevronRightIcon,
  SettingIcon,
  RepurchaseIcon,
  CouponIcon,
  HeartIcon,
  NameIcon,
  MailIcon,
  MyProfileIcon,
  OrdersIcon,
  NotificationsIcon,
} from "src/core";
import { AuthContext, useResource } from "src";

export type MeProps = DefaultLayoutProp & {
  name: string;
  tel: string;
};

export const Me: FC<MeProps> = (props) => {
  const theme = useTheme();
  const resource = useResource();
  const profileImageRef = useRef(null);
  const { profile, setProfile, setIsAuth, currentMerchant } = useContext(AuthContext);

  const [name, setName] = useState(profile?.fullName || null);
  const [tel, setTel] = useState(profile?.tel || "-");
  const [file, setFile] = useState(null);
  const [onLoading, setOnLoading] = useState(false);

  const hex2rgba = (hex: any, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x: any) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const onUpdateInfo = (mode: string) => {
    router.push(`/me/personal-info?mode=${mode}`);
  }

  const onProfileImageClick = () => {
    // @ts-ignore
    profileImageRef?.current?.click?.();
  };

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
    if (profile) {
      setName(profile.fullName || null);
      setTel(profile?.tel || "-");
    }
  }, [profile]);

  useEffect(() => {
    if (file) {
      onSubmitEditCustomer();
    }
  }, [file]);

  return (
    <DefaultLayout {...props} appBar={" "}>
      <Box
        height=""
        p="16px"
        pb="24px"
        display="flex"
        justifyContent="space-between"
        sx={{
          background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, ${hex2rgba(theme.palette.primary.main, 0.7)} 100%)`
        }}
      >
        <Box display="flex">
          <Box onClick={onProfileImageClick} pr="16px">
            <input hidden type="file" name="profileImage" ref={profileImageRef} onChange={(e: any) => setFile(e.target.files[0])} />
            <Box
              overflow="hidden"
              borderRadius="50%"
              width="70px"
              height="70px"
              mx="auto"
              position="relative"
            >
              {
                file ? (
                  typeof file !== "object" ? 
                    <NextImage
                      src={profile?.imageUpload?.url}
                      width="70"
                      height="70"
                      objectPosition={"center"}
                      priority={true}
                      objectFit="cover"
                    />
                    :
                    <NextImage
                      src={URL.createObjectURL(file)}
                      width="70"
                      height="70"
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
                        width="70"
                        height="70"
                        objectPosition={"center"}
                      />
                    ) : (
                      <Box
                        width="70px"
                        height="70px"
                        bgcolor="rgba(0,0,0,0.5)"
                        textAlign="center"
                        fontSize="38px"
                      >
                        <MyProfileIcon width="35px" height="35px" colorIcon="white" />
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
          <Box pt="8px">
            <Typography variant="h3" component="h3" pb="4px">
              +66 {[tel.slice(1, 3), tel.slice(3, 6), tel.slice(6)].join(" ")}
            </Typography>
            <Typography fontSize="12px" fontWeight="light" sx={{ display: "flex", alignItems: "center" }} onClick={() => onUpdateInfo('name')}>
              <NameIcon width="14px" /> <Typography component="span" fontSize="12px" fontWeight="light" px="8px">{name || 'เพิ่มชื่อผู้ใช้'}</Typography>
              <ChevronRightIcon fontSize={"12px"} />
            </Typography>
            <Typography fontSize="12px" fontWeight="light" sx={{ display: "flex", alignItems: "center" }} onClick={() => onUpdateInfo('email')}>
              <MailIcon width="14px" /> <Typography component="span" fontSize="12px" fontWeight="light" px="8px">{profile?.email || 'เพิ่มอีเมล์'}</Typography>
              <ChevronRightIcon fontSize={"12px"} />
            </Typography>
          </Box>
        </Box>
        <NextLink href={routes.personalInfo()}>
          <a>
            <Box>
              <SettingIcon color="grey.50" />
            </Box>
          </a>
        </NextLink>
      </Box>
      <Box
        px="32px"
        py="20px"
        borderTop="6px solid #F0F3F9"
        borderBottom="6px solid #F0F3F9"
        display="flex"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          {
            currentMerchant && currentMerchant?.data?.merchantIcon?.imageUpload && (
              <Box style={{ display: 'block', width: '20px', height: '20px', position: "relative", marginRight: '8px' }}>
                <NextImage src={currentMerchant?.data?.merchantIcon?.imageUpload?.url} alt="shopdit logo" layout="fill" objectFit="contain" priority={true} />
              </Box>
            )
          }
          <Typography component="h4" variant="h4" sx={{
            textTransform: 'uppercase'
          }}>
            {currentMerchant?.data?.slug} POINT
          </Typography>
        </Box>
        <NextLink href={routes.shopditPoint()}>
          <Box display="flex" alignItems="center">
            <Box width="20px" height="20px" color="white" bgcolor={"#00B900"} borderRadius="50%" textAlign="center" display="flex" alignItems="center" justifyContent="center" mr="8px">
              <Typography component="h4" variant="h4">
                P
              </Typography>
            </Box>
            <Typography component="h4" variant="h4">
              {profile?.customerWallet?.shopditPoint} แต้ม
            </Typography>
          </Box>
        </NextLink>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap="16px 0"
        borderBottom="6px solid #F0F3F9"
      >
        {/* <NextLink href={routes.orderList()}>
          <a>
            <Box p="" height="72px" width="72px" mx="auto">
              <Box
                display="flex"
                p="15.33px"
                mx="auto"
                mt="20px"
                textAlign="center"
              >
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.33398 3.66695H28.6673C29.5878 3.66695 30.334 4.41314 30.334 5.33362V28.667C30.334 29.5874 29.5878 30.3336 28.6673 30.3336H5.33398C4.41351 30.3336 3.66732 29.5874 3.66732 28.667V5.33362C3.66732 4.41314 4.41351 3.66695 5.33398 3.66695ZM0.333984 5.33362C0.333984 2.57219 2.57256 0.333618 5.33398 0.333618H28.6673C31.4287 0.333618 33.6673 2.57219 33.6673 5.33362V28.667C33.6673 31.4284 31.4287 33.667 28.6673 33.667H5.33398C2.57256 33.667 0.333984 31.4284 0.333984 28.667V5.33362ZM17.0007 17.0003C12.3983 17.0003 8.66732 12.5231 8.66732 7.00029H12.0007C12.0007 11.277 14.7825 13.667 17.0007 13.667C19.2188 13.667 22.0007 11.277 22.0007 7.00029H25.334C25.334 12.5231 21.603 17.0003 17.0007 17.0003Z"
                    fill="black"
                  />
                </svg>
              </Box>
              <Typography fontSize="14px" textAlign="center" mt="8px" fontWeight="light">
                คำสั่งซื้อ
              </Typography>
            </Box>
          </a>
        </NextLink> */}
        <NextLink href={routes.repurchasing()}>
          <a>
            <Box p="" height="72px" width="72px" mx="auto">
              <Box
                display="flex"
                textAlign="center"
                position="relative"
                height="25px"
                width="25px"
                mx="auto"
                mt="25px"
              >
                <RepurchaseIcon color={theme.palette.primary.main} />
              </Box>
              <Typography
                fontSize="14px"
                textAlign="center"
                mt="8px"
                fontWeight="light"
              >
                ซื้ออีกครั้ง
              </Typography>
            </Box>
          </a>
        </NextLink>
        <NextLink href={routes.coupon()}>
          <a>
            <Box p="" height="72px" width="72px" mx="auto">
              <Box
                display="flex"
                textAlign="center"
                position="relative"
                height="25px"
                width="25px"
                mx="auto"
                mt="25px"
              >
                <CouponIcon color={theme.palette.primary.main} />
              </Box>
              <Typography
                fontSize="14px"
                textAlign="center"
                mt="8px"
                fontWeight="light"
              >
                คูปอง
              </Typography>
            </Box>
          </a>
        </NextLink>
        <NextLink href={routes.wishlist()}>
          <a>
            <Box p="" height="72px" width="72px" mx="auto">
              <Box
                display="flex"
                textAlign="center"
                position="relative"
                height="25px"
                width="25px"
                mx="auto"
                mt="25px"
              >
                <HeartIcon color={theme.palette.primary.main} />
              </Box>
              <Typography
                fontSize="14px"
                textAlign="center"
                mt="8px"
                fontWeight="light"
              >
                สินค้าที่ชอบ
              </Typography>
            </Box>
          </a>
        </NextLink>
        <NextLink href={routes.voucher()}>
          <a>
            <Box p="" height="72px" width="72px" mx="auto">
              <Box
                display="flex"
                textAlign="center"
                position="relative"
                height="25px"
                width="25px"
                mx="auto"
                mt="25px"
              >
                <OrdersIcon color={theme.palette.primary.main} />
              </Box>
              <Typography
                fontSize="14px"
                textAlign="center"
                mt="8px"
                fontWeight="light"
              >
                คำสั่งซื้อ
              </Typography>
            </Box>
          </a>
        </NextLink>
        <NextLink href={routes.voucher()}>
          <a>
            <Box p="" height="72px" width="72px" mx="auto">
              <Box
                display="flex"
                textAlign="center"
                position="relative"
                height="25px"
                width="25px"
                mx="auto"
                mt="25px"
              >
                <NotificationsIcon color={theme.palette.primary.main} />
              </Box>
              <Typography
                fontSize="14px"
                textAlign="center"
                mt="8px"
                fontWeight="light"
              >
                แจ้งเตือน
              </Typography>
            </Box>
          </a>
        </NextLink>
        <NextLink href={routes.voucher()}>
          <a>
            <Box p="" height="72px" width="72px" mx="auto">
              <Box
                display="flex"
                textAlign="center"
                position="relative"
                height="25px"
                width="25px"
                mx="auto"
                mt="25px"
                alignContent="center"
                alignItems="center"
                justifyContent="center"
              >
                <FontAwesomeIcon icon={faTicket} fontSize={20} color={theme.palette.primary.main}/>
              </Box>
              <Typography
                fontSize="14px"
                textAlign="center"
                mt="8px"
                fontWeight="light"
              >
                บัตรกำนัล
              </Typography>
            </Box>
          </a>
        </NextLink>
        {/* <NextLink href={routes.orderList()}>
          <a>
            <Box p="" height="72px" width="72px" mx="auto">
              <Box
                display="flex"
                p="15.33px"
                mx="auto"
                mt="20px"
                textAlign="center"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M39.9993 19.9997C39.9993 27.3635 34.0298 33.333 26.666 33.333V29.9997C32.1889 29.9997 36.666 25.5226 36.666 19.9997C36.666 14.4769 32.1889 9.99971 26.666 9.99971V6.66638C34.0298 6.66638 39.9993 12.6359 39.9993 19.9997Z"
                    fill="black"
                  />
                  <path
                    d="M33.3327 19.9997C33.3327 23.6816 30.3479 26.6664 26.666 26.6664V23.333C28.507 23.333 29.9993 21.8407 29.9993 19.9997C29.9993 18.1588 28.507 16.6664 26.666 16.6664V13.333C30.3479 13.333 33.3327 16.3178 33.3327 19.9997Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.9993 26.6664L24.9993 33.333V6.66638L14.9993 13.333H8.33268C4.65078 13.333 1.66602 16.3178 1.66602 19.9997C1.66602 23.6816 4.65078 26.6664 8.33268 26.6664H14.9993ZM8.33268 16.6664H14.9993L21.666 12.4997V27.4997L14.9993 23.333H8.33268C6.49173 23.333 4.99935 21.8407 4.99935 19.9997C4.99935 18.1588 6.49173 16.6664 8.33268 16.6664Z"
                    fill="black"
                  />
                </svg>
              </Box>
              <Typography fontSize="14px" textAlign="center" mt="8px" fontWeight="light">
                โปรโมชั่น
              </Typography>
            </Box>
          </a>
        </NextLink> */}

        {/* <NextLink href={routes.notification()}>
          <a>
            <Box p="" height="72px" width="72px" mx="auto">
              <Box
                display="flex"
                p="15.33px"
                mx="auto"
                mt="20px"
                textAlign="center"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23.3327 4.99971V5.48285C28.1518 6.91709 31.666 11.3813 31.666 16.6664V28.333H33.3327V31.6664H6.66602V28.333H8.33268V16.6664C8.33268 11.3813 11.8469 6.91709 16.666 5.48285V4.99971C16.666 3.15877 18.1584 1.66638 19.9993 1.66638C21.8403 1.66638 23.3327 3.15877 23.3327 4.99971ZM11.666 28.333H28.3327V16.6664C28.3327 12.064 24.6017 8.33305 19.9993 8.33305C15.397 8.33305 11.666 12.064 11.666 16.6664V28.333ZM23.3327 34.9997V33.333H16.666V34.9997C16.666 36.8407 18.1584 38.333 19.9993 38.333C21.8403 38.333 23.3327 36.8407 23.3327 34.9997Z"
                    fill="black"
                  />
                </svg>
              </Box>
              <Typography fontSize="14px" textAlign="center" mt="8px" fontWeight="light">
                แจ้งเตือน
              </Typography>
            </Box>
          </a>
        </NextLink> */}
      </Box>
      <List sx={{ py: "24px" }}>
        <NextLink href={routes.addresses()}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="จัดการที่อยู่"
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: "light",
                }}
              />
              <ListItemIcon
                sx={{ display: "flex", justifyContent: "flex-end", py: "16px" }}
              >
                <ChevronRightIcon fontSize={"5px"} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </NextLink>
        {/* <NextLink href={routes.payment()}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="การชำระเงิน"
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: "light",
                }}
              />
              <ListItemIcon
                sx={{ display: "flex", justifyContent: "flex-end", py: "16px" }}
              >
                <ChevronRightIcon fontSize={"5px"} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </NextLink> */}
        {/* <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="การชำระเงิน" primaryTypographyProps={{ fontSize: "16px", fontWeight: 'light' }} />
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'flex-end', py: '16px' }}>
              <ChevronRightIcon fontSize={"5px"} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem> */}
        <NextLink href={routes.changeLanguage()}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="ภาษา"
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: "light",
                }}
              />
              <ListItemIcon
                sx={{ display: "flex", justifyContent: "flex-end", py: "16px" }}
              >
                <ChevronRightIcon fontSize={"5px"} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </NextLink>

        {/* <NextLink href={routes.notificationSetting()}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="แจ้งเตือน"
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: "light",
                }}
              />
              <ListItemIcon
                sx={{ display: "flex", justifyContent: "flex-end", py: "16px" }}
              >
                <ChevronRightIcon fontSize={"5px"} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </NextLink> */}

        <NextLink href={routes.aboutMerchant()}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="เกี่ยวกับเรา"
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: "light",
                }}
              />
              <ListItemIcon
                sx={{ display: "flex", justifyContent: "flex-end", py: "16px" }}
              >
                <ChevronRightIcon fontSize={"5px"} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </NextLink>

        <NextLink href={routes.contactMerchant()}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="ติดต่อเรา"
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: "light",
                }}
              />
              <ListItemIcon
                sx={{ display: "flex", justifyContent: "flex-end", py: "16px" }}
              >
                <ChevronRightIcon fontSize={"5px"} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </NextLink>

        <NextLink href={routes.termsPoliciesMerchant()}>
          <ListItem disablePadding sx={{pb: "64px"}}>
            <ListItemButton>
              <ListItemText
                primary="เงื่อนไขการให้บริการ"
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: "light",
                }}
              />
              <ListItemIcon
                sx={{ display: "flex", justifyContent: "flex-end", py: "16px" }}
              >
                <ChevronRightIcon fontSize={"5px"} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </NextLink>
      </List>
    </DefaultLayout>
  );
};

export default Me;
