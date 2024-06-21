import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterResDto } from './dto/res/RegisterRes.dto';
import { RegisterDto } from './dto/req/Register.dto';
import { LoginDto } from './dto/req/Login.dto';
import { LoginResDto } from './dto/res/LoginRes.dto';
import { RefreshTokenResDto } from './dto/res/RefreshTokenRes.dto';
import { RefreshTokenDto } from './dto/req/RefreshToken.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Create account',
    description: 'Create account',
  })
  @ApiOkResponse({
    type: RegisterResDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post('register')
  register(@Body() { name, studentId, password, major }: RegisterDto) {
    return this.authService.register(name, studentId, password, major);
  }

  @ApiOperation({
    summary: 'login',
    description: 'Return JWT Token',
  })
  @ApiOkResponse({
    type: LoginResDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post('login')
  login(@Body() { loginId, password }: LoginDto) {
    return this.authService.login(loginId, password);
  }

  @ApiOperation({
    summary: 'refresh',
    description: 'Refresh accessToken',
  })
  @ApiOkResponse({
    type: RefreshTokenResDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post('refresh')
  refreshToken(@Body() { refreshToken }: RefreshTokenDto) {
    return this.authService.refreshToken(refreshToken);
  }
}
