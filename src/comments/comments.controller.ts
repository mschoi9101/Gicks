import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from 'src/contents/dto/create-comment.dto';
import { AddTagsDto } from 'src/contents/dto/add-tags.dto';

@Controller('comments')
export class CommentsController {
  constructor(private contentService: CommentsService) {}

  @Get()
  getcommentByContent(@Query('contentUuid') contentUuid: string) {
    return this.contentService.getCommentByContent(contentUuid);
  }

  @Get()
  getComment(@Query('commentUuid') commentUuid: string) {
    return this.contentService.getComment(commentUuid);
  }

  @Post()
  createComment(
    @Body() { contentUuid, userUuid, commentContent }: CreateCommentDto,
  ) {
    return this.contentService.createComment(
      contentUuid,
      userUuid,
      commentContent,
    );
  }
}
