import React from "react";
import { useNavigate } from "react-router-dom";
import { useWindowDimension } from "components/common/WindowDimension";
import { useGlobalContext } from "contexts/GlobalContext";

// API
import customerOrdersApi from "apis/CustomerOrdersApi";

// MUI
import {
  Box,
  Button,
  IconButton,
  Grid,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const MaintenancePage = () => {
  const { setTitle } = useGlobalContext();
  const { width, height } = useWindowDimension();
  const [allCustomerOrders, setAllCustomerOrders] = React.useState([]);
  const [dsCustomerOrders, setDsCustomerOrders] = React.useState([]);
  const [acsCustomerOrders, setAcsCustomerOrders] = React.useState([]);
  const [selectedCustomerOrder, setSelectedCustomerOrder] = React.useState();
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  const navigate = useNavigate();

  let editedGroup = "";
  let editedName = "";
  let editedDrink = "";
  let addedGroup = "";
  let addedName = "";
  let addedDrink = "";

  React.useEffect(() => {
    setTitle("管理者画面");
    getCustomerOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setAllCustomerOrders(
      allCustomerOrders.sort((a, b) => {
        return a.id < b.id ? -1 : 1;
      })
    );
    setDsCustomerOrders(
      allCustomerOrders
        .filter((customerOrder) => {
          return customerOrder.division === "1";
        })
        .sort((a, b) => {
          return a.group < b.group ? -1 : 1;
        })
    );
    setAcsCustomerOrders(
      allCustomerOrders
        .filter((customerOrder) => {
          return customerOrder.division === "2";
        })
        .sort((a, b) => {
          return a.group < b.group ? -1 : 1;
        })
    );
  }, [allCustomerOrders]);

  const getCustomerOrders = async () => {
    try {
      const response = await customerOrdersApi.getCustomerOrdersApi();
      console.log(response);
      setAllCustomerOrders(response);
    } catch (error) {
      setDsCustomerOrders([]);
      setAcsCustomerOrders([]);
    }
  };

  const editCustomerOder = (event) => {
    if (event.target.id === "group") {
      editedGroup = event.target.value;
    } else if (event.target.id === "name") {
      editedName = event.target.value;
    } else {
      editedDrink = event.target.value;
    }
  };

  const addCustomerOder = (event) => {
    if (event.target.id === "group") {
      addedGroup = event.target.value;
    } else if (event.target.id === "name") {
      addedName = event.target.value;
    } else {
      addedDrink = event.target.value;
    }
  };

  const clickMainMenu = () => {
    navigate("/");
  };

  const clickEditButton = (customerOrder) => {
    console.log(customerOrder);
    setSelectedCustomerOrder(customerOrder);
    setOpenEditForm(true);
  };

  const clickAddButton = (division) => {
    setSelectedCustomerOrder({
      id: null,
      division,
      group: null,
      name: null,
      drink: null,
    });
    setOpenAddForm(true);
  };

  const clickDeleteButton = (customerOrder) => {
    setSelectedCustomerOrder(customerOrder);
    setOpenConfirmation(true);
  };

  const clickEditFormOk = async () => {
    if (editedGroup !== "") {
      await customerOrdersApi.updateCustomerOrderApi({
        id: selectedCustomerOrder.id,
        division: selectedCustomerOrder.division,
        group: editedGroup,
        name: editedName,
        drink: editedDrink,
      });
      getCustomerOrders();
      closeEditForm();
    } else {
      window.alert("グループを入力してください");
    }
  };

  const closeEditForm = () => {
    setOpenEditForm(false);
  };

  const clickAddFormOk = async () => {
    if (addedGroup !== "") {
      await customerOrdersApi.addCustomerOrderApi({
        division: selectedCustomerOrder.division,
        group: addedGroup,
        name: addedName,
        drink: addedDrink,
      });
      getCustomerOrders();
      closeAddForm();
    } else {
      window.alert("グループを入力してください");
    }
  };

  const closeAddForm = () => {
    setOpenAddForm(false);
  };

  const clickConfirmationOk = async () => {
    await customerOrdersApi.deleteCustomerOrderApi(selectedCustomerOrder.id);
    getCustomerOrders();
    closeConfirmation();
  };

  const closeConfirmation = () => setOpenConfirmation(false);

  const header = ["グループ", "名前", "ドリンク", "編集", "削除"];

  const CustomerTable = ({ division, customerOrders }) => {
    return (
      <Stack direction="column" alignItems="center">
        <Typography align="center" sx={{ mt: "1vh", mb: "2vh", fontSize: "4vh" }}>
          {division === "1" ? "販売店システム部" : "代理店・法人システム部"}
        </Typography>
        <TableContainer sx={{ minHeight: "10vh", width: "70vh" }}>
          <Table>
            <TableHead>
              <TableRow>
                {header.map((title) => {
                  return (
                    <TableCell key={title} sx={{ color: "white", bgcolor: "primary.light" }}>
                      {title}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {customerOrders.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "#e3f2fd" },
                  }}
                >
                  <TableCell>{row.group}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.drink}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => clickEditButton(row)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => clickDeleteButton(row)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="outlined"
          onClick={() => {
            clickAddButton(division);
          }}
          sx={{ width: "20vh", fontWeight: "bold", fontSize: "2vh", mt: "3vh" }}
        >
          グループ追加
        </Button>
      </Stack>
    );
  };

  const EditForm = () => {
    return (
      <Dialog open={openEditForm} onClose={closeEditForm}>
        <DialogContent>
          <DialogContentText>編集</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="group"
            label="グループ"
            fullWidth
            variant="standard"
            onChange={editCustomerOder}
          />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={clickEditFormOk}>OK</Button>
          <Button onClick={closeEditForm}>戻る</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const AddForm = () => {
    return (
      <Dialog open={openAddForm} onClose={closeAddForm}>
        <DialogContent>
          <DialogContentText>追加</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="group"
            label="グループ"
            fullWidth
            variant="standard"
            onChange={addCustomerOder}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="名前"
            fullWidth
            variant="standard"
            onChange={addCustomerOder}
          />
          <TextField
            autoFocus
            margin="dense"
            id="drink"
            label="ファーストドリンク"
            fullWidth
            variant="standard"
            onChange={addCustomerOder}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={clickAddFormOk}>OK</Button>
          <Button onClick={closeAddForm}>戻る</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const Confirmation = () => {
    return (
      <Dialog open={openConfirmation} onClose={closeConfirmation}>
        <DialogContent>
          <DialogContentText>本当に削除しますか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clickConfirmationOk}>はい</Button>
          <Button onClick={closeConfirmation}>いいえ</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <Box sx={{ height: height, width: width }}>
        <Box sx={{ height: "7vh" }} />

        <Stack direction="row" justifyContent="flex-end" sx={{ my: "3vh", mr: "3vh" }}>
          <Button
            variant="outlined"
            onClick={clickMainMenu}
            sx={{ width: "20vh", fontWeight: "bold", fontSize: "2vh" }}
          >
            メイン画面
          </Button>
        </Stack>

        <Grid container>
          <Grid item xs={6}>
            <CustomerTable division={"1"} customerOrders={dsCustomerOrders} />
          </Grid>
          <Grid item xs={6}>
            <CustomerTable division={"2"} customerOrders={acsCustomerOrders} />
          </Grid>
        </Grid>
      </Box>
      <EditForm />
      <AddForm />
      <Confirmation />
    </>
  );
};

export default MaintenancePage;
