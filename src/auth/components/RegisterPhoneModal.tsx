import { FC } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

import { useAuth, useResource } from "src";
import { useToast } from "src/core/hooks/useToast";
import { useForm } from "react-hook-form";
import Axios from "axios";
import router from "next/router";

import { routes } from "src/core";
import TelephoneField from "./TelephoneField";

export type RegisterPhoneModalProp = {
  open: boolean;
  handleClose: () => any;
  isDesktop: any;
  product: any;
  // handleOpen: () => any
  // handleClose: () => any
};

export const RegisterPhoneModal: FC<RegisterPhoneModalProp> = (props) => {
  const {
    token,
    profile,
    baseApiUrl,
    currentMerchant,
    setToken: handleSetToken,
    setProfile: handleSetProfile,
    setIsAuth: handleSetIsAuth,
  } = useAuth();
  const { register, handleSubmit, formState, watch } = useForm();
  const toast = useToast();
  const resource = useResource();

  const handleLoginWithTel = async (data: any) => {
    try {
      const resultLogin = await resource.createResource("auth/loginWithTel", {
        countryCode: "+66",
        tel: data["tel"].length === 10 ? data["tel"] : `0${data["tel"]}`,
      });
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resultLogin?.data?.access_token}`,
        CurrentMerchantSlug: `${currentMerchant?.data?.slug || "-"}`,
      };
      // const path = "customer-public";
      // const resultProfile = await Axios.get(`${baseApiUrl}/${path}`, {
      //   headers: headers,
      //   params: {},
      // });
      const resultFavorite = await Axios.post(
        `${baseApiUrl}/customer-product-favorite-public`,
        {
          productId: props?.product?.id,
          status: "active", // or assign the appropriate value for the "active" key
        },
        {
          headers: headers,
        }
      );

      props.handleClose();
      router.push(routes.product({ slug: props.product.slug }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={props.open}>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "720px",
          maxWidth: "90vw",
          transform: "translate(-50%, -50%)",
          bgcolor: "common.white",
          boxShadow: 24,
          borderRadius: "8px",
          p: "36px 32px 64px 32px",
        }}
      >
        <Box
          component="form"
          px={props.isDesktop ? "0px" : "16px"}
          onSubmit={handleSubmit(handleLoginWithTel)}
        >
          {/* {props.handleClose && (
            <Box display="flex" justifyContent={"flex-end"}>
              <IconButton onClick={props.handleClose}>
                <CloseIcon fill="common.black" />
              </IconButton>
            </Box>
          )} */}
          {props.isDesktop && (
            <Typography variant="h2" component="h2" textAlign="center">
              สนใจสั่งซื้อ
            </Typography>
          )}
          {!props.isDesktop && (
            <Typography
              component="h1"
              fontSize="24px"
              textAlign="center"
              pt="32px"
              pb="48px"
              fontWeight="light"
            >
              สนใจสั่งซื้อ
            </Typography>
          )}
          <Typography mb="16px" fontWeight="light">
            เบอร์โทร
          </Typography>
          <TelephoneField
            countryCode={"+66"}
            register={register("tel", {
              required: true,
              pattern: /[0-9]{9,10}/,
            })}
          />
          <Box my="32px">
            <Button
              disableElevation
              variant="contained"
              fullWidth
              sx={{
                py: "16px",
                borderRadius: "8px",
              }}
              type="submit"
            >
              สนใจสั่งซื้อ
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default RegisterPhoneModal;
