import { Type } from 'class-transformer';

export class CreateContentDto {
  title: string;
  body: string;
  Deadline: Date;

  @Type(() => Number)
  HeadCount: number;
  authorID: string;
}
