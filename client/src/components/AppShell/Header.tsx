// Header.tsx
import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import useDrawer from "./../hooks/useDrawer";

const Header: React.FC = () => {
  const { toggleDrawer } = useDrawer();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#000",
        margin: "0px -20px",
        width: "calc(100% + 40px)",
        color: "#fff",
        top: -30,
        mt: "-30px",
        borderBottom: "1px solid #4fff84",
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => toggleDrawer(true)}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BookStore
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
