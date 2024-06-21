import { ForbiddenException, Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  async getCommentByContent(contentUuid: string) {
    return await this.commentsRepository.getCommentByContent(contentUuid);
  }

  async getComment(commentUuid: string) {
    return await this.commentsRepository.getComment(commentUuid);
  }

  async createComment(
    contentUuid: string,
    userUuid: string,
    commentContent: string,
  ) {
    return await this.commentsRepository.createComment(
      contentUuid,
      userUuid,
      commentContent,
    );
  }
}
