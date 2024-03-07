const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

// Import the default data
const categories = require("./categories.json");

app.use(cors());
app.use(express.json());

// Get he default currently reading book
app.get("/api/books/reading", async (req, res) => {
  try {
    const response = await axios.get(
      "https://openlibrary.org/people/mekBot/books/currently-reading.json"
    );
    const readingLog = response.data.reading_log_entries;
    const currentlyReading = readingLog.map((entry) => entry.work);
    res.json(currentlyReading);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch currently reading books" });
  }
});

// Get the default read books
app.get("/api/books/read", async (req, res) => {
  try {
    const response = await axios.get(
      "https://openlibrary.org/people/mekBot/books/already-read.json"
    );
    const readingLog = response.data.reading_log_entries;
    const alreadyRead = readingLog.map((entry) => entry.work);
    res.json(alreadyRead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch already read books" });
  }
});

// Get the default categories
app.get("/api/categories", async (req, res) => {
  try {
    const response = categories;
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch already read books" });
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

const PORT = process.env.PORT || 3000;;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
