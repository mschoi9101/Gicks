import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthRepository {
  private readonly logger = new Logger(AuthRepository.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(
    name: string,
    studentId: string,
    password: string,
    major: string,
  ) {
    this.logger.log('register');
    await this.prismaService.user
      .create({
        data: {
          name,
          studentID: studentId,
          password,
          major,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          this.logger.error('register error');
          this.logger.debug(error);
          if (error.code === 'P2002') {
            throw new HttpException(
              `user with name '${name}' already exists`,
              HttpStatus.CONFLICT,
            );
          }

          throw new InternalServerErrorException('Database Error');
        }
        if (error instanceof PrismaClientValidationError) {
          this.logger.error('register error');
          this.logger.debug(error);

          throw new HttpException(
            `Some argument is missing`,
            HttpStatus.BAD_REQUEST,
          );
        }

        this.logger.error('createUser error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });

    return { message: `user '${name}' is created` };
  }

  async login(loginId: string, password: string) {
    const user = await this.prismaService.user
      .findUniqueOrThrow({
        where: { studentID: loginId },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            this.logger.debug(`No user found for loginId: ${loginId}`);
            throw new NotFoundException(
              `No user found for loginId: ${loginId}`,
            );
          }
          this.logger.error('login error');
          this.logger.debug(error);
          throw new InternalServerErrorException('Database Error');
        }
        this.logger.error('login error');
        this.logger.debug(error);
        throw new InternalServerErrorException('Unknown Error');
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign(
        { userUuid: user.uuid },
        { expiresIn: this.configService.get<string>('JWT_EXPIRESIN') },
      ),

      refreshToken: this.jwtService.sign(
        { userUuid: user.uuid },
        { expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRESIN') },
      ),
    };
  }

  refreshToken(refreshToken: string) {
    try {
      this.jwtService.verify(refreshToken);
      const extractedData = this.jwtService.decode(refreshToken);

      const newAccessToken = this.jwtService.sign(
        { userUuid: extractedData.userUuid },
        { expiresIn: this.configService.get<string>('JWT_EXPIRESIN') },
      );

      return {
        accessToken: newAccessToken,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('invalid refreshToken', HttpStatus.UNAUTHORIZED);
    }
  }
}
