import React, { useState } from "react";
import {
  Box,
  List,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
} from "@mui/material";
import BookListItem from "./BookListItem";
import { BooksListProps, Book } from "../../types/BookTypes";
import {
  useReadingBooks,
  useWantToReadBooks,
  useReadBooks,
} from "../../services/bookService";

const BooksList: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { readingBooks, isLoading: isReadingBooksLoading } = useReadingBooks();
  const { wantToReadBooks, isLoading: isWantToReadBooksLoading } =
    useWantToReadBooks();
  const { readBooks, isLoading: isReadBooksLoading } = useReadBooks();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  function booksTabsIndex(index: number) {
    return {
      id: `book-tab-${index}`,
      "aria-controls": `book-tabpanel-${index}`,
    };
  }

  const isLoading =
    isReadingBooksLoading || isWantToReadBooksLoading || isReadBooksLoading;

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
      {isLoading && (
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
        {readingBooks && readingBooks.length > 0 ? (
          tabIndex === 0 && (
            <Box sx={{ my: 1 }}>
              {readingBooks.map((book: Book) => (
                <BookListItem
                  key={book.key + book.title}
                  book={book}
                  tabIndex={tabIndex}
                />
              ))}
            </Box>
          )
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
            0 books currently reading
          </Typography>
        )}
        {wantToReadBooks && wantToReadBooks.length > 0 ? (
          tabIndex === 1 && (
            <Box sx={{ my: 1 }}>
              {wantToReadBooks.map((book: Book) => (
                <BookListItem
                  key={book.key + book.title}
                  book={book}
                  tabIndex={tabIndex}
                />
              ))}
            </Box>
          )
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
            Add books to your want to read list
          </Typography>
        )}
        {readBooks && readBooks.length > 0 && tabIndex === 2 && (
          <Box sx={{ my: 1 }}>
            {readBooks.map((book: Book) => (
              <BookListItem
                key={book.key + book.title}
                book={book}
                tabIndex={tabIndex}
              />
            ))}
          </Box>
        )}
      </Box>
    </List>
  );
};

export default BooksList;
