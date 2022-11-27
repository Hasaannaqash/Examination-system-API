import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Res,
  HttpException,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from '../user/dto/register.dto';
import { Response } from 'express';
import RequestWithUser from './local/requestWithUser.interface';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import User from '../user/user.entity';
import { LoginDto } from '../user/dto/login.dto';
import { LocalAuthenticationGuard } from './local/localAuthentication.guard';
import JwtAuthenticationGuard from './local/jwt-authentication.guard';
import { ClassesService } from '../classes/classes.service';

@Controller('authentication')
@ApiTags('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({ description: 'Wrong credentials provided' })
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @Post('log-in')
  @UseGuards(LocalAuthenticationGuard)
  async logIn(
    @Body() loginDto: LoginDto,
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    try {
      const { user } = request;
      const jwt_token = this.authenticationService.login(user);
      user.password = undefined;
      response.send({ user, jwt_token });
    } catch (error) {
      response.sendStatus(500);
    }
  }
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async authenticate(@Req() request: RequestWithUser) {
    try {
      return request.user;
    } catch (error) {
      return new HttpException('Error', 500);
    }
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    // jwt token logout
    response.clearCookie('jwt_token');
    response.sendStatus(200);
  }
}
