import React from "react";
import {
  Box,
  Grid,
  Dialog,
  IconButton,
  Stack,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const useCustomerForm = () => {
  const [dialog, setDialog] = React.useState({ isShown: false });

  const handleClose = () => setDialog(false);

  const CustomerForm = () => (
    <Dialog open={dialog.isShown} onClose={handleClose}>
      {/* <DialogTitle>Subscribe</DialogTitle> */}
      <DialogContent>
        <DialogContentText>
          名前とファーストドリンクを入力してください
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="名前"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="drink"
          label="ファーストドリンク"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>くじを引く</Button>
        <Button onClick={handleClose}>戻る</Button>
      </DialogActions>
    </Dialog>
  );

  return [CustomerForm, setDialog];
};

export default useCustomerForm;
