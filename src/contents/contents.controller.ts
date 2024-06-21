import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateContentDto } from 'src/dtos/create-content.dto';
import { ContentsService } from './contents.service';
import { GetContentListDto } from 'src/dtos/get-contentList.dto';

@Controller('contents')
export class ContentsController {
  constructor(private contentService: ContentsService) {}

  @Post('/create')
  createContent(
    @Body() { title, body, Deadline, HeadCount, authorID }: CreateContentDto,
  ) {
    return this.contentService.createContent({
      title,
      body,
      Deadline,
      HeadCount,
      authorID,
    });
  }

  @Get()
  getContentList(@Query() { page = 1, pageSize = 10 }: GetContentListDto) {
    return this.contentService.getContentList(page, pageSize);
  }
}
