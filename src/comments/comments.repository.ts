import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CommentsRepository {
  private readonly logger = new Logger(CommentsRepository.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getComment(commentUuid: string) {
    return this.prismaService.comment
      .findUniqueOrThrow({
        where: {
          uuid: commentUuid,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`Content with id ${commentUuid} not found`);
            throw new NotFoundException(
              `Content with id ${commentUuid} not found`,
            );
          }
          this.logger.error('getComment error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('getComment error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async getCommentByContent(contentUuid: string) {
    return this.prismaService.comment
      .findMany({
        where: {
          contentUuid,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`comment uuid not found`);
            throw new NotFoundException(`comment uuid not found`);
          }
          this.logger.error('getCommentByContent error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('getCommentByContent error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  createComment(contentUuid: string, userUuid: string, commentContent: string) {
    return this.prismaService.comment
      .create({
        data: { contentUuid, userUuid, commentContent },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`comment uuid not found`);
            throw new NotFoundException(`comment uuid not found`);
          }
          this.logger.error('createComment error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('createComment error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });
  }
}
