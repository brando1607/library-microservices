import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book, PartialBook, NewBook, Data } from './types';

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
  async createBook(@Body() newBook: NewBook): Promise<Book | string> {
    try {
      const result = await this.bookService.createBook(newBook);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Patch(':id')
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

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book | string> {
    try {
      const result = await this.bookService.deleteBook(id);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Patch('/manageBook/:userId')
  async manageBook(@Param('userId') userId: string, @Body() data: Data) {
    try {
      const result = await this.bookService.manageBook({ userId, data });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
