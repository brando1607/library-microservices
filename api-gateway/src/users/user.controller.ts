import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, PartialUser, NewUser } from './types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[] | string> {
    try {
      const result = await this.userService.getUsers();

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | string> {
    try {
      const result = await this.userService.getUser(id);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async createUser(@Body() newUser: NewUser): Promise<User | string> {
    try {
      const result = await this.userService.createUser(newUser);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Patch(':id')
  async updateUser(
    @Body() newData: PartialUser,
    @Param('id') id: string,
  ): Promise<User | string> {
    try {
      const result = await this.userService.updateUser(id, newData);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User | string> {
    try {
      const result = await this.userService.deleteUser(id);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
