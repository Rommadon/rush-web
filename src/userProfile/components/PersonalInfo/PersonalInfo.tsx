import { FC } from "react";
import { useMediaQuery } from "@mui/material";
import dynamic from 'next/dynamic'

import { OrderLayoutProps } from "src";

const PersonalInfoDesktop = dynamic(() => import('./PersonalInfoDesktop'))
const PersonalInfoMobile = dynamic(() => import('./PersonalInfoMobile'))

export type PersonalInfoProps = OrderLayoutProps & {};

export const PersonalInfo: FC<PersonalInfoProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const Component = isDesktop ? dynamic(() => import('./PersonalInfoDesktop')) : dynamic(() => import('./PersonalInfoMobile'))

  return <Component {...props} />
};
