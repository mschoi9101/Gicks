import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { ContentsRepository } from './contents.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ContentsController],
  providers: [ContentsService, ContentsRepository],
})
export class ContentsModule {}
