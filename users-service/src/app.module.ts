import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
