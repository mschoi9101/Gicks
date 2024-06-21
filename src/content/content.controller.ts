import { Controller, Patch, Delete, Param, Body } from '@nestjs/common';
import { ContentService } from './content.service';
import { UpdateContentDto } from './req/UpdateContent.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Patch(':uuid')
  updateContent(
    @Param('uuid') uuid: string,
    @Body() updateContentDto: UpdateContentDto,
  ) {
    return this.contentService.updateContent(updateContentDto, uuid);
  }

  @Delete(':uuid')
  deleteContent(@Param('uuid') uuid: string) {
    return this.contentService.deleteContent(uuid);
  }
}
