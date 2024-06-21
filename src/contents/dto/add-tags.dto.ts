import { IsIn } from 'class-validator';

export class AddTagsDto {
  contentUuid: string;

  @IsIn(['스터디', '택시', '공동구매', '기타'])
  tag: string;
}
