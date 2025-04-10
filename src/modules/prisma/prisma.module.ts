import { Module } from '@nestjs/common';
import { PrismaService } from './app/service/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
