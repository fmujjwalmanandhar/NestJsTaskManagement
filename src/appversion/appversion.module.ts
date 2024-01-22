import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppVersionInfo } from '../appversion/appversioninfo.entity';
import { AppVersionController } from './appversion.controller';
import { AppVersionRepository } from './appversion.repository';
import { AppVersionService } from './appversion.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([AppVersionInfo])],
  controllers: [AppVersionController],
  providers: [AppVersionService, AppVersionRepository],
})
export class AppVersionModule {}
