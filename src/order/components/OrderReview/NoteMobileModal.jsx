import { Modal, Box, Typography, Button, TextareaAutosize } from "@mui/material";
import { useState } from "react";

import { MobileAppBar } from "src";

const NoteMobileModal = (props) => {
  const [note, setNote] = useState(props?.note || null);
  const limitNote = 200;

  console.log('Note', note)

  const onSubmit = () => {
    props.setValue('note', note);
    props.onClose();
  }

  const handleChangeNote = (e) => {
    if (e.target.value.toString().length <= limitNote) {
      setNote(e.target.value);
    }
  };

  return (
    <>
      <Modal open={props.open} onClose={() => props.onClose()} sx={{ overflowY: "scroll", backgroundColor: "white" }}>
        <Box bgcolor="white" height="100%" width="100%" overflow="scroll">
          <MobileAppBar title="หมายเหตุถึงร้านค้า" onBackClick={props.onClose} />
          <Box p="16px">
            <TextareaAutosize
              aria-label="minimum height"
              minRows={7}
              placeholder='ระบุหมายเหตุถึงร้านค้า สูงสุด 200 ตัวอักษร'
              style={{ width: '100%' }}
              value={note}
              onChange={handleChangeNote}
              inputProps={{ maxLength: 200 }}
            />
          </Box>
          <Box position="fixed" bottom="0" m="auto" p="16px" border="1px solid" borderColor="grey.100" bgcolor="white" borderBottom="none" width="100%">
            <Button
              variant="contained"
              fullWidth
              disabled={note === null || note === ''}
              sx={{ py: "16px", borderRadius: "8px" }}
              onClick={() => onSubmit()}
            >
              <Typography variant="h4">ยืนยัน</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NoteMobileModal;
