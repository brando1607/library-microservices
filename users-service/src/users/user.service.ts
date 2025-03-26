import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, NewUser, PartialUser, Action, Response } from './types';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject('BOOK_SERVICE') private client: ClientProxy,
    private db: PrismaService,
  ) {}

  async getUsers(): Promise<User[] | string> {
    try {
      const users = await this.db.users.findMany();

      if (users.length === 0) return 'No users yet.';

      return users;
    } catch (error) {
      return error;
    }
  }

  async getUser(id: string): Promise<User | string | Response> {
    try {
      const user = await this.db.users.findFirst({ where: { id: id } });

      if (!user) return { response: false, message: 'User not found.' };

      return user;
    } catch (error) {
      return error;
    }
  }

  async createUser(newUser: NewUser): Promise<User | string> {
    try {
      const userExists = await this.db.users.findFirst({
        where: { email: newUser.email },
      });

      if (userExists) return 'Email address already in use.';

      const user = await this.db.users.create({ data: newUser });

      return user;
    } catch (error) {
      return error;
    }
  }

  async updateUser({
    id,
    newData,
  }: {
    id: string;
    newData: PartialUser;
  }): Promise<User | string> {
    try {
      const userExists = await this.db.users.findFirst({
        where: { id: id },
      });

      if (!userExists) return 'User not found';

      const update = await this.db.users.update({
        where: { id: id },
        data: newData,
      });

      return update;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id: string): Promise<User | string> {
    try {
      const userExists = await this.db.users.findFirst({
        where: { id: id },
      });

      if (!userExists) return 'User not found';

      const deleteUser = await this.db.users.delete({ where: { id: id } });

      return deleteUser;
    } catch (error) {
      if (error.meta.cause) return error.meta.cause;

      return error;
    }
  }

  async manageBook({
    userId,
    bookId,
    action,
  }: {
    userId: string;
    bookId: string;
    action: Action;
  }): Promise<Response> {
    try {
      const user = await this.db.users.findFirst({ where: { id: userId } });

      if (!user) return { response: false };

      if (action === 'take') {
        if (user.currentbooks.includes(bookId)) return { response: false };

        // add book

        await this.db.users.update({
          where: { id: userId },
          data: { currentbooks: [...user.currentbooks, bookId] },
        });

        return { response: true };
      } else {
        const bookIndex = user.currentbooks.findIndex((e) => e === bookId);

        if (bookIndex === -1) return { response: false };

        user.currentbooks.splice(bookIndex, 1);

        // remove book

        await this.db.users.update({
          where: { id: userId },
          data: { currentbooks: [...user.currentbooks] },
        });

        return { response: true };
      }
    } catch (error) {
      return error;
    }
  }

  async userIsAuthor(id: string): Promise<boolean> {
    try {
      const isAuthor = await this.db.users.findFirst({ where: { id: id } });

      // if(!isAuthor) return 'User not found'

      return isAuthor?.role === 'AUTHOR';
    } catch (error) {
      return error;
    }
  }
}
