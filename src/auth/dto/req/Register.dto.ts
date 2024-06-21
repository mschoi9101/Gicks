import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user1234' })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty({ example: '20190000' })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  studentId: string;

  @ApiProperty({ example: 'password1234' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @ApiProperty({ example: '전기전자컴퓨터공학부' })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  major: string;
}
