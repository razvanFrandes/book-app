export interface Authors {
  name: string;
}

export interface Book {
  key: string;
  title: string;
  cover_id?: string;
  color: string;
  author_names: string | undefined;
  authors: Authors[];
  first_publish_year: string;
}

export interface BooksListProps {
  books: {
    readingBooks: Book[];
    wantToReadBooks: Book[];
    readBooks: Book[];
  };
}

export interface BookListItemProps {
  book: Book;
  tabIndex: number;
}
