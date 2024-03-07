import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  Tabs,
  Tab,
  Typography,
  Hidden,
  CircularProgress,
} from "@mui/material";
import BookListItem from "./BookListItem";
import { BooksListProps } from "../../types/BookTypes";
import { fetchBooks, moveBook } from "../../services/bookService";

const BooksList: React.FC<BooksListProps> = () => {
  const [books, setBooks] = useState({
    readingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
  });
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooksData = async () => {
      const booksData = await fetchBooks();
      setBooks(booksData);
      setLoading(false);
    };
    fetchBooksData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleMoveBook = async (
    bookId: string,
    sourceCategory: string,
    destinationCategory: string
  ) => {
    moveBook(bookId, sourceCategory, destinationCategory);
    const updatedBooksData = await fetchBooks();
    setBooks(updatedBooksData);
  };

  function booksTabsIndex(index: number) {
    return {
      id: `book-tab-${index}`,
      "aria-controls": `book-tabpanel-${index}`,
    };
  }

  return (
    <List sx={{ pt: 0, overflow: "hidden" }}>
      <Box sx={{ position: "sticky", top: 0, zIndex: 10, bgcolor: "#121212" }}>
        <Tabs
          TabIndicatorProps={{ style: { background: "#4fff84" } }}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid #2a2a2a",
          }}
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{ flex: 1 }} label="Currently" {...booksTabsIndex(0)} />
          <Tab sx={{ flex: 1 }} label="Want to read" {...booksTabsIndex(1)} />
          <Tab sx={{ flex: 1 }} label="Finished" {...booksTabsIndex(2)} />
        </Tabs>
      </Box>
      {loading && (
        <CircularProgress
          sx={{
            color: "#fff",
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            margin: "auto",
          }}
        />
      )}

      <Box sx={{ overflow: "auto", height: "calc(100vh - 140px)" }}>
        {books.readingBooks && books.readingBooks.length > 0 ? (
          tabIndex === 0 && (
            <Box sx={{ my: 1 }}>
              {books.readingBooks.map((book: any) => (
                <BookListItem
                  key={book.key + book.title}
                  book={book}
                  tabIndex={tabIndex}
                  onMoveBook={(bookId, category) =>
                    handleMoveBook(bookId, "readingBooks", category)
                  }
                />
              ))}
            </Box>
          )
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
            No books to read
          </Typography>
        )}
        {books.wantToReadBooks && books.wantToReadBooks.length > 0 ? (
          tabIndex === 1 && (
            <Box sx={{ my: 1 }}>
              {books.wantToReadBooks.map((book: any) => (
                <BookListItem
                  key={book.key + book.title}
                  book={book}
                  tabIndex={tabIndex}
                  onMoveBook={(bookId, category) =>
                    handleMoveBook(bookId, "wantToReadBooks", category)
                  }
                />
              ))}
            </Box>
          )
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
            No books to read
          </Typography>
        )}
        {books.readBooks && books.readBooks.length > 0 && tabIndex === 2 && (
          <Box sx={{ my: 1 }}>
            {books.readBooks.map((book: any) => (
              <BookListItem
                key={book.key + book.title}
                book={book}
                tabIndex={tabIndex}
                onMoveBook={(bookId, category) =>
                  handleMoveBook(bookId, "readBooks", category)
                }
              />
            ))}
          </Box>
        )}
      </Box>
    </List>
  );
};

export default BooksList;
