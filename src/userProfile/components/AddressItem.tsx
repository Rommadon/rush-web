import { FC } from "react";
import { Typography, Box, Button, useMediaQuery, SvgIcon } from "@mui/material";
import NextLink from "next/link";

import { routes } from "src";

export type AddressItemProps = {
  id: number;
  fullName: string;
  name: string;
  default: boolean;
  tel: string;
  address: string;
  subdistrictAddress: string;
  districtAddress: string;
  provinceAddress: string;
  postCodeAddress: string;
  onClick: () => any;
};

export const AddressItem: FC<AddressItemProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return isDesktop ? (
    <AddressItemDesktop {...props} />
  ) : (
    <AddressItemMobile {...props} />
  );
};

const AddressItemDesktop: FC<AddressItemProps> = (props) => {
  return (
    <Box
      key={props.fullName}
      pt="20px"
      pb="20px"
      px="16px"
      mb="32px"
      border="1px solid"
      borderRadius="8px"
      // {...index === 0  ? { borderBottom: '1px' } : {}}
      borderColor="grey.100"
    >
      <Box display="flex" justifyContent="space-between" pl="16px">
        <Box display="flex" alignItems="center">
          <Typography>{props.name}</Typography>
          {/* {props.default && (
            <Typography color="grey.200" px="8px">
              {"(ค่าเริ่มต้น)"}
            </Typography>
          )} */}
        </Box>

        <NextLink href={routes.editAddresses({ id: props.id })}>
          <Button>แก้ไขที่อยู่</Button>
        </NextLink>
      </Box>

      <Box pl="16px">
        <Typography fontWeight="light">
          {props.fullName} ({props.tel})
        </Typography>
        <Typography fontWeight="light">
          {[
            props.address,
            props.subdistrictAddress,
            props.districtAddress,
            props.provinceAddress,
            props.postCodeAddress,
          ]
            .filter((string) => string?.length)
            .join(", ")}
        </Typography>
      </Box>
    </Box>
  );
};

const AddressItemMobile: FC<AddressItemProps> = (props) => {
  return (
    <Box
      key={props.fullName}
      mb="32px"
      // {...index === 0  ? { borderBottom: '1px' } : {}}
      borderColor="grey.100"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box pr="1px">
          <Box display="flex" alignContent="center">
            <Typography>{props.name}</Typography>
            {/* {props.default && (
              <Typography color="grey.200" px="8px">
                {"(ค่าเริ่มต้น)"}
              </Typography>
            )} */}
          </Box>

          <Box>
            <Typography fontWeight="light">
              {props.fullName} ({props.tel})
            </Typography>
            <Typography fontWeight="light">
              {[
                props.address,
                props.subdistrictAddress,
                props.districtAddress,
                props.provinceAddress,
                props.postCodeAddress,
              ]
                .filter((string) => string?.length)
                .join(", ")}
            </Typography>
          </Box>
        </Box>
        <NextLink href={routes.editAddresses({ id: props.id })}>
          <SvgIcon width="6" height="10" viewBox={"0 0 6px 10px"}>
            <path
              d="M0.333984 1.22882L1.27679 0.286011L5.99084 5.00006L1.27679 9.7141L0.333984 8.77129L4.10522 5.00006L0.333984 1.22882Z"
              fill="black"
            />
          </SvgIcon>
        </NextLink>
      </Box>
    </Box>
  );
};
