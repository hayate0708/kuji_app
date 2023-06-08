import React from "react";

import { useGlobalContext } from "contexts/GlobalContext";
import { useWindowDimension } from "components/common/WindowDimension";
import useInputForm from "components/InputForm";

// API

// MUI
import { Typography, Box, Stack, Button } from "@mui/material";
// import TextField from "@mui/material/TextField";

const Home = () => {
  const { setTitle } = useGlobalContext();
  const { width, height } = useWindowDimension();
  const [InputForm, setDialog] = useInputForm();

  React.useEffect(() => {
    setTitle("席決めくじ引き");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectDivision = (divison) => {
    setDialog({ isShown: true });
    console.log(divison);
  };

  return (
    <>
      <Box sx={{ height: height, width: width }}>
        <Box sx={{ height: "7vh" }} />

        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ mt: "3vh", mr: "3vh" }}
        >
          <Box>
            <Button
              variant="outlined"
              sx={{ width: "20vh", fontWeight: "bold", fontSize: "2vh" }}
            >
              管理者画面
            </Button>
          </Box>
        </Stack>

        <Typography
          align="center"
          sx={{ mt: "10vh", flexGrow: 1, fontWeight: "bold", fontSize: "5vh" }}
        >
          席決めくじ引き
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          sx={{ mt: "10vh" }}
        >
          <Button
            variant="contained"
            direction="row"
            onClick={() => {
              selectDivision("販売店システム部");
            }}
            sx={{ width: "38vh", height: "20vh" }}
          >
            <Typography
              align="center"
              sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "3vh" }}
            >
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
            <Typography
              align="center"
              sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "3vh" }}
            >
              代理店・法人システム部
            </Typography>
          </Button>
        </Stack>
      </Box>
      <InputForm />
    </>
  );
};

export default Home;
