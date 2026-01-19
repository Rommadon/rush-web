import { FC, MouseEventHandler } from "react";
import {
  Box,
  FormControl,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  useMediaQuery,
  CircularProgress
} from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomerCreditCardModel } from "src";

export type CreditCardFormProps = {
  onSubmit: (data: any) => any;
  onDelete?: (id: any) => any;
  creditCard?: CustomerCreditCardModel;
  enableDelete?: boolean;
  onEdit?: boolean;
  onLoading?: boolean;
};

export const CreditCardForm: FC<CreditCardFormProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      cardName: props.creditCard?.cardName || '',
      name: props.creditCard?.name || '',
      number: props.creditCard?.number || '',
      expirationMonth: props.creditCard?.expirationMonth || '',
      expirationYear: props.creditCard?.expirationYear || '',
      securityCode: props.creditCard?.securityCode || '',
      isDefault: props.creditCard?.isDefault || false,
    }
  });

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    if (props.creditCard?.id) {
      props.onDelete?.(props.creditCard.id)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(props.onSubmit)} width="100%" mb="48px">
      {!props.onEdit ? (
        <FormControl
          sx={{
            width: "100%",
            pb: "48px",
            pt: "16px"
          }}
        >
          <Typography variant="h4" pb="16px">
            ชื่อบัตร
          </Typography>
          <TextField {...register("cardName")} />
        </FormControl>
      ) : ''}
      <Box display="grid" gridTemplateColumns={isDesktop ? 'repeat(2, 1fr)' : '1fr'} gap="32px 24px">
        {!props.onEdit ? (
          <>
            <FormControl sx={{ pb: "16px" }}>
              <Typography variant="h4" pb="16px">
                ชื่อที่ปรากฎบนบัตร
              </Typography>
              <TextField {...register("name")} />
            </FormControl>

            <FormControl sx={{ pb: "16px" }}>
              <Typography variant="h4" pb="16px">
                หมายเลขบัตร
              </Typography>
              <TextField {...register("number")} />
            </FormControl>

            <FormControl sx={{ pb: "16px" }}>
              <Typography variant="h4" pb="16px">
                เดือนหมดอายุ
              </Typography>
              <TextField {...register("expirationMonth")} placeholder="MM" />
            </FormControl>

            <FormControl sx={{ pb: "16px" }}>
              <Typography variant="h4" pb="16px">
                ปีหมดอายุ
              </Typography>
              <TextField {...register("expirationYear")} placeholder="YYYY" />
            </FormControl>

            <FormControl sx={{ pb: "16px" }}>
              <Typography variant="h4" pb="16px">
                CVV
              </Typography>
              <TextField {...register("securityCode")} />
            </FormControl>
          </>
        )
          : ''}
        <FormGroup sx={{ justifyContent: 'center' }}>
          <FormControlLabel
            control={<Checkbox {...register("isDefault")} checked={watch('isDefault')} />}
            label='ตั้งเป็นค่าเริ่มต้น'
          />
        </FormGroup>
      </Box>
      <Box display="flex" flexDirection={isDesktop ? 'row' : 'column'} justifyContent="center" my="32px" width="100%">
        <Button
          variant="contained"
          disableElevation
          type="submit"
          sx={{ width: "100%", py: "16px", borderRadius: "8px", mr: "16px" }}
          disabled={props.onLoading}
        >
          {props.onLoading ? (
            <CircularProgress color="info" />
          ) : (
            <Typography variant="h4">ยืนยัน</Typography>
          )}
        </Button>
        {props.enableDelete && (
          <Button
            variant="outlined"
            disableElevation
            onClick={handleDelete}
            sx={{ width: "100%", py: "16px", borderRadius: "8px", marginTop: isDesktop ? 0 : '16px' }}
          >
            <Typography variant="h4">ลบบัตรเครดิต</Typography>
          </Button>
        )}
      </Box>
    </Box>
  );
};
