import React from "react";

// MUI
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

const useHeader = () => {
  const [title, setTitle] = React.useState("");

  const Header = () => (
    <AppBar position="fixed">
      <Toolbar sx={{ height: "7vh", display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "2vh" }}>{title}</Typography>
      </Toolbar>
    </AppBar>
  );

  return [Header, setTitle];
};

export default useHeader;
