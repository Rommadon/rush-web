import { Modal, Box, Typography, Button, Input, InputAdornment, TextField } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import NextLink from "next/link";

import { MobileAppBar } from "src";

export type PointMobileModalProps = {
  open: boolean;
  onClose: () => any;
  customerWallet: any;
  setValue: any;
  shopditPoint: any;
};

export const PointMobileModal: FC<PointMobileModalProps> = (props) => {
  const [point, setPoint] = useState<null | number>(props?.shopditPoint || null);
  useEffect(() => {
    if (point && point > props.customerWallet?.shopditPoint) {
      setPoint(props.customerWallet?.shopditPoint)
    }
  }, [point])

  useEffect(() => {
    setPoint(props?.shopditPoint)
  }, [props?.shopditPoint])

  const onSubmit = () => {
    props.setValue('shopditPoint', point);
    props.onClose();
  }

  return (
    <>
      <Modal open={props.open} onClose={() => props.onClose()} sx={{ overflowY: "scroll", backgroundColor: "white" }}>
        <Box bgcolor="white" height="100%" width="100%" overflow="scroll">
          <MobileAppBar title="ใช้พอยท์ส่วนลด" onBackClick={props.onClose} />
          <Box py="16px" bgcolor="grey.100" display="flex" alignItems="center" justifyContent="center">
            <Box width="30px" height="30px" color="white" bgcolor={"#00B900"} borderRadius="50%" textAlign="center" display="flex" alignItems="center" justifyContent="center">
              <Typography component="h2" variant="h2">
                P
              </Typography>
            </Box>
            <Typography component="h1" variant="h1" px="8px" fontWeight="600">
              {props.customerWallet?.shopditPoint || 0}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" py="24px" px="16px" pb="36px">
            <TextField
              value={point}
              onChange={(e) => setPoint(+e.target.value)}
              fullWidth
              sx={{input: {textAlign: "right"}}}
              placeholder="0"
              type="number"
              size="small"
              InputProps={{
                startAdornment: (
                  <Box width="24px" height="18px" mr="16px" color="white" bgcolor={"#00B900"} borderRadius="50%" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                    <Typography component="h2" variant="h5">
                      P
                    </Typography>
                  </Box>
                ),
              }}
            />
            <Button
              variant="contained"
              sx={{ py: "16px", px: "8px", borderRadius: "8px", height: "40px", marginLeft: '10px' }}
              size="small"
              onClick={() => setPoint(props.customerWallet?.shopditPoint || 0)}
            >
              <Typography variant="h5">ใช้ทั้งหมด</Typography>
            </Button>
          </Box>
          <Box position="relative" px="48px">
            <Box py="20px" bgcolor={"#00B900"} display="flex" alignItems="center" justifyContent="center"
              sx={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              }}
            >
              <Box width="20px" height="20px" color="#00B900" bgcolor={"white"} borderRadius="50%" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                <Typography component="h2" variant="h4">
                  P
                </Typography>
              </Box>
              <Typography component="h1" variant="h4" px="8px" color="white">
                1 POINT
              </Typography>
            </Box>
            <Box position="absolute" bgcolor="white"
              sx={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '10px'
              }}
            >
              <Typography component="h1" variant="h4" px="16px" color="#00B900">
                =
              </Typography>
            </Box>
            <Box py="20px" bgcolor="grey.50" display="flex" alignItems="center" justifyContent="center"
              sx={{
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
              }}
            >
              <Typography component="h1" variant="h4" px="8px" color="#00B900">
                1 บาท
              </Typography>
            </Box>
          </Box>
          <Box position="fixed" bottom="0" m="auto" p="16px" border="1px solid" borderColor="grey.100" bgcolor="white" borderBottom="none" width="100%">
            <Button
              variant="contained"
              fullWidth
              disabled={point === undefined || point === 0}
              sx={{ py: "16px", borderRadius: "8px" }}
              onClick={() => onSubmit()}
            >
              <Typography variant="h4">ใช้พอยท์</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PointMobileModal;
