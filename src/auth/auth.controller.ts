import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import {
  AuthSignInDto,
  AuthSignUpDto,
  AuthUsername,
  ChangePassword,
  CreatePasswordDto,
  ForgetPasswordEmail,
} from './dto';
import { apiWrapper } from 'src/common/globalErrorHandlerClass';
import { getId } from 'src/common/decorators/getUserIdThroughToken.decorator';
import { response } from 'src/common/types';
import { Response } from 'express';
import { ApiCustomResponse } from 'src/common/decorators/api-decorator';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Public()
  @Post('/register')
  @HttpCode(200)
  @ApiCustomResponse('signUp')
  signUp(
    @Body() dto: AuthSignUpDto,
  ): Promise<{ user?: any; message?: string; status: number }> {
    return apiWrapper(() => this.AuthService.signUp(dto));
  }
  @Public()
  @Post('/signIn')
  @HttpCode(200)
  @ApiCustomResponse('signIn')
  signIn(@Body() dto: AuthSignInDto): Promise<{
    user?: any;
    accessToken?: string;
    message?: string;
    status: number;
  }> {
    return apiWrapper(() => this.AuthService.signIn(dto));
  }
  @Public()
  @Post('/google-signIn')
  @HttpCode(200)
  // @ApiCustomResponse('signIn')
  googleSignIn(@Body('token') token: string): Promise<{
    user?: any;
    accessToken?: string;
    message?: string;
    status: number;
  }> {
    return apiWrapper(() => this.AuthService.googleSignIn(token));
  }

  @Post('/changePassword')
  @HttpCode(200)
  @ApiCustomResponse('changePassword')
  changePassword(
    @getId('give me id') id: number,
    @Body() dto: ChangePassword,
  ): Promise<{ status: number; message: string }> {
    return apiWrapper(() => this.AuthService.changePassword(id, dto));
  }
  @Public()
  @Get('/emailVerification/:id')
  @ApiCustomResponse('emailVerification')
  async emailVerification(@Param('id') id: string, @Res() res: Response) {
    try {
      await apiWrapper(() => this.AuthService.emailVerification(id));
      res.redirect(process.env.FRONTEND_LOGIN_URL); // Replace with your actual frontend login URL
    } catch (error) {
      // Handle errors, e.g., invalid token, user not found, etc.
      res
        .status(HttpStatus.BAD_REQUEST)
        .send('Verification failed. Please contact support.');
    }
  }
  @Public()
  @Post('/forgetPassword')
  @HttpCode(200)
  @ApiCustomResponse('forgetPasswordSendEmail')
  forgetPasswordSendEmail(@Body() dto: ForgetPasswordEmail): Promise<response> {
    return apiWrapper(() =>
      this.AuthService.forgetPasswordSendEmail(dto.email),
    );
  }
  @Public()
  @Post('/createNewPassword')
  @HttpCode(200)
  @ApiCustomResponse('createNewPassword')
  createNewPassword(@Body() dto: CreatePasswordDto): Promise<response> {
    return apiWrapper(() => this.AuthService.createNewPassword(dto));
  }
  @Public()
  @Get('/users')
  @ApiCustomResponse('getUsers')
  getUers() {
    return apiWrapper(() => this.AuthService.getUsers());
  }
}
