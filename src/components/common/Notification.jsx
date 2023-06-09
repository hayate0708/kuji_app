import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

const useNotification = () => {
  const [dialog, setDialog] = React.useState({ isShown: false, message: "" });

  const onClose = () => setDialog({ isShown: false, message: "" });

  const Notification = () => (
    <Dialog fullWidth onClose={onClose} open={dialog.isShown}>
      <DialogTitle>{dialog.message}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );

  return [Notification, setDialog];
};

export default useNotification;
