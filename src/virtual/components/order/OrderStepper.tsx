import { FC } from "react";

import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";
import { useTranslations } from "use-intl";

export type OrderStepperProps = {
  status: string;
};

const steps: Record<string, number> = {
  pendingPayment: 0,
  pendingVerify: 1,
  prepareProduct: 2,
  shipping: 3,
  // "returnProduct": 4,
  success: 4,
  // "cancel": 6,
  // "expire": 7,
};

export const OrderStepper: FC<OrderStepperProps> = (props) => {
  const t = useTranslations('order.orderStepper')
  const activeStep = steps[props.status];

  return (
    props.status !== "cancel" && props.status !== "expire" ? (
      <Box width="100%" overflow="scroll">
      <Stepper sx={{ mt: "40px", minWidth: '500px', padding: 0 }} activeStep={activeStep} alternativeLabel>
        {Object.entries(steps).map(([key]) => (
          <Step key={key}>
            <StepLabel>{t(key)}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </Box>

    ) : (
      <Box my="20px" p="16px" borderRadius="8px" textAlign="center" bgcolor="grey.50">
        <Typography variant="h3" component="h3">{
          props.status !== "expire" ? "คำสั่งซื้อถูกยกเลิก" : "คำสั่งซื้อหมดอายุ"
        }</Typography>
      </Box> 
    )
  );
};
