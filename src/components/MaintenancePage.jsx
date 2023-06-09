import React from "react";
import { useWindowDimension } from "components/common/WindowDimension";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "contexts/GlobalContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// API
import customerOrdersApi from "apis/CustomerOrdersApi";

// MUI
import {
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";

const MaintenancePage = () => {
  const { setTitle, setDialog } = useGlobalContext();
  const { width, height } = useWindowDimension();
  const [allCustomerOrders, setAllCustomerOrders] = React.useState([]);
  const [dsCustomerOrders, setDsCustomerOrders] = React.useState([]);
  const [acsCustomerOrders, setAcsCustomerOrders] = React.useState([]);
  const [selectedCustomerOrder, setSelectedCustomerOrder] = React.useState();
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [selectedDivision, setSelectedDivision] = React.useState();
  const [error, setError] = React.useState(false);

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
    setSelectedCustomerOrder(customerOrder);
    setOpenEditForm(true);
    console.log(allCustomerOrders);
  };
  const clickAddButton = (division) => {
    setSelectedDivision(division);
    setOpenAddForm(true);
  };

  const clickDeleteButton = (customerOrder) => {
    setSelectedCustomerOrder(customerOrder);
    setOpenConfirmation(true);
  };

  const clickEditFormOk = () => {
    if (editedGroup === "") {
      setError(true);
    } else {
      setAllCustomerOrders(
        allCustomerOrders.map((customerOrder) => {
          if (customerOrder.id === selectedCustomerOrder.id) {
            return {
              id: customerOrder.id,
              division: customerOrder.division,
              group: editedGroup,
              name: editedName,
              drink: editedDrink,
            };
          } else {
            return customerOrder;
          }
        })
      );

      closeEditForm();
    }
  };

  const closeEditForm = () => {
    setOpenEditForm(false);
    setError(false);
  };

  const clickAddFormOk = () => {
    if (addedGroup === "") {
      setError(true);
    } else {
      for (let i = 0; i < allCustomerOrders.length; i++) {
        if (allCustomerOrders[i].id !== i + 1) {
          setAllCustomerOrders([
            ...allCustomerOrders,
            {
              id: i + 1,
              division: selectedDivision,
              group: addedGroup,
              name: addedName,
              drink: addedDrink,
            },
          ]);

          break;
        }

        if (i + 1 === allCustomerOrders.length) {
          setAllCustomerOrders([
            ...allCustomerOrders,
            {
              id: allCustomerOrders.length + 1,
              division: selectedDivision,
              group: addedGroup,
              name: addedName,
              drink: addedDrink,
            },
          ]);
        }
      }

      closeAddForm();
    }
  };

  const closeAddForm = () => {
    setOpenAddForm(false);
    setError(false);
  };

  const clickConfirmationOk = () => {
    setAllCustomerOrders(
      allCustomerOrders.filter((customerOrder) => {
        return customerOrder.id !== selectedCustomerOrder.id;
      })
    );

    closeConfirmation();
  };

  const closeConfirmation = () => setOpenConfirmation(false);

  const ErrorMessage = () => (
    <Typography sx={{ color: "error.main" }}>
      グループを入力してください
    </Typography>
  );

  const CustomerTable = ({ division, customerOrders }) => {
    return (
      <Stack direction="column" alignItems="center">
        <Typography
          align="center"
          sx={{ mt: "1vh", mb: "2vh", fontSize: "4vh" }}
        >
          {division === "1" ? "販売店システム部" : "代理店・法人システム部"}
        </Typography>
        <TableContainer sx={{ width: "70vh" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white", bgcolor: "primary.light" }}>
                  グループ
                </TableCell>
                <TableCell sx={{ color: "white", bgcolor: "primary.light" }}>
                  名前
                </TableCell>
                <TableCell sx={{ color: "white", bgcolor: "primary.light" }}>
                  ドリンク
                </TableCell>
                <TableCell sx={{ color: "white", bgcolor: "primary.light" }}>
                  編集
                </TableCell>
                <TableCell sx={{ color: "white", bgcolor: "primary.light" }}>
                  削除
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerOrders.map((row) => (
                <TableRow
                  //   key={row.name}
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
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <DialogContent>
          <DialogContentText>編集</DialogContentText>
          {error && <ErrorMessage />}
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
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <DialogContent>
          <DialogContentText>編集</DialogContentText>
          {error && <ErrorMessage />}
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

        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ my: "3vh", mr: "3vh" }}
        >
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
        <Stack direction="row" justifyContent="center">
          <Button
            variant="outlined"
            //   onClick={clickAdministrator}
            sx={{
              width: "20vh",
              fontWeight: "bold",
              fontSize: "2vh",
              mt: "3vh",
            }}
          >
            登録
          </Button>
        </Stack>
      </Box>
      <EditForm />
      <AddForm />
      <Confirmation />
    </>
  );
};

export default MaintenancePage;
