import { Box, Typography, useMediaQuery } from "@mui/material";
import Axios from "axios"
import { useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";

export default function InternalServerErrorPage() {
  const [currentMerchant, setCurrentMerchant] = useState<any>();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    async function fetchMerchant() {
      if (window.location.href && ['lvh', 'staging.myshopdit', 'myshopdit', 'rushbps'].includes(window.location.href.split('.').slice(1, -1).join('.'))) {
        const merchantSlug = window.location.href.split('//')[1].split('.')[0];
        const host = window.location.href.split('//')[1];
        let merchantDomain = {};

        if (host && !host.includes('myshopdit.com') && !host.includes('rushbps.com')) {
          merchantDomain = {
            'CurrentMerchantDomain': host.split('/')[0].replace('www.','')
          };
        }

        const headers = {
          'Content-Type': 'application/json',
          'CurrentMerchantSlug': `${merchantSlug || '-'}`,
          ...merchantDomain,
        }

        try {
          const { data } = await Axios.get(`${process.env.API_HOST}/merchant-public`, {
            headers: headers,
            params: {}
          })
  
          setCurrentMerchant(data);
        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchMerchant();
  }, [])

  return (
    <Box style={{
      color: "#000",
      background: "#fff",
      height: "100vh",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {
        currentMerchant?.data?.merchantIcon?.imageUpload && (
          <NextLink href={"/"}>
            <Box style={{ display: 'block', width: '100%', height: isDesktop ? '100px' : '75px', position: "relative" }}>
              <Image src={currentMerchant?.data?.merchantIcon?.imageUpload?.url} alt="shopdit logo" layout="fill" objectFit="contain" priority={true} />
            </Box>
          </NextLink>
        )
      }
      <Typography variant="h4" py="16px">ไม่พบหน้าเว็บไซด์นี้</Typography>
    </Box>
  )
}

