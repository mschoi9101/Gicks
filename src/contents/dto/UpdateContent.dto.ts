import { Type } from 'class-transformer';

export class UpdateContentDto {
  readonly title: string;

  readonly body: string;

  readonly Deadline: Date;

  @Type(() => Number)
  readonly HeadCount: number;
}
