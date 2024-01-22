import { Controller, Get } from '@nestjs/common';
import { AppVersionService } from './appversion.service';

@Controller('appversion')
export class AppVersionController {
  constructor(private appVersionService: AppVersionService) {}

  @Get('/checkappversion')
  checkAppVersion(): Promise<void> {
    return this.appVersionService.creatAppVersion();
  }

  // @Get('/test')
  // @UseGuards(AuthGuard())
  // test(@Request() req) {
  //   console.log({ req });
  // }
}
