export type Book = {
  id: string;
  name: string;
  released: number;
  pages: number;
  stock: number;
  authorId: string;
};

export type NewBook = Omit<Book, 'id'>;

export type PartialBook = Partial<Book>;

export type Data = {
  bookId: string;
  action: 'take' | 'return';
};
