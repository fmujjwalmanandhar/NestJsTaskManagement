import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppVersionInfo } from '../appversion/appversioninfo.entity';

@Injectable()
export class AppVersionRepository {
  constructor(private appVersionRepository: Repository<AppVersionInfo>) {}

  async createAppVersion(): Promise<void> {
    const appversion = await this.appVersionRepository.create({
      appversion: '5.1.0',
      isForceUpdate: false,
    });
    this.appVersionRepository.save(appversion);
  }
}
