import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 8080 },
      },
      {
        name: 'BOOK_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 8000 },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
