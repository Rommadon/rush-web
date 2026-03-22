import { Box, Typography, useMediaQuery } from "@mui/material";
import { FC, useContext, useState, useEffect } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

import cartIcon from "public/icons/shopping-bag.svg";
import myProfileIcon from "public/icons/shopdit-icon_my-fill.svg";
import thailandIcon from "public/icons/thailand.png";

import { SearchInput } from "./SearchInput";
import { AuthContext, useAuth } from "../../auth";
import { routes } from "src/core/routes";
import { CartContext } from "src";

const menuItems = [
  { slug: "navbar.newIn", href: "/new-in" },
  { slug: "navbar.flashSale", href: "/flash-sale" },
  { slug: "navbar.promotion", href: "/promotion" },
];

export type NavbarProp = {
  search?: string;
  isHomePage?: boolean;
};

export const Navbar: FC<NavbarProp> = (props) => {
  const { currentMerchant, profile } = useContext(AuthContext);
  const { cartData } = useContext(CartContext);
  const t = useTranslations();
  const { openAuthModal, isAuth } = useAuth();
  const router = useRouter();
  const handleSearch = (data: Record<string, any>) =>
    router.push(routes.products({}, { search: data.search }));
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [navbarShadow, setNavbarShadow] = useState(false);

  const onHandleOpenSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };

  const changeNavbar = () => {
    if (props.isHomePage && window.scrollY >= 66) {
      setNavbarShadow(true);
    } else {
      setNavbarShadow(false);
    }
  };

  useEffect(() => {
    changeNavbar();
    window.addEventListener("scroll", changeNavbar);
  });

  return (
    <>
      <nav>
        <Box
          position="fixed"
          bgcolor="common.white"
          width="100%"
          sx={{
            zIndex: 1299,
            borderBottom: "2px solid ButtonFace",
            // ...navbarShadow ? { boxShadow: '0 2px 10px 0 rgb(1 27 42 / 6%)' } : {}
          }}
          px="8px"
        >
          <Box
            display={{ xs: "none", md: "flex" }}
            alignItems="center"
            maxWidth="1200px"
            margin="auto"
            // style={!navbarShadow ? { borderBottom: '2px solid ButtonFace' } : {}}
          >
            <Box
              display="flex"
              py="15px"
              alignItems="center"
              sx={{
                flex: "1 1 auto",
              }}
            >
              {currentMerchant?.data?.merchantLogo?.imageUpload ? (
                <Box position="relative" height="auto" width="90px" mr="24px">
                  <NextLink href={"/"}>
                    <a
                      style={{
                        display: "block",
                        width: "90px",
                        height: "30px",
                        position: "relative",
                      }}
                    >
                      <Image  
                        src={
                          currentMerchant?.data?.merchantLogo?.imageUpload?.url
                        }
                        alt={`${currentMerchant?.data?.name}`}
                        layout="fill"
                        objectFit="contain"
                        priority={true}
  unoptimized={true}
/>
                    </a>
                  </NextLink>
                </Box>
              ) : (
                <Box position="relative">
                  <NextLink href={"/"}>
                    <Typography
                      component="h2"
                      variant="h2"
                      mr="24px"
                      sx={{ cursor: "pointer" }}
                      fontSize={"24px"}
                      fontWeight="600"
                      color={currentMerchant?.data?.primaryColor}
                    >
                      {currentMerchant?.data?.name}
                    </Typography>
                  </NextLink>
                </Box>
              )}
              <Box
                position="relative"
                width="260px"
                mr="14px"
                sx={{ cursor: "pointer" }}
              >
                <SearchInput
                  shadow
                  onSubmit={handleSearch}
                  value={props.search ?? ""}
                  // maxWidth="500px"
                />
              </Box>
              {/* <NextLink href={routes.products()}>
                <Typography
                  component="h2"
                  variant="h4"
                  ml="32px"
                  mr="16px"
                  sx={{ cursor: "pointer" }}
                >
                  สินค้า
                </Typography>
              </NextLink>
              <NextLink href={routes.productFlashSale()}>
                <Typography
                  component="h2"
                  variant="h4"
                  mx="16px"
                  sx={{ cursor: "pointer" }}
                >
                  แฟลชเซล
                </Typography>
              </NextLink>
              <NextLink href={routes.articles()}>
                <Typography
                  component="h2"
                  variant="h4"
                  mx="16px"
                  sx={{ cursor: "pointer" }}
                >
                  บทความ
                </Typography>
              </NextLink>
              <NextLink href={routes.aboutUs()}>
                <Typography
                  component="h2"
                  variant="h4"
                  mx="16px"
                  sx={{ cursor: "pointer" }}
                >
                  เกี่ยวกับเรา
                </Typography>
              </NextLink>
              <NextLink href={routes.contactUs()}>
                <Typography
                  component="h2"
                  variant="h4"
                  mx="16px"
                  sx={{ cursor: "pointer" }}
                >
                  ติดต่อเรา
                </Typography>
              </NextLink> */}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                width="100%"
                sx={{
                  display: "flex",
                  marginLeft: "32px",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {isAuth ? (
                  <>
                    <NextLink href={routes.personalInfo()}>
                      <Box
                        mr="16px"
                        pr="14px"
                        borderRight="1px solid #B6BECD"
                        display="flex"
                        position="relative"
                        alignItems="center"
                        sx={{ cursor: "pointer" }}
                      >
                        {/* {
                        profile?.imageUpload?.url ? (
                          <Image height="25px" width="25px" src={profile?.imageUpload?.url} alt="profile logo" objectPosition={"center"} objectFit="cover" priority={true} unoptimized={true}/>
                        ) : (
                          <Image src={myProfileIcon} height="25px" width="25px" alt="profile logo" objectPosition={"center"} objectFit="cover" priority={true} unoptimized={true}/>
                        )
                      } */}
                        {
                          profile?.fullName ? (
                            <Typography variant="h4">
                              สวัสดี {profile?.fullName}
                            </Typography>
                          ) : (
                            // <Box mr='14px'>
                            <Image  
                              src={myProfileIcon}
                              height="25px"
                              width="25px"
                              alt={`${currentMerchant?.data?.name} - logo`}
                              objectPosition={"center"}
                              objectFit="cover"
                              priority={true}
  unoptimized={true}
/>
                          )
                          // </Box>
                        }
                      </Box>
                    </NextLink>
                    <Box
                      position="relative"
                      height="25px"
                      width="25px"
                      mr="14px"
                      sx={{ cursor: "pointer" }}
                    >
                      <Image  
                        src={thailandIcon}
                        alt={`${currentMerchant?.data?.name} - thailand logo`}
                        layout="fill"
                        objectFit="contain"
                        priority={true}
  unoptimized={true}
/>
                    </Box>
                    {/* {isOpenSearch ? (
                      <Box
                        position="relative"
                        width="200px"
                        mr="14px"
                        sx={{ cursor: "pointer" }}
                      >
                        <SearchInput
                          shadow
                          onSubmit={handleSearch}
                          value={props.search ?? ""}
                          maxWidth="275px"
                        />
                      </Box>
                    ) : (
                      <Box
                        onClick={() => onHandleOpenSearch()}
                        mr="14px"
                        position="relative"
                        height="25px"
                        width="25px"
                        sx={{ cursor: "pointer" }}
                      >
                        <Image  
                          src={searchIconMobile}
                          alt={`${currentMerchant?.data?.name} - search logo`}
                          layout="fill"
                          objectFit="contain"
                          priority={true}
  unoptimized={true}
/>
                      </Box>
                    )} */}
                    <Box
                      position="relative"
                      height="25px"
                      width="25px"
                      sx={{ cursor: "pointer" }}
                    >
                      <NextLink href={routes.cart()}>
                        <Image  
                          src={cartIcon}
                          alt={`${currentMerchant?.data?.name} - profile logo`}
                          layout="fill"
                          objectFit="contain"
                          priority={true}
  unoptimized={true}
/>
                      </NextLink>
                      {cartData?.cartItems?.length > 0 && (
                        <Box
                          height="10px"
                          width="10px"
                          bgcolor="red.100"
                          position="absolute"
                          borderRadius="50%"
                          right="0"
                          border="1px solid #ffffff"
                        />
                      )}
                    </Box>
                  </>
                ) : (
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Box
                      onClick={openAuthModal}
                      mr="16px"
                      borderRight="1px solid #B6BECD"
                    >
                      <Typography
                        variant="h5"
                        mx="16px"
                        fontWeight={300}
                        sx={{ cursor: "pointer" }}
                      >
                        เข้าสู่ระบบ
                      </Typography>
                    </Box>
                    <Box
                      position="relative"
                      height="25px"
                      width="25px"
                      mr="14px"
                      sx={{ cursor: "pointer" }}
                    >
                      <Image  
                        src={thailandIcon}
                        alt={`${currentMerchant?.data?.name} - profile logo`}
                        layout="fill"
                        objectFit="contain"
                        priority={true}
  unoptimized={true}
/>
                    </Box>
                    {/* {isOpenSearch ? (
                      <Box
                        position="relative"
                        width="200px"
                        mr="14px"
                        sx={{ cursor: "pointer" }}
                      >
                        <SearchInput
                          shadow
                          onSubmit={handleSearch}
                          value={props.search ?? ""}
                          maxWidth="275px"
                        />
                      </Box>
                    ) : (
                      <Box
                        onClick={() => onHandleOpenSearch()}
                        mr="14px"
                        position="relative"
                        height="25px"
                        width="25px"
                        sx={{ cursor: "pointer" }}
                      >
                        <Image  
                          src={searchIconMobile}
                          alt={`${currentMerchant?.data?.name} - search logo`}
                          layout="fill"
                          objectFit="contain"
                          priority={true}
  unoptimized={true}
/>
                      </Box>
                    )} */}
                    <Box
                      onClick={openAuthModal}
                      position="relative"
                      height="25px"
                      width="25px"
                      // mr="14px"
                      sx={{ cursor: "pointer" }}
                    >
                      <Image  
                        src={cartIcon}
                        alt={`${currentMerchant?.data?.name} - cart logo`}
                        layout="fill"
                        objectFit="contain"
                        priority={true}
  unoptimized={true}
/>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </nav>
      {isDesktop &&
        !currentMerchant?.data?.shopditProductWhitelists?.includes('verifyMerchant') && (
          <Box
            position="fixed"
            bgcolor="#EF4423"
            sx={{
              zIndex: 1299,
              borderBottom: "2px solid ButtonFace",
              bottom: "30%",
              right: "0",
            }}
            px="12px"
          >
            <Box
              sx={{
                backgroundColor: "#EF4423",
                textAlign: "center",
                padding: "12px",
                fontSize: "14px",
                color: "white",
              }}
            >
              ร้านค้ายังไม่
              <br />
              ยืนยันตัวตน
            </Box>
          </Box>
        )}
    </>
  );
};

export default Navbar;
