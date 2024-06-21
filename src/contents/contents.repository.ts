import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createContent(
    title: string,
    body: string,
    Deadline: Date,
    HeadCount: number,
    authorID: string,
  ) {
    return this.prismaService.content.create({
      data: {
        title,
        body,
        Deadline,
        HeadCount,
        authorID,
      },
    });
  }

  async getContentList(page: number, pageSize: number) {
    console.log(typeof page, typeof pageSize);
    const skip = (page - 1) * pageSize;
    return this.prismaService.content.findMany({
      skip: skip,
      take: pageSize,
      include: {
        author: {
          select: {
            name: true,
            studentID: true,
          },
        },
        Comment: {
          select: {
            commentContent: true,
            userUuid: true,
            createAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

//title body createdat deadline headcount author_id
