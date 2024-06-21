import {
  Body,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateContentDto } from './dto/UpdateContent.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ContentsRepository {
  private readonly logger = new Logger(ContentsRepository.name);
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

  async getContent(contentUuid: string) {
    return this.prismaService.content
      .findUniqueOrThrow({
        where: {
          uuid: contentUuid,
          deletedAt: null,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`Content with id ${contentUuid} not found`);
            throw new NotFoundException(
              `Content with id ${contentUuid} not found`,
            );
          }
          this.logger.error('getContent error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('getContent error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async updateContent(
    { title, body, Deadline, HeadCount }: UpdateContentDto,
    contentUuid: string,
  ) {
    await this.prismaService.content
      .update({
        where: { uuid: contentUuid, deletedAt: null },
        data: {
          title,
          body,
          Deadline,
          HeadCount,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`content uuid not found`);
            throw new NotFoundException(`content uuid not found`);
          }
          this.logger.error('updateContent error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('updateContent error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async deleteContent(contentUuid: string) {
    this.logger.log('deleteContent');
    await this.prismaService.content
      .update({
        where: { uuid: contentUuid, deletedAt: null },
        data: { deletedAt: new Date() },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`Content with uuid not found`);
            throw new NotFoundException(`Content with uuid not found`);
          }
          this.logger.error('deleteContent error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('deleteContent Unknown Error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
    return { message: 'content has been successfully deleted' };
  }

  addTags(contentUuid: string, tag: string) {
    return this.prismaService.tags.create({
      data: { tag, contentUuid },
    });
  }

  async searchTag(tag: string) {
    const tags = await this.prismaService.tags.findMany({
      where: { tag },
      select: { contentUuid: true },
    });
    return tags.map((tag) => tag.contentUuid);
  }
  catch(error) {
    if (error instanceof PrismaClientKnownRequestError) {
      this.logger.error('searchTag error');
      this.logger.debug(error);
      throw new InternalServerErrorException('Database Error');
    }
    this.logger.error('searchTag error');
    this.logger.debug(error);
    throw new InternalServerErrorException('Unknown Error');
  }
}
