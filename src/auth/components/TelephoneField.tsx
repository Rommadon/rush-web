import { FC } from "react";
import {
  Typography,
  Box,
  FormControl,
  TextField,
  InputAdornment,
  TextFieldProps,
} from "@mui/material";

export const TelephoneField: FC<{ register?: any, countryCode: string }> = (props) => {
  return (
    <FormControl fullWidth sx={{ borderRadius: "16px" }}>
      <TextField
        fullWidth
        {...props.register}
        inputProps={{
          maxLength: 10,
          inputMode: "numeric",
          pattern: "[0-9]{9,10}",
        }}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                pr="10px"
                borderRight="1px solid"
                borderColor="grey.100"
                color="black"
              >
                {props.countryCode}
              </Box>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

export default TelephoneField;
