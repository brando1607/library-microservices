import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book, PartialBook, NewBook, Data } from './types';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BookService {
  constructor(
    @Inject('USER_SERVICE') private client: ClientProxy,
    private db: PrismaService,
  ) {}

  async getBooks(): Promise<Book[] | string> {
    try {
      const books = await this.db.books.findMany();

      if (books.length === 0) return 'No books yet';

      return books;
    } catch (error) {
      return error;
    }
  }

  async getBook(id: string): Promise<Book | string> {
    try {
      const book = await this.db.books.findFirst({ where: { id: id } });

      if (!book) return 'Book not found';

      return book;
    } catch (error) {
      return error;
    }
  }

  async createBook(newBook: NewBook): Promise<Book | string> {
    try {
      const bookExists = await this.db.books.findFirst({
        where: { name: newBook.name },
      });

      if (bookExists) return 'Book already exists';

      //check if user is author

      const userIsAuthor = await lastValueFrom(
        this.client.send({ cmd: 'userIsAuthor' }, newBook.authorId),
      );

      if (!userIsAuthor) return 'User is not an author or not found.';

      const book = await this.db.books.create({ data: newBook });

      return book;
    } catch (error) {
      return error;
    }
  }

  async updateBook({
    id,
    newData,
  }: {
    id: string;
    newData: PartialBook;
  }): Promise<Book | string> {
    try {
      const bookExists = await this.db.books.findFirst({
        where: { name: newData.name },
      });

      if (!bookExists) return 'Book not found';

      const update = await this.db.books.update({
        where: { id: id },
        data: newData,
      });

      return update;
    } catch (error) {
      return error;
    }
  }

  async delete(id: string): Promise<Book | string> {
    try {
      const bookExists = await this.db.books.findFirst({
        where: { id: id },
      });

      if (!bookExists) return 'Book not found';

      const deleteBook = await this.db.books.delete({ where: { id: id } });

      return deleteBook;
    } catch (error) {
      if (error.meta.cause) return error.meta.cause;

      return error;
    }
  }

  async manageBook({
    userId,
    data,
  }: {
    userId: string;
    data: Data;
  }): Promise<string> {
    try {
      const { action, bookId } = data;

      const book = await this.db.books.findFirst({ where: { id: bookId } });
      const user = await lastValueFrom(
        this.client.send({ cmd: 'getUser' }, userId),
      );

      if (!book) return 'Book not found.';

      if (action === 'take') {
        //add book to user

        const addBook = await lastValueFrom(
          this.client.send({ cmd: 'manageBook' }, { userId, bookId, action }),
        );

        if (!addBook.response) return 'User not found';

        //reduce stock

        await this.db.books.update({
          where: { id: bookId },
          data: { stock: book.stock - 1 },
        });

        return `${book.name} taken by ${user.name}`;
      } else {
        //remove book from user

        const removeBook = await lastValueFrom(
          this.client.send({ cmd: 'manageBook' }, { userId, bookId, action }),
        );

        if (!removeBook.response) return 'User does not have book.';
        //increase stock

        await this.db.books.update({
          where: { id: bookId },
          data: { stock: book.stock + 1 },
        });

        return `${book.name} returned by ${user.name}`;
      }
    } catch (error) {
      return error;
    }
  }

  async returnBook({
    userId,
    bookId,
  }: {
    userId: string;
    bookId: string;
  }): Promise<string> {
    try {
      const book = await this.db.books.findFirst({ where: { id: bookId } });
      const user = await lastValueFrom(
        this.client.send({ cmd: 'getUser' }, userId),
      );

      if (!book) return 'Book not found.';

      //remove book from user

      this.client.send({ cmd: 'removeBookToUser' }, { userId, bookId });

      //increase stock

      await this.db.books.update({
        where: { id: bookId },
        data: { stock: book.stock + 1 },
      });

      return `${book.name} returned by ${user.name}`;
    } catch (error) {
      return error;
    }
  }
}
