import { ForbiddenException, Injectable } from '@nestjs/common';
import { ContentsRepository } from './contents.repository';
import { UpdateContentDto } from './dto/UpdateContent.dto';

@Injectable()
export class ContentsService {
  constructor(private contentRepository: ContentsRepository) {}

  async createContent({
    title,
    body,
    Deadline,
    HeadCount,
    userUuid,
  }: {
    title: string;
    body: string;
    Deadline: Date;
    HeadCount: number;
    userUuid: string;
  }) {
    return await this.contentRepository.createContent(
      title,
      body,
      Deadline,
      HeadCount,
      userUuid,
    );
  }

  async getContentList(page: number, pageSize: number) {
    return await this.contentRepository.getContentList(page, pageSize);
  }

  async getContent(contentUuid: string) {
    return await this.contentRepository.getContent(contentUuid);
  }

  async updateContent(
    updateContentDto: UpdateContentDto,
    userUuid: string,
    contentUuid: string,
  ) {
    const content = await this.contentRepository.getContent(contentUuid);

    if (content.authorID !== userUuid) {
      throw new ForbiddenException();
    }

    await this.contentRepository.updateContent(updateContentDto, contentUuid);

    return this.getContent(contentUuid);
  }

  async deleteContent(userUuid: string, contentUuid: string) {
    const content = await this.contentRepository.getContent(contentUuid);

    if (content.authorID !== userUuid) {
      throw new ForbiddenException();
    }

    return this.contentRepository.deleteContent(contentUuid);
  }
}
