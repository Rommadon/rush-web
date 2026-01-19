import { FC, useState } from "react";
import {
  Typography,
  Box,
  IconButton,
  Button,
  Link,
  useMediaQuery,
  Checkbox,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import NextLink from "next/link";

import { CloseIcon } from "../../core";
import { SocialLogin } from "./SocialLogin";
import TelephoneField from "./TelephoneField";

export type RequestOtpFormProp = {
  handleClose?: () => any;
  handleSubmit: (data: any) => any;
  handleChangeToPassword: () => any;
  countryCode: string;
  shopName?: string;
};

export const RequestOtpForm: FC<RequestOtpFormProp> = (props) => {
  const t = useTranslations("auth.requestOtpForm");
  const { register, handleSubmit, formState } = useForm({ mode: "onChange" });
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [onCheckPolicy, setOnCheckPolicy] = useState(true);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(props.handleSubmit)}
      px={isDesktop ? "0px" : "16px"}
    >
      <Box display="flex" justifyContent={"flex-end"}>
        {props.handleClose && (
          <IconButton onClick={props.handleClose}>
            <CloseIcon fill="common.black" />
          </IconButton>
        )}
      </Box>
      {isDesktop && (
        <Typography variant="h2" component="h2" textAlign="center">
          {t("title")}
        </Typography>
      )}
      {!isDesktop && (
        <Typography
          component="h1"
          fontSize="24px"
          textAlign="center"
          pt="32px"
          pb="48px"
          fontWeight="light"
        >
          ยินดีต้อนรับสู่ {props.shopName}
        </Typography>
      )}
      {/* <Box borderBottom="1px solid" borderColor="grey.100" my="32px" /> */}
      <Typography mb="16px" fontWeight="light">
        {t("phoneNumber")}
      </Typography>
      <TelephoneField
        countryCode={props.countryCode}
        register={register("tel", { required: true, pattern: /[0-9]{9,10}/ })}
      />
      <Box display="flex" py="8px" alignItems="center">
        <Checkbox
          checked={onCheckPolicy}
          size="small"
          onChange={(event) => setOnCheckPolicy(event.target.checked)}
        />
        <Typography variant="h6" lineHeight="20px">
          คุณยอมรับนโยบายความเป็นส่วนตัวของเรา (
          <Typography
            component="span"
            variant="h6"
            lineHeight="20px"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
          >
            <NextLink href="/terms-and-policies#privacy-policy">
              เรียนรู้เพิ่มเติม
            </NextLink>
          </Typography>
          ) และเงื่อนไขการให้บริการ (
          <Typography
            component="span"
            variant="h6"
            lineHeight="20px"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
          >
            <NextLink href="/terms-and-policies#terms-service-policy">
              เรียนรู้เพิ่มเติม
            </NextLink>
          </Typography>
          )
        </Typography>
      </Box>
      <Box my="16px">
        <Button
          type="submit"
          disableElevation
          variant="contained"
          fullWidth
          sx={{ py: "16px" }}
          disabled={!formState.isValid || !onCheckPolicy}
        >
          {t("sendOtp")}
        </Button>
      </Box>
      <Box display="flex" justifyContent="center">
        <Link
          textAlign="center"
          fontWeight="light"
          color="common.black"
          pt="20px"
          sx={{ cursor: "pointer" }}
          onClick={props.handleChangeToPassword}
        >
          เข้าสู่ระบบด้วยรหัสผ่าน
        </Link>
      </Box>

      <SocialLogin />
    </Box>
  );
};

export default RequestOtpForm;
