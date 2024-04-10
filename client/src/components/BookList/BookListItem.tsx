import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  useUpdateBookStatus,
  deleteBook,
  editBook,
} from "../../services/bookService";
import { Book as BookIcon } from "@mui/icons-material";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

import { Book, BookListItemProps } from "../../types/BookTypes";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author_names: Yup.string().required("Author name is required"),
  first_publish_year: Yup.string().required("First publish year is required"),
});

const BookListItem: React.FC<BookListItemProps> = ({ book, tabIndex }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editBookDialogOpen, setEditBookDialogOpen] = useState(false);
  const updateBookStatus = useUpdateBookStatus();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMoveBook = async (status: string) => {
    try {
      await updateBookStatus(book.key, status);
      handleMenuClose();
    } catch (error) {
      console.error("Failed to update book status:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: book.title,
      author_names: book.author_names && book.author_names[0],
      first_publish_year: book.first_publish_year,
    },
    validationSchema,

    onSubmit: async (values) => {
      const newBook: Book = {
        key: book.key,
        title: values.title,
        author_names: values.author_names,
        first_publish_year: values.first_publish_year,
        color: "#4fff84",
        authors: values.author_names ? [{ name: values.author_names }] : [],
      };

      try {
        await editBook(newBook);
        setEditBookDialogOpen(false);
      } catch (error) {
        console.error("Failed to edit book:", error);
      }
    },
  });

  const handleDeleteBook = async () => {
    try {
      await deleteBook(book.key);
      handleMenuClose();
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const handleEditBook = () => {
    setEditBookDialogOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        gap: "10px",
        mb: 1,
        position: "relative",
        transition: "background-color 0.2s",
        ":hover": {
          backgroundColor: "#2a2a2a",
        },
        "&:hover .dropdown-button": {
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          p: 1,
          bgcolor: book.color ? book.color : "#252525",
          width: "60px",
          height: "68px",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        {book.color && (
          <BookIcon sx={{ color: "#121212", height: 50, width: 45 }} />
        )}
        {book.cover_id && (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_id}.jpg`}
            alt={book.title}
            height={50}
          />
        )}
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 900, fontSize: "14px", lineHeight: 1 }}>
          {book.title}
        </Typography>
        <Box sx={{ color: "#8a8a8a" }}>
          <Typography sx={{ fontSize: "14px" }}>
            {Array.isArray(book.author_names)
              ? book.author_names[0]
              : book.author_names}
            {book.authors && book.authors[0].name}
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>
            {book.first_publish_year}
          </Typography>
        </Box>
      </Box>
      <Box
        className="dropdown-button"
        sx={{
          position: "absolute",
          top: 14,
          right: 14,
          opacity: 0,
          transition: "opacity 0.2s",
        }}
      >
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {tabIndex !== 0 && (
            <MenuItem onClick={() => handleMoveBook("reading")}>
              Currently Reading
            </MenuItem>
          )}
          {tabIndex !== 1 && (
            <MenuItem onClick={() => handleMoveBook("want-to-read")}>
              Want to Read
            </MenuItem>
          )}
          {tabIndex !== 2 && (
            <MenuItem onClick={() => handleMoveBook("read")}>Finished</MenuItem>
          )}
          <Divider />
          <MenuItem onClick={() => handleEditBook()}>Edit</MenuItem>
          <Divider />
          <MenuItem
            sx={{ color: "#f95858", fontWeight: 900 }}
            onClick={handleDeleteBook}
          >
            Delete
          </MenuItem>
        </Menu>
      </Box>

      <Dialog
        open={editBookDialogOpen}
        onClose={() => setEditBookDialogOpen(false)}
      >
        <DialogTitle>Edit a Book</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit} style={{ paddingTop: 20 }}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              sx={{ mb: 2 }}
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              id="author"
              name="author_names"
              label="Author"
              sx={{ mb: 2 }}
              value={formik.values.author_names}
              onChange={formik.handleChange}
              error={
                formik.touched.author_names &&
                Boolean(formik.errors.author_names)
              }
              helperText={
                formik.touched.author_names && formik.errors.author_names
              }
            />
            <TextField
              fullWidth
              id="year"
              name="first_publish_year"
              label="Year"
              sx={{ mb: 2, color: "#fff" }}
              value={formik.values.first_publish_year}
              onChange={formik.handleChange}
              error={
                formik.touched.first_publish_year &&
                Boolean(formik.errors.first_publish_year)
              }
              helperText={
                formik.touched.first_publish_year &&
                formik.errors.first_publish_year
              }
            />
            <Button
              sx={{
                width: "100%",
                bgcolor: "#fff",
                height: "50px",
                ":hover": { bgcolor: "#fff" },
              }}
              type="submit"
            >
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BookListItem;
