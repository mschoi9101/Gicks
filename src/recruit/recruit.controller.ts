import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { RecruitService } from './recruit.service';
import { GetUser } from 'src/user/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('recruit')
@ApiTags('recruit')
export class RecruitController {
  constructor(private recruitService: RecruitService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':contentUuid')
  recruitUser(
    @Param('contentUuid') contentUuid: string,
    @GetUser() userUuid: string,
  ) {
    return this.recruitService.recruitUser(contentUuid, userUuid);
  }

  @Get(':contentUuid')
  recruitNum(@Param('contentUuid') contentUuid: string) {
    return this.recruitService.recruitNum(contentUuid);
  }
}
