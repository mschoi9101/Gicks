import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RecruitController } from './recruit.controller';
import { RecruitService } from './recruit.service';
import { RecruitRepository } from './recruit.repository';

@Module({
  imports: [PrismaModule],
  controllers: [RecruitController],
  providers: [RecruitService, RecruitRepository],
})
export class RecruitModule {}
