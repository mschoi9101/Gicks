import { Injectable } from '@nestjs/common';
import { RecruitRepository } from './recruit.repository';

@Injectable()
export class RecruitService {
  constructor(private recruitRepository: RecruitRepository) {}

  async recruitUser(contentUuid: string, userUuid: string) {
    return await this.recruitRepository.recruitUser(contentUuid, userUuid);
  }

  async recruitNum(contentUuid: string) {
    return await this.recruitRepository.recruitNum(contentUuid);
  }
}
