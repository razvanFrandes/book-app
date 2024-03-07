import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";

const Header: React.FC = () => {
  return (
    <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "auto",
            gap: "20px",
          }}
        >
          <img src="/book-worm-logo.svg" alt="logo" width="50" height="50" />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: "900", flexGrow: 1 }}
          >
            Book Worm
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
