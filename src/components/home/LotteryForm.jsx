import React from "react";

// API
import customerOrdersApi from "../../apis/CustomerOrdersApi";

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

  const nameRef = React.useRef(null);
  const drinkRef = React.useRef(null);

  const clickCustomerFormOk = async () => {
    const name = nameRef.current.value;
    const drink = drinkRef.current.value;

    if (name && drink) {
      const response = await customerOrdersApi.getCustomerOrdersApi();
      const customerOrders = response.filter((customerOrder) => {
        return customerOrder.division === dialog.division && !customerOrder.name && !customerOrder.drink;
      });
      const customerOrder = customerOrders[Math.floor(Math.random() * customerOrders.length)];

      if (customerOrder) {
        setLottery(true);
        await wait(2);
        setKujiResult(customerOrder.group);

        await customerOrdersApi.updateCustomerOrderApi({ ...customerOrder, name, drink });
      } else {
        window.alert("グループを設定してください");
      }
    } else {
      window.alert("名前とドリンクを入力してください");
    }
  };

  const closeCustomerForm = () => {
    setDialog({ isShown: false, division: null });
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
            <DialogContentText>名前とファーストドリンクを入力してください</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="名前"
              fullWidth
              variant="standard"
              inputRef={nameRef}
            />
            <TextField
              autoFocus
              margin="dense"
              id="drink"
              label="ファーストドリンク"
              fullWidth
              variant="standard"
              inputRef={drinkRef}
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
