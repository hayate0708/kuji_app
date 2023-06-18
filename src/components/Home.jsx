import React from "react";

// CONTEXT
import { useGlobalContext } from "contexts/GlobalContext";
import { useWindowDimension } from "components/common/WindowDimension";

// COMPONENTS
import useCustomerForm from "components/CustomerForm";
import useAdministratorForm from "components/AdministratorForm";

// API

// MUI
import { Typography, Box, Stack, Button } from "@mui/material";

const Home = () => {
  const { setTitle } = useGlobalContext();
  const { width, height } = useWindowDimension();
  const [CustomerForm, setCustomerDialog] = useCustomerForm();
  const [AdministratorForm, setAdministratorDialog] = useAdministratorForm();

  React.useEffect(() => {
    setTitle("席決めくじ引き");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectDivision = (division) => {
    setCustomerDialog({ isShown: true });
  };

  const clickAdministrator = () => {
    setAdministratorDialog({ isShown: true });
  };

  return (
    <>
      <Box sx={{ height: height, width: width }}>
        <Box sx={{ height: "7vh" }} />

        <Stack direction="row" justifyContent="flex-end" sx={{ mt: "3vh", mr: "3vh" }}>
          <Box>
            <Button
              variant="outlined"
              onClick={clickAdministrator}
              sx={{ width: "20vh", fontWeight: "bold", fontSize: "2vh" }}
            >
              管理者画面
            </Button>
          </Box>
        </Stack>

        <Typography align="center" sx={{ mt: "10vh", flexGrow: 1, fontWeight: "bold", fontSize: "5vh" }}>
          席決めくじ引き
        </Typography>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={4} sx={{ mt: "10vh" }}>
          <Button
            variant="contained"
            direction="row"
            onClick={() => {
              selectDivision("販売店システム部");
            }}
            sx={{ width: "38vh", height: "20vh" }}
          >
            <Typography align="center" sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "3vh" }}>
              販売店システム部
            </Typography>
          </Button>
          <Button
            variant="contained"
            direction="row"
            onClick={() => {
              selectDivision("代理店・法人システム部");
            }}
            sx={{ width: "38vh", height: "20vh" }}
          >
            <Typography align="center" sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "3vh" }}>
              代理店・法人システム部
            </Typography>
          </Button>
        </Stack>
      </Box>
      <CustomerForm />
      <AdministratorForm />
    </>
  );
};

export default Home;
