import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentailsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentailsDto: AuthCredentailsDto): Promise<void> {
    return this.authService.signUp(authCredentailsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentailsDto: AuthCredentailsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentailsDto);
  }

  @Get('/checkappversion')
  checkAppVersion(): Promise<string> {
    return this.authService.checkAppVersion();
  }

  // @Get('/test')
  // @UseGuards(AuthGuard())
  // test(@Request() req) {
  //   console.log({ req });
  // }
}
