import { Box, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AuthContext } from "src/auth";
import { useResource } from "../hooks";

export type MobileAppBannerProps = {};

const MobileAppBanner: FC<MobileAppBannerProps> = () => {
  const { currentMerchant } = useContext(AuthContext);
  const resource = useResource();

  const [applicationData, setApplicationData] = useState<any>(null);

  useEffect(() => {
    if (currentMerchant) {
      onFetchAppliactionData();
    }
  }, [currentMerchant]);

  const onFetchAppliactionData = async () => {
    const response = await resource.fetchResource(
      "merchant-application-configuration-public",
      {},
      null
    );
    setApplicationData(response?.data?.data);
  };

  return applicationData?.merchantApplicationDeployment?.iosAppUrl &&
    applicationData?.merchantApplicationDeployment?.androidAppUrl ? (
    <Box border={"1px solid"} borderColor={"grey.50"} py="24px">
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        {currentMerchant?.data?.merchantIcon?.imageUpload?.url && (
          <Box pr="24px" className="cookie-info-icon" display={{ xs: "none" }}>
            <Image  
              src={currentMerchant?.data?.merchantIcon?.imageUpload?.url}
              alt={`${currentMerchant?.data?.name}`}
              width="100px"
              height="100px"
  unoptimized={true}
/>
          </Box>
        )}
        <Box px="8px" textAlign={"center"}>
          <Typography variant="h6" fontWeight="light" lineHeight="20px">
            <Typography variant="h3" fontWeight="bold" sx={{ pb: "8px" }}>
              แอพพลิเคชั่นพร้อมให้ดาวน์โหลดแล้ว
            </Typography>
            <Typography variant="h4">
              ดาวน์โหลดได้ทาง App Store และ Google Play
            </Typography>
          </Typography>
        </Box>
      </Box>
      <Box
        px="24px"
        pt="16px"
        textAlign={"center"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box py="2px" px="8px" sx={{ cursor: "pointer" }}>
          <a
            href={applicationData?.merchantApplicationDeployment?.iosAppUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Image  
              src={"/app-stores.png"}
              alt={`${currentMerchant?.data?.name} - app store`}
              width="100px"
              height="30px"
  unoptimized={true}
/>
          </a>
        </Box>
        <Box py="2px" px="8px" sx={{ cursor: "pointer" }}>
          <a
            href={applicationData?.merchantApplicationDeployment?.androidAppUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Image  
              src={"/play-stores.png"}
              alt={`${currentMerchant?.data?.name} - play store`}
              width="100px"
              height="30px"
  unoptimized={true}
/>
          </a>
        </Box>
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export default MobileAppBanner;
