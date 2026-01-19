import { FC } from "react";
import {
  Typography,
  Box,
  Button,
  Divider,
  SvgIcon,
} from "@mui/material";
import { useTranslations } from "next-intl";
import NextImage from 'next/image'

export type SocialLoginProp = {};

export const SocialLogin: FC<SocialLoginProp> = (props) => {
  const t = useTranslations('auth.socialLogin')
  return (
    <>
      {/* <Divider sx={{ marginY: "32px" }}>{t("or")}</Divider>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="16px">
        <Button
          // @ts-ignore
          color={"facebook"} 
          variant="contained"
          sx={{
            justifyContent: "flex-start",
            textTransform: "initial",
          }}
          fullWidth
          startIcon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.5 12.0699C23.5 5.7186 18.3513 0.56988 12 0.56988C5.64872 0.56988 0.5 5.7186 0.5 12.0699C0.5 17.8099 4.70538 22.5674 10.2031 23.4302V15.3941H7.2832V12.0699H10.2031V9.53629C10.2031 6.6541 11.92 5.06207 14.5468 5.06207C15.805 5.06207 17.1211 5.28668 17.1211 5.28668V8.11675H15.671C14.2424 8.11675 13.7969 9.00322 13.7969 9.91266V12.0699H16.9863L16.4765 15.3941H13.7969V23.4302C19.2946 22.5674 23.5 17.8099 23.5 12.0699Z"
                fill="white"
              />
            </svg>
          }
        >
          <Typography textAlign="center" width="100%" fontWeight="700">
            Facebook
          </Typography>
        </Button>
        <Button
          variant="contained"
          // @ts-ignore
          color={"line"}
          sx={{
            justifyContent: "flex-start",
            textTransform: "initial",
          }}
          startIcon={<NextImage src="/icons/line.png" width={24} height={24} />}
        >
          <Typography textAlign="center" width="100%" fontWeight="700">
            Line
          </Typography>
        </Button>
        <Button
          variant="contained"
          // @ts-ignore
          color={"google"}
          sx={{
            justifyContent: "flex-start",
            textTransform: "initial",
          }}
          startIcon={
            <SvgIcon viewBox="0 0 40 40">
              <rect width="40" height="40" fill="white" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.54 19.7613C31.54 18.9459 31.4668 18.1618 31.3309 17.4091H20.5V21.8575H26.6891C26.4225 23.295 25.6123 24.5129 24.3943 25.3284V28.2138H28.1109C30.2855 26.2118 31.54 23.2636 31.54 19.7613Z"
                fill="#4285F4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.4995 30.9998C23.6045 30.9998 26.2077 29.97 28.1104 28.2137L24.3938 25.3282C23.364 26.0182 22.0467 26.4259 20.4995 26.4259C17.5042 26.4259 14.969 24.403 14.0647 21.6848H10.2227V24.6644C12.1149 28.4228 16.004 30.9998 20.4995 30.9998Z"
                fill="#34A853"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.0652 21.6851C13.8352 20.9951 13.7045 20.2581 13.7045 19.5001C13.7045 18.7422 13.8352 18.0051 14.0652 17.3151V14.3356H10.2232C9.44432 15.8881 9 17.6444 9 19.5001C9 21.3558 9.44432 23.1122 10.2232 24.6647L14.0652 21.6851Z"
                fill="#FBBC05"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.4995 12.5739C22.1879 12.5739 23.7038 13.1541 24.8956 14.2936L28.194 10.9952C26.2024 9.13955 23.5992 8 20.4995 8C16.004 8 12.1149 10.577 10.2227 14.3355L14.0647 17.315C14.969 14.5968 17.5042 12.5739 20.4995 12.5739Z"
                fill="#EA4335"
              />
            </SvgIcon>
          }
        >
          <Typography textAlign="center" width="100%" fontWeight="700">
            Google
          </Typography>
        </Button>
        <Button
          // @ts-ignore
          color="apple"
          variant="contained"
          startIcon={
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.2798 18.424C18.932 19.2275 18.5203 19.9672 18.0433 20.6472C17.393 21.5743 16.8606 22.216 16.4503 22.5724C15.8143 23.1573 15.1329 23.4568 14.4031 23.4739C13.8792 23.4739 13.2475 23.3248 12.5121 23.0224C11.7742 22.7214 11.0962 22.5724 10.4762 22.5724C9.82598 22.5724 9.12861 22.7214 8.3827 23.0224C7.63565 23.3248 7.03383 23.4824 6.5737 23.498C5.87393 23.5278 5.17643 23.2197 4.4802 22.5724C4.03583 22.1848 3.48002 21.5204 2.81417 20.5791C2.09977 19.5739 1.51244 18.4084 1.05231 17.0795C0.55953 15.6442 0.3125 14.2543 0.3125 12.9087C0.3125 11.3673 0.645564 10.0379 1.31269 8.92385C1.83698 8.029 2.53449 7.32312 3.40747 6.80493C4.28045 6.28674 5.2237 6.02267 6.23951 6.00578C6.79532 6.00578 7.5242 6.1777 8.42998 6.51559C9.33319 6.85462 9.91315 7.02655 10.1674 7.02655C10.3575 7.02655 11.0018 6.82552 12.094 6.42473C13.1268 6.05305 13.9985 5.89916 14.7126 5.95978C16.6477 6.11595 18.1015 6.87876 19.0683 8.25303C17.3377 9.30163 16.4816 10.7703 16.4986 12.6544C16.5142 14.122 17.0466 15.3432 18.0929 16.3129C18.5671 16.7629 19.0967 17.1107 19.6859 17.3578C19.5581 17.7283 19.4232 18.0832 19.2798 18.424ZM14.8418 0.960131C14.8418 2.11039 14.4216 3.18439 13.5839 4.17847C12.5731 5.36023 11.3505 6.04311 10.0246 5.93536C10.0077 5.79736 9.9979 5.65213 9.9979 5.49951C9.9979 4.39526 10.4786 3.21349 11.3323 2.24724C11.7585 1.75801 12.3005 1.35122 12.9579 1.02671C13.6138 0.707053 14.2342 0.530273 14.8177 0.5C14.8347 0.653772 14.8418 0.807554 14.8418 0.960116V0.960131Z"
                fill="white"
              />
            </svg>
          }
        >
          <Typography
            textAlign="center"
            width="100%"
            fontWeight="700"
            sx={{ textTransform: "initial" }}
          >
            Apple
          </Typography>
        </Button>
      </Box> */}
      <Box py="32px">
        <Divider></Divider>
      </Box>
      <Box textAlign="center">
        <Typography variant="h6">{t("footer")}</Typography>
      </Box>
    </>
  );
};
