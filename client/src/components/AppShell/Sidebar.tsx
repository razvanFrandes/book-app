// Sidebar.tsx
import React from "react";
import { useState, useEffect } from "react";
import { Drawer, Box, Typography, Button } from "@mui/material";
import { fetchBooks } from "./../../services/bookService";
import BookList from "./../BookList/BookList";
import { Book } from "../../types/BookTypes";
import BookForm from "../BookForm/BookForm";
import { Menu } from "@mui/icons-material";

const drawerWidth = 400;

const Sidebar: React.FC = () => {
  const [readingBooks, setReadingBooks] = useState<Book[]>([]);
  const [wantToReadBooks, setWantToReadBooks] = useState<Book[]>([]);
  const [readBooks, setReadBooks] = useState<Book[]>([]);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  useEffect(() => {
    const fetchBooksData = async () => {
      const { readingBooks, wantToReadBooks, readBooks } = await fetchBooks();
      setReadingBooks(readingBooks);
      setWantToReadBooks(wantToReadBooks);
      setReadBooks(readBooks);
    };
    fetchBooksData();
  }, []);

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        sx={{
          color: "#000",
          height: "100px",
          width: "70px",
          bgcolor: "#4fff84",
          ":hover": {
            bgcolor: "#4fff84",
            opacity: 0.8,
          },
          borderRadius: 0,
          position: "sticky",
          top: 0,
        }}
      >
        <Menu />
      </Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
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
          <BookList books={{ readingBooks, wantToReadBooks, readBooks }} />
          <BookForm />
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
