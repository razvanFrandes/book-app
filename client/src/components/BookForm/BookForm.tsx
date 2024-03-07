import React, { useState } from "react";
import {
  Drawer,
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

function BookForm() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      author_names: [""],
      first_publish_year: "",
      // Add more fields as needed
    },
    onSubmit: (values) => {
      const newBook = {
        key: uuidv4(),
        title: values.title,
        author_names: [values.author_names],
        first_publish_year: values.first_publish_year,
        // Add more properties as needed
      };

      // Add the new book to the "want to read" books in local storage
      const wantToReadBooks = JSON.parse(
        localStorage.getItem("wantToReadBooks") || "[]"
      );
      wantToReadBooks.unshift(newBook);
      localStorage.setItem("wantToReadBooks", JSON.stringify(wantToReadBooks));

      // Close the dialog after submission
      handleCloseDialog();
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
          <form onSubmit={formik.handleSubmit}>
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
            {/* Add more form fields as needed */}
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
