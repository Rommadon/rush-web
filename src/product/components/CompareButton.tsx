import { FC, FormEventHandler, useState } from "react";
import { Box, Typography, Fade, ToggleButton, styled } from "@mui/material";
import { useTranslations } from "next-intl";

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '& .Mui-selected': {
    background: theme.palette.primary.main,
    color: theme.palette.common.white
  }
}))

export type CompareButtonProp = {
  active: boolean;
  onClick: FormEventHandler<HTMLButtonElement>;
};

export const CompareButton: FC<CompareButtonProp> = (props) => {
  const t = useTranslations("productDetail");
  const { active } = props
  return (
    <StyledToggleButton
      value="check"
      color={active ? 'primary' : 'standard'}
      selected={active}
      onChange={props.onClick}
    >
      <Typography variant="h5" color={active ? "white" : "black"} mr={active ? "8px" : "0"} textAlign="center">
        {t("compare")}
      </Typography>
      {active && (
        <svg
          width="16"
          height="13"
          viewBox="0 0 16 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.09091 9.63636L1.27273 5.81818L0 7.09091L5.09091 12.1818L16 1.27273L14.7273 0L5.09091 9.63636Z"
            fill="white"
          />
        </svg>
      )}
    </StyledToggleButton>
  );
};
