import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateContentDto } from './req/UpdateContent.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContentRepository {
  private readonly logger = new Logger(ContentRepository.name);
  constructor(private readonly prismaService: PrismaService) {}

  async updateContent(
    { title, body, Deadline, HeadCount }: UpdateContentDto,
    contentUuid: string,
  ) {
    await this.prismaService.content
      .update({
        where: { contentUuid, deletedAt: null },
        data: {
          contents: {
            update: {
              where: {
                contentUuid: contentUuid,
              },
              data: {
                title,
                body,
                Deadline,
                HeadCount,
              },
            },
          },
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`User uuid not found`);
            throw new NotFoundException(`User uuid not found`);
          }
          this.logger.error('createPost error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('createPost error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async deleteContent(contentUuid: string) {
    this.logger.log('deleteContent');
    await this.prismaService.content
      .update({
        where: { contentUuid, deletedAt: null },
        data: { deletedAt: new Date() },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`Post with id not found`);
            throw new NotFoundException(`Post with id not found`);
          }
          this.logger.error('deletePost error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('deletePost Unknown Error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
    return { message: 'post has been successfully deleted' };
  }
}
