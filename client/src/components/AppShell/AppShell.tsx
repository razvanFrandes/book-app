// AppShell.tsx
import React, { FC, ReactElement } from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";
import Main from "./Main";

const AppShell: FC = (): ReactElement => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#000" }}>
      <CssBaseline />
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 1,
          borderRadius: 2,
          bgcolor: "#121212",
          heigth: "100%",
          maxHeight: "100%",
          overflow: "auto",
        }}
      >
        <Main />
      </Box>
    </Box>
  );
};

export default AppShell;
