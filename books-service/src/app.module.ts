import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BookController } from './books/book.controller';
import { BookService } from './books/book.service';

@Module({
  imports: [PrismaModule],
  controllers: [BookController],
  providers: [BookService],
})
export class AppModule {}
