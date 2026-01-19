import { Box, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AuthContext } from "src/auth";
import { useResource } from "../hooks";

export type DesktopMobileAppBannerProps = {};

const DesktopMobileAppBanner: FC<DesktopMobileAppBannerProps> = () => {
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

  return (
    applicationData?.merchantApplicationDeployment?.iosAppUrl &&
      applicationData?.merchantApplicationDeployment?.androidAppUrl ? (
        <Box border={"1px solid"} borderColor={"grey.50"} py="24px">
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            {currentMerchant?.data?.merchantIcon?.imageUpload?.url && (
              <Box pr="24px" className="cookie-info-icon">
                <Image
                  src={currentMerchant?.data?.merchantIcon?.imageUpload?.url}
                  alt={`${currentMerchant?.data?.name}`}
                  width="100px"
                  height="100px"
                />
              </Box>
            )}
            <Box px="8px">
              <Typography variant="h6" fontWeight="light" lineHeight="20px">
                <Typography variant="h3" fontWeight="bold" sx={{ pb: "12px" }}>
                  แอพพลิเคชั่นพร้อมให้ดาวน์โหลดแล้ว
                </Typography>
                <Typography variant="h4">
                  สามารถคลิกดาวน์โหลดได้ทาง App Store และ Google Play แล้ววันนี้
                </Typography>
              </Typography>
            </Box>
            <Box px="24px">
              <Box
                py="2px"
                className="cookie-info-icon"
                sx={{ cursor: "pointer" }}
              >
                <a
                  href={
                    applicationData?.merchantApplicationDeployment?.iosAppUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={"/app-stores.png"}
                    alt="merchant icon"
                    width="125px"
                    height="37.5px"
                  />
                </a>
              </Box>
              <Box
                py="2px"
                className="cookie-info-icon"
                sx={{ cursor: "pointer" }}
              >
                <a
                  href={
                    applicationData?.merchantApplicationDeployment
                      ?.androidAppUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={"/play-stores.png"}
                    alt="merchant icon"
                    width="125px"
                    height="37.5px"
                  />
                </a>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <></>
      )
  )
}

export default DesktopMobileAppBanner;
