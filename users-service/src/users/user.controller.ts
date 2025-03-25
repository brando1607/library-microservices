import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User, NewUser, PartialUser, Action } from './types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'getUsers' })
  async getUsers(): Promise<User[] | string> {
    try {
      const users = await this.userService.getUsers();

      return users;
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: 'getUser' })
  async getUser(id: string): Promise<User | string> {
    try {
      const user = await this.userService.getUser(id);

      return user;
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: 'createUser' })
  async createUsers(newUser: NewUser): Promise<User | string> {
    try {
      const create = await this.userService.createUser(newUser);

      return create;
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: 'updateUser' })
  async updateUsers({
    id,
    newData,
  }: {
    id: string;
    newData: PartialUser;
  }): Promise<User | string> {
    try {
      const users = await this.userService.updateUser({ id, newData });

      return users;
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: 'deleteUser' })
  async deleteUsers(id: string): Promise<User | string> {
    try {
      const users = await this.userService.deleteUser(id);

      return users;
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: 'manageBook' })
  async manageBook({
    userId,
    bookId,
    action,
  }: {
    userId: string;
    bookId: string;
    action: Action;
  }): Promise<User | string> {
    try {
      const user = await this.userService.manageBook({
        userId,
        bookId,
        action,
      });

      return user;
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: 'userIsAuthor' })
  async userIsAuthor(id: string): Promise<boolean> {
    try {
      const isAuthor = await this.userService.userIsAuthor(id);

      return isAuthor;
    } catch (error) {
      return error;
    }
  }
}
