import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { addBook } from "./../../services/bookService";
import { Book } from "../../types/BookTypes";

function BookForm() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author_names: Yup.string().required("Author name is required"),
    first_publish_year: Yup.string().required("First publish year is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      author_names: "",
      first_publish_year: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const newBook: Book = {
        key: uuidv4(),
        title: values.title,
        author_names: values.author_names,
        first_publish_year: values.first_publish_year,
        color: "#4fff84",
        authors: [{ name: values.author_names }],
      };

      try {
        await addBook(newBook);
        handleCloseDialog();
      } catch (error) {
        console.error("Failed to add book:", error);
      }
    },
  });
  return (
    <Box>
      <Typography
        onClick={handleOpenDialog}
        sx={{
          bgcolor: "#4fff84",
          cursor: "pointer",
          textAlign: "center",
          py: 2,
          color: "#121212",
          fontWeight: 900,
          ":hover": { opacity: 0.9 },
        }}
      >
        Add a Book
      </Typography>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add a Book</DialogTitle>
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
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default BookForm;
