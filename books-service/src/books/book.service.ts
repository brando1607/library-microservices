import { Injectable } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Injectable()
export class BookService {
  constructor(private db: PrismaModule) {}
}
