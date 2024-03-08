import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useUpdateBookStatus, deleteBook } from "../../services/bookService";
import { Book } from "@mui/icons-material";

const BookListItem = ({ book, tabIndex }: { book: any; tabIndex: number }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const handleDeleteBook = async () => {
    try {
      await deleteBook(book.key);
      handleMenuClose();
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
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
          <Book sx={{ color: "#121212", height: 50, width: 45 }} />
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
            {book.author_names && book.author_names[0]}
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
          <MenuItem
            sx={{ color: "#f95858", fontWeight: 900 }}
            onClick={handleDeleteBook}
          >
            Delete
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default BookListItem;
