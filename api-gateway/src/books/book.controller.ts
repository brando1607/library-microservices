import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book, PartialBook } from './types';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(): Promise<Book[] | string> {
    try {
      const result = await this.bookService.getBooks();

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book | string> {
    try {
      const result = await this.bookService.getBook(id);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async createBook(@Body() newBook: Book): Promise<Book | string> {
    try {
      const result = await this.bookService.createBook(newBook);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async updateBook(
    @Body() newData: PartialBook,
    @Param('id') id: string,
  ): Promise<Book | string> {
    try {
      const result = await this.bookService.updateBook(id, newData);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete('id')
  async deleteBook(@Param('id') id: string): Promise<Book | string> {
    try {
      const result = await this.bookService.deleteBook(id);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
