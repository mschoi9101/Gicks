import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ContentController } from './content.controller';
import { ContentRepository } from './content.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ContentController],
  providers: [ContentService, ContentRepository],
})
export class PostModule {}
