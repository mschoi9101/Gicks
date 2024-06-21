import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { ContentsService } from './contents.service';
import { GetContentListDto } from './dto/get-contentList.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetUser } from 'src/user/decorator/get-user.decorator';
import { UpdateContentDto } from './dto/UpdateContent.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('contents')
export class ContentsController {
  constructor(private contentService: ContentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
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

  @Get(':uuid')
  getContent(@Param('uuid') uuid: string) {
    return this.contentService.getContent(uuid);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':uuid')
  updateContent(
    @Param('uuid') uuid: string,
    @GetUser() userUuid: string,
    @Body() updateContentDto: UpdateContentDto,
  ) {
    return this.contentService.updateContent(updateContentDto, userUuid, uuid);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  deleteContent(@GetUser() userUuid: string, @Param('uuid') uuid: string) {
    return this.contentService.deleteContent(userUuid, uuid);
  }
}
