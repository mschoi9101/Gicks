import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateContentDto } from './req/UpdateContent.dto';
import { ContentRepository } from './content.repository';

@Injectable()
export class ContentService {
  constructor(private readonly contentRepository: ContentRepository) {}

  async updateContent(updateContentDto: UpdateContentDto, contentUuid: string) {
    const content = await this.contentRepository.getContent(contentUuid, false);

    if (content.author.uuid !== contentUuid) {
      throw new ForbiddenException();
    }

    await this.contentRepository.updateContent(updateContentDto, contentUuid);

    return this.getContent(contentUuid);
  }

  async deleteContent(contentUuid: string) {
    const content = await this.contentRepository.getContent(contentUuid, false);

    if (content.author.uuid !== contentUuid) {
      throw new ForbiddenException();
    }

    return this.contentRepository.deleteContent(contentUuid);
  }
}
