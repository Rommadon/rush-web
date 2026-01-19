import { FC, useContext, useState, useEffect } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import NextLink from "next/link";
import router from "next/router";

import {
  DefaultLayout,
  DefaultLayoutProp,
  ChevronLeftIcon,
  routes,
  useResource,
} from "src/core";
import { AuthContext } from "src";
import { useToast } from "src/core/hooks/useToast";

export type ChangePasswordProps = DefaultLayoutProp & {};

export const ChangePassword: FC<ChangePasswordProps> = (props) => {
  const resource = useResource();
  const toast = useToast();
  const { profile } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isCanSubmit, setIsCanSubmit] = useState(false);
  const [onLoading, setOnLoading] = useState(false);

  useEffect(() => {
    if (
      profile?.isHavePassword &&
      password &&
      oldPassword &&
      newPassword &&
      password !== "" &&
      oldPassword !== "" &&
      newPassword !== "" &&
      oldPassword == newPassword
    ) {
      setIsCanSubmit(true);
    } else if (
      password &&
      newPassword &&
      password !== "" &&
      newPassword !== "" &&
      password == newPassword
    ) {
      setIsCanSubmit(true);
    } else {
      setIsCanSubmit(false);
    }
  }, [profile, password, oldPassword, newPassword]);

  const onSubmit = async () => {
    setOnLoading(true);

    if (profile?.isHavePassword) {
      try {
        await resource.updateResourceWithoutId("user/changeCustomerPassword", {
          oldPassword,
          newPassword,
        });

        router.push(`/me/personal-info`).then(() => {
          setOnLoading(false);
          toast.openToast("การเปลี่ยนรหัสผ่านสำเร็จ", "success");
        });
      } catch (error) {
        setOnLoading(false);
        toast.openToast("การเปลี่ยนรหัสผ่านไม่สำเร็จ", "error");
      }
    } else {
      try {
        await resource.updateResourceWithoutId("user/setCustomerPassword", {
          password,
        });

        router.push(`/me/personal-info`).then(() => {
          setOnLoading(false);
          toast.openToast("การตั้งรหัสผ่านสำเร็จ", "success");
        });
      } catch (error) {
        toast.openToast("การตั้งรหัสผ่านไม่สำเร็จ", "error");
        setOnLoading(false);
      }
    }
  };

  return (
    <DefaultLayout {...props}>
      <Box mt="58px" width="100%">
        <Box display="flex" mb="40px">
          <NextLink href={routes.personalInfo()}>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </NextLink>
          {profile?.email ? (
            profile?.isHavePassword ? (
              <Typography variant="h1" component="h1" pl="8px">
                เปลี่ยนรหัสผ่าน
              </Typography>
            ) : (
              <Typography variant="h1" component="h1" pl="8px">
                ตั้งรหัสผ่าน
              </Typography>
            )
          ) : (
            <Typography variant="h1" component="h1" pl="8px">
              กรุณาตั้ง EMAIL ก่อน
            </Typography>
          )}
        </Box>
        {profile?.email ? (
          <Box width="768px" mx="auto">
            <Box
              p="32px"
              border="1px solid"
              borderColor="grey.100"
              borderRadius="8px"
            >
              {profile?.isHavePassword && (
                <Box mb="16px">
                  <Typography variant="h4" mb="16px">
                    รหัสผ่านเดิม
                  </Typography>
                  <TextField
                    type="password"
                    fullWidth
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Box>
              )}
              <Box display="flex">
                <Box flex="1" pr="8px">
                  <Typography variant="h4" mb="16px">
                    รหัสผ่านใหม่
                  </Typography>
                  <TextField
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>

                <Box flex="1" pl="8px">
                  <Typography variant="h4" mb="16px">
                    ยืนยันรหัสผ่านใหม่
                  </Typography>
                  <TextField
                    type="password"
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Box>
              </Box>
            </Box>
            <Box height="48px" />
            <Button
              variant="contained"
              fullWidth
              disableElevation
              sx={{ py: "16px", borderRadius: "8px" }}
              disabled={!isCanSubmit}
              onClick={() => onSubmit()}
            >
              {onLoading ? (
                <CircularProgress color="info" />
              ) : profile?.isHavePassword ? (
                "ยืนยันการเปลี่ยนรหัสผ่าน"
              ) : (
                "ยืนยัน"
              )}
            </Button>
          </Box>
        ) : (
          <Box
            bottom="0"
            m="auto"
            p="32px"
          >
            <NextLink href={routes.editPersonalInfo()}>
              <Button
                variant="outlined"
                fullWidth
                sx={{ py: "16px", borderRadius: "8px" }}
              >
                <Typography variant="h4">ตั้ง email</Typography>
              </Button>
            </NextLink>
          </Box>
        )}
      </Box>
    </DefaultLayout>
  );
};
