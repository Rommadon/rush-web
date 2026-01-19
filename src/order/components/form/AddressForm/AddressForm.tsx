import { FC, useState, useEffect, MouseEventHandler } from "react";
import {
  Box,
  FormControl,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  getBottomNavigationUtilityClass,
  useMediaQuery,
} from "@mui/material";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useResource } from "src";
import { CustomerAddressModel } from "src/core";
import { yupResolver } from '@hookform/resolvers/yup';

export type AddressFormProps = {
  onSubmit: (data: any) => any;
  onDelete?: (id: any) => any;
  customerAddress?: CustomerAddressModel;
  enableDelete?: boolean;
};

export const AddressForm: FC<AddressFormProps> = (props) => {
  const resource = useResource();
  const t = useTranslations("order.addressForm");

  const schema = yup.object().shape({
    fullName: yup.string().required("กรุณากรอกข้อมูล"),
    tel: yup.string().required("กรุณากรอกข้อมูล"),
    postCodeAddress: yup.string().required("กรุณากรอกข้อมูล"),
    provinceAddress: yup.string().required("กรุณากรอกข้อมูล"),
    address: yup.string().required("กรุณากรอกข้อมูล"),
    districtAddress: yup.string().required("กรุณากรอกข้อมูล"),
    subdistrictAddress: yup.string().required("กรุณากรอกข้อมูล"),
  });

  const { register, handleSubmit, watch, setValue, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: props.customerAddress?.name || '',
      fullName: props.customerAddress?.fullName || '',
      tel: props.customerAddress?.tel || '',
      email: props.customerAddress?.email || '',
      postCodeAddress: props.customerAddress?.postCodeAddress || '',
      provinceAddress: props.customerAddress?.provinceAddress || '',
      address: props.customerAddress?.address || '',
      districtAddress: props.customerAddress?.districtAddress || '',
      default: props.customerAddress?.default || false,
      subdistrictAddress: props.customerAddress?.subdistrictAddress || '',
    }
  });

  const [subDistricts, setSubDistricts] = useState([]);
  const postCodeAddress = watch("postCodeAddress");

  const onFetchSubDistricts = async () => {
    const subDistrictsData = await resource.fetchResource(
      `static/subDistrict?zip_code=${watch("postCodeAddress")}`,
      {},
      null
    );
    setSubDistricts(subDistrictsData?.data);

    if (subDistrictsData?.data && subDistrictsData?.data.length > 0) {
      setValue(
        "provinceAddress",
        subDistrictsData?.data[0].district.province.name_th
      );
    }
  };

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (postCodeAddress && postCodeAddress.length === 5) {
      onFetchSubDistricts();
    } else {
      setSubDistricts([]);
      setValue("provinceAddress", '');
    }
  }, [postCodeAddress]);

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    if (props.customerAddress?.id) {
      props.onDelete?.(props.customerAddress.id)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(props.onSubmit)} width="100%">
      <FormControl
        sx={{
          width: "100%",
          pb: "16px",
        }}
      >
        <Typography variant="h4" pb="16px">
          {t("addressName")}
          <Typography component="span" ml="2px" color="red.50">*</Typography>
        </Typography>
        <TextField {...register("name")} 
          onChange={(e)=>{
            e.target.value = e.target.value.trimStart()
          }}
          placeholder="บ้าน, ที่ทำงาน"
        />
      </FormControl>
      <Box display="grid" gridTemplateColumns={isDesktop ? 'repeat(2, 1fr)' : '1fr'} gap="32px 16px">
        <FormControl>
          <Typography variant="h4" pb="16px">
            {t("name")}
            <Typography component="span" ml="2px" color="red.50">*</Typography>
          </Typography>
          <TextField {...register("fullName")} 
            onChange={(e)=>{
              e.target.value = e.target.value.trimStart()
            }}
            placeholder="ชื่อ นามสกุล"
          />
          { errors.fullName?.message && (<Typography variant="h5" sx={{ py: '8px', color: "#EF4423" }}>{errors.fullName?.message}</Typography>)}
        </FormControl>

        <FormControl>
          <Typography variant="h4" pb="16px">
            {t("phoneNumber")}
            <Typography component="span" ml="2px" color="red.50">*</Typography>
          </Typography>
          <TextField {...register("tel")} 
            onChange={(e)=>{
              e.target.value = e.target.value.trimStart()
            }}
            placeholder="0999999999"
          />
          { errors.tel?.message && (<Typography variant="h5" sx={{ py: '8px', color: "#EF4423" }}>{errors.tel?.message}</Typography>)}
        </FormControl>

        <FormControl>
          <Typography variant="h4" pb="16px">
            {t("email")}
          </Typography>
          <TextField {...register("email")} type="email" 
            onChange={(e)=>{
              e.target.value = e.target.value.trimStart()
            }}
            placeholder="example@shopdit.com"
          />
        </FormControl>

        <FormControl>
          <Typography variant="h4" pb="16px">
            {t("address")}
            <Typography component="span" ml="2px" color="red.50">*</Typography>
          </Typography>
          <TextField {...register("address")} 
            onChange={(e)=>{
              e.target.value = e.target.value.trimStart()
            }}
            placeholder="หมู่บ้าน/อาคาร, ซอย/ชั้น, บ้านเลขที่/ห้อง"
          />
          { errors.address?.message && (<Typography variant="h5" sx={{ py: '8px', color: "#EF4423" }}>{errors.address?.message}</Typography>)}
        </FormControl>

        <FormControl>
          <Typography variant="h4" pb="16px">
            {t("zipCode")}
            <Typography component="span" ml="2px" color="red.50">*</Typography>
          </Typography>
          <TextField {...register("postCodeAddress")} 
            inputProps={{ maxLength: 5 }}
            onChange={(e)=>{
              e.target.value = e.target.value.trimStart()
            }}
            placeholder="11000"
          />
          { errors.postCodeAddress?.message && (<Typography variant="h5" sx={{ py: '8px', color: "#EF4423" }}>{errors.postCodeAddress?.message}</Typography>)}
        </FormControl>

        <FormControl>
          <Typography variant="h4" pb="16px">
            {t("province")}
            <Typography component="span" ml="2px" color="red.50">*</Typography>
          </Typography>
          <TextField {...register("provinceAddress")} 
            onChange={(e)=>{
              e.target.value = e.target.value.trimStart()
            }}
            placeholder="นนทบุรี"
          />
          { errors.provinceAddress?.message && (<Typography variant="h5" sx={{ py: '8px', color: "#EF4423" }}>{errors.provinceAddress?.message}</Typography>)}
        </FormControl>

        <FormControl>
          <Typography variant="h4" pb="16px">
            {t("district")}
            <Typography component="span" ml="2px" color="red.50">*</Typography>
          </Typography>
          <TextField {...register("districtAddress")} 
            onChange={(e)=>{
              e.target.value = e.target.value.trimStart()
            }}
            placeholder="เมืองนนทบุรี"
          />
          { errors.districtAddress?.message && (<Typography variant="h5" sx={{ py: '8px', color: "#EF4423" }}>{errors.districtAddress?.message}</Typography>)}
        </FormControl>

        <FormControl>
          <Typography variant="h4" pb="16px">
            {t("subDistrict")}
            <Typography component="span" ml="2px" color="red.50">*</Typography>
          </Typography>
          <TextField {...register("subdistrictAddress")} 
            onChange={(e)=>{
              e.target.value = e.target.value.trimStart()
            }}
            placeholder="บางกระสอ"
          />
          { errors.subdistrictAddress?.message && (<Typography variant="h5" sx={{ py: '8px', color: "#EF4423" }}>{errors.subdistrictAddress?.message}</Typography>)}
        </FormControl>

        {/* <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked {...register("default")} />}
            label={t("setDefault")}
          />
        </FormGroup> */}
      </Box>
      {
        !isDesktop ? (
          <Box
            pt="16px"
            bottom="0"
            width="100%"
            bgcolor="white"
            borderTop="1px solid"
            borderColor="grey.100"
          >
            <Box display="flex" flexDirection={isDesktop ? 'row' : 'column'} justifyContent="center" my="32px" width="100%">
              <Button
                variant="contained"
                disableElevation
                type="submit"
                sx={{ width: "100%", py: "16px", borderRadius: "8px", mr: "16px" }}
              >
                <Typography variant="h4">{t("submit")}</Typography>
              </Button>
              {props.enableDelete && (
                <Button
                  
                  variant="outlined"
                  disableElevation
                  onClick={handleDelete}
                  sx={{ width: "100%", py: "16px", borderRadius: "8px", marginTop: isDesktop ? 0 : '32px' }}
                >
                  <Typography variant="h4">ลบที่อยู่</Typography>
                </Button>
              )}
            </Box>
          </Box>
        ) : (
          <Box display="flex" flexDirection={isDesktop ? 'row' : 'column'} justifyContent="center" my="32px" width="100%">
            <Button
              variant="contained"
              disableElevation
              type="submit"
              sx={{ width: "100%", py: "16px", borderRadius: "8px", mr: "16px" }}
            >
              <Typography variant="h4">{t("submit")}</Typography>
            </Button>
            {props.enableDelete && (
              <Button
                
                variant="outlined"
                disableElevation
                onClick={handleDelete}
                sx={{ width: "100%", py: "16px", borderRadius: "8px", marginTop: isDesktop ? 0 : '32px' }}
              >
                <Typography variant="h4">ลบที่อยู่</Typography>
              </Button>
            )}
          </Box>
        )
      }
    </Box>
  );
};
