import { FC, useRef, useState, useContext } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import NextImage from "next/image";
import { useIntl } from "next-intl";
import NextLink from "next/link";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import { DefaultLayout, DefaultLayoutProp, routes, ChevronLeftIcon, AuthContext, useResource } from "src";
import { ConfirmTelModal } from "./ConfirmTelModal";
import { useToast } from "src/core/hooks/useToast";
import router from "next/router";

export type EditPersonalInfoProps = DefaultLayoutProp & {};

export const EditPersonalInfo: FC<EditPersonalInfoProps> = (props) => {
  const { profile, setProfile } = useContext(AuthContext);
  const resource = useResource();
  const toast = useToast();

  const [name, setName] = useState(profile?.fullName || null);
  const [gender, setGender] = useState(profile?.gender || '');
  const [birthDate, setBirthDate] = useState(profile?.birthDate ? new Date(profile.user.birthDate) : null);
  const [email, setEmail] = useState(profile?.email || '');
  const [tel, setTel] = useState(profile?.tel || '');
  const [file, setFile] = useState(profile?.imageUpload?.url || null);
  const [otpRef, setOtpRef] = useState("");
  const [token, setToken] = useState("");

  const userProfileImageRef = useRef(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const onBrowseImageClick = () => {
    // @ts-ignore
    userProfileImageRef?.current?.click?.();
  };

  // @ts-ignore
  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await resource.createResource('auth/requestOTP', {
      tel: tel
    })

    setOtpRef(result.data.refno);
    setToken(result.data.token);

    setOpenConfirmModal(true);
  };

  const intl = useIntl();

  const onSubmitEditCustomer = async (e: any) => {
    let fd = await new FormData();

    if (file && typeof file === "object") {
      await fd.append('file', file, `${name}-profile-${new Date().toDateString}`);
    }

    await fd.append('fullName', name);
    await fd.append('gender', gender);

    if (birthDate) {
      await fd.append('birthDate', birthDate.toString());
    }

    await fd.append('email', email);
    await fd.append('tel', tel);

    try {
      await resource.updateResourceWithFormDataWithoutId('customer-public', fd);
      const customerProfile = await resource.fetchResource('customer-public', {}, '');
      const dataProfile = customerProfile?.data ? customerProfile?.data?.data : {}

      setProfile({
        ...profile,
        ...dataProfile
      });
      setOpenConfirmModal(false);

      toast.openToast('การแก้ไขข้อมูลส่วนตัวสำเร็จ', 'success');
    } catch (error) {
      toast.openToast('การแก้ไขข้อมูลส่วนตัวไม่สำเร็จ', 'error');
    }
  }

  return (
    <DefaultLayout {...props}>
      <ConfirmTelModal
        open={openConfirmModal}
        otpRef={otpRef}
        token={token}
        tel={tel}
        onClose={() => setOpenConfirmModal(false)}
        onSubmit={(e) => onSubmitEditCustomer(e)}
      />
      <Box display="flex" mb="40px" mt="80px">
        <NextLink href={routes.personalInfo()}>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
        </NextLink>
        <Typography variant="h1" component="h1" pl="8px">
          แก้ไขข้อมูลส่วนตัว
        </Typography>
      </Box>
      <Box component="form" width="768px" mx="auto" onSubmit={onSubmit}>
        <Box
          border="1px solid"
          borderColor="grey.100"
          borderRadius="8px"
          overflow="hidden"
          mt="40px"
        >
          <Box p="16px">
            <Box
              overflow="hidden"
              borderRadius="50%"
              width="160px"
              height="160px"
              bgcolor="grey.200"
              mx="auto"
              display="flex"
            >
              <input ref={userProfileImageRef} type="file" 
                onChange={(e: any) => setFile(e.target.files[0])}
                accept="image/*"
              />
              <IconButton
                sx={{ mx: "auto", width: "100%" }}
                onClick={onBrowseImageClick}
              >
                {
                  file ? (
                    typeof file !== "object" ? <NextImage src={profile?.imageUpload?.url} layout="fill" objectFit="contain" priority={true} unoptimized={true}/> : <NextImage src={URL.createObjectURL(file)} layout="fill" objectFit="contain" priority={true} unoptimized={true}/>
                  ) : (
                    <svg
                      width="104"
                      height="100"
                      viewBox="0 0 104 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M64.5714 59.4286H32.5714V27.4286H53.1429V22.8571H32.5714C30.0571 22.8571 28 24.9143 28 27.4286V59.4286C28 61.9429 30.0571 64 32.5714 64H64.5714C67.0857 64 69.1429 61.9429 69.1429 59.4286V38.8571H64.5714V59.4286ZM46.7657 52.1829L42.2857 46.7886L36 54.8571H61.1429L53.0514 44.0914L46.7657 52.1829ZM69.1429 22.8571V16H64.5714V22.8571H57.7143C57.7371 22.88 57.7143 27.4286 57.7143 27.4286H64.5714V34.2629C64.5943 34.2857 69.1429 34.2629 69.1429 34.2629V27.4286H76V22.8571H69.1429Z"
                        fill="white"
                      />
                      <path
                        d="M18.796 73.464H16.204V72.6H22.48V73.464H19.9V81H18.796V73.464ZM24.2265 81.12C23.6345 81.12 23.1505 80.948 22.7745 80.604C22.3985 80.26 22.2105 79.816 22.2105 79.272C22.2105 78.672 22.4345 78.208 22.8825 77.88C23.3385 77.552 23.9825 77.388 24.8145 77.388H26.0505V77.076C26.0505 76.628 25.9305 76.288 25.6905 76.056C25.4585 75.816 25.1185 75.696 24.6705 75.696C24.3105 75.696 23.9785 75.772 23.6745 75.924C23.3785 76.068 23.1305 76.28 22.9305 76.56L22.4145 75.936C22.6865 75.592 23.0185 75.332 23.4105 75.156C23.8025 74.972 24.2385 74.88 24.7185 74.88C25.4705 74.88 26.0505 75.064 26.4585 75.432C26.8665 75.8 27.0705 76.328 27.0705 77.016V79.836C27.0705 80.148 27.1185 80.536 27.2145 81H26.3265C26.2545 80.816 26.2025 80.536 26.1705 80.16H26.1465C25.9225 80.472 25.6465 80.712 25.3185 80.88C24.9905 81.04 24.6265 81.12 24.2265 81.12ZM24.3825 80.316C24.6865 80.316 24.9665 80.26 25.2225 80.148C25.4785 80.028 25.6785 79.868 25.8225 79.668C25.9745 79.468 26.0505 79.248 26.0505 79.008V78.12H24.7785C24.2745 78.12 23.8865 78.22 23.6145 78.42C23.3425 78.62 23.2065 78.904 23.2065 79.272C23.2065 79.592 23.3105 79.848 23.5185 80.04C23.7345 80.224 24.0225 80.316 24.3825 80.316ZM28.6505 76.512C28.6505 76 28.6345 75.496 28.6025 75H29.5385C29.5625 75.296 29.5745 75.612 29.5745 75.948H29.5985C29.7665 75.628 30.0265 75.372 30.3785 75.18C30.7305 74.98 31.1105 74.88 31.5185 74.88C32.2945 74.88 32.9025 75.156 33.3425 75.708C33.7825 76.26 34.0025 77.024 34.0025 78C34.0025 78.632 33.8985 79.184 33.6905 79.656C33.4825 80.12 33.1865 80.48 32.8025 80.736C32.4265 80.992 31.9865 81.12 31.4825 81.12C31.0665 81.12 30.7025 81.04 30.3905 80.88C30.0785 80.72 29.8505 80.496 29.7065 80.208H29.6705V83.904H28.6505V76.512ZM31.3265 80.34C31.8385 80.34 32.2425 80.128 32.5385 79.704C32.8345 79.272 32.9825 78.692 32.9825 77.964C32.9825 77.236 32.8385 76.676 32.5505 76.284C32.2625 75.892 31.8585 75.696 31.3385 75.696C30.8505 75.696 30.4505 75.856 30.1385 76.176C29.8265 76.496 29.6705 76.904 29.6705 77.4V78.492C29.6705 79.044 29.8225 79.492 30.1265 79.836C30.4305 80.172 30.8305 80.34 31.3265 80.34ZM40.2556 81.12C39.7276 81.12 39.3116 80.952 39.0076 80.616C38.7036 80.272 38.5516 79.8 38.5516 79.2V75.792H37.4716V75H38.5516V73.404L39.5236 73.104H39.5716V75H41.2756V75.792H39.5716V79.104C39.5716 79.512 39.6476 79.816 39.7996 80.016C39.9516 80.208 40.1876 80.304 40.5076 80.304C40.8516 80.304 41.1316 80.26 41.3476 80.172L41.4196 80.928C41.1556 81.056 40.7676 81.12 40.2556 81.12ZM44.8477 81.12C44.2557 81.12 43.7397 80.996 43.2997 80.748C42.8677 80.492 42.5317 80.128 42.2917 79.656C42.0597 79.184 41.9437 78.632 41.9437 78C41.9437 77.368 42.0597 76.816 42.2917 76.344C42.5317 75.872 42.8677 75.512 43.2997 75.264C43.7397 75.008 44.2557 74.88 44.8477 74.88C45.7437 74.88 46.4517 75.16 46.9717 75.72C47.4997 76.28 47.7637 77.04 47.7637 78C47.7637 78.96 47.4997 79.72 46.9717 80.28C46.4517 80.84 45.7437 81.12 44.8477 81.12ZM44.8477 80.34C45.4397 80.34 45.9037 80.132 46.2397 79.716C46.5757 79.3 46.7437 78.728 46.7437 78C46.7437 77.272 46.5757 76.7 46.2397 76.284C45.9037 75.868 45.4397 75.66 44.8477 75.66C44.2637 75.66 43.8037 75.868 43.4677 76.284C43.1317 76.7 42.9637 77.272 42.9637 78C42.9637 78.728 43.1317 79.3 43.4677 79.716C43.8037 80.132 44.2637 80.34 44.8477 80.34ZM54.6854 81.12C54.3094 81.12 53.9454 81.024 53.5934 80.832C53.2414 80.632 52.9774 80.372 52.8014 80.052H52.7774C52.7854 80.308 52.7774 80.624 52.7534 81H51.8174C51.8414 80.736 51.8534 80.232 51.8534 79.488V72.096H52.8734V75.804H52.8974C53.2974 75.188 53.9014 74.88 54.7094 74.88C55.4774 74.88 56.0854 75.152 56.5334 75.696C56.9814 76.232 57.2054 76.964 57.2054 77.892C57.2054 78.892 56.9774 79.68 56.5214 80.256C56.0734 80.832 55.4614 81.12 54.6854 81.12ZM54.5414 80.304C55.0534 80.304 55.4534 80.092 55.7414 79.668C56.0374 79.244 56.1854 78.66 56.1854 77.916C56.1854 77.204 56.0374 76.652 55.7414 76.26C55.4534 75.86 55.0534 75.66 54.5414 75.66C54.0454 75.66 53.6414 75.832 53.3294 76.176C53.0254 76.512 52.8734 76.956 52.8734 77.508V78.6C52.8734 79.12 53.0214 79.536 53.3174 79.848C53.6214 80.152 54.0294 80.304 54.5414 80.304ZM58.4173 76.464C58.4173 75.784 58.4053 75.296 58.3813 75H59.3293C59.3613 75.32 59.3773 75.672 59.3773 76.056V76.176H59.4133C59.5653 75.76 59.8093 75.44 60.1453 75.216C60.4813 74.992 60.8773 74.88 61.3333 74.88C61.4613 74.88 61.5773 74.892 61.6813 74.916V75.756C61.5773 75.732 61.4373 75.72 61.2613 75.72C60.9253 75.72 60.6173 75.824 60.3373 76.032C60.0573 76.232 59.8373 76.508 59.6773 76.86C59.5173 77.212 59.4373 77.596 59.4373 78.012V81H58.4173V76.464ZM65.0274 81.12C64.4354 81.12 63.9194 80.996 63.4794 80.748C63.0474 80.492 62.7114 80.128 62.4714 79.656C62.2394 79.184 62.1234 78.632 62.1234 78C62.1234 77.368 62.2394 76.816 62.4714 76.344C62.7114 75.872 63.0474 75.512 63.4794 75.264C63.9194 75.008 64.4354 74.88 65.0274 74.88C65.9234 74.88 66.6314 75.16 67.1514 75.72C67.6794 76.28 67.9434 77.04 67.9434 78C67.9434 78.96 67.6794 79.72 67.1514 80.28C66.6314 80.84 65.9234 81.12 65.0274 81.12ZM65.0274 80.34C65.6194 80.34 66.0834 80.132 66.4194 79.716C66.7554 79.3 66.9234 78.728 66.9234 78C66.9234 77.272 66.7554 76.7 66.4194 76.284C66.0834 75.868 65.6194 75.66 65.0274 75.66C64.4434 75.66 63.9834 75.868 63.6474 76.284C63.3114 76.7 63.1434 77.272 63.1434 78C63.1434 78.728 63.3114 79.3 63.6474 79.716C63.9834 80.132 64.4434 80.34 65.0274 80.34ZM76.2551 75L74.7551 81H73.8311L72.3791 76.092L70.9271 81H70.0031L68.5031 75H69.5711L70.5431 79.608L71.9111 75H72.8471L74.2151 79.608L75.1871 75H76.2551ZM78.7867 81.12C78.3387 81.12 77.9307 81.028 77.5627 80.844C77.2027 80.66 76.9467 80.416 76.7947 80.112L77.4547 79.656C77.5907 79.872 77.7787 80.04 78.0187 80.16C78.2587 80.28 78.5187 80.34 78.7987 80.34C79.1347 80.34 79.4107 80.244 79.6267 80.052C79.8507 79.852 79.9627 79.604 79.9627 79.308C79.9627 79.068 79.8747 78.868 79.6987 78.708C79.5227 78.548 79.2107 78.384 78.7627 78.216C78.0827 77.968 77.6027 77.708 77.3227 77.436C77.0507 77.164 76.9147 76.828 76.9147 76.428C76.9147 75.964 77.0987 75.592 77.4667 75.312C77.8347 75.024 78.3227 74.88 78.9307 74.88C79.3227 74.88 79.6787 74.964 79.9987 75.132C80.3267 75.3 80.5787 75.532 80.7547 75.828L80.1307 76.284C79.8507 75.868 79.4507 75.66 78.9307 75.66C78.6347 75.66 78.3907 75.728 78.1987 75.864C78.0147 76 77.9227 76.176 77.9227 76.392C77.9227 76.608 78.0187 76.792 78.2107 76.944C78.4027 77.088 78.7587 77.26 79.2787 77.46C79.8947 77.692 80.3307 77.948 80.5867 78.228C80.8427 78.5 80.9707 78.848 80.9707 79.272C80.9707 79.832 80.7707 80.28 80.3707 80.616C79.9707 80.952 79.4427 81.12 78.7867 81.12ZM87.3973 78.396H83.0773C83.1333 79.004 83.3133 79.468 83.6173 79.788C83.9213 80.1 84.3413 80.256 84.8773 80.256C85.5973 80.256 86.1693 79.972 86.5933 79.404L87.1693 79.956C86.9373 80.324 86.6133 80.612 86.1973 80.82C85.7893 81.02 85.3373 81.12 84.8413 81.12C83.9533 81.12 83.2653 80.848 82.7773 80.304C82.2893 79.76 82.0453 78.996 82.0453 78.012C82.0453 77.036 82.2893 76.272 82.7773 75.72C83.2733 75.16 83.9533 74.88 84.8173 74.88C85.6253 74.88 86.2573 75.156 86.7133 75.708C87.1693 76.252 87.3973 77.016 87.3973 78V78.396ZM86.4613 77.556C86.4613 76.98 86.3093 76.528 86.0053 76.2C85.7093 75.872 85.2973 75.708 84.7693 75.708C84.2733 75.708 83.8773 75.876 83.5813 76.212C83.2933 76.548 83.1253 77.024 83.0773 77.64H86.4613V77.556Z"
                        fill="white"
                      />
                    </svg>
                  )
                }
              </IconButton>

              {/* <NextImage  
                src="/flash-sale-thumbnail.jpg"
                width="160"
                height="160"
                objectPosition={"center"}
  unoptimized={true}
/> */}
            </Box>
          </Box>
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            p="24px"
            gap="32px 16px"
          >
            <Box width="100%">
              <Typography variant="h4" mb="16px">
                ชื่อ
              </Typography>
              <TextField
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ borderRadius: "8px", borderColor: "palette.grey.100" }}
              />
            </Box>
            <Box width="100%">
              <Typography variant="h4" mb="16px">
                เพศ
              </Typography>
              <Select value={gender}
                onChange={(e) => setGender(e.target.value)}
                fullWidth>
                <MenuItem value="male">ชาย</MenuItem>
                <MenuItem value="female">หญิง</MenuItem>
              </Select>
            </Box>
            <Box width="100%">
              <Typography variant="h4" mb="16px">
                วันเกิด
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  inputFormat="dd/MM/yyyy"
                  renderInput={(props) => (
                    <TextField {...props} sx={{ flex: 1, width: "100%" }} />
                  )}
                  value={birthDate}
                  onChange={(newDate) => setBirthDate(newDate)}
                  maxDate={new Date()}
                />
              </LocalizationProvider>
            </Box>
            <Box width="100%">
              <Typography variant="h4" mb="16px">
                อีเมล
              </Typography>
              <TextField
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ borderRadius: "8px", borderColor: "palette.grey.100" }}
              />
            </Box>
            <Box width="100%">
              <Typography variant="h4" mb="16px">
                เบอร์โทรศัพท์
              </Typography>
              <TextField
                fullWidth
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                sx={{ borderRadius: "8px", borderColor: "palette.grey.100" }}
              />
            </Box>
          </Box>
        </Box>
        <Box display="flex" mt="40px" mb="58px">
          <Button
            variant="contained"
            fullWidth
            disableElevation
            type="submit"
            sx={{ py: "16px", borderRadius: "8px", mr: "8px" }}
          >
            ยืนยันส่วนตัว
          </Button>
        </Box>
      </Box>
    </DefaultLayout>
  );
};
