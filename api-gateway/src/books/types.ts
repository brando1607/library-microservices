export type Book = {
  name: string;
  released: number;
  pages: number;
  stock: number;
  authorId: string;
};

export type PartialBook = Partial<Book>;
