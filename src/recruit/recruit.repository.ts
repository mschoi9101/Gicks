import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecruitRepository {
  private readonly logger = new Logger(RecruitRepository.name);
  constructor(private readonly prismaService: PrismaService) {}

  recruitUser(contentUuid: string, userUuid: string) {
    return this.prismaService.recruit.create({
      data: {
        contentUuid: contentUuid,
        userUuid: userUuid,
      },
    });
  }

  async recruitNum(contentUuid: string) {
    return this.prismaService.recruit.count({ where: { contentUuid } });
  }
}
