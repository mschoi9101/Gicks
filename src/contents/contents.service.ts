import { Injectable } from '@nestjs/common';
import { ContentsRepository } from './contents.repository';

@Injectable()
export class ContentsService {
  constructor(private contentRepository: ContentsRepository) {}

  async createContent({
    title,
    body,
    Deadline,
    HeadCount,
    authorID,
  }: {
    title: string;
    body: string;
    Deadline: Date;
    HeadCount: number;
    authorID: string;
  }) {
    return await this.contentRepository.createContent(
      title,
      body,
      Deadline,
      HeadCount,
      authorID,
    );
  }

  async getContentList(page: number, pageSize: number) {
    return await this.contentRepository.getContentList(page, pageSize);
  }
}
