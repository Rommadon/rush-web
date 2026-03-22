import { FC, useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { SearchInput } from "./SearchInput";
import cartWhiteIcon from "public/icons/cart-white.svg";
import heartWhiteIcon from "public/icons/heart-white.svg";
import cartIcon from "public/icons/shopdit-icon_cart.svg";
import heartIcon from "public/icons/shopdit-icon_heart.svg";
import chat from "public/icons/chat.svg";
import chatWhite from "public/icons/chat-white.svg";
import { AuthContext, CartContext, routes, useAuth } from "src";

export type NavbarMobileProp = {
  search?: string;
};

export const NavbarMobile: FC<NavbarMobileProp> = (props) => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const { isAuth } = useAuth();
  const { currentMerchant } = useContext(AuthContext);
  const { cartData } = useContext(CartContext);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, []);

  const handleSearch = (data: Record<string, any>) =>
    router.push(routes.products({}, { search: data.search }));

  return (
    <nav>
      <Box
        p={"16px"}
        position={"fixed"}
        width="100%"
        display={{ xs: "flex", md: "none" }}
        alignItems="center"
        zIndex="10"
        justifyContent="space-between"
        sx={{
          transition: "background-color 0.3s linear",
          bgcolor: offset > 20 ? "white" : "none",
          boxShadow: offset > 20 ? "0px 2px 2px 0px #00000014" : "",
        }}
      >
        <SearchInput
          onSubmit={handleSearch}
          value={props.search ?? ""}
          shadow
        />
        {currentMerchant?.data?.chatContract ? (
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
            <Box paddingLeft={"16px"} paddingTop={"5px"}>
              <Image  
                src={chat}
                alt="chat icon"
                width="30px"
                height="30px"
  unoptimized={true}
/>
            </Box>
          </a>
        ) : (
          <NextLink href={isAuth ? routes.wishlist() : routes.login()}>
            <Box paddingLeft={"16px"}>
              <Image  
                src={heartIcon}
                alt="heart icon"
                width="24px"
                height="24px"
  unoptimized={true}
/>
            </Box>
          </NextLink>
        )}
        <NextLink href={isAuth ? routes.cart() : routes.login()}>
          <Box paddingLeft={"16px"}>
            <Image  
              src={cartIcon}
              alt="cart icon"
              width="24px"
              height="24px"
  unoptimized={true}
/>
          </Box>
        </NextLink>
        {cartData?.cartItems?.length > 0 && (
          <Box
            height="7px"
            width="7px"
            bgcolor="red.100"
            position="absolute"
            borderRadius="50%"
            right="14px"
            top="24px"
            border="1px solid #ffffff"
          />
        )}
      </Box>
    </nav>
  );
};
