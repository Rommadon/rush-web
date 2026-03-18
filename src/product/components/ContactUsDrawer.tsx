import { FC, useContext } from "react";
import { Box, Typography, SwipeableDrawer } from "@mui/material";
import { AuthContext } from "src";
import Image from "next/image";
import phoneIcon from "public/icons/phone.svg";
import chatIcon from "public/icons/chat.svg";
import lineIcon from "public/icons/line.png";
import facebookIcon from "public/icons/facebook.svg";
import instagramIcon from "public/icons/instagram.svg";
import { Product } from "../models";

export const ContactUsDrawer: FC<{ open: boolean; onClose: () => void; onOpen: () => void; product?: Product }> = ({ open, onClose, onOpen, product }) => {
  const { currentMerchant } = useContext(AuthContext);

  const openExternalLink = (url: string | undefined | null) => {
    if (!url) return;
    const cleanUrl = url.replace("https://", "").replace("http://", "");
    window.open("https://" + cleanUrl, "_blank");
  };

  const productContacts = [
    { label: product?.telContact, value: product?.telContact, icon: phoneIcon, action: () => { if (product?.telContact) window.location.href = `tel:+66${product.telContact.startsWith('0') ? product.telContact.slice(1) : product.telContact}`.split(" ").join("") } },
    { label: "Line", value: product?.lineContact, icon: lineIcon, action: () => openExternalLink(product?.lineContact) },
    { label: "Facebook", value: product?.facebookContact, icon: facebookIcon, action: () => openExternalLink(product?.facebookContact) },
    { label: "Instagram", value: product?.instagramContact, icon: instagramIcon, action: () => openExternalLink(product?.instagramContact) },
  ].filter(c => c.value);

  return (
      <SwipeableDrawer
        anchor={"bottom"}
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        <Box
          textAlign="center"
          display={"flex"}
          alignItems={"center"}
          margin={3}
          marginBottom={5}
          flexDirection={"column"}
        >
          <Typography variant="h3" marginBottom={4}>
            ติดต่อเรา
          </Typography>

          {/* Product Contacts */}
          {productContacts.map((contact, index) => (
            <Box
              key={index}
              border={"1px solid #000000"}
              borderRadius="16px"
              width={"70%"}
              p="8px 16px"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              marginBottom={2}
              onClick={contact.action}
              sx={{ cursor: "pointer" }}
            >
              <Box width="24px" height="24px" display="flex" justifyContent="center" alignItems="center">
                <Image src={contact.icon} alt={`${contact.label} icon`} width={24} height={24} objectFit="contain" />
              </Box>
              <Typography variant="h4">{contact.label}</Typography>
              <Box width="24px"></Box>
            </Box>
          ))}

          {/* Merchant Default Contacts */}
          {currentMerchant?.data?.tel && (
            <Box
              border={"1px solid #000000"}
              borderRadius="16px"
              width={"70%"}
              p="8px 16px"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              marginBottom={2}
              onClick={() => {
                const tel = currentMerchant?.data?.tel.slice(1).split(" ").join("");
                window.location.href = `tel:+66${tel}`;
              }}
              sx={{ cursor: "pointer" }}
            >
              <Box width="24px" height="24px" display="flex" justifyContent="center" alignItems="center">
                <Image src={phoneIcon} alt="phone icon" width={24} height={24} objectFit="contain" />
              </Box>
              <Typography variant="h4">{currentMerchant?.data?.tel}</Typography>
              <Box width="24px"></Box>
            </Box>
          )}
          {currentMerchant?.data?.chatContract && (
            <Box
              border={"1px solid #000000"}
              borderRadius="16px"
              width={"70%"}
              p="8px 16px"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              onClick={() => {
                window.open(
                  "https://" +
                    currentMerchant?.data?.chatContract
                      .replace("https://", "")
                      .replace("http://", ""),
                  "_blank"
                );
              }}
              sx={{ cursor: "pointer" }}
            >
              <Box width="24px" height="24px" display="flex" justifyContent="center" alignItems="center">
                <Image src={chatIcon} alt="chat icon" width={24} height={24} objectFit="contain" />
              </Box>
              <Typography variant="h4">Chat</Typography>
              <Box width="24px"></Box>
            </Box>
          )}
        </Box>
      </SwipeableDrawer>
  );
};
