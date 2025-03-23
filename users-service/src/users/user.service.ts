import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, NewUser, PartialUser } from './types';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async getUsers(): Promise<User[] | string> {
    try {
      const users = await this.db.users.findMany();

      if (users.length === 0) return 'No users yet.';

      return users;
    } catch (error) {
      return error;
    }
  }

  async getUser(id: string): Promise<User | string> {
    try {
      const user = await this.db.users.findFirst({ where: { id: id } });

      if (!user) return 'User not found.';

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

      if (userExists) return 'Email address already in use.';

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

      if (userExists) return 'Email address already in use.';

      const deleteUser = await this.db.users.delete({ where: { id: id } });

      return deleteUser;
    } catch (error) {
      return error;
    }
  }
}
