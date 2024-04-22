import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto, SignUpDto } from '@app/common';
import { Public } from '../../shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
