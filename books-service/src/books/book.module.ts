import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [BookService],
  imports: [PrismaModule],
})
export class BookModule {}
