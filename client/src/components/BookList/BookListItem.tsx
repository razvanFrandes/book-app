import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const BookListItem = ({
  book,
  onMoveBook,
  tabIndex,
}: {
  book: any;
  onMoveBook: (bookId: string, category: string) => void;
  tabIndex: number;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMoveBook = (category: string) => {
    onMoveBook(book.key, category);
    handleMenuClose();
  };

  console.log(book)

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
          bgcolor: "#252525",
          width: "60px",
          height: "68px",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
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
          {tabIndex != 0 && (
            <MenuItem onClick={() => handleMoveBook("readingBooks")}>
              Currently Reading
            </MenuItem>
          )}
          {tabIndex != 1 && (
            <MenuItem onClick={() => handleMoveBook("wantToReadBooks")}>
              Want to Read
            </MenuItem>
          )}
          {tabIndex != 2 && (
            <MenuItem onClick={() => handleMoveBook("readBooks")}>
              Finished
            </MenuItem>
          )}
        </Menu>
      </Box>
    </Box>
  );
};

export default BookListItem;
