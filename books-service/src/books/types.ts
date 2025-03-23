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
