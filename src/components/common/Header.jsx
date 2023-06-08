import React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";

const useHeader = () => {
  const [title, setTitle] = React.useState("");

  const Header = () => (
    <AppBar position="fixed">
      <Toolbar
        sx={{ height: "7vh", display: "flex", justifyContent: "center" }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "2vh" }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );

  return [Header, setTitle];
};

export default useHeader;
