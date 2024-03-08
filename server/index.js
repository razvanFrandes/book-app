const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const fs = require("fs");

// Import the default data
const categories = require("./categories.json");
const booksData = require("./books.json");

app.use(cors());
app.use(express.json());

// Save the books in a JSON file, cause no db :(
app.get("/api/all-books", async (req, res) => {
  try {
    if (booksData && booksData.length > 0) {
      return res.json(booksData);
    }

    const [readingResponse, readResponse] = await Promise.all([
      axios.get(
        "https://openlibrary.org/people/mekBot/books/currently-reading.json"
      ),
      axios.get(
        "https://openlibrary.org/people/mekBot/books/already-read.json"
      ),
    ]);

    const readingLog = readingResponse.data.reading_log_entries;
    const currentlyReading = readingLog.map((entry) => ({
      ...entry.work,
      status: "reading",
    }));

    const readLog = readResponse.data.reading_log_entries;
    let alreadyRead = readLog.map((entry) => ({
      ...entry.work,
      status: "read",
    }));

    // Select 10 random books from "already read" and assign them a status of "want-to-read"
    const wantToRead = [];
    for (let i = 0; i < 10; i++) {
      if (alreadyRead.length > 0) {
        const randomIndex = Math.floor(Math.random() * alreadyRead.length);
        const randomBook = alreadyRead.splice(randomIndex, 1)[0];
        randomBook.status = "want-to-read";
        wantToRead.push(randomBook);
      }
    }

    const books = [...currentlyReading, ...alreadyRead, ...wantToRead];

    // Save the books to a JSON file
    fs.writeFileSync("books.json", JSON.stringify(books, null, 2));

    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Get all read books
app.get("/api/books/read", async (req, res) => {
  try {
    const response = booksData.filter((book) => book.status === "read");
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch read books" });
  }
});

// Get all currently reading books
app.get("/api/books/reading", async (req, res) => {
  try {
    const response = booksData.filter((book) => book.status === "reading");
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch currently reading books" });
  }
});

// Add a book to the reading list
app.post("/api/books/reading", async (req, res) => {
  try {
    const book = req.body;

    const bookIndex = booksData.findIndex((b) => b.key === book.key);

    if (bookIndex !== -1) {
      // If the book exists, update its status to "reading"
      booksData[bookIndex].status = "reading";
    } else {
      // If the book doesn't exist, add it to the booksData array with status "reading"
      book.status = "reading";
      booksData.push(book);
    }

    // Save the updated booksData to the JSON file
    fs.writeFileSync("books.json", JSON.stringify(booksData, null, 2));

    res.json({ message: "Book added to reading list successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add book to reading list" });
  }
});

// Get all want to read books
app.get("/api/books/want-to-read", async (req, res) => {
  try {
    const response = booksData.filter((book) => book.status === "want-to-read");
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch want to read books" });
  }
});

//Update books josn file for book status
app.put("/api/books/", async (req, res) => {
  try {
    const { bookId, status } = req.body;

    const bookIndex = booksData.findIndex((book) => book.key === bookId);

    if (bookIndex === -1) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Update the book's status
    booksData[bookIndex].status = status;

    // Save the updated books data to the JSON file
    fs.writeFileSync("books.json", JSON.stringify(booksData, null, 2));

    res.json({
      message: {
        status: "success",
        message: "Book status updated successfully",
        book: booksData[bookIndex],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update book status" });
  }
});

// Add a new book to the booksData array
app.post("/api/books", async (req, res) => {
  try {
    const newBook = req.body;
    newBook.status = "want-to-read"; // Set the initial status of the new book
    booksData.unshift(newBook);
    fs.writeFileSync("books.json", JSON.stringify(booksData, null, 2));
    res.json({ message: "Book added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add book" });
  }
});

// Delete a book from the booksData array
app.delete("/api/books/", async (req, res) => {
  try {
    const { bookId } = req.body;

    // Find the index of the book in the booksData array
    const bookIndex = booksData.findIndex((book) => book.key === bookId);

    if (bookIndex === -1) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Remove the book from the booksData array
    booksData.splice(bookIndex, 1);

    // Save the updated booksData to the JSON file
    fs.writeFileSync("books.json", JSON.stringify(booksData, null, 2));

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

// Get the default categories
app.get("/api/categories", async (req, res) => {
  try {
    const response = categories;
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Get a category by slug
app.get("/api/categories/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const response = await axios.get(
      `https://openlibrary.org/subjects/${slug}?details=true`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch category details" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
