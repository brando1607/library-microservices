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
}
