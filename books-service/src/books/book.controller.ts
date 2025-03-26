import { Controller } from '@nestjs/common';
import { BookService } from './book.service';
import { MessagePattern } from '@nestjs/microservices';
import { Book, PartialBook, NewBook, Data } from './types';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @MessagePattern({ cmd: 'getBooks' })
  async getBooks(): Promise<Book[] | string> {
    try {
      const books = await this.bookService.getBooks();

      return books;
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: 'getBook' })
  async getBook(id: string): Promise<Book | string> {
    try {
      const book = await this.bookService.getBook(id);

      return book;
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: 'createBook' })
  async createBook(newBook: NewBook) {
    try {
      const createBook = await this.bookService.createBook(newBook);

      return createBook;
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: 'updateBook' })
  async updateBook({
    id,
    newData,
  }: {
    id: string;
    newData: PartialBook;
  }): Promise<Book | string> {
    try {
      const updateBook = this.bookService.updateBook({ id, newData });

      return updateBook;
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: 'deleteBook' })
  async deleteBook(id: string): Promise<Book | string> {
    try {
      const deleteBook = this.bookService.delete(id);

      return deleteBook;
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: 'manageBook' })
  async manageBook({
    userId,
    data,
  }: {
    userId: string;
    data: Data;
  }): Promise<Book | string> {
    try {
      const manageBook = this.bookService.manageBook({ userId, data });

      return manageBook;
    } catch (error) {
      return error;
    }
  }
}
