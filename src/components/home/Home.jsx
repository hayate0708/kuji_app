import React from "react";

// CONTEXT
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useWindowDimension } from "../../components/common/WindowDimension";

// COMPONENT
import useLotteryForm from "../../components/home/LotteryForm";
import useAdministratorForm from "../../components/home/AdministratorForm";

// MUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Home = () => {
  const { setTitle } = useGlobalContext();
  const { width, height } = useWindowDimension();
  const [CustomerForm, setCustomerDialog] = useLotteryForm();
  const [AdministratorForm, setAdministratorDialog] = useAdministratorForm();

  React.useEffect(() => {
    setTitle("席決めくじ引き");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectDivision = (division) => {
    setCustomerDialog({ isShown: true, division });
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
              selectDivision("1");
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
              selectDivision("2");
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
