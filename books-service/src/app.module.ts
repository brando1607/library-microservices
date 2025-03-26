import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BookController } from './books/book.controller';
import { BookService } from './books/book.service';
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
  controllers: [BookController],
  providers: [BookService],
})
export class AppModule {}
