export interface Book {
  key: string;
  title: string;
  cover_id: string;
}

export interface BooksListProps {
  books: {
    readingBooks: Book[];
    wantToReadBooks: Book[];
    readBooks: Book[];
  };
}
