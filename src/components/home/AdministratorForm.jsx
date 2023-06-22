import React from "react";
import { useNavigate } from "react-router-dom";

// API
import administratorApi from "../../apis/AdministratorApi";

// MUI
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";

const useAdministratorForm = () => {
  const [dialog, setDialog] = React.useState({ isShown: false });
  const [error, setError] = React.useState(false);

  let id = "";
  let password = "";

  const navigate = useNavigate();

  const handleClose = () => {
    setError(false);
    setDialog(false);
  };

  const textChange = (event) => {
    if (event.target.id === "id") {
      id = event.target.value;
    } else {
      password = event.target.value;
    }
  };

  const clickOk = async () => {
    const response = await administratorApi.getAdministratorApi(id, password);
    if (response.name) {
      navigate("/maintenance");
    } else {
      setError(true);
    }
  };

  const ErrorMessage = () => <Typography sx={{ color: "error.main" }}>IDまたはパスワードが異なります</Typography>;

  const AdministratorForm = () => (
    <Dialog open={dialog.isShown} onClose={handleClose}>
      {/* <DialogTitle>Subscribe</DialogTitle> */}
      <DialogContent>
        <DialogContentText>IDとパスワードを入力してください</DialogContentText>
        {error && <ErrorMessage />}
        <TextField autoFocus margin="dense" id="id" label="ID" fullWidth variant="standard" onChange={textChange} />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="パスワード"
          fullWidth
          variant="standard"
          onChange={textChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={clickOk}>OK</Button>
        <Button onClick={handleClose}>CANCEL</Button>
      </DialogActions>
    </Dialog>
  );

  return [AdministratorForm, setDialog];
};

export default useAdministratorForm;
