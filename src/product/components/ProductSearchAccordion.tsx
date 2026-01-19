import { FC, SyntheticEvent, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  SvgIcon,
  SvgIconProps,
  Typography,
} from "@mui/material";

export type ProductSearchAccordionProps = {
  summary: string;
  expanded?: boolean
};

export const ProductSearchAccordion: FC<ProductSearchAccordionProps> = (
  props
) => {
  const [expanded, setExpanded] = useState(props.expanded ?? true);

  const handleChange = (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(!expanded);
  };

  return (
    <Accordion expanded={expanded} disableGutters elevation={0} square onChange={handleChange} sx={{ border: 0}}>
      <AccordionSummary
        sx={{ py: '32px' }}
        expandIcon={ expanded ? <MinusIcon /> : <PlusIcon />}
      >
      <Typography variant="h2">{props.summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
};

const PlusIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M0.5 12H9.5V21H12.5V12H21.5V9H12.5V0H9.5V9H0.5V12Z" />
  </SvgIcon>
);

const MinusIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
<path d="M0.5 3H21.5V0H0.5V3Z" />

  </SvgIcon>
)