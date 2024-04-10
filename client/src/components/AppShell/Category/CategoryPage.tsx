import React from "react";
import { useParams, Link } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import { Typography, Box, Button, CircularProgress, Grid } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  addBookToReadingList,
  deleteBook,
  useReadingBooks,
} from "../../../services/bookService";
import { AddBox, Delete, PlusOne } from "@mui/icons-material";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function CategoryPage() {
  const { subcategorySlug } = useParams<{ subcategorySlug: string }>();
  const { data: books, error } = useSWR(
    subcategorySlug
      ? `https://openlibrary.org/subjects/${subcategorySlug}.json?details=true`
      : null,
    fetcher
  );
  const { readingBooks, mutate: mutateReadingBooks } = useReadingBooks();

  const handleBookAdd = async (book: any) => {
    try {
      await addBookToReadingList(book);
      // After adding the book, mutate the SWR data
      mutateReadingBooks(); // Optionally, you can re-fetch or pass updated data directly
    } catch (error) {
      console.error("Failed to add book to reading list:", error);
    }
  };

  const handleBookDelete = async (bookId: string) => {
    try {
      await deleteBook(bookId);
      mutateReadingBooks();
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const isActive = (bookTitle: string) => {
    return !!readingBooks?.find(
      (readingBook: { title: string }) => readingBook.title === bookTitle
    );
  };

  return (
    <Box sx={{ pb: 10 }}>
      <Typography
        variant="h2"
        fontWeight={900}
        sx={{
          mb: 2,
          textTransform: "capitalize",
          color: "#4fff84",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {subcategorySlug}
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          sx={{
            borderColor: "transparent",
            px: 0,
            ":hover": {
              borderColor: "transparent",
            },
          }}
        >
          <KeyboardBackspaceIcon sx={{ mr: 2 }} />
          Back to Categories
        </Button>
      </Box>

      <Grid container spacing={2}>
        {!books && (
          <CircularProgress
            sx={{
              color: "#4fff84",
              position: "absolute",
              top: "300px",
              left: 0,
              right: 0,
              bottom: 0,
              margin: "auto",
            }}
          />
        )}
        {books?.works.map((book: any) => (
          <Grid
            item
            key={book.key + book.title}
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={3}
          >
            <Box
              sx={{
                border: "1px solid #252525",
                transition: "0.2s",
                borderRadius: "5px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                "&:hover": {
                  boxShadow: "0px 0px 0px 5px #4fff84",
                  transform: "scale(1.02) translateY(-5px)",
                },
              }}
            >
              <Box>
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_id}.jpg`}
                  alt={book.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </Box>
              <Box>
                <Typography
                  fontWeight={900}
                  sx={{ mt: 1, fontSize: "18px", lineHeight: 1.4, mb: 1 }}
                >
                  {book.title}
                </Typography>
                <Box sx={{ color: "#8a8a8a" }}>
                  <Typography sx={{ fontSize: "14px" }}>
                    {book.author_names && book.author_names[0]}
                    {book.authors && book.authors[0].name}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", mb: 2 }}>
                    {book.first_publish_year}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  textAlign: "left",
                  mt: "auto",
                  display: "flex",
                  gap: "10px",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    border: "none !important",
                    px: "0px !important",
                    minWidth: "auto",
                    color: isActive(book.title)
                      ? "#4ea6ff  !important"
                      : "#4fff84",
                  }}
                  onClick={() => handleBookAdd(book)}
                  disabled={isActive(book.title)}
                >
                  <AddBox
                    sx={{
                      mr: 1,
                      color: "#4fff84",
                      display: isActive(book.title) ? "none" : "block",
                    }}
                  />
                  {isActive(book.title) ? "Added" : "Add to reading list"}
                </Button>
                {isActive(book.title) && (
                  <Button
                    variant="outlined"
                    sx={{
                      border: "none !important",
                      px: "0px !important",
                      minWidth: "auto",
                      color: "#ff4e4e",
                      ":hover": { color: "#ff4e4e" },
                    }}
                    onClick={() => handleBookDelete(book.key)}
                  >
                    <Delete
                      sx={{
                        mr: 1,
                        color: "#ff4e4e",
                      }}
                    />
                    Remove
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CategoryPage;
