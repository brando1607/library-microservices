import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './types';

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
}
