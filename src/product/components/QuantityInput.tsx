// @ts-nocheck

import { FC, useEffect, useState } from "react";
import { ButtonGroup, Button, TextField, styled } from "@mui/material";

const StyledTextField = styled(TextField)((props) => ({
  '.MuiInputBase-root': {
    borderRadius: 0,
    borderColor: props.theme.palette.grey['200'],
    height: props?.height,
  }
}))

export type QuantityInputProps = {
  onIncrease: () => any;
  onDecrease: () => any;
  quantity: number;
  height?: string;
  disabledValue?: number;
  onValidateDisableValue?: boolean;
  onBigUnit?: boolean;
  bigUnitValue?: number;
  onSetQuantity?: (value: number) => any;
};

export const QuantityInput: FC<QuantityInputProps> = (props) => {
  const [onDisableIncrease, setOnDisableIncrease] = useState(false);

  useEffect(() => {
    if (props?.disabledValue > 0 && props?.quantity > props?.disabledValue && !props.onBigUnit) {
      setOnDisableIncrease(true);
      props?.onSetQuantity(props?.disabledValue);
    } else if (props?.disabledValue > 0 && props?.onBigUnit && props?.quantity * props?.bigUnitValue > props?.disabledValue) {
      setOnDisableIncrease(true)
      props?.onSetQuantity(Math.floor(props?.disabledValue / props?.bigUnitValue));
    } else {
      setOnDisableIncrease(false)
    }
  }, [props])

  return (
    <ButtonGroup variant="outlined" disableElevation sx={{ width: "100%" }}>
      <Button
        onClick={props.onDecrease}
        color="inherit"
        sx={{
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
          borderColor: "#B6BECD",
          height: props.height ? props.height : 'auto'
        }}
      >
        <svg
          width="14"
          height="3"
          viewBox="0 0 14 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 2.5H14V0.5H0V2.5Z" fill="black" />
        </svg>
      </Button>
      <StyledTextField
        variant="outlined"
        height={props.height}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: 'center' } }}
        InputLabelProps={{ shrink: true }}
        value={props.quantity}
        disabled
      />
      <Button
        onClick={() => {
          if (props?.disabledValue > 0 && props?.quantity < props?.disabledValue && !props.onBigUnit) {
            props.onIncrease();
          } else if (props?.disabledValue > 0 && props?.onBigUnit && props?.quantity * props?.bigUnitValue < props?.disabledValue) {
            props.onIncrease();
          }
        }}
        color="inherit"
        disabled={onDisableIncrease}
        sx={{
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
          borderColor: "#B6BECD",
          height: props.height ? props.height : 'auto',
          backgroundColor: onDisableIncrease ? '#B6BECD' : ''
        }}
      >
        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 8.5H6V14.5H8V8.5H14V6.5H8V0.5H6V6.5H0V8.5Z"
            fill="black"
          />
        </svg>
      </Button>
    </ButtonGroup>
  );
};
