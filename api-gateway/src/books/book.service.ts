import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Book, PartialBook } from './types';

@Injectable()
export class BookService {
  constructor(@Inject('BOOK_SERVICE') private client: ClientProxy) {}

  async getBooks(): Promise<Book[] | string> {
    try {
      const result = this.client.send({ cmd: 'getBooks' }, {});

      const value = await lastValueFrom(result);

      return value;
    } catch (error) {
      return error;
    }
  }

  async getBook(id: string): Promise<Book | string> {
    try {
      const result = this.client.send({ cmd: 'getBook' }, id);

      const value = await lastValueFrom(result);

      return value;
    } catch (error) {
      return error;
    }
  }

  async createBook(newBook: Book): Promise<Book | string> {
    try {
      const result = this.client.send({ cmd: 'createBook' }, newBook);

      const value = await lastValueFrom(result);

      return value;
    } catch (error) {
      return error;
    }
  }

  async updateBook(id: string, newData: PartialBook): Promise<Book | string> {
    try {
      const result = this.client.send({ cmd: 'updateBook' }, { id, newData });

      const value = await lastValueFrom(result);

      return value;
    } catch (error) {
      return error;
    }
  }

  async deleteBook(id: string): Promise<Book | string> {
    try {
      const result = this.client.send({ cmd: 'deleteBook' }, id);

      const value = await lastValueFrom(result);

      return value;
    } catch (error) {
      return error;
    }
  }
}
