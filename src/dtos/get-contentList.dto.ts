import { IsNumber, IsOptional, isNumber } from 'class-validator';

export class GetContentListDto {
  @IsNumber()
  @IsOptional()
  page: number;

  @IsNumber()
  @IsOptional()
  pageSize: number;
}
