import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User, PartialUser, NewUser } from './types';
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

  async getUser(id: string): Promise<User | string> {
    try {
      const result = this.client.send({ cmd: 'getUser' }, id);

      const value = await lastValueFrom(result);

      return value;
    } catch (error) {
      return error;
    }
  }

  async createUser(newUser: NewUser): Promise<User | string> {
    try {
      const result = this.client.send({ cmd: 'createUser' }, newUser);

      const value = await lastValueFrom(result);

      return value;
    } catch (error) {
      return error;
    }
  }

  async updateUser(id: string, newData: PartialUser): Promise<User | string> {
    try {
      const result = this.client.send({ cmd: 'updateUser' }, { id, newData });

      const value = await lastValueFrom(result);

      return value;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id: string): Promise<User | string> {
    try {
      const result = this.client.send({ cmd: 'deleteUser' }, id);

      const value = await lastValueFrom(result);

      return value;
    } catch (error) {
      return error;
    }
  }
}
