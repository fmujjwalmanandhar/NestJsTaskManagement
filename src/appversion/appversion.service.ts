import { Injectable } from '@nestjs/common';
import { AppVersionRepository } from './appversion.repository';

@Injectable()
export class AppVersionService {
  constructor(private appVersionRepository: AppVersionRepository) {}

  creatAppVersion(): Promise<void> {
    return this.appVersionRepository.createAppVersion();
  }
}
