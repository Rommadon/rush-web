import { FC, useState, useContext, useEffect } from "react";
import { Modal, Box, TextField, Typography, Select, MenuItem, Button, CircularProgress } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import { MobileAppBar, routes, useResource, useToast } from "src/core";
import TelephoneField from "src/auth/components/TelephoneField";
import { AuthContext } from "src";
import { useForm } from "react-hook-form";
import router from "next/router";

export type EditInfoModalProps = {
  open: boolean;
  onClose: () => any;
  onSubmitEditCustomer?: (data: any) => Promise<void>;
  profile?: any;
  onLoading?: boolean;
  mode: "name" | "email" | "password" | "birthDate" | "tel" | string;
};

export const EditInfoModal: FC<EditInfoModalProps> = (props) => {
  const Component = {
    name: EditName,
    email: EditEmail,
    password: EditPassword,
    birthDate: EditBirthDate,
    tel: EditTel,
    gender: EditGender,
  }[props.mode];
  const resource = useResource();
  const { profile, setProfile, setIsAuth } = useContext(AuthContext);
  const toast = useToast();

  const [onLoading, setOnLoading] = useState(false);

  const onSubmitEditCustomer = async (data: any) => {
    setOnLoading(true);
    let fd = await new FormData();

    if (data.file && typeof data.file === "object") {
      await fd.append('file', data.file, `profile-${new Date().toDateString}`);
    }

    if (data.name) {
      await fd.append('fullName', data.name);
    }

    if (data.gender) {
      await fd.append('gender', data.gender);
    }

    if (data.birthDate) {
      await fd.append('birthDate', data.birthDate.toString());
    }

    if (data.email) {
      await fd.append('email', data.email);
    }

    if (data.tel) {
      await fd.append('tel', data.tel);
    }

    try {
      await resource.updateResourceWithFormDataWithoutId('customer-public', fd);
      const customerProfile = await resource.fetchResource('customer-public', {}, '');
      const dataProfile = customerProfile?.data ? customerProfile?.data?.data : {}

      setProfile({
        ...profile,
        ...dataProfile
      });

      router.push(routes.me()).then(() => {
        toast.openToast('การแก้ไขข้อมูลส่วนตัวสำเร็จ', 'success');
      })
      setOnLoading(false);
    } catch (error) {
      toast.openToast('การแก้ไขข้อมูลส่วนตัวไม่สำเร็จ', 'error');
    }
  }

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          position: "absolute",
          top: "0",
          left: "0%",
          width: "100%",
          height: "100%",
          bgcolor: "common.white",
          p: "36px 32px 64px 32px",
        }}
      >
        {Component && <Component
          {...props}
          onSubmitEditCustomer={(data: any) => onSubmitEditCustomer(data)}
          profile={profile}
          onLoading={onLoading}
        />
        }
      </Box>
    </Modal>
  );
};

const EditName: FC<EditInfoModalProps> = (props) => {
  const [name, setName] = useState(props?.profile?.fullName)
  return (
    <>
      <MobileAppBar title={"เปลี่ยนชื่อ"} onBackClick={props.onClose} />
      <Typography variant="h2" mb="16px">ชื่อ</Typography>
      <TextField value={name} onChange={(e) => setName(e.target.value)} />
      <Button
        variant="outlined"
        fullWidth
        disableElevation
        disabled={props.onLoading}
        onClick={() => props.onSubmitEditCustomer && props.onSubmitEditCustomer({ name })}
        sx={{ py: "16px", mt: "20px", borderRadius: "8px", mr: "8px", color: "primary.main", borderColor: "primary.main" }}
      >
        {props.onLoading ? <CircularProgress color="info" /> : "ยืนยัน"}
      </Button>
    </>
  );
};

const EditPassword: FC<EditInfoModalProps> = (props) => {
  const resource = useResource();
  const toast = useToast();
  const { profile } = useContext(AuthContext);

  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isCanSubmit, setIsCanSubmit] = useState(false);
  const [onLoading, setOnLoading] = useState(false);

  useEffect(() => {
    if (profile?.isHavePassword && password && oldPassword && newPassword && password !== '' && oldPassword !== '' && newPassword !== '' && oldPassword == newPassword) {
      setIsCanSubmit(true);
    } else if (password && newPassword && password !== '' && newPassword !== '' && password == newPassword) {
      setIsCanSubmit(true);
    } else {
      setIsCanSubmit(false);
    }
  }, [profile, password, oldPassword, newPassword])

  const onSubmit = async () => {
    setOnLoading(true);

    if (profile?.isHavePassword) {
      try {
        await resource.updateResourceWithoutId('user/changeCustomerPassword', {
          oldPassword,
          newPassword
        })

        router.push(`/me/personal-info`).then(() => {
          setOnLoading(false);
          toast.openToast('การเปลี่ยนรหัสผ่านสำเร็จ', 'success');
        })
      } catch (error) {
        setOnLoading(false);
        toast.openToast('การเปลี่ยนรหัสผ่านไม่สำเร็จ', 'error');
      }
    } else {
      try {
        await resource.updateResourceWithoutId('user/setCustomerPassword', {
          password,
        })

        router.push(`/me/personal-info`).then(() => {
          setOnLoading(false);
          toast.openToast('การตั้งรหัสผ่านสำเร็จ', 'success');
        })
      } catch (error) {
        toast.openToast('การตั้งรหัสผ่านไม่สำเร็จ', 'error');
        setOnLoading(false);
      }
    }
  }

  return (
    <>
      <MobileAppBar title={profile?.isHavePassword ? "เปลี่ยนรหัสผ่าน" : "ตั้งรหัสผ่าน"} onBackClick={props.onClose} />
      {
        profile?.isHavePassword ? (
          <>
            <Box mb="16px">
              <Typography variant="h4" mb="16px">
                รหัสผ่านเดิม
              </Typography>
              <TextField type="password" fullWidth value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </Box>
            <Box mb="16px">
              <Typography variant="h4" mb="16px">
                รหัสผ่านใหม่
              </Typography>
              <TextField type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            </Box>
            <Box mb="20px">
              <Typography variant="h4" mb="16px">
                ยืนยันรหัสผ่านใหม่
              </Typography>
              <TextField type="password" fullWidth value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Box>
            <Button
              variant="outlined"
              fullWidth
              disableElevation
              sx={{ py: '16px', borderRadius: '8px', color: "primary.main", borderColor: "primary.main" }}
              disabled={!isCanSubmit}
              onClick={() => onSubmit()}
            >
              {
                onLoading ? (
                  <CircularProgress color="info" />
                ) : (
                  profile?.isHavePassword ? (
                    'ยืนยันการเปลี่ยนรหัสผ่าน'
                  ) : (
                    'ยืนยัน'
                  )
                )
              }
            </Button>
          </>
        ) : (
          <>
            <Box mb="16px">
              <Typography variant="h4" mb="16px">
                รหัสผ่านใหม่
              </Typography>
              <TextField type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            </Box>
            <Box mb="20px">
              <Typography variant="h4" mb="16px">
                ยืนยันรหัสผ่านใหม่
              </Typography>
              <TextField type="password" fullWidth value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Box>
            <Button
              variant="outlined"
              fullWidth
              disableElevation
              sx={{ py: '16px', borderRadius: '8px', color: "primary.main", borderColor: "primary.main" }}
              onClick={() => onSubmit()}
            >
              {
                onLoading ? (
                  <CircularProgress color="info" />
                ) : (
                  profile?.isHavePassword ? (
                    'ยืนยันการเปลี่ยนรหัสผ่าน'
                  ) : (
                    'ยืนยัน'
                  )
                )
              }
            </Button>
          </>
        )
      }
    </>
  );
};

const EditGender: FC<EditInfoModalProps> = (props) => {
  const [gender, setGender] = useState(props?.profile?.gender);

  return (
    <>
      <MobileAppBar title={"เปลี่ยนเพศ"} onBackClick={props.onClose} />
      <Select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        fullWidth
      >
        <MenuItem value="male">ชาย</MenuItem>
        <MenuItem value="female">หญิง</MenuItem>
      </Select>
      <Button
        variant="outlined"
        fullWidth
        disableElevation
        disabled={props.onLoading}
        onClick={() => props.onSubmitEditCustomer &&  props.onSubmitEditCustomer({ gender })}
        sx={{ py: "16px", mt: "20px", borderRadius: "8px", mr: "8px", color: "primary.main", borderColor: "primary.main" }}
      >
        {props.onLoading ? <CircularProgress color="info" /> : "ยืนยัน"}
      </Button>
    </>
  );
};

const EditBirthDate: FC<EditInfoModalProps> = (props) => {
  const [birthDate, setBirthDate] = useState(props?.profile?.birthDate ? new Date(props?.profile?.user?.birthDate) : null);

  return (
    <>
      <MobileAppBar title={"เปลี่ยนวันเกิด"} onBackClick={props.onClose} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          inputFormat="dd/MM/yyyy"
          renderInput={(props) => (
            <TextField {...props} sx={{ flex: 1, width: "100%" }} />
          )}
          value={birthDate}
          onChange={(newDate) => setBirthDate(newDate)}
        />
      </LocalizationProvider>
      <Button
        variant="outlined"
        fullWidth
        disableElevation
        disabled={props.onLoading}
        onClick={() => props.onSubmitEditCustomer &&  props.onSubmitEditCustomer({ birthDate })}
        sx={{ py: "16px", mt: "20px", borderRadius: "8px", mr: "8px", color: "primary.main", borderColor: "primary.main" }}
      >
        {props.onLoading ? <CircularProgress color="info" /> : "ยืนยัน"}
      </Button>
    </>
  );
};

const EditEmail: FC<EditInfoModalProps> = (props) => {
  const [email, setEmail] = useState(props.profile?.email || "-");

  return (
    <>
      <MobileAppBar title={"เปลี่ยนอีเมล"} onBackClick={props.onClose} />
      <Typography>อีเมล</Typography>
      <TextField type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button
        variant="outlined"
        fullWidth
        disableElevation
        disabled={props.onLoading}
        onClick={() => props.onSubmitEditCustomer &&  props.onSubmitEditCustomer({ email })}
        sx={{ py: "16px", mt: "20px", borderRadius: "8px", mr: "8px", color: "primary.main", borderColor: "primary.main" }}
      >
        {props.onLoading ? <CircularProgress color="info" /> : "ยืนยัน"}
      </Button>
    </>
  );
};

const EditTel: FC<EditInfoModalProps> = (props) => {
  const resource = useResource();
  const toast = useToast();

  const [mode, setMode] = useState('tel');
  const [ref, setRef] = useState(null);
  const [token, setToken] = useState(null);
  const [tel, setTel] = useState(props.profile?.email || null);
  const [pin, setPin] = useState('');
  const { register, handleSubmit, formState } = useForm({ mode: "onChange" });
  const onSubmit = async (data: any) => {
    try {
      setMode('otp');
      const tel = data["tel"].length === 10 ? data["tel"] : `0${data["tel"]}`;
      const result = await resource.createResource('auth/requestOTP', {
        tel: tel
      })

      setTel(data["tel"]);
      setRef(result.data.refno);
      setToken(result.data.token);
    } catch (error) {
      console.log(error);
      toast.openToast('ส่ง OTP ไม่สำเร็จ', 'error');
    }
  }

  const onSubmitPin = async () => {
    try {
      await resource.createResource('auth/verifyOTP', {
        token: token,
        pin: pin
      });
      if (props.onSubmitEditCustomer) {
        await props.onSubmitEditCustomer({ tel })
      }
    } catch (error) {
      toast.openToast('รหัส OTP ไม่ถูกต้อง', 'error');
    }
  }

  return (
    mode === 'tel' ? (
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <MobileAppBar
          title={"เปลี่ยนเบอร์โทรศัพท์"}
          onBackClick={props.onClose}
        />
        <Box pb="16px">
          <Typography>เบอร์โทรศัพท์</Typography>
        </Box>
        <TelephoneField
          countryCode={"+66"}
          register={register("tel", {
            required: true,
            pattern: /[0-9]{9}/,
          })}
        />
        <Button
          variant="outlined"
          fullWidth
          disableElevation
          disabled={props.onLoading}
          type="submit"
          sx={{ py: "16px", mt: "20px", borderRadius: "8px", mr: "8px", color: "primary.main", borderColor: "primary.main" }}
        >
          {props.onLoading ? <CircularProgress color="info" /> : "ยืนยัน"}
        </Button>
      </Box>
    ) : (
      <>
        <MobileAppBar
          title={"ยืนยัน OTP"}
          onBackClick={props.onClose}
        />
        <Box pb="16px">
          <Typography>รหัส OTP เลขอ้างอิง: {ref}</Typography>
        </Box>
        <TextField fullWidth value={pin} onChange={(e) => setPin(e.target.value)} />
        <Button
          variant="outlined"
          fullWidth
          disableElevation
          disabled={props.onLoading}
          onClick={() => onSubmitPin()}
          sx={{ py: "16px", mt: "20px", borderRadius: "8px", mr: "8px", color: "primary.main", borderColor: "primary.main" }}
        >
          {props.onLoading ? <CircularProgress color="info" /> : "ยืนยันรหัส OTP"}
        </Button>
      </>
    )
  );
};
