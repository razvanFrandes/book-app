// bookService.ts
import axios from "axios";

const API_BASE_URL = "https://book-app-8kq8.vercel.app";

export const fetchReadingBooks = async () => {
  const readingBooks = localStorage.getItem("readingBooks");
  if (readingBooks) {
    return JSON.parse(readingBooks);
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/api/books/reading`);
    const books = response.data;
    localStorage.setItem("readingBooks", JSON.stringify(books));
    return books;
  } catch (error) {
    console.error("Failed to fetch reading books:", error);
    return [];
  }
};

export const fetchReadBooks = async () => {
  const readBooks = localStorage.getItem("readBooks");
  if (readBooks) {
    return JSON.parse(readBooks);
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/api/books/read`);
    const books = response.data;
    localStorage.setItem("readBooks", JSON.stringify(books));
    return books;
  } catch (error) {
    console.error("Failed to fetch read books:", error);
    return [];
  }
};

export const fetchBooks = async () => {
  const readingBooks = localStorage.getItem("readingBooks");
  const readBooks = localStorage.getItem("readBooks");
  const wantToReadBooks = localStorage.getItem("wantToReadBooks");
  if (readingBooks && readBooks && wantToReadBooks) {
    return {
      readingBooks: JSON.parse(readingBooks),
      readBooks: JSON.parse(readBooks),
      wantToReadBooks: JSON.parse(wantToReadBooks),
    };
  }
  try {
    const [readingResponse, readResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/api/books/reading`),
      axios.get(`${API_BASE_URL}/api/books/read`),
    ]);
    const readingBooksData = readingResponse.data;
    let readBooksData = readResponse.data;
    let wantToReadBooksData: any[] = [];

    // I just selected 10 books for the sake of this example
    const randomBooks = getRandomBooks(readBooksData, 10);
    wantToReadBooksData = [...wantToReadBooksData, ...randomBooks];

    // Remove the selected random books from readBooksData
    readBooksData = readBooksData.filter(
      (book: { key: any }) =>
        !randomBooks.some((randomBook) => randomBook.key === book.key)
    );

    localStorage.setItem("readingBooks", JSON.stringify(readingBooksData));
    localStorage.setItem("readBooks", JSON.stringify(readBooksData));
    localStorage.setItem(
      "wantToReadBooks",
      JSON.stringify(wantToReadBooksData)
    );

    return {
      readingBooks: readingBooksData,
      readBooks: readBooksData,
      wantToReadBooks: wantToReadBooksData,
    };
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return {
      readingBooks: [],
      readBooks: [],
      wantToReadBooks: [],
    };
  }
};

export const addBookToReadingList = (book: any) => {
  const readingBooks = localStorage.getItem("readingBooks");
  if (readingBooks) {
    const readingBooksArray = JSON.parse(readingBooks);
    const bookExists = readingBooksArray.some(
      (existingBook: any) => existingBook.key === book.key
    );
    if (!bookExists) {
      readingBooksArray.push(book);
      localStorage.setItem("readingBooks", JSON.stringify(readingBooksArray));
    }
  } else {
    localStorage.setItem("readingBooks", JSON.stringify([book]));
  }
};

// Helper function to select random books
const getRandomBooks = (books: any[], count: number): any[] => {
  const shuffled = [...books].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Add this function to move a book to a different category
export const moveBook = (
  bookId: string,
  sourceCategory: string,
  destinationCategory: string
) => {
  const sourceBooks = localStorage.getItem(sourceCategory);
  const destinationBooks = localStorage.getItem(destinationCategory);
  console.log(destinationBooks);
  if (sourceBooks && destinationBooks) {
    const sourceBooksArray = JSON.parse(sourceBooks);
    const destinationBooksArray = JSON.parse(destinationBooks);

    const bookIndex = sourceBooksArray.findIndex(
      (book: { key: string }) => book.key === bookId
    );
    if (bookIndex !== -1) {
      const [movedBook] = sourceBooksArray.splice(bookIndex, 1);

      destinationBooksArray.push(movedBook);
      localStorage.setItem(sourceCategory, JSON.stringify(sourceBooksArray));
      localStorage.setItem(
        destinationCategory,
        JSON.stringify(destinationBooksArray)
      );
    }
  }
};
