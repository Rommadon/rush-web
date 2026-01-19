import { FC } from "react";
import { Box } from "@mui/material";
import { styled } from '@mui/system';
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import searchIcon from 'public/icons/search.svg'
import searchIconMobile from 'public/icons/search-mobile.svg'


const Input = styled('input')((props) => `
  border: none;
  width: 100%;
  outline: none;
  font-size: 14px;
`)

export type SearchInputProp = {
  shadow?: boolean,
  maxWidth?: string,
  value: string,
  onSubmit: (data: Record<string, any>) => Promise<any> | any
}

export const SearchInput: FC<SearchInputProp> = (props) => {
  const t = useTranslations('searchInput')
  const { register, handleSubmit } = useForm()
  return (
    <Box
      component="form"
      sx={{
        backgroundColor: "#f5f5f5",
        boxShadow: props.shadow ? '0px 2px 2px 0px #00000014' : '',
        paddingY: "12px",
        paddingX: "24px",
        height: "35px",
        display: "flex",
        justifyContent: 'space-between',
        alignItems: "center",
        borderRadius: '20px',
        width: props.shadow ? '100%' : '320px',
        // border: props.shadow ? '1px solid #BFBEBE !important' : '',
        maxWidth:  props.maxWidth ? props.maxWidth : '100%',
      }}
      position="relative"
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <Input {...register('search', { value: props.value })} placeholder="ค้นหาสินค้า หมวดหมู่" sx={{ fontSize: "12px", fontWeight: "light", pl: "20px", backgroundColor: "#f5f5f5", fontFamily: "Kanit, sans-serif" }}/>
      <Box component="span" position="absolute" display="flex" left="16px">
        <Image src={searchIconMobile} alt="search icon" width="16px" height="16px"/>
      </Box>
    </Box>
  );
};
