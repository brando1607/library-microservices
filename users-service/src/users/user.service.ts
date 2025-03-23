import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './types';

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
}
