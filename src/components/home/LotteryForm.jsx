import React from "react";

// API
import customerOrdersApi from "apis/CustomerOrdersApi";

// MUI
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";

import CircularProgress from "@mui/material/CircularProgress";

const useLotteryForm = () => {
  const [dialog, setDialog] = React.useState({ isShown: false, division: null });
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
      const response = await customerOrdersApi.getCustomerOrdersApi();
      const customerOrders = response.filter((customerOrder) => {
        return (
          customerOrder.division === dialog.division && customerOrder.name === null && customerOrder.drink === null
        );
      });

      const customerOrder = customerOrders[Math.floor(Math.random() * customerOrders.length)];

      if (customerOrder) {
        setLottery(true);
        await wait(2);
        setKujiResult(customerOrder.group);

        await customerOrdersApi.updateCustomerOrderApi({ ...customerOrder, name: editedName, drink: editedDrink });
      } else {
        window.alert("グループを設定してください");
      }
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

            <DialogContentText>名前とファーストドリンクを入力してください</DialogContentText>
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
          <Stack direction="row" justifyContent="center" spacing={4} sx={{ my: "5vh" }}>
            <CircularProgress size="10vh" />
          </Stack>
        )}
        {kujiResult && (
          <Stack direction="row" justifyContent="center" spacing={4} sx={{ my: "5vh" }}>
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

export default useLotteryForm;
