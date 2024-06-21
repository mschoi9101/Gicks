import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { ContentsService } from './contents.service';
import { GetContentListDto } from './dto/get-contentList.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetUser } from 'src/user/decorator/get-user.decorator';

@Controller('contents')
export class ContentsController {
  constructor(private contentService: ContentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createContent(
    @GetUser() userUuid: string,
    @Body() { title, body, Deadline, HeadCount }: CreateContentDto,
  ) {
    return this.contentService.createContent({
      title,
      body,
      Deadline,
      HeadCount,
      userUuid,
    });
  }

  @Get()
  getContentList(@Query() { page = 1, pageSize = 10 }: GetContentListDto) {
    console.log(typeof page, typeof pageSize);
    return this.contentService.getContentList(page, pageSize);
  }
}
