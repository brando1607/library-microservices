import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './types';

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
}
