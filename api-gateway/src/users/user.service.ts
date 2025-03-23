import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './types';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  async getUsers(): Promise<User[] | string> {
    try {
      const result = this.client.send({ cmd: 'getUsers' }, {});

      const value = await lastValueFrom(result);

      return value;
    } catch (error) {
      return error;
    }
  }
}
