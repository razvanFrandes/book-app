import useSWR, { mutate } from "swr";
import axios from "axios";
import { API_BASE_URL } from "./../utils/constants";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useReadingBooks = () => {
  const { data, error, mutate } = useSWR(
    `${API_BASE_URL}/api/books/reading`,
    fetcher
  );
  return {
    readingBooks: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useWantToReadBooks = () => {
  const { data, error, mutate } = useSWR(
    `${API_BASE_URL}/api/books/want-to-read`,
    fetcher
  );
  return {
    wantToReadBooks: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useReadBooks = () => {
  const { data, error, mutate } = useSWR(
    `${API_BASE_URL}/api/books/read`,
    fetcher
  );
  return {
    readBooks: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

// Update Book Status
export const useUpdateBookStatus = () => {
  const { mutate: mutateReadingBooks } = useReadingBooks();
  const { mutate: mutateWantToReadBooks } = useWantToReadBooks();
  const { mutate: mutateReadBooks } = useReadBooks();

  const updateBookStatus = async (bookId: string, status: string) => {
    try {
      await axios.put(`${API_BASE_URL}/api/books/`, { bookId, status });

      // Trigger revalidation of the affected book lists
      mutateReadingBooks();
      mutateWantToReadBooks();
      mutateReadBooks();
    } catch (error) {
      console.error("Failed to update book status:", error);
      throw error;
    }
  };

  return updateBookStatus;
};

// Add Book to Reading List
export const addBookToReadingList = async (book: any) => {
  try {
    await axios.post(`${API_BASE_URL}/api/books/reading`, book);
    mutate(`${API_BASE_URL}/api/books/reading`);
  } catch (error) {
    console.error("Failed to add book to reading list:", error);
    throw error;
  }
};

// Upload a Book
export const addBook = async (book: any) => {
  try {
    await axios.post(`${API_BASE_URL}/api/books`, book);
    mutate(`${API_BASE_URL}/api/books/reading`);
    mutate(`${API_BASE_URL}/api/books/want-to-read`);
    mutate(`${API_BASE_URL}/api/books/read`);
  } catch (error) {
    console.error("Failed to add book:", error);
    throw error;
  }
};

// Delete a Book
export const deleteBook = async (bookId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/books/`, { data: { bookId } });
    mutate(`${API_BASE_URL}/api/books/reading`);
    mutate(`${API_BASE_URL}/api/books/want-to-read`);
    mutate(`${API_BASE_URL}/api/books/read`);
  } catch (error) {
    console.error("Failed to delete book:", error);
    throw error;
  }
};
