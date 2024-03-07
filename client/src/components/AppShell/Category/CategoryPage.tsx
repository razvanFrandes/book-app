import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  addBookToReadingList,
  fetchReadingBooks,
} from "./../../../services/bookService";
function CategoryPage() {
  const { subcategorySlug } = useParams<{ subcategorySlug: string }>();
  const [books, setBooks] = useState<any[]>([]);
  const [readingBooks, setReadingBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://openlibrary.org/subjects/${subcategorySlug}.json?details=true`
        );
        setBooks(response.data.works);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [subcategorySlug]);

  useEffect(() => {
    const getReadingBooks = async () => {
      const books = await fetchReadingBooks();
      setReadingBooks(books);
    };

    getReadingBooks();
  }, []);

  const handleBookAdd = async (book: any) => {
    addBookToReadingList(book);
    const updatedReadingBooks = await fetchReadingBooks();
    setReadingBooks(updatedReadingBooks);
  };

  return (
    <div>
      <Typography
        variant="h1"
        fontWeight={900}
        sx={{ mb: 2, textTransform: "capitalize", color: "#4fff84" }}
      >
        {subcategorySlug}
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="outlined"
        sx={{
          mb: 2,
        }}
      >
        <KeyboardBackspaceIcon />
        Back to Categories
      </Button>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {loading && (
          <CircularProgress
            sx={{
              color: "#fff",
              position: "absolute",
              top: "300px",
              left: 0,
              right: 0,
              bottom: 0,
              margin: "auto",
            }}
          />
        )}
        {books &&
          books.map((book) => (
            <Box
              key={book.key + book.title}
              sx={{
                border: "1px solid #252525",
                borderRadius: "5px",
                p: 2,
                display: "flex",
                gap: "10px",
                width: "calc(33% - 20px)",
                "@media (max-width: 1600px)": { width: "calc(50% - 20px)" },
                "@media (max-width: 1500px)": { width: "calc(50% - 10px)" },
                "@media (max-width: 768px)": { width: "100%" },
              }}
            >
              <Box
                sx={{
                  p: 1,
                  bgcolor: "#252525",
                  width: "170px",
                  height: "200px",
                  textAlign: "center",
                  borderRadius: "5px",
                }}
              >
                {book.cover_id && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_id}.jpg`}
                    alt={book.title}
                    height={185}
                  />
                )}
              </Box>
              <Box sx={{ flex: 1, display: "flex", flexWrap: "wrap" }}>
                <Box>
                  <Typography variant="h5" fontWeight={900}>
                    {book.title}
                  </Typography>
                  <Typography sx={{ color: "#7d7d7d" }}>
                    {book.authors[0]?.name || "Unknown Author"}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  sx={{ mt: "auto" }}
                  onClick={() => handleBookAdd(book)}
                >
                  Add to reading list
                </Button>
              </Box>
            </Box>
          ))}
      </Box>
    </div>
  );
}

export default CategoryPage;
