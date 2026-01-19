import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Typography,
  Box,
  IconButton,
  FormControl,
  TextField,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { CloseIcon, ChevronLeftIcon } from "../../core";

export type VerifyOtpFormProp = {
  phoneNumber: string;
  otpRef: string;
  timeLimit: number;
  handleBack?: () => any;
  handleClose?: () => any;
  handleSubmit: (data: any) => any;
};

export const VerifyOtpForm: FC<VerifyOtpFormProp> = (props) => {
  const t = useTranslations("auth.verifyOtpForm");
  const [countdown, setCountdown] = useState(props.timeLimit ?? 300);
  const { register, handleSubmit, watch, formState } = useForm({ mode: "all" });
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    let interval: NodeJS.Timer;
    interval = setInterval(() => {
      if (countdown === 0) {
        return clearInterval(interval);
      }
      setCountdown(countdown - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <Box
      component="form"
      px={isDesktop ? "0px" : "16px"}
      onSubmit={handleSubmit(props.handleSubmit)}
    >
      <Box display="flex" justifyContent={"space-between"}>
        {props.handleBack && (
          <IconButton onClick={props.handleBack}>
            <ChevronLeftIcon fill="black" />
          </IconButton>
        )}
        {props.handleClose && (
          <IconButton onClick={props.handleClose}>
            <CloseIcon fill="black" />
          </IconButton>
        )}
      </Box>
      {isDesktop && (
        <>
          <Typography variant="h2" component="h2" textAlign="center">
            {t("identityVerification")}
          </Typography>
          <Box borderBottom="1px solid" borderColor="grey.100" my="32px" />
        </>
      )}
      {!isDesktop && <Box mt="64px" />}
      <Typography variant="h4" textAlign="center" mb="16px">
        {t("otpSentTo")}
      </Typography>
      <Typography variant="h2" textAlign="center" mb="16px">
        (+66){props.phoneNumber}
      </Typography>
      {!isDesktop && <Box mt="32px" />}
      <Typography variant="h4" mb="16px">
        {t("otpRef", { ref: props.otpRef })}
      </Typography>
      <FormControl fullWidth sx={{ borderRadius: "16px" }}>
        <TextField
          fullWidth
          inputProps={{
            maxLength: 6,
            inputMode: "numeric",
            pattern: "[0-9]{6}",
          }}
          InputLabelProps={{ shrink: true }}
          {...register("otp", { required: true, pattern: /[0-9]{6}/ })}
        />
      </FormControl>
      <Box my="16px">
        <Button
          type="submit"
          disableElevation
          disabled={!formState.isValid}
          variant="contained"
          fullWidth
          sx={{ py: "16px" }}
        >
          {t("confirm")}
        </Button>
      </Box>

      <Typography variant="h4" component="p" textAlign="center" mt="32px">
        {t("sendAgain")}
        {countdown > 0 && (
          <>
            (
            <Typography component="span" color="primary">
              {countdown}
            </Typography>{" "}
            {t("second")})
          </>
        )}
      </Typography>
    </Box>
  );
};
