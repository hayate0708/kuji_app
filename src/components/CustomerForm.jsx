import React from "react";
import { useSpring, animated } from "react-spring";
import {
  Box,
  Grid,
  Dialog,
  IconButton,
  Typography,
  Stack,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import * as easings from "d3-ease";

import CircularProgress from "@mui/material/CircularProgress";

const useCustomerForm = () => {
  const [dialog, setDialog] = React.useState({ isShown: false });
  const [lottery, setLottery] = React.useState(false);
  const [kujiResult, setKujiResult] = React.useState();

  let editedName = "";
  let editedDrink = "";

  const editCustomerOder = (event) => {
    if (event.target.id === "name") {
      editedName = event.target.value;
    } else {
      editedDrink = event.target.value;
    }
  };

  const clickCustomerFormOk = async () => {
    if (editedName && editedDrink) {
      setLottery(true);
      await wait(3); // ここで10秒間止まります
      setKujiResult("A");
    } else {
      window.alert("名前とドリンクを入力してください");
    }
  };

  const closeCustomerForm = () => {
    setDialog(false);
    setLottery(false);
    setKujiResult(false);
  };

  const wait = (sec) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, sec * 1000);
    });
  };

  const CustomerForm = () => (
    <Dialog fullWidth open={dialog.isShown} onClose={closeCustomerForm}>
      <DialogContent>
        {!lottery && (
          <>
            {/* <DialogTitle>Subscribe</DialogTitle> */}

            <DialogContentText>
              名前とファーストドリンクを入力してください
            </DialogContentText>
            {/* {error && <ErrorMessage />} */}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="名前"
              fullWidth
              variant="standard"
              onChange={editCustomerOder}
            />
            <TextField
              autoFocus
              margin="dense"
              id="drink"
              label="ファーストドリンク"
              fullWidth
              variant="standard"
              onChange={editCustomerOder}
            />

            <DialogActions>
              <Button onClick={clickCustomerFormOk}>くじを引く</Button>
              <Button onClick={closeCustomerForm}>戻る</Button>
            </DialogActions>
          </>
        )}
        {lottery && !kujiResult && (
          <Stack
            direction="row"
            justifyContent="center"
            spacing={4}
            sx={{ my: "5vh" }}
          >
            <CircularProgress size="10vh" />
          </Stack>
        )}
        {kujiResult && (
          <Stack
            direction="row"
            justifyContent="center"
            spacing={4}
            sx={{ my: "5vh" }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "15vh",
              }}
            >
              {kujiResult}
            </Typography>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );

  return [CustomerForm, setDialog];
};

export default useCustomerForm;
