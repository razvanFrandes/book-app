// Sidebar.tsx
import React, { FC, ReactElement } from "react";
import { Drawer, Box, useMediaQuery, Theme, IconButton } from "@mui/material";
import BookList from "./../BookList/BookList";
import BookForm from "../BookForm/BookForm";
import useDrawer from "./../hooks/useDrawer";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 400;

const Sidebar: FC = (): ReactElement => {
  const { open, toggleDrawer } = useDrawer();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return (
    <>
      <Box hidden={!open}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => toggleDrawer(false)}
          sx={{
            mr: 2,
            position: "fixed",
            top: 10,
            right: -10,
            zIndex: 99999,
            display: { md: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={isDesktop || open}
        onClose={() => toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: isDesktop ? drawerWidth : "calc(100% - 50px)",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isDesktop ? drawerWidth : "calc(100% - 50px)",
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            m: 1,
            borderRadius: 2,
            bgcolor: "#121212",
            flexGrow: 1,
          }}
        >
          <BookList />
          <BookForm />
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
