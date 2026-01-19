import { FC, ReactNode, useContext } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { AppBar, Box, SvgIcon, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { AuthContext } from "../../auth";

export type MobileAppBarProps = {
  title: string | ReactNode;
  isArticle?: boolean;
  onBackClick?: () => any | null;
  noArrow?: boolean;
  type?: string;
  right?: ReactNode;
};

export const MobileAppBar: FC<MobileAppBarProps> = (props) => {
  const { currentMerchant, profile } = useContext(AuthContext);
  const router = useRouter();

  let onClick = () => router.back();

  if (props.onBackClick) {
    onClick = props.onBackClick;
  }

  return (
    <Box>
      <AppBar
        sx={{
          p: props.type !== "link-pay" ? "16px 20px" : "12px 20px",
          background: "white",
          color: "black",
          borderBottom: "1px solid",
          borderColor: "grey.100",
        }}
        elevation={0}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box flex={"1"}>
            {props.type === "link-pay" && (
              <Box>
                <Box position="relative" height="auto" width="90px">
                  {currentMerchant?.data?.merchantLogo?.imageUpload ? (
                    <NextLink href={"/"}>
                      <a
                        style={{
                          display: "block",
                          width: "90px",
                          height: "42px",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={
                            currentMerchant?.data?.merchantLogo?.imageUpload
                              ?.url
                          }
                          alt={`${currentMerchant?.data?.name}`}
                          layout="fill"
                          objectFit="contain"
                          priority={true}
                        />
                      </a>
                    </NextLink>
                  ) : (
                    ""
                  )}
                </Box>
                {currentMerchant?.data?.merchantLogo?.imageUpload ? (
                  ""
                ) : (
                  <NextLink href={"/"}>
                    <Typography
                      component="h2"
                      variant="h2"
                      mr="16px"
                      sx={{ cursor: "pointer" }}
                      py="10px"
                    >
                      {currentMerchant?.data?.name}
                    </Typography>
                  </NextLink>
                )}
              </Box>
            )}
            {!props.noArrow && props.type !== "link-pay" && (
              <SvgIcon viewBox="0 0 18 12" onClick={onClick}>
                <path
                  d="M17.3287 4.99999V6.99999L4.50042 6.99999L7.74294 10.2425L6.32873 11.6567L0.671875 5.99987L6.32873 0.343018L7.74294 1.75723L4.50019 4.99999L17.3287 4.99999Z"
                  fill="black"
                />
              </SvgIcon>
            )}
          </Box>

          {props.isArticle ? (
            <Box
              flex="2"
              height="40px"
              display="flex"
              marginLeft="-30%"
              alignItems="center"
              justifyContent="center"
              textOverflow="ellipse"
            >
              {typeof props.title === "string" && (
                <Typography textAlign="left">{props.title}</Typography>
              )}
              {typeof props.title !== "string" && props.title}
            </Box>
          ) : (
            <Box>
              {props.type !== "link-pay" && (
                <Box
                  flex="2"
                  height="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  textOverflow="ellipse"
                >
                  {typeof props.title === "string" && (
                    <Typography textAlign="center">{props.title}</Typography>
                  )}
                  {typeof props.title !== "string" && props.title}
                </Box>
              )}
            </Box>
          )}
          {!props.isArticle && (
            <Box
              flex="1"
              display="flex"
              flexDirection="column"
              textAlign="right"
              justifyContent="flex-end"
            >
              {props.type === "link-pay" && <Box>LINKPAY</Box>}
              {props.right}
            </Box>
          )}
        </Box>
      </AppBar>
      <Box mt="73px">{props.children}</Box>
    </Box>
  );
};

MobileAppBar.defaultProps = {
  isArticle: false,
};
